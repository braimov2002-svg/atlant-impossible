// Uzbek Cyrillic -> Latin transliteration (official 1995 alphabet, as revised).
// Cyrillic -> Latin is deterministic, so we do it locally instead of asking a
// model; the reverse direction is ambiguous and is left to the model.

const SIMPLE: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ж: 'j', з: 'z', и: 'i', й: 'y',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'x', ш: 'sh', ч: 'ch', ы: 'i', э: 'e', ю: 'yu', я: 'ya',
  ё: 'yo', ў: 'oʻ', қ: 'q', ғ: 'gʻ', ҳ: 'h', ъ: 'ʼ', ь: '',
};

const VOWELS = new Set('аеёиоуўэюяы');
const CYRILLIC = /[Ѐ-ӿ]/;

function isLetter(ch: string | undefined): boolean {
  return !!ch && /\p{L}/u.test(ch);
}

function isUpperLetter(ch: string | undefined): boolean {
  return !!ch && ch !== ch.toLowerCase() && ch === ch.toUpperCase();
}

function matchCase(latin: string, source: string, prev: string | undefined, next: string | undefined): string {
  if (source === source.toLowerCase()) return latin;
  // "Ш" -> "Sh" in a capitalised word, "SH" when the word is all upper-case
  // (judged by either neighbour, so "ТОШ" -> "TOSH", not "TOSh").
  const wholeWordUpper = isUpperLetter(next) || (!isLetter(next) && isUpperLetter(prev));
  return wholeWordUpper ? latin.toUpperCase() : latin.charAt(0).toUpperCase() + latin.slice(1);
}

const IOTATED = new Set('еёюя');

export function uzCyrillicToLatin(text: string): string {
  let out = '';
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const lower = ch.toLowerCase();
    const prev = chars[i - 1]?.toLowerCase();
    const next = chars[i + 1];
    let latin: string | undefined;

    if (lower === 'е') {
      // "е" is "ye" at the start of a word and after a vowel or ъ/ь, else "e".
      const wordStart = !isLetter(prev);
      latin = wordStart || (prev && (VOWELS.has(prev) || prev === 'ъ' || prev === 'ь')) ? 'ye' : 'e';
    } else if (lower === 'ц') {
      // "ц" is "s" at the start of a word or after a consonant, "ts" after a vowel.
      latin = prev && VOWELS.has(prev) ? 'ts' : 's';
    } else if (lower === 'ъ' && next && IOTATED.has(next.toLowerCase())) {
      latin = ''; // объект -> obyekt: the following vowel already starts with "y"
    } else if (lower === 'ь' && next?.toLowerCase() === 'о') {
      latin = 'y'; // батальон -> batalyon
    } else {
      latin = SIMPLE[lower];
    }

    out += latin === undefined ? ch : matchCase(latin, ch, chars[i - 1], next);
  }
  return out;
}

/** Share of letters that are Cyrillic (0..1). */
export function cyrillicRatio(text: string): number {
  let letters = 0;
  let cyrillic = 0;
  for (const ch of text) {
    if (!isLetter(ch)) continue;
    letters++;
    if (CYRILLIC.test(ch)) cyrillic++;
  }
  return letters === 0 ? 0 : cyrillic / letters;
}
