#!/usr/bin/env node
// Smoke-checks index.html in a real headless browser: starts a static server,
// loads the onboarding screen, seeds a fake user + history into localStorage
// to reach the home screen, and screenshots both. Fails the run on any
// console error or page exception. Screenshots land in scripts/.visual-check/.
//
// Usage: npm run visual-check

import { chromium, webkit } from 'playwright';
import { createServer } from 'http';
import { readFile, readdir } from 'fs/promises';
import { appSources } from './app_sources.mjs';
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
        const filePath = path.join(ROOT, reqPath.endsWith('/') ? reqPath + 'index.html' : reqPath);
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

  // First run is three steps (v2.9.0): name/sex → unit/body weight/experience
  // (+ optional known lifts) → days per week + split, then straight to Home.
  // The split list only renders once a day count is picked, and finishing must
  // land on Home with the tour link showing, not auto-play the tutorial.
  const ob = await page.evaluate(() => {
    gid('ob-fname').value = 'Visual'; setSex('male'); obNext(1);
    gid('ob-bw').value = '75'; setExp('intermediate');
    obToggleLifts(); gid('ob-sq-w').value = '100'; gid('ob-sq-r').value = '5';
    obNext(2);
    const splitHiddenBefore = gid('ob-split-wrap').style.display === 'none';
    setFreq(5);
    const splits = gid('split-opts').children.length;
    obFinish();
    return { steps: OB_STEPS, splitHiddenBefore, splits, split: CFG.split, squat: CFG.keyLifts.squat,
             screen: document.querySelector('.screen.active').id,
             tour: getComputedStyle(gid('h-tour')).display };
  });
  if (ob.steps !== 3) issues.push(`OB_STEPS should be 3, got ${ob.steps}`);
  if (!ob.splitHiddenBefore || !ob.splits) issues.push(`split list should appear only after a day count (hidden before: ${ob.splitHiddenBefore}, options: ${ob.splits})`);
  if (ob.split !== 'pplul') issues.push(`5 days for an intermediate should suggest pplul, got ${ob.split}`);
  if (!ob.squat || ob.squat.w !== 100 || ob.squat.r !== 5) issues.push(`optional known lifts were not saved: ${JSON.stringify(ob.squat)}`);
  if (ob.screen !== 's-home') issues.push(`finishing onboarding should land on Home, got ${ob.screen}`);
  if (ob.tour === 'none') issues.push('the "see how it works" link should show on Home for a new user');
  await page.evaluate(async () => { await idbClear(); localStorage.clear(); });
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

  // The spotlight SVG stretches to .tut-ss-wrap (preserveAspectRatio="none")
  // while the screenshot is object-fit:cover, so the two only line up when the
  // wrap is exactly 390:844. WebKit — the only engine on iPhone — ignored the
  // aspect-ratio under max-height and cropped the screenshot, drifting every
  // spotlight 4–7 points, while Chromium rendered it correctly. Hence WebKit,
  // at a regular iPhone plus the iPhone Duo's short folded/unfolded viewports.
  // The app is split into plain scripts under js/ (v2.9.0). Every file must be
  // loaded by index.html with ?v=<APP_VERSION> — a new version then gets new
  // URLs, so a phone can never mix a fresh index.html with a stale cached
  // file — and precached in sw.js under exactly that URL, or the app can't
  // boot offline.
  const html = await readFile(path.join(ROOT, 'index.html'), 'utf8');
  const swSrc = await readFile(path.join(ROOT, 'sw.js'), 'utf8');
  const allSrc = (await appSources(ROOT)).map((x) => x.text).join('\n');
  const ver = (allSrc.match(/const APP_VERSION='([^']+)'/) || [])[1];
  let jsFiles = [];
  try { jsFiles = (await readdir(path.join(ROOT, 'js'))).filter((f) => f.endsWith('.js')); } catch { /* no js/ yet */ }
  for (const f of jsFiles) {
    const url = `js/${f}?v=${ver}`;
    if (!html.includes(`<script src="${url}"></script>`)) issues.push(`index.html does not load ${url}`);
    if (!swSrc.includes(`'./${url}'`)) issues.push(`sw.js SHELL_URLS does not precache ./${url}`);
  }
  for (const m of html.matchAll(/<script src="(js\/[^"]+)"/g)) {
    if (!m[1].endsWith(`?v=${ver}`)) issues.push(`${m[1]} should end in ?v=${ver} (APP_VERSION)`);
  }

  // Offline boot: with the service worker installed, an offline reload must
  // bring the app back with no errors. A shell file missing from SHELL_URLS
  // fails here, not on someone's phone in a basement gym.
  const cb = await chromium.launch();
  const octx = await cb.newContext({ viewport: { width: 390, height: 844 } });
  await octx.route('https://gainpath-analytics.jedmangubat.workers.dev/**', (r) => r.fulfill({ status: 204 }));
  const op = await octx.newPage();
  const oerr = [];
  op.on('pageerror', (e) => oerr.push(String(e)));
  await op.goto(`http://localhost:${PORT}/index.html`);
  // Straight offline after install: the first load's scripts were fetched
  // before the worker existed, so only the install-time precache can serve them.
  await op.evaluate(() => navigator.serviceWorker.ready);
  await octx.setOffline(true);
  const reloadErr = await op.reload().then(() => null, (e) => String(e).split('\n')[0]);
  const off = reloadErr ? { reloadErr } : await op.evaluate(() => ({ ob: !!document.querySelector('#s-ob.active'), fn: typeof obNext === 'function' && typeof suggestWeight === 'function' && typeof renderEx === 'function' }))
    .catch((e) => ({ err: String(e) }));
  if (!off.ob || !off.fn) issues.push(`offline reload did not boot the app: ${JSON.stringify(off)}`);
  oerr.forEach((e) => issues.push('offline boot: ' + e));
  await cb.close();

  const wk = await webkit.launch();
  for (const [w, h] of [[390, 844], [466, 678], [890, 626]]) {
    const ctx = await wk.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:${PORT}/index.html`);
    await p.waitForSelector('#s-ob.active');
    const bad = await p.evaluate(() => {
      showTutorial(false);
      const out = [];
      for (let i = 1; i <= TUT_TOTAL; i++) {
        TUT.step = i; renderTutStep();
        const r = document.querySelector(`#tut-${i} .tut-ss-wrap`).getBoundingClientRect();
        if (Math.abs(r.width / r.height - 390 / 844) > 0.01) out.push(`step ${i} ${Math.round(r.width)}x${Math.round(r.height)}`);
        if (r.bottom > innerHeight) out.push(`step ${i} screenshot runs off-screen`);
      }
      return out;
    });
    if (bad.length) issues.push(`WebKit ${w}x${h}: tutorial screenshot is not 390:844, spotlights drift — ${bad.slice(0, 3).join('; ')}`);
    await ctx.close();
  }

  // Guide pages (guides/*.html) are what search engines and link previews see,
  // so each must load cleanly on an iPhone-width WebKit, fit without sideways
  // scrolling, carry its search/share tags, link back to the app, and have no
  // broken same-site links. The sitemap and the guides hub must list every one.
  const guideFiles = (await readdir(path.join(ROOT, 'guides'))).filter((f) => f.endsWith('.html'));
  const sitemap = await readFile(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const hub = await readFile(path.join(ROOT, 'guides', 'index.html'), 'utf8');
  const png = await readFile(path.join(ROOT, 'images', 'branding', 'share.png'));
  if (png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 630) issues.push('share.png must be 1200x630');
  const gctx = await wk.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  const checked = new Set();
  for (const f of guideFiles) {
    const rel = 'guides/' + f;
    if (f !== 'index.html' && !hub.includes(`href="${f}"`)) issues.push(`guides/index.html does not link ${f}`);
    const url = 'https://jedmangubat.github.io/gainpath/guides/' + (f === 'index.html' ? '' : f);
    if (!sitemap.includes(`<loc>${url}</loc>`)) issues.push(`sitemap.xml is missing ${url}`);
    const p = await gctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(`http://localhost:${PORT}/${rel}`);
    await p.evaluate(() => document.fonts.ready);
    const g = await p.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      title: document.title,
      desc: (document.querySelector('meta[name=description]') || {}).content || '',
      canon: (document.querySelector('link[rel=canonical]') || {}).href || '',
      og: ['og:title', 'og:description', 'og:image', 'og:url'].filter((k) => !document.querySelector(`meta[property="${k}"]`)),
      toApp: [...document.querySelectorAll('a')].some((a) => a.getAttribute('href') === '../'),
      links: [...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => h.startsWith(location.origin)),
      h1: document.querySelectorAll('h1').length
    }));
    errs.forEach((e) => issues.push(`${rel}: ${e}`));
    if (g.overflow > 0) issues.push(`${rel} scrolls sideways by ${g.overflow}px at 390px`);
    if (!g.title || g.desc.length < 70 || g.desc.length > 200) issues.push(`${rel}: title or description missing/out of range (${g.desc.length} chars)`);
    if (!g.canon.startsWith('https://jedmangubat.github.io/gainpath/')) issues.push(`${rel}: bad canonical ${g.canon}`);
    if (g.og.length) issues.push(`${rel}: missing ${g.og.join(', ')}`);
    if (!g.toApp) issues.push(`${rel}: no link to the app`);
    if (g.h1 !== 1) issues.push(`${rel}: expected one h1, got ${g.h1}`);
    for (const h of g.links) {
      const u = h.split('#')[0];
      if (checked.has(u)) continue;
      checked.add(u);
      const r = await p.request.get(u);
      if (!r.ok()) issues.push(`${rel}: broken link ${u.replace(`http://localhost:${PORT}`, '')}`);
    }
    await p.screenshot({ path: path.join(OUT_DIR, 'guide-' + f.replace('.html', '.png')), fullPage: true });
    await p.close();
  }
  await gctx.close();
  await wk.close();
  server.close();

  if (issues.length) {
    console.error('Visual check FAILED:\n' + issues.join('\n'));
    process.exit(1);
  }
  console.log('Visual check passed. Screenshots in ' + path.relative(ROOT, OUT_DIR) + '/');
}

main();
