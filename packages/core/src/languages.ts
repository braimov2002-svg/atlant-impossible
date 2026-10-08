/** Language the user speaks into the microphone. */
export type SpokenLanguage = 'auto' | 'uz' | 'ru' | 'en';

/** Language (and script) the final text is written in. */
export type OutputLanguage = 'uz-latn' | 'uz-cyrl' | 'ru' | 'en';

export interface SpokenLanguageInfo {
  id: SpokenLanguage;
  /** Label shown in the (Uzbek) user interface. */
  label: string;
  /** English name used inside model prompts. */
  promptName: string;
  /** ISO-639-1 code for providers that accept a language hint. */
  iso?: string;
}

export interface OutputLanguageInfo {
  id: OutputLanguage;
  label: string;
  /** Two-letter badge for compact UI (HUD pill, tray menu). */
  short: string;
  /** English description used inside model prompts. */
  promptName: string;
  /** Spoken language that needs no translation to reach this output. */
  sameAs: Exclude<SpokenLanguage, 'auto'>;
}

export const SPOKEN_LANGUAGES: readonly SpokenLanguageInfo[] = [
  { id: 'auto', label: 'Avtomatik aniqlash', promptName: 'any language (detect it)' },
  { id: 'uz', label: "O'zbekcha", promptName: 'Uzbek', iso: 'uz' },
  { id: 'ru', label: 'Ruscha', promptName: 'Russian', iso: 'ru' },
  { id: 'en', label: 'Inglizcha', promptName: 'English', iso: 'en' },
];

export const OUTPUT_LANGUAGES: readonly OutputLanguageInfo[] = [
  {
    id: 'uz-latn',
    label: "O'zbekcha (lotin)",
    short: 'UZ',
    promptName: 'Uzbek written in the modern Latin alphabet',
    sameAs: 'uz',
  },
  {
    id: 'uz-cyrl',
    label: 'Ўзбекча (кирилл)',
    short: 'ЎЗ',
    promptName: 'Uzbek written in the Cyrillic alphabet',
    sameAs: 'uz',
  },
  { id: 'ru', label: 'Ruscha — Русский', short: 'RU', promptName: 'Russian', sameAs: 'ru' },
  { id: 'en', label: 'Inglizcha — English', short: 'EN', promptName: 'English', sameAs: 'en' },
];

export function spokenLanguage(id: SpokenLanguage): SpokenLanguageInfo {
  return SPOKEN_LANGUAGES.find((l) => l.id === id) ?? SPOKEN_LANGUAGES[0];
}

export function outputLanguage(id: OutputLanguage): OutputLanguageInfo {
  return OUTPUT_LANGUAGES.find((l) => l.id === id) ?? OUTPUT_LANGUAGES[0];
}

export function isSpokenLanguage(value: unknown): value is SpokenLanguage {
  return SPOKEN_LANGUAGES.some((l) => l.id === value);
}

export function isOutputLanguage(value: unknown): value is OutputLanguage {
  return OUTPUT_LANGUAGES.some((l) => l.id === value);
}
