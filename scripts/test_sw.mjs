#!/usr/bin/env node
// Service-worker update and failure behaviour, in real browsers (Chromium and
// WebKit) against a local server whose sw.js, and whose error responses, the
// test controls. Covers what a clean offline-boot test doesn't:
//  - an update from an older GainPath worker removes only GainPath's own old
//    caches, never another app's cache on the same origin
//  - the on-demand image cache survives the update
//  - a workout in progress is untouched by the update, and still finishes
//  - the updated app boots offline
//  - a server error (500) is never stored over a good cached page or script,
//    and a never-cached URL that errors is not stored at all
// Usage: npm run test:sw     (synthetic data only; nothing leaves localhost)

import { chromium, webkit } from './lib/browsers.mjs';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8751;
const URL0 = `http://localhost:${PORT}/index.html`;
const MIME = { '.html': 'text/html', '.png': 'image/png', '.webp': 'image/webp', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2' };

const swSource = await readFile(process.env.SW_FILE || path.join(ROOT, 'sw.js'), 'utf8'); // SW_FILE: run the checks against another worker, e.g. the previous release's
const NAME = /const CACHE_NAME = '(gainpath-v\d+)'/.exec(swSource)[1];
const n = Number(NAME.split('-v')[1]);
const APPV = /APP_VERSION='([^']+)'/.exec(await readFile(path.join(ROOT, 'js', 'boot.js'), 'utf8'))[1];
const OLD = `gainpath-v${n - 1}`, NEW = `gainpath-v${n + 1}`;
const variant = (name) => swSource.replace(`'${NAME}'`, `'${name}'`);

const state = { sw: variant(OLD), fail: false, down: false };
const server = await new Promise((resolve) => {
  const s = createServer(async (req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    if (state.down) return req.destroy(); // a dead network: connections drop, as they do offline
    if (u === '/sw.js') { res.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'no-cache' }); return res.end(state.sw); }
    if (state.fail && (u === '/index.html' || u.startsWith('/js/') || u === '/probe-500.txt')) { res.writeHead(500); return res.end('server error'); }
    if (u === '/probe-500.txt') { res.writeHead(500); return res.end('server error'); }
    const f = path.join(ROOT, u === '/' ? '/index.html' : u);
    let data;
    try { data = await readFile(f); } catch { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(data);
  });
  s.listen(PORT, () => resolve(s));
});

const results = [];
const check = (name, pass, detail) => results.push({ name, pass: !!pass, detail });
const until = async (fn, ms = 20000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await fn()) return true; await new Promise((r) => setTimeout(r, 200)); } return false; };

async function run(engine, tag) {
  state.sw = variant(OLD); state.fail = false; state.down = false;
  const browser = await engine.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', (e) => { if (!state.down) errors.push(String(e)); }); // images that were never cached legitimately fail while the network is down
  const keys = () => page.evaluate(() => caches.keys());

  await page.goto(URL0);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  const controlled = await until(() => page.evaluate(() => !!navigator.serviceWorker.controller));
  check(`${tag} sw: the older worker installs and controls the page`, controlled && (await keys()).includes(OLD), await keys());

  // Another app's cache, a lookalike, a stale GainPath cache, and an on-demand image.
  await page.evaluate(async () => {
    const put = async (name, url, body) => (await caches.open(name)).put(url, new Response(body));
    await put('other-app-v1', '/other/data', 'theirs'); await put('gainpath-site-v1', '/site/x', 'sibling');
    await put('gainpath-v1', '/old', 'stale'); await put('gainpath-img-v1', '/images/exercises/zz-test.webp', 'img');
  });
  // A user in the middle of a workout.
  await page.evaluate(() => {
    localStorage.setItem('gp_cfg', JSON.stringify({ ...CFG, setup: true, name: 'Sw Test', firstName: 'Sw', startingWeights: 'manual', lastSeenVersion: '9.9.9', tutorialSeen: true, badgesIntroSeen: true }));
    localStorage.setItem('gp_a2hs_dismissed', 'true'); localStorage.setItem('gp_last_export', new Date().toISOString());
  });
  await page.reload(); await page.waitForSelector('#s-home.active');
  await page.evaluate(() => {
    ST.day = 'push'; ST.exi = 0; ST.t0 = Date.now() - 90000;
    ST.sd = [{ ex: { name: 'Barbell bench press', mg: 'chest', baseW: 20, equip: 'barbell' }, sets: [{ w: 60, r: 8, t: 'x', done: true }], sugDone: true }];
    renderEx(); ss('wo'); saveInProgress();
  });

  // Ship the new worker.
  state.sw = variant(NEW);
  await page.evaluate(() => navigator.serviceWorker.getRegistration().then((r) => r.update()));
  const updated = await until(async () => { const k = await keys(); return k.includes(NEW) && !k.includes(OLD); });
  const after = await keys();
  check(`${tag} sw update: the new cache is created and the previous GainPath cache removed`, updated, after);
  check(`${tag} sw update: a stale GainPath cache from an even older release is removed too`, !after.includes('gainpath-v1'), after);
  check(`${tag} sw update: another app's cache on the same origin is untouched`, after.includes('other-app-v1') && await page.evaluate(async () => !!(await (await caches.open('other-app-v1')).match('/other/data'))), after);
  check(`${tag} sw update: a similarly named cache (gainpath-site-v1) is untouched`, after.includes('gainpath-site-v1'), after);
  check(`${tag} sw update: the on-demand image cache and its entries survive`, after.includes('gainpath-img-v1') && await page.evaluate(async () => !!(await (await caches.open('gainpath-img-v1')).match('/images/exercises/zz-test.webp'))));
  check(`${tag} sw update: the on-demand libraries are in the new cache`, await page.evaluate(async (c) => { const cache = await caches.open(c); const keys = (await cache.keys()).map((r) => new URL(r.url).pathname); return ['/vendor/chart-4.4.1.min.js', '/vendor/jspdf-2.5.1.min.js', '/vendor/emailjs-browser-4.4.1.min.js'].every((p) => keys.includes(p)); }, NEW));
  check(`${tag} sw update: the lazy-loaded tutorial screenshots are precached for offline`, await page.evaluate(async (c) => { const keys = (await (await caches.open(c)).keys()).map((r) => new URL(r.url).pathname); return ['/images/tutorial/home.png', '/images/tutorial/workout.png', '/images/tutorial/calendar.png'].every((p) => keys.includes(p)); }, NEW));
  check(`${tag} sw update: the workout in progress is untouched`, await page.evaluate(() => ST.day === 'push' && ST.sd.length === 1 && ST.sd[0].sets[0].w === 60));
  const wipSaved = await page.evaluate(() => !!localStorage.getItem('gp_wip'));
  await page.evaluate(() => { finishWo(); submitFeel('good'); });
  check(`${tag} sw update: the workout still finishes and saves after the update`, wipSaved && await page.evaluate(() => JSON.parse(localStorage.getItem('gp_h')).length === 1 && !localStorage.getItem('gp_wip')));

  // Offline.
  // With the network down, the libraries come from the cache the update filled.
  state.down = true;
  const libs = await page.evaluate(async () => { try { await Promise.all([loadLib('chart'), loadLib('jspdf'), loadLib('emailjs')]); return { chart: typeof Chart, pdf: typeof window.jspdf, mail: typeof window.emailjs }; } catch (e) { return String(e); } });
  check(`${tag} sw update: charts, PDF and feedback libraries load from the cache with no network`, libs.chart === 'function' && libs.pdf === 'object' && libs.mail === 'object', libs);
  state.down = false;
  state.down = true; // (Playwright's setOffline isn't honoured for service-worker fetches in WebKit)
  await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {});
  const bootedOffline = await until(() => page.evaluate(() => typeof load === 'function' && !!document.querySelector('#s-home.active')).catch(() => false));
  check(`${tag} sw update: the updated app boots offline with the saved session`, bootedOffline && await page.evaluate(() => ST.history.length === 1), { bootedOffline, url: page.url() });
  state.down = false;

  // Server errors.
  state.fail = true;
  await page.reload();
  const bootedDuringOutage = await until(() => page.evaluate(() => typeof load === 'function' && !!document.querySelector('#s-home.active')).catch(() => false));
  check(`${tag} sw errors: during a server outage (500) the cached page and scripts are served`, bootedDuringOutage && await page.evaluate(() => ST.history.length === 1));
  const idx = await page.evaluate(async (c) => { const r = await (await caches.open(c)).match('./index.html'); return r ? r.status : null; }, NEW);
  const js = await page.evaluate(async ([c, v]) => { const r = await (await caches.open(c)).match(`./js/storage.js?v=${v}`); return r ? r.status : null; }, [NEW, APPV]);
  check(`${tag} sw errors: the cached index.html and script are still the good copies`, idx === 200 && js === 200, { idx, js });
  const probe = await page.evaluate(async () => { const r = await fetch('/probe-500.txt'); return r.status; });
  const stored = await page.evaluate(async (c) => !!(await (await caches.open(c)).match('/probe-500.txt')), NEW);
  check(`${tag} sw errors: a 500 for a URL that was never cached is returned but not stored`, probe === 500 && !stored, { probe, stored });
  state.fail = false;
  check(`${tag} sw: no page errors`, errors.length === 0, errors);
  await browser.close();
}

await run(chromium, 'chromium');
await run(webkit, 'webkit');
server.close();

for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.pass || r.detail === undefined ? '' : '\n      ' + JSON.stringify(r.detail)}`);
const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} passed.`);
process.exit(failed ? 1 : 0);
