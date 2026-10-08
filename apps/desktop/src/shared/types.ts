import type { DictationSettings, ProviderId } from '@ovozyoz/core';

/** Everything the desktop app stores besides API keys. */
export interface DesktopSettings extends DictationSettings {
  /** Electron accelerator that starts/stops recording. */
  hotkey: string;
  /** Electron accelerator that cycles the output language ('' = off). */
  cycleHotkey: string;
  /** Paste the text into the focused app (otherwise only copy it). */
  autoPaste: boolean;
  /** Put the user's previous clipboard back after pasting. */
  restoreClipboard: boolean;
  openAtLogin: boolean;
}

export type HudState =
  | { kind: 'recording'; hotkey: string; badge: string }
  | { kind: 'transcribing'; badge: string }
  | { kind: 'done'; message: string }
  | { kind: 'info'; message: string }
  | { kind: 'error'; message: string };

/**
 * Commands the main process sends to the HUD renderer. Every recording has a
 * session number so late replies from a cancelled recording are ignored.
 */
export interface HudCommand {
  type: 'start' | 'stop' | 'cancel';
  session: number;
}

export interface RecordingFailure {
  code: string;
  message: string;
}

export interface SettingsSnapshot {
  settings: DesktopSettings;
  /** Masked keys ("AIza…3kQ"), never the full key. */
  keyPreview: Record<ProviderId, string>;
  platform: NodeJS.Platform;
  /** Problems with the current hotkeys, shown in the settings window. */
  hotkeyErrors: string[];
  secureStorage: boolean;
}

export interface SettingsUpdate {
  settings: DesktopSettings;
  /** New key per provider; undefined keeps the stored key, '' removes it. */
  keys: Partial<Record<ProviderId, string>>;
}

export interface SaveResult {
  ok: boolean;
  hotkeyErrors: string[];
}

export type PermissionKind = 'microphone' | 'accessibility';

/** API exposed to the HUD renderer by its preload script. */
export interface HudBridge {
  onState(listener: (state: HudState) => void): void;
  onCommand(listener: (command: HudCommand) => void): void;
  recordingStarted(session: number): void;
  sendAudio(session: number, wav: Uint8Array): void;
  recordingFailed(session: number, failure: RecordingFailure): void;
}

/** API exposed to the settings renderer by its preload script. */
export interface SettingsBridge {
  get(): Promise<SettingsSnapshot>;
  save(update: SettingsUpdate): Promise<SaveResult>;
  openKeyPage(provider: ProviderId): void;
  openPermission(kind: PermissionKind): void;
  close(): void;
}

export const IPC = {
  hudState: 'hud:state',
  hudCommand: 'hud:command',
  hudStarted: 'hud:started',
  hudAudio: 'hud:audio',
  hudFailed: 'hud:failed',
  settingsGet: 'settings:get',
  settingsSave: 'settings:save',
  settingsOpenKeyPage: 'settings:open-key-page',
  settingsOpenPermission: 'settings:open-permission',
  settingsClose: 'settings:close',
} as const;
