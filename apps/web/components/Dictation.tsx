'use client';

import {
  DEFAULT_SETTINGS,
  DictationError,
  modelOverrides,
  outputLanguage,
  PROVIDERS,
  translateText,
  userMessage,
  type DictationSettings,
  type OutputLanguage,
} from '@ovozyoz/core';
import { AnimatePresence, motion } from 'motion/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { copyText, copyWhenReady } from '@/lib/clipboard';
import {
  HISTORY_LIMIT,
  loadApiKeys,
  loadHistory,
  loadPrefs,
  loadSettings,
  saveApiKeys,
  saveHistory,
  savePrefs,
  saveSettings,
  type ApiKeys,
  type HistoryItem,
  type Prefs,
} from '@/lib/storage';
import { useDictation, type Phase } from '@/lib/useDictation';
import { DesktopDownloads } from './DesktopDownloads';
import { LanguageBar } from './LanguageBar';
import { MicButton } from './MicButton';
import { SettingsSheet } from './SettingsSheet';
import { TranslateBox } from './TranslateBox';

const STATUS: Record<Phase, string> = {
  idle: 'Bosing va gapiring',
  starting: 'Mikrofon ochilmoqda...',
  recording: "Yozilmoqda... To'xtatish uchun yana bosing",
  processing: "Matnga o'girilmoqda...",
};

function formatTime(seconds: number): string {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

export function Dictation() {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<DictationSettings>(DEFAULT_SETTINGS);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({ gemini: '', openai: '' });
  const [prefs, setPrefs] = useState<Prefs>({ autoCopy: true, installTipDismissed: true });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [text, setText] = useState('');
  const [toast, setToast] = useState<{ kind: 'ok' | 'error'; message: string } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showInstallTip, setShowInstallTip] = useState(false);

  // localStorage is only available in the browser, after hydration.
  useEffect(() => {
    setSettings(loadSettings());
    const keys = loadApiKeys();
    const storedPrefs = loadPrefs();
    setApiKeys(keys);
    setPrefs(storedPrefs);
    setHistory(loadHistory());
    setShowInstallTip(!storedPrefs.installTipDismissed && isIosSafariBrowser());
    setReady(true);
  }, []);

  const latest = useRef({ settings, apiKeys, prefs });
  latest.current = { settings, apiKeys, prefs };

  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const showToast = useCallback((kind: 'ok' | 'error', message: string) => {
    clearTimeout(toastTimer.current);
    setToast({ kind, message });
    toastTimer.current = setTimeout(() => setToast(null), kind === 'error' ? 6000 : 2500);
  }, []);

  const handleResult = useCallback(
    ({ text: result, copied, output }: { text: string; copied: boolean; output?: OutputLanguage }) => {
      setText(result);
      setHistory((items) => {
        const next = [
          { id: newId(), text: result, output: output ?? latest.current.settings.output, at: Date.now() },
          ...items,
        ].slice(0, HISTORY_LIMIT);
        saveHistory(next);
        return next;
      });
      if (copied) showToast('ok', 'Matn nusxalandi — istalgan joyga joylang');
      else if (latest.current.prefs.autoCopy) {
        showToast('error', "Avtomatik nusxalab bo'lmadi — «Nusxalash» tugmasini bosing");
      }
    },
    [showToast],
  );

  const handleError = useCallback(
    (message: string, error: unknown) => {
      showToast('error', message);
      const code = (error as { code?: string })?.code;
      if (code === 'no-api-key' || code === 'invalid-api-key' || code === 'billing' || code === 'key-unreadable') {
        setSettingsOpen(true);
      }
    },
    [showToast],
  );

  const dictation = useDictation({
    config: useCallback(() => {
      const { settings: s, apiKeys: k, prefs: p } = latest.current;
      return { settings: s, apiKey: k[s.provider], autoCopy: p.autoCopy };
    }, []),
    onResult: handleResult,
    onError: handleError,
  });

  const busy = dictation.phase !== 'idle';

  const [translating, setTranslating] = useState(false);
  const translateAbort = useRef<AbortController | null>(null);
  const translate = useCallback(
    (input: string) => {
      const { settings: s, apiKeys: k, prefs: p } = latest.current;
      const apiKey = k[s.provider];
      if (!apiKey) {
        showToast('error', userMessage(new DictationError('no-api-key')));
        setSettingsOpen(true);
        return;
      }
      const controller = new AbortController();
      translateAbort.current = controller;
      setTranslating(true);
      const textPromise = translateText({
        text: input,
        output: s.output,
        provider: s.provider,
        apiKey,
        apostrophes: s.apostrophes,
        signal: controller.signal,
        ...(s.provider === 'openai' ? { textModel: modelOverrides(s).textModel } : modelOverrides(s)),
      }).then((r) => r.text);
      // Started inside the tap: iOS only allows clipboard writes from a gesture.
      // A cancelled translation rejects the promise, so nothing is copied.
      const scheduledCopy = p.autoCopy ? copyWhenReady(textPromise) : null;
      void (async () => {
        try {
          const result = await textPromise;
          const copied = scheduledCopy ? await scheduledCopy : p.autoCopy ? await copyText(result) : false;
          handleResult({ text: result, copied, output: s.output });
        } catch (error) {
          if (!controller.signal.aborted) handleError(userMessage(error), error);
        } finally {
          if (translateAbort.current === controller) translateAbort.current = null;
          setTranslating(false);
        }
      })();
    },
    [showToast, handleResult, handleError],
  );
  const cancelTranslate = useCallback(() => translateAbort.current?.abort(), []);

  const updateSettings = (patch: Partial<DictationSettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(next);
  };

  const copy = useCallback(
    async (value: string) => {
      if (!value) return;
      if (await copyText(value)) showToast('ok', 'Nusxalandi');
      else showToast('error', "Nusxalab bo'lmadi — matnni belgilab, qo'lda nusxalang");
    },
    [showToast],
  );

  const pickHistory = useCallback(
    (value: string) => {
      setText(value);
      void copy(value);
    },
    [copy],
  );

  const clearHistory = useCallback(() => {
    if (window.confirm("Barcha yozuvlar o'chirilsinmi?")) {
      setHistory([]);
      saveHistory([]);
    }
  }, []);

  const share = async (value: string) => {
    if (!value) return;
    if (navigator.share) {
      try {
        await navigator.share({ text: value });
      } catch {
        // user closed the share sheet
      }
    } else {
      await copy(value);
    }
  };

  // Space / Enter on a keyboard toggles recording (desktop browsers).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (settingsOpen || e.repeat) return;
      const target = e.target as HTMLElement | null;
      if (target && ['TEXTAREA', 'INPUT', 'SELECT', 'BUTTON'].includes(target.tagName)) return;
      if (e.key === 'Escape') {
        if (translating) cancelTranslate();
        else dictation.cancel();
      } else if (e.code === 'Space' && !translating) {
        e.preventDefault();
        dictation.toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dictation, settingsOpen, translating, cancelTranslate]);

  const needsKey = ready && !apiKeys[settings.provider];
  const out = outputLanguage(settings.output);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icons/icon-192.png`} alt="" className="size-9" />
          <div>
            <h1 className="text-lg font-bold leading-tight">OvozYoz</h1>
            <p className="text-xs text-[var(--muted)]">Gapiring — matn o'zi yozilsin</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="grid size-10 place-items-center rounded-full hover:bg-[var(--chip)]"
          aria-label="Sozlamalar"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
          </svg>
        </button>
      </header>

      {needsKey && (
        <div className="mb-4 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm">
          <p className="mb-2 font-medium">Boshlash uchun bitta API kalit kerak.</p>
          <p className="mb-3 text-[var(--muted)]">
            Google Gemini kaliti bepul va 1 daqiqada olinadi. Kalit faqat shu qurilmada saqlanadi.
          </p>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="rounded-xl bg-amber-700 px-4 py-2 font-semibold text-white"
          >
            Kalitni kiritish
          </button>
        </div>
      )}

      {showInstallTip && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-[var(--chip)] p-3 text-sm">
          <p className="flex-1">
            Ilova kabi ishlatish uchun: pastdagi <b>Ulashish</b> (□↑) tugmasini bosing va{' '}
            <b>«Add to Home Screen»</b> (<b>«На экран „Домой“»</b>) ni tanlang.
          </p>
          <button
            type="button"
            aria-label="Yopish"
            className="px-1 text-[var(--muted)]"
            onClick={() => {
              setShowInstallTip(false);
              const next = { ...prefs, installTipDismissed: true };
              setPrefs(next);
              savePrefs(next);
            }}
          >
            ✕
          </button>
        </div>
      )}

      <section className="rounded-3xl bg-[var(--card)] p-4 shadow-sm ring-1 ring-[var(--line)]">
        <LanguageBar
          spoken={settings.spoken}
          output={settings.output}
          disabled={busy || translating}
          onSpoken={(spoken) => updateSettings({ spoken })}
          onOutput={(output: OutputLanguage) => updateSettings({ output })}
        />
      </section>

      <section className="flex flex-col items-center py-6">
        <MicButton phase={dictation.phase} level={dictation.level} onPress={dictation.toggle} disabled={translating} />
        <p className="mt-2 min-h-6 text-center font-medium">
          {dictation.phase === 'recording' && (
            <span aria-hidden className="mr-2 inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <span className="size-2.5 animate-pulse rounded-full bg-rose-500" />
              {formatTime(dictation.elapsed)}
            </span>
          )}
          <span aria-live="polite">{STATUS[dictation.phase]}</span>
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {PROVIDERS[settings.provider].label} · natija: {out.label}
        </p>
        {busy && dictation.phase !== 'starting' && (
          <button type="button" onClick={dictation.cancel} className="mt-3 rounded-full px-4 py-1.5 text-sm text-[var(--muted)] ring-1 ring-[var(--line)]">
            Bekor qilish
          </button>
        )}
        {!busy && !translating && dictation.canRetry && (
          <button
            type="button"
            onClick={() => void dictation.retry()}
            className="mt-3 rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white"
          >
            Qayta urinish (yozuv saqlangan)
          </button>
        )}
      </section>

      <section className="rounded-3xl bg-[var(--card)] p-4 shadow-sm ring-1 ring-[var(--line)]">
        <label htmlFor="result" className="mb-2 block text-sm text-[var(--muted)]">
          Natija (tahrirlash mumkin)
        </label>
        <textarea
          id="result"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Gapirganingiz shu yerda paydo bo'ladi..."
          className="w-full resize-y rounded-2xl border border-[var(--line)] bg-transparent p-3 text-base leading-relaxed"
        />
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button type="button" disabled={!text} onClick={() => copy(text)} className="rounded-xl bg-emerald-700 py-2.5 font-semibold text-white disabled:opacity-40">
            Nusxalash
          </button>
          <button type="button" disabled={!text} onClick={() => share(text)} className="rounded-xl bg-sky-700 py-2.5 font-semibold text-white disabled:opacity-40">
            Ulashish
          </button>
          <button type="button" disabled={!text} onClick={() => setText('')} className="rounded-xl py-2.5 font-medium ring-1 ring-[var(--line)] disabled:opacity-40">
            Tozalash
          </button>
        </div>
      </section>

      <TranslateBox output={settings.output} translating={translating} disabled={busy} onTranslate={translate} onCancel={cancelTranslate} />

      {history.length > 0 && (
        <HistoryList items={history} onPick={pickHistory} onClear={clearHistory} />
      )}

      <DesktopDownloads />

      <footer className="mt-auto pt-8 text-center text-xs text-[var(--muted)]">OvozYoz · Atlant Group</footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.message}
            role={toast.kind === 'error' ? 'alert' : 'status'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className={`fixed inset-x-4 top-[max(0.75rem,env(safe-area-inset-top))] z-50 mx-auto max-w-md rounded-2xl px-4 py-3 text-center text-sm font-medium text-white shadow-xl ${
              toast.kind === 'error' ? 'bg-rose-700' : 'bg-emerald-700'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsSheet
        open={settingsOpen}
        settings={settings}
        apiKeys={apiKeys}
        prefs={prefs}
        onClose={() => setSettingsOpen(false)}
        onSave={(nextSettings, nextKeys, nextPrefs) => {
          setSettings(nextSettings);
          setApiKeys(nextKeys);
          setPrefs(nextPrefs);
          saveSettings(nextSettings);
          saveApiKeys(nextKeys);
          savePrefs(nextPrefs);
          setSettingsOpen(false);
          showToast('ok', 'Saqlandi');
        }}
      />
    </main>
  );
}

function isIosSafariBrowser(): boolean {
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  // Other iOS browsers and in-app browsers (Telegram, Instagram) have different menus.
  if (/CriOS|FxiOS|EdgiOS|Telegram|Instagram|FBAN|FBAV/.test(ua)) return false;
  const standalone =
    (navigator as Navigator & { standalone?: boolean }).standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;
  return ios && !standalone;
}

const DATE_FORMAT = new Intl.DateTimeFormat('uz-UZ', { dateStyle: 'short', timeStyle: 'short' });

/** Memoised so the list is not re-rendered while the recording timer ticks. */
const HistoryList = memo(function HistoryList({
  items,
  onPick,
  onClear,
}: {
  items: HistoryItem[];
  onPick: (text: string) => void;
  onClear: () => void;
}) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Oldingi yozuvlar</h2>
        <button type="button" className="text-xs text-[var(--muted)] underline" onClick={onClear}>
          Tozalash
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onPick(item.text)}
              className="w-full rounded-2xl bg-[var(--card)] p-3 text-left ring-1 ring-[var(--line)] hover:ring-emerald-500/50"
            >
              <span className="mb-1 flex items-center gap-2 text-[11px] text-[var(--muted)]">
                <span className="rounded-md bg-[var(--chip)] px-1.5 py-0.5 font-semibold">{outputLanguage(item.output).short}</span>
                {DATE_FORMAT.format(item.at)}
              </span>
              <span className="line-clamp-3 text-sm">{item.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
});
