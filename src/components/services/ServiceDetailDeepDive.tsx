'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { IconArrowDiagonal } from '@/components/ui/icons';
import { AboutSection, ease } from '@/components/about/shared';

const deepServices = [
  {
    id: 'web',
    number: '01',
    title: 'WEBSITE DEVELOPMENT',
    headline: 'Digital experiences that work as hard as your business.',
    explain: 'We design and develop fast, responsive websites and digital experiences that combine strong visual design with performance, usability and business goals.',
    capabilities: [
      'Corporate Websites',
      'E-commerce & Retail Platforms',
      'Landing Pages & Campaigns',
      'Web Applications',
      'Custom Digital Experiences',
    ],
    outcomes: ['Green Core Web Vitals', 'Increased Conversions', 'Full Mobile Responsiveness'],
    cta: null,
  },
  {
    id: 'crm',
    number: '02',
    title: 'CUSTOM CRM & SOFTWARE',
    headline: 'Software built around the way you work.',
    explain: 'We build custom CRMs, dashboards, internal tools and business platforms designed around your actual workflows.',
    capabilities: [
      'Custom CRM Systems',
      'Admin Dashboards & Portals',
      'Business Management Systems',
      'Internal Automation Tools',
      'Workflow Platforms',
    ],
    outcomes: ['Streamlined Process', 'Data Visibility', 'Zero Monthly User Fees'],
    cta: null,
  },
  {
    id: 'ai',
    number: '03',
    title: 'AI SOLUTIONS & AUTOMATION',
    headline: 'Turn repetitive work into intelligent systems.',
    explain: 'We integrate AI and automation into business workflows to reduce manual work, improve efficiency and unlock new possibilities.',
    capabilities: [
      'AI Support & Chat Agents',
      'Workflow Automation Pipelines',
      'Custom AI Integrations',
      'Document & Text Processing',
      'Business Process Automation',
    ],
    outcomes: ['Lower Support Latency', 'Reduced Human Error', 'Measurable Operational ROI'],
    cta: { label: 'Explore Dedicated AI Solutions →', href: '/ai-solutions' },
  },
  {
    id: 'branding',
    number: '04',
    title: 'BRANDING & GRAPHIC DESIGN',
    headline: 'Make your business recognizable.',
    explain: 'We create visual identities and creative systems that give businesses a consistent and distinctive presence.',
    capabilities: [
      'Brand Identity Systems',
      'Logo & Mark Systems',
      'Social Media Design',
      'Marketing Creatives',
      'Visual Guidelines & Tokens',
    ],
    outcomes: ['Coherent Market Presence', 'Strong Credibility', 'Scalable Asset Library'],
    cta: null,
  },
  {
    id: 'marketing',
    number: '05',
    title: 'DIGITAL MARKETING',
    headline: 'Turn attention into growth.',
    explain: 'We help businesses build a stronger digital presence through strategic content, campaigns and growth-focused digital systems.',
    capabilities: [
      'Social Media Strategy',
      'Content Strategy & Production',
      'Digital Campaigns',
      'Performance Marketing',
      'Creative Content Production',
    ],
    outcomes: ['Qualified Customer Leads', 'Higher Engagement', 'Sustainable Channel Growth'],
    cta: null,
  },
];

export function ServiceDetailDeepDive() {
  return (
    <div className="space-y-12">
      {deepServices.map((service, index) => (
        <ServiceDetailCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}

function ServiceDetailCard({
  service,
  index,
}: {
  service: (typeof deepServices)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <AboutSection id={service.id} index={service.number} label={service.title} tone={isEven ? 'paper' : 'surface'}>
      <div className="mt-12 lg:mt-16">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12 lg:items-center">
          {/* Content Column */}
          <div className="col-span-12 lg:col-span-6">
            <motion.span
              className="font-mono text-xs font-semibold uppercase tracking-widest text-page-muted"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              Discipline Breakdown {service.number}
            </motion.span>

            <motion.h3
              className="mt-3 font-display text-[clamp(2rem,3.8vw,3.5rem)] font-medium leading-[1.08] tracking-tight text-page-ink"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {service.headline}
            </motion.h3>

            <motion.p
              className="mt-6 text-lead leading-relaxed text-page-muted"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              {service.explain}
            </motion.p>

            <motion.div
              className="mt-8 space-y-3"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-page-muted">
                Core Deliverable Capabilities
              </span>
              <div className="flex flex-wrap gap-2">
                {service.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="rounded-full border border-page-line bg-paper px-4 py-1.5 font-mono text-xs font-medium text-page-ink shadow-xs"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </motion.div>

            {service.cta && (
              <div className="mt-8">
                <Link
                  href={service.cta.href}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 font-medium text-page-ink underline underline-offset-4 hover:text-page-muted transition-colors"
                >
                  <span>{service.cta.label}</span>
                  <IconArrowDiagonal className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Visual Architecture Feature Panel */}
          <div className="col-span-12 lg:col-span-6">
            <motion.div
              className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-page-line bg-paper p-8 shadow-sm"
              initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <div className="flex h-full flex-col justify-between font-mono text-xs">
                <div className="flex items-center justify-between border-b border-page-line pb-4">
                  <span className="font-semibold text-page-ink">0{index + 1} // DISCIPLINE SPEC</span>
                  <span className="text-page-muted">{service.title}</span>
                </div>

                <div className="my-auto space-y-4 py-4">
                  <div className="flex justify-between text-page-muted text-[0.7rem]">
                    <span>OUTCOMES DELIVERED</span>
                    <span>VERIFIED</span>
                  </div>
                  <div className="space-y-2">
                    {service.outcomes.map((out) => (
                      <div key={out} className="flex items-center justify-between rounded-lg border border-page-line bg-surface px-4 py-2.5">
                        <span className="font-medium text-page-ink">{out}</span>
                        <span className="h-2 w-2 rounded-full bg-page-ink" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-page-line pt-4 text-[0.6875rem] text-page-muted">
                  <span>Custom Architecture</span>
                  <span>VRAZEAL Standards</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
