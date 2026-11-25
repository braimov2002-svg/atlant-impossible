import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getPlatformProxy } from 'wrangler';
import app from '../src/server/index';

const root = fileURLToPath(new URL('..', import.meta.url));
let env: { DB: D1Database };
let stop: () => Promise<void>;

/** A signed-in browser: remembers its cookie between calls. */
function client() {
  let cookie = '';
  return async (method: string, path: string, body?: unknown) => {
    const res = await app.request(
      `http://test/api${path}`,
      {
        method,
        headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) },
        body: body === undefined ? undefined : JSON.stringify(body),
      },
      env,
    );
    const set = res.headers.get('set-cookie');
    if (set) cookie = set.split(';')[0];
    return { status: res.status, body: (await res.json()) as any };
  };
}

const admin = client();
const warehouse = client();
const supply = client();
const boss = client();

beforeAll(async () => {
  const proxy = await getPlatformProxy<{ DB: D1Database }>({
    configPath: `${root}wrangler.jsonc`,
    persist: false,
  });
  env = proxy.env;
  stop = proxy.dispose;
  const sql = readFileSync(`${root}migrations/0001_init.sql`, 'utf8').replace(/^\s*--.*$/gm, '');
  for (const stmt of sql.split(';').map((s) => s.trim()).filter(Boolean)) await env.DB.prepare(stmt).run();
}, 60_000);

afterAll(() => stop?.());

describe('sign-in and users', () => {
  it('lets the first visitor create the administrator, once', async () => {
    expect((await client()('GET', '/auth/state')).body).toEqual({ needsSetup: true, user: null });
    expect((await admin('POST', '/auth/setup', { login: 'admin', name: 'Админ', password: 'secret1' })).status).toBe(200);
    expect((await client()('POST', '/auth/setup', { login: 'x', name: 'X', password: 'secret1' })).status).toBe(409);
    const state = await admin('GET', '/auth/state');
    expect(state.body.user).toMatchObject({ login: 'admin', role: 'admin' });
    expect(state.body.needsSetup).toBe(false);
  });

  it('rejects calls without a session', async () => {
    expect((await client()('GET', '/requests')).status).toBe(401);
  });

  it('creates users and signs them in; a wrong password is refused', async () => {
    for (const [c, login, role] of [[warehouse, 'ombor', 'warehouse'], [supply, 'snab', 'supply'], [boss, 'rahbar', 'boss']] as const) {
      expect((await admin('POST', '/users', { login, name: login, role, password: 'parol123' })).status).toBe(200);
      expect((await c('POST', '/auth/login', { login, password: 'wrong' })).status).toBe(401);
      expect((await c('POST', '/auth/login', { login: login.toUpperCase(), password: 'parol123' })).status).toBe(200);
    }
    expect((await admin('POST', '/users', { login: 'OMBOR', name: 'again', role: 'boss', password: 'parol123' })).status).toBe(409);
    expect((await boss('POST', '/objects', { name: 'Кучлик' })).status).toBe(200);
    expect((await boss('POST', '/objects', { name: 'КУЧЛИК' })).status).toBe(409); // Cyrillic case too
  });

  it('keeps user management to administrators', async () => {
    expect((await warehouse('POST', '/users', { login: 'z', name: 'z', role: 'admin', password: 'parol123' })).status).toBe(403);
    expect((await boss('GET', '/users')).status).toBe(403);
  });

  it('locks a login after five wrong passwords', async () => {
    await admin('POST', '/users', { login: 'lock', name: 'lock', role: 'supply', password: 'parol123' });
    const c = client();
    for (let i = 0; i < 5; i++) expect((await c('POST', '/auth/login', { login: 'lock', password: 'no' })).status).toBe(401);
    expect((await c('POST', '/auth/login', { login: 'lock', password: 'parol123' })).status).toBe(429);
  });

  it('ends the sessions of a disabled user', async () => {
    await admin('POST', '/users', { login: 'temp', name: 'temp', role: 'supply', password: 'parol123' });
    const c = client();
    await c('POST', '/auth/login', { login: 'temp', password: 'parol123' });
    expect((await c('GET', '/requests')).status).toBe(200);
    const id = (await admin('GET', '/users')).body.find((u: any) => u.login === 'temp').id;
    await admin('PUT', `/users/${id}`, { name: 'temp', role: 'supply', active: false });
    expect((await c('GET', '/requests')).status).toBe(401);
    expect((await c('POST', '/auth/login', { login: 'temp', password: 'parol123' })).status).toBe(401);
  });

  it('does not let an administrator lock themselves out', async () => {
    const me = (await admin('GET', '/auth/state')).body.user;
    expect((await admin('PUT', `/users/${me.id}`, { name: 'A', role: 'boss', active: true })).status).toBe(400);
  });
});

describe('request → payment → receipt', () => {
  let objectId: number;
  let requestId: number;
  let items: any[];
  let paymentId: number;

  it('numbers requests per object prefix and month', async () => {
    objectId = (await boss('POST', '/objects', { name: 'Балтон', prefix: 'АС' })).body.id;
    const body = {
      date: '2026-11-24', object_id: objectId,
      items: [{ name: 'Бетон М300', unit: 'м3', qty: 18, place: '2-блок' }, { name: 'Арматура Д 12', unit: 'т.н', qty: 10 }],
    };
    const a = await warehouse('POST', '/requests', body);
    const b = await supply('POST', '/requests', body);
    expect(a.body.number).toBe('АС-001-11-2026');
    expect(b.body.number).toBe('АС-002-11-2026');
    expect((await warehouse('POST', '/requests', { ...body, date: '2026-12-01' })).body.number).toBe('АС-001-12-2026');
    requestId = a.body.id;
    expect((await boss('POST', '/requests', body)).status).toBe(403);
    expect((await warehouse('POST', '/requests', { ...body, items: [] })).status).toBe(400);
  });

  it('shows the request with nothing received yet', async () => {
    const d = (await boss('GET', `/requests/${requestId}`)).body;
    expect(d).toMatchObject({ number: 'АС-001-11-2026', object: 'Балтон', status: 'open', item_count: 2 });
    items = d.items;
    expect(items.map((i) => i.received)).toEqual([0, 0]);
  });

  it('lets only supply ask for a payment and only the boss approve it', async () => {
    const pay = { request_id: requestId, supplier: 'METALL SAVDO', amount: 90_000_000 };
    expect((await warehouse('POST', '/payments', pay)).status).toBe(403);
    expect((await supply('POST', '/payments', { ...pay, amount: 0 })).status).toBe(400);
    paymentId = (await supply('POST', '/payments', pay)).body.id;
    expect((await supply('POST', `/payments/${paymentId}/decide`, { approve: true })).status).toBe(403);
    expect((await supply('POST', `/payments/${paymentId}/paid`)).status).toBe(409); // not approved yet
    expect((await boss('POST', `/payments/${paymentId}/decide`, { approve: true })).status).toBe(200);
    expect((await boss('POST', `/payments/${paymentId}/decide`, { approve: false })).status).toBe(409); // once only
    expect((await boss('GET', `/requests/${requestId}`)).body.status).toBe('approved');
    expect((await supply('POST', `/payments/${paymentId}/paid`)).status).toBe(200);
  });

  it('turns received goods into receipts and completes the request', async () => {
    const receive = (lines: any[]) =>
      warehouse('POST', `/requests/${requestId}/receive`, { date: '2026-11-25', supplier: 'METALL SAVDO', invoice_no: '1375', lines });
    expect((await supply('POST', `/requests/${requestId}/receive`, { date: '2026-11-25', lines: [] })).status).toBe(403);
    expect((await receive([{ item_id: items[0].id, qty: 0 }])).status).toBe(400);
    expect((await receive([{ item_id: items[0].id, qty: 10, price: 700_000 }])).status).toBe(200);
    let d = (await boss('GET', `/requests/${requestId}`)).body;
    expect(d.status).toBe('approved');
    expect(d.items[0].received).toBe(10);
    // The rest of the first item, and more than was asked of the second.
    await receive([{ item_id: items[0].id, qty: 8, price: 700_000 }, { item_id: items[1].id, qty: 12, price: 9_000_000 }]);
    d = (await boss('GET', `/requests/${requestId}`)).body;
    expect(d.status).toBe('received');
    expect(d.items.map((i: any) => i.received)).toEqual([18, 12]);
    const list = (await boss('GET', '/receipts?q=АС-001-11-2026')).body;
    expect(list.total).toBe(3);
    expect(list.sum).toBe(18 * 700_000 + 12 * 9_000_000);
    expect(list.rows[0]).toMatchObject({ object: 'Балтон', supplier: 'METALL SAVDO', invoice_no: '1375' });
  });

  it('refuses to drop a request line that already has receipts', async () => {
    const d = (await boss('GET', `/requests/${requestId}`)).body;
    const res = await warehouse('PUT', `/requests/${requestId}`, {
      number: d.number, date: d.date, object_id: d.object_id, items: [d.items[0]],
    });
    expect(res.status).toBe(409);
    expect((await warehouse('DELETE', `/requests/${requestId}`)).status).toBe(409);
  });

  it('lists requests by object and by search text', async () => {
    expect((await boss('GET', `/requests?object_id=${objectId}`)).body.total).toBe(3);
    expect((await boss('GET', '/requests?q=арматура&status=received')).body.rows.map((r: any) => r.number)).toEqual(['АС-001-11-2026']);
    expect((await boss('GET', '/requests?q=100%25')).body.total).toBe(0);
  });

  it('sums the period for management', async () => {
    const d = (await boss('GET', '/dashboard?from=2026-11-01&to=2026-11-30')).body;
    expect(d.receipts).toEqual({ sum: 18 * 700_000 + 12 * 9_000_000, count: 3, unpriced: 0 });
    expect(d.payments.pending.count).toBe(0);
    expect(d.objects[0]).toMatchObject({ name: 'Балтон', count: 3 });
    expect(d.badges.open_requests).toBe(2);
    expect((await boss('GET', '/dashboard?from=2025-01-01&to=2025-01-31')).body.receipts.count).toBe(0);
    const folders = (await boss('GET', '/objects')).body;
    expect(folders.find((o: any) => o.name === 'Балтон')).toMatchObject({ requests: 3, open_requests: 2, receipts: 3 });
  });

  it('keeps the receipts journal to the warehouse', async () => {
    const row = { date: '2026-11-25', name: 'Гвоздь 80', unit: 'кг', qty: 20, price: 11000.64, supplier: 'MIX SAVDO' };
    expect((await supply('POST', '/receipts', row)).status).toBe(403);
    expect((await warehouse('POST', '/receipts', { ...row, qty: -1 })).status).toBe(400);
    const id = (await warehouse('POST', '/receipts', row)).body.id;
    expect((await warehouse('PUT', `/receipts/${id}`, { ...row, qty: 25, price: '' })).status).toBe(200);
    const got = (await boss('GET', '/receipts?q=ГВОЗДЬ')).body.rows[0];
    expect(got).toMatchObject({ qty: 25, price: null });
    expect((await boss('GET', '/names?q=гвоз')).body).toEqual([{ name: 'Гвоздь 80', unit: 'кг' }]);
    expect((await warehouse('DELETE', `/receipts/${id}`)).status).toBe(200);
  });
});

describe('Excel import', () => {
  const requests = [{
    number: 'SHERON 004', date: '2026-01-10', object: 'Шерон',
    items: [{ name: 'Фанера 18 мм', unit: 'шт', qty: 50 }, { name: 'Гвоздь 100', unit: 'кг', qty: 20 }],
  }];
  const rows = [
    { import_key: 'k1', date: '2026-01-10', code: 'SHERON 004', object: 'Шерон', name: 'Фанера 18 мм', unit: 'шт', qty: 50, price: 302500, supplier: 'YOGOCH SAVDO' },
    { import_key: 'k2', date: '2026-01-11', code: 'SHERON 004', object: 'Шерон', name: 'Гвоздь 100', unit: 'кг', qty: 20, price: null, supplier: '' },
    { import_key: 'k3', date: '2026-01-12', code: 'Лукоил', object: 'Лукоил', name: 'Леска', unit: 'шт', qty: 100, price: null },
  ];

  it('is for administrators only', async () => {
    expect((await boss('POST', '/import/receipts', { rows })).status).toBe(403);
  });

  it('loads objects, requests and receipts, and links them', async () => {
    await admin('POST', '/import/objects', { objects: [{ name: 'Шерон', prefix: 'SHERON' }, { name: 'Лукоил' }] });
    expect((await admin('POST', '/import/requests', { requests })).body.created).toBe(1);
    expect((await admin('POST', '/import/receipts', { rows })).body.created).toBe(3);
    await admin('POST', '/import/finish');
    const folders = (await boss('GET', '/objects')).body;
    const sheron = folders.find((o: any) => o.name === 'Шерон');
    expect(sheron).toMatchObject({ prefix: 'SHERON', requests: 1, open_requests: 0, receipts: 2, sum: 50 * 302500 });
    const list = (await boss('GET', `/requests?object_id=${sheron.id}`)).body.rows;
    expect(list[0]).toMatchObject({ number: 'SHERON 004', status: 'received', item_count: 2 });
    expect((await boss('GET', `/requests/${list[0].id}`)).body.items.map((i: any) => i.received)).toEqual([50, 20]);
  });

  it('merges two spellings of one object', async () => {
    const folders = (await boss('GET', '/objects')).body;
    const from = folders.find((o: any) => o.name === 'Лукоил');
    const into = folders.find((o: any) => o.name === 'Шерон');
    expect((await supply('POST', `/objects/${from.id}/merge`, { into: into.id })).status).toBe(403);
    expect((await boss('POST', `/objects/${from.id}/merge`, { into: from.id })).status).toBe(400);
    expect((await boss('POST', `/objects/${from.id}/merge`, { into: into.id })).status).toBe(200);
    const after = (await boss('GET', '/objects')).body;
    expect(after.find((o: any) => o.name === 'Лукоил')).toBeUndefined();
    expect(after.find((o: any) => o.name === 'Шерон').receipts).toBe(3);
  });

  it('adds nothing when the same file is loaded again', async () => {
    expect((await admin('POST', '/import/requests', { requests })).body.created).toBe(0);
    expect((await admin('POST', '/import/receipts', { rows })).body.created).toBe(0);
    expect((await boss('GET', '/receipts?q=sheron')).body.total).toBe(2);
  });

  it('leaves requests made in the app alone when finishing an import', async () => {
    await admin('POST', '/import/finish');
    expect((await boss('GET', '/requests?status=approved')).body.total).toBe(0);
    expect((await boss('GET', '/requests?status=open')).body.total).toBe(2);
  });
});
