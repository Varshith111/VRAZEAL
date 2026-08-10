'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { aboutServices } from '@/lib/about';
import { AboutSection, ease } from '@/components/about/shared';

export function ScrollServiceCounter() {
  const [activeCounter, setActiveCounter] = useState(0);
  const reduced = useReducedMotion();

  return (
    <AboutSection index="03" label="Discipline Progression" tone="surface">
      <div className="mt-12 py-8 lg:mt-16 lg:py-12">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12 lg:items-center">
          {/* Left Column Counter & Progress */}
          <div className="col-span-12 lg:col-span-4">
            <div className="rounded-3xl border border-page-line bg-paper p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-page-muted block mb-4">
                Active Index Progression
              </span>
              <div className="font-display text-6xl font-bold tracking-tight text-page-ink lg:text-7xl">
                0{activeCounter + 1} <span className="text-page-muted font-light text-4xl">/ 05</span>
              </div>

              {/* Progress Indicator Bar */}
              <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-page-line">
                <motion.div
                  className="h-full bg-page-ink transition-all duration-500 ease-expo"
                  style={{ width: `${((activeCounter + 1) / 5) * 100}%` }}
                />
              </div>

              <div className="mt-6 flex justify-between gap-2">
                {aboutServices.map((s, idx) => (
                  <button
                    key={s.number}
                    onClick={() => setActiveCounter(idx)}
                    className={`h-8 w-8 rounded-full font-mono text-xs transition-colors ${
                      activeCounter === idx ? 'bg-page-ink text-paper font-bold' : 'bg-surface text-page-muted hover:text-page-ink'
                    }`}
                  >
                    {s.number}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Title & Narrative Slide */}
          <div className="col-span-12 lg:col-span-8">
            <div className="min-h-[220px] rounded-3xl border border-page-line bg-paper p-8 lg:p-12 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCounter}
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-page-muted">
                    Discipline {aboutServices[activeCounter].number}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-page-ink lg:text-5xl">
                    {aboutServices[activeCounter].title}
                  </h3>
                  <p className="mt-4 text-lead leading-relaxed text-page-muted">
                    {aboutServices[activeCounter].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between border-t border-page-line pt-4 font-mono text-xs text-page-muted">
                <span>VRAZEAL Engineering Matrix</span>
                <span>Click / Scroll Selection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
