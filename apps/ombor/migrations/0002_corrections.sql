-- Every change or removal of a receipt after it was entered: who, when,
-- why, and what the values were before and after.
CREATE TABLE corrections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  receipt_id INTEGER,
  action TEXT NOT NULL CHECK (action IN ('edit','delete')),
  name TEXT NOT NULL,            -- the material, kept even if the row is deleted
  changes TEXT NOT NULL,         -- JSON: { field: [before, after] }
  reason TEXT NOT NULL DEFAULT '',
  user_id INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX corrections_receipt ON corrections(receipt_id);
