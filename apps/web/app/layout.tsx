import type { Metadata, Viewport } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: 'OvozYoz — gapiring, matn yozilsin',
  description: "O'zbekcha gapiring — matn o'zbek, rus yoki ingliz tilida yozilsin.",
  applicationName: 'OvozYoz',
  manifest: `${basePath}/manifest.webmanifest`,
  appleWebApp: { capable: true, title: 'OvozYoz', statusBarStyle: 'default' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f7f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1211' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
