import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FullCycle } from "@/components/sections/FullCycle";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return { title: t.meta.pages.projects, alternates: { canonical: `/${locale}/projects` } };
}

/** /[locale]/projects — published projects, the range of work, partners. */
export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return (
    <main>
      <PageHeader
        locale={locale}
        home={t.nav.items[0].label}
        eyebrow={t.projectsPage.eyebrow}
        title={t.projectsPage.title}
        accent={t.projectsPage.accent}
        description={t.projectsPage.description}
      />
      <ProjectsSection t={t.projects} common={t.common} heading={false} />
      <FullCycle t={t.cycle} index="01" />
      <PartnersSection t={t.partners} index="02" />
      <CtaBand t={t.cta} locale={locale} />
    </main>
  );
}
