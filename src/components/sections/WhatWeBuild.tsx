'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { Section } from '@/components/ui/Section';
import { capabilityIcons, IconArrowDiagonal } from '@/components/ui/icons';
import { CapabilityVisual } from './CapabilityVisuals';
import { capabilities } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;
/** How long each discipline holds the screen before the section advances. */
const CYCLE = 7000;

/**
 * Six disciplines, shown running rather than listed.
 *
 * Desktop is a vertical tablist against a pinned screen: the section cycles
 * itself until the pointer or keyboard arrives, then hands over control for
 * good — an auto-advance that keeps stealing the panel back is worse than no
 * auto-advance at all. Below `lg` the same content collapses to a disclosure
 * list, because a pinned panel and a scrolling list cannot share a phone.
 */
export function WhatWeBuild() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(listRef, { margin: '-20% 0px -20% 0px' });

  const auto = isDesktop && inView && !locked && !reduced;

  useEffect(() => {
    if (!auto) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % capabilities.length),
      CYCLE,
    );
    return () => window.clearTimeout(timer);
  }, [auto, active]);

  /** Any deliberate input takes the section off autoplay permanently. */
  const select = useCallback((index: number) => {
    setActive(index);
    setLocked(true);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const last = capabilities.length - 1;
      const next = {
        ArrowDown: active === last ? 0 : active + 1,
        ArrowRight: active === last ? 0 : active + 1,
        ArrowUp: active === 0 ? last : active - 1,
        ArrowLeft: active === 0 ? last : active - 1,
        Home: 0,
        End: last,
      }[event.key];

      if (next === undefined) return;
      event.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    },
    [active, select],
  );

  /** The mobile list can close every row (-1); the desktop panel always has one. */
  const activeIndex = active < 0 ? 0 : active;
  const current = capabilities[activeIndex];

  return (
    <Section id="build" index="02" label="Capabilities" meta="Six practices, one team">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <h2 className="col-span-12 text-h2 font-medium lg:col-span-7">
            <SplitText text="What we build" />
          </h2>
          <div className="col-span-12 lg:col-span-5">
            <p className="max-w-prose text-lead text-muted">
              Six disciplines that usually live in six different companies. Keeping them under one
              roof is why the strategy, the interface, and the database agree with each other.
            </p>
            <p className="mt-5 hidden items-center gap-2 lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="eyebrow">
                {locked ? 'Manual — select a discipline' : 'Running — hover to take control'}
              </span>
            </p>
          </div>
        </div>

        {isDesktop ? (
          <div ref={listRef} className="mt-14 grid grid-cols-12 gap-x-10 lg:mt-16">
            {/* The index. Hovering is selecting — the panel is the payoff. */}
            <div
              role="tablist"
              aria-label="Capabilities"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="col-span-5 border-t border-line"
            >
              {capabilities.map((capability, index) => {
                const Icon = capabilityIcons[capability.id as keyof typeof capabilityIcons];
                const isActive = index === activeIndex;

                return (
                  <button
                    key={capability.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`capability-tab-${capability.id}`}
                    aria-selected={isActive}
                    aria-controls={`capability-panel-${capability.id}`}
                    tabIndex={isActive ? 0 : -1}
                    data-cursor="link"
                    onMouseEnter={() => select(index)}
                    onFocus={() => select(index)}
                    onClick={() => select(index)}
                    className="group relative block w-full overflow-hidden border-b border-line px-1 py-6 text-left"
                  >
                    {/* Wipe fill, matching the approach rows further down the page. */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 origin-left bg-[#FAFAFA]"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.6, ease }}
                    />

                    <span className="relative flex items-baseline gap-5">
                      <span
                        className={cn(
                          'w-7 shrink-0 font-mono text-label transition-colors duration-500',
                          isActive ? 'text-accent' : 'text-muted',
                        )}
                      >
                        {capability.index}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-4">
                          <span
                            className={cn(
                              'block font-display text-[1.625rem] font-medium leading-none tracking-[-0.032em] transition-transform duration-500 ease-expo',
                              isActive ? 'translate-x-0' : 'group-hover:translate-x-1',
                            )}
                          >
                            {capability.title}
                          </span>
                          <Icon
                            className={cn(
                              'h-6 w-6 shrink-0 transition-colors duration-500',
                              isActive ? 'text-accent' : 'text-muted/50',
                            )}
                          />
                        </span>

                        <span
                          className={cn(
                            'mt-2 block text-[0.9375rem] tracking-[-0.01em] transition-colors duration-500',
                            isActive ? 'text-ink' : 'text-muted',
                          )}
                        >
                          {capability.summary}
                        </span>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              key="detail"
                              className="block overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease }}
                            >
                              <span className="block pt-3 text-[0.9375rem] leading-[1.62] text-muted">
                                {capability.detail}
                              </span>
                              <span className="mt-4 flex flex-wrap gap-1.5">
                                {capability.deliverables.map((item) => (
                                  <span
                                    key={item}
                                    className="rounded-pill border border-accent/25 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.11em] text-ink"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </span>

                    {/* Doubles as the autoplay timer and the selection marker. */}
                    {isActive && (
                      <motion.span
                        key={`progress-${index}-${auto}`}
                        aria-hidden
                        className="absolute bottom-0 left-0 h-px w-full origin-left bg-ink"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={
                          auto
                            ? { duration: CYCLE / 1000, ease: 'linear' }
                            : { duration: 0.7, ease }
                        }
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* The screen. */}
            <div className="col-span-7">
              <div className="sticky top-[calc(var(--nav-h)+3.5rem)]">
                <div className="relative h-[min(62vh,34rem)] w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      id={`capability-panel-${current.id}`}
                      role="tabpanel"
                      aria-labelledby={`capability-tab-${current.id}`}
                      className="absolute inset-0"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease }}
                    >
                      <CapabilityVisual id={current.id} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                  <div className="flex items-center gap-1.5" aria-hidden>
                    {capabilities.map((capability, index) => (
                      <span
                        key={capability.id}
                        className={cn(
                          'block h-px transition-all duration-500 ease-expo',
                          index === activeIndex ? 'w-10 bg-ink' : 'w-5 bg-line',
                        )}
                      />
                    ))}
                  </div>

                  <p className="eyebrow">
                    Typical engagement
                    <span className="ml-3 text-ink">{current.timeline}</span>
                  </p>

                  <a
                    href="#contact"
                    data-cursor="view"
                    data-cursor-label="Ask"
                    className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
                  >
                    <span className="link-underline">Scope a {current.title.toLowerCase()} build</span>
                    <IconArrowDiagonal className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Below lg: one discipline open at a time, its screen inline. */
          <div ref={listRef} className="mt-12 border-t border-line">
            {capabilities.map((capability, index) => {
              const Icon = capabilityIcons[capability.id as keyof typeof capabilityIcons];
              const isOpen = index === active;

              return (
                <div key={capability.id} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`capability-disclosure-${capability.id}`}
                      onClick={() => setActive(isOpen ? -1 : index)}
                      className="flex w-full items-center gap-4 py-6 text-left"
                    >
                      <span
                        className={cn(
                          'w-7 shrink-0 font-mono text-label',
                          isOpen ? 'text-accent' : 'text-muted',
                        )}
                      >
                        {capability.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[1.375rem] font-medium leading-none tracking-[-0.03em]">
                          {capability.title}
                        </span>
                        <span className="mt-2 block text-[0.9375rem] text-muted">
                          {capability.summary}
                        </span>
                      </span>
                      <Icon
                        className={cn(
                          'h-6 w-6 shrink-0 transition-transform duration-500 ease-expo',
                          isOpen ? 'rotate-90 text-accent' : 'text-muted/50',
                        )}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`capability-disclosure-${capability.id}`}
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                      >
                        <div className="pb-8">
                          <div className="aspect-[4/3] w-full sm:aspect-[16/10]">
                            <CapabilityVisual id={capability.id} />
                          </div>

                          <p className="mt-6 text-[0.9375rem] leading-[1.62] text-muted">
                            {capability.detail}
                          </p>

                          <ul className="mt-5 flex flex-wrap gap-1.5">
                            {capability.deliverables.map((item) => (
                              <li
                                key={item}
                                className="rounded-pill border border-accent/25 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.11em] text-ink"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>

                          <p className="eyebrow mt-6">
                            Typical engagement
                            <span className="ml-3 text-ink">{capability.timeline}</span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}
