import { HTTPException } from 'hono/http-exception';
import type { Role, User } from '../shared/types';

export type Env = {
  Bindings: { DB: D1Database; ASSETS: Fetcher };
  Variables: { user: User };
};

type P = string | number | null;

export const all = async <T>(db: D1Database, sql: string, ...p: P[]) =>
  (await db.prepare(sql).bind(...p).all<T>()).results;

export const first = <T>(db: D1Database, sql: string, ...p: P[]) =>
  db.prepare(sql).bind(...p).first<T>();

export const run = (db: D1Database, sql: string, ...p: P[]) => db.prepare(sql).bind(...p).run();

/** D1 allows a limited number of statements per batch; send them in chunks. */
export async function batch(db: D1Database, stmts: D1PreparedStatement[]) {
  for (let i = 0; i < stmts.length; i += 50) await db.batch(stmts.slice(i, i + 50));
}

export const bad = (code: string, status: 400 | 401 | 403 | 404 | 409 | 429 = 400): never => {
  throw new HTTPException(status, { message: code });
};

// --- input parsing -------------------------------------------------------

export const text = (v: unknown, max = 300) =>
  (typeof v === 'string' || typeof v === 'number' ? String(v) : '').trim().replace(/\s+/g, ' ').slice(0, max);

export function need(v: unknown, field: string, max = 300) {
  const s = text(v, max);
  if (!s) bad(`required:${field}`);
  return s;
}

export function num(v: unknown, field: string, opts: { min?: number; optional?: boolean } = {}) {
  if ((v === null || v === undefined || v === '') && opts.optional) return null;
  const n = typeof v === 'number' ? v : Number(String(v).replace(/\s/g, '').replace(',', '.'));
  if (!Number.isFinite(n) || n < (opts.min ?? 0)) bad(`invalid:${field}`);
  return n;
}

export function date(v: unknown, field: string, optional = false) {
  const s = text(v, 10);
  if (!s && optional) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || Number.isNaN(Date.parse(s))) bad(`invalid:${field}`);
  return s;
}

export const isRole = (v: unknown): v is Role =>
  v === 'admin' || v === 'warehouse' || v === 'supply' || v === 'boss';

// --- reference tables ----------------------------------------------------

/** Finds or creates an object/supplier by name; empty name gives null. */
export async function refId(db: D1Database, table: 'objects' | 'suppliers', name: unknown) {
  const n = text(name, 200);
  if (!n) return null;
  await run(db, `INSERT OR IGNORE INTO ${table} (name, name_lc) VALUES (?, ?)`, n, lc(n));
  const row = await first<{ id: number }>(db, `SELECT id FROM ${table} WHERE name_lc = ?`, lc(n));
  return row!.id;
}

/** Same as refId for many names at once: returns lower-cased name -> id. */
export async function refIds(db: D1Database, table: 'objects' | 'suppliers', names: string[]) {
  const uniq = [...new Set(names.map((n) => text(n, 200)).filter(Boolean))];
  await batch(db, uniq.map((n) => db.prepare(`INSERT OR IGNORE INTO ${table} (name, name_lc) VALUES (?, ?)`).bind(n, lc(n))));
  const rows = await all<{ id: number; name_lc: string }>(db, `SELECT id, name_lc FROM ${table}`);
  return new Map(rows.map((r) => [r.name_lc, r.id]));
}

/** Lower-cases in JavaScript, which (unlike SQLite) handles Cyrillic. */
export const lc = (s: string) => s.toLowerCase();

/** A LIKE pattern for the lower-cased columns. */
export const like = (q: string) => `%${lc(q).replace(/[\\%_]/g, '\\$&')}%`;
