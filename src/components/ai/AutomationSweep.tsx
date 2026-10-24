'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Spotlight } from '@/components/motion/Spotlight';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { automatable } from '@/lib/ai';
import { cn } from '@/lib/utils';

const STEP = 650;

/**
 * Eight everyday tasks. While the grid is on screen a sweep runs across it,
 * flipping each card from "Manual" to "Automated" in turn, holds, then
 * resets — the whole pitch of the page in one loop.
 */
export function AutomationSweep() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-15%' });
  const reduced = useReducedMotion();
  const [done, setDone] = useState(reduced ? automatable.length : 0);

  useEffect(() => {
    if (reduced) {
      setDone(automatable.length);
      return;
    }
    if (!inView) return;
    const hold = done >= automatable.length;
    const id = window.setTimeout(() => setDone((value) => (value >= automatable.length ? 0 : value + 1)), hold ? 2600 : STEP);
    return () => window.clearTimeout(id);
  }, [inView, done, reduced]);

  return (
    <section className="relative bg-void py-section">
      <div className="shell">
        <SectionIntro
          index="02"
          label="What can be automated"
          title={[
            'If it repeats,',
            <>
              it can <span className="accent-serif">run itself</span>
              <span className="text-accent">.</span>
            </>,
          ]}
          aside="A few of the workflows we automate most often. If your team does it more than twice a week, it belongs on this list."
        />

        <div ref={ref} className="mt-16 lg:mt-20">
          <div className="mb-6 flex items-center justify-between">
            <p className="eyebrow">Automation coverage</p>
            <p className="font-display text-[1.5rem] font-medium tabular-nums tracking-[-0.04em]">
              {Math.round((Math.min(done, automatable.length) / automatable.length) * 100)}
              <span className="text-ash">%</span>
            </p>
          </div>
          <div className="mb-8 h-px w-full bg-hair">
            <motion.div
              className="h-full origin-left bg-accent shadow-[0_0_10px_#0A84FF]"
              animate={{ scaleX: Math.min(done, automatable.length) / automatable.length }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
            {automatable.map((item, index) => {
              const automated = index < done;
              return (
                <RevealItem key={item.area} y={20} className="h-full">
                  <Spotlight
                    className={cn(
                      'tile flex h-full min-h-[13rem] flex-col justify-between p-6 transition-colors duration-700 ease-expo',
                      automated && 'border-accent/40 bg-accent/[0.06]',
                    )}
                  >
                    <div className="relative z-[2] flex items-center justify-between">
                      <span className="font-mono text-label text-ash">{String(index + 1).padStart(2, '0')}</span>
                      <span className="relative h-5 w-[6.5rem] overflow-hidden text-right">
                        <AnimatePresence initial={false} mode="popLayout">
                          <motion.span
                            key={automated ? 'auto' : 'manual'}
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            exit={{ y: '-100%', opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                              'absolute inset-0 flex items-center justify-end gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em]',
                              automated ? 'text-accent-bright' : 'text-ash',
                            )}
                          >
                            {automated ? (
                              <>
                                <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
                                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Automated
                              </>
                            ) : (
                              'Manual'
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    </div>
                    <div className="relative z-[2]">
                      <p className="font-display text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{item.area}</p>
                      <p className={cn('mt-2 text-[0.9375rem] leading-snug transition-colors duration-700', automated ? 'text-paper' : 'text-smoke')}>
                        {item.example}
                      </p>
                    </div>
                  </Spotlight>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
