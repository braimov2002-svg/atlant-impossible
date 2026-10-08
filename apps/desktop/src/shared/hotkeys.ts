// Pure helpers for Electron accelerators (no Electron imports, unit-tested).

export const DEFAULT_HOTKEY = 'Control+Alt+D';
export const DEFAULT_CYCLE_HOTKEY = 'Control+Alt+L';

/** Choices offered in settings; free-form accelerators are also accepted. */
export const HOTKEY_PRESETS = [
  'Control+Alt+D',
  'Control+Alt+Space',
  'Control+Shift+Space',
  'Control+Shift+D',
  'F8',
] as const;

const MAC_SYMBOLS: Record<string, string> = {
  control: '⌃',
  ctrl: '⌃',
  alt: '⌥',
  option: '⌥',
  shift: '⇧',
  command: '⌘',
  cmd: '⌘',
  commandorcontrol: '⌘',
  cmdorctrl: '⌘',
  super: '⌘',
  meta: '⌘',
};

const PC_NAMES: Record<string, string> = {
  control: 'Ctrl',
  ctrl: 'Ctrl',
  alt: 'Alt',
  option: 'Alt',
  shift: 'Shift',
  command: 'Win',
  cmd: 'Win',
  commandorcontrol: 'Ctrl',
  cmdorctrl: 'Ctrl',
  super: 'Win',
  meta: 'Win',
};

// macOS lists modifiers in this order: ⌃ ⌥ ⇧ ⌘
const MAC_ORDER = ['⌃', '⌥', '⇧', '⌘'];

/** "Control+Alt+D" -> "⌃⌥D" on macOS, "Ctrl+Alt+D" elsewhere. */
export function hotkeyLabel(accelerator: string, platform: string): string {
  const parts = accelerator.split('+').map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return '';
  const key = parts[parts.length - 1];
  const modifiers = parts.slice(0, -1);
  const keyLabel = key.length === 1 ? key.toUpperCase() : key;

  if (platform === 'darwin') {
    const symbols = modifiers.map((m) => MAC_SYMBOLS[m.toLowerCase()] ?? m);
    symbols.sort((a, b) => MAC_ORDER.indexOf(a) - MAC_ORDER.indexOf(b));
    const gap = symbols.length > 0 && key.length > 1 ? ' ' : '';
    return `${symbols.join('')}${gap}${keyLabel}`;
  }
  return [...modifiers.map((m) => PC_NAMES[m.toLowerCase()] ?? m), keyLabel].join('+');
}

const KEY = /^([A-Z0-9]|F([1-9]|1[0-9]|2[0-4])|Space|Tab|Backspace|Delete|Insert|Home|End|PageUp|PageDown|Up|Down|Left|Right|Esc|Escape|Return|Enter|Plus|[`\-=[\]\\;',./])$/i;
const MODIFIER = /^(Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super|Meta)$/i;

/**
 * Checks the shape of an accelerator before handing it to Electron.
 * Returns an Uzbek error message, or null when it looks valid.
 */
export function validateHotkey(accelerator: string, platform: string): string | null {
  const parts = accelerator.split('+').map((p) => p.trim());
  if (parts.some((p) => !p)) return "Tugmalar birikmasi noto'g'ri yozilgan.";
  const key = parts[parts.length - 1];
  const modifiers = parts.slice(0, -1);
  if (!KEY.test(key)) return `"${key}" tugmasini ishlatib bo'lmaydi.`;
  if (modifiers.some((m) => !MODIFIER.test(m))) return "Modifikator tugma noto'g'ri (Control, Alt, Shift, Command).";
  const lower = modifiers.map((m) => m.toLowerCase());
  const isFunctionKey = /^F\d+$/i.test(key);
  if (modifiers.length === 0 && !isFunctionKey) return 'Kamida bitta Control, Alt yoki Shift qo‘shing.';
  if (lower.length > 0 && lower.every((m) => m === 'shift') && !isFunctionKey) {
    return 'Faqat Shift bilan bo‘lmaydi — matn yozishga xalaqit beradi.';
  }
  if (
    platform === 'darwin' &&
    lower.length > 0 &&
    lower.every((m) => m === 'alt' || m === 'option' || m === 'shift')
  ) {
    // macOS 15+ refuses global hotkeys that use only Option (and Shift).
    return 'macOS faqat Option (⌥) bilan ishlaydigan birikmalarni taqiqlaydi. Control yoki Command qo‘shing.';
  }
  return null;
}
