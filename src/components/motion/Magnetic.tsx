'use client';

import { ReactNode, useCallback, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  /** 0–1: how far the element follows the pointer relative to its own box. */
  strength?: number;
  /** Inner content lags slightly behind the wrapper for a layered feel. */
  innerStrength?: number;
};

export function Magnetic({ children, className, strength = 0.32, innerStrength = 0.16 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const config = { stiffness: 240, damping: 18, mass: 0.4 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  const six = useSpring(innerX, config);
  const siy = useSpring(innerY, config);

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || event.pointerType !== 'mouse') return;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      x.set(dx * strength);
      y.set(dy * strength);
      innerX.set(dx * innerStrength);
      innerY.set(dy * innerStrength);
    },
    [reduced, strength, innerStrength, x, y, innerX, innerY],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  }, [x, y, innerX, innerY]);

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={reduced ? undefined : { x: sx, y: sy }}
    >
      <motion.div className="inline-flex w-full" style={reduced ? undefined : { x: six, y: siy }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
