'use client';

import { PROVIDERS, type ApostropheStyle, type DictationSettings, type ProviderId } from '@ovozyoz/core';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { ApiKeys, Prefs } from '@/lib/storage';

interface Props {
  open: boolean;
  settings: DictationSettings;
  apiKeys: ApiKeys;
  prefs: Prefs;
  onClose: () => void;
  onSave: (settings: DictationSettings, apiKeys: ApiKeys, prefs: Prefs) => void;
}

const APOSTROPHE_OPTIONS: Array<{ id: ApostropheStyle; label: string }> = [
  { id: 'ascii', label: "o' g' — oddiy apostrof (klaviaturadagidek)" },
  { id: 'official', label: 'oʻ gʻ — rasmiy belgi' },
  { id: 'keep', label: "O'zgartirmaslik" },
];

export function SettingsSheet({ open, settings, apiKeys, prefs, onClose, onSave }: Props) {
  const [draft, setDraft] = useState(settings);
  const [keys, setKeys] = useState(apiKeys);
  const [draftPrefs, setDraftPrefs] = useState(prefs);
  const [showKey, setShowKey] = useState(false);
  const keyInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDraft(settings);
      setKeys(apiKeys);
      setDraftPrefs(prefs);
      setShowKey(false);
    }
  }, [open, settings, apiKeys, prefs]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Move focus into the dialog and give it back to the opener on close.
    const opener = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => keyInput.current?.focus({ preventScroll: true }), 50);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(timer);
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  const provider = PROVIDERS[draft.provider];
  const modelField = draft.provider === 'openai' ? 'openaiModel' : 'geminiModel';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center" role="dialog" aria-modal aria-label="Sozlamalar">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.form
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onSubmit={(e) => {
              e.preventDefault();
              onSave(draft, { gemini: keys.gemini.trim(), openai: keys.openai.trim() }, draftPrefs);
            }}
            className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-[var(--card)] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sozlamalar</h2>
              <button type="button" onClick={onClose} className="rounded-full px-3 py-1 text-[var(--muted)] hover:bg-[var(--chip)]" aria-label="Yopish">
                ✕
              </button>
            </div>

            <fieldset className="mb-5">
              <legend className="mb-2 text-sm font-medium">Xizmat (sun'iy intellekt)</legend>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(PROVIDERS) as ProviderId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDraft({ ...draft, provider: id })}
                    aria-pressed={draft.provider === id}
                    className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${
                      draft.provider === id
                        ? 'border-emerald-500 bg-emerald-500/10 font-semibold'
                        : 'border-[var(--line)] hover:bg-[var(--chip)]'
                    }`}
                  >
                    {PROVIDERS[id].label}
                    <span className="block text-xs font-normal text-[var(--muted)]">
                      {id === 'gemini' ? 'Bepul limit bor — tavsiya' : 'Pullik'}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mb-1 block text-sm font-medium" htmlFor="api-key">
              {provider.label} API kaliti
            </label>
            <div className="mb-1 flex gap-2">
              <input
                ref={keyInput}
                id="api-key"
                type={showKey ? 'text' : 'password'}
                autoComplete="off"
                spellCheck={false}
                value={keys[draft.provider]}
                onChange={(e) => setKeys({ ...keys, [draft.provider]: e.target.value })}
                placeholder={draft.provider === 'gemini' ? 'AIza...' : 'sk-...'}
                className="min-w-0 flex-1 rounded-xl border border-[var(--line)] bg-transparent px-3 py-2.5 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="rounded-xl border border-[var(--line)] px-3 text-sm"
              >
                {showKey ? 'Yashirish' : "Ko'rsatish"}
              </button>
            </div>
            <p className="mb-2 text-xs text-[var(--muted)]">{provider.keyHint}. Kalit faqat shu qurilmada saqlanadi.</p>
            {draft.provider === 'gemini' ? (
              <details className="mb-5 rounded-2xl bg-[var(--chip)] p-3 text-sm">
                <summary className="cursor-pointer font-medium">Bepul kalitni qanday olaman?</summary>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-[var(--muted)]">
                  <li>
                    <a className="text-sky-600 underline dark:text-sky-400" href={provider.keyUrl} target="_blank" rel="noreferrer">
                      aistudio.google.com/apikey
                    </a>{' '}
                    sahifasini oching va Google hisobingiz bilan kiring.
                  </li>
                  <li>«Create API key» tugmasini bosing.</li>
                  <li>Chiqqan kalitni nusxalab, shu yerga joylang va «Saqlash»ni bosing.</li>
                </ol>
              </details>
            ) : (
              <p className="mb-5 text-sm">
                <a className="text-sky-600 underline dark:text-sky-400" href={provider.keyUrl} target="_blank" rel="noreferrer">
                  Kalitni olish sahifasi
                </a>
              </p>
            )}

            <label className="mb-1 block text-sm font-medium" htmlFor="model">
              Model
            </label>
            <select
              id="model"
              value={draft[modelField]}
              onChange={(e) => setDraft({ ...draft, [modelField]: e.target.value })}
              className="mb-5 w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-2.5 text-sm"
            >
              <option value="">Standart ({provider.defaultModel})</option>
              {provider.models
                .filter((m) => m !== provider.defaultModel)
                .map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>

            {draft.provider === 'openai' && provider.textModels && (
              <>
                <label className="mb-1 block text-sm font-medium" htmlFor="text-model">
                  Tarjima modeli
                </label>
                <select
                  id="text-model"
                  value={draft.openaiTextModel}
                  onChange={(e) => setDraft({ ...draft, openaiTextModel: e.target.value })}
                  className="mb-5 w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-2.5 text-sm"
                >
                  <option value="">Standart ({provider.defaultTextModel})</option>
                  {provider.textModels
                    .filter((m) => m !== provider.defaultTextModel)
                    .map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                </select>
              </>
            )}

            <fieldset className="mb-5">
              <legend className="mb-2 text-sm font-medium">O'zbekcha apostrof (oʻ, gʻ)</legend>
              <div className="space-y-1.5">
                {APOSTROPHE_OPTIONS.map((o) => (
                  <label key={o.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="apostrophes"
                      checked={draft.apostrophes === o.id}
                      onChange={() => setDraft({ ...draft, apostrophes: o.id })}
                    />
                    {o.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mb-6 flex items-center justify-between gap-3 text-sm">
              <span>
                <span className="font-medium">Matnni avtomatik nusxalash</span>
                <span className="block text-xs text-[var(--muted)]">Tayyor bo'lishi bilan boshqa ilovaga joylash mumkin</span>
              </span>
              <input
                type="checkbox"
                className="size-5 accent-emerald-500"
                checked={draftPrefs.autoCopy}
                onChange={(e) => setDraftPrefs({ ...draftPrefs, autoCopy: e.target.checked })}
              />
            </label>

            <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-sky-700 to-emerald-700 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20">
              Saqlash
            </button>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
}
