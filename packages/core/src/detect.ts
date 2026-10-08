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
  ('ва бу мен сен сиз биз улар шу бир билан учун керак эртага бугун илтимос раҳмат ҳам жуда бор йўқ нима ' +
    'қандай яхши ҳозир кейин олдин соат мумкин эмас эди бўлади бўлса қилиб олиб бориб келинг ' +
    'менга сизга мени сизни уйда ишга кеча мана хўп нега лекин ёки агар ҳа дўстлар кечирасиз нархи ' +
    'қанча канча неча пул албатта тушунарли манзил ука ота уй иш ишда дарс ким қаерда қачон тайёр ' +
    'келаман бораман келди кетди яна ҳамма ҳаммаси жойида омад янги катта кичик зўр минг ичида бериш баракалла ' +
    'ажойиб хавотир куни битта китоб').split(' '),
);
/** Uzbek words that are also everyday Tashkent Russian (хоп, рахмат, ака): weak evidence. */
const SHARED_CYRL_WORDS = new Set('хоп майли салом ака опа муборак рахмат хайит жума ассалому алайкум'.split(' '));
const RU_WORDS = new Set(
  ('и в во на не что это как я вы мы он они с со по к ко у за из от для но а же ли бы уже ещё еще очень все всё так ' +
    'тоже только можно нужно будет есть был была были меня тебя вас нас его её ее мне тебе вам нам привет пожалуйста ' +
    'спасибо завтра сегодня когда где почему хорошо здравствуйте до свидания нет там тут здесь кто чем при про ' +
    'если или чтобы потом сейчас буду будем давай мой моя мои моё этот эта эти это сколько стоит конечно ладно ' +
    'отлично понятно иду договорились принято деньги адрес скинь пришли срочно новый новая новую дом цена ' +
    'жду еду ну вместе скоро готово молодец встреча вечером утром днём ночью сейчас ладно норм щас чё ' +
    'января февраля марта апреля мая июня июля августа сентября октября ноября декабря ' +
    'всегда никогда иногда тогда правда подожди погоди уходи заходи приходи сестра брат мама папа дорога ' +
    'свободна свободно занят занята минутку').split(' '),
);
const UZ_LATN_WORDS = new Set(
  ("va bu men sen siz biz ular shu bir bilan uchun kerak ertaga bugun iltimos rahmat salom assalomu alaykum ham juda " +
    "bor yo'q yoq nima qanday yaxshi hozir keyin oldin soat mumkin emas edi bo'ladi boladi bo'lsa qilib olib borib " +
    "keling menga sizga meni sizni uyda ishga kecha mana xo'p xop mayli nega lekin yoki agar kechirasiz narxi qancha " +
    "necha pul albatta tushunarli manzil aka opa uka ona ota uy ish ishda dars kim qayerda qachon tayyor keladi " +
    "kelaman boraman keldi ketdi yana hamma hammasi joyida omad muborak ozbek ozbekiston o'zbek o'zbekiston gozal " +
    "go'zal togri to'g'ri mamlakat yangi katta kichik zo'r ming ichida berish barakalla bo'pti hisob jami " +
    "ajoyib xavotir juma kuni bitta kitob").split(' '),
);
const EN_WORDS = new Set(
  ("the and is are was were to of you i a an in it that we please for with this be will have has my your me at on " +
    "not do does can what how hello hi thanks thank yes no our they he she there here let let's from by about just " +
    "very good great see send call get got go going come soon today tomorrow meet bring check sent all one two " +
    "would could should been am its it's i'm don't can't won't where when who why happy new year merry " +
    "birthday morning everyone everything fine sorry sure address total next stop maybe later well done almost " +
    "ready dinner lunch keys under paid via milk buy buying plans late similar popular regular dollar still back " +
    "need want know think take make home work time day night week start starts monday friday").split(' '),
);

const UZ_CYRL_SUFFIX =
  /(?:лар|ларни|ларга|ларда|лардан|нинг|ман|миз|сиз|япман|япти|япсиз|моқ|ингиз|дим|дик|мисан|мисиз|микан|манг|манглар)$/u;
const UZ_CYRL_SOFT_SUFFIX = /(?:ни|га|да|дан|ди|ган|инг)$/u;
// Uzbek -ми questions: the stem must look Uzbek (keldi-mi, kelasiz-mi, yaxshi-mi),
// so Russian instrumental plurals (вами, этими, вопросами) do not count.
const UZ_CYRL_MI_STEM = /(?:ди|ган|ади|япти|япсиз|япсан|сиз|сан|миз|ман|нг|нгиз|динг|дингиз|дик|дим|ар|ир|ур)$/u;
// Russian-only morphology: reflexive verbs, adjective, verb and past-tense endings.
const RU_SUFFIX =
  /(?:ться|тся|лся|лась|лось|лись|ется|ится|ются|ятся|мся|тесь|ешь|ает|яет|ует|ого|ому|ыми|ая|ое|ые|ую|ть|ете|ите|ый)$/u;
const RU_SOFT_SUFFIX =
  /(?:ал|ял|ил|ел|ала|яла|ила|ела|ало|ило|али|яли|или|ели|аю|яю|ую|ов|ев|ский|ская|ское|ские|ами|ями|аем|яем|ием|ню|лю|рю|чу|шу|жу)$/u;
const UZ_LATN_SUFFIX =
  /(?:lar|larni|larga|larda|lardan|miz|siz|yapman|yapti|yapsiz|moq|ingiz|dim|dik|man|misan|misiz|mikan|mang|manglar)$/u;
// -ning is soft: English has it too (evening, training, running).
const UZ_LATN_SOFT_SUFFIX = /(?:ni|ga|da|dan|di|gan|ning)$/u;
const UZ_LATN_MI_STEM = /(?:di|gan|adi|yapti|yapsiz|yapsan|siz|san|miz|man|ng|ngiz|ding|dingiz|dik|dim|ar|ir|ur)$/u;
const EN_SUFFIX = /(?:tion|sion|ness|ed|ly|ful|less|ous)$/u;
// English contractions; an apostrophe after o/g followed by a letter is the
// Uzbek oʻ/gʻ (so'm, o't), never a contraction.
const EN_CONTRACTION = /^(?:o'clock|who's|who'd|who'll|who've|\p{L}+n't|\p{L}*[^og\W]'(?:s|ll|re|ve|d|m|t))$/iu;
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

/** Currency and units that appear in every language (150 000 so'm). */
const NEUTRAL_WORDS = new Set("so'm som sum сум usd uzs kg km".split(' '));

function inDictionary(lower: string): boolean {
  return (
    UZ_LATN_WORDS.has(lower) || EN_WORDS.has(lower) || UZ_CYRL_WORDS.has(lower) || RU_WORDS.has(lower) || SHARED_CYRL_WORDS.has(lower)
  );
}

function tokenize(sentence: string): Token[] {
  const clean = sentence.replace(NON_WORDS, ' ').replace(APOSTROPHES, "'");
  const raw: Array<{ word: string; vocative: boolean }> = [];
  for (const m of clean.matchAll(/[\p{L}\p{M}\p{N}']+/gu)) {
    const word = m[0].replace(/^'+|'+$/g, '');
    if (word) raw.push({ word, vocative: clean[m.index! + m[0].length] === ',' });
  }
  // A sentence in ALL CAPS is shouting: its short words are not abbreviations.
  const letters = raw.filter((r) => /\p{L}/u.test(r.word));
  const shouting = letters.length >= 2 && letters.filter((r) => r.word === r.word.toUpperCase()).length * 2 >= letters.length;
  const tokens: Token[] = [];
  let first = true;
  for (const { word, vocative } of raw) {
    const lower = word.toLowerCase();
    const hasDigit = /\p{N}/u.test(word);
    let cyr = 0;
    let lat = 0;
    for (const ch of word) {
      if (CYRILLIC_LETTER.test(ch)) cyr++;
      else if (LATIN_LETTER.test(ch)) lat++;
    }
    if (cyr + lat === 0 || NEUTRAL_WORDS.has(lower)) continue; // numbers, so'm
    const script: Script | null = cyr > lat ? 'cyrl' : lat > cyr ? 'latn' : null;
    const titlecase = /^\p{Lu}/u.test(word) && /\p{Ll}/u.test(word.slice(1));
    const camel = /\p{Ll}\p{Lu}/u.test(word);
    const known = inDictionary(lower);
    // Titlecase mid-sentence or before a comma ("Шоҳрух, позвони") is a name,
    // unless it is a known word ("Хўп, тушундим").
    const name = hasDigit || camel || (titlecase && !known && (!first || vocative));
    const abbreviation = !shouting && !known && word.length <= 4 && word === word.toUpperCase();
    tokens.push({ word, lower, script, name: name || abbreviation, weak: first && titlecase && !name && raw.length > 1 });
    first = false;
  }
  return tokens;
}

function sentences(text: string): string[] {
  // No regex lookbehind: Safari before 16.4 (iOS 16.0–16.3) cannot parse it,
  // and a syntax error there would stop the whole app from loading.
  const parts: string[] = [];
  let current = '';
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch === '\n') {
      parts.push(current);
      current = '';
      continue;
    }
    current += ch;
    if ('.!?…'.includes(ch) && /\s/u.test(chars[i + 1] ?? '')) {
      parts.push(current);
      current = '';
    }
  }
  parts.push(current);
  return parts.map((s) => s.trim()).filter(Boolean);
}

export interface Evidence {
  uzCyrl: number;
  ru: number;
  uzLatn: number;
  en: number;
  /** Uzbek Cyrillic evidence Russian text can never have (ўқғҳ, Uzbek-only words and endings). */
  uzCyrlStrong: number;
  /** Part of uzCyrl from words Tashkent Russian uses too (хоп, рахмат): not evidence against Russian. */
  uzCyrlShared: number;
  /** Latin evidence from words and endings (not single letters, which brands have too). */
  uzLatnLex: number;
  enLex: number;
  cyrlWords: number;
  latnWords: number;
  /** Latin words that are not names, brands or abbreviations. */
  latnPlain: number;
  /** Lower-case Latin words (real text, not a brand like Click or Payme). */
  latnLower: number;
}

const has = (set: ReadonlySet<string>, w: string) => set.has(w);

/** Language evidence of a piece of text (one or more sentences). */
export function evidence(text: string): Evidence {
  const e: Evidence = {
    uzCyrl: 0, ru: 0, uzLatn: 0, en: 0, uzCyrlStrong: 0, uzCyrlShared: 0, uzLatnLex: 0, enLex: 0,
    cyrlWords: 0, latnWords: 0, latnPlain: 0, latnLower: 0,
  };
  for (const sentence of sentences(text)) {
    for (const t of tokenize(sentence)) {
      const w = t.lower;
      if (t.script === 'cyrl') {
        e.cyrlWords++;
        if (t.name) continue; // Ғайрат, Каримов, ТЦ
        // Letters of a Titlecase first word (often a name) count little;
        // its endings and dictionary entries still count in full.
        const k = t.weak ? 0.25 : 1;
        if (has(SHARED_CYRL_WORDS, w)) {
          e.uzCyrl += 0.5;
          e.uzCyrlShared += 0.5;
        }
        else if (has(UZ_CYRL_WORDS, w)) {
          e.uzCyrl += 1;
          e.uzCyrlStrong += 1;
        }
        if (has(RU_WORDS, w)) e.ru += 1;
        if (/[ўқғҳ]/u.test(w)) {
          e.uzCyrl += 2 * k;
          e.uzCyrlStrong += 2 * k;
        }
        if (/ъ[бвгджзклмнпрстфхцчшщ]/u.test(w)) {
          e.uzCyrl += k; // маъно, таъсир
          e.uzCyrlStrong += k;
        }
        if (/[ыщ]/u.test(w)) e.ru += 2 * k;
        if (/ь/u.test(w)) e.ru += k; // native Uzbek words never use ь
        if (inDictionary(w)) continue; // endings of known words (ассалому) say nothing more
        const stem = w.endsWith('ми') ? w.slice(0, -2) : '';
        if (stem.length >= 3 && (has(UZ_CYRL_WORDS, stem) || UZ_CYRL_MI_STEM.test(stem))) {
          e.uzCyrl += 1; // келдими, яхшими, келасизми
          e.uzCyrlStrong += 1;
        } else if (w.length > 4 && UZ_CYRL_SUFFIX.test(w)) {
          e.uzCyrl += 0.75;
          e.uzCyrlStrong += 0.75;
        } else if (w.length > 4 && UZ_CYRL_SOFT_SUFFIX.test(w)) e.uzCyrl += 0.4 * k;
        if (w.length > 3 && RU_SUFFIX.test(w)) e.ru += 0.75;
        else if (w.length > 4 && RU_SOFT_SUFFIX.test(w)) e.ru += 0.5 * k;
        else if (w.length > 5 && /(?:ит|ет|ут|ют|ят)$/u.test(w)) e.ru += 0.5 * k; // подходит, приедет
      } else if (t.script === 'latn') {
        e.latnWords++;
        if (t.word === t.lower) e.latnLower++;
        if (t.name) continue; // Ulugʻbek, iPhone, Kim, QR
        e.latnPlain++;
        const k = t.weak ? 0.25 : 1;
        if (EN_CONTRACTION.test(w)) {
          e.en += 1;
          e.enLex += 1;
          continue;
        }
        const uz0 = e.uzLatn;
        const en0 = e.en;
        if (has(UZ_LATN_WORDS, w)) e.uzLatn += 1;
        if (has(EN_WORDS, w)) e.en += 1;
        if (/[og]'\p{L}/u.test(w)) e.uzLatn += 1.5 * k;
        if (UZ_Q.test(w)) e.uzLatn += k;
        if (/x/u.test(w)) e.uzLatn += 0.3 * k;
        if (/w/u.test(w)) e.en += k;
        if (/th|ph/u.test(w)) e.en += k;
        if (/c(?!h)/u.test(w)) e.en += 0.7 * k;
        if (/oo|ee|ou/u.test(w)) e.en += 0.5 * k;
        const stem = w.endsWith('mi') ? w.slice(0, -2) : '';
        if (inDictionary(w)) {
          e.uzLatnLex += e.uzLatn - uz0 > 0 && has(UZ_LATN_WORDS, w) ? 1 : 0;
          e.enLex += has(EN_WORDS, w) ? 1 : 0;
          continue;
        }
        const uzLetters = e.uzLatn - uz0;
        const enLetters = e.en - en0;
        if (stem.length >= 3 && (has(UZ_LATN_WORDS, stem) || UZ_LATN_MI_STEM.test(stem))) e.uzLatn += 1; // keldimi
        else if (w.length > 4 && UZ_LATN_SUFFIX.test(w)) e.uzLatn += 0.75;
        else if (w.length > 4 && UZ_LATN_SOFT_SUFFIX.test(w)) e.uzLatn += 0.4 * k;
        if (w.length > 4 && EN_SUFFIX.test(w)) e.en += 0.6;
        // Dictionary words and endings are lexical; o'/g', q, w, th are letters.
        const dictUz = has(UZ_LATN_WORDS, w) ? 1 : 0;
        const dictEn = has(EN_WORDS, w) ? 1 : 0;
        e.uzLatnLex += dictUz + (e.uzLatn - uz0 - uzLetters);
        e.enLex += dictEn + (e.en - en0 - enLetters);
      }
    }
  }
  return e;
}

function scriptOf(e: Evidence): Script | null {
  if (e.cyrlWords === 0 && e.latnWords === 0) return null;
  return e.cyrlWords >= e.latnWords ? 'cyrl' : 'latn';
}

/** Competing evidence below this is noise (one soft ending, a stray letter). */
const MARGIN = 0.5;

/** Whether the evidence of a sentence (or a whole text) fits the target. */
function evidenceMatches(e: Evidence, output: OutputLanguage): boolean {
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
    // A lone Latin word: reject it only on word-level evidence ("Kelyapman",
    // "Noted"), not on a letter that brand names have too ("Click").
    if (e.latnPlain >= 1 && e.cyrlWords === 0 && (e.enLex >= MARGIN || e.uzLatnLex >= MARGIN || e.en >= 1 || e.uzLatn >= 1)) {
      return false;
    }
    if (e.uzLatn >= 1 && e.uzLatn > e.en) return false;
  }
  switch (output) {
    case 'ru': {
      // Words Tashkent Russian borrows (хоп, рахмат, муборак) are not against Russian.
      const uz = e.uzCyrl - e.uzCyrlShared;
      return !(uz >= MARGIN && uz > e.ru);
    }
    case 'uz-cyrl':
      if (e.ru >= MARGIN && e.ru > e.uzCyrl) return false;
      // Two or more Cyrillic words without any Uzbek trait are Russian.
      return !(e.cyrlWords >= 2 && e.uzCyrl === 0 && e.ru > 0) && !(e.cyrlWords >= 3 && e.uzCyrl === 0);
    case 'en':
      if (e.uzLatn >= MARGIN && e.uzLatn > e.en) return false;
      // Two or more plain words without a single English trait: not English.
      return !(e.latnPlain >= 2 && e.en === 0 && e.uzLatn >= MARGIN);
    case 'uz-latn':
      return !(e.en >= MARGIN && e.en > e.uzLatn);
  }
}

/**
 * Whether `text` is plausibly written in the requested output language and
 * script. With no evidence either way (a name, a number, "OK") it says yes,
 * so a correct answer is not sent for a needless second pass.
 */
export function languageMatches(text: string, output: OutputLanguage): boolean {
  const parts = sentences(text);
  // Every sentence must fit (catches half-translated answers), and so must the
  // whole text, whose short sentences may each be inconclusive.
  if (!parts.every((s) => evidenceMatches(evidence(s), output))) return false;
  return parts.length <= 1 || evidenceMatches(evidence(text), output);
}

/** Uzbek written in Cyrillic (not Russian), so it can be transliterated locally. */
export function looksLikeUzbekCyrillic(text: string): boolean {
  const e = evidence(text);
  // Brand names (Click, Payme) may stay Latin; lower-case Latin words may not.
  if (scriptOf(e) !== 'cyrl' || e.latnLower > 0) return false;
  // Only evidence Russian can never have counts (ўқғҳ, Uzbek-only words and
  // endings): short Russian with a shared word (хоп, рахмат) must be translated.
  if (e.uzCyrlStrong < 0.75 || e.uzCyrl < 1.5 * e.ru) return false;
  return sentences(text).every((s) => {
    const se = evidence(s);
    return se.uzCyrl >= se.ru;
  });
}
