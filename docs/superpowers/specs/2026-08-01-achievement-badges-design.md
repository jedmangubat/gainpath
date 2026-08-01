# Achievement badges — design

**Status:** approved 2026-08-01 · **Ships as:** v2.1.0 (feature release)

## Why

GainPath rewards a workout at the moment it ends (summary screen, PR stamps) and
rewards strength permanently (the PRs tab). Nothing rewards the *middle* — the
months of showing up that produce neither a PR nor a memorable session. Badges
fill that gap: a fixed set of sixteen milestones, some earnable in week one and
some taking a year, shown at the end of any workout that unlocks them and
collected on a permanent shelf.

Decisions already made with the user:

| Decision | Choice |
|---|---|
| Backfill | Evaluate against **all existing history** — shipping unlocks what's already been earned |
| Set size | **16**, curated — one badge per idea, no filler tiers |
| Art direction | **A "Waypoint"** — lime hexagon medallion, glyph knocked out in near-black |
| Placement | **PRs tab**, grid above the existing all-time PR list |
| Locked state | Same drawing, greyed — a CSS class, never a second asset |

Reviewed visually at
<https://claude.ai/code/artifact/01a4d011-3532-42f7-98b3-0cb31b887eac>.

## Data model

**Badges are derived, not authoritative** — the same rule `CLAUDE.md` already
states for PRs. `ST.badges` is a cache of `{id: {dk}}` (id → the date key the
badge was first earned), rebuilt from `ST.history` / `ST.bw` / `CFG` by
`recomputeBadges()` in `load()`.

> **Changed during implementation:** this originally specified a `gp_bg`
> localStorage key. Dropped — badges are *fully* derived, with no live
> incremental path like `chkPR()` gives PRs, so persisting them only creates a
> cache that can go stale and a new key that backup export/import would have to
> carry. Recomputing is one O(n) pass at startup. Nothing is written to storage.

> **Invariant:** every existing call site of `recomputePRs()` must also call
> `recomputeBadges()` — `saveSessionEdit()` and `deleteSession()` today. Editing
> away the session that earned a badge must revoke it, exactly as it revokes a
> PR. This is the single easiest thing to get wrong.

### `recomputeBadges()` — one chronological pass

Sort history by `dk`, then walk it forward maintaining an accumulator:
session count, distinct exercise names, cumulative volume, a `week → Set(dk)`
map, running PRs, a PR-event counter, the previous session's `dk`, and the
latest body-weight entry at or before the current `dk`.

After each session, test every not-yet-earned badge against the accumulator and
stamp it with that session's `dk`. This gives correct *historical* earned dates
for backfilled badges rather than dating everything "today", and it's O(n) — no
re-deriving PRs per prefix.

Reuse, don't reimplement: `sessionVolume(rec)`, `dkDay(dk)` for the gap
calculation, `restDaysInWeek(wk)` and `weekStartDk(dk)` for week targets, and
the `chkPR` rules for what counts as a PR (warm-ups excluded, `noPR` exercises
skipped, zero weight only for `holdSecs` exercises).

**One refactor is required.** `streak()` currently builds its week map and walks
backward inline, so it can only answer "what is the streak *right now*". Extract
the walk into `streakEndingAt(weekDays, wk)` and have `streak()` call it with
today's week; `recomputeBadges()` calls it with each session's week. One
definition of "a qualifying week", used by both — same reasoning as keeping
`chkPR` and `recomputePRs` in sync.

## The sixteen badges

Thresholds are per-unit, keyed on `CFG.unit`; switching units never revokes an
earned badge (it's stamped, and `recomputeBadges` re-evaluates against the
current unit's threshold).

**Showing up**
| id | Name | Condition |
|---|---|---|
| `first_rep` | First Rep | 1 session |
| `ten_deep` | Ten Deep | 10 sessions |
| `half_century` | Half Century | 50 sessions |
| `century` | Century | 100 sessions |
| `perfect_week` | Perfect Week | a week with `sessions ≥ max(1, CFG.freq − restDaysInWeek(wk))` |

**Staying with it**
| id | Name | Condition |
|---|---|---|
| `chain_four` | Chain of Four | `streakEndingAt ≥ 4` |
| `twelve_weeks` | Twelve Weeks | `streakEndingAt ≥ 12` |
| `back_on_track` | Back on Track | a session ≥ 14 days after the previous one |

**Getting stronger**
| id | Name | Condition |
|---|---|---|
| `first_flag` | First Flag | 1 PR event |
| `ten_flags` | Ten Flags | 10 PR events |
| `bodyweight_club` | Bodyweight Club | PR ≥ body weight on Barbell back squat, Flat barbell bench press or Barbell deadlift |
| `double_bodyweight` | Double Bodyweight | PR ≥ 2× body weight on Barbell back squat or Barbell deadlift |

**Putting in work**
| id | Name | Condition |
|---|---|---|
| `ten_tonne` | Ten Tonne | one session ≥ 10,000 kg / 22,000 lb |
| `million_club` | Million Club | lifetime volume ≥ 1,000,000 kg / 2,200,000 lb |

**Covering ground**
| id | Name | Condition |
|---|---|---|
| `all_rounder` | All-Rounder | one week covering chest, back, shoulders, quads, hamstrings and (biceps or triceps) via `EXPOOL[name].mg` |
| `explorer_25` | Twenty-Five Ways | 25 distinct exercises logged |

A **PR event** is one set that beats the stored record for its exercise — so
beating your bench three times over three months is three events, and the two
flag badges measure how often you've moved a number, not how many lifts you
happen to track. `all_rounder` and `perfect_week` are evaluated per calendar
week as keyed by `weekStartDk(dk)` (Monday-based, matching `streak()`).

The two bodyweight badges stay locked while `ST.bw` is empty, and their detail
sheet says "log a weigh-in to unlock this" rather than reading as unreachable.

## Art

One `BADGE_SVG` map, `id → SVG string`, 64×64 viewBox, drawn with three CSS
custom properties so a single drawing serves both states:

```css
.bdg      { --fg:var(--accent); --ink:var(--accent-ink); --line:var(--accent); }
.bdg.lock { --fg:none;          --ink:var(--lock-fg);    --line:var(--lock-line); }
```

Every badge is a hexagon (`fill:var(--fg)`, `stroke:var(--line)`) with its glyph
in `var(--ink)`. Earned = solid lime with a near-black glyph; locked = hairline
outline with a grey glyph. Two new tokens, `--lock-fg` / `--lock-line`, join the
existing Kinetic set.

Inline SVG, not PNG: ~6 KB total instead of sixteen files, no `EX_IMAGE_URLS`
entry in `sw.js`, crisp at any size, and no second artwork set for locked. The
`images/exercises/` PNG convention doesn't apply — those are photographs.

Glyph inventory (already drawn in the review artifact): dumbbell, ascending
bars, `10` / `50` / `100` / `12` / `1M` numerals in Space Mono, check mark,
return arrow, one flag, three flags, barbell + `1×`, barbell + `2×`, plate
stack, spoked hexagon, compass rose.

## UI

**PRs tab** (`#p-pr`, `index.html:526`) gains a badge section above the existing
`<h2>All-time personal records</h2>`: a heading, an "N of 16 earned" count, and
a four-column grid of all sixteen badges, earned first then locked. Rendered by
`renderBadges()`, called from `stab('pr')` alongside `renderPRs()`.

**Badge detail** — tapping any badge opens a bottom sheet with its name, what it
takes, and either the earned date or the locked hint. Reuse the existing
`#whatsnew-sheet` pattern (overlay + sheet + `body.overflow`), not a new
component.

**Workout summary** (`#s-sum`) gains `<div id="su-badges">` between `#su-pr` and
`#su-feel-tag`. In `submitFeel()` (`index.html:10905`), snapshot the earned ids,
push the record, `recomputeBadges()`, then diff — each newly earned badge
renders as its own card (badge + "Badge unlocked" + name). No modal, no
confetti; the summary already celebrates.

**Share card** — `shareSessionCard()` gets a text stamp row for newly earned
badges, matching how `newPRs` are already drawn. Text only: rasterising SVG onto
the canvas isn't worth the complexity.

> Noted, out of scope: `shareSessionCard()` still draws a light card
> (`#F7F4EC` ground, `#4F7D16` green) left over from the pre-Kinetic palette. It
> should be reskinned, but as its own change, not smuggled into this one.

**First run after upgrade.** Backfill unlocks a batch at once. Those must not
appear as workout unlocks — they won't, since the backfill happens during
`load()` and the summary only diffs around `submitFeel()`. The PRs tab shows a
one-time line ("Your badge case is open — N badges earned from your history"),
dismissed via a new `CFG.badgesIntroSeen`.

## i18n

Sixteen names + sixteen condition strings + the section headings, in all three
languages (`STRINGS.en` is the source of truth; `ja` and `ko` mirror its keys).
Keys: `bdg_<id>_name`, `bdg_<id>_cond`, plus `badges_title`, `badges_count`,
`badge_unlocked`, `badge_earned_on`, `badge_locked_hint_bw`.

## Testing

Extend `scripts/test_units.mjs` — `recomputeBadges()` is pure over
`ST.history` / `ST.bw` / `CFG`, so it tests exactly like `recomputePRs()`:

- a seeded history earns precisely the expected id set, and nothing more
- earned `dk` is the date the condition was *first* met, not the last session
- deleting the qualifying session revokes the badge (the derived-cache invariant)
- `perfect_week` respects `CFG.freq` and marked rest days
- `back_on_track` fires at a 14-day gap and not at 13
- `ten_tonne` uses the kg threshold under `CFG.unit='kg'` and the lb threshold
  under `'lbs'`
- `streakEndingAt` returns the same value as `streak()` when asked about the
  current week (proves the refactor didn't change behavior)
- bodyweight badges stay locked with an empty `ST.bw`

Plus `npm run lint`, `npm run visual-check`, and a throwaway Playwright pass
screenshotting the PRs tab (mixed earned/locked) and a summary screen with two
unlocks.

## Release chores

`APP_VERSION` → `2.1.0`; `WHATS_NEW_VERSION` → `2.1.0` with rewritten
`WHATS_NEW_ITEMS` in all three languages (this is a feature release, so the
constant moves — see `CLAUDE.md`); `CACHE_NAME` → `gainpath-v26`; a
`CHANGELOG.md` entry; a README `## ✨ What's new in v2.1.0` section, folding the
v2.0.1 Design bullets per the one-section-at-a-time rule; regenerate the PRs-tab
screenshot under `images/screenshots/`.

No tutorial step. The tutorial covers things that need explaining before you can
use them; a badge grid where tapping any tile explains itself doesn't qualify.
`CLAUDE.md` gets a short "badges are derived like PRs" note under the data-model
section.

## Out of scope

Social sharing of the badge case, notifications for near-miss badges, custom or
user-defined badges, badge tiers beyond the sixteen listed, and any change that
makes a badge affect training suggestions. Badges observe; they never
autoregulate.
