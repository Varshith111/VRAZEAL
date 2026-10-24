'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

const SPRING = { type: 'spring', stiffness: 260, damping: 22 } as const;
const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Sun / moon switch. The icon morphs between the two: a cut-out disc slides
 * over the sun to form the crescent while the rays retract and turn. The
 * theme itself is revealed as a circle growing from this button.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const maskId = `theme-mask-${useId().replace(/:/g, '')}`;
  const dark = theme === 'dark';
  const next = dark ? 'light' : 'dark';

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Keyboard clicks report 0,0 — reveal from the button's centre instead.
    const rect = event.currentTarget.getBoundingClientRect();
    toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        'glass group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/10 text-paper transition-colors duration-500 hover:border-accent/50',
        className,
      )}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        aria-hidden
        animate={{ rotate: dark ? 40 : 0 }}
        transition={SPRING}
      >
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <motion.circle
            r="6"
            fill="black"
            initial={false}
            animate={dark ? { cx: 17, cy: 7 } : { cx: 30, cy: -6 }}
            transition={SPRING}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: dark ? 8 : 4.5 }}
          transition={SPRING}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.4 : 1, rotate: dark ? -60 : 0 }}
          transition={SPRING}
          style={{ originX: '12px', originY: '12px' }}
        >
          {RAYS.map((angle) => (
            <line
              key={angle}
              x1="12"
              y1="2.5"
              x2="12"
              y2="4.5"
              transform={`rotate(${angle} 12 12)`}
            />
          ))}
        </motion.g>
      </motion.svg>
    </button>
  );
}
