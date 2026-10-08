'use client';

import { MAX_TRANSLATE_CHARS, outputLanguage, type OutputLanguage } from '@ovozyoz/core';
import { useEffect, useState } from 'react';

interface Props {
  output: OutputLanguage;
  translating: boolean;
  disabled: boolean;
  /** Called inside the tap so the result can still be auto-copied on iOS. */
  onTranslate: (text: string) => void;
}

/** Typed or pasted text → the chosen output language (e.g. Russian → Uzbek). */
export function TranslateBox({ output, translating, disabled, onTranslate }: Props) {
  const [input, setInput] = useState('');
  const out = outputLanguage(output);
  // Decided after hydration: the server render has no navigator.
  const [canPaste, setCanPaste] = useState(false);
  useEffect(() => setCanPaste(!!navigator.clipboard?.readText), []);

  const paste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) setInput(clip.slice(0, MAX_TRANSLATE_CHARS));
    } catch {
      // permission refused: the user can still long-press and paste
    }
  };

  return (
    <section className="mt-4 rounded-3xl bg-[var(--card)] p-4 shadow-sm ring-1 ring-[var(--line)]" aria-labelledby="translate-title">
      <h2 id="translate-title" className="font-semibold">
        Matnni tarjima qilish
      </h2>
      <p className="mb-2 text-xs text-[var(--muted)]">
        Ruscha, inglizcha yoki o'zbekcha matnni yozing yoki joylang. Natija tili: <b>{out.label}</b> (yuqoridagi tugmalardan
        tanlanadi).
      </p>
      <textarea
        id="translate-input"
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, MAX_TRANSLATE_CHARS))}
        rows={3}
        placeholder="Masalan: Привет, как дела?"
        className="w-full resize-y rounded-2xl border border-[var(--line)] bg-transparent p-3 text-base leading-relaxed"
      />
      <div className="mt-3 flex gap-2">
        {canPaste && (
          <button type="button" onClick={paste} disabled={translating} className="rounded-xl px-4 py-2.5 font-medium ring-1 ring-[var(--line)] disabled:opacity-40">
            Joylash
          </button>
        )}
        <button
          type="button"
          disabled={!input.trim() || translating || disabled}
          onClick={() => onTranslate(input)}
          className="flex-1 rounded-xl bg-indigo-700 py-2.5 font-semibold text-white disabled:opacity-40"
        >
          {translating ? 'Tarjima qilinmoqda...' : `Tarjima qilish → ${out.short}`}
        </button>
      </div>
    </section>
  );
}
