import { Hono } from 'hono';
import type { Receipt } from '../../shared/types';
import { only } from '../auth';
import { all, bad, date, first, lc, like, need, num, refId, run, text, type Env } from '../db';
import { refreshStatus } from './requests';

const app = new Hono<Env>();

const SELECT = `SELECT x.id, x.date, x.code, x.object_id, o.name AS object, x.request_item_id, x.name, x.unit, x.qty, x.price,
            s.name AS supplier, x.buyer, x.contract_no, x.invoice_no, x.vehicle, x.vehicle_date, x.currency, x.note
       FROM receipts x LEFT JOIN objects o ON o.id = x.object_id LEFT JOIN suppliers s ON s.id = x.supplier_id`;
const one = (db: D1Database, id: number) => first<Receipt>(db, `${SELECT} WHERE x.id = ?`, id);

const TRACKED = ['date', 'code', 'object', 'name', 'unit', 'qty', 'price', 'supplier', 'buyer', 'contract_no', 'invoice_no',
  'vehicle', 'vehicle_date', 'note'] as const;

/** Writes a line to the corrections journal. */
async function record(db: D1Database, action: 'edit' | 'delete', before: Receipt, after: Receipt | null, reason: string, userId: number) {
  const changes: Record<string, [unknown, unknown]> = {};
  for (const f of TRACKED) {
    const a = before[f] ?? '';
    const b = after ? (after[f] ?? '') : '';
    if (after ? a !== b : a !== '') changes[f] = [before[f], after ? after[f] : null];
  }
  if (after && Object.keys(changes).length === 0) return; // saved without changing anything
  await run(
    db, 'INSERT INTO corrections (receipt_id, action, name, changes, reason, user_id) VALUES (?, ?, ?, ?, ?, ?)',
    before.id, action, before.name, JSON.stringify(changes), reason, userId,
  );
}

app.get('/', async (c) => {
  const q = text(c.req.query('q'), 80);
  const where = [`(?1 = '' OR x.search LIKE ?1 ESCAPE '\\')`];
  const p: (string | number)[] = [q ? like(q) : ''];
  const add = (sql: string, v: string | number) => { p.push(v); where.push(sql.replace('?', `?${p.length}`)); };
  if (c.req.query('object_id')) add('x.object_id = ?', Number(c.req.query('object_id')));
  if (c.req.query('supplier_id')) add('x.supplier_id = ?', Number(c.req.query('supplier_id')));
  // Rows that still need correcting.
  const missing = c.req.query('missing');
  if (missing === 'price') where.push('(x.price IS NULL OR x.price = 0)');
  if (missing === 'supplier') where.push('x.supplier_id IS NULL');
  if (missing === 'object') where.push('x.object_id IS NULL');
  if (c.req.query('from')) add('x.date >= ?', date(c.req.query('from'), 'from')!);
  if (c.req.query('to')) add('x.date <= ?', date(c.req.query('to'), 'to')!);
  // The Excel report asks for everything in the period at once.
  const limit = Math.min(Number(c.req.query('limit')) || 50, 20000);
  const offset = Math.max(Number(c.req.query('offset')) || 0, 0);
  const from = `FROM receipts x LEFT JOIN objects o ON o.id = x.object_id LEFT JOIN suppliers s ON s.id = x.supplier_id
               WHERE ${where.join(' AND ')}`;
  const rows = await all<Receipt>(
    c.env.DB,
    `SELECT x.id, x.date, x.code, x.object_id, o.name AS object, x.request_item_id, x.name, x.unit, x.qty, x.price,
            s.name AS supplier, x.buyer, x.contract_no, x.invoice_no, x.vehicle, x.vehicle_date, x.currency, x.note
       ${from} ORDER BY x.date DESC, x.id DESC LIMIT ${limit} OFFSET ${offset}`,
    ...p,
  );
  const tot = await first<{ n: number; sum: number }>(
    c.env.DB, `SELECT count(*) n, coalesce(sum(x.qty * x.price), 0) sum ${from}`, ...p,
  );
  return c.json({ rows, total: tot!.n, sum: tot!.sum });
});

async function parse(db: D1Database, b: any) {
  const qty = num(b.qty, 'qty')!;
  if (qty <= 0) bad('invalid:qty');
  return [
    lc(`${text(b.name, 300)} ${text(b.code, 60)} ${text(b.supplier, 200)}`),
    date(b.date, 'date')!, text(b.code, 60), b.object_id ? Number(b.object_id) : null, need(b.name, 'name', 300),
    text(b.unit, 30), qty, num(b.price, 'price', { optional: true }), await refId(db, 'suppliers', b.supplier),
    text(b.buyer, 100), text(b.contract_no, 100), text(b.invoice_no, 100), text(b.vehicle, 100),
    date(b.vehicle_date, 'vehicle_date', true), text(b.note, 300),
  ] as const;
}

app.post('/', only('warehouse'), async (c) => {
  const v = await parse(c.env.DB, await c.req.json());
  const res = await run(
    c.env.DB,
    `INSERT INTO receipts (search, date, code, object_id, name, unit, qty, price, supplier_id, buyer, contract_no,
                           invoice_no, vehicle, vehicle_date, note, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ...v, c.get('user').id,
  );
  return c.json({ id: res.meta.last_row_id });
});

const requestOf = async (db: D1Database, id: number) =>
  (await first<{ request_id: number | null }>(
    db, 'SELECT i.request_id FROM receipts x LEFT JOIN request_items i ON i.id = x.request_item_id WHERE x.id = ?', id,
  ))?.request_id;

app.put('/:id', only('warehouse'), async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const before = await one(c.env.DB, id);
  if (!before) return bad('not_found', 404);
  const v = await parse(c.env.DB, body);
  const res = await run(
    c.env.DB,
    `UPDATE receipts SET search = ?, date = ?, code = ?, object_id = ?, name = ?, unit = ?, qty = ?, price = ?, supplier_id = ?,
            buyer = ?, contract_no = ?, invoice_no = ?, vehicle = ?, vehicle_date = ?, note = ? WHERE id = ?`,
    ...v, id,
  );
  if (!res.meta.changes) bad('not_found', 404);
  await record(c.env.DB, 'edit', before, await one(c.env.DB, id), text(body.reason, 300), c.get('user').id);
  const requestId = await requestOf(c.env.DB, id);
  if (requestId) await refreshStatus(c.env.DB, requestId, true);
  return c.json({ ok: true });
});

app.delete('/:id', only('warehouse'), async (c) => {
  const id = Number(c.req.param('id'));
  const requestId = await requestOf(c.env.DB, id);
  const before = await one(c.env.DB, id);
  if (!before) return bad('not_found', 404);
  await run(c.env.DB, 'DELETE FROM receipts WHERE id = ?', id);
  await record(c.env.DB, 'delete', before, null, text(c.req.query('reason'), 300), c.get('user').id);
  // Fewer goods on record: the request may no longer be complete.
  if (requestId) await refreshStatus(c.env.DB, requestId, true);
  return c.json({ ok: true });
});

// The corrections journal, newest first.
app.get('/corrections', async (c) =>
  c.json(
    await all(
      c.env.DB,
      `SELECT k.id, k.receipt_id, k.action, k.name, k.changes, k.reason, k.created_at, u.name AS user
         FROM corrections k LEFT JOIN users u ON u.id = k.user_id ORDER BY k.id DESC LIMIT 300`,
    ),
  ),
);

export default app;
