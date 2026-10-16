'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { ProjectScreen } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * Real screenshots of a shipped project in a browser frame, with a thumbnail
 * strip to flip between screens. `compact` drops the captions for tight cards.
 */
export function ProjectGallery({
  screens,
  url,
  compact = false,
  className,
}: {
  screens: ProjectScreen[];
  url?: string;
  compact?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const screen = screens[active];

  return (
    <div className={cn('flex h-full w-full flex-col gap-3', className)}>
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[14px] border border-line bg-[#FCFCFD] shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          {url && (
            <span className="ml-3 truncate rounded-pill bg-[#F2F3F5] px-3 py-1 font-mono text-[0.625rem] lowercase tracking-[0.06em] text-muted">
              {url.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
          {!compact && (
            <span className="ml-auto hidden font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted sm:block">
              {screen.label}
            </span>
          )}
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={screen.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-cover object-top"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {screens.length > 1 && (
        <div className="flex shrink-0 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {screens.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${s.label}`}
              aria-pressed={i === active}
              data-cursor="link"
              className={cn(
                'relative aspect-[16/9] w-16 shrink-0 overflow-hidden rounded-md border transition-all duration-300 md:w-20',
                i === active ? 'border-ink ring-1 ring-ink' : 'border-line opacity-60 hover:opacity-100',
              )}
            >
              <Image src={s.src} alt="" fill sizes="80px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
