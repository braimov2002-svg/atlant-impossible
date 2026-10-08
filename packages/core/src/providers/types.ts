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
  /** Gemini: write down exactly what was said, without translating (step 1 of a translation). */
  transcriptOnly?: boolean;
  signal?: AbortSignal;
  /** Injectable for tests; defaults to the global fetch. */
  fetch?: typeof fetch;
}

/** Text-only request: translate or re-script typed or transcribed text. */
export interface TextRequest {
  text: string;
  output: OutputLanguage;
  apiKey: string;
  /** Gemini: model to use; OpenAI: the text (chat) model. */
  model?: string;
  /** Retry after an answer in the wrong language: insist harder. */
  strict?: boolean;
  signal?: AbortSignal;
  fetch?: typeof fetch;
}

export interface ProviderResult {
  /** Final text before shared clean-up (quotes, apostrophes). */
  text: string;
  model: string;
  /** The text was already translated by a second, text-only request. */
  translated?: boolean;
  /** The untranslated transcript, when a translation happened. */
  source?: string;
  /** Error code of a failed translation step (the transcript was kept). */
  rewriteFailed?: string;
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
