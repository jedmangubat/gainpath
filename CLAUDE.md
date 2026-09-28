# GainPath — Project Instructions

A fitness-tracking PWA with real users whose only copy of their data is on
their own phone. Protect existing data first.

## Structure

- **No build step, no framework, no runtime dependencies.** `index.html` holds
  markup and CSS; the code is `js/*.js`, plain `<script src>` tags at the end of
  `<body>`. `package.json` is dev tooling only.
- **The js/ files are plain scripts, not ES modules — keep it that way.** They
  share one global scope: inline `onclick=""` handlers call ~150 top-level
  functions by name, `CFG`/`ST`/`OB`/`TUT` are reassigned from several files,
  and the tests reach in by name. Modules break all three.
- **Load order is dependency order** (`index.html` tag list; each file's role is
  in `docs/index-section-map.md`). Functions only hoist within their own file,
  so code that runs at load may only use earlier files or its own. Put new code
  in the file that owns the feature; never re-add an inline `<script>`.
- **Adding a js file:** tag `js/<name>.js?v=<APP_VERSION>` in `index.html` and
  `'./js/<name>.js?v=<APP_VERSION>'` in `SHELL_URLS` (`sw.js`). Every release
  bumps every `?v=` with `APP_VERSION`, so a phone never pairs a new
  `index.html` with a stale script. `visual-check` enforces both and boots the
  app offline from the precache.
- **A CDN must never be able to break the app.** Chart.js, jsPDF and EmailJS are
  used lazily or guarded at the call site, never touched at the top level of a
  file: a load-time `ReferenceError` strands users on a dead onboarding screen.
  Prefer self-hosting (fonts and icons already are).

## Product rules

- **Not an AI product.** Never call anything "AI" in copy, `manifest.json`,
  README or the title. `getAIEstimatedWeight` and `startingWeights:'ai'`/`sw-ai`
  are legacy identifiers kept for saved configs; the feature is an "estimate".
- **Dark-only "Kinetic" theme.** `#0C1512` base, lime `#C6F24E`, Archivo /
  Space Grotesk / Space Mono. No light theme or toggle. Text on lime is
  `--accent-ink`, never `#fff`.
- **Tabs are Train · Days · Climb · PRs.** No fifth tab: PDF report and backup
  live in Settings → Reports & backup (`openDataSettings()`). Streak card and
  install banner show on Train only (`stab()`). Per-exercise history is on Days.
- **Climb renders only the visible segment** (`chSeg`/`renderChSeg`): a chart
  drawn in a `display:none` parent is 0px wide. Charts need ≥2 points (else a
  "start here"/"starting point" card), open on 30 days via `chWindow()`, and
  the Strength picker comes from logged lifts (`chLifts()`).
- **First run is three steps** (name + sex; unit, body weight, experience,
  optional known lifts; days/week + split). Only add a question that changes a
  calculation before the first workout. New preferences go in Settings; hold
  any Home nudge until `ST.history` is non-empty (like `checkGymNudge()`).
- **Suggestions are never automatic.** Every proposed weight change is an
  Apply/Dismiss chip. Don't wire any rating into a weight change without a tap.
- **The rating after each exercise is reps in reserve** (5+ / 3–4 / 1–2 / 0).
  Stored keys stay `easy`/`good`/`hard`/`max`; labels live in `RIR_META`/
  `FEEL_OPTS`, separate from session-level `FEEL_META` — don't merge them.
  `suggestWeight()`: 5+ → full step, 3–4 → small step, 1–2 → hold, `max` twice
  → deload.

## Data and storage

- **Never swallow a storage error.** User-data writes go through `lsSave(k,v)`
  and end in `saveOK()` / `saveFailed()` (raises `#save-alert`). Rescue paths
  (`exportData`) work from memory, not from a successful write.
- **localStorage is what the app reads; IndexedDB `gainpath` is a verified
  mirror.** `idbRecover()` is the only IDB read (when `gp_cfg` is missing).
  Keep the `pre-idb-2.9.0` backup until at least v2.11. Switching reads to IDB
  is a separate future step.
- **Anything that erases user data calls `idbClear()` and `photoClear()`**, or
  the data comes back.
- **Progress photos** (`js/photos.js`) live only in IndexedDB `gainpath-photos`
  (`photos` = metadata + thumbnail, `full` = image; one transaction for both),
  never in the mirror or `backupPayload()`. Store **ArrayBuffers, never Blobs**
  (WebKit refuses Blobs). Decide "Not saved" with an explicit `failed` flag,
  not by whether an error exists (WebKit can fail with `null`). The card must
  keep saying photos aren't backed up.
- **Restore = `validateBackup()` → `applyBackup()`**: ask before replacing,
  keep `gp_pre_restore` for Undo, stop if it can't be stored, recompute PRs and
  badges. Extend `test:data` whenever backup, restore or storage changes.
- **Mid-workout edits are session-only.** `openMidWorkoutEdit()` rebuilds only
  `ST.sd`; its branches in `commitDayEdit()`/`closeDayEdit()` must not write
  `CFG.customDays`/`dayLinks`/`dayPlan`. Pre-start day edits do persist.
- **PRs and badges are derived caches.** Anything that changes or removes a
  logged session calls `recomputePRs()` **and** `recomputeBadges()`. Keep
  `chkPR()` in sync with `recomputePRs()` (skip warm-ups; zero weight counts
  only for timed holds; skip `noPR` exercises). Badges: add to `BADGES` +
  `BDG_GLYPH` (inline SVG; locked = `.lock` class, no second asset) +
  `bdg_<id>_name`/`_cond` in all three languages; weekly logic goes through
  `streakEndingAt()`/`weekTarget()`.
- **`ss('home')` renders Home itself** (`refreshHome()`); don't move that back
  to callers. New screens that cache rendered state render on the way in.
- **iPhone warning:** `isIOS() && !isStandalone()` shows the "could be deleted"
  banner; tests hide it by seeding `gp_ios_warn_dismissed` with a recent date.

## Weight math (`js/math.js`, the GAINPATH MATH section)

- All formulas live here: no DOM, storage writes or UI strings (`test:units`
  fails otherwise). Never silently change a formula's behaviour; an unapproved
  bug gets a `known('Bn', …)` check plus a CHANGELOG "Known issues" line.
- **Every proposed weight is snapped** through `roundToGymWeight(ex,w,dir)`
  (`up`, `down` for deloads) to the user's gear.
- **Starting weights:** `liftEstimate()` via `LIFT_REL`. A new free-weight or
  cable exercise needs a `LIFT_REL` entry. Cables are one-way (never a source
  for free weights, no sync chip). Upper-body bodyweight moves are sources only.
  No lower-body bodyweight moves or plate-loaded machines. Related lifts only
  raise a lift, via the `syncSuggest()` chip; a lift's own history wins.
- Body weight: read `curBW()`, never `CFG.bw`; end `ST.bw` writes with
  `syncBW()` (or `setWeighIn()`). Next session's weight: `carriedWeight()`.
  Built-in defaults: `defaultW(ex)`, never `ex.baseW` (baseW is kg). Pool days:
  `poolEx()`.
- **Unit conversion:** every stored weight field is in `convertUnitData()`
  (`cv`/`cvGear`, 0.1 rounding, `CFG.unitMemo` for exact round trips); never a
  bare multiply.
- Keep the evidence table in `docs/superpowers/plans/2026-09-25-lift-sync.md`
  current when a number changes; heuristics stay conservative.
- Reuse `e1rm`, `sessionVolume`, `fmtVol`, `exHistory`; don't recompute inline.
- **Dated charts plot time proportionally:** `{x: dkDay(dk), y}` data,
  `dayLabel()`, `timeAxis()`; never a `labels:` array (even spacing). Sort
  and dedupe by day (`ST.history` isn't in date order). No Chart.js time scale.

## UI constraints

- **The workout set row is a width budget** (ten controls, `nowrap`, must fit
  360px). Keep `.wi` elastic (`flex:1 1 44px`), no `margin-left:auto` on
  `.log`, keep the ≤400px/≤340px media queries. Run `visual-check` after
  touching it.
- **Icons are a self-hosted subset** (`fonts/tabler-icons*.css/.woff2`). A new
  `ti-*` needs re-subsetting with `pyftsubset` (`--drop-tables+=GSUB,GPOS`),
  its CSS rule, a `CACHE_NAME` bump, and a check that it renders (class names
  can be missing upstream, e.g. `ti-dumbbell`).
- **Tutorial** (`TUT_TOTAL`, `tut*`, Settings → How to use, `#h-tour`; not
  auto-played): regenerate screenshots and spotlights only together with
  `npm run capture:tutorial`. New how-to-use features get a `STEPS` entry. The
  wrap's 390:844 ratio comes from width, never `max-height` (WebKit crops).
- **Screenshots** (README, tutorial): block the service worker, seed
  `gp_a2hs_dismissed='true'` (exactly) and a recent `gp_last_export`, and wait
  ≥300ms past screen transitions. Regenerate README screenshots when the UI
  changes visually.

## Content

- **Exercise images:** `images/exercises/<name-lowercased-hyphenated>.png`,
  listed in `EX_IMAGE_URLS` (`sw.js`) with a `CACHE_NAME` bump. Never add an
  exercise to `EX` before its image exists; stage batches in an image-prompts
  `.txt` at the repo root (delete it when shipped). New exercises also get
  `EX_TIPS` (~6) and `EX_INSTRUCTIONS` (~5); assistance lifts get `noPR:true`.
  A broken built-in image shows a placeholder; only `custom:true` exercises
  fall back to a YouTube link (`exImgFallback`).
- **Generating images** costs money: `scripts/gen_exercise_image.py` (Gemini,
  ~$0.14/image, shared prepaid key) — ask before batch runs, pass approved
  images as references, write corrections as explicit geometry, log spend.
- **Lifting guides** (`guides/*.html`) quote the real math. When a formula or
  step changes, re-run the page's examples through the real functions. Cite
  only studies graded in the lift-sync doc. New guides go in
  `guides/index.html` and `sitemap.xml` (`visual-check` enforces). The share
  image must not claim more than `privacy.html`.
- **Copy must match the code.** Check README on every change and fix stale
  claims. `privacy.html` states only what the code does.

## Workflow

- Every code change gets a `CHANGELOG.md` entry; commit messages say what and
  why.
- **Push only after the user approves that specific push.** A version-bump
  push also gets its annotated tag and `gh release create` with the CHANGELOG
  notes, in the same approved step.
- **Every version bump follows `RELEASING.md`**; `npm run precheck` (lint →
  test:units → test:data → visual-check) must pass first.
- **What's new:** one README `## ✨ What's new in vX.Y.Z` section at a time,
  folded into `## Features` at the next bump. Feature releases bump
  `WHATS_NEW_VERSION` and rewrite `WHATS_NEW_ITEMS` + strings in en/ja/ko;
  bug-fix-only releases bump `APP_VERSION` alone and list fixes only in the
  CHANGELOG.
- **Coding discipline:** state assumptions and ask when unclear; minimum code
  for the request; surgical changes in the surrounding dense style (remove what
  your change orphaned, leave other dead code); reproduce a bug as a test
  before fixing it. Use the `systematic-debugging` skill for hard bugs.
  Don't convert these conventions into `.claude/skills/`, and don't adopt the
  branch/PR superpowers skills: GainPath commits straight to `main`.
- Keep this file current when a convention changes; nothing task-specific.

## Secrets and public actions

- Secrets live in the macOS Keychain (Facebook token: service
  `gainpath.facebook-system-user-token`, account `gainpath`). Pass them on
  stdin, never argv; never print, echo or commit one (check length only).
- `scripts/fb_post.py` writes only with `--yes`: show the dry run, get a yes
  for that post, then run it. It uses `curl` because this Python has no CA
  bundle; never disable TLS verification. `secrets/save.sh` (gitignored) saves
  a copied token from the clipboard; run it right after Copy, and never make
  the user copy a command while a token is on the clipboard. On a fresh clone,
  recreate it: validate `pbpaste` against `[A-Za-z0-9_-]{100,400}`, pipe
  `add-generic-password -U -a gainpath -s gainpath.facebook-system-user-token
  -w <t>` into `security -i`, verify the read-back, then `pbcopy < /dev/null`.

## Tools

| Command | Use |
|---|---|
| `npm run precheck` | release gate, stops at first failure |
| `npm run lint` | ESLint over all `js/` files as one script, errors mapped to `js/<file>:<line>`; bug rules only, no formatting |
| `npm run test:units` | the real math/PR functions in the browser; add a case when one changes |
| `npm run test:data` | backup/restore, save failures, IDB mirror, iPhone warning, photos (Chromium + WebKit) |
| `npm run visual-check` | UI smoke, set-row budget, tutorial ratio (WebKit), js/?v=/precache, offline boot, guides |
| `npm run simulate` | seeded fuzzer for Settings/day-edit persistence; extend `settingsCycle`/`dayEditCycle` with new controls |
| `npm run chaos` | Gremlins.js on six screens, both engines; new top-level screens/sheets go in `SCREENS`, with setup inside `runScreen()`'s try/catch |
| `npm run capture:tutorial` | tutorial screenshots + spotlight coordinates, always together |
| `npm run ios-verify` / `ios-chaos` | real iOS Simulator via Appium; occasional only (8 GB RAM gets it killed). Check Add to Home Screen by hand, don't script it |
| `scripts/process_brand_image.py` | square logo → `images/branding/` sizes (opaque `apple-touch-icon`); needs Pillow |

The Appium deps' `npm audit` advisories are left as they are: the only fixes
are major downgrades, and it's dev-only tooling that never sees untrusted input.

Failing `simulate`/`chaos` runs print a seed: `SEED=<n> npm run …` replays it.
Test scripts that load the app hit the production analytics worker; route it
(`gainpath-analytics.jedmangubat.workers.dev`) when that matters.
