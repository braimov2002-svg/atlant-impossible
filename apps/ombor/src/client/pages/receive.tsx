import { useState } from 'react';
import type { RequestDetail } from '../../shared/types';
import { api } from '../api';
import { ErrorLine, Field, fmtMoney, fmtQty, go, Loaded, PageHead, Suggest, today, useAction, useApp, useLoad } from '../ui';

/** Goods of a request arrived: enter what came, it goes into the receipts journal. */
export function ReceivePage({ id }: { id: number }) {
  const { t, refreshBadges } = useApp();
  const q = useLoad(() => api<RequestDetail>('GET', `/requests/${id}`), [id]);
  const suppliers = useLoad(() => api<{ name: string }[]>('GET', '/suppliers'), []);
  const [f, setF] = useState({ date: today(), supplier: '', invoice_no: '', contract_no: '', vehicle: '', vehicle_date: '', note: '' });
  const [lines, setLines] = useState<Record<number, { qty?: string; price?: string }>>({});
  const act = useAction();
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const num = (s: string | undefined) => Number(String(s ?? '').replace(/\s/g, '').replace(',', '.')) || 0;

  return (
    <Loaded q={q}>
      {(r) => {
        // What is still expected is filled in; the user corrects it.
        const qtyOf = (itemId: number, left: number) => lines[itemId]?.qty ?? (left > 0 ? String(left) : '');
        const total = r.items.reduce((a, it) => a + num(qtyOf(it.id, it.qty - it.received)) * num(lines[it.id]?.price), 0);
        const save = () =>
          act.run(async () => {
            await api('POST', `/requests/${id}/receive`, {
              ...f,
              lines: r.items.map((it) => ({ item_id: it.id, qty: qtyOf(it.id, it.qty - it.received), price: lines[it.id]?.price ?? '' })),
            });
            refreshBadges();
            go(`/requests/${id}`);
          });
        return (
          <form onSubmit={(e) => { e.preventDefault(); void save(); }}>
            <PageHead back={`/requests/${id}`} title={t('receive_title')} sub={`${r.number} · ${r.object ?? ''}`} />
            <div className="card form">
              <Field label={t('date')}><input type="date" value={f.date} onChange={set('date')} required /></Field>
              <Field label={t('supplier')}>
                <Suggest id="suppliers" value={f.supplier} onChange={(v) => setF({ ...f, supplier: v })} options={(suppliers.data ?? []).map((s) => s.name)} />
              </Field>
              <Field label={t('invoice_no')}><input value={f.invoice_no} onChange={set('invoice_no')} /></Field>
              <Field label={t('contract_no')}><input value={f.contract_no} onChange={set('contract_no')} /></Field>
              <Field label={t('vehicle')}><input value={f.vehicle} onChange={set('vehicle')} /></Field>
              <Field label={t('vehicle_date')}><input type="date" value={f.vehicle_date} onChange={set('vehicle_date')} /></Field>
              <Field label={t('note')} wide><input value={f.note} onChange={set('note')} /></Field>
            </div>
            <p className="muted" style={{ margin: '4px 0 10px' }}>{t('receive_hint')}</p>
            {r.items.map((it, i) => {
              const left = Math.max(0, it.qty - it.received);
              return (
                <div className="item-edit" key={it.id}>
                  <h3><span className="muted">{i + 1}.</span> {it.name}</h3>
                  <small className="muted">{t('asked')}: {fmtQty(it.qty)} {it.unit} · {t('arrived')}: {fmtQty(it.received)} · {t('left')}: {fmtQty(left)}</small>
                  <div className="form" style={{ marginTop: 8 }}>
                    <Field label={`${t('arrived')}, ${it.unit}`}>
                      <input inputMode="decimal" value={qtyOf(it.id, left)} aria-label={`${t('arrived')} ${it.name}`}
                        onChange={(e) => setLines({ ...lines, [it.id]: { ...lines[it.id], qty: e.target.value } })} />
                    </Field>
                    <Field label={t('price')}>
                      <input inputMode="decimal" value={lines[it.id]?.price ?? ''} aria-label={`${t('price')} ${it.name}`}
                        onChange={(e) => setLines({ ...lines, [it.id]: { ...lines[it.id], price: e.target.value } })} />
                    </Field>
                  </div>
                </div>
              );
            })}
            <p><b>{t('total')}: {fmtMoney(total)} {t('sum_unit')}</b></p>
            <ErrorLine text={act.error} />
            <div className="row">
              <button className="btn primary" disabled={act.busy}>{t('receive')}</button>
              <a className="btn" href={`#/requests/${id}`}>{t('cancel')}</a>
            </div>
          </form>
        );
      }}
    </Loaded>
  );
}
