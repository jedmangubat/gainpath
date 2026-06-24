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
- **Exercise images** live in `images/exercises/`, named lowercase with hyphens
  matching the exact exercise `name` field in the `EX` object in `index.html`
  (e.g. `"Hack squat"` → `images/exercises/hack-squat.png`).
- **Check `README.md` on every change, update it only if there's a need.** Not a
  mandatory edit like `CHANGELOG.md` — but if a change makes an existing README
  claim stale/inaccurate, or adds something user-facing worth documenting, fix it
  in the same pass rather than letting it drift (this has already happened more
  than once: a features list described AI behavior that never worked, a "how to
  use" step overstated what was automatic).
- **Keep this file current.** Whenever a standing convention changes, or a new
  one is established (e.g. a new file location rule, a new workflow step), update
  this CLAUDE.md to reflect it. Don't update it for one-off task details — only
  for conventions meant to persist across future sessions.

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
