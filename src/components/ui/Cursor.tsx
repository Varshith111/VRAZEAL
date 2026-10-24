'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

type Mode = 'default' | 'link' | 'label' | 'hidden';

/**
 * Custom pointer for fine-pointer, full-motion devices only.
 *
 * - default: a dot with a lagging ring
 * - link:    the ring swells into an inverting lens (mix-blend: difference)
 * - label:   a solid accent disc carrying a word, e.g. "View" or "Drag"
 *            (opt in with data-cursor-label="View" on any element)
 * - hidden:  over text inputs, where the native caret takes over
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const visibleRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.5 });

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
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) {
        setMode('hidden');
        setLabel(null);
        return;
      }
      const labelled = target?.closest?.('[data-cursor-label]') as HTMLElement | null;
      if (labelled) {
        setMode('label');
        setLabel(labelled.dataset.cursorLabel ?? null);
        return;
      }
      const interactive = target?.closest?.('a, button, [role="button"], [data-cursor], label');
      setMode(interactive ? 'link' : 'default');
      setLabel(null);
    };

    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === 'label' ? 92 : mode === 'link' ? 64 : 34;

  const spring = { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 } as const;
  const centred = { translateX: '-50%', translateY: '-50%' } as const;

  return (
    <>
      {/*
       * Inverting layer. The blend mode sits on the fixed layer itself: a
       * fixed element starts its own stacking context, so blending a child
       * inside it would only blend against this empty layer, not the page.
       * Here white "differences" against whatever is underneath — near-black
       * on the light theme, white on the dark one, an inverted lens over text.
       */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]" style={{ mixBlendMode: 'difference' }}>
        <motion.div
          className="absolute left-0 top-0 rounded-full border border-solid"
          style={{ x: ringX, y: ringY, ...centred }}
          animate={{
            width: size,
            height: size,
            opacity: visible && (mode === 'default' || mode === 'link') ? 1 : 0,
            scale: pressed ? 0.82 : 1,
            backgroundColor: mode === 'link' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
            borderColor: mode === 'default' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0)',
          }}
          transition={spring}
        />

        {/* Precise dot — always where the pointer actually is. */}
        <motion.div
          className="absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-white"
          style={{ x, y, ...centred }}
          animate={{ opacity: visible && mode === 'default' ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Label disc — solid brand blue, so it lives outside the blend. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
        <motion.div
          className="absolute left-0 top-0 flex items-center justify-center rounded-full bg-accent shadow-[0_10px_40px_-10px_rgba(10,132,255,0.8)]"
          style={{ x: ringX, y: ringY, ...centred }}
          initial={false}
          animate={{
            width: size,
            height: size,
            opacity: visible && mode === 'label' ? 1 : 0,
            scale: mode === 'label' ? (pressed ? 0.82 : 1) : 0.4,
          }}
          transition={spring}
        >
          <AnimatePresence>
            {mode === 'label' && label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
