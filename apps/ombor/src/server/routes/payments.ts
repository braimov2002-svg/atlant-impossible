import { Hono } from 'hono';
import type { Payment } from '../../shared/types';
import { only } from '../auth';
import { all, bad, first, num, refId, run, text, type Env } from '../db';
import { refreshStatus } from './requests';

export const PAYMENT_SELECT = `
  SELECT p.id, p.request_id, r.number AS request_number, o.name AS object, s.name AS supplier,
         p.amount, p.note, p.status, cu.name AS created_by_name, p.created_at,
         du.name AS decided_by_name, p.decided_at, p.paid_at
    FROM payments p
    JOIN requests r ON r.id = p.request_id
    LEFT JOIN objects o ON o.id = r.object_id
    LEFT JOIN suppliers s ON s.id = p.supplier_id
    LEFT JOIN users cu ON cu.id = p.created_by
    LEFT JOIN users du ON du.id = p.decided_by`;

const app = new Hono<Env>();

app.get('/', async (c) => {
  const status = c.req.query('status');
  const ok = status === 'pending' || status === 'approved' || status === 'rejected' || status === 'paid';
  const rows = ok
    ? await all<Payment>(c.env.DB, `${PAYMENT_SELECT} WHERE p.status = ? ORDER BY p.id DESC LIMIT 300`, status)
    : await all<Payment>(c.env.DB, `${PAYMENT_SELECT} ORDER BY p.id DESC LIMIT 300`);
  return c.json(rows);
});

app.post('/', only('supply'), async (c) => {
  const b = await c.req.json();
  const requestId = Number(b.request_id);
  if (!(await first(c.env.DB, 'SELECT 1 FROM requests WHERE id = ?', requestId))) bad('not_found', 404);
  const amount = num(b.amount, 'amount')!;
  if (amount <= 0) bad('invalid:amount');
  const res = await run(
    c.env.DB, 'INSERT INTO payments (request_id, supplier_id, amount, note, created_by) VALUES (?, ?, ?, ?, ?)',
    requestId, await refId(c.env.DB, 'suppliers', b.supplier), amount, text(b.note, 300), c.get('user').id,
  );
  return c.json({ id: res.meta.last_row_id });
});

const requestOf = async (db: D1Database, id: number) =>
  (await first<{ request_id: number }>(db, 'SELECT request_id FROM payments WHERE id = ?', id))?.request_id;

// The status in WHERE makes each step happen once even if two people press together.
app.post('/:id/decide', only('boss'), async (c) => {
  const id = Number(c.req.param('id'));
  const b = await c.req.json();
  const res = await run(
    c.env.DB,
    `UPDATE payments SET status = ?, decided_by = ?, decided_at = datetime('now') WHERE id = ? AND status = 'pending'`,
    b.approve ? 'approved' : 'rejected', c.get('user').id, id,
  );
  if (!res.meta.changes) bad('not_pending', 409);
  await refreshStatus(c.env.DB, (await requestOf(c.env.DB, id))!);
  return c.json({ ok: true });
});

app.post('/:id/paid', only('supply', 'boss'), async (c) => {
  const res = await run(
    c.env.DB, `UPDATE payments SET status = 'paid', paid_at = datetime('now') WHERE id = ? AND status = 'approved'`,
    Number(c.req.param('id')),
  );
  if (!res.meta.changes) bad('not_approved', 409);
  return c.json({ ok: true });
});

app.delete('/:id', only('supply'), async (c) => {
  const id = Number(c.req.param('id'));
  const requestId = await requestOf(c.env.DB, id);
  const res = await run(c.env.DB, `DELETE FROM payments WHERE id = ? AND status = 'pending'`, id);
  if (!res.meta.changes) bad('not_pending', 409);
  if (requestId) await refreshStatus(c.env.DB, requestId);
  return c.json({ ok: true });
});

export default app;
