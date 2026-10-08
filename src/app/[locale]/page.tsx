import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { GroupSection } from "@/components/sections/GroupSection";
import { FullCycle } from "@/components/sections/FullCycle";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

/** Home — a Server Component; each client section receives only its slice of the dictionary. */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <main>
      <Hero t={t.hero} figures={t.figures} locale={locale} />
      <GroupSection t={t.group} index="01" more={{ label: t.common.readMore, href: `/${locale}/about` }} />
      <FullCycle t={t.cycle} index="02" />
      <ProjectsSection t={t.projects} common={t.common} index="03" more={`/${locale}/projects`} />
      <PartnersSection t={t.partners} index="04" />
      <ContactSection t={t.contact} index="05" />
    </main>
  );
}
