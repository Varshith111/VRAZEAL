'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline reading indicator pinned under the navigation. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[101] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
