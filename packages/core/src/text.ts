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
// oʻ/gʻ: a mark after o/g that continues the word (o'zbek), or a word-final
// gʻ (bog', tog'). A mark after a word-final "o" is a closing quote: leave it.
const OG_MARK = new RegExp(`([oOgG])[${APOSTROPHES}](?=\\p{L})|([gG])[${APOSTROPHES}](?!\\p{L})`, 'gu');
const OPENING_QUOTE = /['‘`"“«]/;
const TUTUQ = new RegExp(`(\\p{L})[${APOSTROPHES}](?=\\p{L})`, 'gu');

export function normalizeUzbekApostrophes(text: string, style: ApostropheStyle): string {
  if (style === 'keep') return text;
  const og = style === 'official' ? 'ʻ' : "'";
  const tutuq = style === 'official' ? 'ʼ' : "'";
  return text.replace(OG_MARK, (match, inWord: string | undefined, final: string | undefined, offset: number) => {
    if (inWord) return `${inWord}${og}`;
    // A word-final g + mark is gʻ (bog', tog') unless the word opened with a
    // quote: then the mark closes the quote ('yozing').
    const wordStart = text.slice(0, offset).search(/\S*$/);
    if (OPENING_QUOTE.test(text.charAt(wordStart))) return match;
    return `${final}${og}`;
  }).replace(TUTUQ, (match, letter: string) => {
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

  // A language tag only counts when a newline follows it (```text\n...```).
  const fence = /^```(?:[\w-]*\n)?([\s\S]*?)\n?```$/.exec(text);
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
