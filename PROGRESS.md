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

## Feature backlog (from the quality review, ranked easy → hard)

Done this session: per-exercise history, edit/delete session, volume + e1RM,
RPE → weight suggestions.

Still open, roughly easiest first:
- "Repeat last workout" / quick-start
- Text search in the exercise swap picker
- Weekly training goal + smarter streak ("3/4 this week")
- Surface the existing exercise cue/tip DB on the exercise card (not just rest screen)
- Rest-timer vibration + sound/mute toggle
- Bodyweight & measurements tracking with a trend chart (BW collected but never trended)
- Dark mode
- Multi-step ramping warm-ups (currently a single 50% set)
- Plate calculator
- Custom exercises (user-defined, beyond the ~65 pool)
- Custom routine/program builder (beyond the 5 fixed split templates)
- Supersets / circuits / drop sets
- Weekly muscle-group volume / balance analytics
- Harder / against-the-grain: cloud sync, social, Apple Health / Google Fit,
  reliable background rest-timer notifications

## To resume

1. `git fetch && git switch claude/readme-ai-feature-removal-9brwmv`
2. `npm install` (dev tooling) and run the visual-check above
3. Optionally re-sign the commits (see "Signing")
4. Pick the next feature(s) from the backlog
