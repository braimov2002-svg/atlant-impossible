/**
 * Starts a clipboard write *inside* the user's tap and fills it in later.
 * iOS Safari only allows clipboard writes during a user gesture, which is
 * long gone once the transcription comes back; a ClipboardItem holding a
 * promise keeps the permission of the original tap.
 * Resolves to whether the copy happened; null when unsupported.
 */
export function copyWhenReady(text: Promise<string>): Promise<boolean> | null {
  if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) return null;
  try {
    const blob = text.then((t) => new Blob([t], { type: 'text/plain' }));
    blob.catch(() => undefined); // the caller reports transcription errors
    return navigator.clipboard.write([new ClipboardItem({ 'text/plain': blob })]).then(
      () => true,
      () => false,
    );
  } catch {
    return null;
  }
}

/** Plain copy, e.g. from a "Nusxalash" button press. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return legacyCopy(text);
  }
}

function legacyCopy(text: string): boolean {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  area.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}
