import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Cursor } from '@/components/ui/Cursor';
import { PageTransition } from '@/components/ui/PageTransition';
import { Preloader } from '@/components/ui/Preloader';
import { site } from '@/lib/site';
import { ThemeProvider, themeInitScript } from '@/lib/theme';

const display = localFont({
  src: '../../public/fonts/GeneralSans-Variable.woff2',
  weight: '200 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-display',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', 'sans-serif'],
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic', 'normal'],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['Georgia', 'serif'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Creative & Technology Agency`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'custom software development',
    'web application development',
    'custom CRM development',
    'AI integration agency',
    'SaaS development',
    'UI UX design agency',
    'branding and identity',
    'technology consulting',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Creative & Technology Agency`,
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Creative & Technology Agency`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#050506',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  slogan: 'Building digital products that move businesses forward.',
  sameAs: site.social.map((item) => item.href),
  areaServed: 'Worldwide',
  knowsAbout: [
    'Custom software development',
    'Web application development',
    'Customer relationship management systems',
    'Artificial intelligence integration',
    'Product design',
    'Brand identity',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      // The head script may switch the theme before React hydrates.
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-pill focus:bg-paper focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>

        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <PageTransition />
            <Cursor />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>

        <div aria-hidden className="grain" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
