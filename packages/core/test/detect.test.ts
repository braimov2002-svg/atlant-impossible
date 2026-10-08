import { describe, expect, it } from 'vitest';
import { languageMatches, looksLikeUzbekCyrillic } from '../src/detect';
import type { OutputLanguage } from '../src/languages';

// Realistic dictation outputs, including every case the review found.
const CASES: Record<OutputLanguage, { accept: string[]; reject: string[] }> = {
  ru: {
    accept: [
      'Здравствуйте! Встретимся завтра в десять. Пожалуйста, возьмите документы.',
      'Привет, как дела?',
      'Хорошо.',
      'Мой email: dilshod.karimov@gmail.com',
      'Купил iPhone 15 Pro Max',
      'Установи WhatsApp Business',
      'Проверь pull request в GitHub',
      'Документы готовы, можно забирать',
      'Я уже еду, буду через десять минут',
      'Telegram',
      'OK',
    ],
    reject: [
      'Пулни картага ташлаб юбордим',
      'Эртага соат учда учрашамиз',
      'Бугун ишга бормайман, касалман',
      'Мен сизни кутяпман',
      'Ассалому алайкум, яхшимисиз?',
      'Ассалому алайкум, азиз дўстлар! Эртага соат учда университет олдида учрашамиз, илтимос кечикманг.',
      'Здравствуйте! Встретимся завтра в десять. Iltimos, hujjatlarni olib keling.',
      "Assalomu alaykum! Ertaga soat o'nda uchrashamiz. Iltimos, hujjatlarni olib keling.",
      'Раҳмат.',
      'Salom, qalaysan?',
    ],
  },
  'uz-cyrl': {
    accept: [
      'Ассалому алайкум! Эртага соат ўнда учрашамиз. Илтимос, ҳужжатларни олиб келинг.',
      'Эртага эрталаб соат саккизда машина олиб келаман, тайёр туринглар',
      'Эртага соат олтида келинг, мен сизни кутаман. Илтимос, кечикманг.',
      'iPhone 15 Pro Max сотиб олдим',
      'Telegram’да ёзинг',
      'Раҳмат.',
    ],
    reject: [
      'Документы готовы, можно забирать',
      'Привет, как дела?',
      'Я уже еду, буду через десять минут',
      'Завтра собрание в девять утра, не опаздывайте',
      'Здравствуйте! Встретимся завтра в десять. Пожалуйста, возьмите документы.',
      "Assalomu alaykum! Ertaga soat o'nda uchrashamiz.",
      'Спасибо!',
    ],
  },
  'uz-latn': {
    accept: [
      "Assalomu alaykum! Ertaga soat o'nda uchrashamiz. Iltimos, hujjatlarni olib keling.",
      'Salom',
      'Rahmat',
      'Ertaga uchrashamiz',
      'Pulni kartaga tashlab yubordim',
      "Telegram'da yozing",
      'iPhone 15 Pro Max sotib oldim',
      'Bugun ishga bormayman, kasalman',
      "Mening email manzilim: dilshod.karimov@gmail.com",
    ],
    reject: [
      'Payment sent, check your account',
      'Good morning everyone',
      'Happy birthday',
      'Meeting moved to Friday',
      'Sounds great, talk soon',
      'Just landed in Tashkent',
      "Hello! Let's meet tomorrow at ten. Please bring the documents.",
      'Скачай приложение WhatsApp Business и Telegram Premium',
      'Установи WhatsApp Business',
      'Зайди в Instagram и Facebook',
      'Мой email: dilshod.karimov@gmail.com',
      'Проверь pull request в GitHub',
      "Ertaga встреча bo'ladi",
      'Раҳмат.',
      'Спасибо!',
      'Здравствуйте! Встретимся завтра в десять.',
    ],
  },
  en: {
    accept: [
      "Hello! Let's meet tomorrow at ten. Please bring the documents.",
      'Ulugʻbek, Oʻtkir, Gʻayrat — meeting moved to Friday',
      "Who's free? Dinner at seven o'clock",
      "Who's coming? Everything's ready.",
      'Ha ha, very funny.',
      'Good morning everyone',
      'Happy birthday',
      'Payment sent, check your account',
      'OK',
    ],
    reject: [
      'Pulni kartaga tashlab yubordim',
      'Bugun ishga bormayman, kasalman',
      "Hujjatlarni tayyorlab qo'ying",
      'Kechirasiz, kechikib qolaman',
      "Narxi qancha bo'ladi?",
      'Bizning uyga kelinglar, osh damlaymiz',
      'Darsga kelmayman, kechirasiz',
      'Sizni tabriklayman, baxt tilayman',
      'Ertaga uchrashamiz',
      'Спасибо!',
      'Hello! Let us meet tomorrow. Привет, как дела, всё хорошо?',
      "Assalomu alaykum! Ertaga soat o'nda uchrashamiz.",
    ],
  },
};

describe('languageMatches corpus', () => {
  for (const [output, { accept, reject }] of Object.entries(CASES) as Array<[OutputLanguage, (typeof CASES)['ru']]>) {
    for (const text of accept) it(`${output} accepts: ${text}`, () => expect(languageMatches(text, output)).toBe(true));
    for (const text of reject) it(`${output} rejects: ${text}`, () => expect(languageMatches(text, output)).toBe(false));
  }
});

describe('looksLikeUzbekCyrillic', () => {
  it('is true only for Uzbek written in Cyrillic', () => {
    expect(looksLikeUzbekCyrillic('Ассалому алайкум! Эртага соат ўнда учрашамиз.')).toBe(true);
    expect(looksLikeUzbekCyrillic('Раҳмат.')).toBe(true);
    expect(looksLikeUzbekCyrillic('Здравствуйте! Встретимся завтра в десять.')).toBe(false);
    expect(looksLikeUzbekCyrillic('Позвони Ғайрату, он ждёт')).toBe(false);
    expect(looksLikeUzbekCyrillic('Пожалуйста, возьмите документы завтра утром. Ўзим олиб бораман.')).toBe(false);
  });
});

describe('languageMatches on the review corpus', async () => {
  const { CORPUS } = await import('./fixtures/language-corpus');
  for (const target of ['uz-latn', 'uz-cyrl', 'ru', 'en'] as const) {
    it(`${target}: accepts its own language and rejects the others`, () => {
      const wrong = CORPUS.filter(([lang, text]) => lang !== 'neutral' && languageMatches(text, target) !== (lang === target));
      expect(wrong.map(([lang, text]) => `${lang}: ${text}`)).toEqual([]);
    });
  }
});
