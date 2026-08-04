'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { INTRO_EVENT, INTRO_KEY } from '@/lib/useIntroReady';

const WORDS = ['Engineering', 'Design', 'Intelligence', 'VRAZEAL'];

/**
 * First-visit curtain. Counts to 100 while cycling the three disciplines,
 * then lifts to reveal the hero. Session-scoped so internal navigation and
 * refreshes during a session never repeat it.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem(INTRO_KEY) === 'seen') return;

    setActive(true);
    document.documentElement.style.overflow = 'hidden';

    const started = performance.now();
    const DURATION = 1750;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // Ease-out so the count decelerates into 100 instead of stopping dead.
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      setWord(Math.min(WORDS.length - 1, Math.floor(eased * WORDS.length)));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(INTRO_KEY, 'seen');
        window.setTimeout(() => {
          document.documentElement.style.overflow = '';
          setActive(false);
          // The hero starts its entrance as the curtain lifts, not after.
          window.dispatchEvent(new CustomEvent(INTRO_EVENT));
        }, 320);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.overflow = '';
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-paper px-gutter py-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Vrazeal</span>
            <span className="eyebrow">Creative &amp; Technology</span>
          </div>

          <div className="flex items-end justify-between gap-8">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={WORDS[word]}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-110%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-h2 font-medium"
                >
                  {WORDS[word]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <span className="font-display text-h2 font-medium tabular-nums leading-none">{progress}</span>
          </div>

          <div className="relative h-px w-full bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 bg-ink"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
