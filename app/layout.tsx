import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import ScrollReveal from '@/components/ScrollReveal';
import { CONFIG } from '@/lib/site';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: {
    default: 'Blue Phoenix FC — Be a Blue. Be a Phoenix. Together We Rise Up.',
    template: '%s — Blue Phoenix FC',
  },
  description:
    'Blue Phoenix FC is a new football club being built from the ground up in the UAE, working towards the UAE Third Division for the 2027/28 season. Join the journey before the first whistle.',
  openGraph: {
    siteName: 'Blue Phoenix FC',
    type: 'website',
    images: [
      'https://bluephoenixfc.com/wp-content/uploads/2026/09/BluePhoenixFCLogo.png',
    ],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#10182D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
