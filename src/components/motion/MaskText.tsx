'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
} as const;

type Props = {
  /** One entry per visual line. Lines may contain styled spans. */
  lines: ReactNode[];
  as?: keyof typeof tags;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /**
   * Leave undefined to reveal when scrolled into view; pass a boolean to drive
   * it externally (heroes wait for the intro or route curtain).
   */
  active?: boolean;
};

const line: Variants = {
  hidden: { y: '112%', rotate: 2.5 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Headline reveal: each line rises out of its own clipping box. Lines are
 * authored explicitly (rather than split automatically) so every break is a
 * typographic decision, and each line is short enough never to re-wrap.
 */
export function MaskText({
  lines,
  as = 'h2',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  active,
}: Props) {
  const reduced = useReducedMotion();
  const Tag = tags[as];

  const trigger =
    active === undefined
      ? { whileInView: 'show', viewport: { once: true, margin: '-8% 0px -8% 0px' } }
      : { animate: active ? 'show' : 'hidden' };

  return (
    <Tag
      className={className}
      initial={reduced ? 'show' : 'hidden'}
      {...(reduced ? { animate: 'show' } : trigger)}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((content, index) => (
        <span key={index} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span className={cn('block origin-bottom-left will-change-transform', lineClassName)} variants={line}>
            {content}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
