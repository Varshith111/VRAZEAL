'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { IconArrowDiagonal } from '@/components/ui/icons';
import { projects } from '@/components/pages/ProjectsPage';
import { cn } from '@/lib/utils';
import { AboutSection, ease, LineReveal } from './shared';

/**
 * Selected work, read from the same source as the Projects page.
 *
 * The layout alternates sides by index, so adding a second engagement to the
 * shared `projects` array lays itself out correctly with no change here.
 *
 * The visual is drawn rather than photographed: there is no project imagery in
 * the repository, and the site's existing project visuals carry a blue accent
 * that does not belong in this page's monochrome palette. It is an abstraction
 * of the platform's own described features — catalogue, order queue, admin —
 * not a screenshot standing in for one.
 */
export function SelectedWork() {
  return (
    <AboutSection index="05" label="Selected work" tone="paper">
      <div className="mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-6">
          <LineReveal
            className="col-span-12 text-[clamp(1.875rem,4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.038em] text-page-ink lg:col-span-6"
            lines={['Selected work']}
          />
          <p className="col-span-12 max-w-[44ch] text-[0.9375rem] leading-[1.65] text-page-muted lg:col-span-5 lg:col-start-8">
            Built for real businesses, with the constraints that came with them. The rest of the
            portfolio is available on request.
          </p>
        </div>

        <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16 flex justify-start border-t border-page-line pt-8 lg:mt-24">
          <Link
            href="/projects"
            data-cursor="link"
            className="group inline-flex min-h-[44px] items-center gap-3 text-[1.0625rem] font-medium text-page-ink"
          >
            <span className="link-underline">All projects</span>
            <IconArrowDiagonal className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </AboutSection>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const flipped = index % 2 === 1;

  return (
    <article className="grid grid-cols-12 items-center gap-y-8 lg:gap-x-14">
      {/* Visual — dominant, and the first thing read on mobile. */}
      <motion.div
        className={cn(
          'col-span-12 lg:col-span-7',
          flipped ? 'lg:order-2 lg:col-start-6' : 'lg:order-1',
        )}
        initial={reduced ? undefined : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1, ease }}
      >
        <Link href="/projects" tabIndex={-1} aria-hidden className="group block">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-card border border-page-line bg-surface sm:aspect-[16/10]">
            <div className="h-full w-full transition-transform duration-[900ms] ease-expo group-hover:scale-[1.02]">
              <CommerceVisual />
            </div>
          </div>
        </Link>
      </motion.div>

      <motion.div
        className={cn(
          'col-span-12 lg:col-span-5',
          flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2',
        )}
        initial={reduced ? undefined : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, delay: 0.12, ease }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-label text-page-muted">{project.industry}</span>
          <span className="font-mono text-label text-page-muted">{project.year}</span>
        </div>

        <h3 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.375rem)] font-medium leading-[1.1] tracking-[-0.034em] text-page-ink">
          {project.name}
        </h3>

        <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-[1.65] text-page-muted lg:text-[1.0625rem]">
          {project.description}
        </p>

        <ul className="mt-7 flex flex-wrap gap-1.5">
          {project.services.map((service) => (
            <li
              key={service}
              className="rounded-pill border border-page-line px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.11em] text-page-muted"
            >
              {service}
            </li>
          ))}
        </ul>

        <Link
          href="/projects"
          data-cursor="link"
          className="group mt-8 inline-flex min-h-[44px] items-center gap-3 text-[0.9375rem] font-medium text-page-ink"
        >
          <span className="link-underline">View project</span>
          <IconArrowDiagonal className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </article>
  );
}

/**
 * Monochrome abstraction of the delivered platform: catalogue, order queue and
 * the staff dashboard behind them. Same hairline language as the rest of the
 * page, no colour.
 */
function CommerceVisual() {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <div className="flex h-full w-full flex-col bg-paper">
      {/* Window chrome */}
      <div className="flex shrink-0 items-center gap-2 border-b border-page-line px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-page-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-page-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-page-line" />
        <span className="ml-3 h-4 flex-1 rounded-sm bg-[#F3F3F3]" />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[1fr_36%]">
        {/* Catalogue */}
        <div className="grid grid-cols-3 content-start gap-2 p-4 sm:gap-2.5 sm:p-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-2 rounded-lg border border-page-line p-2.5"
              {...rise(0.1 + index * 0.06)}
            >
              <span className="block h-8 rounded-md bg-[#F1F1F1] sm:h-10" />
              <span className="block h-1.5 w-4/5 rounded-full bg-[#ECECEC]" />
              <span
                className={cn(
                  'block h-1.5 rounded-full',
                  index === 1 ? 'w-2/3 bg-page-ink/70' : 'w-1/2 bg-[#F1F1F1]',
                )}
              />
            </motion.div>
          ))}
        </div>

        {/* Order queue */}
        <aside className="hidden flex-col gap-2.5 border-l border-page-line p-4 sm:flex sm:p-5">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-page-muted">
            Order queue
          </p>
          {[0, 1, 2, 3].map((row) => (
            <motion.div
              key={row}
              className={cn(
                'flex items-center gap-2 rounded-md border px-2.5 py-2',
                row === 0 ? 'border-page-ink/20 bg-surface' : 'border-page-line',
              )}
              {...rise(0.35 + row * 0.08)}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 shrink-0 rounded-full',
                  row === 0 ? 'bg-page-ink' : 'bg-[#DCDCDC]',
                )}
              />
              <span className="h-1.5 flex-1 rounded-full bg-[#ECECEC]" />
            </motion.div>
          ))}
          <motion.div className="mt-auto rounded-md border border-page-line p-2.5" {...rise(0.7)}>
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-page-muted">
              Inventory
            </p>
            <div className="mt-2 flex items-end gap-1">
              {[40, 66, 52, 88, 61].map((height, index) => (
                <span
                  key={index}
                  className={cn('flex-1 rounded-sm', index === 3 ? 'bg-page-ink/70' : 'bg-[#ECECEC]')}
                  style={{ height: `${height * 0.34}px` }}
                />
              ))}
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
