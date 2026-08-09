'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { aboutReasons } from '@/lib/about';
import { cn } from '@/lib/utils';
import { AboutSection, ease, LineReveal } from './shared';

/**
 * Five reasons in an asymmetric ruled grid.
 *
 * The first cell spans two columns on desktop so the block reads as a
 * composition rather than a row of equal tiles — five items in a four-up grid
 * would otherwise orphan the last one.
 */
export function WhyVrazeal() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="06" label="Why VRAZEAL" tone="surface">
      <div className="mt-14 grid grid-cols-12 gap-y-10 lg:mt-20 lg:gap-x-16">
        <div className="col-span-12 lg:col-span-6">
          <LineReveal
            className="text-[clamp(1.875rem,4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.038em] text-page-ink"
            lines={['One team.', 'Multiple capabilities.']}
          />
        </div>
        <motion.p
          className="col-span-12 max-w-[52ch] self-end text-lead leading-[1.65] text-page-muted lg:col-span-5 lg:col-start-8"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          VRAZEAL brings technology, design, automation and creative thinking together under one team
          — so businesses don&apos;t have to coordinate multiple disconnected teams.
        </motion.p>
      </div>

      <div className="mt-14 grid grid-cols-1 border-t border-page-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {aboutReasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            className={cn(
              'group relative overflow-hidden border-b border-page-line px-1 py-9 sm:px-6 lg:py-12',
              'sm:border-l sm:first:border-l-0',
              // Five cells in a two-up grid orphan the last one in a half-width
              // column, so it takes the full row at sm and reverts at lg.
              'sm:[&:last-child]:col-span-2 lg:[&:last-child]:col-span-1',
              // The opening cell takes the rest of the first row on desktop.
              index === 0 && 'lg:col-span-2',
            )}
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.7, delay: index * 0.07, ease }}
          >
            {/* Hairline that draws across the top on hover. */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-px w-0 bg-page-ink transition-[width] duration-700 ease-expo group-hover:w-full"
            />
            <span className="font-mono text-label text-page-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3
              className={cn(
                'mt-6 font-display font-medium leading-[1.15] tracking-[-0.03em] text-page-ink transition-transform duration-500 ease-expo group-hover:translate-x-1',
                index === 0
                  ? 'text-[clamp(1.375rem,2.4vw,2rem)]'
                  : 'text-[1.25rem] lg:text-[1.375rem]',
              )}
            >
              {reason.title}
            </h3>
            <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-[1.65] text-page-muted">
              {reason.body}
            </p>
          </motion.div>
        ))}
      </div>
    </AboutSection>
  );
}
