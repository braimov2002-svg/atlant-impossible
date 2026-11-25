import { useState } from 'react';
import type { Payment, PaymentStatus, RequestSummary } from '../../shared/types';
import { api } from '../api';
import type { Key } from '../i18n';
import { Empty, fmtDate, Loaded, PageHead, RequestBadge, useApp, useLoad } from '../ui';
import { PaymentRow } from './request-detail';

const TABS: [PaymentStatus, Key][] = [['pending', 'pay_pending'], ['approved', 'pay_approved'], ['paid', 'pay_paid'], ['rejected', 'pay_rejected']];

/** Payments by state, and the requests still waiting for a payment. */
export function SupplyPage() {
  const { t, badges } = useApp();
  const [tab, setTab] = useState<PaymentStatus>(badges.pending === 0 && badges.to_pay > 0 ? 'approved' : 'pending');
  const payments = useLoad(() => api<Payment[]>('GET', `/payments?status=${tab}`), [tab]);
  const open = useLoad(() => api<{ rows: RequestSummary[] }>('GET', '/requests?status=open&limit=100'), []);
  return (
    <>
      <PageHead title={t('supply')} sub={t('supply_sub')} />
      <div className="chips">
        {TABS.map(([s, key]) => (
          <button key={s} className={`chip${tab === s ? ' active' : ''}`} onClick={() => setTab(s)}>
            {t(key)}{s === 'pending' && badges.pending > 0 && ` (${badges.pending})`}{s === 'approved' && badges.to_pay > 0 && ` (${badges.to_pay})`}
          </button>
        ))}
      </div>
      <Loaded q={payments}>
        {(rows) => rows.length === 0 ? <Empty /> : (
          <div className="card flush list">
            {rows.map((p) => <PaymentRow key={p.id} p={p} showRequest onChange={() => { payments.reload(); open.reload(); }} />)}
          </div>
        )}
      </Loaded>
      <h2>{t('open_requests')}</h2>
      <Loaded q={open}>
        {({ rows }) => rows.length === 0 ? <Empty /> : (
          <div className="card flush list">
            {rows.map((r) => (
              <a key={r.id} href={`#/requests/${r.id}`}>
                <div className="line">
                  <div><div className="title">{r.number}</div><div>{r.object}</div></div>
                  <small className="muted">{fmtDate(r.date)}</small>
                </div>
                <div className="meta">
                  <RequestBadge status={r.status} />
                  <span>{r.item_count} {t('positions')}</span>
                  {r.pending_payments > 0 && <span>{t('pay_pending')}: {r.pending_payments}</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </Loaded>
    </>
  );
}
