import type { OutputLanguage } from './languages';

// Models sometimes ignore the requested output language and simply transcribe
// (Uzbek speech + "write Russian" → Uzbek text). These checks catch that from
// the text itself so the pipeline can translate it in a second, text-only step.

const CYRILLIC = /[Ѐ-ӿ]/u;
const LATIN = /[A-Za-zÀ-ɏ]/u;
/** Letters Uzbek Cyrillic has and Russian does not. */
const UZ_CYRILLIC_ONLY = /[ўқғҳ]/iu;

// Frequent short words: enough to tell English from Uzbek Latin in a phrase.
const ENGLISH_WORDS = new Set(
  ('the and is are was were to of you i a an in it that we please for with this be will have has my your me at on ' +
    'not do does can what how hello hi thanks thank yes no our they he she there here let let\'s from by about ' +
    'tomorrow today bring meet see send call').split(' '),
);
const UZBEK_WORDS = new Set(
  ("va bu men siz sen biz bilan uchun emas edi ham juda bor yo'q nima kerak qilib qiling keling ertaga bugun " +
    "iltimos rahmat salom assalomu alaykum qanday nega lekin yoki agar mumkin bo'ladi bo'lsa shu u ular meni " +
    "menga sizga sizni hozir keyin oldin yana ha mana xop xo'p soat kun yaxshi katta kichik ko'p kam uyda " +
    "olib boring keldi ketdi qildim aytdim").split(' '),
);
const APOSTROPHE_VARIANTS = /[`´‘’ʻʼʹ′]/gu;

function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(APOSTROPHE_VARIANTS, "'")
    .split(/[^\p{L}']+/u)
    .map((w) => w.replace(/^'+|'+$/g, ''))
    .filter(Boolean);
}

export interface TextProfile {
  letters: number;
  words: number;
  cyrillicShare: number;
  uzCyrillicLetters: number;
  englishWords: number;
  uzbekWords: number;
}

export function profileText(text: string): TextProfile {
  let letters = 0;
  let cyrillic = 0;
  let uzCyrillicLetters = 0;
  for (const ch of text) {
    if (CYRILLIC.test(ch)) {
      letters++;
      cyrillic++;
      if (UZ_CYRILLIC_ONLY.test(ch)) uzCyrillicLetters++;
    } else if (LATIN.test(ch)) {
      letters++;
    }
  }
  let englishWords = 0;
  let uzbekWords = 0;
  const all = words(text);
  for (const w of all) {
    if (ENGLISH_WORDS.has(w)) englishWords++;
    // o'/g' inside a word (o'zbek, ko'p, bog'da) only happens in Uzbek Latin.
    if (UZBEK_WORDS.has(w) || /[og]'\p{L}/u.test(w)) uzbekWords++;
  }
  return { letters, words: all.length, cyrillicShare: letters ? cyrillic / letters : 0, uzCyrillicLetters, englishWords, uzbekWords };
}

/**
 * Whether `text` is plausibly written in the requested output language and
 * script. Errs on the side of "yes" for short or ambiguous text (names,
 * numbers), so a correct answer is never sent for a needless second pass.
 */
export function languageMatches(text: string, output: OutputLanguage): boolean {
  const p = profileText(text);
  // A single word is usually a name ("Telegram", "iPhone") that stays as is.
  if (p.letters < 4 || p.words < 2) return true;
  const cyrillicLetters = Math.round(p.cyrillicShare * p.letters);
  switch (output) {
    case 'ru':
      if (p.cyrillicShare < 0.5) return false;
      // Uzbek Cyrillic: ў/қ/ғ/ҳ appear in almost every Uzbek sentence.
      return p.uzCyrillicLetters / Math.max(1, cyrillicLetters) <= 0.015;
    case 'uz-cyrl':
      if (p.cyrillicShare < 0.5) return false;
      // A longer Cyrillic text without a single ў/қ/ғ/ҳ is Russian.
      return !(cyrillicLetters >= 40 && p.uzCyrillicLetters === 0);
    case 'uz-latn':
      if (p.cyrillicShare >= 0.5) return false;
      return !(p.englishWords >= 2 && p.englishWords > p.uzbekWords);
    case 'en':
      if (p.cyrillicShare >= 0.5) return false;
      return !(p.uzbekWords >= 2 && p.uzbekWords > p.englishWords);
  }
}

/** Uzbek written in Cyrillic (as opposed to Russian), so it can be transliterated locally. */
export function looksLikeUzbekCyrillic(text: string): boolean {
  const p = profileText(text);
  return p.cyrillicShare >= 0.5 && p.uzCyrillicLetters > 0;
}
