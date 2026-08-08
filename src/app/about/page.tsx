import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/AboutPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${site.name} — a creative and technology agency building custom software, AI systems, and premium digital experiences for ambitious businesses.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About — ${site.name}`,
    description: `Learn about ${site.name} — a creative and technology agency.`,
    url: `${site.url}/about`,
  },
};

export default function Page() {
  return <AboutPage />;
}
