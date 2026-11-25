import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { Lang, User } from '../shared/types';
import { api } from './api';
import { translator, type Key } from './i18n';
import { BossPage } from './pages/boss';
import { HomePage } from './pages/home';
import { ImportPage } from './pages/import';
import { LoginPage } from './pages/login';
import { MenuPage } from './pages/menu';
import { ObjectPage, ObjectsPage } from './pages/objects';
import { ReceiptsPage } from './pages/receipts';
import { ReceivePage } from './pages/receive';
import { RequestDetailPage } from './pages/request-detail';
import { RequestFormPage } from './pages/request-form';
import { RequestsPage } from './pages/requests';
import { SupplyPage } from './pages/supply';
import { UsersPage } from './pages/users';
import { Ctx, Icon, Logo, useRoute, type Badges } from './ui';

type NavItem = { path: string; icon: string; label: Key; short?: Key; badge?: keyof Badges };

const N = {
  home: { path: '/', icon: 'home', label: 'home' },
  receipts: { path: '/receipts', icon: 'box', label: 'receipts' },
  requests: { path: '/requests', icon: 'list', label: 'requests' },
  supply: { path: '/supply', icon: 'hand', label: 'supply', badge: 'pending' },
  toPay: { path: '/supply', icon: 'hand', label: 'supply', badge: 'to_pay' },
  boss: { path: '/boss', icon: 'bank', label: 'boss', short: 'boss_short', badge: 'pending' },
  objects: { path: '/objects', icon: 'building', label: 'objects' },
  menu: { path: '/menu', icon: 'menu', label: 'menu' },
} satisfies Record<string, NavItem>;

/** Five places per role, as on a phone's bottom bar; the rest is under Menu. */
const NAV: Record<User['role'], NavItem[]> = {
  warehouse: [N.home, N.receipts, N.requests, N.supply, N.menu],
  supply: [N.home, N.requests, N.toPay, N.objects, N.menu],
  boss: [N.home, N.boss, N.supply, N.objects, N.menu],
  admin: [N.home, N.receipts, N.requests, N.supply, N.menu], // the head of the warehouse
};

function page(route: string, user: User): ReactNode {
  const [path] = route.split('?');
  const seg = path.split('/').filter(Boolean);
  const id = Number(seg[1]);
  if (seg.length === 0) return <HomePage />;
  if (seg[0] === 'receipts') return <ReceiptsPage query={new URLSearchParams(route.split('?')[1] ?? '')} />;
  if (seg[0] === 'requests') {
    if (seg[1] === 'new') return <RequestFormPage />;
    if (id && seg[2] === 'edit') return <RequestFormPage id={id} />;
    if (id && seg[2] === 'receive') return <ReceivePage id={id} />;
    if (id) return <RequestDetailPage id={id} />;
    return <RequestsPage />;
  }
  if (seg[0] === 'supply') return <SupplyPage />;
  if (seg[0] === 'boss') return <BossPage />;
  if (seg[0] === 'objects') return id ? <ObjectPage id={id} /> : <ObjectsPage />;
  if (seg[0] === 'menu') return <MenuPage />;
  if (seg[0] === 'users' && user.role === 'admin') return <UsersPage />;
  if (seg[0] === 'import' && user.role === 'admin') return <ImportPage />;
  return <HomePage />;
}

export function App() {
  const [state, setState] = useState<{ needsSetup: boolean; user: User | null } | null>(null);
  const [failed, setFailed] = useState(false);
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('ombor_lang') === 'ru' ? 'ru' : 'uz'));
  const [badges, setBadges] = useState<Badges>({ pending: 0, to_pay: 0, open_requests: 0 });
  const [online, setOnline] = useState(navigator.onLine);
  const route = useRoute();

  const loadState = useCallback(() => {
    setFailed(false);
    api('GET', '/auth/state').then(
      (s) => {
        setState(s);
        if (s.user) setLangState(s.user.lang);
      },
      () => setFailed(true),
    );
  }, []);

  const refreshBadges = useCallback(() => {
    api('GET', '/dashboard').then((d) => setBadges(d.badges), () => {});
  }, []);

  useEffect(loadState, [loadState]);
  useEffect(() => {
    const out = () => setState((s) => (s ? { ...s, user: null } : s));
    const on = () => setOnline(navigator.onLine);
    window.addEventListener('ombor:signed-out', out);
    window.addEventListener('online', on);
    window.addEventListener('offline', on);
    return () => {
      window.removeEventListener('ombor:signed-out', out);
      window.removeEventListener('online', on);
      window.removeEventListener('offline', on);
    };
  }, []);

  const user = state?.user ?? null;
  // Counters on the menu: on sign-in, on every page change, and once a minute.
  useEffect(() => {
    if (!user) return;
    refreshBadges();
    const timer = setInterval(refreshBadges, 60_000);
    return () => clearInterval(timer);
  }, [user, route, refreshBadges]);

  const t = translator(lang);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t('app');
  }, [lang, t]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('ombor_lang', l);
    if (user) api('POST', '/auth/me', { lang: l }).catch(() => {});
  };

  if (!state) {
    return (
      <div className="splash">
        <Logo size={56} />
        {failed && (
          <>
            <p>{t('e_network')}</p>
            <button className="btn primary" onClick={loadState}>{t('retry')}</button>
          </>
        )}
      </div>
    );
  }

  if (!user) return <LoginPage setup={state.needsSetup} lang={lang} setLang={setLang} onDone={loadState} />;

  const signOut = () => api('POST', '/auth/logout').finally(loadState);
  const nav = NAV[user.role];
  const current = `/${route.split('?')[0].split('/').filter(Boolean)[0] ?? ''}`;

  return (
    <Ctx.Provider value={{ user, lang, t, badges, refreshBadges, setLang, signOut }}>
      <div className="shell">
        <header className="top">
          <a className="brand" href="#/">
            <Logo />
            <span>
              <b>{t('app')}</b>
              <small>ООО «Atlant Construction»</small>
            </span>
          </a>
          <div className="who">
            <b>{user.name}</b>
            <small className={online ? 'on' : 'off'}>{t(online ? 'online' : 'offline')}</small>
          </div>
        </header>
        <nav className="nav" aria-label={t('menu')}>
          {nav.map((n) => (
            <a key={n.label + n.path} href={`#${n.path}`} className={current === n.path ? 'active' : ''}>
              <span className="nav-icon">
                <Icon name={n.icon} size={22} />
                {n.badge && badges[n.badge] > 0 && <i className="badge">{badges[n.badge]}</i>}
              </span>
              <span className="full">{t(n.label)}</span>
              <span className="short">{t(n.short ?? n.label)}</span>
            </a>
          ))}
        </nav>
        <main className="main" key={route}>{page(route, user)}</main>
      </div>
    </Ctx.Provider>
  );
}
