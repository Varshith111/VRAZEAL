'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Chrome shared by every About section: a hairline that draws itself in, then
 * the numbered label beneath it. Repeating this exact rule is what makes nine
 * very different layouts read as one document.
 */
export function SectionRule({ index, label, dark }: { index: string; label: string; dark?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <>
      <motion.div
        aria-hidden
        className={cn('h-px w-full origin-left', dark ? 'bg-paper/15' : 'bg-page-line')}
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />
      <p
        className={cn(
          'pt-5 font-mono text-label uppercase tracking-[0.16em]',
          dark ? 'text-paper/40' : 'text-page-muted',
        )}
      >
        <span className={cn('mr-3', dark ? 'text-paper' : 'text-page-ink')}>{index}</span>
        {label}
      </p>
    </>
  );
}

/**
 * Line-by-line mask reveal for display headings.
 *
 * Each line is clipped by its own overflow box and rises into place. Splitting
 * on explicit lines rather than words keeps the editorial line breaks the
 * layout was composed around, and keeps the animation cost to one transform
 * per line instead of one per character.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = 'h2',
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className={cn('block', lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={lines.join(' ')}>
      {lines.map((line, index) => (
        <span key={line} aria-hidden className="block overflow-hidden py-[0.06em]">
          <motion.span
            className={cn('block will-change-transform', lineClassName)}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, delay: delay + index * 0.08, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Section shell: consistent vertical rhythm and background handling. */
export function AboutSection({
  id,
  index,
  label,
  children,
  tone = 'paper',
  className,
}: {
  id?: string;
  index: string;
  label: string;
  children: ReactNode;
  tone?: 'paper' | 'surface' | 'ink';
  className?: string;
}) {
  const dark = tone === 'ink';

  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 py-section',
        tone === 'paper' && 'bg-paper',
        tone === 'surface' && 'bg-surface',
        dark && 'bg-ink text-paper',
        className,
      )}
    >
      <div className="shell">
        <SectionRule index={index} label={label} dark={dark} />
        {children}
      </div>
    </section>
  );
}
