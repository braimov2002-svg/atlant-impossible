import type { Dashboard } from '../../shared/types';
import { api, qs } from '../api';
import { fmtMoney, Icon, iso, Loaded, today, useApp, useLoad } from '../ui';
import { Folders } from './objects';

export function HomePage() {
  const { user, t } = useApp();
  const now = new Date();
  const from = iso(new Date(now.getFullYear(), now.getMonth(), 1));
  const q = useLoad(() => api<Dashboard>('GET', `/dashboard${qs({ from, to: today() })}`), []);
  return (
    <>
      <img className="banner" src="/banner.webp" alt="Atlant Construction" />
      <h1 style={{ margin: '16px 0 2px' }}>{t('hello')}, {user.name}</h1>
      <p className="muted" style={{ marginBottom: 14 }}>{t('slogan')}</p>
      <Loaded q={q}>
        {(d) => (
          <div className="stats">
            <a className="card dark" href="#/receipts">
              <p>{t('month_receipts')}</p>
              <p className="big">{fmtMoney(d.receipts.sum)} {t('sum_unit')}</p>
              <small>{t('records')}: {d.receipts.count}</small>
            </a>
            <a className="card" href="#/requests">
              <p>{t('open_requests')}</p>
              <p className="big">{d.badges.open_requests}</p>
              <small className="muted">{t('requests')}</small>
            </a>
            <a className="card" href="#/supply">
              <p>{t('pay_pending')}</p>
              <p className="big">{fmtMoney(d.payments.pending.sum)} {t('sum_unit')}</p>
              <small className="muted">{t('payments_count')}: {d.payments.pending.count} · {t('to_pay')}: {d.payments.approved.count}</small>
            </a>
          </div>
        )}
      </Loaded>
      <div className="line" style={{ alignItems: 'center' }}>
        <h2>{t('objects')}</h2>
        <a className="btn small" href="#/objects"><Icon name="folder" size={16} /> {t('all')}</a>
      </div>
      <Folders limit={8} />
    </>
  );
}
