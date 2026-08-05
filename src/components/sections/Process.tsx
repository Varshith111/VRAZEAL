'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { Section } from '@/components/ui/Section';
import { processSteps } from '@/lib/content';
import { cn } from '@/lib/utils';

const N = processSteps.length;

export function Process() {
  return (
    <Section id="process" index="04" label="Process" meta="Six phases, fixed timeline">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <h2 className="col-span-12 text-h2 font-medium lg:col-span-6">
            <SplitText text="How the work happens" />
          </h2>
          <p className="col-span-12 max-w-prose text-lead text-muted lg:col-span-5 lg:col-start-8">
            No black box. Every phase has a defined output, a named owner, and a
            date — so you always know what you are getting and when.
          </p>
        </div>
      </div>

      <StackTimeline />
    </Section>
  );
}

function StackTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(N - 1, Math.floor(v * N + 0.08)));
  });

  return (
    <div
      ref={sectionRef}
      style={{ height: `${N * 100}vh` }}
      className="relative mt-16"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">

        {/* Phase dots row */}
        <div className="shell mb-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {processSteps.map((step, i) => (
              <span
                key={step.id}
                className={cn(
                  'font-mono text-label transition-colors duration-500',
                  i === active ? 'text-ink' : 'text-line',
                )}
              >
                {step.number}
              </span>
            ))}
          </div>
          <span className="font-mono text-label text-muted">
            {processSteps[active]?.duration}
          </span>
        </div>

        {/* Split layout */}
        <div className="shell grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">

          {/* LEFT — large step title that clips-in on change */}
          <div className="flex flex-col justify-center">
            <div className="relative overflow-hidden" style={{ height: 'clamp(8rem, 16vw, 15rem)' }}>
              {processSteps.map((step, i) => (
                <StepTitle key={step.id} step={step} index={i} active={active} />
              ))}
            </div>
            <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-[1.65] text-muted lg:text-[1.0625rem]">
              {processSteps[active]?.body}
            </p>
          </div>

          {/* RIGHT — card that slides up on change */}
          <div
            className="relative overflow-hidden rounded-card"
            style={{ height: 'clamp(18rem, 38vh, 26rem)' }}
          >
            {processSteps.map((step, i) => (
              <StepCard key={step.id} step={step} index={i} active={active} />
            ))}
          </div>
        </div>

        {/* Progress rail */}
        <div className="shell mt-10">
          <div className="relative h-px w-full bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 w-full origin-left bg-ink"
              style={{ scaleX: lineScale }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Large step title — clips up into view when active, clips down out when past. */
function StepTitle({
  step,
  index,
  active,
}: {
  step: (typeof processSteps)[number];
  index: number;
  active: number;
}) {
  const state = index === active ? 'active' : index < active ? 'past' : 'future';

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center pb-2"
      initial={false}
      animate={
        state === 'active'
          ? { y: '0%', opacity: 1 }
          : state === 'future'
          ? { y: '100%', opacity: 0 }
          : { y: '-100%', opacity: 0 }
      }
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="block font-mono text-label text-accent mb-3">{step.number}</span>
      <h3
        className="font-medium tracking-[-0.04em] leading-[0.95]"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
      >
        {step.title}
      </h3>
    </motion.div>
  );
}

/** Card — slides up from below when active, slides up out when past. */
function StepCard({
  step,
  index,
  active,
}: {
  step: (typeof processSteps)[number];
  index: number;
  active: number;
}) {
  const state = index === active ? 'active' : index < active ? 'past' : 'future';

  return (
    <motion.article
      className="absolute inset-0 flex flex-col justify-between border border-line bg-paper p-8 rounded-card"
      initial={false}
      animate={
        state === 'active'
          ? { y: '0%', opacity: 1 }
          : state === 'future'
          ? { y: '100%', opacity: 1 }
          : { y: '-8%', opacity: 0, scale: 0.96 }
      }
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-label text-accent">{step.number}</span>
        <span className="font-mono text-label text-muted">{step.duration}</span>
      </div>

      <div>
        <h4 className="text-[1.5rem] font-medium tracking-[-0.03em] lg:text-[1.75rem]">
          {step.title}
        </h4>
        <p className="mt-2 text-[0.875rem] leading-[1.6] text-muted lg:text-[0.9375rem]">
          {step.body}
        </p>
      </div>

      <ul className="space-y-2 border-t border-line pt-5">
        {step.outputs.map((output) => (
          <li key={output} className="flex items-center gap-3 text-[0.8125rem] text-muted">
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
            {output}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
