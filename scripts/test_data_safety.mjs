#!/usr/bin/env node
// End-to-end data-safety checks, driven through the real UI with real files:
//  - backup → restore on a fresh device (onboarding "Already used GainPath
//    before?") returns every record, for a large lbs history with custom
//    exercises, weigh-ins, machine bases, gear and day plans
//  - restoring over existing data asks first, keeps a copy, and Undo brings
//    the old data back exactly; cancelling changes nothing
//  - a failing save raises the alert, Back up still works from memory, and
//    the alert clears once saving works again
//  - the iPhone "not installed" warning (WebKit, iPhone user agent), its
//    30-day return, and that desktop never sees it
//  - the backup-reminder interval setting
// Downloads land in scripts/.data-safety/ (gitignored).
//
// Usage: npm run test:data   (ENGINE=webkit npm run test:data for WebKit)

import { chromium, webkit, devices } from 'playwright';
import { createServer } from 'http';
import { readFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'scripts', '.data-safety');
const PORT = 8746;
const URL0 = `http://localhost:${PORT}/index.html`;
const MIME = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2' };

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const u = decodeURIComponent(req.url.split('?')[0]);
      const f = path.join(ROOT, u === '/' ? '/index.html' : u);
      let data;
      try { data = await readFile(f); } catch { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(data);
    });
    server.listen(PORT, () => resolve(server));
  });
}

// A large, awkward lbs user: 400 sessions, custom exercise, weigh-ins,
// machine bases, owned gear, a day plan and a conversion memo.
function bigUser(seedW) {
  const history = [];
  for (let i = 0; i < 400; i++) {
    const d = new Date(Date.UTC(2025, 0, 1) + i * 2 * 864e5).toISOString().slice(0, 10);
    history.push({ day: 'push', dayName: 'Push', date: d, dk: d, mk: d.slice(0, 7), dur: '48m', sets: 6, feel: 'good', exercises: [
      { name: 'Flat barbell bench press', exFeel: 'good', sets: [{ done: true, t: 'w', w: 95, r: 12 }, { done: true, t: 'x', w: seedW + (i % 20) * 5, r: 8 }, { done: true, t: 'x', w: seedW + (i % 20) * 5, r: 7 }] },
      { name: 'My cable thing', exFeel: 'hard', note: 'custom note', sets: [{ done: true, t: 'x', w: 42.5, r: 12 }] },
      { name: 'Hack squat', exFeel: 'easy', sets: [{ done: true, t: 'x', w: 180, r: 10 }] }
    ] });
  }
  const cfg = { name: 'Big Lbs', firstName: 'Big', lastName: 'Lbs', sex: 'male', setup: true, unit: 'lbs', bw: 187.4, exp: 'advanced', goal: 'strength',
    split: 'pplul', freq: 5, warmup: true, wuReps: 10, prefReps: 8, prefRest: 120, prefSets: 3, startingWeights: 'ai', keyLifts: { chest: { w: 225, r: 5 } },
    customExercises: [{ name: 'My cable thing', mg: 'chest', baseW: 40, custom: true, equip: 'cable' }], gymDumbbells: [5, 10, 25, 50, 75, 100], gymPlates: { 45: 1, 25: 1, 10: 1, 5: 1, 2.5: 1 },
    dayPlan: { push: { 'Flat barbell bench press': { w: 235, r: 5 } } }, unitMemo: { from: 'kg', to: 'lbs', w: { '220.5': 100 }, db: {}, pl: {} }, lang: 'en', lastSeenVersion: '9.9.9', tutorialSeen: true, badgesIntroSeen: true };
  const bw = [{ dk: '2025-01-01', date: 'Jan 1, 2025', w: 190.2, waist: 34, arms: null }, { dk: '2026-06-01', date: 'Jun 1, 2026', w: 187.4, waist: null, arms: 15.5 }];
  return { cfg, history, bw, mw: { 'Hack squat': 75, 'Smith machine': 20 } };
}

async function seed(page, u, extra = {}) {
  await page.goto(URL0);
  await page.evaluate(({ u, extra }) => {
    localStorage.clear();
    localStorage.setItem('gp_cfg', JSON.stringify(u.cfg)); localStorage.setItem('gp_h', JSON.stringify(u.history));
    localStorage.setItem('gp_bw', JSON.stringify(u.bw)); localStorage.setItem('gp_mw', JSON.stringify(u.mw)); localStorage.setItem('gp_p', '{}');
    localStorage.setItem('gp_a2hs_dismissed', 'true'); localStorage.setItem('gp_last_export', new Date().toISOString());
    Object.entries(extra).forEach(([k, v]) => localStorage.setItem(k, v));
  }, { u, extra });
  await page.reload();
  await page.waitForSelector('#s-home.active');
  // Let the app write its normalised state (defaults filled in), so "before"
  // snapshots are what the app itself stores.
  await page.evaluate(() => { saveCFG(); saveData(); });
}
// Seed localStorage from a non-app page on the same origin, so the app's very
// first boot (and its IndexedDB migration) sees this data. Deleting the
// database under a live page is deferred in WebKit, so tests never do that.
async function seedCold(page, u) {
  await page.goto(`http://localhost:${PORT}/manifest.json`);
  await page.evaluate((u) => {
    localStorage.setItem('gp_cfg', JSON.stringify(u.cfg)); localStorage.setItem('gp_h', JSON.stringify(u.history));
    localStorage.setItem('gp_bw', JSON.stringify(u.bw)); localStorage.setItem('gp_mw', JSON.stringify(u.mw)); localStorage.setItem('gp_p', '{}');
    localStorage.setItem('gp_a2hs_dismissed', 'true'); localStorage.setItem('gp_last_export', new Date().toISOString());
  }, u);
  await page.goto(URL0);
  await page.waitForSelector('#s-home.active');
}
const stored = (page) => page.evaluate(() => ({
  cfg: JSON.parse(localStorage.getItem('gp_cfg')), history: JSON.parse(localStorage.getItem('gp_h')),
  bw: JSON.parse(localStorage.getItem('gp_bw')), mw: JSON.parse(localStorage.getItem('gp_mw')), prs: JSON.parse(localStorage.getItem('gp_p'))
}));
// The records a restore must bring back. cfg is compared on the user's own
// fields; bookkeeping written on the way (lastSeenVersion, exportedAtHistoryLen)
// is allowed to differ.
const core = (s) => {
  const { lastSeenVersion, exportedAtHistoryLen, ...cfg } = s.cfg; // eslint-disable-line no-unused-vars
  return JSON.stringify({ cfg: Object.keys(cfg).sort().map(k => [k, cfg[k]]), history: s.history, bw: s.bw, mw: s.mw });
};

// First difference between two stored states, for failure output.
function firstDiff(x, y, at = '') {
  if (JSON.stringify(x) === JSON.stringify(y)) return null;
  if (x && y && typeof x === 'object' && typeof y === 'object') {
    for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) { const d = firstDiff(x[k], y[k], at + '.' + k); if (d) return d; }
  }
  return { at, a: JSON.stringify(x)?.slice(0, 160), b: JSON.stringify(y)?.slice(0, 160) };
}
async function exportViaUI(page, file) {
  await page.evaluate(() => { openSettings(); openDataSettings(); });
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#s-setdata button[onclick="exportData()"]')]);
  const p = path.join(OUT, file); await dl.saveAs(p); exportViaUI.lastName = dl.suggestedFilename(); return p;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const server = await startServer();
  const results = [], errors = [];
  const check = (name, pass, detail) => results.push({ name, pass: !!pass, detail });

  // ENGINE=webkit runs sections 1–4 and 6 in WebKit (the iPhone engine) too.
  const browser = await (process.env.ENGINE === 'webkit' ? webkit : chromium).launch();
  const ctx = async (opts) => { const c = await browser.newContext({ acceptDownloads: true, ...opts }); const p = await c.newPage(); p.on('pageerror', e => { errors.push(String(e)); console.log('PAGEERROR', String(e)); }); return [c, p]; };

  // ── 1. Backup on one device, restore on a fresh one.
  const user = bigUser(185);
  let [cA, a] = await ctx();
  await seed(a, user);
  const before = await stored(a);
  const file = await exportViaUI(a, 'big-lbs.json');
  const fileData = JSON.parse(await readFile(file, 'utf8'));
  check('export: file name is dated', /^gainpath-backup-\d{4}-\d{2}-\d{2}\.json$/.test(exportViaUI.lastName), exportViaUI.lastName);
  check('export: file holds all 400 sessions, weigh-ins, machine bases and cfg', fileData.history.length === 400 && core({ ...fileData }) === core(before), firstDiff(before, fileData));
  await cA.close();

  let [cB, b] = await ctx();
  await b.goto(URL0);
  await b.waitForSelector('#ob-import-file', { state: 'attached' });
  await b.setInputFiles('#ob-import-file', file);
  await b.waitForSelector('#s-home.active');
  const after = await stored(b);
  check('restore on a fresh device (onboarding): every record identical', core(after) === core(before), firstDiff(before, after));
  check('restore: lbs unit, custom exercise, gear, day plan and unit memo survive',
    after.cfg.unit === 'lbs' && after.cfg.customExercises[0].name === 'My cable thing' && JSON.stringify(after.cfg.gymDumbbells) === JSON.stringify(user.cfg.gymDumbbells) &&
    after.cfg.dayPlan.push['Flat barbell bench press'].w === 235 && after.cfg.unitMemo.w['220.5'] === 100);
  const prBench = after.prs['Flat barbell bench press'];
  check('restore: PRs are rebuilt from history (not trusted from the file)', prBench && prBench.w === 185 + 19 * 5, prBench);
  await cB.close();

  // ── 2. Restoring over existing data: confirm, keep a copy, undo.
  const other = bigUser(100); other.history = other.history.slice(0, 12);
  let [cC, c] = await ctx();
  await seed(c, other);
  const mine = await stored(c);
  c.once('dialog', d => d.dismiss());
  await c.evaluate(() => { openSettings(); openDataSettings(); });
  await c.setInputFiles('#import-file', file);
  await c.waitForTimeout(500);
  check('restore over data: cancelling the confirm changes nothing', core(await stored(c)) === core(mine));
  c.once('dialog', d => d.accept());
  await c.setInputFiles('#import-file', file);
  await c.waitForSelector('#s-home.active');
  check('restore over data: accepted restore brings in the backup', core(await stored(c)) === core(before));
  check('restore over data: the previous data is kept for undo', await c.evaluate(() => JSON.parse(localStorage.getItem('gp_pre_restore') || 'null')?.history?.length) === 12);
  await c.evaluate(() => { openSettings(); openDataSettings(); });
  check('restore over data: Undo button is shown', await c.isVisible('#undo-restore-btn'));
  c.once('dialog', d => d.accept());
  await c.click('#undo-restore-btn');
  await c.waitForSelector('#s-home.active');
  check('undo restore: the original data is back exactly', core(await stored(c)) === core(mine));
  check('undo restore: the kept copy is cleared', await c.evaluate(() => localStorage.getItem('gp_pre_restore')) === null);
  await c.setInputFiles('#import-file', path.join(ROOT, 'package.json'));
  await c.waitForFunction(() => /invalid backup/.test(gid('ex-st').textContent), null, { timeout: 5000 }).catch(() => {});
  check('restore: a non-backup JSON file is rejected with a message', /invalid backup/.test(await c.textContent('#ex-st')) && core(await stored(c)) === core(mine));
  await cC.close();

  // ── 3. Save failures are visible, and Back up still works from memory.
  let [cD, d] = await ctx();
  await seed(d, bigUser(135));
  check('save alert: hidden while saving works', !(await d.isVisible('#save-alert')));
  await d.evaluate(() => {
    window.__realSet = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new DOMException('full', 'QuotaExceededError'); };
    setWeighIn(dkey(new Date()), 186);
  });
  check('save alert: a failed save shows the alert', await d.isVisible('#save-alert'));
  await d.screenshot({ path: path.join(OUT, 'save-alert.png') });
  const [dl2] = await Promise.all([d.waitForEvent('download'), d.click('#save-alert button')]);
  const rescue = JSON.parse(await readFile(await dl2.path(), 'utf8'));
  check('save alert: Back up works while saving fails, and includes the unsaved weigh-in', rescue.bw[rescue.bw.length - 1].w === 186);
  await d.evaluate(() => { Storage.prototype.setItem = window.__realSet; saveData(); });
  check('save alert: clears once a save succeeds again', !(await d.isVisible('#save-alert')));
  check('save alert: the weigh-in is saved once storage works', await d.evaluate(() => JSON.parse(localStorage.getItem('gp_bw')).some(e => e.w === 186)));
  await cD.close();

  // ── 4. Backup reminder interval.
  let [cE, e] = await ctx();
  const five = new Date(Date.now() - 5 * 864e5).toISOString();
  const eu = bigUser(135); eu.cfg.exportedAtHistoryLen = eu.history.length; // backed up after the last session, so only the day rule applies
  await seed(e, eu, { gp_last_export: five, gp_backup_nudge_seen: five });
  check('reminder: 5 days since backup with a 7-day interval → no reminder', await e.evaluate(() => checkBackupNudge()) === false);
  await e.evaluate(() => { openSettings(); openDataSettings(); });
  await e.click('#bkd-3');
  await e.evaluate(() => ss('home'));
  const rem = await e.evaluate(() => ({ banner: gid('prt-h').textContent, saved: JSON.parse(localStorage.getItem('gp_cfg')).backupEveryDays }));
  check('reminder: after switching to 3 days, going back to Train shows the reminder; the setting is saved', /back up/i.test(rem.banner) && rem.saved === 3, rem);
  check('status: shows days since the last backup', /Last backup: 5 day/.test(await e.textContent('#bk-status')));
  check('desktop: no iPhone warning banner or risk line', !/could be deleted/.test(await e.textContent('#prt-h')) && !/7 days/.test(await e.textContent('#bk-status')));
  // ── Privacy screen + page.
  await e.evaluate(() => localStorage.removeItem('gp_anon_id'));
  await e.evaluate(() => { openSettings(); openPrivacySettings(); });
  check('privacy: with no ID yet, the screen shows none and does not create one', (await e.textContent('#privacy-anon-id')) === '—' && await e.evaluate(() => localStorage.getItem('gp_anon_id')) === null);
  const anon = await e.evaluate(() => getAnonId());
  await e.evaluate(() => openPrivacySettings());
  check('privacy: the screen shows the exact ID the usage counter receives', (await e.textContent('#privacy-anon-id')) === anon);
  await e.setViewportSize({ width: 390, height: 844 }); await e.waitForTimeout(400); await e.screenshot({ path: path.join(OUT, 'privacy-settings.png'), fullPage: true });
  const pp = await (await e.context()).newPage(); const ext = []; const perr = [];
  pp.on('request', r => { const h = new URL(r.url()).hostname; if (h !== 'localhost') ext.push(h); }); pp.on('pageerror', x => perr.push(String(x)));
  await pp.goto(`http://localhost:${PORT}/privacy.html`); await pp.waitForLoadState('networkidle');
  check('privacy.html: loads with no third-party requests and no errors', ext.length === 0 && perr.length === 0 && /Your workouts stay on your device/.test(await pp.textContent('body')), { ext, perr });
  await pp.setViewportSize({ width: 390, height: 844 }); await pp.screenshot({ path: path.join(OUT, 'privacy-page.png'), fullPage: true });
  check('privacy.html: no horizontal scroll at phone width', await pp.evaluate(() => document.documentElement.scrollWidth <= 390));
  await pp.close();
  await cE.close();

  // ── 6. IndexedDB mirror: verified migration, dual-write, recovery, reset.
  const idbDump = (page) => page.evaluate(() => new Promise((res, rej) => {
    const r = indexedDB.open('gainpath', 1);
    r.onsuccess = () => {
      const d = r.result, out = { kv: {}, meta: {}, backups: {} }, tx = d.transaction(['kv', 'meta', 'backups']);
      ['kv', 'meta', 'backups'].forEach(n => { const c = tx.objectStore(n).openCursor(); c.onsuccess = () => { const x = c.result; if (x) { out[n][x.key] = x.value; x.continue(); } }; });
      tx.oncomplete = () => { d.close(); res(out); }; tx.onerror = () => rej(tx.error);
    };
    r.onerror = () => rej(r.error);
  }));
  const lsAll = (page) => page.evaluate(() => { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith('gp_')) o[k] = localStorage.getItem(k); } return o; });
  const idbSettled = (page) => page.waitForFunction(() => IDB_READY || (IDB_ACTIVE_STATE && IDB_ACTIVE_STATE.state === 'failed'));
  const mirrorMatches = (ls, kv) => ['gp_cfg', 'gp_h', 'gp_p', 'gp_mw', 'gp_bw'].every(k => ls[k] === kv[k]);

  // Fresh user (no data yet).
  let [cF, f] = await ctx();
  await f.goto(URL0); await idbSettled(f);
  let db = await idbDump(f);
  check('idb/fresh user: migration verified with nothing to copy, backup snapshot written', db.meta.migration?.state === 'verified' && !!db.backups['pre-idb-2.9.0']);
  await f.evaluate(() => { CFG.firstName = 'Fresh'; saveCFG(); });
  await f.waitForTimeout(100); db = await idbDump(f);
  check('idb/fresh user: later saves are mirrored', db.kv.gp_cfg === await f.evaluate(() => localStorage.getItem('gp_cfg')));
  await cF.close();

  // Large lbs history with custom exercises: migrate, verify, backup, re-run.
  let [cG, g] = await ctx();
  const gu = bigUser(185);
  await seedCold(g, gu);
  await idbSettled(g);
  const lsBefore = { gp_h: JSON.stringify(gu.history) };
  db = await idbDump(g);
  const lsNow = await lsAll(g);
  check('idb/large lbs user: migration verified', db.meta.migration?.state === 'verified', db.meta.migration);
  check('idb/large lbs user: mirror matches localStorage key by key (400 sessions, custom exercise, lbs)',
    mirrorMatches(lsNow, db.kv) && JSON.parse(db.kv.gp_h).length === 400 && JSON.parse(db.kv.gp_cfg).unit === 'lbs' && JSON.parse(db.kv.gp_cfg).customExercises[0].name === 'My cable thing');
  check('idb/large lbs user: pre-migration backup holds the original data', db.backups['pre-idb-2.9.0'].data.gp_h === lsBefore.gp_h && JSON.parse(db.backups['pre-idb-2.9.0'].data.gp_cfg).name === 'Big Lbs');
  check('idb/localStorage untouched by the migration', lsNow.gp_h === lsBefore.gp_h && lsNow.gp_bw === JSON.stringify(gu.bw) && lsNow.gp_mw === JSON.stringify(gu.mw));
  const firstAt = db.backups['pre-idb-2.9.0'].at, firstMig = db.meta.migration.at;
  await g.reload(); await g.waitForSelector('#s-home.active'); await idbSettled(g);
  db = await idbDump(g);
  check('idb/running twice: backup and migration record are not redone', db.backups['pre-idb-2.9.0'].at === firstAt && db.meta.migration.at === firstMig);
  await g.evaluate(() => setWeighIn(dkey(new Date()), 183.2)); await g.waitForTimeout(150);
  db = await idbDump(g);
  check('idb/dual-write: a new weigh-in lands in both stores', mirrorMatches(await lsAll(g), db.kv) && JSON.parse(db.kv.gp_bw).some(e => e.w === 183.2));

  // localStorage loses the data, the verified mirror brings it back once.
  await g.evaluate(() => localStorage.clear());
  await g.reload(); await g.waitForSelector('#s-home.active', { timeout: 15000 });
  check('idb/recovery: after localStorage is wiped, the app comes back with all 400 sessions', await g.evaluate(() => ST.history.length) === 400 && await g.evaluate(() => JSON.parse(localStorage.getItem('gp_bw')).some(e => e.w === 183.2)));

  // Erase all data must stay erased.
  g.once('dialog', dd => dd.accept());
  await g.evaluate(() => { openSettings(); resetApp(); });
  await g.waitForSelector('#s-ob.active, #s-onboarding.active, .ob-step.active', { timeout: 15000 });
  await g.reload(); await g.waitForTimeout(800);
  check('idb/reset: erased data does not come back from the mirror', await g.evaluate(() => !localStorage.getItem('gp_cfg') && ST.history.length === 0));
  await cG.close();

  // Partially migrated (interrupted copy, no verified flag): finishes cleanly.
  let [cH, h] = await ctx();
  await seed(h, bigUser(150));
  await idbSettled(h);
  await h.evaluate(() => new Promise(r => { const tx = IDB.transaction(['kv', 'meta'], 'readwrite'); tx.objectStore('meta').delete('migration'); tx.objectStore('kv').clear(); tx.objectStore('kv').put('[{"stale":true}]', 'gp_h'); tx.oncomplete = r; }));
  await h.reload(); await h.waitForSelector('#s-home.active'); await idbSettled(h);
  db = await idbDump(h);
  check('idb/partial state: re-run completes, verifies, and replaces the stale partial copy', db.meta.migration?.state === 'verified' && mirrorMatches(await lsAll(h), db.kv));
  await cH.close();

  // Verification failure: mirror corrupts gp_h → stays on localStorage, logs why.
  let [cI, iP] = await ctx();
  const warns = []; iP.on('console', m => { if (m.type() === 'warning') warns.push(m.text()); });
  await iP.addInitScript(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (v, k) { return put.call(this, k === 'gp_h' && typeof v === 'string' ? v.replace('"w":185', '"w":186') : v, k); };
  });
  const iu = bigUser(185);
  await seedCold(iP, iu);
  await idbSettled(iP);
  const lsI = { gp_h: JSON.stringify(iu.history) };
  db = await idbDump(iP);
  check('idb/verification failure: state failed with the reason recorded', db.meta.migration?.state === 'failed' && /gp_h session \d+ differs/.test(db.meta.migration.reason), db.meta.migration);
  check('idb/verification failure: logged, mirroring off, localStorage unchanged, app works',
    warns.some(w => /verification failed/.test(w)) && await iP.evaluate(() => !IDB_READY) && (await lsAll(iP)).gp_h === lsI.gp_h && await iP.evaluate(() => ST.history.length) === 400);
  await cI.close();

  await browser.close();

  // ── 5. iPhone, not installed (WebKit with an iPhone user agent).
  const wk = await webkit.launch();
  const ic = await wk.newContext({ ...devices['iPhone 13'] });
  const ip = await ic.newPage(); ip.on('pageerror', x => errors.push(String(x)));
  await seed(ip, bigUser(135));
  check('iPhone: "could be deleted" warning shows on Train', /could be deleted/.test(await ip.textContent('#prt-h')));
  check('iPhone: warning offers a backup when there is data', await ip.isVisible('#prt-h button[onclick="exportData()"]'));
  await ip.waitForTimeout(500);
  await ip.screenshot({ path: path.join(OUT, 'iphone-warning.png') });
  await ip.click('#prt-h button[onclick="dismissIOSWarn()"]');
  check('iPhone: Later dismisses it', !/could be deleted/.test(await ip.textContent('#prt-h')));
  await ip.evaluate(() => { localStorage.setItem('gp_ios_warn_dismissed', new Date(Date.now() - 31 * 864e5).toISOString()); renderHomeBanners(); });
  check('iPhone: it returns 30 days after dismissal', /could be deleted/.test(await ip.textContent('#prt-h')));
  await ip.evaluate(() => { openSettings(); openDataSettings(); });
  check('iPhone: Reports & backup shows the 7-day risk', /7 days/.test(await ip.textContent('#bk-status')));
  await ip.waitForTimeout(500);
  await ip.screenshot({ path: path.join(OUT, 'iphone-data-settings.png') });
  await wk.close();
  server.close();

  for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.pass || r.detail === undefined ? '' : '\n      ' + JSON.stringify(r.detail)}`);
  if (errors.length) console.log('\nPage errors:\n' + errors.join('\n'));
  const failed = results.filter(r => !r.pass).length;
  console.log(`\n${results.length - failed}/${results.length} passed. Screenshots in scripts/.data-safety/`);
  process.exit(failed || errors.length ? 1 : 0);
}

main();
