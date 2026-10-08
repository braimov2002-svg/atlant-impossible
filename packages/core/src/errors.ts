export type DictationErrorCode =
  | 'no-api-key'
  | 'invalid-api-key'
  | 'quota'
  | 'network'
  | 'timeout'
  | 'silence'
  | 'too-short'
  | 'too-long'
  | 'blocked'
  | 'empty-result'
  | 'mic-denied'
  | 'mic-unavailable'
  | 'unsupported'
  | 'region'
  | 'unsupported-language'
  | 'provider'
  | 'cancelled';

/** Error with a stable code so every UI can show the same Uzbek message. */
export class DictationError extends Error {
  readonly code: DictationErrorCode;
  readonly detail?: string;
  readonly status?: number;

  constructor(code: DictationErrorCode, detail?: string, status?: number) {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'DictationError';
    this.code = code;
    this.detail = detail;
    this.status = status;
  }
}

// Long enough for dictation, short enough for every provider's output limits.
export const MAX_RECORDING_SECONDS = 5 * 60;
export const MIN_RECORDING_SECONDS = 0.4;

const MESSAGES: Record<DictationErrorCode, string> = {
  'no-api-key': 'API kalit kiritilmagan. Sozlamalarga kalitni kiriting.',
  'invalid-api-key': "API kalit noto'g'ri yoki bloklangan. Sozlamalarni tekshiring.",
  quota: "Limit tugadi yoki so'rovlar juda ko'p. Birozdan so'ng qayta urinib ko'ring.",
  network: "Internetga ulanib bo'lmadi. Aloqani tekshiring.",
  timeout: "Server o'z vaqtida javob bermadi. Qayta urinib ko'ring.",
  silence: 'Ovoz eshitilmadi. Mikrofonni tekshiring.',
  'too-short': "Yozuv juda qisqa. Tugmani bosing, gapiring, keyin to'xtating.",
  'too-long': `Yozuv juda uzun (ko'pi bilan ${MAX_RECORDING_SECONDS / 60} daqiqa).`,
  blocked: "Xizmat bu so'rovni rad etdi. Boshqacha gapirib ko'ring.",
  'empty-result': "Nutq aniqlanmadi. Aniqroq gapirib, qayta urinib ko'ring.",
  'mic-denied': 'Mikrofonga ruxsat berilmagan. Brauzer yoki tizim sozlamalarida ruxsat bering.',
  'mic-unavailable': 'Mikrofon topilmadi yoki band.',
  unsupported: "Bu brauzer ovoz yozishni qo'llab-quvvatlamaydi.",
  region: "Bu xizmat sizning hududingizda ishlamayapti. Sozlamalarda boshqa xizmatni tanlab ko'ring.",
  'unsupported-language': "Tanlangan model bu tilni tushunmadi. Sozlamalarda boshqa modelni tanlab ko'ring.",
  provider: 'Xizmatda xatolik yuz berdi.',
  cancelled: 'Bekor qilindi.',
};

/** Human-readable Uzbek message for any thrown value. */
export function userMessage(error: unknown): string {
  if (error instanceof DictationError) {
    const base = MESSAGES[error.code];
    return error.code === 'provider' && error.detail ? `${base} (${error.detail})` : base;
  }
  if (error instanceof Error && error.name === 'AbortError') return MESSAGES.cancelled;
  if (error instanceof Error && error.name === 'TimeoutError') return MESSAGES.timeout;
  return MESSAGES.provider;
}

/** Maps an HTTP failure from any provider to a DictationError. */
export function httpError(status: number, providerMessage: string | undefined): DictationError {
  const detail = providerMessage?.slice(0, 300);
  if (status === 401 || status === 403) return new DictationError('invalid-api-key', detail, status);
  if (status === 429) return new DictationError('quota', detail, status);
  if (detail && /location is not supported|unsupported_country|country, region, or territory not supported/i.test(detail)) {
    return new DictationError('region', detail, status);
  }
  if (status === 400 && detail && /api[ _-]?key/i.test(detail)) {
    // Gemini answers an invalid key with 400 INVALID_ARGUMENT "API key not valid".
    return new DictationError('invalid-api-key', detail, status);
  }
  if (status === 408 || status === 504) return new DictationError('timeout', detail, status);
  return new DictationError('provider', detail ?? `HTTP ${status}`, status);
}
