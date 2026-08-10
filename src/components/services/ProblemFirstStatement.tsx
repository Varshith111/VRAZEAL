'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AboutSection, ease, LineReveal } from '@/components/about/shared';

export function ProblemFirstStatement() {
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <AboutSection index="02" label="Core Methodology" tone="surface">
      <div className="mt-12 lg:mt-16">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* Left Column Label & Anchor */}
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
              <span className="font-mono text-label uppercase tracking-[0.16em] text-page-muted">
                Problem-First Philosophy
              </span>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-page-ink">
                No predefined packages. No rigid templates.
              </h3>
            </div>
          </div>

          {/* Right Main Editorial Column */}
          <div className="col-span-12 lg:col-span-8">
            <LineReveal
              className="text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.04em] text-page-ink"
              lines={[
                'WE DON\'T START',
                'WITH A SERVICE.',
                'WE START WITH',
                'A PROBLEM.',
              ]}
            />

            <div className="mt-12 space-y-8 text-lead leading-[1.65] text-page-muted lg:mt-16">
              <motion.p {...fadeUp(0.2)}>
                Every business is different. Instead of forcing businesses into predefined packages or cookie-cutter templates, we understand the commercial and technical challenge first and build the right combination of <span className="text-page-ink font-semibold underline underline-offset-4 decoration-page-line">technology, design, and strategy</span> around it.
              </motion.p>

              <motion.p {...fadeUp(0.35)}>
                Whether that means engineering a custom CRM, designing a conversion-focused web platform, or wiring AI automation into your existing stack, every line of code and design token serves a specific purpose.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
