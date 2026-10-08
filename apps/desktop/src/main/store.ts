import { DEFAULT_SETTINGS, sanitizeSettings, type ProviderId } from '@ovozyoz/core';
import { app, safeStorage } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_CYCLE_HOTKEY, DEFAULT_HOTKEY } from '../shared/hotkeys';
import type { DesktopSettings } from '../shared/types';

const PROVIDERS: ProviderId[] = ['gemini', 'openai'];

export const DEFAULT_DESKTOP_SETTINGS: DesktopSettings = {
  ...DEFAULT_SETTINGS,
  hotkey: DEFAULT_HOTKEY,
  cycleHotkey: DEFAULT_CYCLE_HOTKEY,
  autoPaste: true,
  restoreClipboard: true,
  openAtLogin: false,
};

export function sanitizeDesktopSettings(raw: unknown): DesktopSettings {
  const value = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const bool = (v: unknown, fallback: boolean) => (typeof v === 'boolean' ? v : fallback);
  const accel = (v: unknown, fallback: string) => (typeof v === 'string' ? v.trim().slice(0, 60) : fallback);
  return {
    ...sanitizeSettings(value),
    hotkey: accel(value.hotkey, DEFAULT_DESKTOP_SETTINGS.hotkey) || DEFAULT_DESKTOP_SETTINGS.hotkey,
    cycleHotkey: accel(value.cycleHotkey, DEFAULT_DESKTOP_SETTINGS.cycleHotkey),
    autoPaste: bool(value.autoPaste, DEFAULT_DESKTOP_SETTINGS.autoPaste),
    restoreClipboard: bool(value.restoreClipboard, DEFAULT_DESKTOP_SETTINGS.restoreClipboard),
    openAtLogin: bool(value.openAtLogin, DEFAULT_DESKTOP_SETTINGS.openAtLogin),
  };
}

function file(name: string): string {
  return path.join(app.getPath('userData'), name);
}

function readJson(name: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(file(name), 'utf8'));
  } catch {
    return undefined;
  }
}

function writeJson(name: string, value: unknown): void {
  const target = file(name);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  // Write-then-rename so a crash never leaves a half-written file.
  const tmp = `${target}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, target);
}

export function loadSettings(): DesktopSettings {
  return sanitizeDesktopSettings(readJson('settings.json'));
}

export function saveSettings(settings: DesktopSettings): void {
  writeJson('settings.json', settings);
}

/** True when keys can be encrypted with the OS keychain / DPAPI / libsecret. */
export async function secureStorageAvailable(): Promise<boolean> {
  try {
    return await safeStorage.isAsyncEncryptionAvailable();
  } catch {
    return false;
  }
}

interface StoredKey {
  encrypted: boolean;
  value: string;
}

type StoredKeys = Partial<Record<ProviderId, StoredKey>>;

// Decrypting can show a keychain prompt, so do it once per key and remember it.
const keyCache = new Map<ProviderId, string>();
/** Keys that are stored but could not be decrypted the last time we tried. */
const unreadable = new Set<ProviderId>();

export async function loadApiKey(provider: ProviderId): Promise<string> {
  const cached = keyCache.get(provider);
  if (cached !== undefined) return cached;
  const stored = (readJson('keys.json') as StoredKeys | undefined)?.[provider];
  let key = '';
  if (stored && typeof stored.value === 'string') {
    if (!stored.encrypted) key = stored.value;
    else {
      try {
        key = (await safeStorage.decryptStringAsync(Buffer.from(stored.value, 'base64'))).result;
      } catch {
        unreadable.add(provider); // e.g. keychain access denied; ask again next time
        return '';
      }
    }
  }
  unreadable.delete(provider);
  keyCache.set(provider, key);
  return key;
}

/** True when a key is saved for the provider but could not be decrypted. */
export function isKeyUnreadable(provider: ProviderId): boolean {
  return unreadable.has(provider);
}

export async function saveApiKeys(keys: Partial<Record<ProviderId, string>>): Promise<void> {
  const current = (readJson('keys.json') as StoredKeys | undefined) ?? {};
  const encrypt = await secureStorageAvailable();
  const changed = new Map<ProviderId, string>();
  for (const provider of PROVIDERS) {
    const key = keys[provider];
    if (key === undefined) continue;
    const trimmed = key.trim();
    if (!trimmed) {
      delete current[provider];
    } else if (encrypt) {
      const encrypted = await safeStorage.encryptStringAsync(trimmed);
      current[provider] = { encrypted: true, value: encrypted.toString('base64') };
    } else {
      current[provider] = { encrypted: false, value: trimmed };
    }
    changed.set(provider, trimmed);
  }
  if (changed.size === 0) return;
  writeJson('keys.json', current);
  // Only after the write succeeded, so the cache never holds an unsaved key.
  for (const [provider, key] of changed) {
    keyCache.set(provider, key);
    unreadable.delete(provider);
  }
}

/** "AIzaSyD…k3Q" — enough to recognise a key without revealing it. */
export function maskKey(key: string): string {
  if (!key) return '';
  if (key.length <= 10) return '•'.repeat(key.length);
  return `${key.slice(0, 6)}…${key.slice(-3)}`;
}
