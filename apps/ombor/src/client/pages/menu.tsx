import { useState } from 'react';
import { api } from '../api';
import type { Key } from '../i18n';
import { ErrorLine, Field, Icon, PageHead, useAction, useApp } from '../ui';

export function MenuPage() {
  const { user, t, lang, setLang, signOut } = useApp();
  const [pw, setPw] = useState({ current: '', password: '' });
  const [open, setOpen] = useState<'password' | 'install' | null>(null);
  const [saved, setSaved] = useState(false);
  const act = useAction();
  const links: [string, string, Key][] = [
    ['/requests', 'list', 'requests'], ['/receipts', 'box', 'receipts'], ['/objects', 'building', 'objects'],
    ['/corrections', 'edit', 'corrections'], ['/supply', 'hand', 'supply'], ['/boss', 'bank', 'boss'],
    ...(user.role === 'admin' ? ([['/users', 'users', 'users'], ['/import', 'upload', 'import']] as [string, string, Key][]) : []),
  ];
  const change = () =>
    act.run(() => api('POST', '/auth/me', pw)).then((ok) => { if (ok) { setPw({ current: '', password: '' }); setSaved(true); } });
  return (
    <>
      <PageHead title={t('menu')} sub={`${user.name} · ${t(`role_${user.role}` as Key)}`} />
      <div className="card flush list">
        {links.map(([path, icon, key]) => (
          <a key={path} href={`#${path}`} className="line" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <Icon name={icon} /> <b>{t(key)}</b>
          </a>
        ))}
      </div>
      <div className="card">
        <div className="line" style={{ alignItems: 'center' }}>
          <b><Icon name="globe" size={18} /> {t('language')}</b>
          <div className="row" style={{ margin: 0 }}>
            {(['uz', 'ru'] as const).map((l) => (
              <button key={l} className={`chip${lang === l ? ' active' : ''}`} onClick={() => setLang(l)}>{l === 'uz' ? 'Ўзбекча' : 'Русский'}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <button className="btn" onClick={() => { setOpen(open === 'password' ? null : 'password'); setSaved(false); }}>
          <Icon name="key" size={18} /> {t('change_password')}
        </button>{' '}
        <button className="btn" onClick={() => setOpen(open === 'install' ? null : 'install')}><Icon name="phone" size={18} /> {t('install')}</button>
        {open === 'install' && <p className="muted" style={{ marginTop: 10 }}>{t('install_hint')}</p>}
        {open === 'password' && (
          <form className="form" style={{ marginTop: 12 }} onSubmit={(e) => { e.preventDefault(); void change(); }}>
            <Field label={t('current_password')}>
              <input type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} required />
            </Field>
            <Field label={t('new_password')} hint={t('password_hint')}>
              <input type="password" autoComplete="new-password" value={pw.password} onChange={(e) => setPw({ ...pw, password: e.target.value })} required />
            </Field>
            <div className="wide">
              <ErrorLine text={act.error} />
              {saved && <p className="ok">{t('saved')}</p>}
              <button className="btn primary" disabled={act.busy}>{t('save')}</button>
            </div>
          </form>
        )}
      </div>
      <button className="btn danger" onClick={signOut}><Icon name="out" size={18} /> {t('sign_out')}</button>
    </>
  );
}
