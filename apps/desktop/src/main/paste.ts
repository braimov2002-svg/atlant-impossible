import { clipboard, ClipboardItem, systemPreferences } from 'electron';
import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import path from 'node:path';
import { WINDOWS_PASTE_HELPER } from './paste-helper';

export type PasteOutcome = 'pasted' | 'copied' | 'needs-accessibility' | 'needs-automation' | 'blocked';

/** The foreground window runs as administrator: synthetic keys would be dropped. */
class PasteBlockedError extends Error {}

type Payload = ConstructorParameters<typeof ClipboardItem>[0];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------- clipboard

/**
 * Formats password managers set so clipboard history and sync skip a secret.
 * Re-writing such content would drop the marker and leak the password.
 */
const CONCEALED_FORMATS: Partial<Record<NodeJS.Platform, string[]>> = {
  darwin: ['org.nspasteboard.ConcealedType', 'org.nspasteboard.TransientType'],
  win32: ['ExcludeClipboardContentFromMonitorProcessing', 'CanIncludeInClipboardHistory'],
};

async function holdsSecret(): Promise<boolean> {
  for (const format of CONCEALED_FORMATS[process.platform] ?? []) {
    try {
      if (await clipboard.has(`electron application/osclipboard;format="${format}"`)) return true;
    } catch {
      // unknown format on this platform
    }
  }
  return false;
}

/**
 * Copies every readable format so the user's clipboard can be put back.
 * Returns null when it must not or cannot be restored faithfully: then the
 * dictated text simply stays on the clipboard.
 */
async function snapshot(): Promise<Payload[] | null> {
  if (await holdsSecret()) return null;
  const saved: Payload[] = [];
  try {
    for (const item of await clipboard.read()) {
      const payload: Payload = {};
      for (const type of item.types) {
        try {
          payload[type] = await item.getType(type);
        } catch {
          // some private formats cannot be read back; skip them
        }
      }
      // Types we cannot read (e.g. files copied in Explorer/Finder) cannot be restored.
      if (item.types.length > 0 && Object.keys(payload).length === 0) return null;
      if (Object.keys(payload).length > 0) saved.push(payload);
    }
  } catch {
    return null; // e.g. another app holds the clipboard open right now
  }
  return saved;
}

async function restore(saved: Payload[]): Promise<void> {
  try {
    if (saved.length === 0) clipboard.clear();
    else await clipboard.write(saved.map((payload) => new ClipboardItem(payload)));
    return;
  } catch {
    // one unwritable format fails the whole (atomic) write: retry with the basics
  }
  const basic = saved
    .map((payload) =>
      Object.fromEntries(Object.entries(payload).filter(([type]) => ['text/plain', 'text/html', 'image/png'].includes(type))),
    )
    .filter((payload) => Object.keys(payload).length > 0);
  try {
    if (basic.length > 0) await clipboard.write(basic.map((payload) => new ClipboardItem(payload)));
  } catch {
    // leave the dictated text in place rather than an empty clipboard
  }
}

// -------------------------------------------------------------- keystrokes

/**
 * macOS: press the physical V key (key code 9) with Command. Unlike
 * `keystroke "v"` this also works while a Russian/Cyrillic layout is active.
 */
export const MAC_PASTE_SCRIPT = 'tell application "System Events" to key code 9 using {command down}';

class WindowsPaster {
  private child: ChildProcessWithoutNullStreams | null = null;
  private ready: Promise<void> | null = null;
  private waiters: Array<(line: string) => void> = [];

  /** Starts PowerShell in the background so the first paste is fast too. */
  warmUp(): void {
    void this.ensure().catch(() => undefined);
  }

  async paste(): Promise<void> {
    await this.ensure();
    const done = this.nextLine(3000);
    this.child!.stdin.write('paste\n');
    let line: string;
    try {
      line = await done;
    } catch (error) {
      this.reset(); // a stuck helper must not fire a late Ctrl+V
      throw error;
    }
    if (line === 'BLOCKED') throw new PasteBlockedError('target window is elevated');
    if (!line.startsWith('DONE') || line.trim() === 'DONE 0') throw new Error(`paste failed: ${line}`);
  }

  private ensure(): Promise<void> {
    if (this.ready) return this.ready;
    this.ready = new Promise<void>((resolve, reject) => {
      // Absolute path: never pick up a powershell.exe from the working directory.
      // -EncodedCommand: unlike a .ps1 file it is not blocked by an AllSigned policy.
      const powershell = path.join(
        process.env.SystemRoot ?? 'C:\\Windows',
        'System32',
        'WindowsPowerShell',
        'v1.0',
        'powershell.exe',
      );
      const encoded = Buffer.from(WINDOWS_PASTE_HELPER, 'utf16le').toString('base64');
      const child = spawn(powershell, ['-NoProfile', '-NonInteractive', '-EncodedCommand', encoded], {
        windowsHide: true,
      });
      this.child = child;
      child.stdin.on('error', () => undefined); // a dead helper must not crash the app
      let buffer = '';
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk: string) => {
        buffer += chunk;
        let index: number;
        while ((index = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, index).trim();
          buffer = buffer.slice(index + 1);
          if (line) this.waiters.shift()?.(line);
        }
      });
      const fail = (error: Error) => {
        this.reset();
        reject(error);
      };
      child.on('error', fail);
      child.on('exit', () => fail(new Error('paste helper exited')));
      this.nextLine(15000).then(
        (line) => (line === 'READY' ? resolve() : fail(new Error(line))),
        fail,
      );
    });
    return this.ready;
  }

  private nextLine(timeoutMs: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.waiters = this.waiters.filter((w) => w !== waiter);
        reject(new Error('paste helper timed out'));
      }, timeoutMs);
      const waiter = (line: string) => {
        clearTimeout(timer);
        resolve(line);
      };
      this.waiters.push(waiter);
    });
  }

  private reset(): void {
    this.child?.removeAllListeners();
    this.child?.kill();
    this.child = null;
    this.ready = null;
    this.waiters = [];
  }

  dispose(): void {
    this.reset();
  }
}

const windowsPaster = process.platform === 'win32' ? new WindowsPaster() : null;

export function warmUpPaster(): void {
  windowsPaster?.warmUp();
}

export function disposePaster(): void {
  windowsPaster?.dispose();
}

function run(file: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    execFile(file, args, { timeout: 5000, windowsHide: true }, (error, _stdout, stderr) =>
      error ? reject(Object.assign(error, { stderr: String(stderr ?? '') })) : resolve(),
    );
  });
}

/** osascript error -1743: the user declined "OvozYoz wants to control System Events". */
function isAutomationDenied(error: unknown): boolean {
  const text = `${(error as { stderr?: string })?.stderr ?? ''} ${(error as Error)?.message ?? ''}`;
  return /-1743|Not authori[sz]ed to send Apple events/i.test(text);
}

async function pressPaste(): Promise<void> {
  if (process.platform === 'darwin') return run('/usr/bin/osascript', ['-e', MAC_PASTE_SCRIPT]);
  if (windowsPaster) return windowsPaster.paste();
  return run('xdotool', ['key', '--clearmodifiers', 'ctrl+v']);
}

/** On macOS synthetic key presses need the Accessibility permission. */
export function canSendKeystrokes(prompt: boolean): boolean {
  if (process.platform !== 'darwin') return true;
  return systemPreferences.isTrustedAccessibilityClient(prompt);
}

/**
 * Puts the text on the clipboard and pastes it into whichever app has focus.
 * When pasting is impossible the text stays on the clipboard for the user.
 */
/**
 * How long the target app gets to read the clipboard before the previous
 * contents come back. Remote desktops, VMs and busy apps can be slow.
 */
const RESTORE_DELAY_MS = 1500;

export async function insertText(
  text: string,
  options: { autoPaste: boolean; restoreClipboard: boolean; isCancelled?: () => boolean },
): Promise<PasteOutcome> {
  const saved = options.autoPaste && options.restoreClipboard ? await snapshot() : null;
  await clipboard.writeText(text);
  if (!options.autoPaste) return 'copied';

  if (!canSendKeystrokes(false)) {
    canSendKeystrokes(true); // shows the system prompt once
    return 'needs-accessibility';
  }

  // Give the OS a moment to publish the new clipboard contents.
  await sleep(60);
  if (options.isCancelled?.()) return 'copied'; // Esc arrived after the text was ready
  try {
    await pressPaste();
  } catch (error) {
    // The dictated text stays on the clipboard in every one of these cases.
    if (error instanceof PasteBlockedError) return 'blocked';
    if (process.platform === 'darwin' && isAutomationDenied(error)) return 'needs-automation';
    return 'copied';
  }

  if (saved) {
    // Restore only after the target app has read the clipboard, and only if
    // nobody copied something else in the meantime.
    await sleep(RESTORE_DELAY_MS);
    if ((await clipboard.readText().catch(() => '')) === text) await restore(saved);
  }
  return 'pasted';
}
