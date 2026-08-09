'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { aboutServices } from '@/lib/about';
import { ease, LineReveal } from './shared';

/**
 * The page's opening statement.
 *
 * Composition rather than a headline on an empty field: the type sits on a
 * masked technical grid, an oversized outlined wordmark is cropped by the
 * bottom edge, and a numbered discipline index anchors the right column. The
 * wordmark drifts on scroll — a single slow transform, not parallax layers.
 */
export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const markX = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fade = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden bg-surface pb-10 pt-[calc(var(--nav-h)+4.5rem)] lg:min-h-screen lg:pb-14"
    >
      {/* Technical grid, faded out so it never boxes the type in. */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          WebkitMaskImage:
            'radial-gradient(110% 80% at 25% 25%, #000 10%, rgba(0,0,0,0.3) 55%, transparent 80%)',
          maskImage:
            'radial-gradient(110% 80% at 25% 25%, #000 10%, rgba(0,0,0,0.3) 55%, transparent 80%)',
        }}
      />

      <motion.div className="shell relative flex-1" style={reduced ? undefined : { y: copyY }}>
        <motion.p
          className="font-mono text-label uppercase tracking-[0.16em] text-page-muted"
          {...fade(0.05)}
        >
          About VRAZEAL
        </motion.p>

        <div className="mt-10 grid grid-cols-12 gap-y-12 lg:mt-14 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-9">
            <LineReveal
              as="h1"
              delay={0.12}
              className="text-[clamp(2.25rem,5.4vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.042em] text-page-ink"
              lines={[
                'We build the systems,',
                'experiences, and brands that',
                'move businesses forward.',
              ]}
            />

            <motion.p
              className="mt-8 max-w-[54ch] text-lead leading-[1.6] text-page-muted lg:mt-10"
              {...fade(0.55)}
            >
              VRAZEAL is a technology and creative agency helping ambitious businesses build better
              digital products, smarter systems, and stronger brands.
            </motion.p>
          </div>

          {/* Discipline index — the right column earns its space instead of
              sitting empty. */}
          <motion.div
            className="col-span-12 self-end lg:col-span-3 lg:pl-6"
            {...fade(0.7)}
            aria-hidden
          >
            <div className="h-px w-full bg-page-line lg:mb-6" />
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 lg:mt-0 lg:grid-cols-1 lg:gap-y-3.5">
              {aboutServices.map((service) => (
                <li
                  key={service.number}
                  className="flex items-baseline gap-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-page-muted"
                >
                  <span className="text-page-ink/30">{service.number}</span>
                  <span className="truncate">{service.title}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Oversized outlined wordmark, cropped by the section edge. */}
      <motion.div
        aria-hidden
        className="pointer-events-none relative w-full select-none overflow-hidden"
        style={reduced ? undefined : { x: markX }}
      >
        <motion.span
          className="block whitespace-nowrap pl-gutter font-display text-[26vw] font-medium leading-[0.78] tracking-[-0.055em] text-transparent [-webkit-text-stroke:1px_rgba(8,8,8,0.13)]"
          initial={reduced ? undefined : { opacity: 0, y: '18%' }}
          animate={{ opacity: 1, y: '0%' }}
          transition={{ duration: 1.6, delay: 0.35, ease }}
        >
          VRAZEAL
        </motion.span>
      </motion.div>
    </section>
  );
}
