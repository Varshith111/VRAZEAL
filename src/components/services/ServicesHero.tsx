'use client';

import { useState, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ease, LineReveal } from '@/components/about/shared';

export function ServicesHero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const fade = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden bg-surface pt-[calc(var(--nav-h)+3rem)] pb-12 lg:min-h-screen lg:pb-16"
    >
      {/* Background Architectural Grid Lines */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-12 opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-page-line/60 h-full w-full" />
        ))}
      </div>

      {/* Interactive Geometric System Matrix */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30">
        <div 
          className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full border border-page-ink/15 transition-transform duration-700 ease-out lg:h-[700px] lg:w-[700px]"
          style={{
            transform: `translate3d(${(mousePos.x - 0.5) * 45}px, ${(mousePos.y - 0.5) * 45}px, 0)`,
          }}
        >
          <div className="absolute inset-16 rounded-full border border-dashed border-page-ink/20" />
          <div className="absolute inset-36 rounded-full border border-page-ink/10" />
        </div>
      </div>

      <motion.div 
        className="shell relative z-10 flex flex-1 flex-col justify-between"
        style={reduced ? undefined : { y: heroY, opacity }}
      >
        {/* Eyebrow Label */}
        <motion.div className="flex items-center gap-3" {...fade(0.05)}>
          <span className="h-2 w-2 rounded-full bg-page-ink" />
          <span className="font-mono text-label uppercase tracking-[0.2em] text-page-muted">
            VRAZEAL · WHAT WE DO
          </span>
        </motion.div>

        {/* Oversized Headline */}
        <div className="my-auto py-12">
          <LineReveal
            as="h1"
            delay={0.15}
            className="text-[clamp(2.75rem,7.5vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em] text-page-ink"
            lines={[
              'WE BUILD WHAT',
              'BUSINESSES NEED',
              'TO MOVE FORWARD.',
            ]}
          />

          <div className="mt-12 grid grid-cols-12 gap-y-6 lg:mt-16 lg:gap-x-12">
            <motion.div className="col-span-12 lg:col-span-6 lg:col-start-7" {...fade(0.55)}>
              <p className="text-lead leading-[1.6] text-page-muted">
                From digital experiences and custom software to AI, automation, branding and growth — we combine technology and creativity to solve real business problems.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Editorial Grid Anchor */}
        <motion.div 
          className="grid grid-cols-12 gap-y-4 border-t border-page-line pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-page-muted lg:items-center"
          {...fade(0.7)}
        >
          <div className="col-span-6 md:col-span-3">
            <span className="text-page-ink font-semibold">05</span> Disciplines
          </div>
          <div className="col-span-6 md:col-span-3">
            Production Engineering
          </div>
          <div className="col-span-12 md:col-span-6 md:text-right">
            Custom Architecture · Zero Templates
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
