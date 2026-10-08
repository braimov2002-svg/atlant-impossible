/**
 * How the Uzbek letters oʻ/gʻ and the tutuq belgisi (ʼ) are written.
 *  - 'ascii':    o' g' ma'no  — what most people type on a keyboard
 *  - 'official': oʻ gʻ maʼno  — U+02BB / U+02BC from the official orthography
 *  - 'keep':     leave whatever the model returned
 */
export type ApostropheStyle = 'ascii' | 'official' | 'keep';

// Every character models and keyboards use for the Uzbek apostrophes:
// ' ` ´ ‘ ’ ʻ ʼ ʹ ′
const APOSTROPHES = "'`´‘’ʻʼʹ′";
const OG_MARK = new RegExp(`([oOgG])[${APOSTROPHES}]`, 'g');
const TUTUQ = new RegExp(`(\\p{L})[${APOSTROPHES}](?=\\p{L})`, 'gu');

export function normalizeUzbekApostrophes(text: string, style: ApostropheStyle): string {
  if (style === 'keep') return text;
  const og = style === 'official' ? 'ʻ' : "'";
  const tutuq = style === 'official' ? 'ʼ' : "'";
  return text.replace(OG_MARK, `$1${og}`).replace(TUTUQ, (match, letter: string) => {
    // Already-normalised oʻ/gʻ marks must not be turned into a tutuq.
    if (/[oOgG]/.test(letter) && match.endsWith(og)) return match;
    return `${letter}${tutuq}`;
  });
}

const WRAPPING_QUOTES: ReadonlyArray<[string, string]> = [
  ['"', '"'],
  ['“', '”'],
  ['«', '»'],
  ['„', '“'],
];

/**
 * Removes packaging a model sometimes adds around the answer even when told
 * not to: code fences, a single pair of wrapping quotes, trailing whitespace.
 */
export function cleanModelText(raw: string): string {
  let text = raw.replace(/\r\n/g, '\n').trim();

  const fence = /^```[a-zA-Z-]*\n?([\s\S]*?)\n?```$/.exec(text);
  if (fence) text = fence[1].trim();

  for (const [open, close] of WRAPPING_QUOTES) {
    if (
      text.length >= 2 &&
      text.startsWith(open) &&
      text.endsWith(close) &&
      !text.slice(1, -1).includes(open) &&
      !text.slice(1, -1).includes(close)
    ) {
      text = text.slice(1, -1).trim();
      break;
    }
  }
  return text;
}
