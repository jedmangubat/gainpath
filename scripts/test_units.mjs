#!/usr/bin/env node
// Unit-tests GainPath's pure calculation functions (e1rm, sessionVolume,
// fmtVol, recomputePRs, chkPR) against the real inline script, by seeding
// localStorage and loading index.html in a real headless browser — same
// boot pattern as visual_check.mjs. This exercises the actual production
// code (window-scope functions), not a reimplementation of it.
//
// Guards the invariants CLAUDE.md calls out as fragile: recomputePRs()
// must rebuild ST.prs from history (ignoring warm-up sets, dropping noPR
// exercises, only counting zero weight for holdSecs exercises), and chkPR()
// must apply the exact same rules during live-session PR detection.
//
// Usage: npm run test:units

import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8744;

const MIME = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const reqPath = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(ROOT, reqPath === '/' ? '/index.html' : reqPath);
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

// A history with cases that exercise each rule recomputePRs/chkPR must apply:
// - a warm-up set (t:'w') that must be ignored
// - a not-done set that must be ignored
// - a later session with a higher weight that must overtake the earlier PR
// - a noPR exercise (Machine-assisted pull-up) whose sets must never produce a PR
// - a holdSecs exercise (Plank) where w:0 must still count as a valid PR
const HISTORY = [
  {
    day: 'push', dayName: 'Push', date: '2026-07-01', dur: '50m', sets: 4, mk: '2026-07', dk: '2026-07-01',
    exercises: [
      { name: 'Bench press', exFeel: 'right', sets: [
        { done: true, t: 'w', w: 60, r: 5 },
        { done: true, t: 'x', w: 100, r: 8 },
        { done: true, t: 'x', w: 100, r: 10 },
        { done: false, t: 'x', w: 999, r: 99 }
      ] },
      { name: 'Machine-assisted pull-up', exFeel: 'right', sets: [
        { done: true, t: 'x', w: 200, r: 5 }
      ] },
      { name: 'Plank', exFeel: 'right', sets: [
        { done: true, t: 'x', w: 0, r: 45 }
      ] }
    ]
  },
  {
    day: 'push', dayName: 'Push', date: '2026-07-08', dur: '50m', sets: 1, mk: '2026-07', dk: '2026-07-08',
    exercises: [
      { name: 'Bench press', exFeel: 'right', sets: [
        { done: true, t: 'x', w: 105, r: 6 }
      ] }
    ]
  }
];

// Deliberately wrong cached PRs — proves recomputePRs() rebuilds from
// ST.history rather than trusting whatever gp_p already holds.
const STALE_PRS = {
  'Bench press': { w: 999, r: 1, date: 'Jan 1, 2020' },
  'Machine-assisted pull-up': { w: 500, r: 1, date: 'Jan 1, 2020' }
};

async function main() {
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(String(err)));

  await page.goto(`http://localhost:${PORT}/index.html`);
  await page.evaluate(({ history, prs }) => {
    localStorage.setItem('gp_cfg', JSON.stringify({
      name: 'Unit Test', sex: 'male', setup: true, unit: 'kg', exp: 'intermediate',
      goal: 'definition', split: 'pplul', freq: 5, warmup: true, wuReps: 12,
      prefReps: 10, prefRest: 90, prefSets: 3, startingWeights: 'ai', keyLifts: {}
    }));
    localStorage.setItem('gp_h', JSON.stringify(history));
    localStorage.setItem('gp_p', JSON.stringify(prs));
    localStorage.setItem('gp_mw', JSON.stringify({}));
  }, { history: HISTORY, prs: STALE_PRS });
  await page.reload();
  await page.waitForSelector('#s-home.active');

  const results = await page.evaluate(() => {
    const out = [];
    const check = (name, actual, expected) => {
      const pass = JSON.stringify(actual) === JSON.stringify(expected);
      out.push({ name, pass, actual, expected });
    };

    // e1rm — Epley estimated 1RM
    check('e1rm(100,10) computes Epley formula', e1rm(100, 10), 133.5);
    check('e1rm(0,10) is 0 for zero weight', e1rm(0, 10), 0);
    check('e1rm(100,0) is 0 for zero reps', e1rm(100, 0), 0);

    // sessionVolume — ignores warm-ups and zero-weight (bodyweight/hold) sets
    check('sessionVolume ignores warm-up and zero-weight sets', sessionVolume({
      exercises: [{ sets: [
        { done: true, t: 'x', w: 100, r: 8 },
        { done: true, t: 'w', w: 60, r: 5 },
        { done: true, t: 'x', w: 0, r: 45 }
      ] }]
    }), 800);

    // fmtVol — formats under/over 1000 differently
    check('fmtVol under 1000 rounds plainly', fmtVol(800, 'kg'), '800kg');
    check('fmtVol at/over 1000 uses k-suffix', fmtVol(1250, 'kg'), '1.3k kg');

    // recomputePRs — the invariant CLAUDE.md flags as fragile
    recomputePRs();
    check('recomputePRs ignores warm-up/not-done sets and keeps the higher session',
      ST.prs['Bench press'], { w: 105, r: 6, date: '2026-07-08' });
    check('recomputePRs drops noPR exercises even if a stale cache had one',
      ST.prs['Machine-assisted pull-up'], undefined);
    check('recomputePRs counts zero weight for holdSecs exercises',
      ST.prs['Plank'], { w: 0, r: 45, date: '2026-07-01' });

    // chkPR — must apply the same rules during live-session PR detection
    check('chkPR rejects noPR exercises regardless of weight',
      chkPR('Machine-assisted pull-up', 999, 1, false), false);
    check('chkPR rejects zero weight when allowZeroW is false',
      chkPR('Plank', 0, 60, false), false);
    check('chkPR accepts zero weight for holdSecs when allowZeroW is true',
      chkPR('Plank', 0, 60, true), true);
    check('chkPR beats an existing PR on higher weight',
      chkPR('Bench press', 110, 4, false), true);
    check('chkPR after beating it reflects the new weight in ST.prs',
      ST.prs['Bench press'], { w: 110, r: 4, date: ST.prs['Bench press'].date });

    return out;
  });

  await browser.close();
  server.close();

  const failed = results.filter(r => !r.pass);
  for (const r of results) {
    console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}`);
    if (!r.pass) console.log(`      expected: ${JSON.stringify(r.expected)}\n      actual:   ${JSON.stringify(r.actual)}`);
  }
  if (pageErrors.length) console.log('\nPage errors during test run:\n' + pageErrors.join('\n'));

  console.log(`\n${results.length - failed.length}/${results.length} passed.`);
  process.exit(failed.length > 0 || pageErrors.length > 0 ? 1 : 0);
}

main();
