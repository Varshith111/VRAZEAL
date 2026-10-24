'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { aboutPrinciples } from '@/lib/about';

/**
 * Each principle is set as an outline that fills with solid white as it
 * crosses the middle of the screen — read by scrolling, one at a time.
 */
export function PrincipleRows() {
  return (
    <section className="relative bg-void py-section">
      <div className="shell">
        <SectionIntro
          index="02"
          label="What we believe"
          title={[
            'Three rules we',
            <>
              do not <span className="accent-serif">bend</span>
              <span className="text-accent">.</span>
            </>,
          ]}
        />
        <div className="mt-16 border-t border-hair lg:mt-24">
          {aboutPrinciples.map((principle) => (
            <Row key={principle.number} {...principle} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ number, title, body }: { number: string; title: string; body: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 35%'] });
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const bodyOpacity = useTransform(scrollYProgress, [0.5, 1], [0.25, 1]);

  return (
    <div ref={ref} className="grid grid-cols-12 items-baseline gap-y-5 border-b border-hair py-12 lg:py-16">
      <span className="col-span-12 font-mono text-label text-accent-bright lg:col-span-1">{number}</span>
      <h3 className="relative col-span-12 font-display text-[clamp(2.5rem,6.4vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em] lg:col-span-8">
        <span className="text-outline">{title}</span>
        <motion.span
          aria-hidden
          className="absolute inset-0 text-paper"
          style={{ clipPath: reduced ? 'none' : clip }}
        >
          {title}
        </motion.span>
      </h3>
      <motion.p
        className="col-span-12 max-w-[30ch] text-lead text-smoke lg:col-span-3"
        style={reduced ? undefined : { opacity: bodyOpacity }}
      >
        {body}
      </motion.p>
    </div>
  );
}
