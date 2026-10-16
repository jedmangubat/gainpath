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
curl -H "Authorization: Bearer <your STATS_SECRET>" "https://<your-worker-url>/stats"
```

The secret goes in a header so it doesn't land in URLs or request logs. A
`?key=` query is not accepted (401). Keep the secret out of logs and chat; never
paste it into a test.

Returns JSON: total users, 30-day retention, second-workout-within-14-days
rate, lifetime per-event counts, this month's PDF report count, and total
email signups. Compare against the bar in `../TRIAL_GOALS.md`.

## Endpoints

| Method | Path | Body | Purpose |
|---|---|---|---|
| POST | `/e` | `{ "id": "<anon id>", "event": "<event name>" }` | Fire-and-forget usage beacon |
| POST | `/lead` | `{ "email": "<email>" }` | Optional launch-notification signup |
| GET | `/stats` with `Authorization: Bearer <STATS_SECRET>` | — | Aggregate dashboard JSON |

`/e` and `/lead` refuse (403) any request whose `Origin` isn't
`https://jedmangubat.github.io` (GainPath's GitHub Pages origin), and CORS is
locked to it. That keeps other websites and local test runs out of the
counters, but it is **not authentication**: a script can send any Origin header.
Bodies over 2,000 bytes are refused (413) without being read whole. If GainPath
ever moves to a custom domain, update `ALLOWED_ORIGIN` in `src/index.js` and
redeploy.

### Accuracy and abuse limits

- Per-person records are read, changed and written back, so two overlapping
  requests carrying the same random ID can lose one update. Totals are
  approximate; this is rare in practice. PDF reports are counted one key per
  report (listed at read time) and don't have this problem.
- This is KV-only, and the free tier allows 1,000 KV writes per day, so noise
  can use the day's writes up. `wrangler.toml` enables the Workers Rate Limiting
  binding (30 per minute per IP, per location, approximate); the worker skips it
  if the binding is absent. If `npm run deploy` rejects the block, your plan may
  not offer it: comment it out and redeploy.
- `/stats` lists every user record, which is fine at trial scale and should be
  revisited (a rolling aggregate) before it grows.

### Deleting records

`../privacy.html` says records are kept until deleted, so nothing expires on
its own. To delete one person's record (they send you the ID from Settings →
Privacy):

```
npx wrangler kv key delete --binding EVENTS "user:<id>"
```

To delete an email address, find its `lead:` key with
`npx wrangler kv key list --binding LEADS` and delete that key with
`npx wrangler kv key delete --binding LEADS "<key>"`.

## Tests

```
npm test
```

Runs against an in-memory KV with synthetic data. It never contacts Cloudflare
or the live worker.

## Cost

Cloudflare Workers' free tier covers 100,000 requests/day and 1,000 KV
writes/day — comfortably enough for a free trial. Each tracked event costs
one KV write (two for `pdf_generated`, which also bumps a monthly counter).
If usage outgrows the free tier, Cloudflare's Workers Paid plan is $5/month.
