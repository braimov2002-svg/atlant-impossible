import Link from "next/link";
import uz from "@/i18n/dictionaries/uz";

export default function NotFound() {
  const t = uz.notFound;
  return (
    <main className="bg-field-grid flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-[clamp(5rem,20vw,12rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgb(0_255_102/0.5)]">
        404
      </p>
      <h1 className="font-display text-2xl text-mist">{t.title}</h1>
      <Link
        href="/uz"
        className="rounded-full border border-emerald-line px-6 py-3 text-sm text-sage transition hover:border-lime/50 hover:text-lime"
      >
        {t.back}
      </Link>
    </main>
  );
}
