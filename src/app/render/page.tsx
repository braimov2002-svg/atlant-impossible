import { notFound } from "next/navigation";
import type { SequenceAspect } from "@/components/three/sequence/ConstructionScene";
import RenderHarness from "./RenderHarness";

/*
 * /render?w=1440&h=810&aspect=landscape&ss=2&p=0.5
 * Dev-only harness that renders ConstructionScene frames for the scroll
 * sequence. scripts/render-sequence.mjs drives it through window.__render(p).
 */
export default async function RenderPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  if (process.env.NODE_ENV === "production" && process.env.ATLANT_RENDER !== "1") notFound();
  const sp = await searchParams;
  const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) ? Number(v) : d);
  const aspect: SequenceAspect = sp.aspect === "portrait" ? "portrait" : "landscape";
  return (
    <RenderHarness
      width={num(sp.w, aspect === "portrait" ? 720 : 1440)}
      height={num(sp.h, aspect === "portrait" ? 1280 : 810)}
      supersample={num(sp.ss, 2)}
      aspect={aspect}
      initial={num(sp.p, 0)}
    />
  );
}
