'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

/**
 * Counts up once the number scrolls into view. Uses a spring on a motion value
 * and writes to state only when the rounded integer changes, so a 0→100 count
 * costs 100 renders rather than one per frame.
 */
export function Counter({ value, prefix = '', suffix = '', className, duration = 1.9 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    motionValue.set(value);
  }, [inView, reduced, value, motionValue]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      setDisplay((current) => {
        const next = Math.round(latest);
        return next === current ? current : next;
      });
    });
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      <span className="tabular-nums">
        {prefix}
        {display}
      </span>
      {suffix}
    </span>
  );
}
