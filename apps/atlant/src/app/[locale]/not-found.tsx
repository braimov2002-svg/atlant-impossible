import Link from "next/link";
import uz from "@/i18n/dictionaries/uz";

export default function NotFound() {
  const t = uz.notFound;
  return (
    <main className="bg-grid flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-[clamp(5rem,20vw,12rem)] leading-none font-semibold tracking-[-0.04em] text-titanium-600">404</p>
      <h1 className="font-display text-2xl font-semibold text-mist">{t.title}</h1>
      <Link href="/uz" className="border border-line-strong px-6 py-3 text-sm text-mist transition hover:border-mist">
        {t.back}
      </Link>
    </main>
  );
}
