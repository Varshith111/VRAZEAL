'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AboutSection, ease, LineReveal } from '@/components/about/shared';

export function TechPlusCreativity() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="04" label="Philosophy" tone="ink">
      <div className="mt-12 py-12 lg:mt-16 lg:py-20">
        <LineReveal
          className="text-[clamp(2.25rem,5.5vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-paper"
          lines={[
            'TECHNOLOGY WITHOUT CREATIVITY',
            'IS JUST FUNCTION.',
            'CREATIVITY WITHOUT TECHNOLOGY',
            'IS JUST POTENTIAL.',
          ]}
        />

        <motion.div
          className="mt-16 border-t border-paper/15 pt-12"
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-paper/40">
            The VRAZEAL Synthesis
          </span>
          <h3 className="mt-4 font-display text-[clamp(2.5rem,6vw,6rem)] font-bold tracking-tight text-paper">
            WE BRING BOTH TOGETHER.
          </h3>
          <p className="mt-6 max-w-[50ch] text-lead leading-relaxed text-paper/70">
            Engineering precision paired with creative direction. We don&apos;t compromise code quality for visual flair, or design clarity for technical complexity.
          </p>
        </motion.div>
      </div>
    </AboutSection>
  );
}
