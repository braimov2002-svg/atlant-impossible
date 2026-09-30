import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/sections/home/hero/Hero";
import { ProjectShowcase } from "@/components/sections/home/ProjectShowcase";
import { ServicesMatrix } from "@/components/sections/home/ServicesMatrix";
import { Estimator } from "@/components/sections/home/Estimator";
import { FootprintMap } from "@/components/sections/home/FootprintMap";
import { ConsultationPortal } from "@/components/sections/home/ConsultationPortal";
import { PROJECTS } from "@/data/projects";
import { formatNumber } from "@/lib/utils";

/**
 * Home — a Server Component. Loads the dictionary once and hands each client
 * section only its slice. All WebGL scenes are lazy chunks (next/dynamic,
 * ssr:false) that mount when their section nears the viewport.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const tower = PROJECTS[0];
  const projectT = { showcase: t.showcase, common: t.common, text: t.projectsText };

  return (
    <main>
      <Hero
        t={t.hero}
        locale={locale}
        finale={{
          name: t.projectsText[tower.id].name,
          meta: `${tower.floors} ${t.common.units.floors} · ${tower.heightM} m · ${formatNumber(tower.areaM2)} m²`,
          cta: t.showcase.viewAll,
        }}
      />
      <ProjectShowcase t={projectT} locale={locale} />
      <ServicesMatrix t={t.matrix} locale={locale} more={t.common.readMore} years={t.common.units.years} />
      <Estimator t={t.estimator} locale={locale} years={t.common.units.years} />
      <FootprintMap t={{ map: t.map, common: t.common, text: t.projectsText }} locale={locale} />
      <ConsultationPortal t={t.contact} types={t.common.types} cities={t.common.cities} />
    </main>
  );
}
