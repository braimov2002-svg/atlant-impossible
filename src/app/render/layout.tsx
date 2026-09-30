import type { Metadata } from "next";

/*
 * Separate root layout for the offline frame renderer (no header, fonts or
 * Lenis). Only reachable in development, or when ATLANT_RENDER=1.
 */
export const metadata: Metadata = { title: "Atlant · sequence renderer", robots: { index: false, follow: false } };

export default function RenderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#000", overflow: "hidden" }}>{children}</body>
    </html>
  );
}
