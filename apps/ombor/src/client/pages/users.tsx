import { useState } from 'react';
import { ROLES, type Role, type User } from '../../shared/types';
import { api } from '../api';
import type { Key } from '../i18n';
import { ErrorLine, Field, Icon, Loaded, PageHead, useAction, useApp, useLoad } from '../ui';

function UserForm({ user, onDone }: { user?: User; onDone: (saved: boolean) => void }) {
  const { t } = useApp();
  const [f, setF] = useState({ login: user?.login ?? '', name: user?.name ?? '', role: (user?.role ?? 'warehouse') as Role, password: '', active: user ? !!user.active : true });
  const act = useAction();
  const save = () => act.run(() => (user ? api('PUT', `/users/${user.id}`, f) : api('POST', '/users', f))).then((ok) => ok && onDone(true));
  return (
    <form className="card form" onSubmit={(e) => { e.preventDefault(); void save(); }}>
      <Field label={t('full_name')}><input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required /></Field>
      <Field label={t('role')}>
        <select value={f.role} onChange={(e) => setF({ ...f, role: e.target.value as Role })}>
          {ROLES.map((r) => <option key={r} value={r}>{t(`role_${r}` as Key)}</option>)}
        </select>
      </Field>
      <Field label={t('login')}>
        <input value={f.login} onChange={(e) => setF({ ...f, login: e.target.value })} required disabled={!!user} autoCapitalize="none" autoComplete="off" />
      </Field>
      <Field label={user ? t('reset_password') : t('password')} hint={t('password_hint')}>
        <input type="text" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required={!user} autoComplete="off" />
      </Field>
      {user && (
        <label className="row wide" style={{ margin: 0 }}>
          <input type="checkbox" style={{ width: 20, minHeight: 20 }} checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} /> {t('active')}
        </label>
      )}
      <div className="wide">
        <ErrorLine text={act.error} />
        <div className="row" style={{ margin: 0 }}>
          <button className="btn primary" disabled={act.busy}>{t('save')}</button>
          <button type="button" className="btn" onClick={() => onDone(false)}>{t('cancel')}</button>
        </div>
      </div>
    </form>
  );
}

export function UsersPage() {
  const { t } = useApp();
  const q = useLoad(() => api<User[]>('GET', '/users'), []);
  const [editing, setEditing] = useState<User | 'new' | null>(null);
  const done = (saved: boolean) => { setEditing(null); if (saved) q.reload(); };
  return (
    <>
      <PageHead back="/menu" title={t('users')}>
        {!editing && <button className="btn primary" onClick={() => setEditing('new')}><Icon name="plus" size={18} /> {t('new_user')}</button>}
      </PageHead>
      {editing && <UserForm key={editing === 'new' ? 'new' : editing.id} user={editing === 'new' ? undefined : editing} onDone={done} />}
      <Loaded q={q}>
        {(rows) => (
          <div className="card flush list">
            {rows.map((u) => (
              <div key={u.id} className="line" style={{ alignItems: 'center' }}>
                <div>
                  <b>{u.name}</b> {!u.active && <span className="tag">{t('disabled')}</span>}
                  <div className="meta"><span>{u.login}</span><span>{t(`role_${u.role}` as Key)}</span></div>
                </div>
                <button className="iconbtn" aria-label={`${t('edit')}: ${u.name}`} onClick={() => { setEditing(u); window.scrollTo(0, 0); }}><Icon name="edit" size={18} /></button>
              </div>
            ))}
          </div>
        )}
      </Loaded>
    </>
  );
}
