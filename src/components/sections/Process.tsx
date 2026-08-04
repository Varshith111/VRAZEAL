'use client';

import { useLayoutEffect, useRef, useState } from 'react';
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
import { processSteps } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

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

      {isDesktop && !reduced ? <HorizontalTimeline /> : <VerticalTimeline />}
    </Section>
  );
}

/** Desktop: the section pins and the timeline scrubs sideways 1:1 with scroll. */
function HorizontalTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      // How far the track has to travel for its last card to sit flush right.
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 260, damping: 42, mass: 0.5 });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.min(processSteps.length - 1, Math.floor(value * processSteps.length + 0.15));
    setActive(index);
  });

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative mt-16">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Phase index across the top. */}
        <div className="shell mb-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {processSteps.map((step, index) => (
              <span
                key={step.id}
                className={cn(
                  'font-mono text-label transition-colors duration-500',
                  index === active ? 'text-ink' : 'text-line',
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

        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pl-gutter will-change-transform">
          {processSteps.map((step, index) => (
            <TimelineCard key={step.id} step={step} index={index} active={index === active} />
          ))}
          <div aria-hidden className="w-gutter shrink-0" />
        </motion.div>

        {/* Progress rail. */}
        <div className="shell mt-12">
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

function TimelineCard({
  step,
  index,
  active,
}: {
  step: (typeof processSteps)[number];
  index: number;
  active: boolean;
}) {
  return (
    <article
      className={cn(
        // Desktop-only now — the vertical timeline below lg draws its own layout.
        'relative flex h-[clamp(20rem,44vh,26rem)] w-[min(78vw,25rem)] shrink-0 flex-col justify-between rounded-card border p-8 transition-all duration-700 ease-expo',
        active ? 'border-ink/15 bg-paper shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)]' : 'border-line bg-paper',
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'font-mono text-label transition-colors duration-500',
            active ? 'text-accent' : 'text-muted',
          )}
        >
          {step.number}
        </span>
        <span className="font-mono text-label text-muted">{step.duration}</span>
      </div>

      <div>
        <h3 className="text-[clamp(1.75rem,2.6vw,2.375rem)] font-medium tracking-[-0.035em]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-[1.6] text-muted">{step.body}</p>
      </div>

      <ul className="space-y-2 border-t border-line pt-5">
        {step.outputs.map((output) => (
          <li key={output} className="flex items-center gap-3 text-[0.8125rem] text-muted">
            <span
              className={cn(
                'h-1 w-1 rounded-full transition-colors duration-500',
                active ? 'bg-accent' : 'bg-line',
              )}
            />
            {output}
          </li>
        ))}
      </ul>

      {index < processSteps.length - 1 && (
        <span
          aria-hidden
          className="absolute -right-6 top-1/2 hidden h-px w-6 bg-line lg:block"
        />
      )}
    </article>
  );
}

/**
 * Mobile + tablet: an ordinary-scrolling vertical timeline. A spine draws itself
 * down the left rail as the section passes, and each phase lights its node when
 * it reaches reading position.
 *
 * Deliberately not pinned. Pinning a stack this tall means the visitor cannot
 * reach a phase without scrubbing past the ones before it, and on a phone the
 * cards never all fit in the frame at once.
 */
function VerticalTimeline() {
  const listRef = useRef<HTMLOListElement>(null);

  // Spine tracks the list itself, filling as the first card reaches the middle
  // of the screen and completing as the last one leaves it.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 65%'],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  return (
    <div className="shell mt-12 md:mt-16">
      <ol ref={listRef} className="relative">
        {/* Rail + the ink that fills it. Sits under the nodes. */}
        <span
          aria-hidden
          className="absolute bottom-0 left-[9px] top-0 w-px bg-line md:left-[13px]"
        />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[9px] top-0 w-px origin-top bg-ink md:left-[13px]"
          style={{ scaleY: spine }}
        />

        {processSteps.map((step, index) => (
          <VerticalStep key={step.id} step={step} last={index === processSteps.length - 1} />
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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
