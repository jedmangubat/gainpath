// node render.mjs stills 1.0 2.5 ...   → stills/t=<t>.jpg
// node render.mjs all                  → frames/f00000.jpg … (30fps, 22s)
import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const FPS = 30, DUR = 22;
const [mode, ...rest] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('pageerror', String(e)));
await page.goto('file://' + path.join(HERE, 'stage.html'));
await page.evaluate(() => window.ready());
const grab = async (t, file) => {
  await page.evaluate((t) => window.render(t), t);
  await page.screenshot({ path: file, type: 'jpeg', quality: 95 });
};
if (mode === 'stills') {
  await mkdir(path.join(HERE, 'stills'), { recursive: true });
  for (const t of rest) await grab(+t, path.join(HERE, 'stills', `t=${t}.jpg`));
} else {
  await mkdir(path.join(HERE, 'frames'), { recursive: true });
  const N = FPS * DUR;
  for (let f = 0; f < N; f++) {
    await grab(f / FPS, path.join(HERE, 'frames', `f${String(f).padStart(5, '0')}.jpg`));
    if (f % 60 === 0) console.log('frame', f, '/', N);
  }
}
await browser.close();
