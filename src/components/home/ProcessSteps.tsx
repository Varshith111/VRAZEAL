'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { processSteps } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Where the background light sits for each phase — it travels as you go. */
const GLOW = [
  [18, 30],
  [70, 20],
  [80, 70],
  [30, 80],
  [55, 45],
  [85, 35],
];

export function ProcessSteps() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();

  return (
    <section id="process" className="relative scroll-mt-10 bg-void pt-section">
      <div className="shell">
        <SectionIntro
          index="04"
          label="Process"
          title={[
            'No black box.',
            <>
              Just <span className="accent-serif">progress</span>
              <span className="text-accent">.</span>
            </>,
          ]}
          aside="Six phases, each with a defined output, a named owner and a date. You see a live build every single week."
        />
      </div>
      {isDesktop && !reduced ? <Pinned /> : <Stacked />}
    </section>
  );
}

function Odometer({ value }: { value: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top leading-none">
      <motion.span
        className="flex flex-col"
        animate={{ y: `-${value * 10}%` }}
        transition={{ type: 'spring', stiffness: 90, damping: 18, mass: 0.9 }}
      >
        {Array.from({ length: 10 }).map((_, digit) => (
          <span key={digit} className="block h-[1em] leading-none">
            {digit}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const fill = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setStep(Math.min(processSteps.length - 1, Math.floor(value * processSteps.length)));
  });

  const current = processSteps[step];
  const [gx, gy] = GLOW[step];

  return (
    <div ref={ref} className="relative mt-10" style={{ height: `${processSteps.length * 70 + 30}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(10,132,255,0.22), transparent)' }}
          animate={{ left: `${gx}%`, top: `${gy}%` }}
          transition={{ duration: 1.6, ease: EASE }}
        />

        <div className="shell relative grid grid-cols-12 items-center gap-x-8">
          {/* Number */}
          <div className="col-span-5">
            <p className="font-display text-[clamp(10rem,22vw,22rem)] font-medium leading-none tracking-[-0.07em]">
              <span className="text-outline">0</span>
              <Odometer value={step + 1} />
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="font-mono text-label text-ash">/ 0{processSteps.length}</span>
              <span className="h-px w-10 bg-paper/20" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.duration}
                  className="font-mono text-label uppercase text-accent-bright"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  {current.duration}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Copy */}
          <div className="col-span-5 col-start-7 min-h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial="hidden" animate="show" exit="exit">
                <div className="overflow-hidden pb-[0.1em]">
                  <motion.h3
                    className="font-display text-[clamp(3rem,5.6vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.05em]"
                    variants={{
                      hidden: { y: '110%' },
                      show: { y: '0%', transition: { duration: 0.8, ease: EASE } },
                      exit: { y: '-110%', transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } },
                    }}
                  >
                    {current.title}
                  </motion.h3>
                </div>
                <motion.p
                  className="mt-6 max-w-[44ch] text-lead text-smoke"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1, ease: EASE } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
                  }}
                >
                  {current.body}
                </motion.p>
                <motion.ul
                  className="mt-8 flex flex-wrap gap-2"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
                    exit: { opacity: 0, transition: { duration: 0.25 } },
                  }}
                >
                  {current.outputs.map((output) => (
                    <motion.li
                      key={output}
                      className="flex items-center gap-2 rounded-pill border border-paper/10 bg-paper/[0.03] px-4 py-2 text-[0.8125rem] text-paper"
                      variants={{
                        hidden: { opacity: 0, y: 12, scale: 0.96 },
                        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
                      }}
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {output}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Rail */}
          <div className="col-span-1 col-start-12 flex justify-end">
            <div className="relative flex h-[50vh] flex-col justify-between">
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-hair" />
              <motion.span
                className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-accent shadow-[0_0_10px_#0A84FF]"
                style={{ scaleY: fill }}
              />
              {processSteps.map((item, index) => (
                <span key={item.id} className="relative flex items-center">
                  <span
                    className={cn(
                      'relative z-10 h-2.5 w-2.5 rounded-full border transition-all duration-500',
                      index <= step ? 'border-accent bg-accent shadow-[0_0_12px_#0A84FF]' : 'border-paper/25 bg-void',
                    )}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stacked() {
  return (
    <div className="shell mt-14">
      <div className="border-t border-hair">
        {processSteps.map((step) => (
          <Reveal key={step.id}>
            <div className="grid grid-cols-12 gap-y-4 border-b border-hair py-10">
              <p className="col-span-3 font-display text-[3.5rem] font-medium leading-none tracking-[-0.06em] text-outline sm:col-span-2">
                {step.number}
              </p>
              <div className="col-span-9 sm:col-span-10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-[1.875rem] font-medium tracking-[-0.04em]">{step.title}</h3>
                  <span className="font-mono text-label uppercase text-accent-bright">{step.duration}</span>
                </div>
                <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-[1.6] text-smoke">{step.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {step.outputs.map((output) => (
                    <li key={output} className="rounded-pill border border-hair px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-smoke">
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
