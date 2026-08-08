'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/motion/Reveal';

const projects = [
  {
    id: 'pharmacy-ecommerce',
    name: 'Pharmacy E-Commerce Platform',
    industry: 'Healthcare / Retail',
    services: ['Website Development', 'Custom Software'],
    year: '2024',
    description:
      'A full-stack e-commerce platform for a pharmacy chain — product catalogue, prescription management, order tracking, and an admin dashboard for inventory and fulfilment.',
    highlights: [
      'Custom product & prescription management',
      'Real-time inventory tracking',
      'Admin dashboard for staff',
      'Mobile-first responsive design',
    ],
    status: 'Delivered',
  },
];

export function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected work."
        subtitle="A focused portfolio of projects built for real businesses. Every engagement is custom — no templates, no recycled layouts."
      />

      <section className="bg-surface pb-section">
        <div className="shell">
          {projects.map((project) => (
            <div key={project.id} className="scroll-mt-28">
              <div className="h-px w-full bg-page-line" />
              <div className="grid grid-cols-12 gap-y-10 py-14 lg:gap-x-16">
                {/* Left */}
                <div className="col-span-12 lg:col-span-4">
                  <Reveal>
                    <div className="flex items-baseline justify-between gap-4 mb-6">
                      <span className="font-mono text-label text-page-muted">{project.year}</span>
                      <span className="font-mono text-label text-page-muted border border-page-line rounded-pill px-3 py-1">
                        {project.status}
                      </span>
                    </div>
                    <h2 className="text-h3 font-medium tracking-[-0.03em] leading-[1.1] text-page-ink">
                      {project.name}
                    </h2>
                    <p className="mt-3 font-mono text-label text-page-muted">{project.industry}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-pill border border-page-line px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.11em] text-page-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>

                {/* Right */}
                <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                  <Reveal delay={0.1}>
                    <p className="text-[1.0625rem] leading-[1.7] text-page-muted max-w-[58ch]">
                      {project.description}
                    </p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <ul className="mt-8 space-y-3">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-4 text-[0.9375rem] text-page-muted border-b border-page-line pb-3 last:border-0"
                        >
                          <span className="font-mono text-label text-page-muted shrink-0 w-5">
                            {String(project.highlights.indexOf(h) + 1).padStart(2, '0')}
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </div>
          ))}

          {/* More work note */}
          <div className="h-px w-full bg-page-line" />
          <Reveal>
            <div className="py-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[1.125rem] font-medium text-page-ink">More work in progress.</p>
                <p className="mt-2 max-w-[48ch] text-[0.9375rem] text-page-muted leading-[1.65]">
                  We are currently building several projects that will be added to this page once
                  delivered. If you would like to see work relevant to your industry, get in touch.
                </p>
              </div>
              <Button as={Link} href="/contact" variant="outline" size="md" magnetic={false}>
                Discuss your project
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-ink text-paper">
        <div className="shell">
          <div className="h-px w-full bg-paper/10" />
          <div className="pt-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <h2 className="text-h2 font-medium max-w-[16ch]">Ready to be next?</h2>
              <p className="mt-5 max-w-[44ch] text-lead text-paper/55">
                Tell us about your business and what you are trying to build.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Button as={Link} href="/contact" variant="invert" size="lg">
                Start a project
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
