import { isOutputLanguage, isSpokenLanguage, type OutputLanguage, type SpokenLanguage } from './languages';
import type { ProviderId } from './providers/types';
import type { ApostropheStyle } from './text';

/** Settings shared by the desktop and web apps (API keys are stored separately). */
export interface DictationSettings {
  provider: ProviderId;
  spoken: SpokenLanguage;
  output: OutputLanguage;
  apostrophes: ApostropheStyle;
  /** Per-provider model overrides; empty string means "use the default". */
  geminiModel: string;
  openaiModel: string;
  openaiTextModel: string;
}

export const DEFAULT_SETTINGS: DictationSettings = {
  provider: 'gemini',
  spoken: 'uz',
  output: 'uz-latn',
  apostrophes: 'ascii',
  geminiModel: '',
  openaiModel: '',
  openaiTextModel: '',
};

/** Merges untrusted stored data over the defaults, dropping invalid values. */
export function sanitizeSettings(raw: unknown): DictationSettings {
  const value = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const str = (v: unknown, fallback: string) => (typeof v === 'string' ? v.slice(0, 100) : fallback);
  return {
    provider: value.provider === 'openai' || value.provider === 'gemini' ? value.provider : DEFAULT_SETTINGS.provider,
    spoken: isSpokenLanguage(value.spoken) ? value.spoken : DEFAULT_SETTINGS.spoken,
    output: isOutputLanguage(value.output) ? value.output : DEFAULT_SETTINGS.output,
    apostrophes:
      value.apostrophes === 'ascii' || value.apostrophes === 'official' || value.apostrophes === 'keep'
        ? value.apostrophes
        : DEFAULT_SETTINGS.apostrophes,
    geminiModel: str(value.geminiModel, ''),
    openaiModel: str(value.openaiModel, ''),
    openaiTextModel: str(value.openaiTextModel, ''),
  };
}

/** Model overrides for the active provider, ready to spread into transcribe(). */
export function modelOverrides(settings: DictationSettings): { model?: string; textModel?: string } {
  if (settings.provider === 'openai') {
    return { model: settings.openaiModel || undefined, textModel: settings.openaiTextModel || undefined };
  }
  return { model: settings.geminiModel || undefined };
}
