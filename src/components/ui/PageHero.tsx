'use client';

import { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MaskText } from '@/components/motion/MaskText';
import { LightField } from '@/components/visual/LightField';
import { useStageReady } from '@/lib/stage';
import { cn } from '@/lib/utils';

type Meta = { label: string; value: ReactNode };

type Props = {
  /** Page name shown in the index rule, e.g. "Services". */
  label: string;
  title: ReactNode[];
  subtitle?: ReactNode;
  meta?: Meta[];
  /** Where the light pools (0–1, y up). */
  focus?: [number, number];
  className?: string;
  children?: ReactNode;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Opening screen for every inner page: the same living light as the home
 * hero (quieter), an index rule, a masked headline and a meta row. It holds
 * its entrance until the route curtain has lifted.
 */
export function PageHero({ label, title, subtitle, meta, focus = [0.82, 0.78], className, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const ready = useStageReady();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      className={cn('relative flex min-h-[88svh] flex-col overflow-hidden bg-void lg:min-h-[92svh]', className)}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <LightField intensity={0.62} focus={focus} quality={0.45} />
      </motion.div>
      <div aria-hidden className="grid-lines mask-radial pointer-events-none absolute inset-0 opacity-35" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void to-transparent" />

      <motion.div
        className="shell relative z-10 flex flex-1 flex-col pb-14 pt-[calc(var(--nav-h)+2rem)]"
        style={reduced ? undefined : { y, opacity }}
      >
        <motion.p className="eyebrow flex items-center gap-3" {...rise(0.05)}>
          <span className="text-paper">VRAZEAL</span>
          <span className="h-px w-8 bg-paper/25" />
          {label}
        </motion.p>

        <div className="mt-auto pt-20">
          <MaskText
            as="h1"
            lines={title}
            active={ready}
            delay={0.12}
            className="max-w-[16ch] font-display text-[clamp(2.75rem,7.6vw,8rem)] font-medium leading-[0.92] tracking-[-0.052em]"
          />

          <div className="mt-12 grid grid-cols-12 items-end gap-y-8 border-t border-hair pt-8">
            {subtitle && (
              <motion.div className="col-span-12 max-w-[48ch] text-lead text-smoke md:col-span-7 lg:col-span-6" {...rise(0.55)}>
                {subtitle}
              </motion.div>
            )}
            {meta && (
              <motion.dl
                className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8"
                {...rise(0.65)}
              >
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="eyebrow">{item.label}</dt>
                    <dd className="mt-2 text-[0.9375rem] text-paper">{item.value}</dd>
                  </div>
                ))}
              </motion.dl>
            )}
            {children}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
