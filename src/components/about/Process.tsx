'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { aboutProcess } from '@/lib/about';
import { cn } from '@/lib/utils';
import { AboutSection, ease, LineReveal } from './shared';

/**
 * Six phases on a spine that fills as the section passes.
 *
 * One implementation for both breakpoints: the timeline itself is a plain
 * vertical list that reads correctly on a phone, and above `lg` the title
 * column pins beside it. Pinning the whole section and scrubbing it sideways
 * would mean a visitor cannot reach phase six without scrolling through the
 * five before it — a cost worth paying on a landing page, not on About.
 */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 60%'],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  return (
    <AboutSection index="04" label="Our process" tone="surface">
      <div className="mt-14 grid grid-cols-12 gap-y-12 lg:mt-20 lg:gap-x-16">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3.5rem)]">
            <LineReveal
              className="text-[clamp(1.875rem,3.4vw,3rem)] font-medium leading-[1.06] tracking-[-0.038em] text-page-ink"
              lines={['From idea', 'to execution.']}
            />
            <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-[1.65] text-page-muted">
              Every phase has a defined output and a named owner, so you always know what is being
              worked on and what comes next.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <ol ref={listRef} className="relative">
            {/* Rail, and the ink that fills it. */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[9px] top-0 w-px bg-page-line md:left-[13px]"
            />
            <motion.span
              aria-hidden
              className="absolute bottom-0 left-[9px] top-0 w-px origin-top bg-page-ink md:left-[13px]"
              style={{ scaleY: spine }}
            />

            {aboutProcess.map((step, index) => (
              <Step key={step.number} step={step} last={index === aboutProcess.length - 1} />
            ))}
          </ol>
        </div>
      </div>
    </AboutSection>
  );
}

function Step({ step, last }: { step: (typeof aboutProcess)[number]; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <li ref={ref} className={cn('relative pl-9 md:pl-14', last ? 'pb-0' : 'pb-10 md:pb-14')}>
      <span
        aria-hidden
        className={cn(
          'absolute left-0 top-[2px] flex h-[19px] w-[19px] items-center justify-center rounded-full border bg-surface transition-colors duration-700 ease-expo md:h-[27px] md:w-[27px]',
          inView ? 'border-page-ink' : 'border-page-line',
        )}
      >
        <span
          className={cn(
            'h-[7px] w-[7px] rounded-full transition-all duration-700 ease-expo md:h-[9px] md:w-[9px]',
            inView ? 'scale-100 bg-page-ink' : 'scale-0 bg-page-line',
          )}
        />
      </span>

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        animate={reduced ? undefined : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="flex flex-wrap items-baseline gap-x-4">
          <span className="font-mono text-label text-page-muted">{step.number}</span>
          <h3 className="font-display text-[1.375rem] font-medium tracking-[-0.03em] text-page-ink md:text-[1.75rem]">
            {step.title}
          </h3>
        </div>
        <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-[1.62] text-page-muted md:text-[1.0625rem]">
          {step.body}
        </p>
      </motion.div>
    </li>
  );
}
