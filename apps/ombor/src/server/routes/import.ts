import { Hono } from 'hono';
import { only } from '../auth';
import { batch, date, lc, num, refIds, run, text, type Env } from '../db';

/**
 * Loads the old Excel workbook. The browser reads the file and sends it in
 * parts; every part can be sent again safely (nothing is added twice).
 */
const app = new Hono<Env>();
app.use(only()); // administrators only

app.post('/objects', async (c) => {
  const b = await c.req.json();
  const db = c.env.DB;
  const list = (Array.isArray(b.objects) ? (b.objects as any[]) : []).slice(0, 2000);
  await batch(
    db,
    list
      .filter((o) => text(o.name, 200))
      .map((o) =>
        db.prepare('INSERT OR IGNORE INTO objects (name, name_lc, prefix) VALUES (?, ?, ?)')
          .bind(text(o.name, 200), lc(text(o.name, 200)), text(o.prefix, 20) || 'АС'),
      ),
  );
  return c.json({ ok: true });
});

app.post('/requests', async (c) => {
  const b = await c.req.json();
  const db = c.env.DB;
  const list = (Array.isArray(b.requests) ? (b.requests as any[]) : []).slice(0, 100);
  const objects = await refIds(db, 'objects', list.map((r) => text(r.object, 200)));
  let created = 0;
  for (const r of list) {
    const number = text(r.number, 40);
    const day = date(r.date, 'date', true);
    if (!number || !day) continue;
    const res = await run(
      db, 'INSERT OR IGNORE INTO requests (number, number_lc, date, object_id) VALUES (?, ?, ?, ?)',
      number, lc(number), day, objects.get(lc(text(r.object, 200))) ?? null,
    );
    if (!res.meta.changes) continue; // already there
    created++;
    const id = res.meta.last_row_id;
    await batch(
      db,
      (Array.isArray(r.items) ? (r.items as any[]) : [])
        .filter((it) => text(it.name, 300))
        .map((it, i) =>
          db.prepare(
            `INSERT INTO request_items (request_id, pos, name, name_lc, unit, qty, place, work, ordered_by, executor)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          ).bind(id, i + 1, text(it.name, 300), lc(text(it.name, 300)), text(it.unit, 30), Number(it.qty) || 0, text(it.place, 200),
            text(it.work, 200), text(it.ordered_by, 100), text(it.executor, 100)),
        ),
    );
  }
  return c.json({ created });
});

app.post('/receipts', async (c) => {
  const b = await c.req.json();
  const db = c.env.DB;
  const rows = (Array.isArray(b.rows) ? (b.rows as any[]) : []).slice(0, 500);
  const objects = await refIds(db, 'objects', rows.map((r) => text(r.object, 200)));
  const suppliers = await refIds(db, 'suppliers', rows.map((r) => text(r.supplier, 200)));
  const before = await db.prepare('SELECT count(*) n FROM receipts').first<{ n: number }>();
  await batch(
    db,
    rows
      .filter((r) => text(r.import_key, 400) && text(r.name, 300) && date(r.date, 'date', true))
      .map((r) =>
        db.prepare(
          `INSERT OR IGNORE INTO receipts (import_key, date, code, object_id, request_item_id, name, unit, qty, price,
                  supplier_id, buyer, contract_no, invoice_no, vehicle, vehicle_date, currency, note, search)
           VALUES (?1, ?2, ?3, ?4,
                   (SELECT i.id FROM request_items i JOIN requests q ON q.id = i.request_id
                     WHERE q.number = ?3 AND i.name_lc = ?18 LIMIT 1),
                   ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17)`,
        ).bind(
          text(r.import_key, 400), date(r.date, 'date'), text(r.code, 60),
          objects.get(lc(text(r.object, 200))) ?? null, text(r.name, 300), text(r.unit, 30),
          Number(r.qty) || 0, num(r.price, 'price', { optional: true }),
          suppliers.get(lc(text(r.supplier, 200))) ?? null, text(r.buyer, 100), text(r.contract_no, 100),
          text(r.invoice_no, 100), text(r.vehicle, 100), date(r.vehicle_date, 'vehicle_date', true),
          text(r.currency, 10) || 'UZS', text(r.note, 300),
          lc(`${text(r.name, 300)} ${text(r.code, 60)} ${text(r.supplier, 200)}`), lc(text(r.name, 300)),
        ),
      ),
  );
  const after = await db.prepare('SELECT count(*) n FROM receipts').first<{ n: number }>();
  return c.json({ created: after!.n - before!.n });
});

// Imported requests (they have no author) get their status from what arrived.
app.post('/finish', async (c) => {
  await run(
    c.env.DB,
    `UPDATE requests SET status = CASE
        WHEN EXISTS (SELECT 1 FROM request_items i WHERE i.request_id = requests.id)
         AND NOT EXISTS (SELECT 1 FROM request_items i WHERE i.request_id = requests.id AND i.qty >
               (SELECT coalesce(sum(x.qty), 0) FROM receipts x WHERE x.request_item_id = i.id))
        THEN 'received' ELSE 'open' END
      WHERE created_by IS NULL`,
  );
  return c.json({ ok: true });
});

export default app;
