'use client';

import {
  OUTPUT_LANGUAGES,
  SPOKEN_LANGUAGES,
  type OutputLanguage,
  type SpokenLanguage,
} from '@ovozyoz/core';

interface Props {
  spoken: SpokenLanguage;
  output: OutputLanguage;
  disabled?: boolean;
  onSpoken: (value: SpokenLanguage) => void;
  onOutput: (value: OutputLanguage) => void;
}

const OUTPUT_NAMES: Record<OutputLanguage, string> = {
  'uz-latn': "O'zbek",
  'uz-cyrl': 'Ўзбек',
  ru: 'Русский',
  en: 'English',
};

export function LanguageBar({ spoken, output, disabled, onSpoken, onOutput }: Props) {
  return (
    <div className="w-full space-y-3">
      <label className="flex items-center justify-between gap-3 text-sm">
        <span className="text-[var(--muted)]">Men gapiraman:</span>
        <select
          value={spoken}
          disabled={disabled}
          onChange={(e) => onSpoken(e.target.value as SpokenLanguage)}
          className="rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-base font-medium"
        >
          {SPOKEN_LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>
      </label>

      <div>
        <div className="mb-1.5 text-sm text-[var(--muted)]">Matn qaysi tilda chiqsin:</div>
        <div role="radiogroup" aria-label="Matn tili" className="grid grid-cols-4 gap-1.5 rounded-2xl bg-[var(--chip)] p-1.5">
          {OUTPUT_LANGUAGES.map((l) => {
            const active = l.id === output;
            return (
              <button
                key={l.id}
                type="button"
                role="radio"
                aria-checked={active}
                title={l.label}
                disabled={disabled}
                onClick={() => onOutput(l.id)}
                className={`rounded-xl px-1 py-2 text-center transition ${
                  active
                    ? 'bg-[var(--card)] font-semibold text-[var(--text)] shadow-sm ring-1 ring-[var(--line)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <span className="block text-base leading-tight">{l.short}</span>
                <span className="block text-[11px] leading-tight opacity-80">{OUTPUT_NAMES[l.id]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
