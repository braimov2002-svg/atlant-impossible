import type { Context, MiddlewareHandler } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import type { Role, User } from '../shared/types';
import { bad, first, run, type Env } from './db';

const COOKIE = 'ombor_s';
const DAYS = 30;
const ROUNDS = 100_000; // the most Workers allow for PBKDF2

const hex = (buf: ArrayBuffer | Uint8Array) =>
  [...new Uint8Array(buf as ArrayBuffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
const unhex = (s: string) => new Uint8Array(s.match(/../g)!.map((h) => parseInt(h, 16)));

export async function hashPassword(password: string, saltHex?: string) {
  const salt = saltHex ? unhex(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ROUNDS }, key, 256);
  return { hash: hex(bits), salt: hex(salt) };
}

export async function checkPassword(password: string, hash: string, salt: string) {
  const got = (await hashPassword(password, salt)).hash;
  let diff = got.length ^ hash.length;
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ hash.charCodeAt(i % hash.length);
  return diff === 0;
}

export function validPassword(p: unknown): string {
  if (typeof p !== 'string' || p.length < 6 || p.length > 200) bad('password_short');
  return p as string;
}

const sha = async (s: string) => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));

export async function startSession(c: Context<Env>, userId: number) {
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  await run(
    c.env.DB,
    `INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, datetime('now', '+${DAYS} days'))`,
    await sha(token),
    userId,
  );
  await run(c.env.DB, `DELETE FROM sessions WHERE expires_at < datetime('now')`);
  setCookie(c, COOKIE, token, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: new URL(c.req.url).protocol === 'https:',
    path: '/',
    maxAge: DAYS * 86400,
  });
}

export async function endSession(c: Context<Env>) {
  const token = getCookie(c, COOKIE);
  if (token) await run(c.env.DB, 'DELETE FROM sessions WHERE token_hash = ?', await sha(token));
  deleteCookie(c, COOKIE, { path: '/' });
}

export async function currentUser(c: Context<Env>) {
  const token = getCookie(c, COOKIE);
  if (!token) return null;
  return first<User>(
    c.env.DB,
    `SELECT u.id, u.login, u.name, u.role, u.lang, u.active
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND s.expires_at > datetime('now') AND u.active = 1`,
    await sha(token),
  );
}

/** Every /api call after this needs a signed-in, active user. */
export const signedIn: MiddlewareHandler<Env> = async (c, next) => {
  const user = await currentUser(c);
  if (!user) bad('unauthorized', 401);
  c.set('user', user!);
  await next();
};

export const only =
  (...roles: Role[]): MiddlewareHandler<Env> =>
  async (c, next) => {
    const role = c.get('user').role;
    if (role !== 'admin' && !roles.includes(role)) bad('forbidden', 403);
    await next();
  };

/** Browsers send Origin on writes; reject writes started from another site. */
export const sameOrigin: MiddlewareHandler<Env> = async (c, next) => {
  if (c.req.method !== 'GET') {
    const origin = c.req.header('origin');
    if (origin && new URL(origin).host !== new URL(c.req.url).host) bad('forbidden', 403);
  }
  await next();
};
