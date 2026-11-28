import { useState } from 'react';
import type { FileInfo, Payment, RequestDetail } from '../../shared/types';
import { api, upload } from '../api';
import { exportRequest } from '../excel';
import type { Key } from '../i18n';
import {
  can, ErrorLine, Field, fmtDate, fmtMoney, fmtStamp, fmtQty, go, Icon, Loaded, PageHead, PaymentBadge, RequestBadge, Suggest,
  useAction, useApp, useLoad,
} from '../ui';

const STEPS = ['open', 'approved', 'received'] as const;

// The PDF code (with its font) is loaded only when someone asks for a PDF.
const pdf = () => import('../pdf');
const shareable = typeof navigator.canShare === 'function';

const fileSize = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)} МБ` : `${Math.max(1, Math.round(n / 1024))} КБ`);

/** Contracts attached to the request: anyone may open them; supply and the warehouse add them. */
function Documents({ requestId, files, onChange }: { requestId: number; files: FileInfo[]; onChange: () => void }) {
  const { user, t } = useApp();
  const act = useAction();
  const add = async (list: FileList | null) => {
    if (!list?.length) return;
    // Several files may be picked at once; they go up one after another.
    await act.run(async () => { for (const f of Array.from(list)) await upload(`/requests/${requestId}/files`, f); });
    onChange();
  };
  const remove = (f: FileInfo) => confirm(t('confirm_delete')) && act.run(() => api('DELETE', `/files/${f.id}`)).then((ok) => ok && onChange());
  return (
    <>
      <div className="line" style={{ alignItems: 'center' }}>
        <h2>{t('documents')}</h2>
        {can(user).attach && (
          <label className={`btn small${act.busy ? ' busy' : ''}`}>
            <Icon name="upload" size={16} /> {act.busy ? t('uploading') : t('attach')}
            <input type="file" hidden multiple disabled={act.busy} accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx"
              onChange={(e) => { void add(e.target.files); e.target.value = ''; }} />
          </label>
        )}
      </div>
      <ErrorLine text={act.error} />
      <div className="card flush list">
        {files.length === 0 && <p className="muted">{t('no_documents')}{can(user).attach && <><br /><small>{t('attach_hint')}</small></>}</p>}
        {files.map((f) => (
          <div key={f.id} className="line" style={{ alignItems: 'center' }}>
            <a href={`/api/files/${f.id}`} target="_blank" rel="noopener" className="line" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
              <Icon name="file" />
              <span>
                <b style={{ whiteSpace: 'normal', overflowWrap: 'anywhere' }}>{f.name}</b>
                <span className="meta" style={{ marginTop: 0 }}>
                  <span>{fileSize(f.size)}</span><span>{fmtStamp(f.created_at)}</span>{f.uploaded_by_name && <span>{f.uploaded_by_name}</span>}
                </span>
              </span>
            </a>
            {can(user).attach && (user.role === 'admin' || f.uploaded_by === user.id) && (
              <button className="iconbtn" disabled={act.busy} aria-label={`${t('delete')}: ${f.name}`} onClick={() => remove(f)}><Icon name="trash" size={18} /></button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

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
        <span>{fmtStamp(p.created_at)}</span>
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
                  <button className="btn accent" disabled={act.busy} onClick={() => act.run(async () => (await pdf()).downloadRequestPdf(id, t))}>
                    <Icon name="download" size={18} /> {t('pdf')}
                  </button>
                  {shareable && (
                    <button className="btn" disabled={act.busy} onClick={() => act.run(async () => (await pdf()).shareRequestPdf(id, t))}>
                      <Icon name="share" size={18} /> {t('share')}
                    </button>
                  )}
                  <button className="btn" onClick={() => window.print()}><Icon name="print" size={18} /> {t('print')}</button>
                  <button className="btn" onClick={() => exportRequest(id, t)}><Icon name="download" size={18} /> {t('excel')}</button>
                  {rights.changeRequest(r.created_by) && <a className="btn" href={`#/requests/${id}/edit`}><Icon name="edit" size={18} /> {t('edit')}</a>}
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
                  {rights.changeRequest(r.created_by) && (
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

              {r.receipts.length > 0 && (
                <>
                  <div className="line" style={{ alignItems: 'center' }}>
                    <h2>{t('receipts')}</h2>
                    <b>{fmtMoney(r.sum)} {t('sum_unit')}</b>
                  </div>
                  <div className="card flush">
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>{t('name')}</th><th>{t('date')}</th><th className="num">{t('qty')}</th><th className="num">{t('price')}</th>
                          <th className="num">{t('sum')}</th><th>{t('supplier')}</th><th>{t('contract_no')}</th><th>{t('invoice_no')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {r.receipts.map((x) => (
                          <tr key={x.id}>
                            <td className="main-cell">{x.name}</td>
                            <td data-l={t('date')} className="nowrap">{fmtDate(x.date)}</td>
                            <td data-l={t('qty')} className="num">{fmtQty(x.qty)} {x.unit}</td>
                            <td data-l={t('price')} className="num">{x.price ? fmtMoney(x.price) : <span className="muted">{t('no_price')}</span>}</td>
                            <td data-l={t('sum')} className="num"><b>{x.price ? fmtMoney(x.qty * x.price) : ''}</b></td>
                            <td data-l={t('supplier')}>{x.supplier}</td>
                            <td data-l={t('contract_no')}>{x.contract_no}</td>
                            <td data-l={t('invoice_no')}>{x.invoice_no}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <Documents requestId={id} files={r.files} onChange={q.reload} />

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
      <div className="sheet-head">
        <img src="/logo.png" alt="Atlant Construction" />
        <div>
          <h2>ЗАЯВКА № {r.number}</h2>
          <p>Объект: {r.object} · Дата / Сана: {fmtDate(r.date)}</p>
        </div>
      </div>
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
