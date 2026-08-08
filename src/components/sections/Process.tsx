'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { Section } from '@/components/ui/Section';
import { ProcessArtifact } from './ProcessArtifact';
import { processSteps } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

const N = processSteps.length;
const ease = [0.16, 1, 0.3, 1] as const;

export function Process() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();

  return (
    <Section id="process" index="04" label="Process" meta="Six phases, fixed timeline">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <h2 className="col-span-12 text-h2 font-medium lg:col-span-6">
            <SplitText text="How the work happens" />
          </h2>
          <p className="col-span-12 max-w-prose text-lead text-muted lg:col-span-5 lg:col-start-8">
            No black box. Every phase has a defined output, a named owner, and a date — so you always
            know what you are getting and when.
          </p>
        </div>
      </div>

      {isDesktop && !reduced ? <AssemblyStage /> : <VerticalTimeline />}
    </Section>
  );
}

/**
 * Desktop: the section pins and scroll assembles a single drawing.
 *
 * Nothing slides past. Each phase adds a layer to the same artifact — research
 * scatter becomes a graph, the graph becomes a frame, the frame fills, ships,
 * and compounds — so reaching the end of the section means watching a product
 * get built rather than watching six cards go by.
 */
function AssemblyStage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // The drawing follows a smoothed copy of scroll; the copy switches on the raw
  // value, so the words never lag behind the phase the visitor is standing in.
  const build = useSpring(scrollYProgress, { stiffness: 180, damping: 38, mass: 0.4 });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(N - 1, Math.floor(v * N + 0.08)));
  });

  return (
    <div ref={sectionRef} style={{ height: `${N * 100}vh` }} className="relative mt-16">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Phase index across the top. */}
        <div className="shell mb-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {processSteps.map((step, i) => (
              <span
                key={step.id}
                className={cn(
                  'font-mono text-label transition-colors duration-500',
                  i === active ? 'text-ink' : i < active ? 'text-muted' : 'text-line',
                )}
              >
                {step.number}
              </span>
            ))}
          </div>
          <span className="font-mono text-label text-muted">{processSteps[active]?.duration}</span>
        </div>

        <div className="shell grid grid-cols-12 items-center gap-x-14">
          {/* LEFT — the phase, in words. */}
          <div className="col-span-5">
            <div className="relative overflow-hidden" style={{ height: 'clamp(6.5rem, 12vw, 10rem)' }}>
              {processSteps.map((step, i) => (
                <StepTitle key={step.id} step={step} index={i} active={active} />
              ))}
            </div>

            <div className="relative mt-6 h-[10.5rem]">
              {processSteps.map((step, i) => (
                <StepBody key={step.id} step={step} index={i} active={active} />
              ))}
            </div>
          </div>

          {/* RIGHT — the same drawing, one layer deeper every phase. */}
          <div className="col-span-7 h-[min(54vh,29rem)]">
            <ProcessArtifact progress={build} />
          </div>
        </div>

        {/* Progress rail. */}
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
      aria-hidden={state !== 'active'}
      initial={false}
      animate={
        state === 'active'
          ? { y: '0%', opacity: 1 }
          : state === 'future'
            ? { y: '100%', opacity: 0 }
            : { y: '-100%', opacity: 0 }
      }
      transition={{ duration: 0.7, ease }}
    >
      <span className="mb-3 block font-mono text-label text-accent">{step.number}</span>
      <h3
        className="font-medium leading-[0.95] tracking-[-0.04em]"
        style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}
      >
        {step.title}
      </h3>
    </motion.div>
  );
}

/** Body and outputs for the active phase, cross-faded in place. */
function StepBody({
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
      className="absolute inset-x-0 top-0"
      aria-hidden={state !== 'active'}
      initial={false}
      animate={
        state === 'active'
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: state === 'future' ? 20 : -20 }
      }
      transition={{ duration: 0.6, ease }}
    >
      <p className="max-w-[40ch] text-[0.9375rem] leading-[1.65] text-muted lg:text-[1.0625rem]">
        {step.body}
      </p>

      <ul className="mt-6 space-y-2 border-t border-line pt-5">
        {step.outputs.map((output, i) => (
          <motion.li
            key={output}
            className="flex items-center gap-3 text-[0.8125rem] text-muted"
            initial={false}
            animate={
              state === 'active' ? { opacity: 1, x: 0 } : { opacity: 0, x: state === 'future' ? 12 : -12 }
            }
            transition={{ duration: 0.5, delay: state === 'active' ? 0.1 + i * 0.07 : 0, ease }}
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
            {output}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * Mobile + tablet: an ordinary-scrolling vertical timeline. A spine draws itself
 * down the left rail as the section passes, and each phase lights its node when
 * it reaches reading position.
 *
 * Deliberately not pinned. Pinning six phases means the visitor cannot reach one
 * without scrubbing past the ones before it, and on a phone the assembled
 * drawing would be too small to read anyway.
 */
function VerticalTimeline() {
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 65%'],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  return (
    <div className="shell mt-12 md:mt-16">
      <ol ref={listRef} className="relative">
        {/* Rail + the ink that fills it. Sits under the nodes. */}
        <span aria-hidden className="absolute bottom-0 left-[9px] top-0 w-px bg-line md:left-[13px]" />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[9px] top-0 w-px origin-top bg-ink md:left-[13px]"
          style={{ scaleY: spine }}
        />

        {processSteps.map((step, index) => (
          <VerticalStep key={step.id} step={step} last={index === N - 1} />
        ))}
      </ol>
    </div>
  );
}

function VerticalStep({ step, last }: { step: (typeof processSteps)[number]; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  // Fires as the step rises into the lower third. A tighter band around the
  // centre leaves the phases below it invisible, which reads as a blank column.
  const inView = useInView(ref, { once: true, margin: '0px 0px -18% 0px' });

  return (
    <li ref={ref} className={cn('relative pl-9 md:pl-14', last ? 'pb-0' : 'pb-10 md:pb-14')}>
      {/* Node */}
      <span
        aria-hidden
        className={cn(
          'absolute left-0 top-[3px] flex h-[19px] w-[19px] items-center justify-center rounded-full border bg-paper transition-colors duration-700 ease-expo md:h-[27px] md:w-[27px]',
          inView ? 'border-ink' : 'border-line',
        )}
      >
        <span
          className={cn(
            'h-[7px] w-[7px] rounded-full transition-all duration-700 ease-expo md:h-[9px] md:w-[9px]',
            inView ? 'scale-100 bg-accent' : 'scale-0 bg-line',
          )}
        />
      </span>

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        animate={reduced ? undefined : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span
            className={cn(
              'font-mono text-label transition-colors duration-700',
              inView ? 'text-accent' : 'text-muted',
            )}
          >
            {step.number}
          </span>
          <h3 className="text-[1.5rem] font-medium tracking-[-0.03em] md:text-[2rem]">
            {step.title}
          </h3>
          <span className="font-mono text-label text-muted md:ml-auto">{step.duration}</span>
        </div>

        <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.62] text-muted md:mt-4 md:max-w-[60ch] md:text-[1.0625rem]">
          {step.body}
        </p>

        {/* Tablet gets the outputs two-up; the phone keeps them in one readable column. */}
        <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 border-t border-line pt-5 md:mt-7 md:grid-cols-2 md:pt-6">
          {step.outputs.map((output) => (
            <li
              key={output}
              className="flex items-center gap-3 text-[0.8125rem] text-muted md:text-[0.875rem]"
            >
              <span
                className={cn(
                  'h-1 w-1 shrink-0 rounded-full transition-colors duration-700',
                  inView ? 'bg-accent' : 'bg-line',
                )}
              />
              {output}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}
