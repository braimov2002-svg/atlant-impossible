import { useState } from 'react';
import { api } from '../api';
import type { Key } from '../i18n';
import { Empty, fmtDate, fmtMoney, fmtStamp, Loaded, PageHead, useApp, useLoad } from '../ui';
import { ReceiptsJournal, type Missing } from './receipts';

interface Correction {
  id: number; action: 'edit' | 'delete'; name: string; changes: string; reason: string; created_at: string; user: string | null;
}

const TABS: [Exclude<Missing, ''> | 'history', Key][] = [
  ['price', 'miss_price'], ['supplier', 'miss_supplier'], ['object', 'miss_object'], ['history', 'history'],
];
const FIELD: Record<string, Key> = {
  date: 'date', code: 'code', object: 'object', name: 'name', unit: 'unit', qty: 'qty', price: 'price', supplier: 'supplier',
  buyer: 'buyer', contract_no: 'contract_no', invoice_no: 'invoice_no', vehicle: 'vehicle', vehicle_date: 'vehicle_date', note: 'note',
};
const show = (field: string, v: unknown) =>
  v === null || v === '' ? '—'
  : typeof v === 'number' ? fmtMoney(v)
  : field.endsWith('date') ? fmtDate(String(v)) : String(v);

/** Receipts that still lack a price, supplier or object, and the journal of every correction made. */
export function CorrectionsPage() {
  const { t } = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('price');
  return (
    <>
      <PageHead back="/menu" title={t('corrections')} sub={t('corrections_sub')} />
      <div className="chips">
        {TABS.map(([id, key]) => (
          <button key={id} className={`chip${tab === id ? ' active' : ''}`} onClick={() => setTab(id)}>{t(key)}</button>
        ))}
      </div>
      {tab === 'history' ? <History /> : <ReceiptsJournal key={tab} missing={tab} />}
    </>
  );
}

function History() {
  const { t } = useApp();
  const q = useLoad(() => api<Correction[]>('GET', '/receipts/corrections'), []);
  return (
    <Loaded q={q}>
      {(rows) => rows.length === 0 ? <Empty /> : (
        <div className="card flush list">
          {rows.map((k) => (
            <div key={k.id}>
              <div className="line">
                <b>{k.name}</b>
                <span className={`pill ${k.action === 'delete' ? 'p-rejected' : 's-approved'}`}>{t(k.action === 'delete' ? 'act_delete' : 'act_edit')}</span>
              </div>
              <div className="meta">
                <span>{fmtStamp(k.created_at, true)}</span>
                {k.user && <span>{k.user}</span>}
              </div>
              {k.action === 'edit' && (
                <ul className="changes">
                  {Object.entries(JSON.parse(k.changes) as Record<string, [unknown, unknown]>).map(([f, [a, b]]) => (
                    <li key={f}><span className="muted">{FIELD[f] ? t(FIELD[f]) : f}:</span> {show(f, a)} → <b>{show(f, b)}</b></li>
                  ))}
                </ul>
              )}
              {k.reason && <p style={{ marginTop: 4 }}><span className="muted">{t('reason')}:</span> {k.reason}</p>}
            </div>
          ))}
        </div>
      )}
    </Loaded>
  );
}
