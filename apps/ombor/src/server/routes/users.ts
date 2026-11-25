import { Hono } from 'hono';
import type { User } from '../../shared/types';
import { hashPassword, only, validPassword } from '../auth';
import { all, bad, first, isRole, lc, need, run, type Env } from '../db';

const app = new Hono<Env>();
app.use(only()); // administrators only

app.get('/', async (c) =>
  c.json(await all<User>(c.env.DB, 'SELECT id, login, name, role, lang, active FROM users ORDER BY active DESC, name')),
);

app.post('/', async (c) => {
  const b = await c.req.json();
  const login = lc(need(b.login, 'login', 40));
  const name = need(b.name, 'name', 80);
  if (!isRole(b.role)) bad('invalid:role');
  const { hash, salt } = await hashPassword(validPassword(b.password));
  if (await first(c.env.DB, 'SELECT 1 FROM users WHERE login = ?', login)) bad('login_taken', 409);
  const res = await run(
    c.env.DB,
    'INSERT INTO users (login, name, role, lang, pass_hash, pass_salt) VALUES (?, ?, ?, ?, ?, ?)',
    login, name, b.role, b.lang === 'ru' ? 'ru' : 'uz', hash, salt,
  );
  return c.json({ id: res.meta.last_row_id });
});

app.put('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const b = await c.req.json();
  const name = need(b.name, 'name', 80);
  if (!isRole(b.role)) bad('invalid:role');
  const active = b.active === false || b.active === 0 ? 0 : 1;
  // An administrator cannot lock themselves out.
  if (id === c.get('user').id && (active === 0 || b.role !== 'admin')) bad('self_lockout');
  const res = await run(c.env.DB, 'UPDATE users SET name = ?, role = ?, active = ? WHERE id = ?', name, b.role, active, id);
  if (!res.meta.changes) bad('not_found', 404);
  if (b.password) {
    const { hash, salt } = await hashPassword(validPassword(b.password));
    await run(c.env.DB, 'UPDATE users SET pass_hash = ?, pass_salt = ?, fails = 0, locked_until = NULL WHERE id = ?', hash, salt, id);
    await run(c.env.DB, 'DELETE FROM sessions WHERE user_id = ? AND user_id != ?', id, c.get('user').id);
  }
  if (!active) await run(c.env.DB, 'DELETE FROM sessions WHERE user_id = ?', id);
  return c.json({ ok: true });
});

export default app;
