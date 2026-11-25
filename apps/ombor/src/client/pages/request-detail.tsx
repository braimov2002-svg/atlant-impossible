import { useState } from 'react';
import type { Payment, RequestDetail } from '../../shared/types';
import { api } from '../api';
import { exportRequest } from '../excel';
import type { Key } from '../i18n';
import {
  can, ErrorLine, Field, fmtDate, fmtMoney, fmtQty, go, Icon, Loaded, PageHead, PaymentBadge, RequestBadge, Suggest,
  useAction, useApp, useLoad,
} from '../ui';

const STEPS = ['open', 'approved', 'received'] as const;

export function Stepper({ status }: { status: RequestDetail['status'] }) {
  const { t } = useApp();
  const at = STEPS.indexOf(status);
  return (
    <div className="card steps">
      {STEPS.map((s, i) => (
        <div key={s} className={`step${i < at || (i === at && at === 2) ? ' done' : i === at ? ' now' : ''}`}>
          <i>{i < at || (i === at && at === 2) ? <Icon name="check" size={16} /> : i + 1}</i>
          {t(`st_${s}` as Key)}
        </div>
      ))}
    </div>
  );
}

/** One payment with the buttons the current user may press. */
export function PaymentRow({ p, onChange, showRequest }: { p: Payment; onChange: () => void; showRequest?: boolean }) {
  const { user, t, refreshBadges } = useApp();
  const act = useAction();
  const call = (method: string, path: string, body?: unknown) =>
    act.run(() => api(method, `/payments/${p.id}${path}`, body)).then((ok) => { if (ok) { onChange(); refreshBadges(); } });
  const rights = can(user);
  return (
    <div>
      <div className="line">
        <div>
          <div className="title">{fmtMoney(p.amount)} {t('sum_unit')}</div>
          <div>{p.supplier}</div>
        </div>
        <PaymentBadge status={p.status} />
      </div>
      <div className="meta">
        {showRequest && <a href={`#/requests/${p.request_id}`}><b>{p.request_number}</b></a>}
        {showRequest && p.object && <span>{p.object}</span>}
        <span>{fmtDate(p.created_at)}</span>
        {p.created_by_name && <span>{p.created_by_name}</span>}
        {p.note && <span>{p.note}</span>}
      </div>
      <ErrorLine text={act.error} />
      <div className="row no-print">
        {p.status === 'pending' && rights.decide && (
          <>
            <button className="btn primary small" disabled={act.busy} onClick={() => call('POST', '/decide', { approve: true })}>
              <Icon name="check" size={16} /> {t('approve')}
            </button>
            <button className="btn danger small" disabled={act.busy} onClick={() => call('POST', '/decide', { approve: false })}>
              <Icon name="x" size={16} /> {t('reject')}
            </button>
          </>
        )}
        {p.status === 'approved' && rights.markPaid && (
          <button className="btn primary small" disabled={act.busy} onClick={() => call('POST', '/paid')}>{t('mark_paid')}</button>
        )}
        {p.status === 'pending' && rights.pay && (
          <button className="btn small" disabled={act.busy} onClick={() => confirm(t('confirm_delete')) && call('DELETE', '')}>{t('delete')}</button>
        )}
      </div>
    </div>
  );
}

function PaymentForm({ requestId, onDone }: { requestId: number; onDone: (saved: boolean) => void }) {
  const { t, refreshBadges } = useApp();
  const [f, setF] = useState({ supplier: '', amount: '', note: '' });
  const suppliers = useLoad(() => api<{ name: string }[]>('GET', '/suppliers'), []);
  const act = useAction();
  const save = () =>
    act.run(() => api('POST', '/payments', { request_id: requestId, ...f })).then((ok) => { if (ok) { refreshBadges(); onDone(true); } });
  return (
    <form className="form" style={{ padding: 14 }} onSubmit={(e) => { e.preventDefault(); void save(); }}>
      <Field label={t('supplier')}>
        <Suggest id="suppliers" value={f.supplier} onChange={(v) => setF({ ...f, supplier: v })} options={(suppliers.data ?? []).map((s) => s.name)} required />
      </Field>
      <Field label={`${t('amount')}, ${t('sum_unit')}`}>
        <input inputMode="decimal" value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value })} required />
      </Field>
      <Field label={t('note')} wide><input value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></Field>
      <div className="wide">
        <ErrorLine text={act.error} />
        <div className="row" style={{ margin: 0 }}>
          <button className="btn primary" disabled={act.busy}>{t('ask_payment')}</button>
          <button type="button" className="btn" onClick={() => onDone(false)}>{t('cancel')}</button>
        </div>
      </div>
    </form>
  );
}

export function RequestDetailPage({ id }: { id: number }) {
  const { user, t } = useApp();
  const q = useLoad(() => api<RequestDetail>('GET', `/requests/${id}`), [id]);
  const [paying, setPaying] = useState(false);
  const act = useAction();
  const rights = can(user);
  return (
    <Loaded q={q}>
      {(r) => {
        const post = (path: string) => act.run(() => api('POST', `/requests/${id}/${path}`)).then((ok) => ok && q.reload());
        const remove = () => confirm(t('confirm_delete')) &&
          act.run(() => api('DELETE', `/requests/${id}`)).then((ok) => ok && go('/requests'));
        return (
          <>
            <div className="no-print">
              <PageHead back="/requests" title={r.number}>
                <RequestBadge status={r.status} />
                <small className="muted">{t(`hint_${r.status}` as Key)}</small>
              </PageHead>
              <div className="card">
                <p>
                  {t('date')}: <b>{fmtDate(r.date)}</b> · {t('object')}: <b>{r.object}</b>
                  {r.created_by_name && <> · {t('created_by')}: {r.created_by_name}</>}
                </p>
                {r.note && <p className="muted" style={{ marginTop: 4 }}>{r.note}</p>}
                <div className="row">
                  <button className="btn" onClick={() => window.print()}><Icon name="print" size={18} /> {t('print')}</button>
                  <button className="btn" onClick={() => window.print()}><Icon name="download" size={18} /> {t('pdf')}</button>
                  <button className="btn" onClick={() => exportRequest(id, t)}><Icon name="download" size={18} /> {t('excel')}</button>
                  {rights.requests && <a className="btn" href={`#/requests/${id}/edit`}><Icon name="edit" size={18} /> {t('edit')}</a>}
                </div>
                <div className="row">
                  {rights.receive && r.status !== 'received' && (
                    <a className="btn primary" href={`#/requests/${id}/receive`}><Icon name="box" size={18} /> {t('receive')}</a>
                  )}
                  {rights.receive && r.status !== 'received' && (
                    <button className="btn" disabled={act.busy} onClick={() => confirm(t('close_confirm')) && post('close')}>{t('close_request')}</button>
                  )}
                  {rights.receive && r.status === 'received' && (
                    <button className="btn" disabled={act.busy} onClick={() => post('reopen')}>{t('reopen')}</button>
                  )}
                  {rights.requests && (
                    <button className="btn danger" disabled={act.busy} onClick={remove}><Icon name="trash" size={18} /> {t('delete')}</button>
                  )}
                </div>
                <ErrorLine text={act.error} />
              </div>
              <Stepper status={r.status} />

              <div className="card flush list">
                {r.items.map((it, i) => {
                  const left = Math.max(0, it.qty - it.received);
                  return (
                    <div key={it.id}>
                      <div className="line">
                        <div>
                          <h3><span className="muted">{i + 1}.</span> {it.name}</h3>
                          {it.spec && <small className="muted">{it.spec}</small>}
                        </div>
                        <span className="tag">{t(it.received <= 0 ? 'new_badge' : left > 0 ? 'partly' : 'done')}</span>
                      </div>
                      <div className="nums">
                        <div><span>{t('asked')}</span><b>{fmtQty(it.qty)} {it.unit}</b></div>
                        <div><span>{t('arrived')}</span><b>{fmtQty(it.received)}</b></div>
                        <div><span>{t('left')}</span><b>{fmtQty(left)}</b></div>
                      </div>
                      <small className="muted">
                        {[it.place, it.work].filter(Boolean).join(' · ')}
                        {it.ordered_by && <><br />{t('ordered_by')}: {it.ordered_by}</>}
                        {it.executor && <><br />{t('executor')}: {it.executor}</>}
                      </small>
                    </div>
                  );
                })}
              </div>

              <div className="line" style={{ alignItems: 'center' }}>
                <h2>{t('payments')}</h2>
                {rights.pay && !paying && (
                  <button className="btn small" onClick={() => setPaying(true)}><Icon name="plus" size={16} /> {t('ask_payment')}</button>
                )}
              </div>
              {(paying || r.payments.length > 0) && (
                <div className="card flush list">
                  {paying && <PaymentForm requestId={id} onDone={(saved) => { setPaying(false); if (saved) q.reload(); }} />}
                  {r.payments.map((p) => <PaymentRow key={p.id} p={p} onChange={q.reload} />)}
                </div>
              )}
            </div>
            <PrintSheet r={r} />
          </>
        );
      }}
    </Loaded>
  );
}

/** The paper form of a request, shown only when printing (or saving as PDF). */
function PrintSheet({ r }: { r: RequestDetail }) {
  return (
    <div className="print-only sheet">
      <h2>ЗАЯВКА / БУЮРТМА № {r.number}</h2>
      <p style={{ textAlign: 'center' }}>ООО «Atlant Construction» · Объект: {r.object} · Дата / Сана: {fmtDate(r.date)}</p>
      <table>
        <thead>
          <tr>
            <th>№</th><th>Описание и технические характеристики</th><th>Ед. изм.</th><th>Кол-во</th>
            <th>Место использования</th><th>Описание работы</th><th>Кто заказал</th><th>Характеристика</th><th>Исполнитель (снабженец)</th>
          </tr>
        </thead>
        <tbody>
          {r.items.map((it, i) => (
            <tr key={it.id}>
              <td>{i + 1}</td><td>{it.name}</td><td>{it.unit}</td><td>{fmtQty(it.qty)}</td>
              <td>{it.place}</td><td>{it.work}</td><td>{it.ordered_by}</td><td>{it.spec}</td><td>{it.executor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {r.note && <p style={{ marginTop: 8 }}>Примечание: {r.note}</p>}
      <div className="signs">
        <span>Заявку составил: ____________________</span>
        <span>Снабженец: ____________________</span>
        <span>Руководитель: ____________________</span>
      </div>
    </div>
  );
}
