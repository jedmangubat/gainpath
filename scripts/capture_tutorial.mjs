#!/usr/bin/env node
// Regenerates the tutorial screenshots in images/tutorial/ AND the spotlight
// coordinates that go with them, in one pass.
//
// The spotlight rectangles in #s-tutorial are percentages of the screenshot
// box, so a screenshot regenerated without re-measuring leaves the highlight
// pointing at whatever used to be there — which is exactly how the tutorial
// drifted before. Measuring from the same live DOM the screenshot is taken
// from keeps the two in lockstep by construction.
//
// Captures at exactly 390x844 (deviceScaleFactor 2): .tut-ss-wrap is
// aspect-ratio:390/844 with object-fit:cover, so any other ratio gets cropped
// and shifts every coordinate.
//
// Writes: images/tutorial/*.png and scripts/.tutorial-coords.json
// Usage: node scripts/capture_tutorial.mjs

import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'images', 'tutorial');
const COORDS = path.join(ROOT, 'scripts', '.tutorial-coords.json');
const PORT = 8756;
const VW = 390, VH = 844;

const MIME = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2' };

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

// Enough history for the home streak, the calendar, the charts and the PR list
// to all have something real in them — empty states make poor screenshots.
function seedHistory() {
  const days = ['push', 'pull', 'legs', 'upper', 'lower'];
  const names = {
    push: ['Incline barbell chest press', 'Flat barbell bench press', 'Overhead press'],
    pull: ['Barbell row', 'Lat pulldown', 'Barbell curl'],
    legs: ['Barbell back squat', 'Romanian deadlift', 'Leg press'],
    upper: ['Flat barbell bench press', 'Barbell row', 'Lateral raise'],
    lower: ['Barbell back squat', 'Leg press', 'Standing calf raise'],
  };
  const out = [];
  for (let i = 0; i < 24; i++) {
    const d = new Date(); d.setDate(d.getDate() - (i * 2 + 1));
    const dk = d.toISOString().slice(0, 10);
    const day = days[i % days.length];
    out.push({
      day, dayName: day[0].toUpperCase() + day.slice(1), date: dk, dk, mk: dk.slice(0, 7),
      dur: '48m', feel: ['good', 'hard', 'easy'][i % 3], sets: 12,
      exercises: names[day].map((name, j) => ({
        name,
        sets: [
          { t: 'w', w: 40, r: 12, done: true },
          { t: 'x', w: 60 + j * 5 + Math.floor((24 - i) / 3) * 2.5, r: 10, done: true },
          { t: 'x', w: 60 + j * 5 + Math.floor((24 - i) / 3) * 2.5, r: 10, done: true },
          { t: 'x', w: 60 + j * 5 + Math.floor((24 - i) / 3) * 2.5, r: 8, done: true },
        ],
      })),
    });
  }
  return out.reverse();
}

// Each step: where to go, what the user would tap there, and which side of the
// spotlight the tooltip should sit on.
const STEPS = [
  { file: 'home', route: () => { refreshHome(); bnav('wk'); }, sel: ['#dbtn-list > *:nth-child(1)'] },
  { file: 'day-editor', route: () => { openDayEdit(Object.keys(DC)[0]); }, sel: ['#de-list > *:nth-child(1)', '#de-list > *:nth-child(2)'] },
  { file: 'program-builder', route: () => { openProgramBuilder(); }, sel: ['#prog-days'] },
  { file: 'workout', route: () => { startDay(Object.keys(DC)[0]); ST.exi = Math.max(0, ST.sd.findIndex((it) => equipRank(it.ex) === 0)); ss('wo'); renderEx(); }, sel: ['#ex-area .sr:not(.done) .log'] },
  // Same screen as the previous step with a different spotlight, so it reuses
  // that capture rather than storing a byte-identical second copy.
  { file: 'workout', reuse: true, route: () => { startDay(Object.keys(DC)[0]); ST.exi = Math.max(0, ST.sd.findIndex((it) => equipRank(it.ex) === 0)); ss('wo'); renderEx(); }, sel: ['#ex-area .sr:last-of-type .sdel:not(.hide)', '#ex-area .addset'] },
  { file: 'plate-calc', route: () => { startDay(Object.keys(DC)[0]); ST.exi = Math.max(0, ST.sd.findIndex((it) => equipRank(it.ex) === 0)); ss('wo'); renderEx(); openPlateCalc(ST.sd[ST.exi].sets.findIndex((s) => s.t !== 'w')); }, sel: ['#plate-result'] },
  { file: 'rest-timer', route: () => { startDay(Object.keys(DC)[0]); ST.exi = Math.max(0, ST.sd.findIndex((it) => equipRank(it.ex) === 0)); ss('wo'); renderEx(); dset(ST.sd[ST.exi].sets.findIndex((s) => s.t !== 'w')); }, sel: ['#t-cir'], shape: 'ellipse' },
  { file: 'climb', route: () => { refreshHome(); bnav('ch'); }, sel: ['#bn-ch'] },
  { file: 'prs', route: () => { refreshHome(); bnav('pr'); }, sel: ['#bn-pr'] },
  { file: 'calendar', route: () => { refreshHome(); bnav('cal'); }, sel: ['#bn-cal'] },
  { file: 'reports', route: () => { openSettings(); openDataSettings(); }, sel: ['#s-setdata .bp'] },
  { file: 'settings', route: () => { openSettings(); }, sel: ['#s-settings button[onclick="ss(\'setequip\')"]'] },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('dialog', (d) => d.dismiss());

  await page.goto(`http://localhost:${PORT}/index.html`);
  await page.waitForSelector('#s-ob.active');
  await page.evaluate((history) => {
    localStorage.setItem('gp_cfg', JSON.stringify({
      firstName: 'Jed', lastName: 'M', name: 'Jed M', sex: 'male', setup: true, unit: 'kg',
      exp: 'intermediate', goal: 'strength', split: 'pplul', freq: 5, bw: 75, ht: 175,
      warmup: true, wuSteps: 1, wuReps: 12, prefReps: 10, prefRest: 90, prefSets: 3,
      setStyle: 'straight', startingWeights: 'ai', keyLifts: { squat: { w: 100, r: 5 }, chest: { w: 80, r: 5 }, lat: { w: 70, r: 8 }, ohp: { w: 45, r: 8 } },
      // A configured gym and a dismissed nudge keep the home screen free of
      // banners that would shift every element below them.
      gymPlates: { 25: 1, 20: 1, 15: 1, 10: 1, 5: 1, 2.5: 1, 1.25: 1 },
      gymDumbbells: [5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 30],
      gymNudgeDismissed: true, lastSeenVersion: '99.0.0',
    }));
    localStorage.setItem('gp_h', JSON.stringify(history));
    localStorage.setItem('gp_p', JSON.stringify({}));
    localStorage.setItem('gp_mw', JSON.stringify({}));
    localStorage.setItem('gp_bw', JSON.stringify([]));
    localStorage.setItem('gp_a2hs_dismissed', 'true');
    localStorage.setItem('gp_last_export', new Date().toISOString());
    localStorage.setItem('gp_backup_nudge_seen', new Date().toISOString());
  }, seedHistory());
  await page.reload();
  await page.waitForSelector('#s-home.active');

  const coords = [];
  for (const step of STEPS) {
    const measured = await page.evaluate(({ route, sel }) => {
      // eslint-disable-next-line no-new-func
      new Function('return (' + route + ')')()();
      const boxes = sel.map((s) => {
        const el = document.querySelector(s);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
      });
      return { boxes, missing: sel.filter((s) => !document.querySelector(s)) };
    }, { route: step.route.toString(), sel: step.sel });

    if (measured.missing.length) {
      console.error(`MISSING for ${step.file}: ${measured.missing.join(', ')}`);
      process.exitCode = 1;
      continue;
    }

    await page.waitForTimeout(500); // .screen.active fades in
    if (!step.reuse) await page.screenshot({ path: path.join(OUT_DIR, `${step.file}.png`) });

    // Percentages of the capture box, padded slightly so the ring doesn't
    // sit flush against the control it's pointing at.
    const PAD = 6;
    const rects = measured.boxes.map((b) => ({
      x: +(((b.x - PAD) / VW) * 100).toFixed(1),
      y: +(((b.y - PAD) / VH) * 100).toFixed(1),
      w: +(((b.w + PAD * 2) / VW) * 100).toFixed(1),
      h: +(((b.h + PAD * 2) / VH) * 100).toFixed(1),
    }));
    // Union across selectors, clamped to the frame.
    const x0 = Math.max(0, Math.min(...rects.map((r) => r.x)));
    const y0 = Math.max(0, Math.min(...rects.map((r) => r.y)));
    const x1 = Math.min(100, Math.max(...rects.map((r) => r.x + r.w)));
    const y1 = Math.min(100, Math.max(...rects.map((r) => r.y + r.h)));
    const box = { x: +x0.toFixed(1), y: +y0.toFixed(1), w: +(x1 - x0).toFixed(1), h: +(y1 - y0).toFixed(1) };

    // Tooltip goes on whichever side has room; ~26% tall is the worst case.
    const TIP_H = 26;
    const below = box.y + box.h + 3;
    const tipTop = below + TIP_H <= 97 ? below : Math.max(3, box.y - TIP_H - 3);
    coords.push({ file: step.file, shape: step.shape || 'rect', box, tipTop: +tipTop.toFixed(1), rects });
    console.log(`${step.file.padEnd(17)} box ${JSON.stringify(box)} tip top ${tipTop.toFixed(1)}%`);
  }

  await browser.close();
  server.close();
  await writeFile(COORDS, JSON.stringify(coords, null, 2));
  if (errs.length) { console.error('\nPage errors:\n' + errs.join('\n')); process.exitCode = 1; }
  console.log(`\nWrote ${coords.length} screenshots to images/tutorial/ and coordinates to ${path.relative(ROOT, COORDS)}`);
}

main();
