import { describe, expect, it } from 'vitest';
import { DEFAULT_HOTKEY, HOTKEY_PRESETS, hotkeyLabel, validateHotkey } from '../src/shared/hotkeys';

describe('hotkeyLabel', () => {
  it('uses macOS symbols in the standard order', () => {
    expect(hotkeyLabel('Control+Alt+D', 'darwin')).toBe('⌃⌥D');
    expect(hotkeyLabel('Shift+Control+Space', 'darwin')).toBe('⌃⇧ Space');
    expect(hotkeyLabel('CommandOrControl+Shift+K', 'darwin')).toBe('⇧⌘K');
    expect(hotkeyLabel('F8', 'darwin')).toBe('F8');
  });

  it('uses readable names elsewhere', () => {
    expect(hotkeyLabel('Control+Alt+D', 'win32')).toBe('Ctrl+Alt+D');
    expect(hotkeyLabel('CmdOrCtrl+Shift+Space', 'win32')).toBe('Ctrl+Shift+Space');
    expect(hotkeyLabel('', 'win32')).toBe('');
  });
});

describe('validateHotkey', () => {
  it('accepts the default and every preset on both platforms', () => {
    for (const platform of ['darwin', 'win32']) {
      expect(validateHotkey(DEFAULT_HOTKEY, platform)).toBeNull();
      for (const preset of HOTKEY_PRESETS) expect(validateHotkey(preset, platform)).toBeNull();
    }
  });

  it('rejects keys that would break normal typing', () => {
    expect(validateHotkey('D', 'win32')).toMatch(/Control, Alt yoki Shift/);
    expect(validateHotkey('Shift+D', 'win32')).toMatch(/Shift/);
    expect(validateHotkey('Control++', 'win32')).toMatch(/noto'g'ri/);
    expect(validateHotkey('Hyper+D', 'win32')).toMatch(/Modifikator/);
    expect(validateHotkey('Control+Ö', 'win32')).toMatch(/ishlatib/);
  });

  it('blocks Option-only shortcuts that macOS 15 refuses', () => {
    expect(validateHotkey('Alt+D', 'darwin')).toMatch(/macOS/);
    expect(validateHotkey('Alt+Shift+D', 'darwin')).toMatch(/macOS/);
    expect(validateHotkey('Alt+D', 'win32')).toBeNull();
  });
});
