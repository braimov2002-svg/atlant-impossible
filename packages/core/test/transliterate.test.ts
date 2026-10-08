import { describe, expect, it } from 'vitest';
import { cyrillicRatio, uzCyrillicToLatin } from '../src/transliterate';

describe('uzCyrillicToLatin', () => {
  it('converts the special Uzbek letters', () => {
    expect(uzCyrillicToLatin('Ўзбекистон, ғалаба, қишлоқ, ҳаёт')).toBe(
      'Oʻzbekiston, gʻalaba, qishloq, hayot',
    );
  });

  it('handles е at word start, after vowels and after consonants', () => {
    expect(uzCyrillicToLatin('Ер оёқ келди')).toBe('Yer oyoq keldi');
    expect(uzCyrillicToLatin('мое')).toBe('moye');
  });

  it('handles ц and the hard/soft signs', () => {
    expect(uzCyrillicToLatin('цирк милиция')).toBe('sirk militsiya');
    expect(uzCyrillicToLatin("маъно мебель")).toBe('maʼno mebel');
  });

  it('keeps capitalisation of digraphs', () => {
    expect(uzCyrillicToLatin('Шаҳар ШАҲАР Чироқ')).toBe('Shahar SHAHAR Chiroq');
  });

  it('passes Latin text, digits and punctuation through', () => {
    expect(uzCyrillicToLatin('Salom 2026!')).toBe('Salom 2026!');
  });
});

describe('cyrillicRatio', () => {
  it('measures the share of Cyrillic letters', () => {
    expect(cyrillicRatio('Салом')).toBe(1);
    expect(cyrillicRatio('Salom')).toBe(0);
    expect(cyrillicRatio('123 !!')).toBe(0);
    expect(cyrillicRatio('ab вг')).toBe(0.5);
  });
});
