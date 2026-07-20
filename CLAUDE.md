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
  (e.g. `"Hack squat"` → `images/exercises/hack-squat.png`).
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
  `APP_VERSION`) drives a one-time bottom-sheet shown to returning users
  whose `CFG.lastSeenVersion` doesn't match `APP_VERSION`; bump
  `APP_VERSION` and rewrite `WHATS_NEW_ITEMS` on every version bump that
  ships a user-facing feature (mirror the README bullets, condensed). The
  tutorial (`#s-tutorial`, `TUT_TOTAL` steps, functions prefixed `tut*`) is
  a spotlight-on-screenshot walkthrough shown once after onboarding
  (skippable) and reachable anytime from Settings → How to use. If a new
  feature needs a "how to use it" explanation (not just a changelog bullet),
  add a step to the tutorial rather than leaving it frozen at whatever it
  covered when first built — bump `TUT_TOTAL`, add a `#tut-N` `.ob-step`
  following the existing screenshot+spotlight+tooltip pattern, and capture
  its reference screenshot into `images/tutorial/` the same way (dedicated
  Playwright capture with the "Add to Home Screen" banner dismissed via
  `gp_a2hs_dismissed`, using `getBoundingClientRect()` percentages for the
  spotlight/tooltip coordinates — see the v1.10.0 commit for the pattern).
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
  half-rendered/washed-out frame.
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
- **The per-exercise feel rating is functional, not decorative.** `exFeel`
  ("Too easy / Just right / Hard / Too much", stored per exercise on each history
  record) drives `suggestWeight()`, which proposes the next weight. Suggestions are
  always a one-tap **Apply/Dismiss** chip shown before the first set — never a
  silent auto-change. This is deliberate: progression stays the user's explicit
  decision (same principle as the manual starting-weight path). Don't wire feel
  data into anything that changes weights without the user tapping Apply.
- **Reuse the analytics helpers** rather than recomputing inline:
  `e1rm(w,r)` (Epley estimated 1RM), `sessionVolume(rec)` (tonnage, ignores
  warm-ups/bodyweight), `fmtVol(v)`, and `exHistory(name)` (per-exercise past
  sessions). Estimated 1RM and volume are shown across the Progress tab, PR list,
  and session summary — keep their definitions single-sourced.

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
