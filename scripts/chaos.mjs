#!/usr/bin/env node
// Blind chaos/monkey testing, complementary to scripts/simulate.mjs: that
// fuzzer is semantic (it calls real window-scope functions in random order,
// so it only ever catches the specific invariants it was written to check).
// This one is blind — Gremlins.js (github.com/marmelab/gremlins.js) clicks,
// taps, fills forms, and scrolls at random DOM coordinates regardless of
// what's there, which is how it catches the class of bug neither invariant
// check would think to look for: a button tapped mid-transition, a stray
// double-tap, a rapid sequence no human QA pass would try. Thousands of
// gremlin actions run in seconds, so this is the actual "run this at scale"
// lever — a real iOS Simulator only buys engine-specific quirks, not volume.
//
// A run is "clean" if nothing throws: any uncaught page exception or
// console.error during a horde is a real bug, since index.html has no
// intentional console.error/warn calls to filter out.
//
// This is deliberately a fuzzer, not a fixed script: like simulate.mjs, the
// Gremlins RNG is seeded and printed so a failure can be replayed with
// SEED=<n> npm run chaos.
//
// Usage: npm run chaos  [-- --count=2000] [SEED=12345 npm run chaos]

import { chromium, webkit } from 'playwright';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';

const ROOT = '/Volumes/EngrJed SSD/03 Projects/GainPath';
const PORT = 8751;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const GREMLINS_BUNDLE = path.join(ROOT, 'node_modules/gremlins.js/dist/gremlins.min.js');
const COUNT = parseInt((process.argv.find(a => a.startsWith('--count=')) || '').split('=')[1]) || 2000;
const SEED = parseInt(process.env.SEED) || (Date.now() & 0xffffffff);

const CFG_SEED = { setup: true, sex: 'male', prefReps: 10, prefSets: 3, unit: 'kg', lastSeenVersion: '2.6.2', tutorialSeen: true, badgesIntroSeen: true };

const SCREENS = [
  { name: 'home', setup: () => {} },
  { name: 'dayedit', setup: () => { clearEditState(); ST.day = null; ST.sd = []; openDayEdit('push'); } },
  { name: 'wo', setup: () => { clearEditState(); ST.day = null; ST.sd = []; openDayEdit('push'); commitDayEdit(); } },
  { name: 'settings', setup: () => { openSettings(); } },
  // The two mid-workout management sheets from the v2.5.0-v2.6.0 redesign
  // (S277-S281) — the newest, least-battle-tested surface, so worth their
  // own seeded chaos passes rather than relying on 'wo' gremlins to stumble
  // into them.
  { name: 'wo-organize', setup: () => { clearEditState(); ST.day = null; ST.sd = []; openDayEdit('push'); commitDayEdit(); openMidWorkoutEdit(); } },
  { name: 'wo-cancel', setup: () => { clearEditState(); ST.day = null; ST.sd = []; openDayEdit('push'); commitDayEdit(); openCancelWorkoutSheet(); } },
];

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

const failures = [];

async function runScreen(page, engineName, screen, seed) {
  try {
    await page.evaluate((cfg) => localStorage.setItem('gp_cfg', JSON.stringify(cfg)), CFG_SEED);
    await page.reload();
    await page.waitForFunction(() => typeof window.openDayEdit === 'function');
    await page.addScriptTag({ path: GREMLINS_BUNDLE }); // reload() above drops any previously injected script tag
    await page.evaluate(screen.setup);

    const responsiveBefore = await page.evaluate(() => typeof window.ss === 'function');
    if (!responsiveBefore) {
      failures.push({ engine: engineName, screen: screen.name, kind: 'setup-failed', seed });
      return;
    }

    await page.evaluate(({ count, seed }) => {
      window.__chaosErrors = [];
      window.onerror = (msg) => { window.__chaosErrors.push(String(msg)); };
      const horde = window.gremlins.createHorde({
        species: [
          window.gremlins.species.clicker(),
          window.gremlins.species.toucher(),
          window.gremlins.species.formFiller(),
          window.gremlins.species.scroller(),
        ],
        mogwais: [window.gremlins.mogwais.alert()],
        strategies: [window.gremlins.strategies.distribution({ delay: 5, randomizer: { seed: () => seed } })],
      });
      return horde.unleash({ nb: count });
    }, { count: COUNT, seed });

    const after = await page.evaluate(() => ({
      responsive: typeof window.ss === 'function',
      errors: window.__chaosErrors || [],
    }));
    if (!after.responsive) {
      failures.push({ engine: engineName, screen: screen.name, kind: 'page-unresponsive-after-horde', seed });
    }
    for (const detail of after.errors) {
      failures.push({ engine: engineName, screen: screen.name, kind: 'onerror', detail, seed });
    }
  } catch (e) {
    // A setup helper throwing synchronously (a real app bug, or a stale
    // screen.setup after an index.html refactor) must not abort the whole
    // suite — record it and let the remaining screens/engines still run.
    failures.push({ engine: engineName, screen: screen.name, kind: 'exception', detail: e.message, seed });
  }
}

async function runEngine(engineName, engine) {
  const browser = await engine.launch();
  const page = await browser.newPage();
  page.on('pageerror', e => failures.push({ engine: engineName, kind: 'page-exception', detail: e.message, seed: SEED }));
  page.on('console', msg => {
    if (msg.type() !== 'error') return;
    // WebKit logs this whenever Notification.requestPermission() (index.html:15864)
    // fires from a synthetic gremlins click — the browser doesn't trust it as a
    // real user gesture. Constant noise on every 'wo'-screen run, not an app bug.
    if (msg.text().includes('Notification prompting can only be done from a user gesture')) return;
    failures.push({ engine: engineName, kind: 'console-error', detail: msg.text(), seed: SEED });
  });
  page.on('dialog', d => d.dismiss().catch(() => {}));
  browser.on('page', p => p.close().catch(() => {}));

  await page.goto(`http://localhost:${PORT}/`);

  for (const screen of SCREENS) {
    await runScreen(page, engineName, screen, SEED);
  }

  await browser.close();
}

console.log(`Chaos-testing ${COUNT} gremlins per screen (${SCREENS.map(s => s.name).join(', ')}) per engine, seed=${SEED} (replay with SEED=${SEED} npm run chaos)`);
const server = await startServer();
await runEngine('chromium', chromium);
await runEngine('webkit', webkit);
server.close();

if (failures.length) {
  console.log(`\n${failures.length} issue(s) found:\n`);
  for (const f of failures.slice(0, 40)) console.log(JSON.stringify(f));
  if (failures.length > 40) console.log(`...and ${failures.length - 40} more.`);
  process.exit(1);
} else {
  console.log(`\nNo issues across ${COUNT * SCREENS.length * 2} chaos actions.`);
  process.exit(0);
}
