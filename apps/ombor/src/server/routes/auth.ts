import { Hono } from 'hono';
import { checkPassword, currentUser, endSession, hashPassword, signedIn, startSession, validPassword } from '../auth';
import { bad, first, lc, need, run, type Env } from '../db';

const MAX_FAILS = 5;
const LOCK_MINUTES = 5;

const app = new Hono<Env>();

const userCount = async (db: D1Database) => (await first<{ n: number }>(db, 'SELECT count(*) n FROM users'))!.n;

app.get('/state', async (c) => {
  const user = await currentUser(c);
  return c.json({ needsSetup: !user && (await userCount(c.env.DB)) === 0, user });
});

// First run only: creates the administrator.
app.post('/setup', async (c) => {
  const b = await c.req.json();
  const login = lc(need(b.login, 'login', 40));
  const name = need(b.name, 'name', 80);
  const { hash, salt } = await hashPassword(validPassword(b.password));
  // The WHERE keeps this safe if two people open the setup page at once.
  const res = await run(
    c.env.DB,
    `INSERT INTO users (login, name, role, pass_hash, pass_salt)
     SELECT ?, ?, 'admin', ?, ? WHERE NOT EXISTS (SELECT 1 FROM users)`,
    login, name, hash, salt,
  );
  if (!res.meta.changes) bad('already_setup', 409);
  await startSession(c, res.meta.last_row_id);
  return c.json({ ok: true });
});

app.post('/login', async (c) => {
  const b = await c.req.json();
  const login = lc(need(b.login, 'login', 40));
  const u = await first<{ id: number; pass_hash: string; pass_salt: string; active: number; locked: number }>(
    c.env.DB,
    `SELECT id, pass_hash, pass_salt, active,
            (locked_until IS NOT NULL AND locked_until > datetime('now')) AS locked
       FROM users WHERE login = ?`,
    login,
  );
  if (u?.locked) bad('locked', 429);
  const ok = !!u && u.active === 1 && (await checkPassword(String(b.password ?? ''), u.pass_hash, u.pass_salt));
  if (!ok) {
    if (u) {
      await run(
        c.env.DB,
        `UPDATE users SET fails = fails + 1,
                locked_until = CASE WHEN fails + 1 >= ${MAX_FAILS}
                                    THEN datetime('now', '+${LOCK_MINUTES} minutes') ELSE locked_until END
          WHERE id = ?`,
        u.id,
      );
    }
    bad('bad_login', 401);
  }
  await run(c.env.DB, 'UPDATE users SET fails = 0, locked_until = NULL WHERE id = ?', u!.id);
  await startSession(c, u!.id);
  return c.json({ ok: true });
});

app.post('/logout', async (c) => {
  await endSession(c);
  return c.json({ ok: true });
});

// Own language and password.
app.post('/me', signedIn, async (c) => {
  const b = await c.req.json();
  const me = c.get('user');
  if (b.lang === 'uz' || b.lang === 'ru') await run(c.env.DB, 'UPDATE users SET lang = ? WHERE id = ?', b.lang, me.id);
  if (b.password !== undefined) {
    const cur = await first<{ pass_hash: string; pass_salt: string }>(
      c.env.DB, 'SELECT pass_hash, pass_salt FROM users WHERE id = ?', me.id,
    );
    if (!(await checkPassword(String(b.current ?? ''), cur!.pass_hash, cur!.pass_salt))) bad('bad_current');
    const { hash, salt } = await hashPassword(validPassword(b.password));
    await run(c.env.DB, 'UPDATE users SET pass_hash = ?, pass_salt = ? WHERE id = ?', hash, salt, me.id);
  }
  return c.json({ ok: true });
});

export default app;
