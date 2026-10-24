'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INTRO_KEY, stage } from '@/lib/stage';

const DURATION = 1700;

/**
 * First-visit intro. The wordmark is drawn in left to right as the counter
 * runs to 100, then the curtain wipes upward to reveal the hero.
 * Session-scoped, and skipped entirely under reduced motion.
 */
export function Preloader() {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === 'seen';
    } catch {
      seen = false;
    }
    if (reduced || seen) {
      stage.setIntroDone();
      return;
    }

    setActive(true);
    document.documentElement.style.overflow = 'hidden';

    const started = performance.now();
    let frame = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // Two-stage ease: a quick run to ~70, then a deliberate settle into 100.
      const eased = t < 0.6 ? (t / 0.6) * 0.72 : 0.72 + (1 - Math.pow(1 - (t - 0.6) / 0.4, 3)) * 0.28;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      try {
        sessionStorage.setItem(INTRO_KEY, 'seen');
      } catch {
        /* private mode — the intro will simply replay */
      }
      exitTimer = window.setTimeout(() => {
        document.documentElement.style.overflow = '';
        setActive(false);
        stage.setIntroDone();
      }, 280);
    };
    frame = requestAnimationFrame(tick);

    // Never strand the page behind the intro.
    const safety = window.setTimeout(() => {
      document.documentElement.style.overflow = '';
      setActive(false);
      stage.setIntroDone();
    }, DURATION + 2500);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(safety);
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col justify-between overflow-hidden bg-void px-gutter py-8 text-paper"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* Soft light pooling under the mark. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(40% 32% at 50% 52%, rgba(10,132,255,0.16), transparent 70%)',
            }}
          />

          <div className="relative flex items-center justify-between">
            <span className="eyebrow">Creative &amp; Technology</span>
            <span className="eyebrow">Websites · Software · AI</span>
          </div>

          <div className="relative mx-auto w-[min(72vw,34rem)]">
            {/* Ghost wordmark */}
            <Image
              src="/logo-wordmark.png"
              alt=""
              width={1200}
              height={172}
              priority
              className="theme-invert h-auto w-full opacity-[0.12]"
            />
            {/* Drawn wordmark, clipped to the counter */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
            >
              <Image
                src="/logo-wordmark.png"
                alt=""
                width={1200}
                height={172}
                priority
                className="theme-invert h-auto w-full"
              />
            </div>
            <motion.span
              className="absolute -bottom-3 left-0 h-px bg-accent shadow-[0_0_18px_rgba(10,132,255,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="relative flex items-end justify-between gap-6">
            <p className="eyebrow max-w-[22ch] leading-relaxed">
              Engineering · Design · Intelligence
            </p>
            <span className="font-display text-[clamp(4rem,12vw,10rem)] font-medium leading-[0.8] tracking-[-0.06em] tabular-nums">
              {String(progress).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
