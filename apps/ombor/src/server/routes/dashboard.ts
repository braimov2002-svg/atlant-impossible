import { Hono } from 'hono';
import type { Dashboard, PaymentStatus } from '../../shared/types';
import { all, date, first, type Env } from '../db';

const app = new Hono<Env>();

// Timestamps are stored in UTC; the company works on Tashkent time (UTC+5).
const LOCAL = `'+5 hours'`;

app.get('/', async (c) => {
  const from = date(c.req.query('from'), 'from', true) ?? '0000-01-01';
  const to = date(c.req.query('to'), 'to', true) ?? '9999-12-31';
  const db = c.env.DB;
  const receipts = await first<Dashboard['receipts']>(
    db,
    `SELECT coalesce(sum(qty * price), 0) AS sum, count(*) AS count,
            coalesce(sum(price IS NULL OR price = 0), 0) AS unpriced
       FROM receipts WHERE date BETWEEN ? AND ?`,
    from, to,
  );
  // Waiting and approved payments are what is outstanding now, whatever the
  // period; paid and rejected ones are counted inside the period.
  const pay = await all<{ status: PaymentStatus; sum: number; count: number }>(
    db,
    `SELECT status, coalesce(sum(amount), 0) AS sum, count(*) AS count FROM payments
      WHERE status IN ('pending','approved')
         OR (status = 'paid' AND date(paid_at, ${LOCAL}) BETWEEN ?1 AND ?2)
         OR (status = 'rejected' AND date(decided_at, ${LOCAL}) BETWEEN ?1 AND ?2)
      GROUP BY status`,
    from, to,
  );
  const payments = { pending: z(), approved: z(), rejected: z(), paid: z() };
  for (const r of pay) payments[r.status] = { sum: r.sum, count: r.count };
  const objects = await all<Dashboard['objects'][number]>(
    db,
    `SELECT o.id, o.name, coalesce(sum(x.qty * x.price), 0) AS sum, count(*) AS count
       FROM receipts x LEFT JOIN objects o ON o.id = x.object_id
      WHERE x.date BETWEEN ? AND ? GROUP BY o.id ORDER BY sum DESC`,
    from, to,
  );
  const open = await first<{ n: number }>(db, `SELECT count(*) n FROM requests WHERE status != 'received'`);
  const out: Dashboard = {
    receipts: receipts!,
    payments,
    objects,
    badges: { pending: payments.pending.count, to_pay: payments.approved.count, open_requests: open!.n },
  };
  return c.json(out);
});

const z = () => ({ sum: 0, count: 0 });

export default app;
