// Worker tests: an in-memory KV and plain Request objects, no network, no
// Cloudflare account, no production data. Run: npm test (from analytics-worker/).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

const ORIGIN = 'https://jedmangubat.github.io';

// Minimal KV. `delay` makes every operation yield, so overlapping requests
// interleave the way they do on the real platform.
function fakeKV(delay = false) {
  const m = new Map(); const tick = () => (delay ? new Promise((r) => setTimeout(r, 1)) : null);
  return {
    m,
    async get(k) { await tick(); return m.has(k) ? m.get(k) : null; },
    async put(k, v) { await tick(); m.set(k, String(v)); },
    async list({ prefix = '', limit = 1000, cursor } = {}) {
      await tick(); const all = [...m.keys()].filter((k) => k.startsWith(prefix)).sort();
      const start = cursor ? Number(cursor) : 0; const page = all.slice(start, start + limit);
      const done = start + limit >= all.length;
      return { keys: page.map((name) => ({ name })), list_complete: done, cursor: done ? undefined : String(start + limit) };
    },
  };
}
const mkEnv = (extra = {}) => ({ EVENTS: fakeKV(), LEADS: fakeKV(), STATS_SECRET: 'test-secret-not-real', ...extra });
const post = (path, body, { origin = ORIGIN, headers = {} } = {}) =>
  new Request('https://w.test' + path, { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body), headers: { ...(origin ? { Origin: origin } : {}), ...headers } });
const ev = (id, event = 'session_start') => ({ id, event });
const ID = 'abcdef0123456789';

test('a valid event from the app origin is stored and counted', async () => {
  const env = mkEnv();
  const r = await worker.fetch(post('/e', ev(ID)), env);
  assert.equal(r.status, 204);
  assert.equal(r.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  const rec = JSON.parse(env.EVENTS.m.get('user:' + ID));
  assert.equal(rec.c.session_start, 1);
});

test('invalid ids and unknown events are rejected without writing', async () => {
  const env = mkEnv();
  for (const body of [ev('short'), ev(ID, 'nope'), { id: 5, event: 'session_start' }, '{not json', '']) {
    const r = await worker.fetch(post('/e', body), env);
    assert.equal(r.status, 400);
  }
  assert.equal(env.EVENTS.m.size, 0);
});

test('requests from another origin, or none, are refused and write nothing', async () => {
  const env = mkEnv();
  for (const origin of ['https://evil.example', 'http://localhost:8746', null]) {
    const r = await worker.fetch(post('/e', ev(ID), { origin }), env);
    assert.equal(r.status, 403, String(origin));
    const l = await worker.fetch(post('/lead', { email: 'a@b.co' }, { origin }), env);
    assert.equal(l.status, 403, String(origin));
  }
  assert.equal(env.EVENTS.m.size + env.LEADS.m.size, 0);
});

test('oversized bodies are refused by header and by streamed size', async () => {
  const env = mkEnv();
  const big = JSON.stringify({ id: ID, event: 'session_start', pad: 'x'.repeat(5000) });
  const byHeader = await worker.fetch(post('/e', big, { headers: { 'Content-Length': String(big.length) } }), env);
  assert.equal(byHeader.status, 413);
  // No Content-Length: a chunked body is cut off after the limit, not read whole.
  let pulled = 0;
  const stream = new ReadableStream({ pull(c) { pulled += 1000; c.enqueue(new TextEncoder().encode('x'.repeat(1000))); if (pulled >= 200000) c.close(); } });
  const req = new Request('https://w.test/e', { method: 'POST', body: stream, duplex: 'half', headers: { Origin: ORIGIN } });
  const r = await worker.fetch(req, env);
  assert.equal(r.status, 413);
  assert.ok(pulled < 20000, 'read ' + pulled + ' bytes');
  assert.equal(env.EVENTS.m.size, 0);
});

test('concurrent PDF events from different people are all counted', async () => {
  const env = mkEnv({ EVENTS: fakeKV(true) });
  const n = 25;
  const rs = await Promise.all(Array.from({ length: n }, (_, i) => worker.fetch(post('/e', ev('user' + String(i).padStart(6, '0') + 'xx', 'pdf_generated')), env)));
  assert.ok(rs.every((r) => r.status === 204));
  const s = await worker.fetch(new Request('https://w.test/stats', { headers: { Authorization: 'Bearer test-secret-not-real' } }), env);
  assert.equal((await s.json()).pdfReportsThisMonth, n);
});

test('stats: no credential, a wrong one, or an unset secret is unauthorized', async () => {
  const env = mkEnv();
  const get = (h, q = '', e = env) => worker.fetch(new Request('https://w.test/stats' + q, { headers: h }), e);
  assert.equal((await get({})).status, 401);
  assert.equal((await get({ Authorization: 'Bearer wrong' })).status, 401);
  assert.equal((await get({ Authorization: 'Bearer test-secret-not-real' }, '', { ...env, STATS_SECRET: undefined })).status, 401);
  assert.equal((await get({ Authorization: 'Bearer ' })).status, 401);
});

test('stats: the header works, is not browser-readable, and is not cached', async () => {
  const env = mkEnv();
  await worker.fetch(post('/e', ev(ID)), env);
  const r = await worker.fetch(new Request('https://w.test/stats', { headers: { Authorization: 'Bearer test-secret-not-real' } }), env);
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('Access-Control-Allow-Origin'), null);
  assert.match(r.headers.get('Cache-Control') || '', /no-store/);
  assert.equal((await r.json()).totalUsers, 1);
});

test('stats: a secret in the URL is not accepted', async () => {
  const env = mkEnv();
  const r = await worker.fetch(new Request('https://w.test/stats?key=test-secret-not-real'), env);
  assert.equal(r.status, 401);
});

test('stats include the old monthly counter as well as new ones', async () => {
  const env = mkEnv(); const d = new Date();
  env.EVENTS.m.set(`count:pdf_generated:${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`, '7');
  await worker.fetch(post('/e', ev(ID, 'pdf_generated')), env);
  const r = await worker.fetch(new Request('https://w.test/stats', { headers: { Authorization: 'Bearer test-secret-not-real' } }), env);
  assert.equal((await r.json()).pdfReportsThisMonth, 8);
});

test('a rate-limit binding that says no returns 429 and writes nothing; none configured means no limit', async () => {
  const denied = mkEnv({ RATE_LIMIT: { limit: async () => ({ success: false }) } });
  const r = await worker.fetch(post('/e', ev(ID)), denied);
  assert.equal(r.status, 429);
  assert.equal(denied.EVENTS.m.size, 0);
  const keys = [];
  const allowed = mkEnv({ RATE_LIMIT: { limit: async ({ key }) => { keys.push(key); return { success: true }; } } });
  assert.equal((await worker.fetch(post('/e', ev(ID), { headers: { 'CF-Connecting-IP': '203.0.113.9' } }), allowed)).status, 204);
  assert.deepEqual(keys, ['203.0.113.9']);
  assert.equal((await worker.fetch(post('/e', ev(ID)), mkEnv())).status, 204);
});

test('leads: a valid address is stored separately; bad ones are refused', async () => {
  const env = mkEnv();
  assert.equal((await worker.fetch(post('/lead', { email: 'person@example.com' }), env)).status, 204);
  assert.equal(env.LEADS.m.size, 1);
  assert.equal((await worker.fetch(post('/lead', { email: 'not-an-email' }), env)).status, 400);
  assert.equal(env.EVENTS.m.size, 0);
});

test('preflight answers for the app origin only and unknown routes are 404', async () => {
  const env = mkEnv();
  const ok = await worker.fetch(new Request('https://w.test/e', { method: 'OPTIONS', headers: { Origin: ORIGIN } }), env);
  assert.equal(ok.status, 204); assert.equal(ok.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  const no = await worker.fetch(new Request('https://w.test/e', { method: 'OPTIONS', headers: { Origin: 'https://evil.example' } }), env);
  assert.equal(no.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal((await worker.fetch(new Request('https://w.test/nope'), env)).status, 404);
});
