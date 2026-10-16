# Startup performance measurements (A10)

Measured with `npm run measure:startup` (`scripts/measure_startup.mjs`): desktop
Chromium, **CPU throttled 4x** and a **slow-4G network** (1.6 Mbps down, 150 ms
RTT), text served gzipped as GitHub Pages does, cold cache, no service worker,
brand-new user. Median of 5 runs. Raw numbers: `perf-before.json` (v2.10.0 as
shipped, plus the Phase 1-2 changes) and `perf-after.json` (this work).

**Limits:** this is a desktop browser with throttling, not a phone. Use the
numbers to compare before and after, not as promises about a particular
device. WebKit has no equivalent protocol, so it only has unthrottled timings.
Memory is the JS heap after a forced collection, not process memory.
"Interactive" is DOMContentLoaded: every app script is parser-blocking at the
end of `<body>`, so that is when `main.js` has run.

## Before and after (Chromium, throttled, cold first visit)

| Metric | Before | After |
|---|---:|---:|
| Interactive (ms) | 13034 | 4186 |
| Transferred (KB) | 2576 | 794 |
| Requests | 38 | 24 |
| Script time (ms) | 178 | 36 |
| Main-thread task time (ms) | 1162 | 329 |
| JS heap (MB) | 5.9 | 4.7 |

WebKit (unthrottled, indicative only): interactive 235 ms -> 130 ms.

## What moved the numbers
1. **Tutorial screenshots were loaded on the first visit.** Twelve
   `<img src="images/tutorial/...">` tags in the (hidden) tutorial screen were
   fetched eagerly: about 1.5 MB that shared the slow link with the scripts and
   delayed the point where the app can run. They now carry `loading="lazy"`,
   so they load when the tutorial is opened.
2. **The three CDN scripts no longer sit in `<head>`.** Chart.js, jsPDF and
   EmailJS (about 155 KB over the wire) blocked parsing, and a slow or failed
   CDN request would have stalled first render. They are now self-hosted in
   `vendor/` (byte-identical, checked against the old SRI hashes) and loaded
   by `loadLib()` the first time a chart, the PDF report or the feedback form
   needs them. They are precached by the service worker, so they also work
   offline.

## The 3.2 MB exercise catalogue (`js/exercise-text.js`): not split
The plan's bar for splitting it into per-language files was: parse/compile of
at least 100 ms at 4x throttle, or at least 15 MB of retained heap. Measured by
replacing the file with an empty stub and comparing:

| | with the file | stub | difference |
|---|---:|---:|---:|
| Script time (ms) | 36 | 35.2 | 1 |
| JS heap (MB) | 4.7 | 2.4 | 2.3 |
| Interactive (ms) | 4186.1 | 1797.2 | 2389 |
| Transferred (KB) | 793.5 | 309 | 484 |

Parse cost and memory are far under the bar, so the complexity is **not
justified on those grounds**. What the file does cost is transfer on a slow
first visit: Japanese and Korean are about 71% of it (about 347 KB gzipped of
498 KB), so an English-only first visit downloads roughly 1.7 s of text it
never shows on this link. After the first visit the service worker serves it
from cache, and the service worker installs the whole shell anyway. If that
first-visit time matters, the split is possible (plain-script chunks under
`lang/`, active-language-first with an English fallback, precached); it would
add a load-order dependency and a fallback path for the restore-at-boot case.
That is a decision for you, not something this work assumed.
