import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import type { Dictionary } from "@/i18n/dictionaries/uz";

export function CtaBand({ t, locale }: { t: Dictionary["cta"]; locale: string }) {
  return (
    <section className="border-t border-line py-20 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center">
        <h2 className="font-display max-w-2xl text-[clamp(1.8rem,1rem+2.6vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-mist">{t.title}</h2>
        <Button asChild size="lg">
          <NavLink href={`/${locale}#contact`}>
            {t.button} <ArrowRight />
          </NavLink>
        </Button>
      </div>
    </section>
  );
}
