# Session handoff — in-progress work

> Working note for resuming on another machine. **Delete this file before
> merging the branch** — it's not meant to ship.

**Branch:** `claude/readme-ai-feature-removal-9brwmv`
**Last updated:** 2026-06-24

## Where things stand

Three commits on this branch, all pushed to the remote, **none signed** (see
"Signing" below). Working tree is clean.

| Commit | What |
|---|---|
| `10b4c10` | Remove AI branding (de-AI'd README, app copy, manifest, sw.js) now that the AI-coaching feature is gone |
| `aaa1fc8` | Add 4 features: per-exercise session history, edit/delete a logged session, volume + estimated-1RM analytics, RPE-based next-weight suggestions |
| (this one) | Update CLAUDE.md (data-model conventions) + this handoff note |

All changes are in the single `index.html`, plus `sw.js` (`CACHE_NAME` bumped to
`gainpath-v3`), `manifest.json`, `README.md`, `CHANGELOG.md`, `CLAUDE.md`.

## Verification status

- ✅ `npm run lint` — 0 errors (one pre-existing `bw` unused-var warning in
  `getAIEstimatedWeight`, not ours).
- ✅ Inline-script syntax check (`node --check`) — clean.
- ✅ Logic unit-tested with mock data: `e1rm`, `sessionVolume`, `suggestWeight`
  (kg/lb increments, big-lift doubling, good/hard → no-op, BW/hold excluded),
  `recomputePRs` (weighted PRs update, hold PRs kept, bodyweight-only excluded).
- ⚠️ **Did NOT run `npm run visual-check`** — the Playwright Chromium download is
  blocked by the cloud env's network policy (403 from `cdn.playwright.dev`).
  **Run this on your laptop** to confirm no runtime errors in a real browser:
  `npm install && npx playwright install chromium && npm run visual-check`
  Note: visual-check only covers onboarding + home; manually click through a
  workout to exercise the new suggestion chip, session editor, and Progress
  metric selector.

## Signing

Commits show as **Unverified** on GitHub. The cloud env's SSH signing key
(`/home/claude/.ssh/commit_signing_key.pub`) is an empty file with no private
key, so signing can't happen here even with `commit.gpgsign=true`. Committer
email/name are correct (`Claude <noreply@anthropic.com>`). To sign locally:

```
git config user.email noreply@anthropic.com && git config user.name Claude
git rebase --exec "git commit --amend --no-edit -S" origin/main   # re-sign each commit
git push --force-with-lease
```

## Feature backlog (from the quality review, with hardness)

Hardness is rated **for this codebase specifically** (single static `index.html`,
no backend, localStorage, vanilla JS). Ordered hardest → easiest, the same way it
was proposed.

### ✅ Done this session
- **Per-exercise session history** (was: Easy) — Progress tab lists every past session for an exercise.
- **Total volume / tonnage** (was: Easy) — on session summary + history.
- **Estimated 1RM + richer PRs/charts** (was: Medium) — Epley e1RM, chart metric selector (weight / 1RM / volume), e1RM on PRs.
- **Edit/delete a logged session** (was the easy slice of "history browser", Medium) — detail screen, `recomputePRs()` on save/delete.
- **RPE → next-weight suggestions** (was: Medium, highest value-to-effort) — one-tap Apply/Dismiss chip from the feel rating.

### Hardest — fights the architecture (backend / platform limits)
- **Cloud sync & accounts** — needs a backend; against the "no backend, data stays local" ethos. Arguably shouldn't be built.
- **Social / sharing (feed, followers)** — backend + moderation; out of character for the app.
- **Apple Health / Google Fit / wearable sync** — browser PWAs can't reach HealthKit reliably; effectively needs a native wrapper. High effort, low feasibility on web.
- **Reliable background rest-timer notifications** — needs Notifications API + service-worker timing; iOS PWA makes this painful. Partly platform-blocked.

### Hard — big new subsystems, but doable in-file (no backend)
- **Custom routine/program builder** — beyond the 5 fixed split templates; significant data-model + UI change.
- **Supersets / circuits / drop sets** — grouping exercises (A1/A2) + dropsets; touches set-rendering and rest logic.
- **Custom exercises** — user-defined exercises stored in localStorage, folded into `EXPOOL`; must handle the missing image gracefully (YouTube fallback already exists). Hard-leaning-Medium.
- **Full history browser / calendar view** — the edit/delete *slice* is done; a complete browseable calendar of all sessions is still open. Mostly UI volume.
- **Weekly muscle-group volume / balance analytics** ("22 sets chest vs 4 back this week") — the `mg` tags already exist on every exercise; the work is the aggregation + viz.

### Medium — clear wins, contained scope
- **Bodyweight & measurements tracking + trend chart** — BW is collected once but never trended; add weigh-in log + chart (+ optional waist/arms; progress photos push this harder due to storage).
- **Dark mode** — single light theme today; mechanical but a full inline-CSS variable sweep.
- **Multi-step ramping warm-ups** — currently exactly one 50% set; lifters want 2–3 ramping sets (e.g. 40/60/80%).
- **Plate calculator** — "load 20+10+2.5 per side"; self-contained, Medium-leaning-Easy.

### Easy — small, self-contained, high satisfaction
- **"Repeat last workout" / quick-start** — one tap to re-run the last day with weights prefilled; history already stores everything.
- **Text search in the swap/exercise picker** — currently muscle-group drill-down only; a search box over `EXPOOL` is a few lines.
- **Weekly goal + smarter streak** ("3/4 this week") — small extension of existing streak logic.
- **Surface exercise cues on the exercise card** — the `EX_TIPS` DB (~12 cues each) already exists; show them on the card, not just the rest screen.
- **Rest-timer sound/vibration toggle** — `navigator.vibrate` on the final beep + a mute switch.

## To resume

1. `git fetch && git switch claude/readme-ai-feature-removal-9brwmv`
2. `npm install` (dev tooling) and run the visual-check above
3. Optionally re-sign the commits (see "Signing")
4. Pick the next feature(s) from the backlog
