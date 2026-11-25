import { useState } from 'react';
import type { ObjectFolder } from '../../shared/types';
import { api } from '../api';
import { can, Empty, ErrorLine, Field, fmtMoney, go, Icon, Loaded, PageHead, useAction, useApp, useLoad } from '../ui';
import { RequestList } from './requests';

/** Objects as folders: opening one shows that object's requests. */
export function Folders({ limit, reloadKey }: { limit?: number; reloadKey?: number }) {
  const { t } = useApp();
  const q = useLoad(() => api<ObjectFolder[]>('GET', '/objects'), [reloadKey]);
  return (
    <Loaded q={q}>
      {(all) => {
        // On the home page: the busiest objects first.
        const rows = limit ? [...all].filter((o) => o.active).sort((a, b) => b.requests - a.requests || b.receipts - a.receipts).slice(0, limit) : all;
        return rows.length === 0 ? <Empty /> : (
          <div className={`grid${limit ? '' : ' wide'}`}>
            {rows.map((o) => (
              <a key={o.id} className={`folder${o.active ? '' : ' off'}`} href={`#/objects/${o.id}`}>
                <Icon name="folder" size={26} />
                <b>{o.name}</b>
                <small className="muted">
                  {o.requests} {t('requests_n')}{o.open_requests > 0 && ` · ${o.open_requests} ${t('open_n')}`}
                </small>
                {!limit && <div><small className="muted">{t('receipts')}: {fmtMoney(o.sum)} {t('sum_unit')}</small></div>}
              </a>
            ))}
          </div>
        );
      }}
    </Loaded>
  );
}

function ObjectForm({ object, others = [], onDone }: { object?: ObjectFolder; others?: ObjectFolder[]; onDone: () => void }) {
  const { t } = useApp();
  const [into, setInto] = useState('');
  const merge = () => confirm(t('merge_confirm')) &&
    act.run(() => api('POST', `/objects/${object!.id}/merge`, { into: Number(into) })).then((ok) => ok && go(`/objects/${into}`));
  const [f, setF] = useState({ name: object?.name ?? '', prefix: object?.prefix ?? 'АС', active: object ? !!object.active : true });
  const act = useAction();
  const save = () =>
    act.run(() => (object ? api('PUT', `/objects/${object.id}`, f) : api('POST', '/objects', f))).then((ok) => ok && onDone());
  return (
    <form className="card form" onSubmit={(e) => { e.preventDefault(); void save(); }}>
      <Field label={t('object_name')}><input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required /></Field>
      <Field label={t('prefix')} hint={t('prefix_hint')}><input value={f.prefix} onChange={(e) => setF({ ...f, prefix: e.target.value })} /></Field>
      {object && (
        <label className="row wide" style={{ margin: 0 }}>
          <input type="checkbox" style={{ width: 20, minHeight: 20 }} checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} /> {t('active')}
        </label>
      )}
      <div className="wide">
        <ErrorLine text={act.error} />
        <div className="row" style={{ margin: 0 }}>
          <button className="btn primary" disabled={act.busy}>{t('save')}</button>
          <button type="button" className="btn" onClick={onDone}>{t('cancel')}</button>
        </div>
      </div>
      {object && others.length > 0 && (
        <div className="wide" style={{ borderTop: '1px solid var(--line)', paddingTop: 12 }}>
          <Field label={t('merge_into')} hint={t('merge_hint')}>
            <select value={into} onChange={(e) => setInto(e.target.value)}>
              <option value="" />
              {others.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </Field>
          <button type="button" className="btn danger" style={{ marginTop: 8 }} disabled={!into || act.busy} onClick={merge}>{t('merge')}</button>
        </div>
      )}
    </form>
  );
}

export function ObjectsPage() {
  const { user, t } = useApp();
  const [adding, setAdding] = useState(false);
  const [key, setKey] = useState(0);
  return (
    <>
      <PageHead title={t('objects')} sub={t('objects_sub')}>
        {can(user).objects && !adding && (
          <button className="btn primary" onClick={() => setAdding(true)}><Icon name="plus" size={18} /> {t('new_object')}</button>
        )}
      </PageHead>
      {adding && <ObjectForm onDone={() => { setAdding(false); setKey(key + 1); }} />}
      <Folders reloadKey={key} />
    </>
  );
}

export function ObjectPage({ id }: { id: number }) {
  const { user, t } = useApp();
  const [editing, setEditing] = useState(false);
  const q = useLoad(() => api<ObjectFolder[]>('GET', '/objects').then((all) => ({ o: all.find((x) => x.id === id) ?? null, all })), [id]);
  return (
    <Loaded q={q}>
      {({ o, all }) => !o ? <Empty /> : (
        <>
          <PageHead back="/objects" title={o.name}
            sub={`${o.requests} ${t('requests_n')} · ${t('receipts')}: ${fmtMoney(o.sum)} ${t('sum_unit')}`}>
            {can(user).requests && <a className="btn primary" href={`#/requests/new?object=${o.id}`}><Icon name="plus" size={18} /> {t('new_request')}</a>}
            <a className="btn" href={`#/receipts?object=${o.id}`}><Icon name="box" size={18} /> {t('receipts')} ({o.receipts})</a>
            {can(user).objects && !editing && <button className="btn" onClick={() => setEditing(true)}><Icon name="edit" size={18} /> {t('edit')}</button>}
          </PageHead>
          {editing && <ObjectForm object={o} others={all.filter((x) => x.id !== id)} onDone={() => { setEditing(false); q.reload(); }} />}
          <RequestList objectId={id} />
        </>
      )}
    </Loaded>
  );
}
