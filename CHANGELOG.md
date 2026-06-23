# Changelog

All notable changes to GainPath will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- **README: moved the PayPal support link up to the top, under the live-app link**, instead of being the second-to-last section after Contributing — donation asks get buried at the very bottom otherwise.

## [1.0.0] - 2026-06-23

### Fixed
- **Rest timer no longer gets stuck at 0 — it now auto-advances** (GitHub issue #1). Previously the countdown just stopped at 0 and the only way back to the workout screen was tapping "Skip rest"; now reaching 0 automatically returns to the workout screen, matching what "Skip rest" already did.
- **Rest timer now also appears after the last set of an exercise.** Previously `dset()` skipped the rest timer entirely on an exercise's final set; now it shows a "rest before next exercise" countdown, and when that countdown finishes it automatically triggers the same effort-rating ("Next exercise"/"Finish workout") flow as the manual button — it no longer dumps you back on the workout screen.
- **Rest timer now plays a sound** at 5 seconds remaining and when it ends, via a Web Audio API tone (no asset files, no new dependency) — addressing the issue's request for audio feedback now that auto-advance means you might not be looking at the screen when it ends.
- **Export backup now always saves as `gainpath-backup.json`** instead of `gainpath-backup-<date>.json`. The dated filename meant every export created a new file rather than overwriting the previous backup, defeating the "tap Export, get the latest backup" workflow; the browser's own download/duplicate-file handling now determines overwrite-vs-rename behavior, but at least repeated exports stop generating an ever-growing pile of differently-named files.

### Added
- **Offline support via a service worker + web app manifest.** GainPath's app
  shell (markup, branding icons, and the four CDN scripts/styles it depends
  on — Tabler Icons, Chart.js, jsPDF, EmailJS) now keeps working with no
  network on repeat visits, and exercise images cache themselves
  opportunistically as they're viewed rather than via a hand-maintained
  precache list.
  - `manifest.json` — new web app manifest for Android/desktop PWA
    installability; iOS continues to use the existing `apple-touch-icon`/
    meta-tag based Add to Home Screen flow, unchanged. Reuses the existing
    `apple-touch-icon.png` (180x180) and `logo.png` (256x256) as its icon set
    rather than generating new 192/512 assets — a known minor gap against PWA
    best practice, not a blocker.
  - `sw.js` — new service worker. Navigation requests are network-first,
    falling back to cache when offline, to preserve the always-fresh-when-
    online intent behind the page's `Cache-Control: no-cache` meta tag;
    same-origin images are cache-first with opportunistic runtime caching;
    the four cross-origin CDN files are precached at install and served
    cache-first at runtime. Requests to `api.anthropic.com` are explicitly
    passed through untouched — the AI queueing below, not the service
    worker, owns retry/offline behavior for those calls. Cache versioning is
    a manually-bumped `CACHE_NAME` string with an `activate` handler that
    deletes any previously-named cache.
- **AI assessments now queue and retry instead of just failing when
  offline.** All three Claude API call sites (per-set rest feedback,
  per-exercise next-session tip, end-of-workout recommendations) now detect a
  network failure and, instead of showing "unavailable," show "On hold — will
  continue when you're back online," persist the prompt to a retry queue
  (`gp_ai_queue` in `localStorage`), and automatically retry when
  connectivity returns — on the browser's `online` event, and once at app
  boot if already online (covering the case where the app was closed while
  offline and reopened later already connected). If the user is still on the
  same screen when a retried call succeeds, the result updates in place;
  otherwise it surfaces as a new "AI insight ready" banner on the home
  screen, reusing the existing install-nudge/backup-nudge banner slot and
  disclosure-toggle pattern. Retries are capped at 5 attempts per item.
- **Pause/resume control for the workout elapsed-time clock.** A new button next to the elapsed-time display on the workout screen freezes/resumes `ST.es` (e.g. for an interruption mid-session) without losing or jumping the recorded time, and the paused state persists across a backgrounded/reloaded session like the rest of in-progress workout state.

- **Dev-only tooling** (doesn't affect the shipped app, which stays a single `index.html` with no build step):
  - `npm run visual-check` — headless-browser smoke check (Playwright) that loads the onboarding and home screens and fails on any console/page error, replacing one-off ad hoc browser scripts.
  - `npm run lint` — ESLint over the inline `<script>` block, scoped to bug-catching rules (`no-undef`, `no-unused-vars`, etc.) only; deliberately excludes formatting rules since the dense inline-script style is intentional. Now also lints `sw.js` directly, with a service-worker-scoped globals allowlist (`self`, `caches`, `clients`, etc.) in `eslint.config.js`.
  - `npm run visual-check`'s static server now serves `.json` (needed for `manifest.json`).
  - `scripts/process_brand_image.py` — reusable Pillow script that turns a square source logo into the full `images/branding/` icon set (transparent-corner logo/favicons + an opaque `apple-touch-icon`), generalizing the one-off processing used for the new logo below.
  - Added a dev-only `package.json`/`package-lock.json` (Playwright, ESLint) and `scripts/requirements.txt` (Pillow) for these tools; updated `.gitignore` for `node_modules/` and the visual-check screenshot output.
- **README: Support section** linking a PayPal donate button, since GainPath has no subscriptions/ads to fund development.

### Changed
- **Replaced the sex-based blue/pink `--accent` color system with the brand green/amber palette as the app's single primary theme.** Following up on the logo/branding work below, after seeing the chrome-only version live we decided to broaden brand green to every interactive element (buttons, tabs, toggles, focus states, progress bars) for all users, and to use brand amber specifically as a "highlight" color for PRs, streaks, and the suggested-next-day badge — replacing those elements' previous blue/purple/gray styling.
  - `--accent` is now a constant brand green (`#153F29`) regardless of `CFG.sex`; `accentColor()`, the monthly PDF report header, and the progress chart line color all updated to match.
  - The "Suggested" day badge/border, "Suggested next" label, all-time PR values, the "New PR!" toast, and the home screen streak pill now use the brand amber highlight pairing (`#FAEEDA`/`#633806`) instead of blue/purple/gray.
  - The monthly PDF report's "New PRs" and "Streak" stat tiles and "New personal records" rows now use amber instead of purple, and the header band uses brand green instead of the old sex-based blue/pink.
  - `CFG.sex` is unchanged and still used for choosing male/female exercise variants — only its effect on color was removed.

### Added
- **GainPath branding/logo.** Added the app's new logo (dumbbell + upward arrow mark in brand green/amber) across the app.
  - `images/branding/logo.png`, `favicon-16.png`, `favicon-32.png`, and `apple-touch-icon.png` generated from the source artwork, with the artwork's black corner padding made transparent (and re-flattened onto the brand cream background for the alpha-intolerant `apple-touch-icon`).
  - Favicon and `apple-touch-icon` `<link>` tags added to `<head>`, plus a `theme-color` meta tag, so the logo now shows as the icon when the app is added to an iOS home screen (previously a generic page screenshot was used).
  - Logo displayed next to the "GainPath" title on the onboarding welcome screen and the home screen header.
  - Introduced `--brand-green`/`--brand-amber` CSS variables and recolored the "GainPath" title text in those two header areas to brand green. The existing sex-based `--accent` system (blue/pink, used for buttons, tabs, badges, progress bars, etc.) is intentionally left untouched — brand colors are chrome-only and don't replace per-user accent personalization.
- **Home-screen-install prompt, backup nudge, and restore-from-backup shortcut**, addressing the risk that iOS Safari purges `localStorage` (and all workout data) after 7 days of site inactivity if the app isn't installed.
  - A dismissible banner now appears on the home screen when the app is running in regular Safari (not standalone) explaining that adding it to the Home Screen prevents the 7-day auto-erase, with an inline "How to add" step-by-step (iOS has no programmatic install prompt, so this is instructional). Dismissing it via "Maybe later" persists via `localStorage` and won't reappear.
  - Once installed (or once the install banner is dismissed), a periodic "Back up your data" nudge appears in the same banner slot for users with at least one completed workout, with a one-tap "Back up now" button wired to the existing `exportData()`. It resurfaces every 7 days, tracked via the most recent of the last export date or last time the nudge was shown/dismissed — never on every single load.
  - The onboarding welcome screen now has a "Restore from backup" link beneath the usual "Continue" flow, wired to the existing `importData()`, so recovering from a wipe is the first thing a returning user sees instead of something buried in Settings.

### Fixed
- **Workout state no longer resets when the app is backgrounded or reloaded mid-workout.** Previously, all workout state (current day, exercise index, set data, elapsed time, rest timer) lived only in JavaScript memory. iOS Safari aggressively suspends/reloads backgrounded tabs, which wiped that memory and forced users back to the home screen, losing all progress on the current session.
  - The full workout state is now persisted to `localStorage` after every set completion, exercise change, and screen transition.
  - On page load, an in-progress (not yet finished) workout is detected and restored automatically — same day, same exercise, same completed sets with their weight/reps, and the workout screen is shown directly (skipping onboarding/home).
  - The elapsed workout timer and rest timer now resume based on real elapsed wall-clock time rather than assuming the timer kept ticking while suspended.
  - Saved in-progress state is cleared once a workout is finished (after submitting overall feel) or when the user explicitly taps "back to home" mid-workout — which now asks for confirmation before discarding progress.
  - Fixed a related issue where a delayed AI rest-feedback response arriving after a workout was finished could resurrect stale in-progress state.

### Added
- `CHANGELOG.md` to track notable changes going forward.

## [2026-06-20]

### Changed
- **Replaced YouTube tutorial links with custom illustrated exercise instruction images.** Each exercise card in the workout screen now displays its 3-panel illustrated instruction image (`images/exercises/<exercise-slug>.png`) prominently above the exercise name and sets, full width of the card with aspect ratio preserved, instead of a "Tutorial" button linking out to a YouTube search.
  - If an image fails to load for a given exercise (e.g. one not yet illustrated), the original YouTube tutorial button is shown in its place automatically — nothing breaks for exercises without artwork yet.

### Added
- `image-checklist.md` — a checklist of all 37 unique exercises from the `EX` exercise database in `index.html`, used to track exercise reference images.
- `scripts/match_exercise_images.py` — scans the project root for dropped image files (`.png`/`.jpg`/`.jpeg`/`.webp`), fuzzy-matches each filename against the exercise checklist, and on a confident match renames it to a standardized slug and moves it into `images/exercises/`, checking it off the checklist. Ambiguous filenames are left in place for manual clarification instead of being guessed.
- `images/exercises/` — populated with reference images for all 37 exercises (the last one, "Bench dumbbell press", reuses the "Bench dumbbell chest press" image since both names refer to the same movement, just labeled differently for the male/female exercise variants in the code).
