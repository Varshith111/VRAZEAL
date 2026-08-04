'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  index: string;
  label: string;
  /** Right-hand side of the index rule — usually a one-line summary. */
  meta?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
};

/**
 * Every section is indexed by a hairline rule that draws itself in on entry.
 * The consistent chrome is what makes the varied layouts below it read as
 * one document rather than a stack of templates.
 */
export function Section({ id, index, label, meta, children, className, dark }: SectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 py-section', dark ? 'bg-ink text-paper' : 'bg-paper', className)}
    >
      <div className="shell">
        <motion.div
          aria-hidden
          className={cn('h-px w-full origin-left', dark ? 'bg-paper/15' : 'bg-line')}
          initial={reduced ? undefined : { scaleX: 0 }}
          whileInView={reduced ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-5">
          <p className={cn('eyebrow', dark && 'text-paper/45')}>
            <span className={cn('mr-3', dark ? 'text-paper' : 'text-ink')}>{index}</span>
            {label}
          </p>
          {meta && <p className={cn('eyebrow max-w-xs text-right', dark && 'text-paper/45')}>{meta}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
