'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

type Mode = 'default' | 'link' | 'view' | 'drag';

const RING = 44;

/**
 * Custom pointer. Only mounts on devices with a fine pointer that have not
 * asked for reduced motion; touch and keyboard users keep the native cursor.
 *
 * Elements opt in via `data-cursor="link | view | drag"` and can override the
 * label with `data-cursor-label`.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.45 });
  const dotX = useSpring(x, { stiffness: 1100, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 50, mass: 0.2 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const marked = target?.closest?.('[data-cursor]') as HTMLElement | null;
      if (marked) {
        setMode((marked.dataset.cursor as Mode) ?? 'link');
        setLabel(marked.dataset.cursorLabel ?? null);
        return;
      }
      const interactive = target?.closest?.('a, button, input, textarea, select, [role="button"]');
      setMode(interactive ? 'link' : 'default');
      setLabel(null);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const ringScale = mode === 'view' || mode === 'drag' ? 1.85 : mode === 'link' ? 1.5 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-ink/25 mix-blend-difference"
        style={{
          width: RING,
          height: RING,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: mode === 'default' ? 'rgba(0,0,0,0.22)' : 'rgba(10,132,255,0.9)',
        }}
        animate={{
          scale: pressed ? ringScale * 0.86 : ringScale,
          opacity: visible ? 1 : 0,
          backgroundColor: mode === 'view' || mode === 'drag' ? 'rgba(10,132,255,1)' : 'rgba(10,132,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="absolute inset-0 flex items-center justify-center font-mono text-[0.4rem] uppercase tracking-[0.14em] text-paper"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-ink"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && mode === 'default' ? 1 : 0, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
