import { sanitizeSettings, type DictationSettings, type OutputLanguage, type ProviderId } from '@ovozyoz/core';

// Everything lives in this browser only (API keys never leave the device
// except in requests to the chosen provider).
const KEYS = {
  settings: 'ovozyoz.settings',
  apiKeys: 'ovozyoz.apiKeys',
  history: 'ovozyoz.history',
  prefs: 'ovozyoz.prefs',
} as const;

function read<T>(key: string): T | undefined {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or full storage: the app still works for this session.
  }
}

export function loadSettings(): DictationSettings {
  return sanitizeSettings(read(KEYS.settings));
}

export function saveSettings(settings: DictationSettings): void {
  write(KEYS.settings, settings);
}

export type ApiKeys = Record<ProviderId, string>;

export function loadApiKeys(): ApiKeys {
  const raw = read<Partial<ApiKeys>>(KEYS.apiKeys) ?? {};
  return {
    gemini: typeof raw.gemini === 'string' ? raw.gemini : '',
    openai: typeof raw.openai === 'string' ? raw.openai : '',
  };
}

export function saveApiKeys(keys: ApiKeys): void {
  write(KEYS.apiKeys, keys);
}

export interface HistoryItem {
  id: string;
  text: string;
  output: OutputLanguage;
  at: number;
}

export const HISTORY_LIMIT = 30;

export function loadHistory(): HistoryItem[] {
  const raw = read<unknown>(KEYS.history);
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (item): item is HistoryItem =>
        !!item && typeof item.id === 'string' && typeof item.text === 'string' && typeof item.at === 'number',
    )
    .slice(0, HISTORY_LIMIT);
}

export function saveHistory(items: HistoryItem[]): void {
  write(KEYS.history, items.slice(0, HISTORY_LIMIT));
}

export interface Prefs {
  autoCopy: boolean;
  installTipDismissed: boolean;
}

export function loadPrefs(): Prefs {
  const raw = read<Partial<Prefs>>(KEYS.prefs) ?? {};
  return {
    autoCopy: raw.autoCopy !== false,
    installTipDismissed: raw.installTipDismissed === true,
  };
}

export function savePrefs(prefs: Prefs): void {
  write(KEYS.prefs, prefs);
}
