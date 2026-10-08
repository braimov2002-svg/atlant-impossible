import { BrowserWindow, screen } from 'electron';
import path from 'node:path';
import { IPC, type HudCommand, type HudState } from '../shared/types';

const WIDTH = 460;
const HEIGHT = 72;

/**
 * The small floating pill ("Yozilmoqda...") that also records the microphone.
 * It must never take focus, otherwise the text would be pasted into it
 * instead of the app the user was typing in.
 */
export class Hud {
  readonly window: BrowserWindow;
  private hideTimer: NodeJS.Timeout | undefined;
  private ready: Promise<void>;

  constructor() {
    this.window = new BrowserWindow({
      width: WIDTH,
      height: HEIGHT,
      show: false,
      frame: false,
      transparent: true,
      backgroundColor: '#00000000',
      resizable: false,
      movable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      skipTaskbar: true,
      focusable: false,
      hasShadow: false,
      alwaysOnTop: true,
      ...(process.platform === 'darwin' ? { type: 'panel' } : {}),
      webPreferences: {
        preload: path.join(__dirname, 'preload-hud.js'),
        contextIsolation: true,
        sandbox: true,
        nodeIntegration: false,
        backgroundThrottling: false,
        spellcheck: false,
      },
    });
    this.window.setAlwaysOnTop(true, 'screen-saver');
    // skipTransformProcessType stops Electron from toggling the Dock icon.
    this.window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true, skipTransformProcessType: true });
    this.window.setIgnoreMouseEvents(true);
    this.ready = this.window.loadFile(path.join(__dirname, 'hud.html'));
  }

  async whenReady(): Promise<void> {
    await this.ready;
  }

  send(command: HudCommand): void {
    this.window.webContents.send(IPC.hudCommand, command);
  }

  /** Never use window.show(): on a macOS panel it would steal keyboard focus. */
  show(state: HudState, hideAfterMs?: number): void {
    clearTimeout(this.hideTimer);
    this.window.webContents.send(IPC.hudState, state);
    this.position();
    if (!this.window.isVisible()) this.window.showInactive();
    if (hideAfterMs) this.hideTimer = setTimeout(() => this.hide(), hideAfterMs);
  }

  hide(): void {
    clearTimeout(this.hideTimer);
    if (this.window.isVisible()) this.window.hide();
  }

  /** Bottom-centre of the display the mouse is on, above the Dock/taskbar. */
  private position(): void {
    const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
    const area = display.workArea;
    const x = Math.round(area.x + (area.width - WIDTH) / 2);
    const y = Math.round(area.y + area.height - HEIGHT - 48);
    const bounds = { x, y, width: WIDTH, height: HEIGHT };
    this.window.setBounds(bounds);
    // Moving between monitors with different scaling can distort the first resize.
    this.window.setBounds(bounds);
  }
}
