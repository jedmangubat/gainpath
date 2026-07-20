# GainPath Analytics Worker

A small Cloudflare Worker that gives GainPath privacy-first, aggregate-only
usage analytics and an optional "notify me when the app ships" email capture
— without accounts, without a third-party analytics service, and without any
personally identifying data beyond a client-generated anonymous ID.

Nothing here ships in `index.html` — this is infra, deployed separately, the
same way the repo's dev-only `package.json` never touches the app itself.

## What it tracks

Six events, sent from the app tagged with `gp_anon_id` (a random ID stored
in the browser's localStorage, never tied to a real identity):

- `session_start`
- `workout_complete`
- `pr_hit`
- `pdf_generated`
- `data_exported`
- `program_saved`

Plus an optional email address if someone opts into the "notify me" prompt
in Settings — stored separately from event data, never linked back to a
specific device or session.

## One-time setup

1. Install dependencies:
   ```
   cd analytics-worker
   npm install
   ```
2. Log into Cloudflare (opens a browser):
   ```
   npx wrangler login
   ```
3. Create the two KV namespaces:
   ```
   npx wrangler kv namespace create EVENTS
   npx wrangler kv namespace create LEADS
   ```
   Each command prints an `id`. Paste both into `wrangler.toml`, replacing
   `REPLACE_WITH_EVENTS_NAMESPACE_ID` / `REPLACE_WITH_LEADS_NAMESPACE_ID`.
4. Set the stats-dashboard secret (any long random string — this gates the
   `/stats` endpoint; keep it private, it must never be committed):
   ```
   npx wrangler secret put STATS_SECRET
   ```
5. Deploy:
   ```
   npm run deploy
   ```
   Wrangler prints the live URL, e.g.
   `https://gainpath-analytics.<your-subdomain>.workers.dev`. That's the
   endpoint the app's `track()` helper posts to.

## Checking your numbers

```
curl "https://<your-worker-url>/stats?key=<your STATS_SECRET>"
```

Returns JSON: total users, 30-day retention, second-workout-within-14-days
rate, lifetime per-event counts, this month's PDF report count, and total
email signups. Compare against the bar in `../TRIAL_GOALS.md`.

## Endpoints

| Method | Path | Body | Purpose |
|---|---|---|---|
| POST | `/e` | `{ "id": "<anon id>", "event": "<event name>" }` | Fire-and-forget usage beacon |
| POST | `/lead` | `{ "email": "<email>" }` | Optional launch-notification signup |
| GET | `/stats?key=<STATS_SECRET>` | — | Aggregate dashboard JSON |

CORS on `/e` and `/lead` is locked to `https://jedmangubat.github.io`
(GainPath's GitHub Pages origin). If GainPath ever moves to a custom domain,
update `ALLOWED_ORIGIN` in `src/index.js` and redeploy.

## Cost

Cloudflare Workers' free tier covers 100,000 requests/day and 1,000 KV
writes/day — comfortably enough for a free trial. Each tracked event costs
one KV write (two for `pdf_generated`, which also bumps a monthly counter).
If usage outgrows the free tier, Cloudflare's Workers Paid plan is $5/month.
