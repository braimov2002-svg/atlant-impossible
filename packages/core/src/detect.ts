import type { OutputLanguage } from './languages';

// Models sometimes ignore the requested output language and simply transcribe
// (Uzbek speech + "write Russian" → Uzbek text). These checks catch that from
// the text itself. They weigh evidence instead of thresholds on letter shares:
// script per word, letters only one language has (ўқғҳ / ыщ, w th c / q o'),
// frequent function words and endings. Names, brands, links and numbers are
// ignored, and each sentence is checked on its own so half-translated answers
// are caught too.

export type Script = 'cyrl' | 'latn';

const CYRILLIC_LETTER = /[Ѐ-ӿ]/u;
const LATIN_LETTER = /[A-Za-zÀ-ɏ]/u;
const APOSTROPHES = /[`´‘’ʻʼʹ′]/gu;
/** Links, e-mails, @handles and hashtags carry no language. */
const NON_WORDS = /\b(?:https?:\/\/|www\.)\S+|\S+@\S+\.\S+|[@#][\p{L}\p{N}_]+/gu;

const UZ_CYRL_WORDS = new Set(
  ('ва бу мен сен сиз биз улар у шу бир билан учун керак эртага бугун илтимос раҳмат рахмат ҳам жуда бор йўқ нима ' +
    'қандай яхши ассалому алайкум ҳозир кейин олдин соат мумкин эмас эди бўлади бўлса қилиб олиб бориб келинг ' +
    'менга сизга мени сизни уйда ишга кеча мана хўп майли нега лекин ёки агар ҳа йўқ дўстлар').split(' '),
);
const RU_WORDS = new Set(
  ('и в во на не что это как я вы мы он она они с со по к ко у за из от для но а же ли бы уже ещё еще очень все всё так ' +
    'тоже только можно нужно будет есть был была были меня тебя вас нас его её ее мне тебе вам нам привет пожалуйста ' +
    'спасибо завтра сегодня когда где почему хорошо здравствуйте до свидания да нет там тут здесь кто чем при про ' +
    'если или чтобы потом сейчас буду будем давай').split(' '),
);
const UZ_LATN_WORDS = new Set(
  ("va bu men sen siz biz ular shu bir bilan uchun kerak ertaga bugun iltimos rahmat salom assalomu alaykum ham juda " +
    "bor yo'q nima qanday yaxshi hozir keyin oldin soat mumkin emas edi bo'ladi bo'lsa qilib olib borib keling menga " +
    "sizga meni sizni uyda ishga kecha mana xo'p xop mayli nega lekin yoki agar kechirasiz narxi qancha").split(' '),
);
const EN_WORDS = new Set(
  ("the and is are was were to of you i a an in it that we please for with this be will have has my your me at on " +
    "not do does can what how hello hi thanks thank yes no our they he she there here let let's from by about just " +
    "very good great see send call get got go going come soon today tomorrow meet bring check sent all one two " +
    "would could should been am its it's i'm don't can't won't").split(' '),
);

const UZ_CYRL_SUFFIX = /(?:лар|ларни|ларга|ларда|лардан|нинг|ман|миз|сиз|япман|япти|япсиз|моқ|ингиз|дим|дик)$/u;
const UZ_CYRL_SOFT_SUFFIX = /(?:ни|га|да|дан|ди|ган|инг)$/u;
const RU_SUFFIX = /(?:ться|тся|ешь|ает|яет|ует|ого|ому|ыми|ими|ая|ое|ые|ть|ешь|ете|ите)$/u;
const UZ_LATN_SUFFIX = /(?:lar|larni|larga|larda|lardan|ning|miz|siz|yapman|yapti|yapsiz|moq|ingiz|dim|dik|man)$/u;
const UZ_LATN_SOFT_SUFFIX = /(?:ni|ga|da|dan|di|gan)$/u;
const EN_SUFFIX = /(?:tion|sion|ment|ness|ed|ly|ful|less|ous)$/u;
const EN_CONTRACTION = /^(?:o'clock|\p{L}+'(?:s|ll|re|ve|t|d|m))$/u;

interface Token {
  word: string;
  lower: string;
  script: Script | null;
  /** Capitalised mid-sentence, camelCase or with digits: a name or brand. */
  name: boolean;
}

function tokenize(sentence: string): Token[] {
  const tokens: Token[] = [];
  const raw = sentence.replace(NON_WORDS, ' ').replace(APOSTROPHES, "'").split(/[^\p{L}\p{M}\p{N}']+/u);
  let first = true;
  for (const piece of raw) {
    const word = piece.replace(/^'+|'+$/g, '');
    if (!word) continue;
    const hasDigit = /\p{N}/u.test(word);
    let cyr = 0;
    let lat = 0;
    for (const ch of word) {
      if (CYRILLIC_LETTER.test(ch)) cyr++;
      else if (LATIN_LETTER.test(ch)) lat++;
    }
    if (cyr + lat === 0) continue; // numbers only
    const script: Script | null = cyr > lat ? 'cyrl' : lat > cyr ? 'latn' : null;
    const capitalised = word[0] !== word[0].toLowerCase();
    const camel = /\p{Ll}\p{Lu}/u.test(word);
    tokens.push({ word, lower: word.toLowerCase(), script, name: hasDigit || camel || (capitalised && !first) });
    first = false;
  }
  return tokens;
}

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?…])\s+|\n+/u).filter((s) => s.trim());
}

export interface Evidence {
  uzCyrl: number;
  ru: number;
  uzLatn: number;
  en: number;
  cyrlWords: number;
  latnWords: number;
}

/** Language evidence of a piece of text (one or more sentences). */
export function evidence(text: string): Evidence {
  const e: Evidence = { uzCyrl: 0, ru: 0, uzLatn: 0, en: 0, cyrlWords: 0, latnWords: 0 };
  for (const sentence of sentences(text)) {
    for (const t of tokenize(sentence)) {
      if (t.script === 'cyrl') {
        e.cyrlWords++;
        const w = t.lower;
        if (UZ_CYRL_WORDS.has(w)) e.uzCyrl += 1;
        if (RU_WORDS.has(w)) e.ru += 1;
        if (t.name) continue; // letters of names (Ғайрат) say nothing about the sentence
        if (/[ўқғҳ]/u.test(w)) e.uzCyrl += 2;
        if (/ъ[бвгджзклмнпрстфхцчшщ]/u.test(w)) e.uzCyrl += 1; // маъно, таъсир
        if (/[ыщ]/u.test(w)) e.ru += 2;
        if (w.length > 4 && UZ_CYRL_SUFFIX.test(w)) e.uzCyrl += 0.75;
        else if (w.length > 4 && UZ_CYRL_SOFT_SUFFIX.test(w)) e.uzCyrl += 0.4;
        if (w.length > 3 && RU_SUFFIX.test(w)) e.ru += 0.75;
      } else if (t.script === 'latn') {
        e.latnWords++;
        const w = t.lower;
        if (EN_CONTRACTION.test(w)) {
          e.en += 1;
          continue;
        }
        if (UZ_LATN_WORDS.has(w)) e.uzLatn += 1;
        if (EN_WORDS.has(w)) e.en += 1;
        if (t.name) continue; // Ulugʻbek, iPhone, WhatsApp
        if (/[og]'\p{L}/u.test(w)) e.uzLatn += 1.5;
        if (/q(?!u)/u.test(w)) e.uzLatn += 1;
        if (/x/u.test(w)) e.uzLatn += 0.3;
        if (/w/u.test(w)) e.en += 1;
        if (/th|ph/u.test(w)) e.en += 1;
        if (/c(?!h)/u.test(w)) e.en += 0.7;
        if (/oo|ee|ea|ou/u.test(w)) e.en += 0.5;
        if (w.length > 4 && UZ_LATN_SUFFIX.test(w)) e.uzLatn += 0.75;
        else if (w.length > 4 && UZ_LATN_SOFT_SUFFIX.test(w)) e.uzLatn += 0.4;
        if (w.length > 4 && EN_SUFFIX.test(w)) e.en += 0.6;
        if (w.length > 3 && /[^aeiouy]e$/u.test(w)) e.en += 0.3;
      }
    }
  }
  return e;
}

function scriptOf(e: Evidence): Script | null {
  if (e.cyrlWords === 0 && e.latnWords === 0) return null;
  return e.cyrlWords >= e.latnWords ? 'cyrl' : 'latn';
}

/** Whether one sentence fits the target, judged on its own words. */
function sentenceMatches(sentence: string, output: OutputLanguage): boolean {
  const e = evidence(sentence);
  const words = e.cyrlWords + e.latnWords;
  if (words === 0) return true;
  const latinTarget = output === 'uz-latn' || output === 'en';
  if (latinTarget) {
    // Any real share of Cyrillic words means untranslated text ("Спасибо!").
    if (e.cyrlWords > 0 && e.cyrlWords / words >= 0.1) return false;
  } else if (scriptOf(e) === 'latn') {
    // Latin words in a Cyrillic target are fine when they are English terms or
    // names (iPhone, pull request); Uzbek Latin means untranslated text.
    if (e.uzLatn > e.en && e.uzLatn >= 1) return false;
    if (words >= 3 && e.latnWords / words >= 0.7 && e.uzLatn > 0) return false;
  }
  switch (output) {
    case 'ru':
      return !(e.uzCyrl > e.ru);
    case 'uz-cyrl':
      return !(e.ru > e.uzCyrl);
    case 'en':
      return !(e.uzLatn > e.en);
    case 'uz-latn':
      return !(e.en > e.uzLatn);
  }
}

/**
 * Whether `text` is plausibly written in the requested output language and
 * script. With no evidence either way (a name, a number, "OK") it says yes,
 * so a correct answer is not sent for a needless second pass.
 */
export function languageMatches(text: string, output: OutputLanguage): boolean {
  const parts = sentences(text);
  if (!parts.every((s) => sentenceMatches(s, output))) return false;
  // Also judge the whole text: short sentences may each be inconclusive.
  return parts.length <= 1 || sentenceMatches(parts.join(' '), output);
}

/** Uzbek written in Cyrillic (not Russian), so it can be transliterated locally. */
export function looksLikeUzbekCyrillic(text: string): boolean {
  const e = evidence(text);
  if (scriptOf(e) !== 'cyrl' || e.latnWords > 0) return false;
  // Uzbek must clearly win overall and in every sentence: a Russian sentence
  // with one Uzbek name or phrase must be translated, not transliterated.
  return e.uzCyrl > 0 && e.uzCyrl >= 1.5 * e.ru && sentences(text).every((s) => {
    const se = evidence(s);
    return se.uzCyrl >= se.ru;
  });
}
