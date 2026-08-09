'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { aboutPrinciples } from '@/lib/about';
import { AboutSection, ease, LineReveal } from './shared';

/**
 * Three principles at display scale.
 *
 * Deliberately not cards: each principle is a full-width band separated by a
 * rule that draws itself in, so the section reads as a sequence of statements
 * rather than a grid of tiles.
 */
export function Approach() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="03" label="Our approach" tone="paper">
      <div className="mt-14 lg:mt-20">
        <LineReveal
          className="max-w-[20ch] text-[clamp(1.875rem,4.2vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.038em] text-page-ink"
          lines={["We don't just make", 'things look good.']}
        />
        <LineReveal
          className="max-w-[20ch] text-[clamp(1.875rem,4.2vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.038em] text-page-muted"
          lines={['We make them work.']}
          delay={0.16}
        />

        <div className="mt-16 lg:mt-24">
          {aboutPrinciples.map((principle, index) => (
            <motion.div
              key={principle.number}
              className="group border-t border-page-line last:border-b"
              initial={reduced ? undefined : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease }}
            >
              <div className="grid grid-cols-12 gap-y-4 py-9 lg:gap-x-10 lg:py-12">
                <div className="col-span-12 flex items-baseline gap-5 lg:col-span-7">
                  <span className="font-mono text-label text-page-muted">{principle.number}</span>
                  <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.032em] text-page-ink">
                    {principle.title}
                  </h3>
                </div>
                <p className="col-span-12 max-w-[44ch] self-center pl-10 text-[0.9375rem] leading-[1.65] text-page-muted lg:col-span-4 lg:col-start-9 lg:pl-0 lg:text-[1.0625rem]">
                  {principle.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
