CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  login TEXT NOT NULL UNIQUE, -- always stored lower-cased
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','warehouse','supply','boss','foreman','master')),
  lang TEXT NOT NULL DEFAULT 'uz' CHECK (lang IN ('uz','ru')),
  pass_hash TEXT NOT NULL,
  pass_salt TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);

-- SQLite compares case only for Latin letters. The *_lc and search columns
-- hold lower-cased text (written by the server) so that Cyrillic names are
-- unique and searchable whatever their case.
CREATE TABLE objects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_lc TEXT NOT NULL UNIQUE,
  -- Request numbers of this object look like PREFIX-NNN-MM-YYYY.
  prefix TEXT NOT NULL DEFAULT 'АС',
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_lc TEXT NOT NULL UNIQUE
);

CREATE TABLE requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number TEXT NOT NULL UNIQUE,
  number_lc TEXT NOT NULL,
  date TEXT NOT NULL,
  object_id INTEGER REFERENCES objects(id),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','approved','received')),
  note TEXT NOT NULL DEFAULT '',
  created_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX requests_date ON requests(date);

CREATE TABLE request_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  pos INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_lc TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT '',
  qty REAL NOT NULL,
  spec TEXT NOT NULL DEFAULT '',
  place TEXT NOT NULL DEFAULT '',
  work TEXT NOT NULL DEFAULT '',
  ordered_by TEXT NOT NULL DEFAULT '',
  executor TEXT NOT NULL DEFAULT ''
);
CREATE INDEX request_items_request ON request_items(request_id);

CREATE TABLE payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  supplier_id INTEGER REFERENCES suppliers(id),
  amount REAL NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','paid')),
  created_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  decided_by INTEGER REFERENCES users(id),
  decided_at TEXT,
  paid_at TEXT
);
CREATE INDEX payments_status ON payments(status);
CREATE INDEX payments_request ON payments(request_id);

CREATE TABLE receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  code TEXT NOT NULL DEFAULT '',
  object_id INTEGER REFERENCES objects(id),
  request_item_id INTEGER REFERENCES request_items(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT '',
  qty REAL NOT NULL,
  price REAL,
  supplier_id INTEGER REFERENCES suppliers(id),
  buyer TEXT NOT NULL DEFAULT '',
  contract_no TEXT NOT NULL DEFAULT '',
  invoice_no TEXT NOT NULL DEFAULT '',
  vehicle TEXT NOT NULL DEFAULT '',
  vehicle_date TEXT,
  currency TEXT NOT NULL DEFAULT 'UZS',
  note TEXT NOT NULL DEFAULT '',
  search TEXT NOT NULL DEFAULT '', -- lower-cased name, code and supplier
  import_key TEXT UNIQUE,
  created_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX receipts_date ON receipts(date);
CREATE INDEX receipts_item ON receipts(request_item_id);
CREATE INDEX receipts_object ON receipts(object_id);

-- Login throttling: failed attempts and a short lock.
ALTER TABLE users ADD COLUMN fails INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN locked_until TEXT;
