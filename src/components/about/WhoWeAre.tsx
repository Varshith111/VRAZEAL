'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AboutSection, ease, LineReveal } from './shared';

export function WhoWeAre() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="01" label="Who we are" tone="paper">
      <div className="mt-14 grid grid-cols-12 gap-y-10 lg:mt-20 lg:gap-x-16">
        {/* The label column doubles as the section's anchor on desktop. */}
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <p className="max-w-[24ch] font-mono text-[0.625rem] uppercase leading-[1.9] tracking-[0.14em] text-page-muted">
              Technology · Design · Automation · Brand
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <LineReveal
            className="text-[clamp(1.875rem,4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.038em] text-page-ink"
            lines={['Technology should', 'make business simpler.']}
          />

          <motion.p
            className="mt-9 max-w-[56ch] text-lead leading-[1.65] text-page-muted lg:mt-11"
            initial={reduced ? undefined : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            VRAZEAL combines technology, design, and creative thinking to build digital experiences
            and business systems that solve real business problems.
          </motion.p>
        </div>
      </div>
    </AboutSection>
  );
}
