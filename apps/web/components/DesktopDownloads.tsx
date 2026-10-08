'use client';

// Stable file names (see apps/desktop/package.json "artifactName"), so the
// "latest" release link always points at the newest installer.
const REPO = process.env.NEXT_PUBLIC_REPO ?? 'braimov2002-svg/atlant-impossible';
const LATEST = `https://github.com/${REPO}/releases/latest/download`;

export function DesktopDownloads() {
  return (
    <section className="mt-8 rounded-3xl bg-[var(--card)] p-4 shadow-sm ring-1 ring-[var(--line)]" aria-labelledby="desktop-title">
      <h2 id="desktop-title" className="text-base font-semibold">
        Kompyuter uchun ilova
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Istalgan dasturda (Telegram, Word, brauzer) ⌃⌥D (Mac) yoki Ctrl+Alt+D (Windows) bosib gapiring — matn kursor
        turgan joyga o&apos;zi yoziladi.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href={`${LATEST}/OvozYoz-mac.dmg`}
          className="rounded-2xl bg-neutral-900 px-3 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-neutral-900"
        >
          macOS uchun
          <span className="block text-xs font-normal opacity-80">yuklab olish (.dmg)</span>
        </a>
        <a href={`${LATEST}/OvozYoz-Windows-Setup.exe`} className="rounded-2xl bg-sky-700 px-3 py-3 text-center text-sm font-semibold text-white">
          Windows uchun
          <span className="block text-xs font-normal opacity-80">yuklab olish (.exe)</span>
        </a>
      </div>
      <a
        href={`https://github.com/${REPO}#2-qadam-kompyuterga-ornatish`}
        target="_blank"
        rel="noreferrer"
        className="mt-3 block text-center text-xs text-[var(--muted)] underline"
      >
        O&apos;rnatish bo&apos;yicha yo&apos;riqnoma
      </a>
    </section>
  );
}
