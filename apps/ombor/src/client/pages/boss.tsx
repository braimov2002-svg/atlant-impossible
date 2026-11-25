import { useState } from 'react';
import type { Dashboard, Payment } from '../../shared/types';
import { api, qs } from '../api';
import { exportReceipts } from '../excel';
import type { Key } from '../i18n';
import { ErrorLine, fmtMoney, Icon, iso, Loaded, PageHead, today, useAction, useApp, useLoad } from '../ui';
import { PaymentRow } from './request-detail';

type Period = 'all' | 'year' | 'month' | 'today' | 'custom';
const PERIODS: [Period, Key][] = [['all', 'p_all'], ['year', 'p_year'], ['month', 'p_month'], ['today', 'p_today'], ['custom', 'p_custom']];

/** Management: money received and paid in a period, payments to approve, spend by object. */
export function BossPage() {
  const { t, lang } = useApp();
  const [period, setPeriod] = useState<Period>('month');
  const [custom, setCustom] = useState({ from: '', to: '' });
  const now = new Date();
  const range =
    period === 'all' ? { from: '', to: '' }
    : period === 'year' ? { from: `${now.getFullYear()}-01-01`, to: today() }
    : period === 'month' ? { from: iso(new Date(now.getFullYear(), now.getMonth(), 1)), to: today() }
    : period === 'today' ? { from: today(), to: today() }
    : custom;
  const d = useLoad(() => api<Dashboard>('GET', `/dashboard${qs(range)}`), [range.from, range.to]);
  const pending = useLoad(() => api<Payment[]>('GET', '/payments?status=pending'), []);
  const act = useAction();
  const label = period === 'month'
    ? now.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'uz-Cyrl-UZ', { month: 'short', year: 'numeric' })
    : t(PERIODS.find(([p]) => p === period)![1]);
  return (
    <>
      <PageHead title={t('boss')} sub={t('boss_sub')}>
        <button className="btn" disabled={act.busy} onClick={() => act.run(() => exportReceipts(range, t, `${t('receipts')} ${range.from || ''} ${range.to || ''}`.trim()))}>
          <Icon name="download" size={18} /> {t('report_excel')}
        </button>
      </PageHead>
      <ErrorLine text={act.error} />
      <div className="chips">
        {PERIODS.map(([p, key]) => (
          <button key={p} className={`chip${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>{t(key)}</button>
        ))}
      </div>
      {period === 'custom' && (
        <div className="card filters" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <input type="date" value={custom.from} onChange={(e) => setCustom({ ...custom, from: e.target.value })} aria-label={`${t('date')} ${t('from')}`} />
          <input type="date" value={custom.to} onChange={(e) => setCustom({ ...custom, to: e.target.value })} aria-label={`${t('date')} ${t('to')}`} />
        </div>
      )}
      <Loaded q={d}>
        {(x) => (
          <>
            <div className="card dark">
              <p>{t('receipts')}, {label}</p>
              <p className="big">{fmtMoney(x.receipts.sum)} {t('sum_unit')}</p>
              <small>{t('records')}: {x.receipts.count}{x.receipts.unpriced > 0 && ` · ${t('no_price')}: ${x.receipts.unpriced}`}</small>
            </div>
            <div className="stats">
              {([['pending', 'pay_pending'], ['approved', 'pay_approved'], ['paid', 'pay_paid']] as const).map(([s, key]) => (
                <div className="card" key={s}>
                  <p>{t(key)}{s === 'paid' && `, ${label}`}</p>
                  <p className="big">{fmtMoney(x.payments[s].sum)} {t('sum_unit')}</p>
                  <small className="muted">{t('payments_count')}: {x.payments[s].count}</small>
                </div>
              ))}
            </div>
            <Loaded q={pending}>
              {(rows) => rows.length === 0 ? null : (
                <>
                  <h2>{t('pay_pending')}</h2>
                  <div className="card flush list">
                    {rows.map((p) => <PaymentRow key={p.id} p={p} showRequest onChange={() => { pending.reload(); d.reload(); }} />)}
                  </div>
                </>
              )}
            </Loaded>
            <h2>{t('by_objects')}</h2>
            <div className="card flush list">
              {x.objects.map((o) => (
                <a key={o.id ?? 0} href={o.id ? `#/objects/${o.id}` : '#/receipts'} className="line">
                  <span><b>{o.name ?? t('no_object')}</b><br /><small className="muted">{t('records')}: {o.count}</small></span>
                  <b style={{ whiteSpace: 'nowrap' }}>{fmtMoney(o.sum)}</b>
                </a>
              ))}
            </div>
          </>
        )}
      </Loaded>
    </>
  );
}
