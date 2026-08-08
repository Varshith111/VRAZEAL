'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

const serviceList = [
  {
    id: 'web',
    number: '01',
    title: 'Website Development',
    summary: 'Modern digital experiences engineered for performance and conversion.',
    description:
      'From marketing sites to complex web applications, we build digital products that are fast, accessible, and built to convert. Every site ships with a real design system and Core Web Vitals in the green on launch day.',
    capabilities: [
      'Business & corporate websites',
      'E-commerce & online stores',
      'Landing pages & campaigns',
      'Custom web applications',
      'Responsive & mobile-first',
      'Performance-optimised builds',
    ],
    outcomes: [
      'Higher conversion rates',
      'Faster load times',
      'Lower bounce rates',
      'Stronger brand credibility',
    ],
  },
  {
    id: 'crm',
    number: '02',
    title: 'Custom CRM & Software',
    summary: 'Business software built around how your team actually works.',
    description:
      'When off-the-shelf tools start dictating your process, we replace them. Custom CRM systems, admin dashboards, and internal tools modelled on your workflows — typed, tested, and built to scale.',
    capabilities: [
      'Custom CRM systems',
      'Business management software',
      'Admin dashboards & portals',
      'Internal tools & workflows',
      'Database-driven applications',
      'Third-party integrations',
    ],
    outcomes: [
      'Streamlined operations',
      'Reduced manual work',
      'Better data visibility',
      'Systems that scale with you',
    ],
  },
  {
    id: 'ai',
    number: '03',
    title: 'AI Solutions & Automations',
    summary: 'Intelligent automation that removes the repetitive layer from your business.',
    description:
      'AI workflows, chatbots, and automation pipelines wired into the tools you already use. We build practical AI systems with measurable returns — not experiments.',
    capabilities: [
      'AI customer support agents',
      'Lead generation automation',
      'WhatsApp & email automation',
      'Document processing pipelines',
      'CRM & sales automation',
      'Custom AI workflow systems',
    ],
    outcomes: [
      'Faster response times',
      'Lower operational costs',
      'More qualified leads',
      'Teams focused on high-value work',
    ],
    cta: { label: 'Explore AI Solutions', href: '/ai-solutions' },
  },
  {
    id: 'branding',
    number: '04',
    title: 'Branding & Graphic Design',
    summary: 'Identity systems that keep your brand coherent at every scale.',
    description:
      'A brand is an operating system, not a logo file. We build naming, identity, type scales, motion language, and the rules that keep everything consistent — from the business card to the trade-show wall.',
    capabilities: [
      'Brand identity & logo systems',
      'Visual identity design',
      'Marketing creatives',
      'Social graphics & templates',
      'Brand guidelines',
      'Digital design systems',
    ],
    outcomes: [
      'Consistent brand presence',
      'Professional first impressions',
      'Scalable design system',
      'Stronger market positioning',
    ],
  },
  {
    id: 'marketing',
    number: '05',
    title: 'Digital Marketing',
    summary: 'Strategy-led marketing that drives qualified growth.',
    description:
      'Digital marketing built around your business objectives — not vanity metrics. From search visibility to conversion optimisation, every campaign is tied to a measurable outcome.',
    capabilities: [
      'Digital marketing strategy',
      'Search visibility & SEO',
      'Campaign strategy & execution',
      'Lead generation systems',
      'Content strategy',
      'Conversion rate optimisation',
    ],
    outcomes: [
      'More qualified traffic',
      'Higher conversion rates',
      'Measurable ROI',
      'Sustainable online growth',
    ],
  },
];

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five disciplines. One team."
        subtitle="Every engagement draws from the full stack — software, AI, design, and marketing — so the work holds together as one system rather than a collection of deliverables."
      />

      <section className="pb-section">
        <div className="shell">
          {serviceList.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-28"
            >
              <div className="h-px w-full bg-page-line" />
              {/* Alternate bg: odd services on surface, even on paper */}
              <div className={`-mx-gutter px-gutter py-14 ${index % 2 === 0 ? 'bg-surface' : 'bg-paper'}`}>
                <div className="grid grid-cols-12 gap-y-10 lg:gap-x-16">
                  {/* Left */}
                  <div className="col-span-12 lg:col-span-4">
                    <Reveal>
                      <span className="font-mono text-label text-page-muted">
                        {service.number}
                      </span>
                      <h2 className="mt-4 text-h3 font-medium tracking-[-0.03em] text-page-ink">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-[0.9375rem] leading-[1.65] text-page-muted max-w-[36ch]">
                        {service.summary}
                      </p>
                      <div className="mt-8">
                        <Button
                          as={Link}
                          href={service.cta?.href ?? '/contact'}
                          variant="outline"
                          size="sm"
                          magnetic={false}
                        >
                          {service.cta?.label ?? 'Start a project'}
                        </Button>
                      </div>
                    </Reveal>
                  </div>

                  {/* Right */}
                  <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                    <Reveal delay={0.1}>
                      <p className="text-[1.0625rem] leading-[1.7] text-page-muted max-w-[58ch]">
                        {service.description}
                      </p>
                    </Reveal>

                    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <Reveal delay={0.15}>
                        <div>
                          <p className="font-mono text-label uppercase tracking-[0.16em] text-page-muted mb-5">
                            Capabilities
                          </p>
                          <ul className="space-y-3">
                            {service.capabilities.map((cap) => (
                              <li
                                key={cap}
                                className="flex items-center gap-3 text-[0.9375rem] text-page-muted"
                              >
                                <span className="h-px w-3 shrink-0 bg-page-line" />
                                {cap}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>
                      <Reveal delay={0.2}>
                        <div>
                          <p className="font-mono text-label uppercase tracking-[0.16em] text-page-muted mb-5">
                            Business outcomes
                          </p>
                          <ul className="space-y-3">
                            {service.outcomes.map((outcome) => (
                              <li
                                key={outcome}
                                className="flex items-center gap-3 text-[0.9375rem] text-page-ink font-medium"
                              >
                                <span className="h-1 w-1 shrink-0 rounded-full bg-page-accent" />
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-page-line" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-ink text-paper">
        <div className="shell">
          <div className="h-px w-full bg-paper/10" />
          <div className="pt-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <h2 className="text-h2 font-medium max-w-[18ch]">
                Not sure which service fits?
              </h2>
              <p className="mt-5 max-w-[44ch] text-lead text-paper/55">
                Most projects draw from more than one discipline. Tell us about your business and we
                will recommend the right approach.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Button as={Link} href="/contact" variant="invert" size="lg">
                Start a conversation
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
