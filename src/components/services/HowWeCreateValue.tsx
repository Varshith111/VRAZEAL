'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AboutSection, ease, LineReveal } from '@/components/about/shared';

const valueStages = [
  {
    number: '01',
    title: 'CLARITY',
    body: 'Understand the business problem and operational constraints before writing code or drawing screens.',
  },
  {
    number: '02',
    title: 'CREATIVITY',
    body: 'Find a distinctive, better way to solve the challenge that stands out in your market.',
  },
  {
    number: '03',
    title: 'TECHNOLOGY',
    body: 'Build the right modular system using production-grade engineering and modern stacks.',
  },
  {
    number: '04',
    title: 'IMPACT',
    body: 'Create measurable business outcomes, operational efficiency, and long-term scalability.',
  },
];

export function HowWeCreateValue() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="05" label="Value Architecture" tone="paper">
      <div className="mt-12 lg:mt-16">
        <LineReveal
          className="text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.04em] text-page-ink"
          lines={['HOW WE CREATE', 'VALUE.']}
        />

        <div className="mt-16 grid grid-cols-12 gap-y-10 lg:mt-20 lg:gap-x-8">
          {valueStages.map((stage, idx) => (
            <motion.div
              key={stage.number}
              className="relative col-span-12 rounded-3xl border border-page-line bg-surface p-8 lg:col-span-3 flex flex-col justify-between"
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-page-line pb-4 font-mono text-xs text-page-muted">
                  <span>STAGE {stage.number}</span>
                  <span className="h-2 w-2 rounded-full bg-page-ink" />
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-page-ink lg:text-3xl">
                  {stage.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-page-muted">
                  {stage.body}
                </p>
              </div>

              <div className="mt-8 font-mono text-[0.625rem] uppercase tracking-widest text-page-muted/80">
                Phase {idx + 1} of 04
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
