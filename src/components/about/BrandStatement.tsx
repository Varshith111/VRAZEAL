'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function BrandStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.85, 1.15, 0.95]);
  const letterSpacing = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ['-0.05em', '0.08em', '-0.02em']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0.3, 1, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-surface py-20 lg:min-h-[75vh]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-12 opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-page-line h-full w-full" />
        ))}
      </div>

      <div className="shell relative z-10 text-center">
        <span className="font-mono text-label uppercase tracking-[0.2em] text-page-muted">
          Brand Architecture
        </span>

        <motion.div
          className="my-8 overflow-hidden select-none"
          style={reduced ? undefined : { opacity }}
        >
          <motion.h2
            className="whitespace-nowrap font-display text-[clamp(4rem,18vw,16rem)] font-bold uppercase leading-none text-page-ink"
            style={reduced ? undefined : { scale, letterSpacing }}
          >
            VRAZEAL
          </motion.h2>
        </motion.div>

        <p className="mx-auto max-w-[50ch] font-mono text-xs uppercase tracking-widest text-page-muted">
          Designed for longevity. Built for performance. Scaled for growth.
        </p>
      </div>
    </section>
  );
}
