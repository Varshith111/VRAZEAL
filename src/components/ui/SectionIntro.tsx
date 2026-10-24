'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MaskText } from '@/components/motion/MaskText';
import { cn } from '@/lib/utils';

type Props = {
  index: string;
  label: string;
  title: ReactNode[];
  aside?: ReactNode;
  className?: string;
  /** For the rare light chapter. */
  tone?: 'dark' | 'light';
  titleClassName?: string;
};

/**
 * The consistent opening of every section: an index rule that draws itself
 * in, the section's number and name, the headline, and an optional aside.
 * The shared chrome is what lets very different layouts underneath read as
 * one document.
 */
export function SectionIntro({ index, label, title, aside, className, tone = 'dark', titleClassName }: Props) {
  const reduced = useReducedMotion();
  const light = tone === 'light';

  return (
    <div className={cn('grid grid-cols-12 gap-y-10', className)}>
      <div className="col-span-12 flex items-center gap-4">
        <span className={cn('font-mono text-label', light ? 'text-ink' : 'text-paper')}>{index}</span>
        <motion.span
          aria-hidden
          className={cn('h-px w-14 origin-left', light ? 'bg-ink/30' : 'bg-paper/25')}
          initial={reduced ? undefined : { scaleX: 0 }}
          whileInView={reduced ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className={cn('font-mono text-label uppercase', light ? 'text-muted' : 'text-ash')}>{label}</span>
      </div>

      <MaskText
        lines={title}
        className={cn(
          'col-span-12 text-h2 font-medium',
          aside ? 'lg:col-span-7' : 'lg:col-span-10',
          light ? 'text-ink' : 'text-paper',
          titleClassName,
        )}
      />

      {aside && (
        <motion.div
          className={cn(
            'col-span-12 max-w-[44ch] self-end text-lead lg:col-span-4 lg:col-start-9',
            light ? 'text-muted' : 'text-smoke',
          )}
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {aside}
        </motion.div>
      )}
    </div>
  );
}
