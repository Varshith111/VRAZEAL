'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  text: string;
  className?: string;
  /** `char` for headlines, `word` for longer supporting copy. */
  granularity?: 'char' | 'word';
  delay?: number;
  stagger?: number;
  once?: boolean;
  /**
   * Leave undefined to reveal on scroll. Pass a boolean to drive the reveal
   * externally instead — the hero uses it to wait for the intro curtain.
   */
  active?: boolean;
};

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const piece: Variants = {
  hidden: { y: '105%' },
  show: {
    y: '0%',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Mask reveal for headings: the string is split into words (so wrapping still
 * works) and each word is clipped by its own overflow-hidden box.
 *
 * Renders an inline-block span — wrap it in the heading element you need, e.g.
 * `<h2 className="text-h2"><SplitText text="..." /></h2>`. The full string
 * stays available to assistive tech via aria-label.
 */
export function SplitText({
  text,
  className,
  granularity = 'char',
  delay = 0,
  stagger = 0.016,
  once = true,
  active,
}: Props) {
  const reduced = useReducedMotion();
  const words = useMemo(() => text.split(' '), [text]);
  const variants = useMemo(() => container(stagger, delay), [stagger, delay]);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn('inline-block', className)}
      aria-label={text}
      initial="hidden"
      {...(active === undefined
        ? { whileInView: 'show', viewport: { once, margin: '0px 0px 15% 0px' } }
        : { animate: active ? 'show' : 'hidden' })}
      variants={variants}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          <span className="inline-block overflow-hidden py-[0.08em] align-bottom">
            {granularity === 'char' ? (
              Array.from(word).map((char, charIndex) => (
                <motion.span
                  key={`${char}-${charIndex}`}
                  className="inline-block will-change-transform"
                  variants={piece}
                  aria-hidden
                >
                  {char}
                </motion.span>
              ))
            ) : (
              <motion.span className="inline-block will-change-transform" variants={piece} aria-hidden>
                {word}
              </motion.span>
            )}
          </span>
          {wordIndex < words.length - 1 && <span aria-hidden>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
