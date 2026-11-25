export class ApiError extends Error {
  constructor(public code: string, public status: number) {
    super(code);
  }
}

/** Calls the server. Throws ApiError with the server's error code. */
export async function api<T = any>(method: string, path: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: body === undefined ? undefined : { 'content-type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: 'same-origin',
    });
  } catch {
    throw new ApiError('network', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // The session ended (expired, or the account was disabled): back to sign-in.
    if (res.status === 401 && !path.startsWith('/auth/')) window.dispatchEvent(new Event('ombor:signed-out'));
    throw new ApiError((data as any).error ?? 'server_error', res.status);
  }
  return data as T;
}

export const qs = (params: Record<string, string | number | null | undefined>) => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== null && v !== undefined && v !== '') p.set(k, String(v));
  const s = p.toString();
  return s ? `?${s}` : '';
};
