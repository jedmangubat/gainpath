#!/usr/bin/env node
// Accessibility checks in real browsers (Chromium and WebKit), keyboard-driven:
//  - every sheet/dialog: accessible name, focus moves in, Tab stays inside, the
//    page behind is inert, Escape closes it (not the recovery sheet), focus
//    returns to the control that opened it
//  - every set-row control has a unique accessible name that says which set,
//    in English, Japanese and Korean, and the row still fits at 360px
//  - controls without a name anywhere in the app's markup
//  - role="button" cards answer the keyboard; the rest countdown stays silent
//  - Japanese and Korean: the operational screens (failed-save alert, recovery
//    sheet, backup status, install banner, rest screen, feelings, summary) show
//    translated text, no raw keys and no English leftovers, and display dates
//    follow the language while stored dates stay as they were
// This is automated coverage, not an accessibility audit: VoiceOver, 200% text
// scaling and an installed PWA still need a person (see
// docs/audits/2026-10-16/MANUAL-CHECKS.md).
// Usage: npm run test:a11y

import { chromium, webkit } from './lib/browsers.mjs';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8753;
const MIME = { '.html': 'text/html', '.png': 'image/png', '.webp': 'image/webp', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2' };
const server = await new Promise((resolve) => {
  const s = createServer(async (req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    let data; try { data = await readFile(path.join(ROOT, u === '/' ? '/index.html' : u)); } catch { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(u)] || 'application/octet-stream' }); res.end(data);
  });
  s.listen(PORT, () => resolve(s));
});

const results = [];
const check = (name, pass, detail) => results.push({ name, pass: !!pass, detail });
const CFG0 = { name: 'A11y Test', firstName: 'A', sex: 'male', setup: true, unit: 'kg', exp: 'intermediate', goal: 'definition', split: 'pplul', freq: 5, warmup: true, wuReps: 12, prefReps: 10, prefRest: 90, prefSets: 3, startingWeights: 'manual', keyLifts: {}, lastSeenVersion: '9.9.9', tutorialSeen: true, badgesIntroSeen: true };

async function boot(engine, lang = 'en', size = { width: 390, height: 844 }) {
  const browser = await engine.launch();
  const ctx = await browser.newContext({ viewport: size, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(`http://localhost:${PORT}/index.html`);
  await page.evaluate((c) => {
    localStorage.setItem('gp_cfg', JSON.stringify(c)); localStorage.setItem('gp_a2hs_dismissed', 'true'); localStorage.setItem('gp_last_export', new Date().toISOString());
  }, { ...CFG0, lang });
  await page.reload(); await page.waitForSelector('#s-home.active');
  return { browser, page, errors };
}

// A temporary control that has focus when the sheet opens, so "focus returns to
// the opener" has something to return to.
const withTrigger = (page, open) => page.evaluate((open) => {
  let b = document.getElementById('a11y-trigger');
  if (!b) { b = document.createElement('button'); b.id = 'a11y-trigger'; b.textContent = 'opener'; document.body.appendChild(b); }
  b.focus(); new Function(open)();
}, open);

const SHEETS = [
  { id: 'cancelwo-sheet', open: 'openCancelWorkoutSheet()', label: 'cancel workout', alert: true },
  { id: 'exnow-sheet', open: "ST.editList=[{name:'Barbell bench press',mg:'chest',baseW:20,equip:'barbell'}];openExNowSheet(0)", label: 'exercise now' },
  { id: 'exinfo-sheet', open: "showExInstructions('Barbell bench press')", label: 'exercise info' },
  { id: 'whatsnew-sheet', open: 'showWhatsNew()', label: "what's new" },
  { id: 'bdg-sheet', open: 'showBadge(BADGES[0].id)', label: 'badge' },
  { id: 'ph-view', open: "PH_VIEW={p:{dk:'2026-10-01'},blob:new Blob([]),url:'blob:none'};gid('ph-view-date').textContent='1 Oct';gid('ph-view').style.display='flex';modalOpen('ph-view',closePhoto,{trigger:document.activeElement})", label: 'photo viewer' },
];

async function sheetTests(engine, tag) {
  const { browser, page, errors } = await boot(engine);
  for (const sh of SHEETS) {
    await withTrigger(page, sh.open);
    const info = await page.evaluate((id) => {
      const el = document.getElementById(id), lb = (el.getAttribute('aria-labelledby') || '').split(/\s+/).map((x) => document.getElementById(x)).filter(Boolean);
      return { role: el.getAttribute('role'), modal: el.getAttribute('aria-modal'), name: lb.map((n) => n.textContent.trim()).join(' ').trim(), inside: el.contains(document.activeElement),
        inertBehind: !!document.querySelector('#s-home[inert], .app[inert]') || [...document.querySelectorAll('[inert]')].length > 0, selfInert: !!el.closest('[inert]') };
    }, sh.id);
    check(`${tag} ${sh.label}: is a modal dialog with a name`, (info.role === 'dialog' || info.role === 'alertdialog') && info.modal === 'true' && info.name.length > 0, info);
    check(`${tag} ${sh.label}: focus moves inside, the page behind is inert, the sheet is not`, info.inside && info.inertBehind && !info.selfInert, info);
    let escaped = false;
    for (let i = 0; i < 12 && !escaped; i++) { await page.keyboard.press('Tab'); if (!(await page.evaluate((id) => document.getElementById(id).contains(document.activeElement), sh.id))) escaped = true; }
    for (let i = 0; i < 3 && !escaped; i++) { await page.keyboard.press('Shift+Tab'); if (!(await page.evaluate((id) => document.getElementById(id).contains(document.activeElement), sh.id))) escaped = true; }
    check(`${tag} ${sh.label}: Tab and Shift+Tab stay inside`, !escaped);
    await page.keyboard.press('Escape');
    const after = await page.evaluate((id) => ({ shown: getComputedStyle(document.getElementById(id)).display !== 'none', focusOnOpener: document.activeElement && document.activeElement.id === 'a11y-trigger', inert: document.querySelectorAll('[inert]').length }), sh.id);
    check(`${tag} ${sh.label}: Escape closes it, returns focus to the opener and releases the page`, !after.shown && after.focusOnOpener && after.inert === 0, after);
  }
  // The recovery sheet must be answered, not dismissed.
  await page.evaluate(() => { LOAD_BAD.gp_bw = '{bad'; showLoadRecovery(); });
  const lr = await page.evaluate(() => { const el = gid('load-recovery'); return { inside: el.contains(document.activeElement), role: el.getAttribute('role') }; });
  await page.keyboard.press('Escape');
  const lrAfter = await page.evaluate(() => getComputedStyle(gid('load-recovery')).display !== 'none');
  check(`${tag} recovery sheet: takes focus, is an alertdialog and Escape does not dismiss it`, lr.inside && lr.role === 'alertdialog' && lrAfter, { lr, lrAfter });
  check(`${tag} no page errors`, errors.length === 0, errors);
  await browser.close();
}

const SET_ROW_SETUP = `
  CFG.startingWeights='manual';ST.day='push';ST.exi=0;ST.t0=Date.now();
  ST.sd=[{ex:{name:'Barbell bench press',mg:'chest',baseW:20,equip:'barbell'},sets:[{w:20,r:12,t:'w',done:false},{w:60,r:8,t:'x',done:true},{w:60,r:8,t:'x',done:false},{w:50,r:8,t:'d',done:false}],sugDone:true}];
  renderEx();ss('wo');`;
async function setRowTests(engine, tag, lang) {
  const { browser, page, errors } = await boot(engine, lang, { width: 360, height: 740 });
  const run = async (setup, what) => {
    await page.evaluate(setup);
    const rows = await page.evaluate(() => [...document.querySelectorAll('#ex-area .sr')].map((r) => {
      const nameOf = (n) => n.getAttribute('aria-label') || (n.labels && n.labels[0] && n.labels[0].textContent.trim()) || n.textContent.trim();
      const ctl = [...r.querySelectorAll('button,input')].filter((n) => !n.closest('[aria-hidden="true"]') && n.getAttribute('tabindex') !== '-1');
      return { names: ctl.map(nameOf), fits: r.scrollWidth <= r.clientWidth + 1 };
    }));
    const all = rows.flatMap((r) => r.names);
    check(`${tag} set row (${what}, ${lang}): every control has a name, none is a raw key`, all.length > 0 && all.every((n) => n && !/^aria_|_btn$/.test(n)), all);
    check(`${tag} set row (${what}, ${lang}): names are unique across the whole list`, new Set(all).size === all.length, all);
    check(`${tag} set row (${what}, ${lang}): rows still fit at 360px`, rows.every((r) => r.fits));
    return all;
  };
  const names = await run(SET_ROW_SETUP, 'weighted');
  if (lang !== 'en') check(`${tag} set row (${lang}): labels are translated`, names.some((n) => /[぀-ヿ㐀-鿿가-힯]/.test(n)), names.slice(0, 4));
  await run(`ST.sd=[{ex:{name:'Push-up',mg:'chest',baseW:0,equip:'bodyweight',note:'bodyweight'},sets:[{w:0,r:10,t:'x',done:false},{w:5,r:10,t:'x',done:false}],sugDone:true}];renderEx();`, 'bodyweight');
  await run(`ST.sd=[{ex:{name:'Plank',mg:'core',baseW:0,equip:'bodyweight',note:'bodyweight',holdSecs:true},sets:[{w:0,r:30,t:'x',done:false},{w:0,r:30,t:'x',done:false}],sugDone:true}];renderEx();`, 'timed hold');
  check(`${tag} set row (${lang}): no page errors`, errors.length === 0, errors);
  await browser.close();
}

async function miscTests(engine, tag) {
  const { browser, page, errors } = await boot(engine);
  // role="button" cards and group headers work from the keyboard.
  await page.evaluate(() => { ST.prs = { 'Barbell bench press': { w: 100, r: 5, date: 'Jan 1, 2026' } }; bnav('pr'); renderPRs(); });
  await page.evaluate(() => document.querySelector('.pr-grp').focus());
  await page.keyboard.press('Enter');
  check(`${tag} PR group header opens with Enter`, await page.evaluate(() => Object.values(ST.prOpenMG).some(Boolean)));
  // The countdown is not a live region; the once-per-rest status is.
  const live = await page.evaluate(() => ({ status: gid('r-sl').getAttribute('aria-live'), timerLive: !!gid('t-dsp').closest('[aria-live]') }));
  check(`${tag} rest: status is polite, the ticking countdown is not announced`, live.status === 'polite' && !live.timerLive, live);
  // Optional libraries are not part of startup: nothing external, nothing blocking,
  // and they arrive the first time a chart/PDF/feedback needs them.
  const boot0 = await page.evaluate(() => ({ external: document.querySelectorAll('script[src^="http"]').length, chart: typeof Chart, pdf: typeof window.jspdf, mail: typeof window.emailjs }));
  check(`${tag} startup: no external scripts, and Chart.js, jsPDF and EmailJS are not loaded yet`, boot0.external === 0 && boot0.chart === 'undefined' && boot0.pdf === 'undefined' && boot0.mail === 'undefined', boot0);
  await page.evaluate(() => {
    const rec = (dk, w) => ({ day: 'push', dayName: 'Push', date: dk, dk, mk: dk.slice(0, 7), dur: '1:00', sets: 1, feel: 'good', exercises: [{ name: 'Barbell bench press', sets: [{ done: true, t: 'x', w, r: 5 }] }] });
    const ago = (n) => dkey(new Date(Date.now() - n * 864e5)); // inside the 30-day window Climb opens on
    ST.history = [rec(ago(12), 60), rec(ago(3), 70)]; recomputePRs(); bnav('ch');
  });
  const charted = await page.waitForFunction(() => !!ST.chart && typeof Chart === 'function', null, { timeout: 8000 }).then(() => true).catch(() => false);
  check(`${tag} Climb draws its chart after loading Chart.js on demand`, charted);
  const mail = await page.evaluate(() => loadLib('emailjs').then(() => typeof window.emailjs.send, () => 'failed'));
  check(`${tag} the feedback library loads and initialises on demand`, mail === 'function', mail);
  // Nothing in the static markup is a nameless control.
  const nameless = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('button, a[href], [role="button"], input:not([type="hidden"]):not([type="file"]), select, textarea').forEach((n) => {
      if (n.closest('[aria-hidden="true"]')) return;
      if (n.id === 'h-repeat-btn' || n.id === 'set-prog-btn') return; // text is filled in by JS when shown; checked below
      const text = [...n.childNodes].filter((c) => c.nodeType === 3 || (c.nodeType === 1 && !c.matches('i, svg, [aria-hidden="true"]'))).map((c) => c.textContent).join('').trim();
      const labelled = n.getAttribute('aria-label') || n.getAttribute('aria-labelledby') || n.getAttribute('title') || (n.labels && n.labels.length) || (n.closest('label')) || n.getAttribute('placeholder') || n.getAttribute('data-i18n') || n.getAttribute('data-i18n-aria');
      if (!text && !labelled) bad.push((n.id || n.className || n.tagName) + ' @ ' + (n.getAttribute('onclick') || n.getAttribute('type') || '').slice(0, 40));
    });
    return bad;
  });
  const dyn = await page.evaluate(() => { ST.history = [{ day: 'push', dayName: 'Push', date: 'Jan 1, 2026', dk: '2026-01-01', mk: '2026-01', dur: '1:00', sets: 1, exercises: [] }]; refreshHome(); return gid('h-repeat-btn').textContent.trim(); });
  check(`${tag} the repeat-workout button has text once there is a workout to repeat`, dyn.length > 0, dyn);
  check(`${tag} markup: no control without an accessible name`, nameless.length === 0, nameless);
  check(`${tag} no page errors`, errors.length === 0, errors);
  await browser.close();
}

const ENGLISH_LEFTOVERS = /Couldn’t save|Back up now|Your workouts could be deleted|rest before|reps left|Too easy|Session feel|Keep GainPath handy|Some of your saved data|Warm-up set|Almost there|Up next|Per side|Last time|No sessions logged|Sending\.\.\./;
async function langTests(engine, tag, lang) {
  const { browser, page, errors } = await boot(engine, lang);
  const seen = [];
  const grab = async (what, fn) => { const text = await page.evaluate(fn); seen.push([what, text]); return text; };
  await grab('home', () => gid('s-home').innerText);
  await grab('save alert', () => { saveFailed('data'); return gid('save-alert').innerText; });
  await grab('backup status', () => { saveOK('data'); openSettings(); openDataSettings(); return gid('bk-status').innerText + ' ' + gid('s-setdata').innerText; });
  await grab('recovery sheet', () => { LOAD_BAD.gp_bw = '{bad'; showLoadRecovery(); const t0 = gid('load-recovery').innerText; delete LOAD_BAD.gp_bw; hideLoadRecovery(); return t0; });
  await grab('install banner', () => { window.isIOS = () => true; window.isStandalone = () => false; window.iosWarnDue = () => true; ss('home'); renderHomeBanners(); return gid('prt-h').innerText; });
  await grab('backup nudge', () => { window.isIOS = () => false; window.isStandalone = () => true; window.checkBackupNudge = () => true; window.sessionsSinceBackup = () => 4; renderHomeBanners(); return gid('prt-h').innerText; });
  await grab('rest screen', () => {
    CFG.startingWeights = 'manual'; ST.day = 'push'; ST.exi = 0; ST.t0 = Date.now(); ST.sd = [{ ex: { name: 'Barbell bench press', mg: 'chest', baseW: 20, equip: 'barbell' }, sets: [{ w: 60, r: 8, t: 'x', done: true }, { w: 60, r: 8, t: 'x', done: false }], sugDone: true }, { ex: { name: 'Barbell row', mg: 'back', baseW: 20, equip: 'barbell' }, sets: [{ w: 40, r: 8, t: 'x', done: false }], sugDone: true }];
    renderEx(); startRest(ST.sd[0].ex, 0, ST.sd[0].sets[0], ST.sd[0].sets[1], null); return gid('s-rest').innerText;
  });
  await grab('rest screen (last set)', () => { startRest(ST.sd[0].ex, 1, ST.sd[0].sets[1], ST.sd[0].sets[1], null); return gid('s-rest').innerText; });
  await grab('suggestion chip', () => { ST.sd[0].sugDone = false; ST.sd[0].sets.forEach((x) => { x.done = false; }); ST.history = []; ST.sd[0].ex.plannedW = undefined; renderEx(); return gid('ex-area').innerText; });
  await grab('summary', () => { ST.sd[0].sets[0].done = true; ST.pendingRec = buildRec(); submitFeel('good'); return gid('s-sum').innerText; });
  await grab('calendar', () => { bnav('cal'); return gid('h-cal').innerText; });
  for (const [what, text] of seen) {
    const raw = text.match(/\b[a-z]+_[a-z0-9_]+\b/g), eng = text.match(ENGLISH_LEFTOVERS);
    check(`${tag} ${lang}: ${what} has no raw keys or English leftovers`, !raw && !eng, { raw, eng, text: text.slice(0, 160) });
  }
  const dates = await page.evaluate(() => ({ shown: fmtDk('2026-10-16'), week: weekdayNames(), rec: (() => { ST.t0 = Date.now(); ST.day = 'push'; ST.sd = []; const r = buildRec(); return { date: r.date, dk: r.dk, mk: r.mk }; })() }));
  const want = lang === 'ja' ? /2026年10月16日/ : /2026년 10월 16일/;
  check(`${tag} ${lang}: display dates follow the language`, want.test(dates.shown) && dates.week.length === 7 && !/^Mo$/.test(dates.week[0]), dates);
  check(`${tag} ${lang}: stored dates keep their English form`, /^[A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(dates.rec.date) && /^\d{4}-\d{2}-\d{2}$/.test(dates.rec.dk) && /^\d{4}-\d{2}$/.test(dates.rec.mk), dates.rec);
  check(`${tag} ${lang}: no page errors`, errors.length === 0, errors);
  await browser.close();
}

for (const [engine, tag] of [[chromium, 'chromium'], [webkit, 'webkit']]) {
  await sheetTests(engine, tag);
  for (const lang of ['en', 'ja', 'ko']) await setRowTests(engine, tag, lang);
  await miscTests(engine, tag);
  for (const lang of ['ja', 'ko']) await langTests(engine, tag, lang);
}
server.close();
for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.pass || r.detail === undefined ? '' : '\n      ' + JSON.stringify(r.detail).slice(0, 4000)}`);
const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} passed.`);
process.exit(failed ? 1 : 0);
