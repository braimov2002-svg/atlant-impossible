import { app, clipboard, ClipboardItem, systemPreferences } from 'electron';
import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export type PasteOutcome = 'pasted' | 'copied' | 'needs-accessibility';

type Payload = ConstructorParameters<typeof ClipboardItem>[0];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------- clipboard

/** Copies every readable format so the user's clipboard can be put back. */
async function snapshot(): Promise<Payload[]> {
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
      if (Object.keys(payload).length > 0) saved.push(payload);
    }
  } catch {
    // unreadable clipboard: nothing to restore
  }
  return saved;
}

async function restore(saved: Payload[]): Promise<void> {
  try {
    if (saved.length === 0) clipboard.clear();
    else await clipboard.write(saved.map((payload) => new ClipboardItem(payload)));
  } catch {
    // restoring is best effort
  }
}

// -------------------------------------------------------------- keystrokes

/**
 * macOS: press the physical V key (key code 9) with Command. Unlike
 * `keystroke "v"` this also works while a Russian/Cyrillic layout is active.
 */
export const MAC_PASTE_SCRIPT = 'tell application "System Events" to key code 9 using {command down}';

/**
 * Windows: SendInput with virtual keys VK_CONTROL (0x11) + VK_V (0x56), which
 * do not depend on the keyboard layout (SendKeys('^v') breaks on Cyrillic).
 * Runs in one long-lived PowerShell so each paste is instant.
 */
export const WINDOWS_PASTE_HELPER = String.raw`
$ErrorActionPreference = 'Stop'
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public static class OvozYozKeys {
  [StructLayout(LayoutKind.Sequential)] struct KEYBDINPUT { public ushort wVk; public ushort wScan; public uint dwFlags; public uint time; public IntPtr dwExtraInfo; }
  [StructLayout(LayoutKind.Sequential)] struct MOUSEINPUT { public int dx; public int dy; public uint mouseData; public uint dwFlags; public uint time; public IntPtr dwExtraInfo; }
  [StructLayout(LayoutKind.Explicit)] struct InputUnion { [FieldOffset(0)] public MOUSEINPUT mi; [FieldOffset(0)] public KEYBDINPUT ki; }
  [StructLayout(LayoutKind.Sequential)] struct INPUT { public uint type; public InputUnion u; }
  [DllImport("user32.dll", SetLastError = true)] static extern uint SendInput(uint count, INPUT[] inputs, int size);
  static INPUT Key(ushort vk, bool up) { INPUT i = new INPUT(); i.type = 1; i.u.ki.wVk = vk; i.u.ki.dwFlags = up ? 2u : 0u; return i; }
  public static uint Paste() {
    INPUT[] inputs = { Key(0x11, false), Key(0x56, false), Key(0x56, true), Key(0x11, true) };
    return SendInput((uint)inputs.Length, inputs, Marshal.SizeOf(typeof(INPUT)));
  }
}
"@
[Console]::Out.WriteLine('READY')
while ($null -ne ($line = [Console]::In.ReadLine())) {
  if ($line -eq 'paste') { [Console]::Out.WriteLine('DONE ' + [OvozYozKeys]::Paste()) }
}
`;

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
    const line = await done;
    if (!line.startsWith('DONE') || line.trim() === 'DONE 0') throw new Error(`paste failed: ${line}`);
  }

  private ensure(): Promise<void> {
    if (this.ready) return this.ready;
    this.ready = new Promise<void>((resolve, reject) => {
      const script = path.join(app.getPath('userData'), 'paste-helper.ps1');
      fs.mkdirSync(path.dirname(script), { recursive: true });
      fs.writeFileSync(script, WINDOWS_PASTE_HELPER, 'utf8');
      const child = spawn(
        'powershell.exe',
        ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', script],
        { windowsHide: true },
      );
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
    execFile(file, args, { timeout: 5000, windowsHide: true }, (error) => (error ? reject(error) : resolve()));
  });
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
export async function insertText(
  text: string,
  options: { autoPaste: boolean; restoreClipboard: boolean },
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
  try {
    await pressPaste();
  } catch {
    return 'copied';
  }

  if (saved) {
    // Restore only after the target app has read the clipboard, and only if
    // nobody copied something else in the meantime.
    await sleep(500);
    if ((await clipboard.readText().catch(() => '')) === text) await restore(saved);
  }
  return 'pasted';
}
