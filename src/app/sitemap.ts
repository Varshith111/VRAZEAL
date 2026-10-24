import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: 'monthly' | 'yearly' = 'monthly') => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page('', 1),
    page('/services', 0.9),
    page('/projects', 0.9),
    page('/ai-solutions', 0.8),
    page('/about', 0.7),
    page('/contact', 0.8),
    page('/privacy', 0.3, 'yearly'),
    page('/terms', 0.3, 'yearly'),
  ];
}
