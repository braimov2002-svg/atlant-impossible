import { DictationError, httpError } from '../errors';

/** Wraps fetch so network failures and HTTP errors become DictationErrors. */
export async function request(
  fetchImpl: typeof fetch,
  url: string,
  init: RequestInit,
): Promise<unknown> {
  let response: Response;
  try {
    response = await fetchImpl(url, init);
  } catch (error) {
    if (error instanceof Error && (error.name === 'AbortError' || error.name === 'TimeoutError')) {
      throw error;
    }
    throw new DictationError('network', error instanceof Error ? error.message : String(error));
  }

  const body = await response.text();
  let json: unknown;
  try {
    json = body ? JSON.parse(body) : undefined;
  } catch {
    json = undefined;
  }

  if (!response.ok) {
    throw httpError(response.status, errorMessage(json) ?? (body.slice(0, 200) || response.statusText));
  }
  if (json === undefined) throw new DictationError('provider', 'Invalid JSON response');
  return json;
}

/** Both Gemini and OpenAI answer errors as {"error": {"message": "..."}}. */
function errorMessage(json: unknown): string | undefined {
  if (json && typeof json === 'object' && 'error' in json) {
    const error = (json as { error: unknown }).error;
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      return String((error as { message: unknown }).message);
    }
  }
  return undefined;
}

/** Base64 without Node's Buffer so the same code runs in browsers and Electron. */
export function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
