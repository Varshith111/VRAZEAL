'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { IconArrowDiagonal } from '@/components/ui/icons';
import { projects } from '@/components/pages/ProjectsPage';
import { AboutSection, ease, LineReveal } from './shared';

export function SelectedWorkShowcase() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="06" label="Selected Work" tone="surface">
      <div className="mt-12 lg:mt-16">
        <div className="grid grid-cols-12 items-end gap-y-6">
          <LineReveal
            className="col-span-12 text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.04em] text-page-ink lg:col-span-7"
            lines={['BUILT, NOT JUST', 'PROMISED.']}
          />
          <p className="col-span-12 max-w-[44ch] text-lead leading-[1.65] text-page-muted lg:col-span-5 lg:col-start-8">
            Real engagements built for real business operations. Built on custom engineering foundations without boilerplate code.
          </p>
        </div>

        <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group rounded-3xl border border-page-line bg-paper p-8 transition-shadow hover:shadow-lg lg:p-12"
              initial={reduced ? undefined : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease }}
            >
              <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12 lg:items-center">
                {/* Left Metadata & Details */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-page-muted">
                      {project.year}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-page-line" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-page-ink">
                      {project.industry}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-page-ink lg:text-4xl">
                    {project.name}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-page-muted">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-page-line bg-surface px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-page-muted"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/projects"
                      data-cursor="link"
                      className="inline-flex items-center gap-2 font-medium text-page-ink hover:underline underline-offset-4"
                    >
                      <span>Explore Case Details</span>
                      <IconArrowDiagonal className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Visual Architecture Card */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-page-line bg-surface p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-page-line/60 pb-3">
                      <span className="font-mono text-[0.625rem] uppercase tracking-widest text-page-muted">
                        Platform Architecture
                      </span>
                      <span className="font-mono text-[0.625rem] uppercase tracking-widest text-page-ink">
                        {project.status}
                      </span>
                    </div>

                    <div className="my-auto text-center py-6">
                      <span className="font-display text-5xl font-bold tracking-tighter text-page-ink/15 lg:text-7xl select-none">
                        VRAZEAL
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[0.625rem] text-page-muted">
                      <span>Production Grade</span>
                      <span>Next.js · Headless · Custom API</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-start border-t border-page-line pt-8">
          <Link
            href="/projects"
            data-cursor="link"
            className="group inline-flex items-center gap-3 text-lg font-medium text-page-ink"
          >
            <span className="underline underline-offset-4">View complete portfolio</span>
            <IconArrowDiagonal className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </AboutSection>
  );
}
