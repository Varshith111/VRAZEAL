'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AboutSection, ease, LineReveal } from './shared';

const pillars = [
  {
    title: 'BUSINESS FIRST',
    description: 'We understand the commercial objectives before choosing the technical stack or design language.',
  },
  {
    title: 'CUSTOM BUILT',
    description: 'No unnecessary templates or rigid off-the-shelf software retrofitted onto your workflow.',
  },
  {
    title: 'DIRECT COLLABORATION',
    description: 'You work directly with the engineers, designers, and strategists building your product.',
  },
  {
    title: 'LONG-TERM THINKING',
    description: 'We build systems designed to hold up and evolve long after initial launch.',
  },
];

export function WhyVrazealHuman() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="07" label="Why VRAZEAL" tone="paper">
      <div className="mt-12 lg:mt-16">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* Left Column Statement */}
          <div className="col-span-12 lg:col-span-5">
            <LineReveal
              className="text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.04em] text-page-ink"
              lines={['ONE TEAM.', 'MULTIPLE', 'CAPABILITIES.']}
            />
            <p className="mt-6 text-lead leading-relaxed text-page-muted">
              VRAZEAL brings technology, design, automation, and creative thinking together under one dedicated team.
            </p>
          </div>

          {/* Right Column Pillars List */}
          <div className="col-span-12 lg:col-span-7">
            <div className="divide-y divide-page-line border-t border-b border-page-line">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  className="py-8"
                  initial={reduced ? undefined : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease }}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-page-muted">
                    0{idx + 1} — Core Advantage
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-page-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-page-muted">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
