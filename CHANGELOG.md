# Changelog

All notable changes to GainPath will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
