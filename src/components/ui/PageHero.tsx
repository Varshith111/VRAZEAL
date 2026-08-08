'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, subtitle, className }: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section className={cn('bg-surface pt-[calc(var(--nav-h)+5rem)] pb-16 lg:pb-24', className)}>
      <div className="shell">
        <motion.p
          className="font-mono text-label uppercase tracking-[0.16em] text-page-muted mb-6"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow}
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            className="text-h1 font-medium text-page-ink max-w-[18ch]"
            initial={reduced ? undefined : { y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {title}
          </motion.h1>
        </div>
        {subtitle && (
          <motion.p
            className="mt-7 max-w-[52ch] text-lead text-page-muted"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          className="mt-10 h-px w-full bg-page-line origin-left"
          initial={reduced ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>
    </section>
  );
}
