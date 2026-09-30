import Link from "next/link";
import uz from "@/i18n/dictionaries/uz";

export default function NotFound() {
  const t = uz.notFound;
  return (
    <main className="bg-blueprint flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-sharp text-[clamp(5rem,20vw,12rem)] leading-none font-extralight text-transparent [-webkit-text-stroke:1px_rgb(0_240_255/0.55)]">
        404
      </p>
      <h1 className="font-sharp text-2xl font-light text-mist">{t.title}</h1>
      <Link
        href="/uz"
        className="rounded-full border border-line px-6 py-3 text-sm text-steel transition hover:border-gold/60 hover:text-gold"
      >
        {t.back}
      </Link>
    </main>
  );
}
