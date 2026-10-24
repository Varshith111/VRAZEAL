'use client';

import { ReactNode, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

type Props = {
  children: ReactNode;
  /** Percent of one copy per second. Negative runs right-to-left reversed. */
  baseVelocity?: number;
  className?: string;
  /** Lean the row into the scroll direction. */
  skew?: boolean;
};

/**
 * An endless row that drifts on its own, speeds up with scroll velocity and
 * flips direction when the reader reverses. Four copies of the content are
 * laid end to end and the track wraps at one copy's width, so there is never
 * a seam. Idle (and costs nothing) while off-screen.
 */
export function VelocityMarquee({ children, baseVelocity = 2, className, skew = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '20% 0px 20% 0px' });
  const reduced = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smooth, [-2500, 0, 2500], [7, 0, -7]);
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView || reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX: skew && !reduced ? skewX : 0 }}>
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
