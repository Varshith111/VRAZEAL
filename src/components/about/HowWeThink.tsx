'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AboutSection, ease, LineReveal } from './shared';

const principles = [
  {
    number: '01',
    title: 'THINK CLEARLY',
    body: 'Understand the business and technical problem before building the solution.',
  },
  {
    number: '02',
    title: 'BUILD INTENTIONALLY',
    body: 'Every feature, interaction, and architectural decision has a clear purpose.',
  },
  {
    number: '03',
    title: 'CREATE FOR WHAT\'S NEXT',
    body: 'Build modular, maintainable systems that evolve as the business grows.',
  },
];

export function HowWeThink() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="04" label="How We Think" tone="ink">
      <div className="mt-12 lg:mt-16">
        <LineReveal
          className="text-[clamp(2.25rem,5.2vw,5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-paper"
          lines={[
            'WE DON\'T JUST MAKE',
            'THINGS LOOK GOOD.',
            'WE MAKE THEM WORK.',
          ]}
        />

        <div className="mt-16 grid grid-cols-12 gap-y-12 lg:mt-24 lg:gap-x-12">
          {principles.map((p, idx) => (
            <motion.div
              key={p.number}
              className="col-span-12 border-t border-paper/15 pt-8 lg:col-span-4"
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease }}
            >
              <div className="flex items-center gap-3 font-mono text-label uppercase tracking-widest text-paper/40">
                <span className="text-paper">{p.number}</span> — PRINCIPLE
              </div>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-paper lg:text-3xl">
                {p.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-paper/70">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
