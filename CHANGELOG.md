# Changelog

All notable changes to GainPath will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.4.0] - 2026-07-06

### Fixed
- **Weekly streak was stuck at 1 in timezones ahead of UTC.** Date keys
  (`dkey`/`mkey`) were derived via `toISOString()` (UTC), so in UTC+ timezones
  (e.g. the Philippines, UTC+8) the streak's week-continuity check compared a
  once-shifted week key against a twice-shifted one and always broke after the
  first week — two complete weeks showed as a 1-week streak. Keys are now built
  from local date components, and a one-time migration repairs any stored
  session whose `dk`/`mk` was stamped with the previous day's UTC date (the
  human-readable `date` field was always local, so it's the source of truth).
  The same bug also stamped any workout logged before 8:00 AM with yesterday's
  date, which skewed "this week" counts and the PDF report's calendar.

### Added
- **Workout calendar on the home screen.** "Recent sessions" is now led by a
  monthly calendar: days you trained are filled with the workout's day-type
  color (with a legend below), today is outlined, a dot marks days with more
  than one session, and tapping a day opens that session for review/editing.
  Month arrows navigate back to your first logged month, and a footer line
  summarizes the month (workouts + total volume lifted). The compact recent-
  sessions list stays below the calendar.
- **Exercise pickers are sorted by equipment.** The swap/add exercise lists
  (and search results) now order each muscle group's exercises barbell →
  dumbbell → machine → cable → other → bodyweight, with a small equipment
  label on each row, so a given exercise is much faster to find.
- **Rep targets set during a workout now carry over.** Changing a set's reps
  mid-workout is remembered the same way weights are: the next session
  pre-fills that exercise's rep target from your last completed work set
  (explicit per-day planned reps and the pyramid scheme still behave as
  before; timed holds are excluded).

### Security
- **Hardened backup import against malicious files.** Imported backups are now
  shape-validated (bad files no longer half-apply before erroring) and all
  imported strings are stripped of HTML metacharacters; user-visible strings
  (day names, session fields, machine names, PR entries) are HTML-escaped at
  render time, and inline-handler arguments are properly escaped so quotes in
  imported data can't inject script.
- **CDN scripts are now integrity-pinned.** Chart.js, jsPDF, EmailJS, and the
  Tabler icons stylesheet load with Subresource Integrity hashes and exact
  pinned versions (EmailJS `@4` → `@4.4.1`, Tabler `@latest` → `@2.47.0`), so
  a compromised or corrupted CDN response is rejected by the browser. The
  service worker no longer caches failed CDN responses (which SRI would then
  reject forever) and its cache was bumped to `gainpath-v6`.

### Changed
- Regenerated `home.png` and `dark-mode.png` screenshots to show the new
  calendar, and updated the README (features, screenshots' alt text).

## [1.3.0] - 2026-07-05

### Changed
- **Visual refresh across the whole app.** Same layout, brand colors, and
  single-file architecture — a bolder token layer instead of a flat one:
  - New shadow scale and a bumped corner radius (12px → 16px) applied to cards,
    day buttons, buttons, and stat tiles.
  - Primary buttons, the suggested-day border, the "Done" set chip, and PR
    badges now use a brand-green gradient instead of a flat fill.
  - The home screen's logo/greeting/streak/weekly-goal are unified into one
    tinted hero panel instead of floating separately.
  - The rest-timer ring is now a conic-gradient that visibly sweeps down as
    rest elapses (same red/amber/neutral thresholds as before), instead of a
    static colored border.
  - The session-summary stat tiles (Duration/Volume/Exercises/Sets) each get
    a distinct subtle color tint instead of being visually identical.
  - Screen navigation gets a brief fade/slide transition
    (`prefers-reduced-motion` respected).
- **Fixed a real dark-mode bug in the Progress charts**: gridlines were
  hardcoded to `rgba(0,0,0,.05)`, which was nearly invisible on dark
  backgrounds. Grid and tick colors are now derived from the active theme, and
  the line chart's fill is now a canvas gradient instead of a flat translucent
  color.
- **Fixed a display bug in session volume**: large volumes rendered as e.g.
  "2kkg" (the abbreviated "2k" ran straight into the "kg" unit with no
  separator). `fmtVol()` now inserts a space before the unit when abbreviating.
- Regenerated every screenshot in `images/screenshots/` (referenced from
  `README.md`) to reflect the new visual design — they were still showing the
  old flat look.

## [1.2.9] - 2026-06-29

### Changed
- **Renamed 3 exercises** to standard fitness industry names:
  - `Cable row` → `Seated cable row`
  - `Dumbbell reverse fly standing` → `Bent-over dumbbell reverse fly`
  - `Vertical leg raise` → `Hanging leg raise`
- **Added missing step-by-step instructions** for Smith machine bench press
  (was the only exercise in the pool without an EX_INSTRUCTIONS entry).

## [1.2.8] - 2026-06-29

### Added
- **8 new exercises** added to the exercise pool (available via Add/Swap in any
  day): Chin-ups, Wide-grip cable row, Cable tricep kickback, Dumbbell sumo
  squat, Single-arm cable fly, EZ bar front raise, Hack squat calf raise, Back
  extension. Each has its image, form tips, and step-by-step instructions.
- **Exercise instruction sheet.** A `?` button next to every exercise name during
  a workout opens a bottom sheet with step-by-step instructions — equipment
  setup, starting position, movement, and key form notes. Instructions are stored
  in a dedicated `EX_INSTRUCTIONS` structure separate from `EX_TIPS`; the random
  coaching tip shown during rest is unchanged. ~90 exercises covered.
- **Toggle a completed set back to undone.** Tapping a "Done" set during a
  workout now marks it undone again, so accidental taps can be corrected without
  abandoning the session.

### Changed
- **Day config persists when you go back.** Opening a workout day to configure
  exercises (add, remove, reorder, change weight) and then tapping back without
  starting now saves those changes automatically — the day reopens with your
  edits intact next time.
- **Mid-workout exercise edits apply on back.** Changes made via the mid-workout
  edit screen (reorder, swap, weight adjustments) now apply immediately when you
  tap back, without requiring the "Save & continue" button.
- **New exercise weight defaults to your estimated weight.** When adding an
  exercise for the first time, the weight field in the day-edit config now shows
  the estimated starting weight based on your profile instead of the generic base
  weight.
- **Merged flat dumbbell bench press duplicates.** All instances of
  `Bench dumbbell press` are now unified under `Bench dumbbell chest press`.
  Removed the stale duplicate entry from the exercise pool and the program day
  lists.
- **Removed duplicate `Incline bench dumbbell rear delt fly`** from the upper-body
  day — was appearing twice in the same day.

## [1.2.7] - 2026-06-27

### Added
- **Rate an exercise while the last-set rest timer is still counting down.** The
  per-exercise "How did it feel?" buttons now appear inline on the rest screen
  after an exercise's final set, so you can tap your rating during the rest
  instead of waiting for the timer to end. If you rate during the rest, the app
  skips straight to the next exercise when rest finishes; if you don't, the
  standalone rating screen still appears as before. (Superset round-rests are
  unaffected — this only applies to the rest after an exercise's last set.)
- **The last-set rest timer now previews the next exercise's first set.** In
  addition to the next exercise's name, it shows the weight and reps of its
  first (or warm-up) set, so you can set up plates/machine and get ready while
  resting.

## [1.2.6] - 2026-06-26

### Changed
- **Streak is now a weekly streak, not a daily one.** Counts consecutive weeks
  where you completed at least your target number of workouts (`freq`/week).
  Week boundaries are Monday–Sunday. The current in-progress week doesn't break
  the streak (it counts only once you hit your target for the week). Label
  updated to "wk streak" everywhere.

### Fixed
- **Warm-up sets now follow exercise position, not a hardcoded flag.** Previously,
  `wu:false` exercises (most cable and dumbbell isolation moves) could never receive
  a warm-up set even when first in their muscle group. Now the first exercise per
  muscle group with a non-zero base weight always gets the warm-up, so reordering
  exercises correctly adapts warm-up assignment to whatever is first.

## [1.2.5] - 2026-06-26

### Changed
- **Russian twist** is no longer locked as bodyweight-only — users can now
  log a dumbbell weight when they add resistance, while it still defaults
  to 0 for those doing it unweighted.

## [1.2.4] - 2026-06-26

### Changed
- **"Build a custom program" button moved from the home screen to Settings**,
  placed directly below the split-type selector where it belongs. The home
  screen now stays focused on starting a workout.

### Added
- **Cable rope hammer curl** added to the substitution pool with image.
- **Incline bench dumbbell rear delt fly** image added; the exercise is now
  renamed from "Dumbbell reverse fly standing" in the Pull and Upper day
  templates (pull_m, upper_m) — the standing bent-over variant remains in
  the substitution pool under its own name.

### Fixed
- Replaced wrong **Arnold press** image (was showing a cable lateral raise)
  with the correct seated dumbbell rotational press.
- Replaced wrong **Barbell skull crusher** image (was showing a flat bench
  press) with the correct skull crusher (bar to forehead, elbows up).
- Replaced wrong **Overhead cable tricep extension** image with the correct
  overhead extension (facing away from machine, arms extending overhead).

## [1.2.3] - 2026-06-26

### Added
- **4 more exercises added to the substitution pool** (available via exercise-swap):
  - *Chest:* Machine chest fly
  - *Shoulders:* Smith machine shoulder press
  - *Glutes:* Cable glute kickback, Machine hip thrust
- New exercise images added for all 4 exercises above.

## [1.2.2] - 2026-06-26

### Added
- **16 new exercises added to the substitution pool** (available via exercise-swap):
  - *Chest:* Smith machine bench press
  - *Back:* Smith machine inverted row
  - *Shoulders:* Pike push-ups
  - *Traps:* Smith machine shrug
  - *Triceps:* Diamond push-ups
  - *Hamstrings:* Dumbbell Romanian deadlift, Smith machine Romanian deadlift
  - *Calves:* Dumbbell standing calf raise, Smith machine standing calf raise
  - *Quads:* Smith machine squat
  - *Core:* Russian twist, Mountain climbers
  - *Rear delts:* Dumbbell reverse fly standing (standing bent-over variant — separate from the pending incline bench rename)
  - *Glutes:* (Barbell hip thrust, Smith machine hip thrust, Glute bridge, Dumbbell hip thrust — added in v1.2.1)
- New exercise images added for all 16 exercises above.
- Exercise image prompts file (`exercise-image-prompts-professional.txt`) rewritten with 10 briefs for the next machine batch (Pec deck, Cable glute kickback, Cable pull-through, Smith machine shoulder press, and others) — exercises will be added to the app once images are generated.

## [1.2.1] - 2026-06-26

### Added
- **8 new exercises added to the substitution pool** (available via exercise-swap):
  - *Glutes (new muscle group):* Barbell hip thrust, Smith machine hip thrust, Glute bridge, Dumbbell hip thrust
  - *Triceps:* Barbell skull crusher
  - *Forearms (new muscle group):* Dumbbell wrist curl, Dumbbell reverse wrist curl, Dead hang (timed hold)
- **Standing rear delt fly prompt** added to `exercise-image-prompts-professional.txt` so the actual standing bent-over movement has its own image brief, separate from the incline bench correction.
- New exercise images copied into `images/exercises/` for all 8 exercises above.

## [1.2.0] - 2026-06-26

### Added
- **Per-exercise session history.** The Progress tab now lists every past session for the selected exercise — the work sets you logged, that session's volume and best estimated 1RM, and the feel rating you gave it. Tapping a row opens that session for editing. The data was always there; it just had no view until now.
- **Edit or delete a logged session.** Tapping any session (from the Progress history or the home "Recent sessions" list, which now also shows each session's volume and expands to all sessions via "View all") opens a detail screen where you can fix a mis-logged weight or rep count, or delete the session outright. PRs are recomputed from scratch across all history on every save/delete, so corrections and deletions can't leave a stale PR behind.
- **Volume and estimated 1RM throughout.** Session summaries now show total volume (tonnage) alongside duration/exercises/sets. The progress chart gained a metric selector — plot **max weight**, **estimated 1RM** (Epley), or **session volume** over time. The PR list shows each record's estimated 1RM.
- **Next-weight suggestions from the feel rating you already give.** The per-exercise "Too easy / Just right / Hard / Too much" rating finally drives something: when you reach an exercise, if last time it felt "Too easy" the app suggests a small increase (2.5 kg / 5 lb, doubled for big lower-body and back lifts), and if it felt "Too much" it suggests backing off by the same. It's a one-tap **Apply** (or **Dismiss**) chip shown only before your first set — never a silent change, keeping progression a deliberate decision. Bodyweight and timed-hold exercises are excluded.
- **Edit a machine's saved base weight.** Machine base weight (the frame weight, asked once the first time you use a machine and added to the plates you load for the total) had no way to fix afterward if you guessed wrong. Settings now has a "Machine base weights" card listing every machine you've recorded, editable inline or removable (removing makes the app ask again next time you use that machine).
- **Add an exercise to a day's plan.** The day-edit screen (and the mid-workout "edit remaining exercises" screen) could already reorder, swap, and delete exercises, but not add one — an "Add exercise" button next to "Reset to default" opens the same body-part-then-exercise picker used for swapping, and appends the pick to the end of the list instead of replacing one.
- **Repeat last workout.** The home screen now shows a one-tap "Repeat last workout — <day>" button when you have history, jumping straight into the day editor for the most recent day (weights prefilled from your saved values as usual) instead of making you find it in the day list.
- **Text search in the exercise picker.** The swap/add-exercise picker was muscle-group drill-down only (pick a body part, then an exercise). It now has a search box over the whole exercise pool — type any part of a name to filter across all body parts at once. The same picker backs swap and add, so both benefit.
- **Weekly goal on the home screen.** Alongside the streak, the header now shows "<n>/<freq> this week" — sessions logged since Monday against your chosen training frequency — so the streak isn't the only at-a-glance progress signal.
- **Exercise form cues on the workout card.** The curated per-exercise cue database (~12 tips each) was only surfaced on the rest screen. A single cue now also shows on the exercise card itself while you're logging sets, so the guidance is there when you're actually setting up the lift, not just resting after it.
- **Rest-timer sound and vibration, with a toggle.** The rest timer now plays a short beep (and vibrates, on devices that support `navigator.vibrate`) when it hits zero, so you don't have to watch the screen. A "Rest timer sound" switch in Settings turns it off.
- **Bodyweight & measurements tracking with a trend chart.** Body weight was collected once at onboarding and never revisited. The Progress tab now has a "Body weight" section: log a weigh-in (date + weight, plus optional waist/arms), see your latest entry and a line-chart trend, and review/delete recent entries. Weigh-ins are date-keyed (re-logging the same date updates it), stored under a new `gp_bw` key, and included in the JSON backup/restore.
- **Dark mode.** A "Dark mode" toggle in Settings switches the whole app to a dark theme, implemented via CSS custom properties so every screen, chart, and control follows. The choice is saved and reapplied on launch.
- **Multi-step ramping warm-ups.** Warm-ups were a single set at 50%. Settings now offers 1, 2, or 3 ramping warm-up sets (e.g. 40/60/80% of the working weight) on the first exercise of each muscle group, for lifters who want to build up to heavy compounds gradually.
- **Plate calculator.** A plate icon next to each weight input opens a per-side plate breakdown for the target weight ("20 + 10 + 2.5 per side"), accounting for the bar/machine base weight and your kg/lb plate set, so you don't have to do the math at the rack.
- **Pyramid set style.** Onboarding and Settings now offer "Straight sets" (same weight/reps across work sets) or "Pyramid sets" (reps step down as weight goes up, e.g. 12/10/8). For both styles, changing the **first** work set's weight recalculates the remaining sets for you; for pyramids the rep ladder is fixed and the weights ramp, for straight sets weight and reps propagate unchanged.
- **Supersets, circuits, and drop sets.** Two new ways to structure work:
  - **Supersets / circuits** — in the day editor, a link button joins an exercise with the next one; consecutive linked exercises form a group (2 = Superset, 3+ = Circuit), shown with a colored bracket and A1/A2 tags. During the workout the group is executed by alternating: you do one work set of each linked exercise back-to-back with no rest, then rest once per round before looping back to the first. Each exercise still gets its own feel rating (asked when the group finishes) and contributes to volume/PRs exactly as a normal exercise. Links are saved per day (a new `gp_cfg` `dayLinks` map) so they persist as that day's default, and survive a mid-workout reload.
  - **Drop sets** — a "+ Drop" button on any work set marks it done and immediately appends a lighter set (70% of the weight, same reps) to keep going past failure. Drop sets count as work sets for volume and PR purposes and flow through the normal done/rest pipeline.
- **Custom routine / program builder.** Beyond the five fixed split templates, you can now build your own program: name it, add training days, name each day, and set each day's exercises with the full day editor (add/swap/reorder/delete, planned sets/reps/weight, and supersets all work the same). Saving activates the program — the home screen shows your custom days, and they behave like any built-in day. The program is selectable in Settings alongside the built-in splits, editable later, and deletable (deleting keeps your logged history). Stored in `gp_cfg` (`customProgram` plus the existing per-day `customDays`/`dayLinks`), so it rides along in backup/restore.

### Changed
- **The Progress chart now tracks one bellwether lift per body part instead of any exercise.** Picking from a flat list of every exercise made the chart noisy and didn't answer "am I getting stronger" the way a single tracked lift per body part does. The chart's exercise dropdown is now a body-part dropdown — chest → Flat barbell bench press, back → Barbell row, quads → Barbell back squat, shoulders → Barbell overhead press — and defaults to plotting Estimated 1RM instead of max weight. Body parts without one obvious 1RM-style compound lift in this app's pool (arms, hamstrings, calves, core, traps, abductors/adductors, rear delts) are left out rather than forced into an arbitrary pick. The separate "Session history" list below the chart still lets you browse any exercise's full history — it got its own dropdown so restricting the chart didn't take that away.
- **Dropped the "AI" branding everywhere now that the only genuine AI feature (the user-API-key coaching, see below) is gone.** The starting-weight estimate that remains is a deterministic formula based on your body stats, experience level, and strength baseline — it was only ever *called* "AI" as marketing, so the label is now misleading. Renamed across the app's user-facing copy and the docs:
  - **App (`index.html`):** page `<title>` and the onboarding splash tagline drop "AI"; the onboarding "🤖 Let AI estimate" weight option becomes "📊 Estimate for me"; "Helps the AI personalise…", "AI will estimate from other data", "Calibrates your AI coach", the setup-summary "AI estimate" line, and the first-set-weight "AI suggests:" banner all reworded without "AI". Two of these also overstated progression as automatic ("AI adjusts from then on" / "AI will adjust from your next session onwards") — corrected to say the weight simply defaults to your last logged value next time, which is what actually happens. Internal identifiers (`startingWeights:'ai'`, `getAIEstimatedWeight`, the `sw-ai`/`fsw-ai` element ids) are left unchanged — they're not user-visible and renaming them risks breaking saved-config compatibility.
  - **`manifest.json`:** PWA `name` drops "AI" (was "GainPath — AI Workout Tracker"), so the home-screen install label matches the app.
  - **`README.md`:** title, the "AI-powered" intro line, the onboarding "AI estimate" bullet, and the "Smart weight system" lead bullet all de-AI'd.
- **Removed dead Anthropic API handling from the service worker.** `sw.js` had a fetch-handler guard that let `api.anthropic.com` requests bypass the cache for "the app-level AI queue" — that queue no longer exists, so the guard is gone. The service-worker `CACHE_NAME` was bumped as the cached shell changed across this release and ships at `gainpath-v4`, so the updated shell replaces any older cached one.
- **README now carries a screenshot under each feature section instead of a single grid at the top.** The old layout grouped six screenshots into one table under the intro; the README now embeds one focused screenshot directly beneath each feature heading (training splits, day editor with a superset, custom program builder, onboarding, plate calculator, rest timer, dark mode, progress, PDF report, backup, feedback). Regenerated with a throwaway Playwright script against seeded demo data (not checked in); the now-unused `workout.png`, `bodyweight-plank.png`, and `prs.png` were removed.

### Removed
- **Removed the user-supplied-API-key "AI coaching" feature.** It briefly existed earlier in this Unreleased window (an "AI coaching" card in Settings for a personal Anthropic API key, upgrading the rest-screen tip, post-exercise feel rating, and end-of-session summary with live Claude responses). Pulled before release: every call billed straight to the user's own Anthropic account with no caching or rate-limiting — one call per set, per exercise rating, and per session, on top of any claude.ai subscription, which doesn't cover API usage. There's no way to make that genuinely free short of running a backend (relocates the cost/key, doesn't remove it) or a local in-browser model (large lift, against this app's single-static-file design), so the feature is gone rather than kept as a paid option. The Settings card, the API-key storage/management functions, and all three call sites are removed; the offline per-exercise tips, weight math, PR tracking, and RPE/session-feel rating underneath them are untouched and work exactly as before.

### Fixed
- **The next-weight suggestion chip ignored a weight/reps plan you'd just set.** If you opened a day's plan before starting a workout and explicitly set a custom weight for an exercise, the new RPE-based suggestion chip (added earlier in this Unreleased window) still showed up on that exercise proposing a different weight from your last session's feel rating — contradicting the plan you'd just made, and silently replacing it if you tapped Apply out of habit. The chip now only appears when you haven't already planned a weight for that exercise this session, matching how the first-set-weight prompt already deferred to an explicit plan.
- **README described several AI features that never actually worked.** The "🤖 AI coaching" section (per-set AI feedback, RPE next-session recommendation, end-of-session AI weight recommendations) and a "Tech stack" bullet credited to Claude were describing a feature that called the Anthropic API with no key and had never functioned since launch. Removed the inaccurate claims, rewrote the rest-timer section to describe what's actually there (offline tips, RPE/session-feel rating), and corrected a "How to use" step that overstated automatic weight adjustment — progression has always been a manual decision based on your last logged weight, AI or not.

## [1.1.2] - 2026-06-24

### Added
- **README screenshots.** Added a 6-image screenshot grid (`images/screenshots/`) right under the intro: home/day-picker, the exercise day editor, live workout logging, the bodyweight weight-modifier + plank hold timer together, the weight-progression chart, and the all-time PR list — covering the features that are hard to picture from text alone. Generated with a throwaway Playwright script against seeded demo data (not checked in), screenshotting the `.app` element directly rather than the full viewport so each image is tightly cropped to its actual content.
- **Rest-timer tips replace the rest-screen "AI assessment."** Each rest period now shows a random tip about the exercise you're resting from, drawn from ~12 curated form/efficiency/common-mistake/safety cues authored for every one of the 65 exercises in the database. The final rest before moving on to a new exercise shows a tip about *that* upcoming exercise instead, and the "Next:" line now names the actual next exercise rather than a generic "Next exercise" label.
- **Confirmation before leaving an exercise unfinished.** Tapping "Next exercise" or "Finish workout" while any set — including the warmup — is still unmarked now asks for confirmation first instead of silently moving on.
- **Mid-workout reorder now includes the exercise you're currently on, if you haven't done its first set yet.** Previously the mid-workout editor always excluded the in-progress exercise; now, as long as its first set (warmup or otherwise) isn't marked done, you can still bump it later in the queue, swap it, or delete it.

### Changed
- **README rewritten to reflect that exercises are no longer fixed per day.** The old "Male/Female workout plans" section listed exact exercises per split/day, which stopped being accurate once exercises became fully reorderable/swappable/deletable. Replaced with a "What each day hits" section describing the muscle groups each day targets (e.g. Push = Chest, Shoulders, Triceps), generated from the actual `EX` muscle-group tags rather than guessed from names, with a note that these are defaults you fully control. Also documented the exercise-customization, planned sets/reps/weight, bodyweight weight-modifier, and plank-timer features in the main Features list, none of which were mentioned there before.

### Removed
- **The "AI assessment" feature (rest-screen feedback, post-exercise "next session" tip, and end-of-workout recommendations) called the Anthropic API directly from the browser with no API key and no backend, so it could never succeed regardless of actual connectivity** — which is why it was permanently stuck "on hold," with failures from one workout sometimes only surfacing as a home-screen banner during the next one. Removed the non-functional fetch calls, the retry queue, and the "AI insights ready" home-screen banner. The rest screen's feedback is replaced by the new static tips above; the other two surfaces are simply gone.

### Fixed
- **Planned reps/weight set in the pre-workout editor were silently discarded for first-time exercises.** Starting a workout correctly built the session from the planned targets, but for any first-time exercise with "manual" starting weights, a first-set-weight prompt then popped up defaulting to the exercise's generic baseline weight — and accepting it silently overwrote the planned weight. That prompt is now skipped whenever a planned weight was already set for that exercise.
- **An in-progress exercise edit (reorder/swap/delete/planned targets), an open swap-picker screen, or an active plank hold could be lost if the app got backgrounded or killed before being saved/committed** — none of these were part of the persisted in-progress snapshot, unlike the rest of an active workout. All three now survive a reload/restore the same way the rest of a workout already does:
  - Opening the day editor — before *or* during a workout — now persists immediately, including swap-picker state (which body part/exercise list is showing) and which row's sets/reps/weight panel is expanded. Restoring drops you back into the same editor screen, mid-workout vs pre-workout context preserved.
  - Cancelling an edit (back arrow) now explicitly discards it instead of leaving stale data sitting in the persisted snapshot.
  - An in-progress plank hold now resumes counting from real elapsed wall-clock time on restore, the same way the rest timer and elapsed-workout clock already do — previously it would have silently reset.

## [1.1.1] - 2026-06-23

### Added
- **Reorder/swap/delete exercises mid-workout, not just before starting.** A new icon button on the workout screen header opens the same exercise-editor used pre-workout, scoped to the remaining (not-yet-reached) exercises in the session — the current and already-completed exercises are left untouched. Saving updates the live session immediately and, like the pre-workout editor, remembers the new order/swap as that day's default going forward.
- **Tap an exercise in the pre-workout/mid-workout editor to set its planned sets, reps, and weight (or added/assisted weight for bodyweight exercises) before starting it.** Previously the editor only let you reorder/swap/delete; now tapping a row expands an inline editor for that exercise's targets, which are used instead of the usual saved-weight/AI-estimate/app defaults once you reach that exercise.
- **Tapping into a weight or reps field now auto-selects its current value**, so typing immediately replaces it instead of requiring it to be manually erased first. Applies to every weight/reps number input in the app: live workout sets, the bodyweight magnitude input, the first-set-weight screen, the machine tare-weight screen, and the new planned sets/reps/weight editor.

### Fixed
- **The swipe-action background layer on exercise-editor rows was intercepting taps on the expanded sets/reps/weight editor underneath it**, making those inputs unclickable on some layouts. It's now purely decorative (`pointer-events:none`) — actions stay driven by the swipe gesture and icon buttons only.

## [1.1.0] - 2026-06-23

### Added
- **Exercise customization: reorder, delete, and swap exercises on any workout day before starting it.** Tapping a day on the home screen now opens an edit screen listing that day's exercises instead of jumping straight into the workout.
  - Drag the grip handle to reorder, tap the trash icon to delete (or swipe a row right-to-left), tap the swap icon to replace an exercise (or swipe left-to-right) by picking a body part and then a replacement from that part's pool.
  - Customizations are saved per day (`CFG.customDays`) and become the new default for that day going forward; "Reset to default order" reverts to the app's built-in list. Backup export/import already round-trips this automatically since it's just part of `CFG`.
  - The swap picker draws from a deduplicated pool of every exercise across all existing day arrays plus 27 newly-imaged substitution-only exercises (chest, back, shoulders, biceps, triceps, traps, core, quads, hamstrings, calves) — the same images added in the prior entry, now actually wired into the `EX` database via a new `EX.sub` array. `cable-rope-hammer-curl` is in the pool without an image yet (pending re-download) and falls back to the YouTube tutorial link like any other un-imaged exercise.
- **Optional added/assisted weight for bodyweight exercises** (push-ups, pull-ups, tricep dips, plank). Each set now shows a small mode toggle (Bodyweight / +Added / −Assisted) next to a magnitude input, instead of a static "BW" label — for a weighted vest/dip belt or a resistance band/assisted machine. Stored as a single signed number (positive = added, negative = assisted) so existing PR-detection and "last weight used" logic work unchanged; PR toasts, the rest screen, the PR list, and the monthly PDF report all display it as "+10kg added" / "15kg assisted" / "Bodyweight" instead of a raw number.
- **Isometric hold timer for Plank.** Instead of a reps field, Plank's sets show a Hold/Stop stopwatch that counts up and records the held duration (displayed as "Xs held" in PR toasts/PR list/PDF report) — separate from the existing rest timer between sets. "Mark done" is disabled until a hold has been recorded, and PRs now register for hold-duration improvement even with no added weight (previously the PR check skipped any set with 0 weight).
- **Editing reps or weight on a set now propagates to that exercise's other not-yet-completed sets** (so adjusting set 1 doesn't require repeating the edit on sets 2 and 3) — sets already marked done are left untouched.
- **27 new exercise reference images** (`images/exercises/`) for the exercise-substitution feature above — illustrated 3-panel tutorials covering chest (flat barbell bench press, decline dumbbell press, cable chest fly, machine chest press, push-ups), back (barbell row, single-arm dumbbell row, chest-supported machine row, pull-ups), shoulders (barbell overhead press, machine shoulder press, cable lateral raise, Arnold press), biceps (barbell curl, preacher curl), triceps (close-grip bench press, single-arm tricep kickback, tricep dips), traps (barbell shrug), core (plank, cable crunch), quads (leg extension, barbell back squat, Bulgarian split squat), hamstrings (seated hamstring curl, Romanian deadlift), and calves (seated calf raise). Cable rope hammer curl is still pending re-download.

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
