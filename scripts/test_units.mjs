#!/usr/bin/env node
// Unit-tests GainPath's pure calculation functions (e1rm, sessionVolume,
// fmtVol, recomputePRs, chkPR, suggestWeight, roundToGymWeight, dkDay,
// dayLabel, timeAxis, cmpVer) against the
// real inline script, by seeding
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

    // ── suggestWeight — RIR autoregulation. These read ST.history via
    // exHistory(), so swap in a controlled history per case. Leave the gym
    // inventory empty so roundToGymWeight is a no-op and deltas are exact.
    // 'Barbell row' (mg:back) gives a full increment of 5kg and a small step of
    // 2.5kg, so 'easy' and 'good' are distinguishable.
    CFG.unit = 'kg'; CFG.gymDumbbells = []; CFG.gymPlates = {};
    const rowEx = { name: 'Barbell row', mg: 'back' };
    const mkSess = (name, exFeel, w) => ({ date: 'd', exercises: [{ name, exFeel, sets: [{ done: true, t: 'x', w, r: 8 }] }] });

    ST.history = [mkSess('Barbell row', 'easy', 50)];
    check('suggestWeight: 5+ reps left → +full increment (5kg)',
      suggestWeight(rowEx, 50), { feel: 'easy', delta: 5, newW: 55 });
    ST.history = [mkSess('Barbell row', 'good', 50)];
    check('suggestWeight: 3–4 reps left → +small step (2.5kg)',
      suggestWeight(rowEx, 50), { feel: 'good', delta: 2.5, newW: 52.5 });
    ST.history = [mkSess('Barbell row', 'hard', 50)];
    check('suggestWeight: 1–2 reps left → hold (no suggestion)',
      suggestWeight(rowEx, 50), null);
    ST.history = [mkSess('Barbell row', 'max', 50)];
    check('suggestWeight: single failure → hold',
      suggestWeight(rowEx, 50), null);
    ST.history = [mkSess('Barbell row', 'max', 50), mkSess('Barbell row', 'max', 50)];
    check('suggestWeight: two failures in a row → deload',
      suggestWeight(rowEx, 50), { feel: 'max', delta: -5, newW: 45 });

    // ── roundToGymWeight — equipment-aware snapping (round to owned gear).
    // Dumbbells: user owns whole numbers 1–10 only, so nothing 2.5 is ever
    // proposed.
    const dbEx = { name: 'Dumbbell curl', mg: 'biceps' };
    CFG.gymDumbbells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    check('roundToGymWeight up: dumbbell 6.5 → next owned (7), never 2.5-steps',
      roundToGymWeight(dbEx, 6.5, 'up'), 7);
    check('roundToGymWeight down: dumbbell 6.5 → 6',
      roundToGymWeight(dbEx, 6.5, 'down'), 6);
    check('roundToGymWeight up: exact owned weight stays',
      roundToGymWeight(dbEx, 7, 'up'), 7);
    check('roundToGymWeight up: above the rack → the heaviest owned',
      roundToGymWeight(dbEx, 15, 'up'), 10);
    check('roundToGymWeight nearest (default dir): closest owned',
      roundToGymWeight(dbEx, 6.4), 6);

    // Plates: user owns a 20/10/5 set (per pair); loadable per-side totals are
    // multiples of 5 on a 20kg bar. Snap up/down to the true next-loadable.
    CFG.gymDumbbells = []; CFG.gymPlates = { 20: 1, 10: 1, 5: 1 };
    check('roundToGymWeight up: barbell 68 → next loadable total (70)',
      roundToGymWeight(rowEx, 68, 'up'), 70);
    check('roundToGymWeight down: barbell 68 → prev loadable total (60)',
      roundToGymWeight(rowEx, 68, 'down'), 60);
    check('roundToGymWeight up: already-loadable total is unchanged',
      roundToGymWeight(rowEx, 60, 'up'), 60);
    CFG.gymPlates = {};
    check('roundToGymWeight: no inventory configured → pass-through',
      roundToGymWeight(rowEx, 63, 'up'), 63);

    // ── dkDay / dayLabel / timeAxis — the chart time axis. The whole point is
    // that x is proportional to elapsed days, so a gap is drawn as a gap.
    check('dkDay: consecutive days are 1 apart',
      dkDay('2026-01-06') - dkDay('2026-01-05'), 1);
    check('dkDay: spacing is the real day count, not one slot per entry',
      dkDay('2026-04-01') - dkDay('2026-01-01'), 90);
    check('dkDay: spans a year boundary correctly',
      dkDay('2026-01-01') - dkDay('2025-12-31'), 1);
    check('dayLabel: round-trips a day number back to its date',
      dayLabel(dkDay('2026-03-04')), 'Mar 4');
    check('dayLabel: full form includes the year',
      dayLabel(dkDay('2026-03-04'), true), 'Mar 4, 2026');

    // timeAxis pins the axis to the data's real span; tick count stays ~6 no
    // matter how wide that span is, and steps stay whole days.
    const axisFor = (dks) => {
      const days = dks.map(dkDay);
      const ax = timeAxis(days, '#000');
      const step = ax.ticks.stepSize;
      return { min: ax.min, max: ax.max, step, ticks: Math.floor((ax.max - ax.min) / step) + 1, whole: step === Math.round(step) };
    };
    check('timeAxis: 3-day span → axis spans the data, whole-day steps, ≤6 ticks',
      axisFor(['2026-01-01', '2026-01-02', '2026-01-04']),
      { min: dkDay('2026-01-01'), max: dkDay('2026-01-04'), step: 1, ticks: 4, whole: true });
    check('timeAxis: 2-year span → still ≤6 whole-day ticks',
      (() => { const a = axisFor(['2024-01-01', '2025-06-01', '2026-01-01']); return { ok: a.ticks <= 6 && a.whole, min: a.min, max: a.max }; })(),
      { ok: true, min: dkDay('2024-01-01'), max: dkDay('2026-01-01') });
    check('timeAxis: single point → padded ±1 day instead of a zero-width axis',
      axisFor(['2026-01-01']),
      { min: dkDay('2026-01-01') - 1, max: dkDay('2026-01-01') + 1, step: 1, ticks: 3, whole: true });

    // ── cmpVer — gates the What's New sheet. A bug-fix release leaves
    // WHATS_NEW_VERSION alone, so upgraders must compare as "already seen".
    check('cmpVer: same version → 0 (sheet stays hidden)', cmpVer('2.0.1', '2.0.1'), 0);
    check('cmpVer: newer than the news version → 1 (already seen it)', cmpVer('2.0.2', '2.0.1'), 1);
    check('cmpVer: older than the news version → -1 (show the sheet)', cmpVer('2.0.0', '2.0.1'), -1);
    check('cmpVer: legacy "0" default is older than anything', cmpVer('0', '2.0.1'), -1);
    check('cmpVer: compares numerically, not lexically', cmpVer('2.0.10', '2.0.9'), 1);
    check('cmpVer: missing segments count as 0', cmpVer('2.1', '2.1.0'), 0);

    // ── recomputeBadges — badges are a DERIVED cache, same contract as ST.prs.
    // Seed a controlled history, recompute, assert on the earned id set.
    const bSess = (dk, exs) => ({ day: 'push', dayName: 'Push', date: dk, dur: '50m', sets: 1, mk: dk.slice(0, 7), dk, exercises: exs });
    const bEx = (name, w, r) => ({ name, exFeel: 'good', sets: [{ done: true, t: 'x', w, r }] });
    const ids = () => Object.keys(ST.badges).sort();
    CFG.unit = 'kg'; CFG.freq = 5; CFG.restDays = []; CFG.restWeeks = []; ST.bw = [];

    ST.history = [bSess('2026-03-02', [bEx('Flat barbell bench press', 60, 5)])];
    recomputeBadges();
    check('badges: one session earns First Rep and First Flag only',
      ids(), ['first_flag', 'first_rep']);
    check('badges: earned date is the session that met the condition',
      ST.badges.first_rep, { dk: '2026-03-02' });

    // Ten Deep must stamp the 10th session's date, not the newest session's —
    // this is the whole point of replaying history chronologically.
    ST.history = Array.from({ length: 12 }, (_, i) =>
      bSess(`2026-03-${String(2 + i).padStart(2, '0')}`, [bEx('Flat barbell bench press', 60, 5)]));
    recomputeBadges();
    check('badges: Ten Deep is stamped with the 10th session, not the latest',
      ST.badges.ten_deep, { dk: '2026-03-11' });

    // Perfect Week: CFG.freq sessions inside one Monday-week.
    CFG.freq = 3;
    ST.history = [bSess('2026-03-02', [bEx('Barbell row', 50, 5)]), bSess('2026-03-04', [bEx('Barbell row', 50, 5)])];
    recomputeBadges();
    check('badges: Perfect Week stays locked below the weekly target',
      ST.badges.perfect_week, undefined);
    ST.history.push(bSess('2026-03-06', [bEx('Barbell row', 50, 5)]));
    recomputeBadges();
    check('badges: Perfect Week unlocks when CFG.freq is met in one week',
      ST.badges.perfect_week, { dk: '2026-03-06' });

    // Deleting the qualifying session must revoke it — the derived-cache invariant.
    ST.history.pop();
    recomputeBadges();
    check('badges: removing the qualifying session revokes the badge',
      ST.badges.perfect_week, undefined);

    // Back on Track: a 14-day gap counts, 13 does not.
    CFG.freq = 5;
    ST.history = [bSess('2026-03-02', [bEx('Barbell row', 50, 5)]), bSess('2026-03-15', [bEx('Barbell row', 50, 5)])];
    recomputeBadges();
    check('badges: a 13-day gap is not Back on Track', ST.badges.back_on_track, undefined);
    ST.history = [bSess('2026-03-02', [bEx('Barbell row', 50, 5)]), bSess('2026-03-16', [bEx('Barbell row', 50, 5)])];
    recomputeBadges();
    check('badges: a 14-day gap earns Back on Track', ST.badges.back_on_track, { dk: '2026-03-16' });

    // Ten Tonne threshold follows CFG.unit — 10,000 kg but 22,000 lb.
    const bigSet = (w, r) => ({ name: 'Barbell row', exFeel: 'good', sets: [{ done: true, t: 'x', w, r }] });
    ST.history = [bSess('2026-03-02', [bigSet(100, 150)])]; // 15,000 units
    CFG.unit = 'kg'; recomputeBadges();
    check('badges: 15,000 units clears the 10,000 kg threshold', !!ST.badges.ten_tonne, true);
    CFG.unit = 'lbs'; recomputeBadges();
    check('badges: the same 15,000 does not clear the 22,000 lb threshold', ST.badges.ten_tonne, undefined);
    CFG.unit = 'kg';

    // Bodyweight badges need a weigh-in, then compare against it.
    ST.bw = [];
    ST.history = [bSess('2026-03-02', [bEx('Barbell back squat', 90, 3)])];
    recomputeBadges();
    check('badges: Bodyweight Club stays locked with no weigh-in logged',
      ST.badges.bodyweight_club, undefined);
    ST.bw = [{ dk: '2026-03-01', date: 'Mar 1, 2026', w: 80, waist: null, arms: null }];
    recomputeBadges();
    check('badges: 90kg squat at 80kg body weight earns Bodyweight Club',
      !!ST.badges.bodyweight_club, true);
    check('badges: 90kg squat is not yet Double Bodyweight',
      ST.badges.double_bodyweight, undefined);

    // Warm-ups and noPR exercises must not feed PR-event badges.
    ST.bw = [];
    ST.history = [bSess('2026-03-02', [
      { name: 'Machine-assisted pull-up', exFeel: 'good', sets: [{ done: true, t: 'x', w: 200, r: 5 }] },
      { name: 'Barbell row', exFeel: 'good', sets: [{ done: true, t: 'w', w: 40, r: 10 }] }
    ])];
    recomputeBadges();
    check('badges: warm-ups and noPR lifts never produce a First Flag',
      ST.badges.first_flag, undefined);

    // streakEndingAt is the shared definition — asking it about the current
    // week must agree with streak() itself.
    ST.history = [bSess('2026-03-02', [bEx('Barbell row', 50, 5)])];
    check('streakEndingAt agrees with streak() for the current week',
      streakEndingAt(weekDayMap(ST.history), dkey(startOfWeek(new Date())), true), streak());

    // Showing the home screen must always render it. Boot only calls
    // refreshHome() when restoreInProgress() returns false, so a user who
    // relaunched into a restored day-edit and then tapped a bottom-nav tab
    // landed on a home screen nothing had ever filled in — an empty Train tab
    // that survived relaunches, since gp_wip kept sending boot down the
    // restore path. ss() owns the invariant now, so every route to home
    // (bnav, closeDayEdit, cancelProgram, boot) is covered by construction.
    const homeBlank = () => { gid('dbtn-list').innerHTML = ''; gid('h-gr').textContent = ''; };
    const homeRendered = () => gid('dbtn-list').children.length > 0 && gid('h-gr').textContent !== '';
    homeBlank();
    ss('home');
    check('ss("home") renders the home screen it shows', homeRendered(), true);
    homeBlank();
    bnav('wk');
    check('bnav("wk") renders the Train tab it opens', homeRendered(), true);

    // addWorkSet / delSet — mid-workout set count changes must never rewrite
    // logged work (the PR cache is derived from it) and must always leave at
    // least one work set for the lift to be loggable at all.
    startDay('push');
    ST.exi = ST.sd.findIndex(it => equipRank(it.ex) === 0);
    const cur = () => ST.sd[ST.exi].sets;
    const workN = () => cur().filter(s => s.t !== 'w').length;
    const wuN = () => cur().filter(s => s.t === 'w').length;
    ss('wo'); renderEx();

    // Switching tabs mid-workout must leave the workout running — the only
    // way off s-wo used to be goHome(), which explicitly ends the workout.
    // bnav() to another tab must not touch ST.day/gp_wip, and bnav('wk')
    // must route back into the live workout rather than the dashboard.
    bnav('cal');
    check('bnav("cal") mid-workout leaves the workout running', ST.day, 'push');
    bnav('wk');
    check('bnav("wk") mid-workout returns to the workout screen, not home',
      gid('s-wo').classList.contains('active'), true);
    check('bnav("wk") mid-workout re-highlights the Train tab',
      gid('bn-wk').classList.contains('on'), true);

    const beforeAdd = cur().length;
    const lastWork = cur().filter(s => s.t !== 'w').slice(-1)[0];
    const clonedFrom = { w: lastWork.w, r: lastWork.r };
    addWorkSet();
    check('addWorkSet appends one set', cur().length, beforeAdd + 1);
    check('addWorkSet clones the last work set weight/reps',
      { w: cur().slice(-1)[0].w, r: cur().slice(-1)[0].r }, clonedFrom);
    check('addWorkSet adds a work set, not a warm-up', cur().slice(-1)[0].t, 'x');

    // A logged set is not removable — delSet must refuse it outright.
    const firstWork = cur().findIndex(s => s.t !== 'w');
    cur()[firstWork].done = true;
    const nBefore = cur().length;
    delSet(firstWork);
    check('delSet refuses to remove a logged set', cur().length, nBefore);
    cur()[firstWork].done = false;

    // Warm-ups are removable while un-logged.
    const wuBefore = wuN();
    delSet(cur().findIndex(s => s.t === 'w'));
    check('delSet removes an un-logged warm-up set', wuN(), wuBefore - 1);

    // Deleting work sets must stop at one, not empty the exercise.
    for (let g = 0; g < 20 && workN() > 0; g++) {
      const before = cur().length;
      delSet(cur().findIndex(s => s.t !== 'w'));
      if (cur().length === before) break;
    }
    check('delSet always leaves at least one work set', workN(), 1);

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
