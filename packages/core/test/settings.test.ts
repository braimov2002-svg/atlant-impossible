import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, modelOverrides, sanitizeSettings } from '../src/settings';

describe('sanitizeSettings', () => {
  it('falls back to defaults for missing or invalid data', () => {
    expect(sanitizeSettings(undefined)).toEqual(DEFAULT_SETTINGS);
    expect(sanitizeSettings('garbage')).toEqual(DEFAULT_SETTINGS);
    expect(sanitizeSettings({ provider: 'x', spoken: 'de', output: 'fr', apostrophes: 1 })).toEqual(DEFAULT_SETTINGS);
  });

  it('keeps valid values', () => {
    const s = sanitizeSettings({ provider: 'openai', spoken: 'auto', output: 'ru', apostrophes: 'official', openaiModel: 'm' });
    expect(s).toMatchObject({ provider: 'openai', spoken: 'auto', output: 'ru', apostrophes: 'official', openaiModel: 'm' });
  });

  it('exposes overrides for the active provider only', () => {
    expect(modelOverrides({ ...DEFAULT_SETTINGS, geminiModel: 'g' })).toEqual({ model: 'g' });
    expect(modelOverrides({ ...DEFAULT_SETTINGS, provider: 'openai', openaiTextModel: 't' })).toEqual({
      model: undefined,
      textModel: 't',
    });
  });
});
