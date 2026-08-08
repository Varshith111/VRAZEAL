import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Start a project with ${site.name}. Tell us about your business and we'll get back to you within one business day.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: `Start a project with ${site.name}.`,
    url: `${site.url}/contact`,
  },
};

export default function Page() {
  return <ContactPage />;
}
