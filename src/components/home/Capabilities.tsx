'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { CapabilityVisual } from '@/components/sections/CapabilityVisuals';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { capabilities } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

const HREF: Record<string, string> = {
  websites: '/services#web',
  crm: '/services#crm',
  software: '/services#crm',
  ai: '/ai-solutions',
  brand: '/services#branding',
  creative: '/services#marketing',
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The capability index. Desktop: oversized rows; hovering one rolls its title
 * into the italic serif and floats a live preview of what that discipline
 * produces beside the cursor. Touch: the same rows open in place.
 */
export function Capabilities() {
  const isDesktop = useMediaQuery('(min-width: 1024px) and (pointer: fine)');
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 170, damping: 22, mass: 0.6 });
  const velocity = useVelocity(sx);
  const rotate = useTransform(velocity, [-1800, 1800], [-10, 10], { clamp: true });
  // Sits right of the cursor on the left of the screen and slides to its
  // left side as the cursor travels right, so it never leaves the viewport.
  const offsetX = useTransform(sx, (value) => {
    if (typeof window === 'undefined') return '62%';
    const t = Math.min(1, Math.max(0, (value / window.innerWidth - 0.5) / 0.3));
    return `${62 - 124 * t}%`;
  });

  const onMove = (event: React.PointerEvent) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  const showPreview = isDesktop && !reduced && active !== null;

  return (
    <section id="build" className="relative scroll-mt-10 bg-void py-section">
      <div className="shell">
        <SectionIntro
          index="02"
          label="Capabilities"
          title={[
            'What we',
            <>
              <span className="accent-serif">build</span>
              <span className="text-accent">.</span>
            </>,
          ]}
          aside="Six disciplines that usually live in six different companies. Under one roof, the strategy, the interface and the database finally agree with each other."
        />

        <RevealGroup
          className="mt-16 border-t border-hair lg:mt-24"
          stagger={0.06}
        >
          <div onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
            {capabilities.map((capability, index) => {
              const dimmed = isDesktop && active !== null && active !== index;
              const expanded = !isDesktop && open === index;

              const row = (
                <>
                  {/* Hover wash rising from the bottom edge */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-accent/[0.09] to-transparent transition-transform duration-700 ease-expo group-hover:scale-y-100"
                  />
                  <span className="relative col-span-2 font-mono text-label text-ash sm:col-span-1">
                    {capability.index}
                  </span>

                  <span
                    className={cn(
                      'relative col-span-10 sm:col-span-11 lg:col-span-6',
                      'transition-[opacity,transform] duration-700 ease-expo lg:group-hover:translate-x-4',
                      dimmed && 'opacity-25',
                    )}
                  >
                    <span className="relative block overflow-hidden font-display text-[clamp(2.25rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.05em]">
                      <span className="block transition-transform duration-700 ease-expo lg:group-hover:-translate-y-full">
                        {capability.title}
                      </span>
                      <span
                        aria-hidden
                        className="accent-serif absolute inset-0 block translate-y-full text-accent-bright transition-transform duration-700 ease-expo lg:group-hover:translate-y-0"
                      >
                        {capability.title}
                      </span>
                    </span>
                  </span>

                  <span
                    className={cn(
                      'relative hidden text-[0.9375rem] leading-[1.55] text-smoke transition-opacity duration-500 lg:col-span-3 lg:block',
                      dimmed && 'opacity-30',
                    )}
                  >
                    {capability.summary}
                  </span>

                  <span className="relative hidden items-center justify-end gap-5 lg:col-span-2 lg:flex">
                    <span className="font-mono text-label text-ash">{capability.timeline}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/15 transition-all duration-700 ease-expo group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <svg viewBox="0 0 16 16" className="h-4 w-4 -rotate-45 transition-transform duration-700 ease-expo group-hover:rotate-0" aria-hidden>
                        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </>
              );

              return (
                <RevealItem key={capability.id} y={20}>
                  <div className="border-b border-hair">
                    {isDesktop ? (
                      <Link
                        href={HREF[capability.id] ?? '/services'}
                        onPointerEnter={() => setActive(index)}
                        className="group relative grid grid-cols-12 items-center gap-x-6 overflow-hidden py-8 xl:py-10"
                      >
                        {row}
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setOpen(expanded ? null : index)}
                          aria-expanded={expanded}
                          className="group relative grid w-full grid-cols-12 items-center gap-x-4 overflow-hidden py-7 text-left"
                        >
                          {row}
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.6, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-6 pb-9">
                                <p className="text-[1rem] leading-[1.6] text-smoke">{capability.detail}</p>
                                <div className="h-56 sm:h-72">
                                  <CapabilityVisual id={capability.id} />
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {capability.deliverables.map((item) => (
                                    <span key={item} className="rounded-pill border border-hair px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-smoke">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                                <Link href={HREF[capability.id] ?? '/services'} className="link-underline inline-block py-2 text-[0.9375rem] text-accent-bright">
                                  Explore {capability.title.toLowerCase()} →
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </RevealGroup>
      </div>

      {/* Floating preview window that trails the pointer. */}
      {isDesktop && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[60]"
          style={{ x: sx, y: sy, rotate, translateX: '-50%', translateY: '-50%' }}
          initial={false}
          animate={{ scale: showPreview ? 1 : 0.4, opacity: showPreview ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.div
            style={{ x: offsetX }}
            className="relative h-[17.5rem] w-[25rem] overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_40px_120px_-20px_rgba(10,132,255,0.45),0_0_0_1px_rgb(var(--c-fg)/0.12)]">
            <AnimatePresence mode="wait">
              {active !== null && (
                <motion.div
                  key={capabilities[active].id}
                  className="h-full w-full"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <CapabilityVisual id={capabilities[active].id} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
