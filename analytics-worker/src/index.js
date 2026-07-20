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

async function readJsonBody(request) {
  const text = await request.text();
  if (!text || text.length > 2000) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
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
  const body = await readJsonBody(request);
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
  // total in /stats, aggregated from user records at read time.
  if (body.event === 'pdf_generated') {
    const monthCountKey = `count:pdf_generated:${monthKey(now)}`;
    const current = await env.EVENTS.get(monthCountKey);
    await env.EVENTS.put(monthCountKey, String((current ? parseInt(current, 10) : 0) + 1));
  }

  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

async function handleLead(request, env, origin) {
  const body = await readJsonBody(request);
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

async function handleStats(request, env) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!env.STATS_SECRET || key !== env.STATS_SECRET) {
    return new Response('unauthorized', { status: 401 });
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
  const pdfReportsThisMonth = pdfThisMonthRaw ? parseInt(pdfThisMonthRaw, 10) : 0;

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
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
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
