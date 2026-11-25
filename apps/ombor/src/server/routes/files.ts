import { Hono } from 'hono';
import type { FileInfo } from '../../shared/types';
import { only } from '../auth';
import { all, bad, first, run, text, type Env } from '../db';

const MAX_BYTES = 10 * 1024 * 1024;
const PART = 512 * 1024;

/** What may be attached, and the type it is served as. */
const TYPES: Record<string, string> = {
  pdf: 'application/pdf', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
/** Only these open in the browser; everything else is downloaded. */
const INLINE = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

export const FILES_OF = `
  SELECT f.id, f.name, f.mime, f.size, f.uploaded_by, u.name AS uploaded_by_name, f.created_at
    FROM files f LEFT JOIN users u ON u.id = f.uploaded_by WHERE f.request_id = ? ORDER BY f.id`;
export const filesOf = (db: D1Database, requestId: number) => all<FileInfo>(db, FILES_OF, requestId);

const app = new Hono<Env>();
const uploaders = only('supply', 'warehouse');

// Attach a contract to a request: supply, the warehouse keeper, the head of the warehouse.
app.post('/requests/:id/files', uploaders, async (c) => {
  const requestId = Number(c.req.param('id'));
  if (!(await first(c.env.DB, 'SELECT 1 FROM requests WHERE id = ?', requestId))) bad('not_found', 404);
  const file = (await c.req.parseBody())['file'];
  if (!(file instanceof File)) return bad('required:file');
  const name = text(file.name, 150) || 'file';
  const mime = TYPES[name.split('.').pop()!.toLowerCase()];
  if (!mime) bad('file_type');
  if (file.size === 0 || file.size > MAX_BYTES) bad('file_size');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const db = c.env.DB;
  const res = await run(
    db, 'INSERT INTO files (request_id, name, mime, size, uploaded_by) VALUES (?, ?, ?, ?, ?)',
    requestId, name, mime, bytes.length, c.get('user').id,
  );
  const id = res.meta.last_row_id;
  try {
    for (let seq = 0; seq * PART < bytes.length; seq++) {
      const part = bytes.slice(seq * PART, (seq + 1) * PART);
      await db.prepare('INSERT INTO file_parts (file_id, seq, data) VALUES (?, ?, ?)').bind(id, seq, part.buffer).run();
    }
  } catch (e) {
    await run(db, 'DELETE FROM files WHERE id = ?', id); // no half-saved files
    throw e;
  }
  return c.json({ id });
});

app.get('/files/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const f = await first<{ name: string; mime: string; size: number }>(c.env.DB, 'SELECT name, mime, size FROM files WHERE id = ?', id);
  if (!f) return bad('not_found', 404);
  const parts = await all<{ data: ArrayBuffer | number[] }>(c.env.DB, 'SELECT data FROM file_parts WHERE file_id = ? ORDER BY seq', id);
  const body = new Uint8Array(f.size);
  let at = 0;
  for (const p of parts) {
    const chunk = new Uint8Array(p.data as ArrayBuffer);
    body.set(chunk, at);
    at += chunk.length;
  }
  return new Response(body, {
    headers: {
      'content-type': f.mime,
      'content-length': String(f.size),
      'content-disposition': `${INLINE.has(f.mime) ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(f.name)}`,
      // An uploaded file must never run as a page of this site.
      'x-content-type-options': 'nosniff',
      'content-security-policy': "default-src 'none'; sandbox",
      'cache-control': 'private, max-age=3600',
    },
  });
});

// The person who attached a file, or the head of the warehouse, may remove it.
app.delete('/files/:id', uploaders, async (c) => {
  const id = Number(c.req.param('id'));
  const f = await first<{ uploaded_by: number | null }>(c.env.DB, 'SELECT uploaded_by FROM files WHERE id = ?', id);
  if (!f) return bad('not_found', 404);
  const me = c.get('user');
  if (me.role !== 'admin' && f.uploaded_by !== me.id) bad('forbidden', 403);
  await c.env.DB.batch([
    c.env.DB.prepare('DELETE FROM file_parts WHERE file_id = ?').bind(id),
    c.env.DB.prepare('DELETE FROM files WHERE id = ?').bind(id),
  ]);
  return c.json({ ok: true });
});

export default app;
