#!/usr/bin/env node
// One-off real-device-accurate verification harness: drives actual iOS
// Simulator Safari via Appium's XCUITest driver. Complementary to
// chaos.mjs/simulate.mjs, which both run on desktop Chromium/WebKit and can
// never see real safe-area-inset values (env(safe-area-inset-*) only
// resolves non-zero on genuine iOS hardware/Simulator, never desktop
// WebKit) or drive real system UI (the Share sheet, Add to Home Screen).
// Built to verify the v2.6.2 viewport-fit=cover fix in actual standalone
// mode; reusable for any future check that needs a real device.
//
// This machine has only 8GB RAM — Xcode + a booted Simulator + a WDA build/
// launch + Appium + Node concurrently is a real squeeze here, and this run
// has been killed by the OS for low memory more than once even with nothing
// else asked of it. Close other apps (browsers, Music, etc.) before running
// this, and don't expect it to be as fast/reliable as chaos.mjs/simulate.mjs
// — those stay the routine tools; reach for this one deliberately.
//
// Usage: npm run ios-verify [-- --device="iPhone 15"]

import { main as appiumServer } from 'appium';
import { remote } from 'webdriverio';
import { createServer } from 'http';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const run = promisify(execFile);
const ROOT = '/Volumes/EngrJed SSD/03 Projects/GainPath';
const OUT_DIR = path.join(ROOT, 'scripts/.ios-verify');
const HTTP_PORT = 8761;
const APPIUM_PORT = 4725;
const DEVICE_NAME = (process.argv.find(a => a.startsWith('--device=')) || '').split('=')[1] || 'iPhone 15';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const CFG_SEED = { setup: true, sex: 'male', prefReps: 10, prefSets: 3, unit: 'kg', lastSeenVersion: '2.6.2', tutorialSeen: true, badgesIntroSeen: true };

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
  console.log('Connecting WebDriverIO session (this builds/launches WebDriverAgent on first run, can take a few minutes)...');
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

  async function snap(label) {
    const shot = await driver.takeScreenshot();
    await writeFile(path.join(OUT_DIR, `${label}.png`), Buffer.from(shot, 'base64'));
    const src = await driver.getPageSource();
    await writeFile(path.join(OUT_DIR, `${label}.xml`), src);
    console.log(`Saved ${label} screenshot/tree to scripts/.ios-verify/`);
  }

  await driver.url(`http://localhost:${HTTP_PORT}/bootstrap`);
  await driver.pause(2000);
  await snap('tab');

  // Deliberately stops here. An "Add to Home Screen" -> standalone-relaunch
  // chain was prototyped (tap MoreMenuButton -> ShareButton -> "Add to Home
  // Screen" -> Add -> home button -> new icon) to get a real standalone-mode
  // screenshot — the only context where env(safe-area-inset-*) is actually
  // meaningful, since a Safari tab's own toolbar already occupies that space
  // regardless of viewport-fit. It kept failing in new ways each attempt
  // (stale menu state bleeding across separate script runs since noReset:true
  // doesn't reset Safari; then forcibly restarting Safari to get a clean
  // state broke the remote debugger's process/PID tracking instead) — that's
  // the "3+ different failures, question the approach" signal, not a bug to
  // keep patching. Driving Safari's native chrome through Appium works (this
  // script proves the pipeline), but scripting that specific multi-step OS
  // interaction reliably needs more investment than a single verification
  // screenshot justifies. The fast path for that check is manual: with the
  // Simulator open and this script's tab loaded, tap ··· -> Share -> Add to
  // Home Screen -> Add, then open the new icon from the Home Screen.
} finally {
  if (driver) await driver.deleteSession().catch(() => {});
  await appiumMain.close();
  httpServer.close();
}
