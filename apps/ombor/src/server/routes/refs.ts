import { Hono } from 'hono';
import { only } from '../auth';
import { all, bad, first, lc, like, need, run, text, type Env } from '../db';

const app = new Hono<Env>();

// Objects with what was requested and received for each: the "folders".
app.get('/objects', async (c) =>
  c.json(
    await all(
      c.env.DB,
      `SELECT o.id, o.name, o.prefix, o.active,
              (SELECT count(*) FROM requests r WHERE r.object_id = o.id) AS requests,
              (SELECT count(*) FROM requests r WHERE r.object_id = o.id AND r.status != 'received') AS open_requests,
              (SELECT count(*) FROM receipts x WHERE x.object_id = o.id) AS receipts,
              (SELECT coalesce(sum(x.qty * x.price), 0) FROM receipts x WHERE x.object_id = o.id) AS sum
         FROM objects o ORDER BY o.active DESC, o.name`,
    ),
  ),
);

app.post('/objects', only('boss'), async (c) => {
  const b = await c.req.json();
  const name = need(b.name, 'name', 200);
  if (await first(c.env.DB, 'SELECT 1 FROM objects WHERE name_lc = ?', lc(name))) bad('name_taken', 409);
  const res = await run(
    c.env.DB, 'INSERT INTO objects (name, name_lc, prefix) VALUES (?, ?, ?)', name, lc(name), text(b.prefix, 20) || 'АС',
  );
  return c.json({ id: res.meta.last_row_id });
});

app.put('/objects/:id', only('boss'), async (c) => {
  const id = Number(c.req.param('id'));
  const b = await c.req.json();
  const name = need(b.name, 'name', 200);
  if (await first(c.env.DB, 'SELECT 1 FROM objects WHERE name_lc = ? AND id != ?', lc(name), id)) bad('name_taken', 409);
  const res = await run(
    c.env.DB, 'UPDATE objects SET name = ?, name_lc = ?, prefix = ?, active = ? WHERE id = ?',
    name, lc(name), text(b.prefix, 20) || 'АС', b.active === false || b.active === 0 ? 0 : 1, id,
  );
  if (!res.meta.changes) bad('not_found', 404);
  return c.json({ ok: true });
});

app.get('/suppliers', async (c) => c.json(await all(c.env.DB, 'SELECT id, name FROM suppliers ORDER BY name')));

// Material names already used, for suggestions while typing.
app.get('/names', async (c) => {
  const q = text(c.req.query('q'), 80);
  if (q.length < 2) return c.json([]);
  return c.json(
    await all(
      c.env.DB,
      `SELECT name, max(unit) AS unit FROM (
         SELECT name, unit FROM receipts WHERE search LIKE ?1 ESCAPE '\\'
         UNION ALL SELECT name, unit FROM request_items WHERE name_lc LIKE ?1 ESCAPE '\\')
        GROUP BY name ORDER BY name LIMIT 8`,
      like(q),
    ),
  );
});

export default app;
