import { useEffect, useState } from 'react';
import type { RequestStatus, RequestSummary } from '../../shared/types';
import { api, qs } from '../api';
import { exportRequest } from '../excel';
import { can, Empty, fmtDate, Icon, Loaded, PageHead, RequestBadge, useApp, useLoad } from '../ui';

const PAGE = 30;

/** Searchable list of requests; with objectId it is the inside of an object's folder. */
export function RequestList({ objectId }: { objectId?: number }) {
  const { t } = useApp();
  const [f, setF] = useState({ q: '', status: '' as RequestStatus | '', from: '', to: '' });
  const [q, setQ] = useState(''); // typed text, applied after a short pause
  const [limit, setLimit] = useState(PAGE);
  useEffect(() => {
    const timer = setTimeout(() => setF((x) => ({ ...x, q })), 300);
    return () => clearTimeout(timer);
  }, [q]);
  const list = useLoad(
    () => api<{ rows: RequestSummary[]; total: number }>('GET', `/requests${qs({ ...f, object_id: objectId, limit })}`),
    [f, objectId, limit],
  );
  return (
    <>
      <div className="card filters">
        <div className="search">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search_requests')} aria-label={t('search')} />
        </div>
        <select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as RequestStatus | '' })} aria-label={t('all_statuses')}>
          <option value="">{t('all_statuses')}</option>
          <option value="open">{t('st_open')}</option>
          <option value="approved">{t('st_approved')}</option>
          <option value="received">{t('st_received')}</option>
        </select>
        <input type="date" value={f.from} onChange={(e) => setF({ ...f, from: e.target.value })} aria-label={`${t('date')} ${t('from')}`} />
        <input type="date" value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} aria-label={`${t('date')} ${t('to')}`} />
      </div>
      <Loaded q={list}>
        {({ rows, total }) =>
          rows.length === 0 ? <Empty /> : (
            <>
              <div className="card flush list">
                {rows.map((r) => (
                  <a key={r.id} href={`#/requests/${r.id}`}>
                    <div className="line">
                      <div>
                        <div className="title">{r.number}</div>
                        <div>{r.object}</div>
                      </div>
                      <div className="line" style={{ alignItems: 'center', gap: 2 }}>
                        <small className="muted">{fmtDate(r.date)}</small>
                        <button className="iconbtn" title="Excel" aria-label={`Excel ${r.number}`}
                          onClick={(e) => { e.preventDefault(); void exportRequest(r.id, t); }}>
                          <Icon name="download" size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="meta">
                      <RequestBadge status={r.status} />
                      <span>{r.item_count} {t('positions')}</span>
                    </div>
                  </a>
                ))}
              </div>
              {rows.length < total && (
                <p className="center">
                  <button className="btn" onClick={() => setLimit(limit + PAGE)}>{t('more')} ({rows.length} / {total})</button>
                </p>
              )}
            </>
          )}
      </Loaded>
    </>
  );
}

export function RequestsPage() {
  const { user, t } = useApp();
  return (
    <>
      <PageHead title={t('requests')} sub={t('requests_sub')}>
        {can(user).requests && (
          <a className="btn primary" href="#/requests/new"><Icon name="plus" size={18} /> {t('new_request')}</a>
        )}
      </PageHead>
      <RequestList />
    </>
  );
}
