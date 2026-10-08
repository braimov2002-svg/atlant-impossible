import {
  DictationError,
  MAX_RECORDING_SECONDS,
  modelOverrides,
  OUTPUT_LANGUAGES,
  outputLanguage,
  PROVIDERS,
  SPOKEN_LANGUAGES,
  spokenLanguage,
  transcribe,
  userMessage,
  type OutputLanguage,
  type ProviderId,
} from '@ovozyoz/core';
import {
  app,
  BrowserWindow,
  clipboard,
  globalShortcut,
  ipcMain,
  Menu,
  nativeImage,
  net,
  session,
  shell,
  systemPreferences,
  Tray,
  type IpcMainEvent,
  type IpcMainInvokeEvent,
  type MenuItemConstructorOptions,
} from 'electron';
import path from 'node:path';
import { hotkeyLabel, validateHotkey } from '../shared/hotkeys';
import {
  IPC,
  type DesktopSettings,
  type PermissionKind,
  type RecordingFailure,
  type SaveResult,
  type SettingsSnapshot,
  type SettingsUpdate,
} from '../shared/types';
import { Hud } from './hud';
import { canSendKeystrokes, disposePaster, insertText, warmUpPaster } from './paste';
import {
  loadApiKey,
  loadSettings,
  maskKey,
  sanitizeDesktopSettings,
  saveApiKeys,
  saveSettings,
  secureStorageAvailable,
} from './store';

type Phase = 'idle' | 'starting' | 'recording' | 'transcribing';

export interface AppOptions {
  /** Replaces network access to the providers (used by the smoke test). */
  fetch?: typeof fetch;
  /** Called once the tray, HUD and hotkeys are ready. */
  onReady?: (controls: AppControls) => void;
}

export interface AppControls {
  toggle: () => Promise<void>;
  cancel: () => void;
  openSettings: () => void;
  hudWindow: () => BrowserWindow;
  settingsWindow: () => BrowserWindow | null;
  phase: () => string;
  lastText: () => string;
}

let options: AppOptions = {};

const ASSETS = path.join(__dirname, '..', 'assets');
const isMac = process.platform === 'darwin';

let settings: DesktopSettings;
let hud: Hud;
let tray: Tray | null = null;
let settingsWindow: BrowserWindow | null = null;
let phase: Phase = 'idle';
let recordingSession = 0;
let stopWhenStarted = false;
let abort: AbortController | null = null;
let lastText = '';
let hotkeyErrors: string[] = [];
let escapeRegistered = false;
let phaseTimer: NodeJS.Timeout | undefined;

/** The HUD must deliver the audio quickly after "stop"; never hang the app. */
const AUDIO_DEADLINE_MS = 20_000;

const label = (accelerator: string) => hotkeyLabel(accelerator, process.platform);
const pasteKeys = isMac ? '⌘V' : 'Ctrl+V';

function badge(): string {
  const spoken = settings.spoken === 'auto' ? 'AUTO' : settings.spoken.toUpperCase();
  return `${spoken} → ${outputLanguage(settings.output).short}`;
}

// ---------------------------------------------------------------- recording

function setPhase(next: Phase): void {
  phase = next;
  clearTimeout(phaseTimer);
  if (next === 'recording') {
    // Stop automatically at the length limit instead of failing later.
    phaseTimer = setTimeout(() => phase === 'recording' && stopRecording(), MAX_RECORDING_SECONDS * 1000);
  } else if (next === 'transcribing') {
    const sessionId = recordingSession;
    phaseTimer = setTimeout(() => {
      if (phase === 'transcribing' && sessionId === recordingSession && !abort) {
        onRecordingFailed(sessionId, { code: 'timeout', message: userMessage(new DictationError('mic-unavailable')) });
      }
    }, AUDIO_DEADLINE_MS);
  }
  if (next === 'idle') unregisterEscape();
  else registerEscape();
  updateTray();
}

async function microphoneAllowed(): Promise<boolean> {
  if (!isMac) return true;
  const status = systemPreferences.getMediaAccessStatus('microphone');
  if (status === 'granted') return true;
  if (status === 'not-determined') return systemPreferences.askForMediaAccess('microphone');
  return false;
}

async function toggle(): Promise<void> {
  if (phase === 'idle') return startRecording();
  if (phase === 'recording') return stopRecording();
  if (phase === 'starting') {
    stopWhenStarted = true;
    return;
  }
  hud.show({ kind: 'info', message: "Hali o'girilmoqda... Bekor qilish: Esc" }, 1500);
}

async function startRecording(): Promise<void> {
  if (!(await loadApiKey(settings.provider))) {
    hud.show({ kind: 'error', message: userMessage(new DictationError('no-api-key')) }, 4000);
    openSettings();
    return;
  }
  phase = 'starting';
  if (!(await microphoneAllowed())) {
    setPhase('idle');
    hud.show(
      { kind: 'error', message: "Mikrofonga ruxsat yo'q: Tizim sozlamalari → Maxfiylik → Mikrofon → OvozYoz" },
      6000,
    );
    openPermission('microphone');
    return;
  }
  recordingSession += 1;
  stopWhenStarted = false;
  setPhase('starting');
  hud.show({ kind: 'recording', hotkey: label(settings.hotkey), badge: badge() });
  hud.send({ type: 'start', session: recordingSession });
}

function stopRecording(): void {
  setPhase('transcribing');
  hud.show({ kind: 'transcribing', badge: badge() });
  hud.send({ type: 'stop', session: recordingSession });
}

function cancel(): void {
  if (phase === 'idle') return;
  hud.send({ type: 'cancel', session: recordingSession });
  abort?.abort();
  recordingSession += 1; // anything still in flight belongs to a dead session now
  setPhase('idle');
  hud.show({ kind: 'info', message: 'Bekor qilindi' }, 900);
}

function onRecordingStarted(sessionId: number): void {
  if (sessionId !== recordingSession || phase !== 'starting') return;
  setPhase('recording');
  if (stopWhenStarted) stopRecording();
}

function onRecordingFailed(sessionId: number, failure: RecordingFailure): void {
  if (sessionId !== recordingSession || phase === 'idle') return;
  setPhase('idle');
  hud.show({ kind: 'error', message: failure.message }, 5000);
}

async function onAudio(sessionId: number, wav: Uint8Array): Promise<void> {
  if (sessionId !== recordingSession || phase !== 'transcribing') return;
  const controller = new AbortController();
  abort = controller;
  try {
    const result = await transcribe({
      provider: settings.provider,
      apiKey: await loadApiKey(settings.provider),
      audio: wav,
      spoken: settings.spoken,
      output: settings.output,
      apostrophes: settings.apostrophes,
      signal: controller.signal,
      // net.fetch uses Chromium's network stack, so system proxies work too.
      fetch: options.fetch ?? ((input, init) => net.fetch(input as string, init)),
      ...modelOverrides(settings),
    });
    if (sessionId !== recordingSession) return;
    lastText = result.text;
    const outcome = await insertText(result.text, settings);
    if (outcome === 'pasted') hud.show({ kind: 'done', message: 'Yozildi' }, 1100);
    else if (outcome === 'needs-accessibility') {
      hud.show(
        { kind: 'info', message: `Nusxalandi — ${pasteKeys} bosing. Avto-joylash uchun Accessibility ruxsatini bering` },
        6000,
      );
    } else hud.show({ kind: 'done', message: `Nusxalandi — ${pasteKeys} bilan joylang` }, 3000);
  } catch (error) {
    if (sessionId !== recordingSession) return;
    hud.show({ kind: 'error', message: userMessage(error) }, 6000);
  } finally {
    if (abort === controller) abort = null;
    if (sessionId === recordingSession) setPhase('idle');
  }
}

function cycleOutput(): void {
  if (phase !== 'idle') return;
  const ids = OUTPUT_LANGUAGES.map((l) => l.id);
  const next = ids[(ids.indexOf(settings.output) + 1) % ids.length] as OutputLanguage;
  updateSettings({ output: next });
  hud.show({ kind: 'info', message: `Matn tili: ${outputLanguage(next).label}` }, 1400);
}

// ------------------------------------------------------------------ hotkeys

/**
 * Windows repeats a global hotkey while it is held down; without this a long
 * press would start and stop recording several times.
 */
function debounced(handler: () => void, ms = 400): () => void {
  let last = 0;
  return () => {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    handler();
  };
}

function registerEscape(): void {
  if (escapeRegistered) return;
  try {
    escapeRegistered = globalShortcut.register('Escape', cancel);
  } catch {
    escapeRegistered = false;
  }
}

function unregisterEscape(): void {
  if (!escapeRegistered) return;
  globalShortcut.unregister('Escape');
  escapeRegistered = false;
}

function registerHotkeys(): string[] {
  globalShortcut.unregisterAll();
  escapeRegistered = false;
  const errors: string[] = [];
  const register = (accelerator: string, handler: () => void, name: string) => {
    const invalid = validateHotkey(accelerator, process.platform);
    if (invalid) {
      errors.push(`${name}: ${invalid}`);
      return;
    }
    let ok = false;
    try {
      ok = globalShortcut.register(accelerator, handler);
    } catch {
      ok = false;
    }
    if (!ok) errors.push(`${name}: ${label(accelerator)} boshqa dastur tomonidan band. Boshqa birikma tanlang.`);
  };

  register(settings.hotkey, debounced(() => void toggle()), 'Yozish tugmasi');
  if (settings.cycleHotkey) {
    if (settings.cycleHotkey.toLowerCase() === settings.hotkey.toLowerCase()) {
      errors.push("Til almashtirish: yozish tugmasidan farqli bo'lishi kerak.");
    } else {
      register(settings.cycleHotkey, debounced(cycleOutput), 'Til almashtirish');
    }
  }
  if (phase !== 'idle') registerEscape();
  hotkeyErrors = errors;
  return errors;
}

// --------------------------------------------------------------------- tray

function trayIcon(): Electron.NativeImage {
  if (isMac) {
    const icon = nativeImage.createFromPath(path.join(ASSETS, 'trayTemplate.png'));
    icon.setTemplateImage(true);
    return icon;
  }
  return nativeImage.createFromPath(path.join(ASSETS, 'tray-color.png'));
}

function updateTray(): void {
  if (!tray) return;
  const busy = phase === 'transcribing';
  const recording = phase === 'recording' || phase === 'starting';
  const template: MenuItemConstructorOptions[] = [
    {
      label: recording ? `To'xtatish (${label(settings.hotkey)})` : `Yozishni boshlash (${label(settings.hotkey)})`,
      enabled: !busy,
      click: () => void toggle(),
    },
    ...(phase !== 'idle' ? [{ label: 'Bekor qilish (Esc)', click: cancel }] : []),
    { type: 'separator' },
    {
      label: `Men gapiraman: ${spokenLanguage(settings.spoken).label}`,
      submenu: SPOKEN_LANGUAGES.map((l) => ({
        label: l.label,
        type: 'radio' as const,
        checked: settings.spoken === l.id,
        click: () => updateSettings({ spoken: l.id }),
      })),
    },
    {
      label: `Matn tili: ${outputLanguage(settings.output).label}`,
      submenu: [
        ...OUTPUT_LANGUAGES.map((l) => ({
          label: l.label,
          type: 'radio' as const,
          checked: settings.output === l.id,
          click: () => updateSettings({ output: l.id }),
        })),
        ...(settings.cycleHotkey
          ? [{ type: 'separator' as const }, { label: `Almashtirish: ${label(settings.cycleHotkey)}`, enabled: false }]
          : []),
      ],
    },
    { type: 'separator' },
    {
      label: 'Oxirgi matnni nusxalash',
      enabled: !!lastText,
      click: () => void clipboard.writeText(lastText),
    },
    { label: 'Sozlamalar…', click: openSettings },
    { type: 'separator' },
    { label: 'Chiqish', click: () => app.quit() },
  ];
  tray.setContextMenu(Menu.buildFromTemplate(template));
  tray.setToolTip(`OvozYoz — ${badge()} (${label(settings.hotkey)})`);
}

function createTray(): void {
  tray = new Tray(trayIcon());
  // Windows shows the menu on right-click only; make left-click open it too.
  if (!isMac) tray.on('click', () => tray?.popUpContextMenu());
  updateTray();
}

// ----------------------------------------------------------------- settings

function updateSettings(patch: Partial<DesktopSettings>): void {
  settings = sanitizeDesktopSettings({ ...settings, ...patch });
  saveSettings(settings);
  updateTray();
}

function applyLoginItem(): void {
  if (process.platform === 'linux') return;
  try {
    app.setLoginItemSettings({ openAtLogin: settings.openAtLogin });
  } catch {
    // not supported for this build (e.g. portable exe)
  }
}

async function snapshot(): Promise<SettingsSnapshot> {
  const providers: ProviderId[] = ['gemini', 'openai'];
  const previews = await Promise.all(providers.map(async (p) => [p, maskKey(await loadApiKey(p))] as const));
  return {
    settings,
    keyPreview: Object.fromEntries(previews) as Record<ProviderId, string>,
    platform: process.platform,
    hotkeyErrors,
    secureStorage: await secureStorageAvailable(),
  };
}

async function save(update: SettingsUpdate): Promise<SaveResult> {
  await saveApiKeys(update.keys ?? {});
  settings = sanitizeDesktopSettings(update.settings);
  saveSettings(settings);
  const errors = registerHotkeys();
  applyLoginItem();
  updateTray();
  return { ok: errors.length === 0, hotkeyErrors: errors };
}

function openSettings(): void {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.show();
    settingsWindow.focus();
    if (isMac) app.focus({ steal: true });
    return;
  }
  settingsWindow = new BrowserWindow({
    width: 580,
    height: 760,
    minWidth: 480,
    minHeight: 520,
    title: 'OvozYoz — Sozlamalar',
    show: false,
    autoHideMenuBar: true,
    icon: path.join(ASSETS, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload-settings.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });
  const win = settingsWindow;
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (event) => event.preventDefault());
  win.once('ready-to-show', () => {
    win.show();
    if (isMac) app.focus({ steal: true });
  });
  win.on('closed', () => {
    settingsWindow = null;
  });
  void win.loadFile(path.join(__dirname, 'settings.html'));
}

function openPermission(kind: PermissionKind): void {
  if (isMac) {
    if (kind === 'accessibility') canSendKeystrokes(true);
    const pane = kind === 'microphone' ? 'Privacy_Microphone' : 'Privacy_Accessibility';
    void shell.openExternal(`x-apple.systempreferences:com.apple.preference.security?${pane}`);
  } else if (process.platform === 'win32' && kind === 'microphone') {
    void shell.openExternal('ms-settings:privacy-microphone');
  }
}

// ---------------------------------------------------------------------- IPC

function fromHud(event: IpcMainEvent): boolean {
  return event.sender === hud?.window.webContents;
}

function fromSettings(event: IpcMainEvent | IpcMainInvokeEvent): boolean {
  return !!settingsWindow && !settingsWindow.isDestroyed() && event.sender === settingsWindow.webContents;
}

function registerIpc(): void {
  ipcMain.on(IPC.hudStarted, (event, sessionId: number) => {
    if (fromHud(event)) onRecordingStarted(sessionId);
  });
  ipcMain.on(IPC.hudFailed, (event, sessionId: number, failure: RecordingFailure) => {
    if (fromHud(event)) onRecordingFailed(sessionId, failure);
  });
  ipcMain.on(IPC.hudAudio, (event, sessionId: number, wav: Uint8Array) => {
    if (fromHud(event) && wav instanceof Uint8Array) void onAudio(sessionId, wav);
  });

  ipcMain.handle(IPC.settingsGet, (event) => {
    if (!fromSettings(event)) throw new Error('forbidden');
    return snapshot();
  });
  ipcMain.handle(IPC.settingsSave, (event, update: SettingsUpdate) => {
    if (!fromSettings(event)) throw new Error('forbidden');
    return save(update);
  });
  ipcMain.on(IPC.settingsOpenKeyPage, (event, provider: ProviderId) => {
    if (fromSettings(event) && provider in PROVIDERS) void shell.openExternal(PROVIDERS[provider].keyUrl);
  });
  ipcMain.on(IPC.settingsOpenPermission, (event, kind: PermissionKind) => {
    if (fromSettings(event) && (kind === 'microphone' || kind === 'accessibility')) openPermission(kind);
  });
  ipcMain.on(IPC.settingsClose, (event) => {
    if (fromSettings(event)) settingsWindow?.close();
  });
}

// ---------------------------------------------------------------- lifecycle

export function startApp(appOptions: AppOptions = {}): void {
  options = appOptions;
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    return;
  }
  app.on('second-instance', () => openSettings());

  app.whenReady().then(async () => {
    // Menu-bar app: no Dock icon (LSUIElement in Info.plist does the same when packaged).
    if (isMac) app.setActivationPolicy('accessory');
    if (process.platform === 'win32') app.setAppUserModelId('uz.ovozyoz.desktop');

    settings = loadSettings();
    restrictPermissions(); // only our own HUD page may use the microphone
    registerIpc();
    hud = new Hud();
    await hud.whenReady();
    createTray();
    registerHotkeys();
    applyLoginItem();
    warmUpPaster();

    const firstRun = !(await loadApiKey(settings.provider));
    if (firstRun || hotkeyErrors.length > 0) openSettings();
    else hud.show({ kind: 'info', message: `OvozYoz tayyor — ${label(settings.hotkey)} bosib gapiring` }, 2500);

    options.onReady?.({
      toggle,
      cancel,
      openSettings,
      hudWindow: () => hud.window,
      settingsWindow: () => settingsWindow,
      phase: () => phase,
      lastText: () => lastText,
    });
  });

  // Keep running in the tray when the settings window is closed.
  app.on('window-all-closed', () => undefined);
  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
    disposePaster();
  });
}

function restrictPermissions(): void {
  const isHud = (webContents: Electron.WebContents | null) => !!webContents && webContents === hud?.window.webContents;
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback, details) => {
    const mediaTypes = 'mediaTypes' in details ? (details.mediaTypes ?? []) : [];
    const audioOnly = mediaTypes.length > 0 && mediaTypes.every((type) => type === 'audio');
    callback(permission === 'media' && audioOnly && isHud(webContents) && details.requestingUrl.startsWith('file://'));
  });
  session.defaultSession.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
    return permission === 'media' && isHud(webContents) && requestingOrigin.startsWith('file://');
  });
}
