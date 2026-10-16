const ALLOWED_EVENTS = new Set([
  'session_start',
  'workout_complete',
  'pr_hit',
  'pdf_generated',
  'data_exported',
  'program_saved',
]);

const ALLOWED_ORIGIN = 'https://jedmangubat.github.io';
const DAY_MS = 24 * 60 * 60 * 1000;

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (origin === ALLOWED_ORIGIN) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function monthKey(ts) {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function isValidAnonId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{8,64}$/.test(id);
}

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const MAX_BODY = 2000;

// Reads at most MAX_BODY bytes. A larger declared length is refused up front,
// and a body without one (chunked) is cut off as soon as it passes the limit,
// so an oversized upload is never read whole. Returns {tooLarge} or {body}.
async function readJsonBody(request) {
  const declared = Number(request.headers.get('Content-Length'));
  if (declared > MAX_BODY) return { tooLarge: true };
  if (!request.body) return { body: null };
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) {
      reader.cancel().catch(() => {});
      return { tooLarge: true };
    }
    chunks.push(value);
  }
  if (!size) return { body: null };
  const bytes = new Uint8Array(size);
  let at = 0;
  for (const c of chunks) { bytes.set(c, at); at += c.byteLength; }
  try {
    return { body: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { body: null };
  }
}

// Origin is one layer, not authentication: a browser always sends it on a
// cross-origin POST and page scripts can't forge it, but curl can. It keeps
// other websites, localhost test runs and casual noise out of the counters.
function guard(request, origin) {
  if (origin !== ALLOWED_ORIGIN) return new Response('forbidden', { status: 403, headers: corsHeaders(origin) });
  return null;
}

// Optional Workers Rate Limiting binding (see wrangler.toml). Absent in tests
// and until it is configured, in which case nothing is limited.
async function limited(request, env, origin) {
  if (!env.RATE_LIMIT || typeof env.RATE_LIMIT.limit !== 'function') return null;
  const key = request.headers.get('CF-Connecting-IP') || 'unknown';
  try {
    const { success } = await env.RATE_LIMIT.limit({ key });
    if (!success) return new Response('slow down', { status: 429, headers: { ...corsHeaders(origin), 'Retry-After': '60' } });
  } catch {
    // A failing limiter must not take the counters down.
  }
  return null;
}

function emptyUser(now) {
  return {
    first: now,
    last: now,
    wc: [], // first two workout_complete timestamps, for the second-workout-within-14-days metric
    c: {
      session_start: 0,
      workout_complete: 0,
      pr_hit: 0,
      pdf_generated: 0,
      data_exported: 0,
      program_saved: 0,
    },
  };
}

async function handleEvent(request, env, origin) {
  const denied = guard(request, origin) || (await limited(request, env, origin));
  if (denied) return denied;
  const { body, tooLarge } = await readJsonBody(request);
  if (tooLarge) return new Response('too large', { status: 413, headers: corsHeaders(origin) });
  if (!body || !isValidAnonId(body.id) || !ALLOWED_EVENTS.has(body.event)) {
    return new Response('bad request', { status: 400, headers: corsHeaders(origin) });
  }
  const now = Date.now();
  const raw = await env.EVENTS.get(`user:${body.id}`);
  const rec = raw ? JSON.parse(raw) : emptyUser(now);
  rec.last = now;
  rec.c[body.event] = (rec.c[body.event] || 0) + 1;
  if (body.event === 'workout_complete' && rec.wc.length < 2) rec.wc.push(now);
  await env.EVENTS.put(`user:${body.id}`, JSON.stringify(rec));

  // Only pdf_generated needs a monthly breakdown (TRIAL_GOALS.md's "PDF
  // reports per month" bar) — every other event is reported as a lifetime
  // total in /stats, aggregated from user records at read time. Each PDF is its
  // own key, counted by listing at read time: a shared read-modify-write
  // counter loses updates when two requests overlap. (Older months used a
  // single `count:pdf_generated:<month>` key; /stats still adds it in.)
  if (body.event === 'pdf_generated') {
    await env.EVENTS.put(`pdf:${monthKey(now)}:${crypto.randomUUID()}`, '1');
  }

  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

async function handleLead(request, env, origin) {
  const denied = guard(request, origin) || (await limited(request, env, origin));
  if (denied) return denied;
  const { body, tooLarge } = await readJsonBody(request);
  if (tooLarge) return new Response('too large', { status: 413, headers: corsHeaders(origin) });
  if (!body || !isValidEmail(body.email)) {
    return new Response('bad request', { status: 400, headers: corsHeaders(origin) });
  }
  const now = Date.now();
  const key = `lead:${now}:${crypto.randomUUID()}`;
  await env.LEADS.put(key, JSON.stringify({ email: body.email, ts: now }));
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

async function listAllKeys(kv, prefix) {
  const keys = [];
  let cursor;
  do {
    const page = await kv.list({ prefix, cursor, limit: 1000 });
    keys.push(...page.keys);
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return keys;
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// The secret travels only in an Authorization header, which URLs, browser
// history and request logs don't record. A ?key= query is not accepted.
async function handleStats(request, env) {
  const bearer = /^Bearer (.+)$/.exec(request.headers.get('Authorization') || '');
  const key = bearer ? bearer[1] : null;
  if (!env.STATS_SECRET || !safeEqual(key, env.STATS_SECRET)) {
    return new Response('unauthorized', { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }

  const now = Date.now();
  const userKeys = await listAllKeys(env.EVENTS, 'user:');

  const users = [];
  const BATCH = 50;
  for (let i = 0; i < userKeys.length; i += BATCH) {
    const batch = userKeys.slice(i, i + BATCH);
    const values = await Promise.all(batch.map((k) => env.EVENTS.get(k.name)));
    for (const v of values) if (v) users.push(JSON.parse(v));
  }

  let eligible30d = 0;
  let retained30d = 0;
  let loggedFirstWorkout = 0;
  let secondWorkout14d = 0;
  const eventTotals = {
    session_start: 0,
    workout_complete: 0,
    pr_hit: 0,
    pdf_generated: 0,
    data_exported: 0,
    program_saved: 0,
  };

  for (const u of users) {
    if (now - u.first >= 30 * DAY_MS) {
      eligible30d++;
      if (u.last - u.first >= 30 * DAY_MS) retained30d++;
    }
    if (u.wc && u.wc.length >= 1) {
      loggedFirstWorkout++;
      if (u.wc.length >= 2 && u.wc[1] - u.wc[0] <= 14 * DAY_MS) secondWorkout14d++;
    }
    for (const k of Object.keys(eventTotals)) {
      eventTotals[k] += (u.c && u.c[k]) || 0;
    }
  }

  const currentMonth = monthKey(now);
  const pdfThisMonthRaw = await env.EVENTS.get(`count:pdf_generated:${currentMonth}`);
  const pdfReportsThisMonth = (pdfThisMonthRaw ? parseInt(pdfThisMonthRaw, 10) : 0) + (await listAllKeys(env.EVENTS, `pdf:${currentMonth}:`)).length;

  const leadKeys = await listAllKeys(env.LEADS, 'lead:');

  const stats = {
    generatedAt: new Date(now).toISOString(),
    totalUsers: users.length,
    retention30d: {
      eligible: eligible30d,
      retained: retained30d,
      pct: eligible30d ? +((retained30d / eligible30d) * 100).toFixed(1) : null,
    },
    secondWorkout14d: {
      loggedFirstWorkout,
      loggedSecond: secondWorkout14d,
      pct: loggedFirstWorkout ? +((secondWorkout14d / loggedFirstWorkout) * 100).toFixed(1) : null,
    },
    eventTotals,
    pdfReportsThisMonth,
    leadsTotal: leadKeys.length,
  };

  return new Response(JSON.stringify(stats, null, 2), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method === 'POST' && url.pathname === '/e') return handleEvent(request, env, origin);
    if (request.method === 'POST' && url.pathname === '/lead') return handleLead(request, env, origin);
    if (request.method === 'GET' && url.pathname === '/stats') return handleStats(request, env);

    return new Response('not found', { status: 404 });
  },
};
