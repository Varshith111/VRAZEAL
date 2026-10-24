'use client';

import { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { cn } from '@/lib/utils';

type Step = { number: string; title: string; body: string };

type Props = {
  index: string;
  label: string;
  title: ReactNode[];
  aside?: ReactNode;
  steps: Step[];
};

/** Numbered phases on a line that draws itself as the section scrolls through. */
export function StepsLine({ index, label, title, aside, steps }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const wide = steps.length > 4;

  return (
    <section className="relative bg-void py-section">
      <div className="shell">
        <SectionIntro index={index} label={label} title={title} aside={aside} />

        <div ref={ref} className="relative mt-20">
          <div aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-hair lg:block" />
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-[1.15rem] hidden h-px origin-left bg-accent shadow-[0_0_10px_#0A84FF] lg:block"
            style={{ scaleX: reduced ? 1 : line }}
          />
          <RevealGroup
            className={cn('grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-8', wide ? 'lg:grid-cols-6' : 'lg:grid-cols-4')}
            stagger={0.08}
          >
            {steps.map((step) => (
              <RevealItem key={step.number}>
                <div className="relative">
                  <span className="relative z-[1] flex h-[2.3rem] w-[2.3rem] items-center justify-center rounded-full border border-accent/50 bg-void font-mono text-[0.6875rem] text-accent-bright shadow-[0_0_20px_-4px_rgba(10,132,255,0.8)]">
                    {step.number}
                  </span>
                  <h3
                    className={cn(
                      'mt-8 font-display font-medium tracking-[-0.045em]',
                      wide ? 'text-[1.625rem]' : 'text-[2rem]',
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-[0.9375rem] leading-[1.6] text-smoke">{step.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
