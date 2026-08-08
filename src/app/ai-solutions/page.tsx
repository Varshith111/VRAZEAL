import type { Metadata } from 'next';
import { AiSolutionsPage } from '@/components/pages/AiSolutionsPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI Solutions',
  description: `${site.name} helps businesses automate workflows with AI — customer support, lead generation, CRM automation, document processing, and more.`,
  alternates: { canonical: '/ai-solutions' },
  openGraph: {
    title: `AI Solutions — ${site.name}`,
    description: 'Automate your business with AI-powered workflows and systems.',
    url: `${site.url}/ai-solutions`,
  },
};

export default function Page() {
  return <AiSolutionsPage />;
}
