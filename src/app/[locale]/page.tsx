import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ServicesBento } from "@/components/sections/services/ServicesBento";
import { GreenhouseSimulator } from "@/components/sections/greenhouse/GreenhouseSimulator";
import { RoiCalculator } from "@/components/sections/calculator/RoiCalculator";
import { Projects } from "@/components/sections/projects/Projects";
import { ContactHub } from "@/components/sections/contact/ContactHub";

/**
 * Home — a Server Component. It loads the locale dictionary once and hands
 * each (client) section only its own slice, so no copy is duplicated in JS
 * that a section doesn't use. All three WebGL scenes are split into lazy
 * chunks (next/dynamic, ssr:false) that mount when their section nears view.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <>
      <Navbar t={t.nav} locale={locale} />
      <main>
        <Hero t={t.hero} />
        <Marquee items={t.marquee} />
        <ServicesBento t={t.services} />
        <GreenhouseSimulator t={t.greenhouse} />
        <RoiCalculator t={t.calculator} />
        <Projects t={t.projects} />
        <ContactHub t={t.contact} crops={Object.values(t.calculator.crops)} />
      </main>
      <Footer t={t.footer} nav={t.nav} />
    </>
  );
}
