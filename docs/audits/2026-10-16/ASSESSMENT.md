# GainPath repository assessment — 16 October 2026

Baseline: `d0d22b1`, app v2.10.0. Repository was clean before this assessment. No production behavior, release version, exercise data, or existing artwork was changed. No commit, push, deployment, or paid Gemini batch was performed.

## Overall assessment

GainPath has a sound product foundation: a focused four-tab workflow, useful offline behavior, explicit weight suggestions, a substantial exercise catalogue, and unusually strong regression coverage for a small plain-JavaScript app. Preserve that architecture. A framework migration or broad redesign would add risk without addressing the most important findings.

The next improvement should be a **data-integrity and input-handling release**, followed by accessibility and language completion, then visual refinement. Passing current checks does not cover several consequential failure sequences reproduced below. New icons are a lower priority than protecting a completed workout.

## Scope and evidence

Reviewed runtime boundaries across all 17 scripts; concentrated on boot, persistence, restore, exercise rendering, session completion, charts, photos, and settings. Inspected service-worker behavior, analytics-worker source, package/test tooling, repository instructions, README, privacy copy, guide organization, icon implementation, and existing screenshots. Sampled recent Git history. Counted tracked assets: 1,079 image files / 330,637,979 bytes; app JavaScript 3,690,209 bytes. These are file lengths, not filesystem allocation or transferred/compressed sizes.

This is a repository-wide risk assessment, not a claim of exhaustive line-by-line verification of every exercise, translation, historical commit, or dependency. No production analytics account, real phone storage, live deployment, physical iPhone, screen reader, or remote GitHub configuration was inspected. Exercise biomechanics and scientific claims were not independently reviewed. No full secret-history or dependency-vulnerability scan was performed. Existing Appium advisories are outside the requested remediation scope.

Validation performed:

- `npm run precheck`: **passed** — lint; **296/296** unit checks; **81/81** data checks (including the suite's Chromium/WebKit photo coverage); visual smoke checks including offline boot.
- Initial sandbox run could not open the local test server (`EPERM`). The authorized rerun passed. That initial failure was environmental, not an app defect.
- `node docs/audits/2026-10-16/reproduce.cjs`: four targeted findings reproduced against real source functions using isolated memory/stubs.
- `node docs/audits/2026-10-16/browser-probes.cjs`: real Chromium rendering and failed-completion probes with synthetic storage, service workers blocked, and every external request blocked.
- Existing precheck was run as provided. It does not consistently suppress production analytics, so its normal synthetic actions may have sent events; the additional browser probes explicitly blocked them.
- `simulate`, `chaos`, and iOS Simulator suites were not run. The runtime was not changed.

## Findings, ordered by risk

### A01 — P1: failed completion discards the in-progress recovery record

**Confirmed in Chromium.** `js/workout.js:413–416` pushes the completed record, calls `saveData()`, then unconditionally sets `ST.day=null` and calls `clearInProgress()`. With only `gp_h` writes rejected, the probe ended with one session in memory, no history on disk, and no recovery record on disk. The save alert remained visible, but closing the app before exporting loses the completed session's only remaining copy.

**Improve:** have the save operation communicate success; keep a recoverable, idempotent pending completion until durable history is confirmed. Do not clear WIP on failure. Retrying or restarting must not duplicate the session. Add end-to-end quota-failure → close/reopen → recovery and retry tests.

### A02 — P1: unrelated successful writes dismiss unresolved save failures

**Reproduced against real functions.** `js/storage.js:45–48` uses one global `SAVE_FAILED` flag. After `saveData()` fails on `gp_h`, successful `saveCFG()` clears the alert even though history remains unsaved. `saveInProgress()` can also call `saveOK()` independently.

**Improve:** track dirty/failed stores or a coherent save operation. Clear the alert only when all outstanding user-data changes are persisted. Test one key failing while other keys continue to succeed, including after export updates configuration.

### A03 — P1: corrupted stored JSON silently leaves partial/default state

**Reproduced against `load()`.** `js/state.js:49` wraps all loading and migration in one empty catch. A valid configured profile followed by malformed `gp_h` leaves `CFG.setup=true`, empty in-memory history, and skips later body-weight loading. Subsequent saves could overwrite recoverable originals with defaults. A present `gp_cfg` prevents the current missing-profile mirror recovery path.

**Improve:** validate before publishing loaded state; preserve raw values and show an actionable recovery screen instead of silently continuing. Keep recovery changes within the existing localStorage/IDB contract; any broader IDB-read policy is a separate explicit design decision. Test each malformed field independently, and verify no automatic destructive write.

### A04 — P1: custom exercise strings enter HTML and JavaScript without contextual escaping

**Confirmed in Chromium.** `saveCustomEx()` (`js/day-edit.js:363`) accepts ordinary apostrophes and HTML characters. `renderEx()` (`js/workout.js:161–174`) inserts names into HTML, an image attribute, and an inline JS string. `O'Brien row` produces an invalid instructions handler; `<b id="audit-mark">Row</b>` creates a real element. Related raw insertions exist in PR/rest/summary rendering.

Import stripping of `<`/`>` is not a substitute for escaping: it does not address inline-handler quotes, and locally entered custom names bypass it. The probe demonstrated broken handlers and HTML interpretation, not a remote exploit or exfiltration.

**Improve:** use `textContent` where practical, `esc()` for text/attributes, and `jsArg()` for handler arguments. Preserve legitimate names. Test apostrophes, quotes, ampersands, angle brackets, Japanese/Korean strings, and a harmless injection marker across workout, rest, history, summary, and restore flows.

### A05 — P1: backup validation is shallow, and replacement protection depends on history count

**Validation gap reproduced; mutation consequences identified from source.** `validateBackup()` (`js/data-safety.js:50`) accepts nested shapes such as `customProgram.days=null` or `history[0].exercises="invalid"`. `applyBackup()` assigns config/state before migration and derived recomputation, whose functions assume arrays and valid nested values. An exception can therefore leave partially replaced memory.

`importData()` (`js/data-safety.js:73`) only confirms and creates Undo when `ST.history.length` is nonzero. Someone with a configured program, weigh-ins, or gym inventory but no completed workout can replace that data without these protections.

**Improve:** validate/normalize a complete candidate before mutation, reject unsafe object keys and invalid nested shapes, preserve compatible older backups, and base replacement protection on any meaningful existing data. Test malformed nested data, config-only users, interrupted saves, and Undo. Keep photos outside the backup format and state this clearly.

### A06 — P2: mirror health and recovery success are overstated

**Source-confirmed gap.** `idbMirror()`/`idbMirrorDelete()` (`js/storage.js:71–72`) suppress synchronous errors and do not observe transaction completion/abort. Initial verification is not verification of every subsequent write. `idbRecover()` (`js/storage.js:109–120`) ignores individual localStorage restore failures, then records its recovery flag, logs success, and reloads.

**Improve:** expose a degraded-mirror status separately from failure of authoritative localStorage writes. Verify recovery writes before declaring completion and avoid reloading into a partial restored profile. Test asynchronous IDB aborts and selectively rejected localStorage recovery writes. Keep localStorage authoritative.

### A07 — P2: Reset does not erase everything the privacy page promises

**Reproduced transaction scope plus source inspection.** `idbClear()` (`js/storage.js:121`) clears `kv` and `meta`, but leaves the `backups` store containing the pre-migration snapshot. `photoClear()` (`js/photos.js:108`) resolves even on deletion error or blocked deletion. `resetApp()` proceeds to reload. `privacy.html` says Reset erases everything stored in the browser.

**Improve:** resolve the intentional retention policy explicitly: preserving `pre-idb-2.9.0` during upgrades is required until at least v2.11, whereas user-requested erasure has a different expectation. Do not casually delete that backup as an audit fix. Design explicit erase semantics, surface failed/blocked deletion, and verify all relevant stores. Test another tab blocking photo deletion. Correct privacy copy to the actual verified behavior.

### A08 — P2: service-worker cache cleanup is broader than this app

**Source-confirmed conditional risk.** `sw.js` activation deletes every cache whose name differs from the two current GainPath names. CacheStorage is shared by origin; on a GitHub Pages origin hosting other projects, this can remove unrelated app caches. Network-first navigation/same-origin code also caches responses without checking `res.ok`, risking replacement of a healthy cached resource with a server error response.

**Improve:** limit cleanup to explicitly owned GainPath cache prefixes; never cache non-success responses over known-good content; add upgrade and error-response tests, not only clean offline-boot tests. Exercise active-workout updates with old and new worker generations. Do not change release/version conventions.

### A09 — P2: sheets and inputs need a focused accessibility pass

**Source inspection, not a formal accessibility certification.** Cancel, exercise-info, What's New, and badge sheets (`index.html:565`, `1211`, `1229`, `1240`) lack the dialog semantics/focus behavior implemented for accessible modals. The photo viewer declares a dialog but has no inspected focus trap or focus return. Search found no shared Escape handler, inert-background management, or modal focus management. Workout weight/repetition inputs have no explicit accessible labels identifying their set and value type.

**Improve:** add a minimal shared sheet helper compatible with plain scripts: accessible name, opening focus, contained tab order, Escape, and return to trigger. Give row inputs contextual labels. Check VoiceOver manually, keyboard-only operation, 200% text scaling, and 360px width. Avoid announcing the timer every second.

### A10 — P2: optional libraries still delay first rendering; catalogue text dominates startup

**Source/inventory evidence.** Three external scripts are synchronous in the document head. Guards prevent an absent library from crashing later call sites, but do not stop a slow request from delaying HTML parsing. `js/exercise-text.js` is **3,195,051 bytes** and loads all three languages before app startup. The section map still describes it as ~830 KB.

**Improve:** measure cold-load, parse time, and memory on a modest phone before choosing targets. Self-host or safely defer optional libraries while retaining call-site guards. Consider separately loaded plain-script language/content chunks with a guaranteed fallback and explicit offline behavior. Preserve global names and load dependencies; do not convert to modules. Maintain on-demand exercise-image caching. Do not precache the entire ~331 MB image collection.

### A11 — P2: advertised language support is incomplete in operational flows

**Source-confirmed examples.** Storage alerts, backup/install banners, portions of gym settings, session feelings, and suggestions include hardcoded English. `dayLabel()` always uses `en-PH`. `renderSplitOpts()` emits a hardcoded “Custom” badge with white text on a lime background in its unselected state (`js/onboarding.js:67`). README advertises English/Japanese/Korean without explaining these gaps.

**Improve:** route operational copy through existing translation keys; localize display dates without changing stored day keys. Preserve the separate RIR/session-feel keys. Use `--accent-ink` for lime surfaces. Verify complete critical flows in all three languages, especially failure/recovery messages.

### A12 — P2: analytics infrastructure has reliability and abuse-control gaps

**Source review; production configuration not inspected.** `analytics-worker/src/index.js` accepts POST events/leads regardless of Origin; CORS response headers do not reject a request. No application rate limit/deduplication is present. `readJsonBody()` reads the full body before checking 2,000 characters. Event counters use separate KV read/modify/write operations, so concurrent writes can overwrite updates. Stats credentials arrive in a query parameter, which is more exposed to URL/history/log handling. Stats scan all users.

**Improve:** add worker tests and explicit request/body controls; assess platform rate limiting; treat origin checks as one layer, not authentication. Use a header for stats credentials and keep secrets out of logs. If precise counts matter, choose a concurrency-safe aggregation mechanism; otherwise label them approximate. Add bounded retention/deletion procedures without changing the documented data collection silently. These are infrastructure improvements, not grounds to upload workout data.

### A13 — P2: regression coverage and automation do not cover the highest-risk sequences

The existing suites are valuable and pass, but A01–A05 survive them. No tracked `.github` workflow was present in this checkout, and the worker package has no test command. Some browser suites route analytics only in particular contexts.

**Improve:** move these audit reproductions into `test:data` with real browser assertions; add worker tests and a common network-isolated fixture. Add CI if desired after checking repository settings (not visible here). Keep simulate/chaos seeds replayable. Do not equate a passing precheck with proof against every corruption/failure sequence.

### A14 — P3: visual identity has inconsistent secondary elements

The existing Home screenshot has a recognizable dark/lime identity and clear navigation. Keep Tabler utility icons: they are intentional standard symbols, not evidence of Claude authorship. Custom `BDG_GLYPH` icons use familiar hexagons, numerals, a check, a flag, and a return arrow. Their authorship cannot be inferred from appearance; some are visually generic by design.

The larger consistency issues are mixed emoji/Tabler/handwritten badge styles, legacy theme layers/comments, and the light paper-style session share card (`shareSessionCard()`) against the current dark Kinetic app. The large streak card and prominent repeat button can compete with the suggested next workout; validate that priority with users rather than assuming a redesign helps.

**Improve:** reserve Tabler for controls, custom badge glyphs for achievements, and remove decorative sparkles where they imply an AI feature. Trial a clearer primary workout action, keeping all four tabs and the three-step onboarding. Refresh share artwork to the existing palette if desired. Use the supplied badge alternatives as a limited visual experiment, not a mandatory replacement of the whole icon system.

## Assets delivered

- `assets/badge-concepts.png`: generated four-badge concept sheet using the built-in image tool, not the paid repository Gemini script. Includes First Rep, Consistency, Personal Record, and Comeback. The output has some shading and edge artifacts despite the flat-art prompt; it is reference artwork, not production-ready raster UI.
- `assets/first-rep.svg`, `consistency.svg`, `personal-record.svg`, `comeback.svg`: clean, deterministic SVG alternatives inspired by the requested direction, ready for adaptation into the inline renderer. Each supports the same artwork with a `lock` class. These were authored as native SVG, not extracted from the generated bitmap.
- `assets/preview.html`: comparison gallery.
- `assets/generation-prompt.txt`: exact image-generation prompt.

Suggested mappings: `first_rep`, `chain_four`, `first_flag`, and `back_on_track`. Preserve the existing badge IDs, conditions, translations, and one-artwork locked state. These standalone files are prototypes, not drop-in `BDG_GLYPH` strings; adapt their geometry/classes to the shared wrapper rather than nesting complete SVG documents. Test at 24/32/64px, locked/unlocked, before shipping. No existing icons were overwritten or runtime assets wired in.

## Recommended implementation order

1. **Protect sessions and restore:** A01–A07; regression first; keep data rescue available throughout. A07 needs the retention/erasure policy resolved before implementing deletion changes.
2. **Harden rendering and offline updates:** A04, A08, test isolation and worker test coverage. Input escaping can be a small independent fix.
3. **Make critical flows accessible and translated:** A09/A11, then phone performance measurements and A10.
4. **Refine presentation:** optional badge integration, share-card consistency, and measured Home hierarchy improvements. Refresh tutorial/screenshots only when the actual UI changes.

Success means failed saves remain visible and recoverable, malformed inputs never replace valid state, legitimate names always work, offline updates preserve usable cached content, and all important controls/recovery messages work in the supported languages and assistive workflows. It does not require more features or a new framework.
