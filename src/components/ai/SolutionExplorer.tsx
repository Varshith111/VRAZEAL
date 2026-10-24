'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { aiSolutions, type AiSolution } from '@/lib/ai';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;
const CYCLE = 6500;

/**
 * Eight solutions, one stage. The active solution plays as a three-node
 * pipeline — problem, AI, outcome — with light travelling between the nodes.
 * It advances on its own (with a progress bar on the active item) until the
 * visitor picks one; hovering pauses it.
 */
export function SolutionExplorer() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20%' });
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);

  const running = auto && !paused && inView && !reduced && isDesktop;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((value) => (value + 1) % aiSolutions.length), CYCLE);
    return () => window.clearTimeout(id);
  }, [running, active]);

  const pick = (index: number) => {
    setActive(index);
    setAuto(false);
  };

  return (
    <section id="solutions" className="relative bg-void py-section">
      <div className="shell">
        <SectionIntro
          index="01"
          label="Solutions"
          title={[
            'Eight ways AI',
            <>
              earns its <span className="accent-serif">keep</span>
              <span className="text-accent">.</span>
            </>,
          ]}
          aside="Each one starts from a problem you already have, and ends with an outcome you can measure."
        />

        {isDesktop ? (
          <div
            ref={ref}
            className="mt-20 grid grid-cols-12 gap-x-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <ol className="col-span-4 border-t border-hair">
              {aiSolutions.map((solution, index) => {
                const isActive = index === active;
                return (
                  <li key={solution.id} className="relative border-b border-hair">
                    <button
                      type="button"
                      onClick={() => pick(index)}
                      aria-pressed={isActive}
                      className="group flex w-full items-center gap-5 py-5 text-left"
                    >
                      <span className={cn('font-mono text-label transition-colors', isActive ? 'text-accent-bright' : 'text-ash')}>
                        {solution.number}
                      </span>
                      <span
                        className={cn(
                          'font-display text-[1.25rem] font-medium tracking-[-0.025em] transition-all duration-500 ease-expo',
                          isActive ? 'translate-x-2 text-paper' : 'text-paper/45 group-hover:text-paper/80',
                        )}
                      >
                        {solution.title}
                      </span>
                    </button>
                    {isActive && (
                      <span className="absolute inset-x-0 bottom-[-1px] h-px overflow-hidden">
                        <motion.span
                          key={`${active}-${running}`}
                          className="block h-full origin-left bg-accent shadow-[0_0_8px_#0A84FF]"
                          initial={{ scaleX: running ? 0 : 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: running ? CYCLE / 1000 : 0, ease: 'linear' }}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="col-span-8">
              <div className="sticky top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={aiSolutions[active].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <Pipeline solution={aiSolutions[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          <div ref={ref} className="mt-14 border-t border-hair">
            {aiSolutions.map((solution, index) => {
              const open = index === active;
              return (
                <div key={solution.id} className="border-b border-hair">
                  <button
                    type="button"
                    onClick={() => setActive(open ? -1 : index)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="font-mono text-label text-ash">{solution.number}</span>
                    <span className="flex-1 font-display text-[1.25rem] font-medium tracking-[-0.025em]">{solution.title}</span>
                    <span className={cn('text-xl transition-transform duration-500', open && 'rotate-45 text-accent-bright')}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8">
                          <Pipeline solution={solution} compact />
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
    </section>
  );
}

function Pipeline({ solution, compact }: { solution: AiSolution; compact?: boolean }) {
  const reduced = useReducedMotion();
  const nodes = [
    { label: 'The problem', body: solution.problem, tone: 'muted' as const },
    { label: 'The AI solution', body: solution.solution, tone: 'accent' as const },
    { label: 'The outcome', body: solution.benefit, tone: 'paper' as const },
  ];

  return (
    <div className={cn('relative', !compact && 'rounded-[28px] border border-paper/10 bg-carbon p-8 lg:p-10')}>
      {!compact && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{ background: 'radial-gradient(60% 60% at 50% 0%, rgba(10,132,255,0.16), transparent 70%)' }}
        />
      )}
      {!compact && (
        <div className="relative mb-10 flex items-end justify-between gap-6">
          <h3 className="font-display text-[clamp(2rem,3.2vw,3rem)] font-medium leading-none tracking-[-0.045em]">
            {solution.title}
          </h3>
          <span className="font-mono text-label text-ash">{solution.number} / 08</span>
        </div>
      )}

      <div className="relative grid gap-4 md:grid-cols-3">
        {nodes.map((node, index) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 + index * 0.18, ease: EASE }}
            className={cn(
              'relative flex flex-col rounded-[20px] border p-6',
              node.tone === 'accent'
                ? 'border-accent/45 bg-accent/[0.09] shadow-[0_0_60px_-20px_rgba(10,132,255,0.6)]'
                : node.tone === 'paper'
                  ? 'border-paper/15 bg-paper/[0.04]'
                  : 'border-hair bg-void/60',
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  'font-mono text-label uppercase',
                  node.tone === 'accent' ? 'text-accent-bright' : 'text-ash',
                )}
              >
                {node.label}
              </span>
              {node.tone === 'accent' && <AiCore />}
            </div>
            <p
              className={cn(
                'mt-6 text-[0.9375rem] leading-[1.6]',
                node.tone === 'muted' ? 'text-smoke' : 'text-paper',
                node.tone === 'paper' && 'font-display text-[1.25rem] font-medium leading-[1.3] tracking-[-0.02em]',
              )}
            >
              {node.body}
            </p>

            {/* Connector to the next node, with a travelling pulse. */}
            {index < nodes.length - 1 && (
              <span aria-hidden className="absolute -right-4 top-1/2 hidden h-px w-4 bg-paper/15 md:block">
                {!reduced && (
                  <motion.span
                    className="absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-accent shadow-[0_0_10px_2px_rgba(10,132,255,0.9)]"
                    animate={{ left: ['-20%', '100%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.7, ease: 'easeInOut' }}
                  />
                )}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** A small orbiting mark standing in for "the model". */
function AiCore() {
  const reduced = useReducedMotion();
  return (
    <span className="relative flex h-7 w-7 items-center justify-center" aria-hidden>
      <span className="absolute h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_#0A84FF]" />
      <motion.span
        className="absolute inset-0 rounded-full border border-accent/60 border-t-transparent"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
      />
    </span>
  );
}
