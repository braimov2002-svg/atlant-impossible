import { getDictionary } from "@/i18n/get-dictionary";
import { SequenceHero } from "@/components/sections/home/hero/SequenceHero";
import { ProjectShowcase } from "@/components/sections/home/ProjectShowcase";
import { ServicesMatrix } from "@/components/sections/home/ServicesMatrix";
import { Estimator } from "@/components/sections/home/Estimator";
import { FootprintMap } from "@/components/sections/home/FootprintMap";
import { ConsultationPortal } from "@/components/sections/home/ConsultationPortal";

/**
 * Home — a Server Component. Loads the dictionary once and hands each client
 * section only its slice. The hero is a scroll-scrubbed image sequence; all
 * WebGL scenes below it are lazy chunks (next/dynamic, ssr:false) that mount
 * when their section nears the viewport.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const projectT = { showcase: t.showcase, common: t.common, text: t.projectsText };

  return (
    <main>
      <SequenceHero t={t.hero} locale={locale} />
      <ProjectShowcase t={projectT} locale={locale} />
      <ServicesMatrix t={t.matrix} locale={locale} more={t.common.readMore} years={t.common.units.years} />
      <Estimator t={t.estimator} locale={locale} years={t.common.units.years} />
      <FootprintMap t={{ map: t.map, common: t.common, text: t.projectsText }} locale={locale} />
      <ConsultationPortal t={t.contact} types={t.common.types} cities={t.common.cities} />
    </main>
  );
}
