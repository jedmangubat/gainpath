# GainPath — Project Instructions

GainPath is a fitness tracking web app. The app itself is a single `index.html`
file with no build process and no runtime dependencies — no bundler, no
framework. Everything (markup, CSS, JS) lives in that one file, and that's
deliberate; don't introduce a build step for the app to consume `package.json`.

There is a dev-only `package.json` (Playwright + ESLint, see below) used purely
for local tooling — it never touches what ships in `index.html`.

**GainPath is not an "AI" product — don't reintroduce AI branding or
positioning.** An "AI coaching" feature (live Anthropic API calls) was tried and
removed more than once, and the app was at one point marketed as "AI-powered"
across its title, splash, onboarding, `manifest.json`, and `README.md`. All of
that is gone. The only thing that ever looked like "AI" is the starting-weight
estimate, which is a plain deterministic formula (`getAIEstimatedWeight` in
`index.html`) over body stats, experience, and strength baseline — describe it
as an estimate, never as AI. The function name and the `startingWeights:'ai'` /
`sw-ai` identifiers are kept only for saved-config compatibility; they are not
user-facing and are not a license to call the feature "AI" in copy. Note the app
is a PWA: user-facing branding also lives in `manifest.json` (`name`) and the
service worker `sw.js` (bump `CACHE_NAME` when the cached shell changes).

**Visual identity (as of v2.0.1): "Kinetic" — dark-only.** The app renders a
single dark theme (near-black moss `#0C1512` base, one electric-lime accent
`#C6F24E`, Archivo display / Space Grotesk body / Space Mono for numerals).
There is **no light theme and no dark-mode toggle** — `applyTheme()` and
`accentColor()` are pinned to dark, and `<html data-theme="dark">` is hard-set,
so don't reintroduce a light palette or a toggle without an explicit request.
Semantic tokens: on-surface text is `--txt`/`--txt2`/`--txt3`; text that sits
**on** the lime accent is `--accent-ink` (never `#fff` on `--accent`/lime, which
fails contrast in dark). The bottom tabs are **Train · Days · Climb · PRs**
(keys `nav_workouts`/`nav_calendar`/`nav_climb`/`nav_prs`); the
streak card + install banner only show on the Train tab (see `stab()`).
As of v2.3.0 there is **no Save/Export tab** — the monthly PDF report and
backup/restore live in Settings → Reports & backup (`s-setdata`, opened by
`openDataSettings()`), so don't reintroduce a fifth tab for them. The Climb
tab is a three-way segment (Strength / Balance / Body, `chSeg()` +
`renderChSeg()`) that renders **only the visible segment** — a Chart.js
canvas measured inside a `display:none` parent comes out 0px wide, so any
new segment must draw on the way in, never all at once up front. Per-exercise
session history lives on the **Days** tab, not Climb.

## Coding discipline

Adapted from `multica-ai/andrej-karpathy-skills` (Karpathy's observations on common LLM coding pitfalls). These are general defaults, not GainPath-specific — merge with everything else in this file.

- **Think before coding.** State assumptions explicitly. If multiple interpretations exist, name them rather than silently picking one. Stop and ask when something's unclear instead of guessing.
- **Simplicity first.** Minimum code for the actual request — no speculative config/flexibility, no abstractions for single-use code, no error handling for scenarios that can't happen (single-file app, no framework, no build step).
- **Surgical changes.** Touch only what the task requires. Don't refactor or restyle adjacent code while fixing something else; match the existing dense inline-script style even where you'd write it differently. Remove imports/variables your own change orphaned; leave pre-existing dead code alone unless asked.
- **Goal-driven execution.** Turn a task into a verifiable check before starting — "fix the bug" → reproduce it (ideally as a `test:units` case), then fix and re-run. State a brief step→verify plan for multi-step work.

## Standing workflow rules

- **Every code change must include a corresponding `CHANGELOG.md` entry** under
  today's date, describing what changed and why.
- **Write clear, descriptive git commit messages.** Never generic ones like
  "update files" or "fix stuff" — explain what changed and why.
- **Pushing is allowed, but only after explicit confirmation from the user for
  that specific push.** After committing, ask "Ready to push — push now?"
  (or similar) and wait for a yes before running `git push origin main`.
  Never push proactively/silently, and a prior approval doesn't carry over to
  a later commit — confirm each time.
- **Version bumps must be tagged and released, not just pushed.** When a commit
  bumps the version (the `(vX.Y.Z)` in its message + the new `CHANGELOG.md`
  entry), then once the user approves that push, also create and push the
  matching annotated tag (`git tag -a vX.Y.Z` → `git push origin vX.Y.Z`) and
  publish the GitHub release (`gh release create vX.Y.Z` with the version's
  CHANGELOG notes) in the same step — no separate request needed beyond the
  push approval. This keeps GitHub's Releases page in sync with shipped code;
  it previously drifted (releases sat at v1.1.1 while `main` was at v1.2.6
  because the v1.2.x commits were pushed but never tagged).
- **Exercise images** live in `images/exercises/`, named lowercase with hyphens
  matching the exact exercise `name` field in the `EX` object in `index.html`
  (e.g. `"Hack squat"` → `images/exercises/hack-squat.png`). These are
  precached for offline use by the service worker: `sw.js` holds an
  `EX_IMAGE_URLS` list of every file in `images/exercises/`. **When you add or
  remove an exercise image, update `EX_IMAGE_URLS` in `sw.js` to match and bump
  `CACHE_NAME`** — otherwise new images won't be part of the offline precache
  (they'll still cache on-demand when viewed online, but not offline-first).
  A built-in exercise whose image fails to load shows a neutral placeholder;
  only `custom:true` exercises fall back to a YouTube-search "Tutorial" link
  (`exImgFallback` branches on `custom`).
- **Icons are a self-hosted subset — adding one is two steps, not one.**
  `fonts/tabler-icons.css` + `fonts/tabler-icons-subset.woff2` hold only the
  ~65 Tabler glyphs the app actually uses, cut from the upstream webfont with
  `pyftsubset` (see the regeneration note in the CSS header; the upstream GSUB
  table is malformed, so `--drop-tables+=GSUB,GPOS` is required). Writing a new
  `ti-*` class in markup is **not** enough — a glyph that isn't in the subset
  renders as an empty box, silently and only at runtime. Re-subset with the new
  codepoint, append its rule to the CSS, and bump `CACHE_NAME`. Both files are
  in `SHELL_URLS`, deliberately: they were on a CDN until v2.1.1, where only
  the stylesheet was precached and the font it referenced was not, so every
  icon in the app became a box offline. Verify a new icon actually renders
  (measure its width with the font loaded) rather than trusting the class name
  — `ti-dumbbell` shipped blank for months because it doesn't exist in Tabler
  2.47.0.
- **Exercise images are generated through the Gemini image API, not a chat UI
  (switched 2026-08-19).** `scripts/gen_exercise_image.py <slug> <brief-file>
  [refs...]` calls `gemini-3-pro-image` and writes an exact 1774x887 PNG into
  the gitignored `scripts/.gen/`, appending every call to
  `scripts/.gen/spend.tsv`. It is a **paid** API (~$0.14/image) billed to the
  prepaid Gemini key shared with the `YouTube Shorts` project
  (`secrets/gemini-api-key.txt` there; override with `GEMINI_API_KEY_FILE`) —
  so it spends real money and that pool is shared, ask before batch runs.
  Two things make it beat pasting briefs into free ChatGPT, which was rejecting
  ~6 of 7: **approved images are passed as reference inputs**, which is what
  finally held the locked character/skin-tone/wardrobe that drifted constantly
  before, and the 2K output is centre-cropped to 2:1 so the canvas is never
  letterboxed. What it does *not* fix is pose and joint geometry — that still
  needs the same per-image human review, so write corrective notes as explicit
  geometry ("the shin drops downward so the shoe sits lower than the knee")
  rather than naming the exercise. Keep appending to the batch's spend ledger
  in the image-prompts `.txt`.
- **Never add an exercise to the `EX` object without its image already in place.**
  When proposing/adding a batch of new exercises, stage them in a dedicated
  image-prompts `.txt` at the repo root (self-contained, paste-ready prompt per
  exercise — see the v1.7.0 batch's format in git history) until every image is
  generated and saved into `images/exercises/`; delete the prompts file once the
  batch ships. New exercises also get `EX_TIPS` (~6 cues) and `EX_INSTRUCTIONS`
  (~5 steps) entries in the same pass. Exercises whose logged weight means
  assistance (lower = stronger, e.g. Machine-assisted pull-up) get `noPR:true`
  so PR logic skips them.
- **Check `README.md` on every change, update it only if there's a need.** Not a
  mandatory edit like `CHANGELOG.md` — but if a change makes an existing README
  claim stale/inaccurate, or adds something user-facing worth documenting, fix it
  in the same pass rather than letting it drift (this has already happened more
  than once: a features list described AI behavior that never worked, a "how to
  use" step overstated what was automatic).
- **README "What's new" section.** A notable user-facing change (new feature,
  visual refresh, etc.) gets a `## ✨ What's new in vX.Y.Z` section added right
  after the intro (above `## Features`), describing it in user-facing terms.
  When the *next* version bump ships, fold that section's bullets into the
  permanent `## Features` list (merge into the relevant existing subsection, or
  add a new one) and delete the "What's new" section — replacing it with a
  fresh one for the new version if that release also warrants one. Only one
  "What's new" section should exist at a time. **Bug-fix-only releases don't
  enumerate their fixes in the README** — no new "What's new" section for
  them; at most a general line like "bug fixes and stability improvements" if
  one is warranted. The detailed list always lives in `CHANGELOG.md`. In a
  mixed release, features get bullets and fixes get one general line
  (headline-worthy fixes can be named briefly).
- **In-app "What's New" and the persistent tutorial (added v1.10.0) need the
  same upkeep as the README's "What's new" section — don't let them go
  stale.** `WHATS_NEW_ITEMS` (near the top of `index.html`'s script, next to
  `APP_VERSION`) drives a one-time bottom-sheet shown to returning users.
  **The sheet is gated on `WHATS_NEW_VERSION`, not `APP_VERSION`** — it's the
  version `WHATS_NEW_ITEMS` actually describes, and it shows only when
  `cmpVer(CFG.lastSeenVersion, WHATS_NEW_VERSION) < 0`. On a release that
  ships user-facing news, bump `WHATS_NEW_VERSION` to the new version and
  rewrite `WHATS_NEW_ITEMS` + its `whatsnew_item*` strings in all three
  languages (mirror the README bullets, condensed). On a **bug-fix-only**
  release, bump `APP_VERSION` alone and leave `WHATS_NEW_VERSION` where it
  is — upgraders then correctly see no sheet, instead of last version's
  announcement re-headed with the new number (this shipped broken in v2.0.2;
  fixed in v2.0.3). The
  tutorial (`#s-tutorial`, `TUT_TOTAL` steps, functions prefixed `tut*`) is
  a spotlight-on-screenshot walkthrough shown once after onboarding
  (skippable) and reachable anytime from Settings → How to use.
  **Never regenerate a tutorial screenshot without re-measuring its spotlight**
  — the highlight rectangles are percentages of the screenshot, so a fresh
  capture leaves them pointing at whatever used to be in that spot. This
  already happened once (v2.4.0 rebuilt all twelve steps: half the screenshots
  predated the v2.x refresh, and the Reports & backup step highlighted a row
  ~38 percentage points below the one its tooltip described).
  `npm run capture:tutorial` (`scripts/capture_tutorial.mjs`) is the only
  supported way to do it: it drives the real app to each screen, screenshots
  at exactly 390x844 (`.tut-ss-wrap` is `aspect-ratio:390/844` with
  `object-fit:cover`, so any other ratio crops and shifts every coordinate),
  and measures the target element's rect from the same DOM in the same pass.
  Add a step by adding an entry to its `STEPS` array, then regenerating. If a new
  feature needs a "how to use it" explanation (not just a changelog bullet),
  add a step to the tutorial rather than leaving it frozen at whatever it
  covered when first built — bump `TUT_TOTAL` and add the step to
  `capture_tutorial.mjs`'s `STEPS` array rather than hand-writing coordinates.
  The capture seeds a dismissed "Add to Home Screen" banner
  (`gp_a2hs_dismissed`) and a recent `gp_last_export`; without both, the
  banner or the backup nudge shifts every element below it and silently
  invalidates the coordinates measured from that capture.
- **README screenshots go stale — regenerate them when the UI changes
  visually.** The images under `images/screenshots/` are real captures of the
  app, referenced by `README.md`. A visual-only change (redesign, restyled
  component, new screen) should regenerate the affected screenshots via a
  throwaway Playwright script (seed realistic localStorage state, click
  through to each screen, screenshot at `deviceScaleFactor: 2`) rather than
  leaving them showing the old look. Two gotchas hit while doing this the
  first time: (1) `index.html` registers a service worker unconditionally, and
  (2) screens fade in via a CSS animation on `.screen.active` — take the
  screenshot only after both the page has settled and a short
  (~300ms+) wait past any screen transition, or the capture shows a
  half-rendered/washed-out frame. A third: the install banner is dismissed by
  `gp_a2hs_dismissed === 'true'` — seeding any other value (`'1'`) leaves the
  banner in the shot and shifts every element below it, which silently
  invalidates spotlight coordinates measured from that capture. Seed
  `gp_last_export` too, or the backup nudge takes the banner's place.
- **The workout set row is width-constrained — treat it as a budget.** A
  plate-loaded, un-logged row carries ten controls (set number, −, weight, unit,
  +, ×, reps, plate calculator, Log, delete) and only just fits a 360px phone.
  It is `display:flex` with `nowrap`, so it never wraps — it silently overflows
  the card and clips the right-hand controls instead, which is how it shipped
  broken on every phone under ~400px until v2.4.0. Two media queries carry the
  budget: ≤400px tightens everything and hides the redundant unit label, ≤340px
  additionally hides the plate calculator. `.wi` is deliberately elastic
  (`flex:1 1 44px`) so long values like `137.5` get the row's spare space —
  don't give it back a fixed width, and don't restore `margin-left:auto` on
  `.log`, which used to swallow that slack. **Adding anything to this row means
  re-running `npm run visual-check`**, which fails on overflow, on a clipped
  input value, and on rows that aren't all one line.
- **Keep this file current.** Whenever a standing convention changes, or a new
  one is established (e.g. a new file location rule, a new workflow step), update
  this CLAUDE.md to reflect it. Don't update it for one-off task details — only
  for conventions meant to persist across future sessions.

## Data model & app conventions

- **PRs are derived, not authoritative.** `ST.prs` is a cache rebuilt from
  `ST.history` by `recomputePRs()`. Any code that mutates a logged session's sets
  or removes a session (the session editor, delete, future history tooling) MUST
  call `recomputePRs()` afterward, or a corrected/deleted lift can leave a stale
  PR behind. Live PR detection during a workout still uses `chkPR()`; keep the two
  in sync (same "ignore warm-up sets, zero weight only counts for timed holds"
  rules).
- **The per-exercise rating is functional, not decorative.** `exFeel` is a
  last-set **reps-in-reserve (RIR)** rating — "On your last set, how many reps
  could you still have done?": 5+ / 3–4 / 1–2 / 0-to-failure. The stored keys are
  still `easy`/`good`/`hard`/`max` (kept for history compatibility — do not
  rename), but their user-facing labels live in `RIR_META` and `FEEL_OPTS`
  (per-exercise), **separate from `FEEL_META`** which is the untouched
  session-level "overall feel" rating (same keys, different labels — don't
  collapse them). `exFeel` drives `suggestWeight()`: 5+ → +full increment, 3–4 →
  +small step, 1–2 → hold, and two `max` sessions in a row → deload. Suggestions
  are always a one-tap **Apply/Dismiss** chip — never a silent auto-change;
  progression stays the user's explicit decision. Don't wire the rating into
  anything that changes weights without the user tapping Apply.
- **Weight the app proposes must be loadable from the user's gear.**
  `suggestWeight()`, warm-up sets in `buildSets()`, and `getAIEstimatedWeight()`
  all pass their result through `roundToGymWeight(ex, w, dir)` — `dir='up'` snaps
  to the next-higher plate/dumbbell the user owns (Settings → My gym;
  `CFG.gymDumbbells` / `CFG.gymPlates`), `'down'` for deloads, `'nearest'` is the
  legacy default. It's a no-op when no inventory is configured. Never surface a
  proposed weight (suggestion, warm-up, estimate) without snapping it.
- **Reuse the analytics helpers** rather than recomputing inline:
  `e1rm(w,r)` (Epley estimated 1RM), `sessionVolume(rec)` (tonnage, ignores
  warm-ups/bodyweight), `fmtVol(v)`, and `exHistory(name)` (per-exercise past
  sessions). Estimated 1RM and volume are shown across the Progress tab, PR list,
  and session summary — keep their definitions single-sourced.
- **Badges are derived, exactly like PRs.** `ST.badges` (`{id:{dk}}`) is a cache
  rebuilt by `recomputeBadges()` from `ST.history`/`ST.bw`/`CFG`; it is never
  persisted. **Every call site of `recomputePRs()` must also call
  `recomputeBadges()`** — same reasoning as the PR note above. Badge conditions
  live in the `BADGES` array and are evaluated in one chronological pass, so
  each badge is stamped with the date it was *first* earned; add a badge by
  adding an entry there plus a `BDG_GLYPH` drawing and `bdg_<id>_name`/`_cond`
  strings in all three languages. Badge art is **inline SVG** (`BDG_GLYPH` +
  `badgeSvg()`), not PNGs in `images/` — the locked state is the `.lock` class
  on the same drawing, so never author a second "greyed" asset. Weekly/streak
  conditions must go through `streakEndingAt()`/`weekTarget()` rather than
  re-deriving what counts as a qualifying week.
- **Charts over dated data plot time proportionally.** A gap between sessions
  must render as a gap — never one equal-width slot per entry. Any new chart
  reuses `dkDay(dk)` (whole-day index since the epoch) for its `x` values,
  `dayLabel(n, full)` for date text, and `timeAxis(days, tickColor)` for the
  `scales.x` config. Concretely: pass Chart.js `data:[{x,y}]` and **never** a
  `labels:` array of date strings — that selects the category scale, which is
  exactly the uniform-spacing bug fixed in v2.0.3. Chart.js's own `time` scale
  is deliberately unused; it needs a date-adapter dependency the app doesn't
  carry. Series must also be sorted chronologically and deduped by day at build
  time — `ST.history` is append-only, so its order is not date order.
- **`ss(id)` renders the home screen; callers don't.** `ss('home')` calls
  `refreshHome()` itself, so no navigation path can show an unrendered home.
  Don't "optimise" that away, and don't go back to making each caller
  responsible: that was the v2.1.1 bug. Startup only calls `refreshHome()` on
  the branch where `restoreInProgress()` returns false, so anyone relaunching
  with a saved `gp_wip` got a home screen nothing had filled in, and `bnav()`
  /`closeDayEdit()`/`cancelProgram()` all switched to it without rendering —
  an empty Train tab, no JS error, reproducible across relaunches. The
  `refreshHome();ss('home')` pairs still scattered around are now redundant
  but harmless. Any *new* screen that caches rendered state should follow the
  same shape: render on the way in, from `ss()`.
- **A third-party CDN must never be able to break the app.** Anything loaded
  from a CDN (`Chart.js`, `jsPDF`, EmailJS in `<head>`) is used lazily inside
  the feature that needs it, or guarded at the call site — never dereferenced
  at the top level of the script block. The whole app is one `<script>`, so a
  single `ReferenceError` there stops every function from ever being defined
  and strands the user on a dead onboarding screen (this is what
  `emailjs.init()` did until v2.1.1). Prefer self-hosting outright, as the
  display fonts and icons already are.

## Dev tooling (optional, dev-only — `npm install` once to use)

- **`npm run visual-check`** — starts a static server, loads `index.html` in
  headless Chromium (Playwright), screenshots the onboarding and home screens,
  and fails if anything throws a console/page error. Screenshots land in
  `scripts/.visual-check/` (gitignored). Use this after any UI change instead of
  ad hoc one-off browser scripts.
- **`npm run lint`** — extracts the inline `<script>` block from `index.html`
  and runs ESLint (`eslint.config.js`) against it, mapping line numbers back to
  `index.html`. Scoped to bug-catching rules only (`no-undef`, `no-unused-vars`,
  etc.) — deliberately no stylistic/formatting rules, since the inline script's
  dense, semicolon-chained style is intentional and Prettier would rewrite the
  whole file. Top-level functions are only ever called from inline `onclick=""`
  attributes, so don't be surprised they look "unused" in isolation — the config
  already accounts for that.
- **`scripts/process_brand_image.py`** — turns a square source logo/icon (e.g. a
  fresh export from an image generator) into the sizes referenced from `<head>`
  and the app chrome (`images/branding/logo.png`, `favicon-16.png`,
  `favicon-32.png`, `apple-touch-icon.png`), stripping the generator's solid
  canvas color to transparent and re-flattening onto an opaque brand background
  for the alpha-intolerant `apple-touch-icon`. Requires Pillow
  (`pip3 install -r scripts/requirements.txt`).
- **`npm run capture:tutorial`** — regenerates every tutorial screenshot in
  `images/tutorial/` **and** its spotlight coordinates in one pass, then prints
  the measured boxes. See the tutorial note above for why the two must never be
  regenerated separately.
- **`npm run test:units`** — unit-tests GainPath's pure calculation functions
  (`e1rm`, `sessionVolume`, `fmtVol`, `recomputePRs`, `chkPR`) against the real
  inline script, using the same Playwright boot pattern as `visual-check`
  (seed `localStorage`, load `index.html`, call the real `window`-scope
  functions from `page.evaluate`) rather than reimplementing their logic in
  the test. Guards exactly the invariants called out below under "PRs are
  derived, not authoritative" — warm-up sets ignored, `noPR` exercises
  excluded, zero weight only counting for `holdSecs` exercises, and
  `chkPR`/`recomputePRs` staying in sync. Add a case here whenever one of
  those functions changes.

## Claude Code plugins

- **`superpowers` (obra/superpowers, via the official marketplace) is
  installed** — a general-purpose agent-methodology plugin (TDD, systematic
  debugging, planning, subagent-driven review), not fitness-domain-specific.
  Only `test-driven-development` and `systematic-debugging` are actively
  adopted here (see `npm run test:units` above, and reach for the
  `systematic-debugging` skill's 4-phase root-cause method on any gnarly bug
  report rather than ad hoc troubleshooting).
- **Deliberately not adopted:** turning GainPath's recurring procedures
  (batch exercise adds, README screenshot regen, the version/tag/release
  flow) into `.claude/skills/` files. Superpowers' own `writing-skills` skill
  states project-specific conventions belong in the project's instructions
  file, not in a skill — which is exactly what this CLAUDE.md already is. It
  also requires a full pressure-tested RED-GREEN-REFACTOR cycle with
  subagents before any new skill ships, which isn't worth the overhead for
  internal-only documentation. Don't re-propose converting these sections
  into skills without a genuine cross-project reuse case.
- Also deliberately left opt-in (not adopted): `using-git-worktrees`,
  `finishing-a-development-branch`, `requesting-code-review`,
  `receiving-code-review` — these assume a feature-branch + PR-review
  workflow, but GainPath commits directly to `main`. Adopting them would be a
  workflow change, not a pure add; only pick them up if that changes.
