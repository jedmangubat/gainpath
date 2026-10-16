# GainPath improvement implementation prompt

Work in the GainPath repository. Read `AGENTS.md`, `CLAUDE.md`, `RELEASING.md`, and `docs/audits/2026-10-16/ASSESSMENT.md` first. Use that assessment as a prioritized backlog, not as permission to assume every suggested redesign is necessary. Verify the baseline and reproduce each defect before fixing it. The audit baseline was d0d22b1 / v2.10.0.

Your objective is to improve reliability, safety of user data, accessibility, performance, and visual consistency while preserving GainPath's existing product and architecture. Prioritize the user's only copy of their workout data. Implement in small, reviewable phases; do not bundle unrelated redesigns into storage fixes.

## Phase 1 — Data protection and safe input handling

1. Fix A01/A02 together: a failed history save must retain a durable recoverable workout/completion record, and an unrelated settings or WIP save must not clear outstanding errors. Make retry/relaunch idempotent so a completed workout cannot be duplicated. Preserve memory-based export.
2. Fix A03: malformed persisted JSON must not silently create apparently empty data that later overwrites recoverable originals. Validate before publishing state, preserve raw values, and offer recovery. Keep localStorage authoritative; do not silently expand IDB reading beyond the existing recovery policy.
3. Fix A04: consistently escape user-controlled exercise names and related strings for text, attributes, and inline JS handlers. Use existing `esc()` and `jsArg()` helpers where appropriate. Preserve apostrophes and Japanese/Korean text. Do not rely on stripping angle brackets from imports.
4. Fix A05: validate nested backup structures and construct a safe candidate before changing live state. Preserve compatible older backups. Confirm replacement and retain Undo for meaningful existing data even when history is empty. Stop if the Undo copy cannot be saved. Recompute both PRs and badges.
5. Address A06: observe mirror transaction failures, expose degraded mirror health without mislabeling a successful localStorage save as lost, and verify recovery writes before claiming success or reloading.
6. Resolve A07 carefully: keep the pre-idb-2.9.0 backup during upgrades through the required version window. Prepare explicit Reset semantics that distinguish user-requested erasure from routine migration retention. Do not delete protected backup data until that policy conflict is resolved. Show blocked/failed database deletion and keep privacy copy truthful.

Add regressions to `test:data` using the supplied audit probes as starting evidence, not as substitutes for browser tests. Cover selective quota failures, failure → relaunch → retry, corrupt individual keys, malformed nested imports, zero-session configured users, quotes/HTML in custom names, asynchronous IDB aborts, and blocked photo deletion. Run Chromium and WebKit for relevant storage flows. Never touch real user data during testing.

## Phase 2 — Offline reliability and tooling

Limit service-worker cleanup to GainPath-owned caches. Do not cache error responses over known-good resources. Test old-to-new updates, unrelated origin cache preservation, offline boot, and an active workout during an update. Preserve the documented APP_VERSION/script URL/cache conventions.

Centralize test network isolation so synthetic events never hit production analytics. Add worker tests before changing its input validation, body bounds, origin handling, counter concurrency, or stats authentication. Inspect actual deployment constraints before selecting a rate-limit or aggregation solution. Never expose secrets, use production leads for tests, or deploy as part of this work without authorization.

## Phase 3 — Accessibility, languages, and measured performance

Add accessible dialog naming, focus containment, Escape handling, and focus return to sheets; provide contextual accessible names for workout inputs. Keep the set row fitting at 360px and the existing smaller-width rules. Verify keyboard use and supported language layouts; document any manual VoiceOver/device checks still needed.

Translate remaining operational strings through en/ja/ko, especially saving, recovery, backup, installation, and workout suggestions. Localize visible dates without changing stored date keys. Keep RIR keys separate from session-level feelings and preserve all suggestion Apply/Dismiss interactions.

Measure cold-start transfer, parse time, and memory before optimizing. Remove synchronous optional-library blocking safely, preferably through self-hosting or compatible deferred loading. Assess splitting the 3.2 MB exercise text into plain-script content/language chunks only if measurements justify the complexity; retain robust offline fallbacks and global dependency order. No framework, module conversion, build step, or runtime dependency expansion.

## Phase 4 — Limited visual refinement

Keep dark Kinetic colors, Archivo/Space Grotesk/Space Mono, four tabs, and Tabler utility icons. Inspect `docs/audits/2026-10-16/assets/preview.html` and the generated concept sheet. Integrate the four optional SVG designs only where they improve recognition:

- `first-rep.svg` → `first_rep`
- `consistency.svg` → `chain_four`
- `personal-record.svg` → `first_flag`
- `comeback.svg` → `back_on_track`

Adapt glyph geometry into `BDG_GLYPH`; do not insert complete nested SVG documents or use the generated sheet as a runtime sprite. Preserve badge IDs, thresholds, translations, and a single SVG with `.lock` for locked state. Check 24/32/64px and locked/unlocked contrast. The generated raster is visual reference and has minor edge/shading artifacts; use clean vector artwork for UI.

Use `--accent-ink` on lime backgrounds, align the share card with Kinetic if making that visual change, and assess Home action hierarchy using actual user tasks. Do not add a fifth tab, onboarding questions, decorative AI claims, or an automatic weight change. Avoid broad CSS cleanup unless required by the specific change.

## Delivery and verification

Keep changes surgical and in the owning plain-script files. Maintain CHANGELOG and check README on every change; update stale section-map size information when relevant. Regenerate README screenshots for visible UI changes and tutorial screenshots/spotlights together with the existing capture command when tutorial content changes. Do not change mathematical behavior without explicit approval; follow the existing known-issue process for newly discovered formula bugs.

Run appropriate regressions after each phase and the full `npm run precheck` before completion. Run targeted seeded simulation/chaos where edited flows warrant it. Explain any environmental or manual-device limitations. Report each audit ID as fixed, verified already resolved, deferred with reason, or needing a specific decision; include evidence and remaining risks.

Do not push, tag, release, deploy, or post publicly. Do not bump the version unless a release is requested. If a release is later approved, follow RELEASING.md and obtain approval for that specific push. Do not create branches/PRs contrary to GainPath's direct-to-main workflow.
