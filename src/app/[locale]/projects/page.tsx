import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectsGallery } from "@/components/sections/projects/ProjectsGallery";
import { CITIES, PROJECTS } from "@/data/projects";
import { formatNumber } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return { title: t.meta.pages.projects, alternates: { canonical: `/${locale}/projects` } };
}

/** /[locale]/projects — filterable gallery; every card is a live 3D view with a blueprint/realistic switch. */
export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const totalArea = PROJECTS.reduce((s, p) => s + p.areaM2, 0);
  const cities = new Set(PROJECTS.map((p) => p.cityId)).size;

  return (
    <main>
      <PageHeader
        locale={locale}
        home={t.nav.items[0].label}
        eyebrow={t.projectsPage.eyebrow}
        title={t.projectsPage.title}
        accent={t.projectsPage.accent}
        description={t.projectsPage.description}
        stats={[
          { value: String(PROJECTS.length), label: t.projectsPage.count },
          { value: `${formatNumber(Math.round(totalArea / 1000))}K`, label: `${t.common.stats.area}, m²` },
          { value: `${cities}/${CITIES.length}`, label: t.map.eyebrow },
        ]}
      />
      <ProjectsGallery t={{ page: t.projectsPage, common: t.common, text: t.projectsText }} />
    </main>
  );
}
