import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { sameOrigin, signedIn } from './auth';
import type { Env } from './db';
import auth from './routes/auth';
import dashboard from './routes/dashboard';
import files from './routes/files';
import imports from './routes/import';
import payments from './routes/payments';
import receipts from './routes/receipts';
import refs from './routes/refs';
import requests from './routes/requests';
import users from './routes/users';

const app = new Hono<Env>().basePath('/api');

app.use(sameOrigin);
app.route('/auth', auth);

// Everything below needs a signed-in user.
app.use(signedIn);
app.route('/users', users);
app.route('/requests', requests);
app.route('/payments', payments);
app.route('/receipts', receipts);
app.route('/dashboard', dashboard);
app.route('/import', imports);
app.route('/', files);
app.route('/', refs);

app.notFound((c) => c.json({ error: 'not_found' }, 404));
app.onError((err, c) => {
  if (err instanceof HTTPException) return c.json({ error: err.message }, err.status);
  if (err instanceof SyntaxError) return c.json({ error: 'bad_json' }, 400);
  console.error(err);
  return c.json({ error: 'server_error' }, 500);
});

export default app;
