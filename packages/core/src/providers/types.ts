import type { OutputLanguage, SpokenLanguage } from '../languages';

export type ProviderId = 'gemini' | 'openai';

export interface ProviderRequest {
  /** 16 kHz mono 16-bit PCM WAV. */
  audio: Uint8Array;
  spoken: SpokenLanguage;
  output: OutputLanguage;
  apiKey: string;
  /** Overrides the provider's default audio model. */
  model?: string;
  /** OpenAI only: model used to translate / convert the script. */
  textModel?: string;
  signal?: AbortSignal;
  /** Injectable for tests; defaults to the global fetch. */
  fetch?: typeof fetch;
}

export interface ProviderResult {
  /** Final text before shared clean-up (quotes, apostrophes). */
  text: string;
  model: string;
}

export interface ProviderInfo {
  id: ProviderId;
  label: string;
  defaultModel: string;
  /** Suggested alternatives shown in settings; free text is also allowed. */
  models: readonly string[];
  /** Optional Uzbek descriptions for the model picker. */
  modelLabels?: Readonly<Record<string, string>>;
  defaultTextModel?: string;
  textModels?: readonly string[];
  keyUrl: string;
  keyHint: string;
}
