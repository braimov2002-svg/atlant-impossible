import { describe, expect, it } from 'vitest';
import { cleanModelText, normalizeUzbekApostrophes } from '../src/text';

describe('normalizeUzbekApostrophes', () => {
  const mixed = 'O‘zbekiston go’zal, bogʻ, ma’no, san`at.';

  it('converts every variant to ASCII', () => {
    expect(normalizeUzbekApostrophes(mixed, 'ascii')).toBe("O'zbekiston go'zal, bog', ma'no, san'at.");
  });

  it('converts to the official letters (oʻ gʻ with U+02BB, tutuq U+02BC)', () => {
    expect(normalizeUzbekApostrophes(mixed, 'official')).toBe(
      'Oʻzbekiston goʻzal, bogʻ, maʼno, sanʼat.',
    );
  });

  it('is idempotent', () => {
    for (const style of ['ascii', 'official'] as const) {
      const once = normalizeUzbekApostrophes(mixed, style);
      expect(normalizeUzbekApostrophes(once, style)).toBe(once);
    }
  });

  it('leaves quotes around words alone', () => {
    expect(normalizeUzbekApostrophes("U 'salom' dedi", 'official')).toBe("U 'salom' dedi");
  });

  it('treats a mark after a word-final o as a closing quote', () => {
    expect(normalizeUzbekApostrophes("U 'Bobo' dedi", 'official')).toBe("U 'Bobo' dedi");
    expect(normalizeUzbekApostrophes('U \u2018Bobo\u2019 dedi', 'ascii')).toBe('U \u2018Bobo\u2019 dedi');
  });

  it('keeps word-final g\u02BB (bog\u02BB, tog\u02BB)', () => {
    expect(normalizeUzbekApostrophes('bog\u2019 va tog\u2018', 'official')).toBe('bog\u02BB va tog\u02BB');
    expect(normalizeUzbekApostrophes('bog\u2019 va tog\u2018da', 'ascii')).toBe("bog' va tog'da");
  });

  it('keeps text untouched in keep mode', () => {
    expect(normalizeUzbekApostrophes(mixed, 'keep')).toBe(mixed);
  });
});

describe('cleanModelText', () => {
  it('trims and strips code fences', () => {
    expect(cleanModelText('```text\nSalom dunyo\n```  ')).toBe('Salom dunyo');
    expect(cleanModelText('```\nSalom\n```')).toBe('Salom');
  });

  it('strips one pair of wrapping quotes', () => {
    expect(cleanModelText('"Salom, qalaysan?"')).toBe('Salom, qalaysan?');
    expect(cleanModelText('«Привет»')).toBe('Привет');
    expect(cleanModelText('“Hello”')).toBe('Hello');
  });

  it('keeps quotes that are part of the text', () => {
    expect(cleanModelText('"Ha" dedi, keyin "yo\'q" dedi')).toBe('"Ha" dedi, keyin "yo\'q" dedi');
  });

  it('normalises Windows newlines', () => {
    expect(cleanModelText('a\r\nb')).toBe('a\nb');
  });
});
