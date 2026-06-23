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

  await browser.close();
  server.close();

  if (issues.length) {
    console.error('Visual check FAILED:\n' + issues.join('\n'));
    process.exit(1);
  }
  console.log('Visual check passed. Screenshots in ' + path.relative(ROOT, OUT_DIR) + '/');
}

main();
