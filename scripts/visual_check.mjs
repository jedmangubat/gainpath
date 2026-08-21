#!/usr/bin/env node
// Smoke-checks index.html in a real headless browser: starts a static server,
// loads the onboarding screen, seeds a fake user + history into localStorage
// to reach the home screen, and screenshots both. Fails the run on any
// console error or page exception. Screenshots land in scripts/.visual-check/.
//
// Usage: npm run visual-check

import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'scripts', '.visual-check');
const PORT = 8743;

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

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 480, height: 900 } });

  const issues = [];
  page.on('console', (msg) => { if (msg.type() === 'error') issues.push('console error: ' + msg.text()); });
  page.on('pageerror', (err) => issues.push('page error: ' + String(err)));

  await page.goto(`http://localhost:${PORT}/index.html`);
  await page.waitForSelector('#s-ob.active');
  await page.screenshot({ path: path.join(OUT_DIR, 'onboarding.png') });

  // Onboarding step 8 collects the user's plates/dumbbells. Its chips are
  // rendered on the way in from obNext(), and its i18n keys are its own
  // (obgym_*) because the shared Settings strings embed unit <span>s by id.
  const ob = await page.evaluate(() => {
    gid('ob-fname').value = 'Visual'; OB.sex = 'male'; obNext(1);
    gid('ob-bw').value = '75'; gid('ob-ht').value = '175'; obNext(2);
    obNext(3);
    setExp('intermediate'); setGoal('strength'); obNext(4);
    setFreq(5); obNext(5); obNext(6); obNext(7);
    const plates = gid('ob-plate-inv').children.length;
    const dbs = gid('ob-db-inv').children.length;
    const onGym = gid('ob-8').classList.contains('active'); // before advancing off it
    gid('ob-plate-20').classList.add('on');
    gid('ob-db-' + dbId(10)).classList.add('on');
    obNext(8);
    return { steps: OB_STEPS, onGym, plates, dbs,
             collected: { p: Object.keys(OB.gymPlates), d: OB.gymDumbbells },
             dupIds: ['ob-gym-unit1', 'set-gym-unit1'].map(id => document.querySelectorAll('[id="' + id + '"]').length) };
  });
  if (ob.steps !== 10) issues.push(`OB_STEPS should be 10, got ${ob.steps}`);
  if (!ob.onGym) issues.push('onboarding step 8 is not the gym step');
  if (!ob.plates || !ob.dbs) issues.push(`gym step rendered no chips (plates ${ob.plates}, dumbbells ${ob.dbs})`);
  if (ob.collected.p.length !== 1 || ob.collected.d.length !== 1) issues.push(`gym step did not collect selections: ${JSON.stringify(ob.collected)}`);
  if (ob.dupIds.some((n) => n > 1)) issues.push(`duplicate unit-label ids in the DOM: ${JSON.stringify(ob.dupIds)}`);
  await page.reload();
  await page.waitForSelector('#s-ob.active');

  await page.evaluate(() => {
    localStorage.setItem('gp_cfg', JSON.stringify({
      name: 'Smoke Test', sex: 'male', setup: true, unit: 'kg', exp: 'intermediate',
      goal: 'definition', split: 'pplul', freq: 5, warmup: true, wuReps: 12,
      prefReps: 10, prefRest: 90, prefSets: 3, startingWeights: 'ai', keyLifts: {}
    }));
    localStorage.setItem('gp_h', JSON.stringify([
      { day: 'push', dayName: 'Push', date: '2026-06-20', dur: '45m', sets: 12, mk: '2026-06', dk: '2026-06-20', exercises: [] }
    ]));
    localStorage.setItem('gp_p', JSON.stringify({}));
    localStorage.setItem('gp_mw', JSON.stringify({}));
  });
  await page.reload();
  await page.waitForSelector('#s-home.active');
  await page.screenshot({ path: path.join(OUT_DIR, 'home.png') });

  // Set rows carry up to ten controls and must stay on ONE line at phone
  // widths, with neither the row overflowing nor the weight/reps inputs
  // clipping their value. Regressed silently before (the plate-loaded row
  // overflowed on every phone under ~400px), hence the explicit gate.
  for (const width of [360, 375, 390, 430]) {
    await page.setViewportSize({ width, height: 900 });
    const res = await page.evaluate(() => {
      const k = Object.keys(DC).includes('push') ? 'push' : Object.keys(DC)[0];
      startDay(k);
      const idx = ST.sd.findIndex((it) => equipRank(it.ex) === 0);
      if (idx >= 0) ST.exi = idx;
      ss('wo');
      ST.sd[ST.exi].sets.forEach((s) => { s.w = 137.5; s.r = 12; });
      renderEx();
      const rows = [...document.querySelectorAll('#ex-area .sr')];
      const heights = rows.map((r) => Math.round(r.getBoundingClientRect().height));
      return {
        n: rows.length,
        overflow: Math.max(...rows.map((r) => r.scrollWidth - r.clientWidth)),
        clip: Math.max(...rows.map((r) => {
          const wi = r.querySelector('.wi'), ri = r.querySelector('.ri');
          return Math.max(wi ? wi.scrollWidth - wi.clientWidth : 0, ri ? ri.scrollWidth - ri.clientWidth : 0);
        })),
        spread: Math.max(...heights) - Math.min(...heights),
        addSet: !!document.querySelector('#ex-area .addset'),
        del: document.querySelectorAll('#ex-area .sdel:not(.hide)').length,
      };
    });
    if (res.overflow > 0) issues.push(`set row overflows by ${res.overflow}px at ${width}px`);
    if (res.clip > 0) issues.push(`set row input clips its value by ${res.clip}px at ${width}px`);
    if (res.spread > 1) issues.push(`set rows are not all one line at ${width}px (height spread ${res.spread}px)`);
    if (!res.addSet) issues.push(`Add set button missing at ${width}px`);
    if (res.del !== res.n) issues.push(`expected a delete button on all ${res.n} un-logged rows at ${width}px, got ${res.del}`);
  }
  // Bodyweight rows in "BW" mode render no weight input, so they have no
  // flexible element to push Log right — they rely on .sr:not(:has(.wi)).
  // Without it the Log button bunches into the middle of the row.
  const bw = await page.evaluate(() => {
    for (const k of Object.keys(DC)) {
      startDay(k);
      const i = ST.sd.findIndex((it) => it.ex.note === 'bodyweight' && !it.ex.holdSecs);
      if (i < 0) continue;
      ST.exi = i; ss('wo'); renderEx();
      const row = document.querySelector('#ex-area .sr');
      if (row.querySelector('.wi')) return { skipped: 'row has a weight input' };
      const r = row.getBoundingClientRect(), l = row.querySelector('.log').getBoundingClientRect();
      return { ex: ST.sd[i].ex.name, gapRight: Math.round(r.right - l.right) };
    }
    return { skipped: 'no bodyweight exercise found' };
  });
  // Expected slack is just the delete button plus row padding (~41px at this
  // width); the bug this guards against left ~166px.
  if (bw.gapRight !== undefined && bw.gapRight > 60) {
    issues.push(`Log button is not right-aligned on the bodyweight row (${bw.ex}): ${bw.gapRight}px of slack`);
  }

  await page.setViewportSize({ width: 480, height: 900 });

  // Existing users never saw the gym step, so those with no inventory get a
  // home-screen nudge. "Set up" must route through openSettings() first —
  // the gym screen's back button reads every settings input, so arriving
  // directly would blank the fields openSettings() is responsible for.
  const nudge = await page.evaluate(() => {
    localStorage.setItem('gp_a2hs_dismissed', 'true'); // install banner outranks the nudge
    CFG.gymPlates = {}; CFG.gymDumbbells = []; CFG.gymNudgeDismissed = false;
    CFG.lastName = 'Keepme'; CFG.bf = 18;
    ss('home'); renderHomeBanners();
    const shown = gid('prt-h').innerHTML.includes('plates and dumbbells');
    openGymSettings();
    const onGym = gid('s-setequip').classList.contains('active');
    const chips = gid('set-plate-inv').children.length;
    closeSettingsSection();
    const kept = CFG.lastName === 'Keepme' && CFG.bf === 18;
    ss('home'); dismissGymNudge();
    return { shown, onGym, chips, kept, gone: !gid('prt-h').innerHTML.includes('plates and dumbbells') };
  });
  if (!nudge.shown) issues.push('gym nudge did not show for a user with no inventory');
  if (!nudge.onGym) issues.push('gym nudge "Set up" did not open the gym settings screen');
  if (!nudge.chips) issues.push('gym settings chips were not rendered on arrival from the nudge');
  if (!nudge.kept) issues.push('backing out of gym settings blanked other settings fields');
  if (!nudge.gone) issues.push('dismissing the gym nudge did not hide it');

  // The tutorial drifted once already: screenshots were regenerated without
  // re-measuring the spotlights, so highlights pointed at whatever used to be
  // in that spot, and two steps still showed screens that no longer exist.
  // Gate all three failure modes — step count, broken/duplicate images, and a
  // tooltip sitting on top of the thing it is pointing at.
  await page.setViewportSize({ width: 390, height: 844 });
  const tut = await page.evaluate(() => {
    showTutorial(false);
    const steps = document.querySelectorAll('#s-tutorial .ob-step').length;
    const overlaps = [], imgs = [];
    for (let i = 1; i <= TUT_TOTAL; i++) {
      TUT.step = i; renderTutStep();
      const step = document.getElementById('tut-' + i);
      if (!step) { overlaps.push(`#tut-${i} missing`); continue; }
      const img = step.querySelector('img');
      imgs.push({ src: img.getAttribute('src'), ok: img.naturalWidth > 0 });
      const wrap = step.querySelector('.tut-ss-wrap').getBoundingClientRect();
      const tip = step.querySelector('.tut-tooltip').getBoundingClientRect();
      const sh = step.querySelector('svg rect[stroke], svg ellipse[stroke]');
      const y = sh.tagName === 'ellipse' ? +sh.getAttribute('cy') - +sh.getAttribute('ry') : +sh.getAttribute('y');
      const h = sh.tagName === 'ellipse' ? +sh.getAttribute('ry') * 2 : +sh.getAttribute('height');
      const tipTop = ((tip.top - wrap.top) / wrap.height) * 100;
      const tipBot = tipTop + (tip.height / wrap.height) * 100;
      if (!(tipBot <= y || tipTop >= y + h)) overlaps.push(`step ${i} tooltip covers its own spotlight`);
      if (y + h > 100.5 || y < -0.5) overlaps.push(`step ${i} spotlight falls outside the screenshot`);
      imgs[imgs.length - 1].spot = `${y}:${h}`;
    }
    tutFinish();
    // Sharing a screenshot is fine when the spotlight differs; pointing at the
    // same place on the same screen twice means a step is saying nothing new.
    const seen = new Set(), dupes = [];
    imgs.forEach((im, n) => {
      const key = im.src + '@' + im.spot;
      if (seen.has(key)) dupes.push(`step ${n + 1} repeats an earlier step's screenshot and spotlight`);
      seen.add(key);
    });
    return { total: TUT_TOTAL, steps, overlaps: overlaps.concat(dupes),
             broken: imgs.filter((i) => !i.ok).map((i) => i.src), n: imgs.length };
  });
  if (tut.steps !== tut.total) issues.push(`TUT_TOTAL is ${tut.total} but ${tut.steps} tutorial steps exist`);
  if (tut.broken.length) issues.push(`tutorial screenshots failed to load: ${tut.broken.join(', ')}`);
  tut.overlaps.forEach((o) => issues.push(o));

  await browser.close();
  server.close();

  if (issues.length) {
    console.error('Visual check FAILED:\n' + issues.join('\n'));
    process.exit(1);
  }
  console.log('Visual check passed. Screenshots in ' + path.relative(ROOT, OUT_DIR) + '/');
}

main();
