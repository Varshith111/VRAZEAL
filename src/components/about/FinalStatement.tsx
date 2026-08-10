'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AboutSection, ease, LineReveal } from './shared';

const points = [
  { number: '01', title: 'Custom-built around the business.' },
  { number: '02', title: 'Designed with clear purpose.' },
  { number: '03', title: 'Engineered to evolve over time.' },
];

export function FinalStatement() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="08" label="Commitment" tone="ink">
      <div className="mt-12 lg:mt-16">
        <LineReveal
          className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-paper"
          lines={[
            'BUILT FOR THE LONG RUN.',
            'NOT THE PITCH.',
          ]}
        />

        <p className="mt-8 max-w-[50ch] text-lead leading-relaxed text-paper/70 lg:mt-10">
          We don&apos;t build things just to launch them. We build them to work, grow, and last.
        </p>

        <div className="mt-16 grid grid-cols-12 gap-y-8 divide-y divide-paper/15 border-t border-b border-paper/15 py-8 lg:mt-20 lg:divide-y-0 lg:divide-x lg:gap-y-0">
          {points.map((p, idx) => (
            <motion.div
              key={p.number}
              className="col-span-12 pt-6 lg:col-span-4 lg:px-8 lg:pt-0"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-paper/40">
                {p.number} — Foundation
              </span>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-paper lg:text-2xl">
                {p.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
