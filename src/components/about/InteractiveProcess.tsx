'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutProcess } from '@/lib/about';
import { cn } from '@/lib/utils';
import { AboutSection, ease, LineReveal } from './shared';

export function InteractiveProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const reduced = useReducedMotion();

  return (
    <AboutSection index="05" label="Our Process" tone="paper">
      <div className="mt-12 lg:mt-16">
        <LineReveal
          className="text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.04em] text-page-ink"
          lines={['FROM IDEA TO', 'SOMETHING REAL.']}
        />

        <div className="mt-12 grid grid-cols-12 gap-y-10 lg:mt-16 lg:gap-x-12">
          {/* Left Column: Interactive Step Selector */}
          <div className="col-span-12 lg:col-span-5">
            <div className="space-y-3">
              {aboutProcess.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => setActiveStep(idx)}
                    className={cn(
                      'group flex w-full items-center justify-between rounded-xl border p-5 text-left transition-all duration-300',
                      isActive
                        ? 'border-page-ink bg-page-ink text-paper shadow-md'
                        : 'border-page-line bg-surface text-page-ink hover:border-page-ink/30'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          'font-mono text-sm font-semibold transition-colors',
                          isActive ? 'text-paper/60' : 'text-page-muted'
                        )}
                      >
                        {step.number}
                      </span>
                      <span className="font-display text-xl font-medium tracking-tight">
                        {step.title}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full transition-colors',
                        isActive ? 'bg-paper' : 'bg-transparent'
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Stage Detail Showcase */}
          <div className="col-span-12 lg:col-span-7">
            <div className="sticky top-[calc(var(--nav-h)+3rem)] rounded-3xl border border-page-line bg-surface p-8 lg:p-12">
              <motion.div
                key={activeStep}
                initial={reduced ? undefined : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col justify-between space-y-8"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-page-line pb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-page-muted">
                      Stage {aboutProcess[activeStep].number} of 06
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-page-ink font-semibold">
                      Phase Execution
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-4xl font-medium tracking-tight text-page-ink lg:text-5xl">
                    {aboutProcess[activeStep].title}
                  </h3>

                  <p className="mt-6 text-lead leading-relaxed text-page-muted">
                    {aboutProcess[activeStep].body}
                  </p>
                </div>

                <div className="rounded-xl border border-page-line bg-paper p-6">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-page-muted">
                    Output Deliverable
                  </span>
                  <p className="mt-2 text-sm font-medium text-page-ink">
                    Verified milestone documentation, prototypes, and continuous architectural review.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
