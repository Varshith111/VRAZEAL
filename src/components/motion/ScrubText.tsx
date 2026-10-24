'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  /** Wrap a word in *asterisks* to set it in the italic serif accent. */
  text: string;
  className?: string;
  /** Opacity of words that have not been reached yet. */
  dim?: number;
};

/**
 * A paragraph that is read by scrolling: each word brightens from a dim
 * ghost to full white as the reader moves through it. The text is real text
 * the whole time — only opacity is animated.
 */
export function ScrubText({ text, className, dim = 0.14 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 82%', 'end 42%'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      {words.map((raw, index) => {
        const accent = raw.startsWith('*');
        const clean = raw.replace(/\*/g, '');
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${clean}-${index}`} progress={scrollYProgress} range={[start, end]} dim={reduced ? 1 : dim}>
            <span className={accent ? 'accent-serif text-accent-bright' : undefined}>{clean}</span>
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  const blur = useTransform(progress, range, [dim === 1 ? 0 : 3, 0]);
  const filter = useTransform(blur, (value) => (value > 0.05 ? `blur(${value}px)` : 'none'));
  return (
    <span className="mr-[0.24em] inline-block">
      <motion.span className="inline-block" style={{ opacity, filter }}>
        {children}
      </motion.span>
    </span>
  );
}
