#!/usr/bin/env node
// Chaos/monkey testing (see scripts/chaos.mjs) driven against a real iOS
// Simulator's Safari via Appium's XCUITest driver (see scripts/ios_verify.mjs),
// instead of desktop Chromium/WebKit. The horde itself (window.gremlins.
// createHorde().unleash()) runs entirely inside the page's own JS engine via
// internal timers — the WebDriver round-trip only happens once, to kick it
// off and await the returned promise — so this is NOT slower per gremlin
// than chaos.mjs's desktop runs. What it buys isn't more volume, it's the
// real rendering/hit-testing engine: real touch hit-testing and real
// viewport/safe-area behavior under rapid interaction, which desktop WebKit
// structurally can't exercise. chaos.mjs stays the routine, fast, dual-engine
// tool; this is an occasional real-Simulator pass, same spirit as ios-verify.
//
// Verified clean 2026-09-09: count=100 (600 total actions) and count=2000
// (12000 total actions, matching chaos.mjs's desktop default) both completed
// with zero failures and no hang. Still a structurally unhandled risk,
// though — gremlins' alert() mogwai patches window.alert/confirm/prompt so
// in-page JS dialogs never block the horde, but a *native* iOS permission
// sheet (e.g. if a synthetic click ever reaches Notification.
// requestPermission() in a way iOS treats as gesture-eligible, unlike
// desktop WebKit which silently no-ops it — see the same-named filter in
// chaos.mjs) would sit in front of the WebDriver session with no dismiss
// logic here, and could hang the run. It just didn't happen in either
// verification run. scripts/ios_verify.mjs's own history (three cascading
// failure modes on the standalone-mode flow) is why this stays a deliberate,
// occasional check, not routine tooling, even with COUNT now confirmed safe.
//
// Usage: npm run ios-chaos [-- --device="iPhone 15" --count=2000]

import { main as appiumServer } from 'appium';
import { remote } from 'webdriverio';
import { createServer } from 'http';
import { readFile, mkdir, writeFile } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const run = promisify(execFile);
const ROOT = '/Volumes/EngrJed SSD/03 Projects/GainPath';
const OUT_DIR = path.join(ROOT, 'scripts/.ios-chaos');
const HTTP_PORT = 8762;
const APPIUM_PORT = 4726;
const DEVICE_NAME = (process.argv.find(a => a.startsWith('--device=')) || '').split('=')[1] || 'iPhone 15';
const COUNT = parseInt((process.argv.find(a => a.startsWith('--count=')) || '').split('=')[1]) || 2000;
const SEED = parseInt(process.env.SEED) || (Date.now() & 0xffffffff);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const CFG_SEED = { setup: true, sex: 'male', prefReps: 10, prefSets: 3, unit: 'kg', lastSeenVersion: '2.6.2', tutorialSeen: true, badgesIntroSeen: true };

// Same screen list as chaos.mjs — duplicated rather than shared, matching
// this project's existing convention of each script owning its own CFG_SEED/
// SCREENS rather than a shared module (see simulate.mjs/chaos.mjs).
const SCREENS = [
  { name: 'home', setup: () => {} },
  { name: 'dayedit', setup: () => { clearEditState(); ST.day = null; ST.sd = []; openDayEdit('push'); } },
  { name: 'wo', setup: () => { clearEditState(); ST.day = null; ST.sd = []; openDayEdit('push'); commitDayEdit(); } },
  { name: 'settings', setup: () => { openSettings(); } },
  { name: 'wo-organize', setup: () => { clearEditState(); ST.day = null; ST.sd = []; openDayEdit('push'); commitDayEdit(); openMidWorkoutEdit(); } },
  { name: 'wo-cancel', setup: () => { clearEditState(); ST.day = null; ST.sd = []; openDayEdit('push'); commitDayEdit(); openCancelWorkoutSheet(); } },
];

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      if (req.url === '/bootstrap') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<script>localStorage.setItem('gp_cfg', ${JSON.stringify(JSON.stringify(CFG_SEED))});location.href='/';</script>`);
        return;
      }
      try {
        const reqPath = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(ROOT, reqPath === '/' ? '/index.html' : reqPath);
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(data);
      } catch { res.writeHead(404); res.end('Not found'); }
    });
    server.listen(HTTP_PORT, () => resolve(server));
  });
}

async function findBootedUdid(name) {
  const { stdout } = await run('xcrun', ['simctl', 'list', 'devices', 'booted']);
  const bootedLine = stdout.split('\n').find(l => l.includes(name));
  if (bootedLine) return bootedLine.match(/\(([0-9A-F-]{36})\)/)[1];
  const { stdout: all } = await run('xcrun', ['simctl', 'list', 'devices', 'available']);
  const availLine = all.split('\n').find(l => l.includes(name));
  if (!availLine) throw new Error(`No simulator named "${name}" found (xcrun simctl list devicetypes to see options).`);
  const udid = availLine.match(/\(([0-9A-F-]{36})\)/)[1];
  console.log(`Booting ${name} (${udid})...`);
  await run('xcrun', ['simctl', 'boot', udid]);
  await run('xcrun', ['simctl', 'bootstatus', udid]);
  return udid;
}

const failures = [];
const GREMLINS_SRC = await readFile(path.join(ROOT, 'node_modules/gremlins.js/dist/gremlins.min.js'), 'utf8');

async function runScreen(driver, screen) {
  try {
    await driver.url(`http://localhost:${HTTP_PORT}/bootstrap`);
    await driver.pause(2000); // matches ios_verify.mjs's settle time after navigation

    const ready = await driver.waitUntil(
      () => driver.execute(() => typeof window.openDayEdit === 'function'),
      { timeout: 20000, interval: 500, timeoutMsg: `window.openDayEdit never became available for screen ${screen.name}` }
    ).catch(() => false);
    if (!ready) {
      failures.push({ screen: screen.name, kind: 'app-not-ready' });
      return;
    }

    await driver.execute(GREMLINS_SRC); // UMD bundle, defines window.gremlins
    await driver.execute(screen.setup);

    const responsiveBefore = await driver.execute(() => typeof window.ss === 'function');
    if (!responsiveBefore) {
      failures.push({ screen: screen.name, kind: 'setup-failed' });
      return;
    }

    await driver.setTimeout({ script: Math.max(60000, COUNT * 20 + 20000) });
    await driver.executeAsync((count, seed, done) => {
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
      horde.unleash({ nb: count }).then(() => done());
    }, COUNT, SEED);

    const after = await driver.execute(() => ({
      responsive: typeof window.ss === 'function',
      errors: window.__chaosErrors || [],
    }));
    if (!after.responsive) {
      failures.push({ screen: screen.name, kind: 'page-unresponsive-after-horde' });
    }
    for (const detail of after.errors) {
      if (detail.includes('Notification prompting can only be done from a user gesture')) continue;
      failures.push({ screen: screen.name, kind: 'onerror', detail });
    }
  } catch (e) {
    failures.push({ screen: screen.name, kind: 'exception', detail: e.message });
  }
}

await mkdir(OUT_DIR, { recursive: true });
const httpServer = await startServer();
console.log(`Static server on ${HTTP_PORT}`);

const udid = await findBootedUdid(DEVICE_NAME);
console.log(`Using simulator ${DEVICE_NAME} (${udid})`);

console.log('Starting Appium server...');
const appiumMain = await appiumServer({ port: APPIUM_PORT, address: '127.0.0.1' });
console.log(`Appium server on ${APPIUM_PORT}`);

let driver;
try {
  console.log('Connecting WebDriverIO session (builds/launches WebDriverAgent on first run, can take a few minutes)...');
  driver = await remote({
    hostname: '127.0.0.1',
    port: APPIUM_PORT,
    path: '/',
    logLevel: 'info',
    capabilities: {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:udid': udid,
      'appium:deviceName': DEVICE_NAME,
      browserName: 'Safari',
      'appium:noReset': true,
      'appium:newCommandTimeout': 180,
    },
  });
  console.log('Session established.');
  console.log(`Chaos-testing ${COUNT} gremlins per screen (${SCREENS.map(s => s.name).join(', ')}) on real Simulator Safari, seed=${SEED} (replay with SEED=${SEED} npm run ios-chaos)`);

  for (const screen of SCREENS) {
    console.log(`  -> ${screen.name}`);
    await runScreen(driver, screen);
  }

  await writeFile(path.join(OUT_DIR, 'failures.json'), JSON.stringify(failures, null, 2));
} finally {
  if (driver) await driver.deleteSession().catch(() => {});
  await appiumMain.close();
  httpServer.close();
}

if (failures.length) {
  console.log(`\n${failures.length} issue(s) found (also written to scripts/.ios-chaos/failures.json):\n`);
  for (const f of failures.slice(0, 40)) console.log(JSON.stringify(f));
  if (failures.length > 40) console.log(`...and ${failures.length - 40} more.`);
  process.exit(1);
} else {
  console.log(`\nNo issues across ${COUNT * SCREENS.length} chaos actions on real Simulator Safari.`);
  process.exit(0);
}
