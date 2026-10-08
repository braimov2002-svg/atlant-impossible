// The Windows paste helper, kept free of Electron imports so CI can compile
// it on a Windows runner (scripts/check-paste-helper.mjs).

/**
 * Windows: SendInput with virtual keys VK_CONTROL (0x11) + VK_V (0x56), which
 * do not depend on the keyboard layout (SendKeys('^v') breaks on Cyrillic).
 * Runs in one long-lived PowerShell so each paste is instant.
 *
 * SendInput into an elevated (administrator) window is silently dropped by
 * UIPI and still reports success, so the helper checks the foreground
 * window first and answers BLOCKED instead.
 *
 * Protocol (one line each way): "paste" -> "DONE <n>" | "BLOCKED";
 * "probe" -> "PROBE <True|False>".
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
  [DllImport("user32.dll")] static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("kernel32.dll", SetLastError = true)] static extern IntPtr OpenProcess(uint access, bool inherit, uint processId);
  [DllImport("kernel32.dll")] static extern IntPtr GetCurrentProcess();
  [DllImport("kernel32.dll")] static extern bool CloseHandle(IntPtr handle);
  [DllImport("advapi32.dll", SetLastError = true)] static extern bool OpenProcessToken(IntPtr process, uint access, out IntPtr token);
  [DllImport("advapi32.dll", SetLastError = true)] static extern bool GetTokenInformation(IntPtr token, int infoClass, out int info, int length, out int returned);

  static INPUT Key(ushort vk, bool up) { INPUT i = new INPUT(); i.type = 1; i.u.ki.wVk = vk; i.u.ki.dwFlags = up ? 2u : 0u; return i; }

  // 1 = elevated, 0 = not elevated, -1 = token not readable
  static int Elevation(IntPtr process) {
    IntPtr token;
    if (!OpenProcessToken(process, 0x0008 /* TOKEN_QUERY */, out token)) return -1;
    int elevated; int returned;
    bool ok = GetTokenInformation(token, 20 /* TokenElevation */, out elevated, 4, out returned);
    CloseHandle(token);
    return ok ? (elevated != 0 ? 1 : 0) : -1;
  }

  public static bool TargetIsElevated() {
    if (Elevation(GetCurrentProcess()) == 1) return false; // we are elevated too: input is allowed
    IntPtr window = GetForegroundWindow();
    if (window == IntPtr.Zero) return false;
    uint processId;
    GetWindowThreadProcessId(window, out processId);
    IntPtr process = OpenProcess(0x1000 /* PROCESS_QUERY_LIMITED_INFORMATION */, false, processId);
    if (process == IntPtr.Zero) return true; // cannot even query it: higher integrity level
    int elevation = Elevation(process);
    CloseHandle(process);
    return elevation != 0; // an unreadable token belongs to a higher-integrity process
  }

  public static uint Paste() {
    INPUT[] inputs = { Key(0x11, false), Key(0x56, false), Key(0x56, true), Key(0x11, true) };
    return SendInput((uint)inputs.Length, inputs, Marshal.SizeOf(typeof(INPUT)));
  }
}
"@
[Console]::Out.WriteLine('READY')
while ($null -ne ($line = [Console]::In.ReadLine())) {
  if ($line -eq 'paste') {
    if ([OvozYozKeys]::TargetIsElevated()) { [Console]::Out.WriteLine('BLOCKED') }
    else { [Console]::Out.WriteLine('DONE ' + [OvozYozKeys]::Paste()) }
  } elseif ($line -eq 'probe') {
    [Console]::Out.WriteLine('PROBE ' + [OvozYozKeys]::TargetIsElevated())
  }
}
`;
