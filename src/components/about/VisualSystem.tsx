'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AboutSection } from './shared';

export function VisualSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const techX = useTransform(scrollYProgress, [0.1, 0.45], ['-40px', '0px']);
  const creativeX = useTransform(scrollYProgress, [0.15, 0.5], ['40px', '0px']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.95, 1]);

  return (
    <AboutSection index="02" label="The System" tone="surface">
      <div ref={containerRef} className="relative my-8 py-12 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <span className="font-mono text-label uppercase tracking-[0.2em] text-page-muted">
            The VRAZEAL Equation
          </span>

          <motion.div 
            className="mt-12 flex flex-col items-center justify-center space-y-4 font-display text-[clamp(2.5rem,6vw,6rem)] font-medium leading-none tracking-tight text-page-ink lg:mt-16 lg:space-y-6"
            style={reduced ? undefined : { opacity, scale }}
          >
            {/* Term 1 */}
            <motion.div 
              className="flex items-center gap-4"
              style={reduced ? undefined : { x: techX }}
            >
              <span className="text-page-ink">TECHNOLOGY</span>
              <span className="font-mono text-lead font-light text-page-muted">+</span>
            </motion.div>

            {/* Term 2 */}
            <motion.div 
              className="flex items-center gap-4"
              style={reduced ? undefined : { x: creativeX }}
            >
              <span className="text-page-ink">CREATIVITY</span>
              <span className="font-mono text-lead font-light text-page-muted">+</span>
            </motion.div>

            {/* Term 3 */}
            <div className="flex items-center gap-4">
              <span className="text-page-ink">STRATEGY</span>
              <span className="font-mono text-lead font-light text-page-muted">=</span>
            </div>

            {/* Result */}
            <motion.div 
              className="mt-6 inline-block rounded-2xl border border-page-ink/15 bg-paper px-8 py-4 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <span className="bg-gradient-to-r from-page-ink via-page-ink to-page-muted bg-clip-text text-[clamp(3rem,7vw,7rem)] font-bold tracking-tight text-transparent">
                VRAZEAL
              </span>
            </motion.div>
          </motion.div>

          <p className="mx-auto mt-10 max-w-[48ch] font-mono text-xs uppercase tracking-widest text-page-muted">
            Three pillars combined under one unified execution model.
          </p>
        </div>
      </div>
    </AboutSection>
  );
}
