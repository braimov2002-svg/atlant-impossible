import { useEffect, useState } from 'react';
import type { ObjectFolder, Receipt } from '../../shared/types';
import { api, qs } from '../api';
import { exportReceipts } from '../excel';
import {
  can, Empty, ErrorLine, Field, fmtDate, fmtMoney, fmtQty, Icon, Loaded, PageHead, Suggest, today, useAction, useApp, useLoad,
} from '../ui';

const PAGE = 50;
type Form = Record<'date' | 'code' | 'object_id' | 'name' | 'unit' | 'qty' | 'price' | 'supplier' | 'buyer' | 'contract_no'
  | 'invoice_no' | 'vehicle' | 'vehicle_date' | 'note' | 'reason', string>;

function ReceiptForm({ row, objects, onDone }: { row?: Receipt; objects: ObjectFolder[]; onDone: (saved: boolean) => void }) {
  const { t } = useApp();
  const [f, setF] = useState<Form>({
    date: row?.date ?? today(), code: row?.code ?? '', object_id: String(row?.object_id ?? ''), name: row?.name ?? '',
    unit: row?.unit ?? 'шт', qty: row ? String(row.qty) : '', price: row?.price ? String(row.price) : '',
    supplier: row?.supplier ?? '', buyer: row?.buyer ?? '', contract_no: row?.contract_no ?? '', invoice_no: row?.invoice_no ?? '',
    vehicle: row?.vehicle ?? '', vehicle_date: row?.vehicle_date ?? '', note: row?.note ?? '', reason: '',
  });
  const suppliers = useLoad(() => api<{ name: string }[]>('GET', '/suppliers'), []);
  const act = useAction();
  const inp = (k: keyof Form, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) =>
    <input value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} {...extra} />;
  const save = () =>
    act.run(() => (row ? api('PUT', `/receipts/${row.id}`, f) : api('POST', '/receipts', f))).then((ok) => ok && onDone(true));
  // A removal is written to the corrections journal with its reason.
  const remove = () => {
    const reason = f.reason || prompt(t('delete_reason')) || '';
    return confirm(t('confirm_delete')) &&
      act.run(() => api('DELETE', `/receipts/${row!.id}${qs({ reason })}`)).then((ok) => ok && onDone(true));
  };
  return (
    <form className="card form" onSubmit={(e) => { e.preventDefault(); void save(); }}>
      <h2 className="wide" style={{ margin: 0 }}>{t(row ? 'edit_receipt' : 'new_receipt')}</h2>
      <Field label={t('name')} wide>{inp('name', { required: true })}</Field>
      <Field label={t('qty')}>{inp('qty', { required: true, inputMode: 'decimal' })}</Field>
      <Field label={t('unit')}>{inp('unit')}</Field>
      <Field label={t('price')}>{inp('price', { inputMode: 'decimal' })}</Field>
      <Field label={t('date')}>{inp('date', { type: 'date', required: true })}</Field>
      <Field label={t('object')}>
        <select value={f.object_id} onChange={(e) => setF({ ...f, object_id: e.target.value })}>
          <option value="" />
          {objects.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </Field>
      <Field label={t('supplier')}>
        <Suggest id="suppliers" value={f.supplier} onChange={(v) => setF({ ...f, supplier: v })} options={(suppliers.data ?? []).map((s) => s.name)} />
      </Field>
      <Field label={t('code')}>{inp('code')}</Field>
      <Field label={t('buyer')}>{inp('buyer')}</Field>
      <Field label={t('contract_no')}>{inp('contract_no')}</Field>
      <Field label={t('invoice_no')}>{inp('invoice_no')}</Field>
      <Field label={t('vehicle')}>{inp('vehicle')}</Field>
      <Field label={t('vehicle_date')}>{inp('vehicle_date', { type: 'date' })}</Field>
      <Field label={t('note')} wide>{inp('note')}</Field>
      {row && <Field label={t('reason')} wide>{inp('reason')}</Field>}
      <div className="wide">
        <ErrorLine text={act.error} />
        <div className="row" style={{ margin: 0 }}>
          <button className="btn primary" disabled={act.busy}>{t('save')}</button>
          <button type="button" className="btn" onClick={() => onDone(false)}>{t('cancel')}</button>
          {row && <button type="button" className="btn danger" disabled={act.busy} onClick={remove}><Icon name="trash" size={18} /> {t('delete')}</button>}
        </div>
      </div>
    </form>
  );
}

export type Missing = '' | 'price' | 'supplier' | 'object';
const EMPTY = { q: '', object_id: '', supplier_id: '', from: '', to: '', missing: '' as Missing };

/**
 * The receipts journal with its filter panel. With `missing` it is locked
 * to rows that lack a price, supplier or object (the corrections section).
 */
export function ReceiptsJournal({ objectId = '', missing }: { objectId?: string; missing?: Missing }) {
  const { user, t } = useApp();
  const [f, setF] = useState({ ...EMPTY, object_id: objectId, missing: missing ?? '' });
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const [editing, setEditing] = useState<Receipt | 'new' | null>(null);
  const act = useAction();
  useEffect(() => {
    const timer = setTimeout(() => setF((x) => ({ ...x, q })), 300);
    return () => clearTimeout(timer);
  }, [q]);
  useEffect(() => setF((x) => ({ ...x, missing: missing ?? x.missing })), [missing]);
  const objects = useLoad(() => api<ObjectFolder[]>('GET', '/objects'), []);
  const suppliers = useLoad(() => api<{ id: number; name: string }[]>('GET', '/suppliers'), []);
  const list = useLoad(
    () => api<{ rows: Receipt[]; total: number; sum: number }>('GET', `/receipts${qs({ ...f, limit })}`),
    [f, limit],
  );
  const mayEdit = can(user).receive;
  // How many filters are set, not counting the one the section itself fixes.
  const active = (Object.keys(EMPTY) as (keyof typeof EMPTY)[]).filter((k) => f[k] && !(k === 'missing' && missing)).length;
  const clear = () => { setQ(''); setF({ ...EMPTY, missing: missing ?? '' }); };
  return (
    <>
      <div className="row no-print" style={{ marginTop: 0, marginBottom: 12 }}>
        {mayEdit && !editing && !missing && (
          <button className="btn primary" onClick={() => setEditing('new')}><Icon name="plus" size={18} /> {t('new_receipt')}</button>
        )}
        <button className="btn" disabled={act.busy} onClick={() => act.run(() => exportReceipts(f, t, t('receipts')))}>
          <Icon name="download" size={18} /> {t('excel')}
        </button>
      </div>
      <ErrorLine text={act.error} />
      {editing && (
        <ReceiptForm key={editing === 'new' ? 'new' : editing.id} row={editing === 'new' ? undefined : editing}
          objects={objects.data ?? []} onDone={(saved) => { setEditing(null); if (saved) list.reload(); }} />
      )}
      <div className="card">
        <div className="line" style={{ alignItems: 'center', marginBottom: 10 }}>
          <b><Icon name="filter" size={18} /> {t('filter')}</b>
          <span className="row" style={{ margin: 0 }}>
            <span className={`pill ${active ? 's-open' : 's-received'}`}>{active ? `${t('filter_on')}: ${active}` : t('filter_off')}</span>
            {active > 0 && <button className="btn small" onClick={clear}><Icon name="x" size={14} /> {t('clear')}</button>}
          </span>
        </div>
        <div className="filters six">
          <div className="search">
            <Icon name="search" size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search_receipts')} aria-label={t('search')} />
          </div>
          <select value={f.object_id} onChange={(e) => setF({ ...f, object_id: e.target.value })} aria-label={t('object')}>
            <option value="">{t('all_objects')}</option>
            {(objects.data ?? []).map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
          </select>
          <select value={f.supplier_id} onChange={(e) => setF({ ...f, supplier_id: e.target.value })} aria-label={t('supplier')}>
            <option value="">{t('all_suppliers')}</option>
            {(suppliers.data ?? []).map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
          </select>
          {!missing && (
            <select value={f.missing} onChange={(e) => setF({ ...f, missing: e.target.value as Missing })} aria-label={t('any_fill')}>
              <option value="">{t('any_fill')}</option>
              <option value="price">{t('miss_price')}</option>
              <option value="supplier">{t('miss_supplier')}</option>
              <option value="object">{t('miss_object')}</option>
            </select>
          )}
          <input type="date" value={f.from} onChange={(e) => setF({ ...f, from: e.target.value })} aria-label={`${t('date')} ${t('from')}`} />
          <input type="date" value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} aria-label={`${t('date')} ${t('to')}`} />
        </div>
      </div>
      <Loaded q={list}>
        {({ rows, total, sum }) => (
          <>
            <p style={{ margin: '0 2px 10px' }}>
              <b>{t('total')}: {fmtMoney(sum)} {t('sum_unit')}</b> <span className="muted">· {t('records')}: {total}</span>
            </p>
            {rows.length === 0 ? <Empty /> : (
              <div className="card flush">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>{t('name')}</th><th>{t('date')}</th><th>{t('code')}</th><th className="num">{t('qty')}</th>
                      <th className="num">{t('price')}</th><th className="num">{t('sum')}</th><th>{t('supplier')}</th><th>{t('contract_no')}</th><th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((x) => (
                      <tr key={x.id}>
                        <td className="main-cell">{x.name}</td>
                        <td data-l={t('date')} className="nowrap">{fmtDate(x.date)}</td>
                        <td data-l={t('code')} className="nowrap">{x.code || x.object}</td>
                        <td data-l={t('qty')} className="num">{fmtQty(x.qty)} {x.unit}</td>
                        <td data-l={t('price')} className="num">{x.price ? fmtMoney(x.price) : <span className="muted">{t('no_price')}</span>}</td>
                        <td data-l={t('sum')} className="num"><b>{x.price ? fmtMoney(x.qty * x.price) : ''}</b></td>
                        <td data-l={t('supplier')}>{x.supplier}</td>
                        <td data-l={t('contract_no')}>{x.contract_no}</td>
                        <td>{mayEdit && (
                          <button className="iconbtn" aria-label={`${t('edit')}: ${x.name}`} onClick={() => { setEditing(x); window.scrollTo(0, 0); }}>
                            <Icon name="edit" size={18} />
                          </button>
                        )}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {rows.length < total && (
              <p className="center"><button className="btn" onClick={() => setLimit(limit + PAGE)}>{t('more')} ({rows.length} / {total})</button></p>
            )}
          </>
        )}
      </Loaded>
    </>
  );
}

export function ReceiptsPage({ query }: { query: URLSearchParams }) {
  const { t } = useApp();
  return (
    <>
      <PageHead title={t('receipts')} sub={t('receipts_sub')} />
      <ReceiptsJournal objectId={query.get('object') ?? ''} />
    </>
  );
}
