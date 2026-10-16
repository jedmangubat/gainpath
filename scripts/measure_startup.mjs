#!/usr/bin/env node
// Cold-start measurement (A10): transfer, script time, heap and time until the
// app is interactive (interactiveMs = DOMContentLoaded: every app script is
// parser-blocking at the end of <body>, so DCL is when main.js has run), with CPU 4x slower and a slow-4G network as a modest-phone proxy.
// It measures first and decides later: the numbers gate whether the exercise
// text should be split, and show what the optional libraries cost.
//
//   node scripts/measure_startup.mjs --label=before [--runs=5]
//   -> docs/audits/2026-10-16/perf-<label>.json and a printed table
//
// Variants (Chromium, CDP):
//   baseline        the app as shipped
//   cdn-slow        the three CDN scripts delayed 3 s (shows head-blocking)
//   no-exercise-text  js/exercise-text.js replaced by an empty stub, so the
//                   difference to baseline is what that file costs
// WebKit has no CDP: it gets navigation timing and time to first screen only.
//
// This is desktop Chromium with throttling, not a real phone. Treat the
// numbers as relative, and re-check on a device. Synthetic first-run only;
// nothing here reads or writes real user data.

import { chromium, webkit } from './lib/browsers.mjs';
import { createServer } from 'http';
import { readFile, writeFile } from 'fs/promises';
import { gzipSync } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').split('=')[1] || d;
const LABEL = arg('label', 'run'), RUNS = Number(arg('runs', 5)), PORT = 8752;
const MIME = { '.html': 'text/html', '.png': 'image/png', '.webp': 'image/webp', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2' };
const GZ = new Set(['.html', '.js', '.css', '.json']);
const SLOW_4G = { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 };

// Static server that gzips text like GitHub Pages does, so "transfer" is real.
const server = await new Promise((resolve) => {
  const s = createServer(async (req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    let data;
    try { data = await readFile(path.join(ROOT, u === '/' ? '/index.html' : u)); } catch { res.writeHead(404); return res.end(); }
    const ext = path.extname(u), h = { 'Content-Type': MIME[ext] || 'application/octet-stream' };
    if (GZ.has(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) { data = gzipSync(data); h['Content-Encoding'] = 'gzip'; }
    res.writeHead(200, h); res.end(data);
  });
  s.listen(PORT, () => resolve(s));
});

const STUB = `const EX_TIPS={},EX_TIPS_JA={},EX_TIPS_KO={},EX_NAMES_JA={},EX_NAMES_KO={},EX_INSTRUCTIONS={},EX_INSTRUCTIONS_JA={},EX_INSTRUCTIONS_KO={};
function exDisplayName(n){return n;}function tipsFor(){return [];}function tipFor(){return '';}function instructionsFor(){return [];}function showExInstructions(){}function closeExInfo(){}`;
const isCdn = (u) => /cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net/.test(u);
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

async function chromiumRun(variant) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } });
  if (variant === 'cdn-slow') await ctx.route(isCdn, async (r) => { const resp = await r.fetch(); await new Promise((x) => setTimeout(x, 3000)); await r.fulfill({ response: resp }); });
  if (variant === 'no-exercise-text') await ctx.route(/\/js\/exercise-text\.js/, (r) => r.fulfill({ status: 200, contentType: 'text/javascript', body: STUB }));
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable'); await cdp.send('Performance.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.emulateNetworkConditions', SLOW_4G);
  const urls = {}, bytes = {};
  cdp.on('Network.requestWillBeSent', (e) => { urls[e.requestId] = e.request.url; });
  cdp.on('Network.loadingFinished', (e) => { bytes[e.requestId] = e.encodedDataLength; });
  const t0 = Date.now();
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'commit', timeout: 120000 });
  await page.waitForSelector('#s-ob.active, #s-home.active', { timeout: 120000 });
  await page.waitForLoadState('load', { timeout: 120000 });
  const loadMs = Date.now() - t0;
  await cdp.send('HeapProfiler.enable'); await cdp.send('HeapProfiler.collectGarbage');
  const m = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((x) => [x.name, x.value]));
  const nav = await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; return { dcl: n.domContentLoadedEventEnd, load: n.loadEventEnd }; });
  const res = Object.keys(bytes).map((id) => ({ url: urls[id], bytes: bytes[id] })).filter((r) => r.url);
  const sum = (f) => res.filter(f).reduce((a, r) => a + r.bytes, 0);
  await browser.close();
  return {
    interactiveMs: nav.dcl, loadMs, loadEventMs: nav.load,
    scriptMs: m.ScriptDuration * 1000, taskMs: m.TaskDuration * 1000, heapMB: m.JSHeapUsedSize / 1048576,
    transferKB: sum(() => true) / 1024, cdnKB: sum((r) => isCdn(r.url)) / 1024, exerciseTextKB: sum((r) => /exercise-text\.js/.test(r.url)) / 1024,
    requests: res.length,
    top: res.sort((a, b) => b.bytes - a.bytes).slice(0, 14).map((r) => `${(r.bytes / 1024).toFixed(0)} KB  ${r.url.replace(/^https?:\/\/[^/]+/, '')}`),
  };
}

async function webkitRun() {
  const browser = await webkit.launch();
  const page = await (await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } })).newPage();
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'commit', timeout: 120000 });
  await page.waitForSelector('#s-ob.active, #s-home.active', { timeout: 60000 });
  await page.waitForLoadState('load');
  const r = await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; return { interactiveMs: n.domContentLoadedEventEnd, loadEventMs: n.loadEventEnd }; });
  await browser.close(); return r;
}

const out = { label: LABEL, at: new Date().toISOString(), runs: RUNS, profile: 'CPU 4x slower, slow 4G (1.6 Mbps down, 150 ms RTT), gzip like GitHub Pages, cold cache, first-run user', chromium: {}, webkit: {} };
for (const v of (arg('only', '') ? [arg('only', '')] : ['baseline', 'cdn-slow', 'no-exercise-text'])) {
  const rows = []; for (let i = 0; i < RUNS; i++) rows.push(await chromiumRun(v));
  out.chromium[v] = Object.fromEntries(Object.keys(rows[0]).filter((k) => k !== 'top').map((k) => [k, +median(rows.map((r) => r[k])).toFixed(1)]));
  out.chromium[v].topResources = rows[0].top;
  console.log(v.padEnd(18), JSON.stringify({ ...out.chromium[v], topResources: undefined }));
  if (v === 'baseline') console.log(out.chromium[v].topResources.join('\n'));
}
{ const rows = []; for (let i = 0; i < Math.min(RUNS, 3); i++) rows.push(await webkitRun());
  out.webkit.baseline = Object.fromEntries(Object.keys(rows[0]).map((k) => [k, +median(rows.map((r) => r[k])).toFixed(1)]));
  console.log('webkit baseline'.padEnd(18), JSON.stringify(out.webkit.baseline)); }
await writeFile(path.join(ROOT, 'docs', 'audits', '2026-10-16', `perf-${LABEL}.json`), JSON.stringify(out, null, 2) + '\n');
server.close();
