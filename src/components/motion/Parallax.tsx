'use client';

import { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  /** Positive drifts down as you scroll, negative drifts up. */
  speed?: number;
};

/** Transform-only parallax — never touches layout, so it stays on the compositor. */
export function Parallax({ children, className, speed = 60 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.35 });

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={reduced ? undefined : { y }} className="gpu">
        {children}
      </motion.div>
    </div>
  );
}
