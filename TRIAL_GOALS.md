# Trial Goals

GainPath is running as a free trial to gauge demand before investing in a
paid native iOS build. These are the numbers that define "the trial
validated demand." They're seeded with moderate, realistic starting
benchmarks — **edit them to match your actual bar**, this file is meant to be
adjusted, not treated as fixed.

Current numbers are checked against the anonymous, aggregate-only analytics
described in `CHANGELOG.md` (see the analytics-worker `/stats` endpoint —
`GET https://<your-worker>.workers.dev/stats?key=<your secret>` returns
session counts, 7-day/30-day retention, per-event counts, and lead count as
JSON).

## The bar

| # | Metric | Target | What it means |
|---|--------|--------|----------------|
| 1 | **30-day retention proxy** | ≥15% of anonymous first-use IDs still show at least one tracked event 30 days after first use | People are coming back on their own, not just trying it once |
| 2 | **Second-workout rate** | ≥35% of first-time anonymous IDs log a second workout within 14 days of their first | The core loop (log a workout, come back and log another) is sticky |
| 3 | **PDF engagement** | ≥15 PDF reports generated per month, once there's a baseline of active monthly users | People care enough about their data to want a record of it — a proxy for "this is worth paying to keep" |

## Reading the numbers

- Pull current figures from the Worker's `/stats` endpoint (see
  `analytics-worker/README.md` for setup) — it returns the raw counts needed
  to compute all three metrics above.
- These are trial-validation thresholds, not vanity metrics — the bar is
  "would a real chunk of these free users pay for a native app," not
  "is anyone using this at all."
- Revisit this file once there's a few months of real data. The initial
  numbers here are a starting guess, not a claim that they're the right bar.
