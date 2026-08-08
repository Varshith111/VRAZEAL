import type { Metadata } from 'next';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description: `${site.name} offers website development, custom CRM & software, AI solutions, branding, and digital marketing for ambitious businesses.`,
  alternates: { canonical: '/services' },
  openGraph: {
    title: `Services — ${site.name}`,
    description: 'Website development, custom software, AI solutions, branding, and digital marketing.',
    url: `${site.url}/services`,
  },
};

export default function Page() {
  return <ServicesPage />;
}
