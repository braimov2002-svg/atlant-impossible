import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Lang, PaymentStatus, RequestStatus, User } from '../shared/types';
import { errorText, type Key, type Tr } from './i18n';

// --- app-wide state ------------------------------------------------------

export interface Badges {
  pending: number;
  to_pay: number;
  open_requests: number;
}

export interface AppCtx {
  user: User;
  lang: Lang;
  t: Tr;
  badges: Badges;
  refreshBadges: () => void;
  setLang: (l: Lang) => void;
  signOut: () => void;
}

export const Ctx = createContext<AppCtx>(null as never);
export const useApp = () => useContext(Ctx);

/** What each role may change; the server enforces the same rules. */
export const can = (u: User) => ({
  requests: u.role !== 'boss',
  receive: u.role === 'admin' || u.role === 'warehouse',
  pay: u.role === 'admin' || u.role === 'supply',
  decide: u.role === 'admin' || u.role === 'boss',
  markPaid: u.role !== 'warehouse',
  objects: u.role === 'admin' || u.role === 'boss',
  admin: u.role === 'admin',
});

// --- navigation: the page lives in the URL hash --------------------------

export const go = (path: string) => {
  window.location.hash = path;
};

export function useRoute() {
  const read = () => window.location.hash.replace(/^#/, '') || '/';
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

// --- data loading --------------------------------------------------------

export function useLoad<T>(load: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{ data?: T; error?: unknown; loading: boolean }>({ loading: true });
  const run = useRef(0);
  const reload = useCallback(() => {
    const id = ++run.current;
    setState((s) => ({ ...s, loading: true, error: undefined }));
    load().then(
      (data) => id === run.current && setState({ data, loading: false }),
      (error) => id === run.current && setState({ error, loading: false }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(reload, [reload]);
  return { ...state, reload };
}

/** Shows the loading and error states of useLoad, then the content. */
export function Loaded<T>({ q, children }: { q: ReturnType<typeof useLoad<T>>; children: (data: T) => ReactNode }) {
  const { t } = useApp();
  if (q.data !== undefined) return <>{children(q.data)}</>;
  if (q.error)
    return (
      <div className="card center">
        <p className="err">{errorText(q.error, t)}</p>
        <button className="btn" onClick={q.reload}>{t('retry')}</button>
      </div>
    );
  return <p className="muted center pad">{t('loading')}</p>;
}

/** Runs a save/delete action: disables the button meanwhile, keeps the error. */
export function useAction() {
  const { t } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      return true;
    } catch (e) {
      setError(errorText(e, t));
      return false;
    } finally {
      setBusy(false);
    }
  };
  return { busy, error, run, setError };
}

// --- formatting ----------------------------------------------------------

const nf = (max: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: max });
export const fmtQty = (n: number) => nf(3).format(n);
export const fmtMoney = (n: number) => nf(2).format(n);
export const fmtDate = (d: string | null | undefined) => (d ? `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(0, 4)}` : '');

const pad = (n: number) => String(n).padStart(2, '0');
export const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const today = () => iso(new Date());

// --- small pieces --------------------------------------------------------

const ICONS: Record<string, string> = {
  home: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  box: 'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
  list: 'M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12h6M9 16h6',
  hand: 'M3 15l4-4 4 2h4a2 2 0 010 4h-4M15 15l4-3 2 2-6 6H8l-5-2M14 5l2 2 4-4',
  bank: 'M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18',
  building: 'M4 21V7l8-4v18M12 9l8 3v9M2 21h20M7 9h2M7 13h2M7 17h2M15 14h2M15 17h2',
  menu: 'M4 6h16M4 12h16M4 18h16',
  plus: 'M12 5v14M5 12h14',
  back: 'M19 12H5M11 6l-6 6 6 6',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5',
  print: 'M7 9V3h10v6M7 18H4v-7h16v7h-3M7 14h10v7H7z',
  download: 'M12 4v11M7 11l5 5 5-5M5 20h14',
  edit: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6',
  check: 'M5 12l5 5 9-10',
  x: 'M6 6l12 12M18 6L6 18',
  folder: 'M3 6h6l2 3h10v10H3z',
  users: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21a7 7 0 0114 0M17 11a3 3 0 100-6M22 21a6 6 0 00-4-5.6',
  upload: 'M12 20V9M7 13l5-5 5 5M5 4h14',
  out: 'M10 4H5v16h5M14 8l4 4-4 4M18 12H9',
  phone: 'M8 3h8v18H8zM11 18h2',
  key: 'M14 10a4 4 0 10-3.5 3.9L4 20v1h3v-2h2v-2h2l1.6-1.6',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
};

export const Icon = ({ name, size = 20 }: { name: keyof typeof ICONS | string; size?: number }) => (
  <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

export const Logo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
    <rect width="36" height="36" rx="8" fill="#2a2a2a" />
    <path d="M9 27L18 9l9 18" fill="none" stroke="#ffc400" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M14 22h8" stroke="#ffc400" strokeWidth="3.4" strokeLinecap="round" />
  </svg>
);

export function PageHead({ title, sub, back, children }: { title: string; sub?: string; back?: string; children?: ReactNode }) {
  const { t } = useApp();
  return (
    <header className="page-head">
      {back && (
        <a className="back" href={`#${back}`}>
          <Icon name="back" size={18} /> {t('back')}
        </a>
      )}
      <h1>{title}</h1>
      {sub && <p className="muted">{sub}</p>}
      {children && <div className="actions">{children}</div>}
    </header>
  );
}

export function Field({ label, hint, children, wide }: { label: string; hint?: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`field${wide ? ' wide' : ''}`}>
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

const STATUS_KEY: Record<RequestStatus | PaymentStatus, Key> = {
  open: 'st_open', approved: 'st_approved', received: 'st_received',
  pending: 'pay_pending', rejected: 'pay_rejected', paid: 'pay_paid',
};

export function RequestBadge({ status }: { status: RequestStatus }) {
  const { t } = useApp();
  return <span className={`pill s-${status}`}>{t(STATUS_KEY[status])}</span>;
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  const { t } = useApp();
  const key: Key = status === 'approved' ? 'pay_approved' : STATUS_KEY[status];
  return <span className={`pill p-${status}`}>{t(key)}</span>;
}

export const Empty = () => {
  const { t } = useApp();
  return <p className="muted center pad">{t('empty')}</p>;
};

export const ErrorLine = ({ text }: { text: string }) => (text ? <p className="err" role="alert">{text}</p> : null);

/** A text input with suggestions taken from a list. */
export function Suggest({ id, value, onChange, options, ...rest }: {
  id: string; value: string; onChange: (v: string) => void; options: string[];
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'>) {
  return (
    <>
      <input list={id} value={value} onChange={(e) => onChange(e.target.value)} autoComplete="off" {...rest} />
      <datalist id={id}>{options.map((o) => <option key={o} value={o} />)}</datalist>
    </>
  );
}
