'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { cn } from '@/lib/utils';

const PILLARS = [
  {
    word: 'Clarity',
    line: 'Understand the problem first.',
    body: 'We map the business problem and the operational constraints before a single screen is drawn or a line is written.',
  },
  {
    word: 'Creativity',
    line: 'Find the better way.',
    body: 'A distinctive solution to the actual challenge — one that stands out in your market instead of matching it.',
  },
  {
    word: 'Technology',
    line: 'Build the right system.',
    body: 'Production-grade engineering on a modern, modular stack, sized for where the business is going.',
  },
  {
    word: 'Impact',
    line: 'Measure what changed.',
    body: 'Outcomes you can point to: hours saved, revenue unlocked, and a platform that keeps scaling.',
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Four panels side by side. The active one opens to tell its story; the
 * others fold down to a vertical label. Hover on desktop, tap anywhere.
 */
export function ValuePillars({ index = '03' }: { index?: string }) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-void py-section">
      <div className="shell">
        <SectionIntro
          index={index}
          label="How we create value"
          title={[
            'Four steps from',
            <>
              problem to <span className="accent-serif">impact</span>
              <span className="text-accent">.</span>
            </>,
          ]}
        />

        <RevealGroup className="mt-16 flex flex-col gap-3 lg:mt-20 lg:h-[30rem] lg:flex-row" stagger={0.08}>
          {PILLARS.map((pillar, index) => {
            const open = active === index;
            return (
              <RevealItem
                key={pillar.word}
                className={cn(
                  'min-w-0 transition-[flex-grow] duration-700 ease-expo lg:h-full',
                  open ? 'lg:flex-[3.2]' : 'lg:flex-1',
                )}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-expanded={open}
                  className={cn(
                    'group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[24px] border p-7 text-left transition-colors duration-700 ease-expo lg:p-9',
                    open ? 'border-accent/40 bg-accent/[0.08]' : 'border-hair bg-carbon hover:border-paper/20',
                  )}
                >
                  {open && (
                    <motion.span
                      layoutId="pillar-glow"
                      aria-hidden
                      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
                      style={{ background: 'radial-gradient(closest-side, rgba(10,132,255,0.35), transparent)' }}
                      transition={{ duration: 0.8, ease: EASE }}
                    />
                  )}
                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-label text-ash">0{index + 1}</span>
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-700 ease-expo',
                        open ? 'rotate-45 border-accent bg-accent text-white' : 'border-paper/15 text-smoke',
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </div>

                  <div className="relative mt-10 lg:mt-0">
                    <span
                      className={cn(
                        'block font-display font-medium leading-none tracking-[-0.05em] transition-all duration-700 ease-expo',
                        open ? 'text-[clamp(2.5rem,4.4vw,4.5rem)]' : 'text-[clamp(2rem,3vw,2.75rem)] lg:text-[2rem] lg:[writing-mode:vertical-rl] lg:rotate-180',
                      )}
                    >
                      {pillar.word}
                    </span>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                          className="max-w-[42ch]"
                        >
                          <p className="accent-serif mt-5 text-[1.5rem] text-accent-bright">{pillar.line}</p>
                          <p className="mt-3 text-[0.9375rem] leading-[1.6] text-smoke">{pillar.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
