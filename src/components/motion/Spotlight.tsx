'use client';

import { ReactNode, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  /** Colour of the soft fill that follows the pointer. */
  glow?: string;
  /** Radius of the fill, in px. */
  size?: number;
};

/**
 * A surface lit from wherever the pointer is: a soft wash inside, and a
 * brighter arc along the border nearest the cursor. Pointer position is
 * written to CSS variables directly — no React re-render per mouse move.
 */
export function Spotlight({ children, className, glow = 'rgba(10,132,255,0.16)', size = 420 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== 'mouse') return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <div ref={ref} onPointerMove={onMove} className={cn('group/spot relative', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${glow}, transparent 62%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background: `radial-gradient(${Math.round(size * 0.6)}px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(var(--c-fg) / 0.45), rgba(10,132,255,0.35) 30%, transparent 62%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
        }}
      />
      {children}
    </div>
  );
}
