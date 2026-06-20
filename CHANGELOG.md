# Changelog

All notable changes to GainPath will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
