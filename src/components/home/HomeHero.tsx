'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { KineticWord } from '@/components/motion/KineticWord';
import { Button } from '@/components/ui/Button';
import { LightField } from '@/components/visual/LightField';
import { useStageReady } from '@/lib/stage';

const WORDS = ['websites', 'software', 'AI systems', 'CRMs', 'brands', 'platforms'];
const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useStageReady();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Lines drift apart as the hero scrolls away — the headline "opens".
  const line1X = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const line2X = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const line3X = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  const line = (delay: number) => ({
    initial: { y: '110%', rotate: 3 },
    animate: ready ? { y: '0%', rotate: 0 } : { y: '110%', rotate: 3 },
    transition: { duration: 1.25, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-void"
    >
      {/* Living light field */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: fieldScale, opacity: fieldOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        <LightField intensity={0.82} focus={[0.8, 0.66]} />
      </motion.div>
      <div aria-hidden className="grid-lines mask-radial pointer-events-none absolute inset-0 opacity-40" />
      {/* Settles the bottom edge into the next section. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />

      <motion.div
        className="shell relative z-10 flex flex-1 flex-col pb-10 pt-[calc(var(--nav-h)+1.5rem)]"
        style={reduced ? undefined : { opacity: copyOpacity }}
      >
        {/* Meta row */}
        <motion.div className="flex flex-wrap items-center justify-between gap-4" {...rise(0.1)}>
          <p className="eyebrow flex items-center gap-3 text-smoke">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Taking on new projects
          </p>
          <p className="eyebrow hidden sm:block">Creative &amp; Technology Agency</p>
        </motion.div>

        {/* Headline — anchored low, editorial. */}
        <div className="mt-auto pt-16">
          <h1 className="font-display text-[clamp(2.75rem,7.4vw,7.75rem)] font-medium leading-[0.94] tracking-[-0.05em]">
            <motion.span className="block" style={reduced ? undefined : { x: line1X }}>
              <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span className="block origin-bottom-left" {...line(0.15)}>
                  We build{' '}
                  <KineticWord
                    words={WORDS}
                    active={ready}
                    className="accent-serif pr-[0.04em] text-paper"
                  />
                </motion.span>
              </span>
            </motion.span>
            <motion.span className="block" style={reduced ? undefined : { x: line2X }}>
              <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span className="block origin-bottom-left text-chrome" {...line(0.27)}>
                  that move businesses
                </motion.span>
              </span>
            </motion.span>
            <motion.span className="block" style={reduced ? undefined : { x: line3X }}>
              <span className="flex items-center gap-[0.25em] overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span className="block shrink-0 origin-bottom-left" {...line(0.39)}>
                  forward<span className="text-accent">.</span>
                </motion.span>
                {/* The line that keeps going. */}
                <motion.span
                  aria-hidden
                  className="relative hidden h-[2px] flex-1 origin-left self-center bg-gradient-to-r from-paper/70 via-paper/20 to-transparent sm:block"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: ready ? 1 : 0 }}
                  transition={{ duration: 1.8, delay: 0.9, ease: EASE }}
                >
                  {!reduced && (
                    <motion.span
                      className="absolute -top-[3px] h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_4px_rgba(10,132,255,0.8)]"
                      animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
                    />
                  )}
                </motion.span>
              </span>
            </motion.span>
          </h1>

          {/* Supporting row */}
          <div className="mt-12 grid grid-cols-12 items-end gap-y-8 border-t border-hair pt-8">
            <motion.p
              className="col-span-12 max-w-[46ch] text-lead text-smoke md:col-span-6 lg:col-span-5"
              {...rise(0.75)}
            >
              A creative and technology studio. We design and engineer websites, custom software and AI
              systems for ambitious businesses — one team, from first sketch to final deploy.
            </motion.p>

            <motion.div
              className="col-span-12 flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-5 lg:col-start-8"
              {...rise(0.85)}
            >
              <Button as={Link} href="/contact">
                Start a project
              </Button>
              <Button as="a" href="#work" variant="ghost" icon={null}>
                See the work
              </Button>
            </motion.div>

            <motion.a
              href="#manifesto"
              aria-label="Scroll to explore"
              className="col-span-2 col-start-11 hidden items-center justify-end gap-3 lg:col-span-1 lg:col-start-12 lg:flex"
              {...rise(1)}
            >
              <span className="relative block h-12 w-[22px] rounded-pill border border-paper/25">
                <motion.span
                  className="absolute left-1/2 top-2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-paper"
                  animate={reduced ? undefined : { y: [0, 16, 0], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
