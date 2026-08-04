'use client';

import { ReactNode, useCallback, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card's corners. */
  max?: number;
  /** Renders a cursor-tracking accent glow behind the content. */
  glow?: boolean;
};

/**
 * Pointer-driven 3D tilt with an accent glow that tracks the cursor.
 * Rotation is applied on a spring so the card settles rather than snapping.
 */
export function TiltCard({ children, className, max = 6, glow = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const opacity = useMotionValue(0);

  const spring = { stiffness: 200, damping: 22, mass: 0.5 };
  const rotateX = useSpring(rx, spring);
  const rotateY = useSpring(ry, spring);
  const glowOpacity = useSpring(opacity, { stiffness: 120, damping: 24 });
  const glowBackground = useMotionTemplate`radial-gradient(340px circle at ${px}% ${py}%, rgba(10,132,255,0.13), transparent 70%)`;

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || event.pointerType !== 'mouse') return;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = (event.clientY - rect.top) / rect.height;
      rx.set((0.5 - ny) * max * 2);
      ry.set((nx - 0.5) * max * 2);
      px.set(nx * 100);
      py.set(ny * 100);
      opacity.set(1);
    },
    [reduced, max, rx, ry, px, py, opacity],
  );

  const reset = useCallback(() => {
    rx.set(0);
    ry.set(0);
    opacity.set(0);
  }, [rx, ry, opacity]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={
        reduced
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }
      }
      className={cn('relative', className)}
    >
      {glow && !reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{ background: glowBackground, opacity: glowOpacity }}
        />
      )}
      {children}
    </motion.div>
  );
}
