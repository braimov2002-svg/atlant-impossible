import { useState, type FormEvent } from 'react';
import type { Lang } from '../../shared/types';
import { api } from '../api';
import { errorText, translator } from '../i18n';
import { Field, Logo } from '../ui';

/** Sign-in; on the very first visit it creates the administrator instead. */
export function LoginPage({ setup, lang, setLang, onDone }: {
  setup: boolean; lang: Lang; setLang: (l: Lang) => void; onDone: () => void;
}) {
  const t = translator(lang);
  // The head of the warehouse runs the system and hands out the logins.
  const [f, setF] = useState({ login: '', name: setup ? 'Махамматов Бекзодбек' : '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('POST', setup ? '/auth/setup' : '/auth/login', f);
      onDone();
    } catch (err) {
      setError(errorText(err, t));
      setBusy(false);
    }
  };
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="login">
      <div className="login-art" role="img" aria-label="Atlant Construction" />
      <div className="login-box">
        <div className="lang">
          {(['uz', 'ru'] as const).map((l) => (
            <button key={l} type="button" className={`chip${lang === l ? ' active' : ''}`} onClick={() => setLang(l)}>
              {l === 'uz' ? 'Ўзбекча' : 'Русский'}
            </button>
          ))}
        </div>
        <form onSubmit={submit}>
          <div className="login-brand">
            <Logo size={48} />
            <div>
              <h1 style={{ fontSize: 22 }}>{t('app')}</h1>
              <p className="muted">ООО «Atlant Construction»</p>
            </div>
          </div>
          {setup && (
            <div>
              <h2 style={{ margin: '4px 0' }}>{t('setup_title')}</h2>
              <p className="muted">{t('setup_hint')}</p>
            </div>
          )}
          {setup && (
            <Field label={t('full_name')}>
              <input value={f.name} onChange={set('name')} required autoComplete="name" />
            </Field>
          )}
          <Field label={t('login')}>
            <input value={f.login} onChange={set('login')} required autoCapitalize="none" autoCorrect="off" autoComplete="username" />
          </Field>
          <Field label={t('password')} hint={setup ? t('password_hint') : undefined}>
            <input type="password" value={f.password} onChange={set('password')} required
              autoComplete={setup ? 'new-password' : 'current-password'} />
          </Field>
          {error && <p className="err" role="alert">{error}</p>}
          <button className="btn primary" disabled={busy}>{t(setup ? 'create_admin' : 'sign_in')}</button>
          <p className="muted center" style={{ marginTop: 8 }}>{t('slogan')}</p>
        </form>
      </div>
    </div>
  );
}
