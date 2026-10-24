'use client';

import Link from 'next/link';
import { ReactNode, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Magnetic } from '@/components/motion/Magnetic';
import { MaskText } from '@/components/motion/MaskText';
import { LightField } from '@/components/visual/LightField';
import { site } from '@/lib/site';

type Props = {
  title?: ReactNode[];
  eyebrow?: string;
};

const DEFAULT_TITLE: ReactNode[] = [
  "Let's build",
  <>
    something <span className="accent-serif">people</span>
  </>,
  <>
    remember<span className="text-accent">.</span>
  </>,
];

/** Circular call-to-action: a slowly turning ring of text around an arrow. */
export function OrbitButton({ href = '/contact', label = 'Start a project' }: { href?: string; label?: string }) {
  const reduced = useReducedMotion();
  const pathId = `orbit-${useId().replace(/:/g, '')}`;
  const ring = `${label} · ${label} · `.toUpperCase();

  return (
    <Magnetic strength={0.4} innerStrength={0.2} className="rounded-full">
      <Link
        href={href}
        aria-label={label}
        className="group relative flex h-44 w-44 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.03] backdrop-blur-sm transition-[background-color,border-color,transform] duration-700 ease-expo hover:scale-105 hover:border-accent hover:bg-accent hover:text-white sm:h-52 sm:w-52"
      >
        <motion.svg
          viewBox="0 0 200 200"
          aria-hidden
          className="absolute inset-0 h-full w-full"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          <defs>
            <path id={pathId} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text className="fill-paper font-mono text-[11.5px] tracking-[0.46em] transition-colors duration-700 group-hover:fill-white">
            <textPath href={`#${pathId}`}>{ring}</textPath>
          </text>
        </motion.svg>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-700 ease-expo group-hover:scale-110">
          <svg viewBox="0 0 16 16" className="h-5 w-5 -rotate-45 transition-transform duration-700 ease-expo group-hover:rotate-0" aria-hidden>
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </Magnetic>
  );
}

/**
 * The closing section on every page: light rising from below, the biggest
 * type on the site, and a single unmistakable action.
 */
export function ClosingCta({ title = DEFAULT_TITLE, eyebrow = 'Start a project' }: Props) {
  return (
    <section id="contact" className="relative flex min-h-[100svh] scroll-mt-10 flex-col overflow-hidden bg-void">
      <div className="absolute inset-0">
        <LightField intensity={0.8} focus={[0.5, 0.08]} quality={0.45} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-void to-transparent" />
      <div aria-hidden className="grid-lines mask-radial pointer-events-none absolute inset-0 opacity-30" />

      <div className="shell relative flex flex-1 flex-col justify-center py-section">
        <p className="eyebrow flex items-center gap-3 text-smoke">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {eyebrow}
        </p>

        <div className="mt-10 grid grid-cols-12 items-end gap-y-12">
          <MaskText
            as="h2"
            lines={title}
            className="col-span-12 font-display text-[clamp(3rem,9.5vw,10rem)] font-medium leading-[0.9] tracking-[-0.055em] lg:col-span-9"
          />
          <div className="col-span-12 flex lg:col-span-3 lg:justify-end">
            <OrbitButton />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-y-6 border-t border-paper/10 pt-8 lg:mt-24">
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow">Write to us</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-3 inline-block font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.035em]"
            >
              {site.email}
            </a>
          </div>
          <div className="col-span-12 md:col-span-6 md:text-right">
            <p className="eyebrow">Response time</p>
            <p className="mt-3 text-[1rem] text-smoke">Usually within 24 hours — from an engineer, not a sales sequence.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
