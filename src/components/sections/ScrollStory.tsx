'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

const LINES = [
  'Can your business survive',
  'without the systems behind it?',
  'Without software that scales',
  'past the spreadsheet?',
  'Probably not.',
  "That's why we exist.",
];

/**
 * Phones get three beats instead of six.
 *
 * Six single-clause lines cost 4.4 screens of pinned scrolling on a 812px
 * viewport — the visitor is held hostage swiping through an inverting black
 * frame. Paired into whole sentences the section says the same thing in half
 * the scroll, and each beat is a complete thought rather than a fragment.
 */
const MOBILE_LINES = [
  'Can your business survive without the systems behind it?',
  'Without software that scales past the spreadsheet?',
  "Probably not. That's why we exist.",
];

/** Where the frame flips from white to black, as a fraction of the pin. */
const INVERT: [number, number] = [0.6, 0.68];

/**
 * The emotional beat of the page. The section pins, lines replace one another
 * as you scroll, and the whole frame inverts to black for the answer.
 */
export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const lines = isDesktop ? LINES : MOBILE_LINES;
  // Scroll cost is per beat, so the shorter mobile script gets a shorter pin.
  const height = isDesktop ? '440svh' : '210svh';

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const background = useTransform(scrollYProgress, INVERT, ['#FFFFFF', '#000000']);
  const foreground = useTransform(scrollYProgress, INVERT, ['#000000', '#FFFFFF']);
  const meta = useTransform(scrollYProgress, INVERT, ['#666666', 'rgba(255,255,255,0.45)']);
  const rule = useTransform(scrollYProgress, INVERT, ['#E8E8E8', 'rgba(255,255,255,0.16)']);

  if (reduced) {
    return (
      <section id="story" className="bg-ink py-section text-paper">
        <div className="shell">
          <p className="eyebrow text-paper/45">06 — Why we exist</p>
          <p className="mt-10 max-w-[20ch] font-display text-h1 font-medium">
            Can your business survive without the systems behind it? Probably not. That&apos;s why we
            exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="story" ref={ref} className="relative" style={{ height }}>
      <motion.div
        style={{ backgroundColor: background }}
        className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden py-10"
      >
        <div className="shell">
          <motion.div style={{ backgroundColor: rule }} className="h-px w-full" />
          <div className="flex items-baseline justify-between pt-5">
            <motion.p style={{ color: meta }} className="font-mono text-label uppercase tracking-[0.16em]">
              06 — Why we exist
            </motion.p>
            <motion.p style={{ color: meta }} className="font-mono text-label uppercase tracking-[0.16em]">
              Keep scrolling
            </motion.p>
          </div>
        </div>

        <div className="relative flex-1">
          {lines.map((line, index) => (
            <StoryLine
              key={line}
              text={line}
              index={index}
              total={lines.length}
              progress={scrollYProgress}
              color={foreground}
              compact={!isDesktop}
            />
          ))}
        </div>

        <div className="shell">
          <motion.div style={{ backgroundColor: rule }} className="h-px w-full" />
          <div className="flex items-center gap-4 pt-5">
            <motion.div style={{ backgroundColor: rule }} className="relative h-px w-32 overflow-hidden sm:w-48">
              <motion.span
                className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
                style={{ scaleX: scrollYProgress }}
              />
            </motion.div>
            <motion.span style={{ color: meta }} className="font-mono text-label uppercase tracking-[0.16em]">
              Vrazeal
            </motion.span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StoryLine({
  text,
  index,
  total,
  progress,
  color,
  compact,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  color: MotionValue<string>;
  /** Whole sentences need a smaller size and a wider measure than fragments. */
  compact?: boolean;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  const fade = span * 0.28; // portion of each slot spent entering / leaving
  const isLast = index === total - 1;

  const stops = [start, start + fade, end - fade, end];

  const opacity = useTransform(progress, stops, isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, stops, isLast ? [34, 0, 0, 0] : [34, 0, 0, -34]);
  const filter = useTransform(
    useTransform(progress, stops, isLast ? [7, 0, 0, 0] : [7, 0, 0, 7]),
    (value: number) => `blur(${value}px)`,
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center">
      <div className="shell w-full">
        <motion.p
          style={{ opacity, y, filter, color }}
          className={cn(
            'font-display font-medium will-change-transform',
            compact
              ? 'max-w-[13ch] text-[clamp(2rem,8.6vw,3rem)] leading-[1.04] tracking-[-0.038em]'
              : 'max-w-[15ch] text-display',
          )}
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
}
