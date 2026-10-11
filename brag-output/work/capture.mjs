// Captures real GainPath screens (seeded) for the brag video.
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OUT = path.join(HERE, 'shots');
const PORT = 8761;
const MIME = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };

const server = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  if (p.startsWith('/sw.js')) { res.writeHead(404); return res.end(); }
  try { const f = path.join(ROOT, p === '/' ? '/index.html' : p); const d = await readFile(f); res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
});
// Block analytics.
await new Promise((r) => server.listen(PORT, r));

function seedHistory() {
  const days = ['push', 'pull', 'legs', 'upper', 'lower'];
  const names = {
    push: ['Barbell bench press', 'Barbell incline bench press', 'Overhead press'],
    pull: ['Barbell bent over row', 'Machine pulldown', 'Barbell curl'],
    legs: ['Barbell squat', 'Barbell Romanian deadlift', 'Machine leg press'],
    upper: ['Barbell bench press', 'Barbell bent over row', 'Lateral raise'],
    lower: ['Barbell squat', 'Machine leg press', 'Standing calf raise'],
  };
  const out = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(); d.setDate(d.getDate() - (i * 2 + 1));
    const dk = d.toISOString().slice(0, 10);
    const day = days[i % days.length];
    const prog = Math.floor((30 - i) / 3) * 2.5;
    out.push({
      day, dayName: day[0].toUpperCase() + day.slice(1), date: dk, dk, mk: dk.slice(0, 7),
      dur: '48m', feel: ['good', 'hard', 'easy'][i % 3], sets: 12,
      exercises: names[day].map((name, j) => {
        const w = 45 + j * 5 + prog;
        return {
          name, exFeel: i < 5 ? 'easy' : ['good', 'hard'][i % 2],
          sets: [
            { t: 'w', w: 40, r: 12, done: true },
            { t: 'x', w, r: 10, done: true },
            { t: 'x', w, r: 10, done: true },
            { t: 'x', w, r: 9, done: true },
          ],
        };
      }),
    });
  }
  return out.reverse();
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
await page.route(/workers\.dev|emailjs|googletagmanager|cloudflareinsights/, (r) => r.abort());
page.on('pageerror', (e) => console.error('pageerror', String(e)));
page.on('dialog', (d) => d.dismiss());
await page.goto(`http://localhost:${PORT}/index.html`);
await page.waitForSelector('#s-ob.active');
await page.evaluate((history) => {
  localStorage.setItem('gp_cfg', JSON.stringify({
    firstName: 'Jed', lastName: 'M', name: 'Jed M', sex: 'male', setup: true, unit: 'kg',
    exp: 'intermediate', goal: 'strength', split: 'pplul', freq: 5, bw: 75, ht: 175,
    warmup: true, wuSteps: 1, wuReps: 12, prefReps: 10, prefRest: 90, prefSets: 3,
    setStyle: 'straight', startingWeights: 'ai',
    gymPlates: { 25: 1, 20: 1, 15: 1, 10: 1, 5: 1, 2.5: 1, 1.25: 1 },
    gymDumbbells: [5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 30],
    gymNudgeDismissed: true, lastSeenVersion: '99.0.0',
  }));
  localStorage.setItem('gp_h', JSON.stringify(history));
  localStorage.setItem('gp_p', '{}'); localStorage.setItem('gp_mw', '{}'); localStorage.setItem('gp_bw', '[]');
  localStorage.setItem('gp_a2hs_dismissed', 'true');
  localStorage.setItem('gp_last_export', new Date().toISOString());
  localStorage.setItem('gp_backup_nudge_seen', new Date().toISOString());
  localStorage.setItem('gp_ios_warn_dismissed', new Date().toISOString());
}, seedHistory());
await page.reload();
await page.waitForSelector('#s-home.active');
await page.evaluate(() => { recomputePRs(); recomputeBadges(); });

const shot = async (name, fn, arg) => {
  if (fn) await page.evaluate(fn, arg);
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, name + '.png') });
  console.log('shot', name);
};

await shot('home', () => { refreshHome(); bnav('wk'); window.scrollTo(0, 0); });
// Workout: bench press with suggestion chip
await shot('wo-sug', () => {
  startDay('push'); ST.exi = ST.sd.findIndex((it) => it.ex.name === 'Barbell bench press'); if (ST.exi < 0) ST.exi = 0;
  ss('wo'); renderEx(); window.scrollTo(0, 0);
});
const info = await page.evaluate(() => ({ chip: document.querySelector('.sug-chip')?.innerText, ex: ST.sd[ST.exi].ex.name, sets: ST.sd[ST.exi].sets }));
console.log(JSON.stringify(info));
await shot('wo-applied', () => { const b = document.querySelector('.sug-chip .db.ok'); if (b) b.click(); window.scrollTo(0, 0); });
// log warm-up and first work set (stay on workout screen)
await shot('wo-logged', () => {
  const sets = ST.sd[ST.exi].sets; sets.forEach((s, i) => { if (i < 2) s.done = true; }); renderEx(); ss('wo'); window.scrollTo(0, 0);
});
// Last set → rest screen with RIR rating
await page.evaluate(() => { const sets = ST.sd[ST.exi].sets; for (let i = 0; i < sets.length - 1; i++) sets[i].done = true; renderEx(); });
await shot('rest', () => { const sets = ST.sd[ST.exi].sets; dset(sets.length - 1); window.scrollTo(0, 0); });
await shot('rest-rated', () => { restRate('good'); });
await shot('climb', () => { if (ST.day) { ST.day = null; } ss('home'); stab('ch'); window.scrollTo(0, 0); });
await shot('prs', () => { ss('home'); stab('pr'); window.scrollTo(0, 0); });

await browser.close();
server.close();
