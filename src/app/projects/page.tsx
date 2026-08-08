import type { Metadata } from 'next';
import { ProjectsPage } from '@/components/pages/ProjectsPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Selected work by ${site.name} — custom software, AI systems, and digital experiences built for ambitious businesses.`,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: `Projects — ${site.name}`,
    description: `Selected work by ${site.name}.`,
    url: `${site.url}/projects`,
  },
};

export default function Page() {
  return <ProjectsPage />;
}
