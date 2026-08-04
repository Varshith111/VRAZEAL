'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { HeroVisual } from '@/components/three/HeroVisual';
import { Button } from '@/components/ui/Button';
import { useIntroReady } from '@/lib/useIntroReady';

const DISCIPLINES = ['Engineering', 'Design', 'AI', 'Brand', 'Creative'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const washOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={ref}
      id="top"
      className="noise relative flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]"
    >
      {/* Ambient wash that recedes as the page scrolls away. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          opacity: reduced ? 1 : washOpacity,
          background:
            'radial-gradient(120% 78% at 78% 6%, rgba(10,132,255,0.07), rgba(255,255,255,0) 62%), radial-gradient(80% 60% at 8% 96%, rgba(0,0,0,0.045), rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="shell relative flex flex-1 flex-col justify-center pb-8 pt-10 lg:pb-16">
        <div className="grid grid-cols-12 items-center gap-y-10">
          <motion.div
            className="relative z-10 col-span-12 lg:col-span-8"
            style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
          >
            <motion.div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2" {...fade(0.05)}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <p className="eyebrow text-ink">Now booking Q4 2026</p>
              <span aria-hidden className="hidden h-3 w-px bg-line sm:block" />
              <p className="eyebrow hidden sm:block">Creative &amp; Technology Agency</p>
            </motion.div>

            {/* Broken by hand: each line is short enough never to re-wrap. */}
            <h1 className="text-h1 font-medium">
              <span className="block">
                <SplitText text="Building digital" active={ready} delay={0.15} />
              </span>
              <span className="block">
                <SplitText text="products that move" active={ready} delay={0.28} />
              </span>
              <span className="block">
                <SplitText text="businesses forward." active={ready} delay={0.41} />
              </span>
            </h1>

            <motion.p className="mt-7 max-w-[46ch] text-lead text-muted" {...fade(0.62)}>
              From custom software and AI-powered systems to premium digital experiences — we help
              ambitious businesses build the thing that actually moves the number.
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap items-center gap-3" {...fade(0.72)}>
              <Button as="a" href="#contact" data-cursor="link">
                Start a project
              </Button>
              <Button as="a" href="#work" variant="outline" data-cursor="link">
                View our work
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual sits in flow on small screens and overlaps the grid above lg. */}
          <div className="col-span-12 h-[44vw] max-h-[380px] min-h-[240px] md:h-[46vh] lg:absolute lg:inset-y-0 lg:right-[-4%] lg:h-full lg:max-h-none lg:w-[52%] xl:right-0 xl:w-[48%]">
            <HeroVisual />
          </div>
        </div>
      </div>

      <motion.div className="shell relative z-10 pb-8" {...fade(0.9)}>
        <div className="hairline" />
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-5">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {DISCIPLINES.map((item) => (
              <li key={item} className="eyebrow text-muted">
                {item}
              </li>
            ))}
          </ul>

          <a href="#trust" className="group flex items-center gap-3" aria-label="Scroll to next section">
            <span className="eyebrow transition-colors group-hover:text-ink">Scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-line">
              <motion.span
                className="absolute inset-x-0 top-0 block h-3 bg-ink"
                animate={reduced ? undefined : { y: ['-100%', '270%'] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
