import { Hono } from 'hono';
import { ownOnly, type Payment, type Receipt, type RequestDetail, type RequestItem, type RequestSummary, type User } from '../../shared/types';
import { only } from '../auth';
import { all, bad, batch, date, first, lc, like, need, num, refId, run, text, type Env } from '../db';
import { filesOf } from './files';
import { PAYMENT_SELECT } from './payments';

const app = new Hono<Env>();
const writers = only('warehouse', 'supply', 'foreman', 'master');

/** Foremen and masters may change only the requests they handed in. */
const mayChange = (user: User, r: RequestDetail) => !ownOnly(user.role) || r.created_by === user.id;

const SUMMARY = `
  SELECT r.id, r.number, r.date, r.object_id, o.name AS object, r.status, r.note,
         r.created_by, u.name AS created_by_name,
         (SELECT count(*) FROM request_items i WHERE i.request_id = r.id) AS item_count,
         (SELECT count(*) FROM payments p WHERE p.request_id = r.id AND p.status = 'pending') AS pending_payments,
         (SELECT coalesce(sum(x.qty * x.price), 0) FROM receipts x JOIN request_items i ON i.id = x.request_item_id
           WHERE i.request_id = r.id) AS sum
    FROM requests r
    LEFT JOIN objects o ON o.id = r.object_id
    LEFT JOIN users u ON u.id = r.created_by`;

/**
 * received: every item has arrived in full (or the warehouse closed it);
 * approved: a payment was approved; otherwise open. A request that reached
 * "received" stays there unless it is reopened.
 */
export async function refreshStatus(db: D1Database, id: number, reopen = false) {
  const r = await first<{ status: string; items: number; missing: number; approved: number }>(
    db,
    `SELECT r.status,
            (SELECT count(*) FROM request_items i WHERE i.request_id = r.id) AS items,
            (SELECT count(*) FROM request_items i WHERE i.request_id = r.id AND i.qty >
               (SELECT coalesce(sum(x.qty), 0) FROM receipts x WHERE x.request_item_id = i.id)) AS missing,
            (SELECT count(*) FROM payments p WHERE p.request_id = r.id AND p.status IN ('approved','paid')) AS approved
       FROM requests r WHERE r.id = ?`,
    id,
  );
  if (!r || (r.status === 'received' && !reopen)) return;
  const status = r.items > 0 && r.missing === 0 ? 'received' : r.approved > 0 ? 'approved' : 'open';
  await run(db, 'UPDATE requests SET status = ? WHERE id = ?', status, id);
}

/** Next free PREFIX-NNN-MM-YYYY for the object and the month of `day`. */
export async function nextNumber(db: D1Database, objectId: number | null, day: string) {
  const o = objectId ? await first<{ prefix: string }>(db, 'SELECT prefix FROM objects WHERE id = ?', objectId) : null;
  const prefix = o?.prefix || 'АС';
  const tail = `-${day.slice(5, 7)}-${day.slice(0, 4)}`;
  const rows = await all<{ number: string }>(
    db, `SELECT number FROM requests WHERE number_lc LIKE ? ESCAPE '\\'`, `${like(prefix).slice(1, -1)}-%${tail}`,
  );
  const used = rows.map((r) => Number(r.number.slice(prefix.length + 1, -tail.length))).filter(Number.isInteger);
  return `${prefix}-${String(Math.max(0, ...used) + 1).padStart(3, '0')}${tail}`;
}

function parseItems(raw: unknown) {
  if (!Array.isArray(raw) || raw.length === 0) bad('required:items');
  return (raw as any[]).slice(0, 300).map((it) => ({
    id: Number.isInteger(it.id) ? (it.id as number) : null,
    name: need(it.name, 'item_name', 300),
    unit: text(it.unit, 30),
    qty: num(it.qty, 'qty', { min: 0 })!,
    spec: text(it.spec, 300),
    place: text(it.place, 200),
    work: text(it.work, 200),
    ordered_by: text(it.ordered_by, 100),
    executor: text(it.executor, 100),
  }));
}

app.get('/', async (c) => {
  const q = text(c.req.query('q'), 80);
  // ?1 is the search text; an empty one matches everything.
  const where = [`(?1 = '' OR r.number_lc LIKE ?1 ESCAPE '\\' OR o.name_lc LIKE ?1 ESCAPE '\\' OR EXISTS
      (SELECT 1 FROM request_items i WHERE i.request_id = r.id AND i.name_lc LIKE ?1 ESCAPE '\\'))`];
  const p: (string | number)[] = [q ? like(q) : ''];
  const add = (sql: string, v: string | number) => { p.push(v); where.push(sql.replace('?', `?${p.length}`)); };
  const status = c.req.query('status');
  if (status === 'open' || status === 'approved' || status === 'received') add('r.status = ?', status);
  if (c.req.query('object_id')) add('r.object_id = ?', Number(c.req.query('object_id')));
  if (c.req.query('from')) add('r.date >= ?', date(c.req.query('from'), 'from')!);
  if (c.req.query('to')) add('r.date <= ?', date(c.req.query('to'), 'to')!);
  const limit = Math.min(Number(c.req.query('limit')) || 50, 200);
  const offset = Math.max(Number(c.req.query('offset')) || 0, 0);
  const w = `WHERE ${where.join(' AND ')}`;
  const rows = await all<RequestSummary>(
    c.env.DB, `${SUMMARY} ${w} ORDER BY r.date DESC, r.id DESC LIMIT ${limit} OFFSET ${offset}`, ...p,
  );
  const total = await first<{ n: number }>(
    c.env.DB, `SELECT count(*) n FROM requests r LEFT JOIN objects o ON o.id = r.object_id ${w}`, ...p,
  );
  return c.json({ rows, total: total!.n });
});

app.get('/next-number', async (c) =>
  c.json({
    number: await nextNumber(c.env.DB, Number(c.req.query('object_id')) || null, date(c.req.query('date'), 'date')!),
  }),
);

export async function detail(db: D1Database, id: number): Promise<RequestDetail | null> {
  const r = await first<RequestSummary>(db, `${SUMMARY} WHERE r.id = ?`, id);
  if (!r) return null;
  const items = await all<RequestItem>(
    db,
    `SELECT i.id, i.pos, i.name, i.unit, i.qty, i.spec, i.place, i.work, i.ordered_by, i.executor,
            (SELECT coalesce(sum(x.qty), 0) FROM receipts x WHERE x.request_item_id = i.id) AS received
       FROM request_items i WHERE i.request_id = ? ORDER BY i.pos, i.id`,
    id,
  );
  const payments = await all<Payment>(db, `${PAYMENT_SELECT} WHERE p.request_id = ? ORDER BY p.id DESC`, id);
  const receipts = await all<Receipt>(
    db,
    `SELECT x.id, x.date, x.code, x.object_id, NULL AS object, x.request_item_id, x.name, x.unit, x.qty, x.price,
            s.name AS supplier, x.buyer, x.contract_no, x.invoice_no, x.vehicle, x.vehicle_date, x.currency, x.note
       FROM receipts x JOIN request_items i ON i.id = x.request_item_id LEFT JOIN suppliers s ON s.id = x.supplier_id
      WHERE i.request_id = ? ORDER BY x.date, x.id`,
    id,
  );
  // The form is signed by the head of the warehouse, the foreman who asked
  // and the project manager.
  const people = await first<{ warehouse: string | null; manager: string | null; author_role: string | null }>(
    db,
    `SELECT (SELECT name FROM users WHERE role = 'admin' AND active = 1 ORDER BY id LIMIT 1) AS warehouse,
            (SELECT name FROM users WHERE role = 'boss' AND active = 1 ORDER BY id LIMIT 1) AS manager,
            (SELECT role FROM users WHERE id = ?) AS author_role`,
    r.created_by,
  );
  const byForeman = people?.author_role === 'foreman' || people?.author_role === 'master';
  const signers = {
    warehouse: people?.warehouse ?? '',
    foreman: (byForeman ? r.created_by_name : items.find((i) => i.ordered_by)?.ordered_by) ?? '',
    manager: people?.manager ?? '',
  };
  return { ...r, items, payments, files: await filesOf(db, id), receipts, signers };
}

app.get('/:id', async (c) => {
  const d = await detail(c.env.DB, Number(c.req.param('id')));
  return d ? c.json(d) : bad('not_found', 404);
});

app.post('/', writers, async (c) => {
  const b = await c.req.json();
  const day = date(b.date, 'date')!;
  const objectId = b.object_id ? Number(b.object_id) : await refId(c.env.DB, 'objects', b.object);
  if (!objectId) bad('required:object');
  const items = parseItems(b.items);
  const custom = text(b.number, 40);
  // Two people may press "save" together: on a clash take the next number.
  for (let attempt = 0; ; attempt++) {
    const number = custom || (await nextNumber(c.env.DB, objectId, day));
    try {
      const res = await run(
        c.env.DB, 'INSERT INTO requests (number, number_lc, date, object_id, note, created_by) VALUES (?, ?, ?, ?, ?, ?)',
        number, lc(number), day, objectId, text(b.note, 500), c.get('user').id,
      );
      const id = res.meta.last_row_id;
      await insertItems(c.env.DB, id, items, 1);
      return c.json({ id, number });
    } catch (e) {
      if (!String(e).includes('UNIQUE')) throw e;
      if (custom || attempt >= 4) bad('number_taken', 409);
    }
  }
});

type Item = ReturnType<typeof parseItems>[number];
const insertItems = (db: D1Database, requestId: number, items: Item[], firstPos: number) =>
  batch(
    db,
    items.map((it, i) =>
      db.prepare(
        `INSERT INTO request_items (request_id, pos, name, name_lc, unit, qty, spec, place, work, ordered_by, executor)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(requestId, firstPos + i, it.name, lc(it.name), it.unit, it.qty, it.spec, it.place, it.work, it.ordered_by, it.executor),
    ),
  );

app.put('/:id', writers, async (c) => {
  const id = Number(c.req.param('id'));
  const b = await c.req.json();
  const old = await detail(c.env.DB, id);
  if (!old) return bad('not_found', 404);
  if (!mayChange(c.get('user'), old)) bad('forbidden', 403);
  const day = date(b.date, 'date')!;
  const number = need(b.number, 'number', 40);
  const objectId = Number(b.object_id) || bad('required:object');
  const items = parseItems(b.items);
  if (await first(c.env.DB, 'SELECT 1 FROM requests WHERE number = ? AND id != ?', number, id)) bad('number_taken', 409);
  const keep = new Set(items.map((i) => i.id).filter((x) => x !== null));
  // A line that already has receipts cannot be removed.
  if (old.items.some((i) => !keep.has(i.id) && i.received > 0)) bad('item_has_receipts', 409);
  const db = c.env.DB;
  const known = new Set(old.items.map((i) => i.id));
  await batch(db, [
    db.prepare('UPDATE requests SET number = ?, number_lc = ?, date = ?, object_id = ?, note = ? WHERE id = ?')
      .bind(number, lc(number), day, objectId, text(b.note, 500), id),
    ...old.items.filter((i) => !keep.has(i.id)).map((i) => db.prepare('DELETE FROM request_items WHERE id = ?').bind(i.id)),
    ...items.map((it, idx) =>
      it.id !== null && known.has(it.id)
        ? db.prepare(
            `UPDATE request_items SET pos = ?, name = ?, name_lc = ?, unit = ?, qty = ?, spec = ?, place = ?, work = ?,
                    ordered_by = ?, executor = ? WHERE id = ?`,
          ).bind(idx + 1, it.name, lc(it.name), it.unit, it.qty, it.spec, it.place, it.work, it.ordered_by, it.executor, it.id)
        : db.prepare(
            `INSERT INTO request_items (request_id, pos, name, name_lc, unit, qty, spec, place, work, ordered_by, executor)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          ).bind(id, idx + 1, it.name, lc(it.name), it.unit, it.qty, it.spec, it.place, it.work, it.ordered_by, it.executor),
    ),
  ]);
  await refreshStatus(db, id, old.status !== 'received');
  return c.json({ ok: true });
});

// Removing a request with payments or receipts is for administrators.
app.delete('/:id', writers, async (c) => {
  const id = Number(c.req.param('id'));
  const d = await detail(c.env.DB, id);
  if (!d) return bad('not_found', 404);
  if (!mayChange(c.get('user'), d)) bad('forbidden', 403);
  const used = d.payments.length > 0 || d.items.some((i) => i.received > 0);
  if (used && c.get('user').role !== 'admin') bad('request_in_use', 409);
  await run(c.env.DB, 'DELETE FROM file_parts WHERE file_id IN (SELECT id FROM files WHERE request_id = ?)', id);
  await run(c.env.DB, 'DELETE FROM requests WHERE id = ?', id);
  return c.json({ ok: true });
});

// Goods arrived: every line becomes a row in the receipts journal.
app.post('/:id/receive', only('warehouse'), async (c) => {
  const id = Number(c.req.param('id'));
  const b = await c.req.json();
  const d = await detail(c.env.DB, id);
  if (!d) return bad('not_found', 404);
  const day = date(b.date, 'date')!;
  const supplier = text(b.supplier, 200);
  const supplierId = await refId(c.env.DB, 'suppliers', supplier);
  const byId = new Map(d.items.map((i) => [i.id, i]));
  const lines = (Array.isArray(b.lines) ? (b.lines as any[]) : [])
    .map((l) => ({ item: byId.get(Number(l.item_id)), qty: num(l.qty, 'qty', { optional: true }), price: num(l.price, 'price', { optional: true }) }))
    .filter((l) => l.qty !== null && l.qty > 0);
  if (lines.length === 0) bad('required:lines');
  if (lines.some((l) => !l.item)) bad('invalid:item');
  const db = c.env.DB;
  await batch(
    db,
    lines.map((l) =>
      db.prepare(
        `INSERT INTO receipts (search, date, code, object_id, request_item_id, name, unit, qty, price, supplier_id,
                               buyer, contract_no, invoice_no, vehicle, vehicle_date, note, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        lc(`${l.item!.name} ${d.number} ${supplier}`), day, d.number, d.object_id, l.item!.id, l.item!.name, l.item!.unit, l.qty, l.price, supplierId,
        l.item!.executor, text(b.contract_no, 100), text(b.invoice_no, 100), text(b.vehicle, 100),
        date(b.vehicle_date, 'vehicle_date', true), text(b.note, 300), c.get('user').id,
      ),
    ),
  );
  await refreshStatus(db, id);
  return c.json({ ok: true, created: lines.length });
});

// Close a request that will not be delivered in full, or reopen it.
app.post('/:id/close', only('warehouse'), async (c) => {
  const res = await run(c.env.DB, `UPDATE requests SET status = 'received' WHERE id = ?`, Number(c.req.param('id')));
  return res.meta.changes ? c.json({ ok: true }) : bad('not_found', 404);
});

app.post('/:id/reopen', only('warehouse'), async (c) => {
  await run(c.env.DB, `UPDATE requests SET status = 'open' WHERE id = ?`, Number(c.req.param('id')));
  await refreshStatus(c.env.DB, Number(c.req.param('id')), true);
  return c.json({ ok: true });
});

export default app;
