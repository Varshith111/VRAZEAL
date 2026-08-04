'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
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
          className="absolute -right-6 top-1/2 h-px w-6 bg-line"
        />
      )}
    </article>
  );
}

/** Mobile and reduced-motion: the same six phases, read top to bottom. */
function VerticalTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
  }, []);

  return (
    <div className="shell mt-14">
      <div ref={ref} className="relative pl-8 sm:pl-12">
        <div aria-hidden className="absolute left-[3px] top-2 w-px bg-line" style={{ height: height - 16 }} />
        <motion.div
          aria-hidden
          className="absolute left-[3px] top-2 w-px origin-top bg-ink"
          style={{ height: height - 16, scaleY: scrollYProgress }}
        />

        {processSteps.map((step) => (
          <Reveal key={step.id} className="relative pb-12 last:pb-0">
            <span aria-hidden className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-ink sm:-left-12" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-[1.5rem] font-medium tracking-[-0.03em]">
                <span className="mr-3 font-mono text-label text-muted">{step.number}</span>
                {step.title}
              </h3>
              <span className="font-mono text-label text-muted">{step.duration}</span>
            </div>
            <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-muted">{step.body}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {step.outputs.map((output) => (
                <li
                  key={output}
                  className="rounded-pill border border-line px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted"
                >
                  {output}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
