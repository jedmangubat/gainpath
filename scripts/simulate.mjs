#!/usr/bin/env node
// Randomized state-persistence simulator: repeatedly drives real day-edit and
// Settings interactions (via the actual window-scope functions, same boot
// pattern as test_units.mjs/visual_check.mjs) in a random order, across many
// iterations and both Chromium and WebKit, and after each one verifies two
// invariants that both had silent, undetected regressions before v2.6.1:
//
//   1. Any Settings change is reflected in localStorage('gp_cfg') the instant
//      it's made — never only after the sub-screen's back-arrow tap. A future
//      setSetting* added without saveCFG() breaks this immediately.
//   2. Whatever weight/rep/set plan a day-edit session ends with (Start, Save-
//      without-starting, or Reset) is exactly what re-opening that day shows,
//      and exactly what a real app relaunch (page.reload(), simulating an iOS
//      PWA getting killed and reopened) still shows.
//
// This is deliberately a fuzzer, not a fixed script: the action sequence and
// which day/exercise/field it touches are randomized every run from a printed
// seed, so a failure can be replayed with SEED=<n> npm run simulate.
//
// Usage: npm run simulate  [-- --iterations=300] [SEED=12345 npm run simulate]

import { chromium, webkit } from 'playwright';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';

const ROOT = '/Volumes/EngrJed SSD/03 Projects/GainPath';
const PORT = 8749;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const ITERATIONS = parseInt((process.argv.find(a => a.startsWith('--iterations=')) || '').split('=')[1]) || 150;
const SEED = parseInt(process.env.SEED) || (Date.now() & 0xffffffff);

// mulberry32 — small, fast, seedable PRNG so a failing run can be replayed.
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const chance = (p) => rand() < p;

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const reqPath = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(ROOT, reqPath === '/' ? '/index.html' : reqPath);
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(data);
      } catch { res.writeHead(404); res.end('Not found'); }
    });
    server.listen(PORT, () => resolve(server));
  });
}

const DAYS = ['push', 'pull', 'legs', 'upper', 'lower'];
const CFG_SEED = { setup: true, sex: 'male', prefReps: 10, prefSets: 3, unit: 'kg', lastSeenVersion: '2.6.1', tutorialSeen: true, badgesIntroSeen: true };

const failures = [];

async function runEngine(engineName, engine) {
  const browser = await engine.launch();
  const page = await browser.newPage();
  page.on('pageerror', e => failures.push({ engine: engineName, iter: '-', kind: 'page-exception', detail: e.message }));
  await page.goto(`http://localhost:${PORT}/`);
  await page.evaluate((cfg) => localStorage.setItem('gp_cfg', JSON.stringify(cfg)), CFG_SEED);
  await page.reload();
  await page.waitForFunction(() => typeof window.openDayEdit === 'function');
  // A real user must visit Settings once before its chips exist in the DOM —
  // do the same so toggleSettingPlate() below has something to toggle.
  await page.evaluate(() => { openSettings(); });

  let lastSettingsSnapshot = await page.evaluate(() => ({ prefReps: CFG.prefReps, prefSets: CFG.prefSets, prefRest: CFG.prefRest, warmup: CFG.warmup, unit: CFG.unit }));

  for (let i = 0; i < ITERATIONS; i++) {
    const roll = rand();
    try {
      if (roll < 0.45) {
        await dayEditCycle(page, engineName, i);
      } else if (roll < 0.85) {
        lastSettingsSnapshot = await settingsCycle(page, engineName, i, lastSettingsSnapshot);
      } else {
        // Simulate the PWA being killed and relaunched mid-session.
        await page.reload();
        await page.waitForFunction(() => typeof window.openDayEdit === 'function');
        const after = await page.evaluate(() => {
          openSettings(); // re-render chips so a later plate toggle has a DOM target
          return { prefReps: CFG.prefReps, prefSets: CFG.prefSets, prefRest: CFG.prefRest, warmup: CFG.warmup, unit: CFG.unit };
        });
        for (const k of Object.keys(lastSettingsSnapshot)) {
          if (after[k] !== lastSettingsSnapshot[k]) {
            failures.push({ engine: engineName, iter: i, kind: 'settings-lost-on-relaunch', field: k, expected: lastSettingsSnapshot[k], actual: after[k] });
          }
        }
      }
    } catch (e) {
      failures.push({ engine: engineName, iter: i, kind: 'exception', detail: e.message });
    }
  }

  await browser.close();
}

async function settingsCycle(page, engineName, iter, prevSnapshot) {
  const action = pick(['reps', 'sets', 'rest', 'warmup', 'unit', 'plate']);
  const repsVal = pick([6, 8, 10, 12, 15]);
  const setsVal = pick([2, 3, 4]);
  const restVal = pick([60, 90, 120]);
  // Plate denominations depend on the current (possibly just-toggled) unit —
  // ask the page rather than hardcoding kg's list, or a stale id (e.g. 20 in
  // lbs mode) would look up a chip that was never rendered for that unit.
  const currentDenoms = await page.evaluate(() => (PLATES[CFG.unit] || PLATES.kg).slice());
  const plateVal = pick(currentDenoms);
  const result = await page.evaluate(({ action, repsVal, setsVal, restVal, plateVal }) => {
    if (action === 'reps') setSettingReps(repsVal);
    else if (action === 'sets') setSettingSets(setsVal);
    else if (action === 'rest') setSettingRest(restVal);
    else if (action === 'warmup') setSettingWU();
    else if (action === 'unit') setSettingUnit(CFG.unit === 'kg' ? 'lbs' : 'kg');
    else if (action === 'plate') { if (typeof toggleSettingPlate === 'function') toggleSettingPlate(plateVal); }
    const saved = JSON.parse(localStorage.getItem('gp_cfg') || '{}');
    return { action, cfgNow: { prefReps: CFG.prefReps, prefSets: CFG.prefSets, prefRest: CFG.prefRest, warmup: CFG.warmup, unit: CFG.unit }, saved };
  }, { action, repsVal, setsVal, restVal, plateVal });
  for (const k of Object.keys(result.cfgNow)) {
    if (result.saved[k] !== result.cfgNow[k]) {
      failures.push({ engine: engineName, iter, kind: 'settings-not-autosaved', action, field: k, cfg: result.cfgNow[k], localStorage: result.saved[k] });
    }
  }
  return result.cfgNow;
}

async function dayEditCycle(page, engineName, iter) {
  const day = pick(DAYS);
  const exitStyle = pick(['start', 'save', 'reset']);
  const editCount = 1 + Math.floor(rand() * 3);
  const edits = [];
  for (let e = 0; e < editCount; e++) {
    edits.push({ field: pick(['w', 'r', 'sets']), value: 5 + Math.floor(rand() * 95) });
  }

  const outcome = await page.evaluate(({ day, edits, exitStyle }) => {
    clearEditState(); ST.day = null; ST.sd = [];
    openDayEdit(day);
    if (!ST.editList.length) return { skipped: true };
    const targetName = ST.editList[0].name;
    edits.forEach(({ field, value }) => updPlannedEx(0, field, String(value)));
    const expected = { w: ST.editList[0].plannedW, r: ST.editList[0].plannedR, sets: ST.editList[0].plannedSets };

    if (exitStyle === 'start') { commitDayEdit(); }
    else if (exitStyle === 'save') { closeDayEdit(); }
    else { resetDayEdit(); commitDayEdit(); }

    // Re-open the day "later" and read back what it remembers.
    clearEditState(); ST.day = null; ST.sd = [];
    openDayEdit(day);
    const reopened = ST.editList.find(e => e.name === targetName);
    const remembered = reopened ? plannedFor(reopened) : null;
    closeDayEdit();
    return { skipped: false, targetName, exitStyle, expected, remembered };
  }, { day, edits, exitStyle });

  if (outcome.skipped) return;

  if (outcome.exitStyle === 'reset') {
    // Reset must clear the override — remembered must NOT equal what was typed
    // (it should have fallen back to a computed default instead).
    const stillMatchesTyped = ['w', 'r', 'sets'].every(k => outcome.remembered[k] === outcome.expected[k]);
    if (stillMatchesTyped && (outcome.expected.w !== undefined || outcome.expected.r !== undefined || outcome.expected.sets !== undefined)) {
      failures.push({ engine: engineName, iter, kind: 'reset-did-not-clear-plan', day, exercise: outcome.targetName, edits });
    }
  } else {
    // Start or Save: whatever was typed must be exactly what's remembered.
    for (const k of ['w', 'r', 'sets']) {
      if (outcome.expected[k] !== undefined && outcome.remembered[k] !== outcome.expected[k]) {
        failures.push({ engine: engineName, iter, kind: 'plan-not-remembered', day, exercise: outcome.targetName, field: k, exitStyle, expected: outcome.expected[k], actual: outcome.remembered[k], edits });
      }
    }
  }
}

console.log(`Simulating ${ITERATIONS} iterations per engine, seed=${SEED} (replay with SEED=${SEED} npm run simulate)`);
const server = await startServer();
await runEngine('chromium', chromium);
await runEngine('webkit', webkit);
server.close();

if (failures.length) {
  console.log(`\n${failures.length} invariant violation(s) found:\n`);
  for (const f of failures.slice(0, 40)) console.log(JSON.stringify(f));
  if (failures.length > 40) console.log(`...and ${failures.length - 40} more.`);
  process.exit(1);
} else {
  console.log(`\nNo invariant violations across ${ITERATIONS * 2} simulated iterations.`);
  process.exit(0);
}
