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
    'менга сизга мени сизни уйда ишга кеча мана хўп хоп майли нега лекин ёки агар ҳа дўстлар салом кечирасиз нархи ' +
    'қанча канча неча пул албатта тушунарли манзил ака опа ука ота уй иш ишда дарс ким қаерда қачон тайёр ' +
    'келаман бораман келди кетди яна ҳамма ҳаммаси жойида омад муборак').split(' '),
);
const RU_WORDS = new Set(
  ('и в во на не что это как я вы мы он они с со по к ко у за из от для но а же ли бы уже ещё еще очень все всё так ' +
    'тоже только можно нужно будет есть был была были меня тебя вас нас его её ее мне тебе вам нам привет пожалуйста ' +
    'спасибо завтра сегодня когда где почему хорошо здравствуйте до свидания нет там тут здесь кто чем при про ' +
    'если или чтобы потом сейчас буду будем давай мой моя мои моё этот эта эти это сколько стоит конечно ладно ' +
    'отлично понятно иду договорились принято деньги адрес скинь пришли срочно новый новая новую дом цена').split(' '),
);
const UZ_LATN_WORDS = new Set(
  ("va bu men sen siz biz ular shu bir bilan uchun kerak ertaga bugun iltimos rahmat salom assalomu alaykum ham juda " +
    "bor yo'q yoq nima qanday yaxshi hozir keyin oldin soat mumkin emas edi bo'ladi boladi bo'lsa qilib olib borib " +
    "keling menga sizga meni sizni uyda ishga kecha mana xo'p xop mayli nega lekin yoki agar kechirasiz narxi qancha " +
    "necha pul albatta tushunarli manzil aka opa uka ona ota uy ish ishda dars kim qayerda qachon tayyor keladi " +
    "kelaman boraman keldi ketdi yana hamma hammasi joyida omad muborak ozbek ozbekiston o'zbek o'zbekiston gozal " +
    "go'zal togri to'g'ri mamlakat").split(' '),
);
const EN_WORDS = new Set(
  ("the and is are was were to of you i a an in it that we please for with this be will have has my your me at on " +
    "not do does can what how hello hi thanks thank yes no our they he she there here let let's from by about just " +
    "very good great see send call get got go going come soon today tomorrow meet bring check sent all one two " +
    "would could should been am its it's i'm don't can't won't where when who why happy new year merry " +
    "birthday morning everyone everything fine sorry sure address").split(' '),
);

const UZ_CYRL_SUFFIX = /(?:лар|ларни|ларга|ларда|лардан|нинг|ман|миз|сиз|япман|япти|япсиз|моқ|ингиз|дим|дик)$/u;
const UZ_CYRL_SOFT_SUFFIX = /(?:ни|га|да|дан|ди|ган|инг)$/u;
const UZ_CYRL_QUESTION = /(?:ди|ган|ади|япти|ми)ми$|[аеиоуўэюя]ми$/u;
// Russian-only morphology: reflexive verbs, adjective and verb endings.
const RU_SUFFIX =
  /(?:ться|тся|лся|лась|лось|лись|ется|ится|ются|ятся|ешь|ает|яет|ует|ого|ому|ыми|ая|ое|ые|ую|ть|ете|ите|ый)$/u;
const UZ_LATN_SUFFIX = /(?:lar|larni|larga|larda|lardan|ning|miz|siz|yapman|yapti|yapsiz|moq|ingiz|dim|dik|man)$/u;
const UZ_LATN_SOFT_SUFFIX = /(?:ni|ga|da|dan|di|gan)$/u;
const UZ_LATN_QUESTION = /(?:di|gan|adi|yapti)mi$|[aeiou]mi$/u;
const EN_SUFFIX = /(?:tion|sion|ness|ed|ly|ful|less|ous)$/u;
const EN_CONTRACTION = /^(?:o'clock|\p{L}+'(?:s|ll|re|ve|t|d|m))$/u;
// Uzbek q is rarely followed by u + vowel the English way (quyildi, qurilish).
const UZ_Q = /q(?!u[aeiou])/u;

interface Token {
  word: string;
  lower: string;
  script: Script | null;
  /** Mid-sentence Titlecase, camelCase or with digits: a name or brand. */
  name: boolean;
  /** Titlecase first word: often a name (vocative/subject), so letters count little. */
  weak: boolean;
}

function tokenize(sentence: string): Token[] {
  const tokens: Token[] = [];
  const clean = sentence.replace(NON_WORDS, ' ').replace(APOSTROPHES, "'");
  let first = true;
  for (const m of clean.matchAll(/[\p{L}\p{M}\p{N}']+/gu)) {
    const word = m[0].replace(/^'+|'+$/g, '');
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
    // ALL CAPS is shouting, not a name; Titlecase and camelCase are names.
    const titlecase = /^\p{Lu}/u.test(word) && /\p{Ll}/u.test(word.slice(1));
    const camel = /\p{Ll}\p{Lu}/u.test(word);
    const vocative = clean[m.index! + m[0].length] === ',';
    const name = hasDigit || camel || (titlecase && (!first || vocative));
    tokens.push({ word, lower: word.toLowerCase(), script, name, weak: first && titlecase && !name });
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
  /** Latin words that are not names or brands. */
  latnPlain: number;
}

/** Language evidence of a piece of text (one or more sentences). */
export function evidence(text: string): Evidence {
  const e: Evidence = { uzCyrl: 0, ru: 0, uzLatn: 0, en: 0, cyrlWords: 0, latnWords: 0, latnPlain: 0 };
  for (const sentence of sentences(text)) {
    for (const t of tokenize(sentence)) {
      const w = t.lower;
      // Letters of names (Ғайрат, Ulugʻbek) say little about the sentence.
      const k = t.name ? 0 : t.weak ? 0.25 : 1;
      if (t.script === 'cyrl') {
        e.cyrlWords++;
        if (UZ_CYRL_WORDS.has(w)) e.uzCyrl += 1;
        if (RU_WORDS.has(w)) e.ru += 1;
        if (/[ўқғҳ]/u.test(w)) e.uzCyrl += 2 * k;
        if (/ъ[бвгджзклмнпрстфхцчшщ]/u.test(w)) e.uzCyrl += k; // маъно, таъсир
        if (/[ыщ]/u.test(w)) e.ru += 2 * k;
        if (/ь/u.test(w)) e.ru += k; // native Uzbek words never use ь
        if (w.length > 3 && UZ_CYRL_QUESTION.test(w)) e.uzCyrl += k; // келдими, яхшими
        else if (w.length > 4 && UZ_CYRL_SUFFIX.test(w)) e.uzCyrl += 0.75 * k;
        else if (w.length > 4 && UZ_CYRL_SOFT_SUFFIX.test(w)) e.uzCyrl += 0.4 * k;
        if (w.length > 3 && RU_SUFFIX.test(w)) e.ru += 0.75 * k;
        else if (w.length > 4 && /(?:ов|ев|ский|ская|ское|ские)$/u.test(w)) e.ru += 0.5 * k; // сумов, Чиланзарский
      } else if (t.script === 'latn') {
        e.latnWords++;
        if (!t.name) e.latnPlain++;
        if (EN_CONTRACTION.test(w)) {
          e.en += 1;
          continue;
        }
        if (UZ_LATN_WORDS.has(w)) e.uzLatn += 1;
        if (EN_WORDS.has(w)) e.en += 1;
        if (/[og]'\p{L}/u.test(w)) e.uzLatn += 1.5 * k;
        if (UZ_Q.test(w)) e.uzLatn += k;
        if (/x/u.test(w)) e.uzLatn += 0.3 * k;
        if (/w/u.test(w)) e.en += k;
        if (/th|ph/u.test(w)) e.en += k;
        if (/c(?!h)/u.test(w)) e.en += 0.7 * k;
        if (/oo|ee|ou/u.test(w)) e.en += 0.5 * k;
        if (w.length > 3 && UZ_LATN_QUESTION.test(w)) e.uzLatn += k; // keldimi, yaxshimi
        else if (w.length > 4 && UZ_LATN_SUFFIX.test(w)) e.uzLatn += 0.75 * k;
        else if (w.length > 4 && UZ_LATN_SOFT_SUFFIX.test(w)) e.uzLatn += 0.4 * k;
        if (w.length > 4 && EN_SUFFIX.test(w)) e.en += 0.6 * k;
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
  } else {
    // Cyrillic target: Latin names and English terms (iPhone, pull request)
    // are fine inside Cyrillic text, but mostly-Latin text is untranslated.
    if (e.latnPlain >= 2 && e.latnPlain > e.cyrlWords) return false;
    if (e.latnPlain >= 1 && e.cyrlWords === 0 && (e.en > 0 || e.uzLatn > 0)) return false;
    if (e.uzLatn >= 1 && e.uzLatn > e.en) return false;
  }
  switch (output) {
    case 'ru':
      return !(e.uzCyrl > e.ru);
    case 'uz-cyrl':
      return !(e.ru > e.uzCyrl);
    case 'en':
      if (e.uzLatn > e.en) return false;
      // Two or more plain words without a single English trait: not English.
      return !(e.latnPlain >= 2 && e.en === 0 && e.uzLatn > 0);
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
