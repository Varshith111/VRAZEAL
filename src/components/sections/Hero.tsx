'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { HeroVisual } from '@/components/three/HeroVisual';
import { Button } from '@/components/ui/Button';
import { useIntroReady } from '@/lib/useIntroReady';

const DISCIPLINES = ['Engineering', 'Design', 'AI', 'Brand', 'Creative'];

/**
 * Positioned around the sculpture rather than on top of it — the object floats
 * near the centre, so the labels hug the corners of its bounding box.
 */
const HERO_LABELS = [
  { text: 'Next.js', x: 12, y: 24, drift: -7 },
  { text: 'TypeScript', x: 61, y: 10, drift: 6 },
  { text: 'AI systems', x: 68, y: 64, drift: -6 },
  { text: 'PostgreSQL', x: 9, y: 72, drift: 7 },
] as const;

function FloatingLabel({
  text,
  x,
  y,
  drift,
  index,
  ready,
  reduced,
}: {
  text: string;
  x: number;
  y: number;
  drift: number;
  index: number;
  ready: boolean;
  reduced: boolean;
}) {
  return (
    <motion.span
      className="absolute whitespace-nowrap rounded-pill border border-line bg-paper/70 px-3.5 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted backdrop-blur-md"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.9, delay: 0.85 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="block"
        animate={reduced ? undefined : { y: [0, drift, 0] }}
        transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

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
      {/* Engineering grid, faded out at the edges so it never boxes the type in. */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 -z-20 opacity-[0.55]"
        style={{
          WebkitMaskImage:
            'radial-gradient(120% 90% at 60% 30%, #000 12%, rgba(0,0,0,0.35) 52%, transparent 78%)',
          maskImage:
            'radial-gradient(120% 90% at 60% 30%, #000 12%, rgba(0,0,0,0.35) 52%, transparent 78%)',
        }}
      />

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

            {/* Broken by hand: each line is short enough never to re-wrap.
                The size is tuned below the global h1 token on purpose — at
                6.1vw the longest line runs under the sculpture on every desktop
                width, and the ring cuts through "forward." */}
            <h1 className="text-[clamp(2.5rem,5.4vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.042em]">
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
          <div className="col-span-12 h-[44vw] max-h-[380px] min-h-[240px] md:h-[46vh] lg:absolute lg:inset-y-0 lg:right-[-2%] lg:h-full lg:max-h-none lg:w-[46%] xl:right-0 xl:w-[48%]">
            <HeroVisual />

            {/* Technology labels orbiting the object. Desktop only: below lg the
                visual is a fraction of the size and they would crowd it. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
              {HERO_LABELS.map((label, index) => (
                <FloatingLabel key={label.text} {...label} index={index} ready={ready} reduced={Boolean(reduced)} />
              ))}
            </div>
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

          <a
            href="#trust"
            className="group -my-2 flex min-h-[44px] items-center gap-3 py-2"
            aria-label="Scroll to next section"
          >
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
