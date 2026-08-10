'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { aboutServices } from '@/lib/about';
import { IconArrowDiagonal } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { AboutSection, ease, LineReveal } from '@/components/about/shared';

export function ServicesOverviewRow() {
  const [activeHover, setActiveHover] = useState(0);

  return (
    <AboutSection index="01" label="Disciplines Overview" tone="paper">
      <div className="mt-12 lg:mt-16">
        <div className="grid grid-cols-12 items-end gap-y-6">
          <LineReveal
            className="col-span-12 text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.04em] text-page-ink lg:col-span-6"
            lines={['Comprehensive Services.','Unified Execution.']}
          />
          <p className="col-span-12 max-w-[46ch] text-lead leading-[1.65] text-page-muted lg:col-span-5 lg:col-start-8">
            Every service is custom-engineered to solve operational challenges, expand market reach, and deliver measurable return.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-y-12 lg:mt-16 lg:gap-x-12">
          {/* Left Column: Interactive Full-Width Service Rows */}
          <div className="col-span-12 lg:col-span-7">
            <div className="border-t border-page-line">
              {aboutServices.map((service, index) => (
                <ServiceOverviewItem
                  key={service.number}
                  service={service}
                  index={index}
                  isActive={activeHover === index}
                  onHover={() => setActiveHover(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Signature Dynamic Visual Panel */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-[calc(var(--nav-h)+3rem)] overflow-hidden rounded-3xl border border-page-line bg-surface p-8 shadow-sm lg:p-10">
              <span className="font-mono text-xs uppercase tracking-widest text-page-muted">
                System Visual Preview — Service 0{activeHover + 1}
              </span>

              <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-page-line bg-paper p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHover}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease }}
                    className="h-full w-full flex flex-col justify-between"
                  >
                    <DynamicServicePanel index={activeHover} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
}

function ServiceOverviewItem({
  service,
  index,
  isActive,
  onHover,
}: {
  service: (typeof aboutServices)[number];
  index: number;
  isActive: boolean;
  onHover: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="group relative border-b border-page-line transition-colors duration-500"
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.05, ease }}
      onMouseEnter={onHover}
    >
      <Link
        href={service.href}
        data-cursor="link"
        className="relative flex w-full flex-col justify-between gap-4 py-7 sm:py-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span
              className={cn(
                'font-mono text-sm font-semibold transition-colors duration-300',
                isActive ? 'text-page-ink' : 'text-page-muted'
              )}
            >
              {service.number}
            </span>
            <h3
              className={cn(
                'font-display text-2xl font-medium tracking-tight text-page-ink transition-transform duration-500 sm:text-3xl',
                isActive && 'translate-x-2'
              )}
            >
              {service.title}
            </h3>
          </div>

          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-page-line text-page-ink transition-all duration-300',
              isActive && 'border-page-ink bg-page-ink text-paper'
            )}
          >
            <IconArrowDiagonal className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <p
          className={cn(
            'pl-12 text-sm leading-relaxed text-page-muted transition-colors duration-300 sm:text-base',
            isActive && 'text-page-ink'
          )}
        >
          {service.description}
        </p>
      </Link>
    </motion.div>
  );
}

function DynamicServicePanel({ index }: { index: number }) {
  switch (index) {
    case 0: // Website Dev
      return (
        <div className="h-full flex flex-col justify-between font-mono text-[0.6875rem]">
          <div className="flex items-center justify-between border-b border-page-line pb-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-page-line" />
              <div className="h-2.5 w-2.5 rounded-full bg-page-line" />
              <div className="h-2.5 w-2.5 rounded-full bg-page-line" />
            </div>
            <span className="text-page-muted">https://vrazeal.com</span>
          </div>
          <div className="my-auto space-y-3 py-4">
            <div className="h-4 w-3/4 rounded bg-page-ink/10" />
            <div className="h-3 w-1/2 rounded bg-page-line" />
            <div className="h-3 w-5/6 rounded bg-page-line" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-12 rounded bg-page-ink/5 border border-page-line p-2 text-[0.6rem] text-page-muted">Next.js 14</div>
              <div className="h-12 rounded bg-page-ink/5 border border-page-line p-2 text-[0.6rem] text-page-muted">Vitals 100</div>
              <div className="h-12 rounded bg-page-ink/5 border border-page-line p-2 text-[0.6rem] text-page-muted">Headless</div>
            </div>
          </div>
          <div className="flex justify-between text-page-muted border-t border-page-line pt-2">
            <span>Status: 200 OK</span>
            <span>SSR Rendered</span>
          </div>
        </div>
      );
    case 1: // Custom CRM & Software
      return (
        <div className="h-full flex flex-col justify-between font-mono text-[0.6875rem]">
          <div className="flex justify-between border-b border-page-line pb-3 text-page-ink font-semibold">
            <span>CRM Pipeline Dashboard</span>
            <span>v2.4 Production</span>
          </div>
          <div className="my-auto space-y-3 py-2">
            <div className="flex justify-between text-page-muted">
              <span>Deal Pipeline</span>
              <span>84% Automation Rate</span>
            </div>
            <div className="h-3 w-full rounded-full bg-page-line overflow-hidden">
              <div className="h-full w-4/5 bg-page-ink" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded border border-page-line p-3">
                <span className="text-page-muted block">Workflows</span>
                <span className="text-base font-bold text-page-ink">1,420 Active</span>
              </div>
              <div className="rounded border border-page-line p-3">
                <span className="text-page-muted block">Efficiency</span>
                <span className="text-base font-bold text-page-ink">+42% Boost</span>
              </div>
            </div>
          </div>
          <div className="text-page-muted border-t border-page-line pt-2">
            <span>Role-Based Permissions Enforced</span>
          </div>
        </div>
      );
    case 2: // AI Solutions
      return (
        <div className="h-full flex flex-col justify-between font-mono text-[0.6875rem]">
          <div className="flex justify-between border-b border-page-line pb-3 text-page-ink font-semibold">
            <span>AI Neural Graph & Agent</span>
            <span>RAG Active</span>
          </div>
          <div className="my-auto py-2 flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border border-page-ink flex items-center justify-center text-[0.55rem] font-bold">IN</div>
              <div className="h-px w-8 bg-page-ink" />
              <div className="h-10 w-10 rounded-full bg-page-ink text-paper flex items-center justify-center text-[0.6rem] font-bold">AI</div>
              <div className="h-px w-8 bg-page-ink" />
              <div className="h-8 w-8 rounded-full border border-page-ink flex items-center justify-center text-[0.55rem] font-bold">OUT</div>
            </div>
            <span className="text-[0.6rem] text-page-muted">Evaluation & Guardrails Verified</span>
          </div>
          <div className="flex justify-between text-page-muted border-t border-page-line pt-2">
            <span>Latency: 140ms</span>
            <span>Accuracy: 99.4%</span>
          </div>
        </div>
      );
    case 3: // Branding
      return (
        <div className="h-full flex flex-col justify-between font-mono text-[0.6875rem]">
          <div className="flex justify-between border-b border-page-line pb-3 text-page-ink font-semibold">
            <span>Identity System Token Spec</span>
            <span>Design Specs</span>
          </div>
          <div className="my-auto py-2 space-y-2">
            <span className="font-display text-3xl font-bold tracking-tight text-page-ink block">VRAZEAL</span>
            <div className="flex gap-2">
              <div className="h-5 w-5 rounded bg-page-ink" />
              <div className="h-5 w-5 rounded bg-page-muted" />
              <div className="h-5 w-5 rounded bg-page-line" />
              <div className="h-5 w-5 rounded border border-page-line bg-paper" />
            </div>
            <span className="text-page-muted text-[0.6rem] block">Typography: Variable Display Sans & Mono</span>
          </div>
          <div className="text-page-muted border-t border-page-line pt-2">
            <span>Design Tokens & Guidelines</span>
          </div>
        </div>
      );
    case 4: // Digital Marketing
      return (
        <div className="h-full flex flex-col justify-between font-mono text-[0.6875rem]">
          <div className="flex justify-between border-b border-page-line pb-3 text-page-ink font-semibold">
            <span>Growth Funnel Analytics</span>
            <span>Live ROI</span>
          </div>
          <div className="my-auto py-2 space-y-2">
            <div className="flex items-end gap-2 h-16 pt-2">
              <div className="h-1/3 w-1/4 bg-page-line rounded-t" />
              <div className="h-1/2 w-1/4 bg-page-line rounded-t" />
              <div className="h-3/4 w-1/4 bg-page-muted rounded-t" />
              <div className="h-full w-1/4 bg-page-ink rounded-t" />
            </div>
            <div className="flex justify-between text-page-ink font-bold text-sm">
              <span>Acquisition</span>
              <span>+180% Growth</span>
            </div>
          </div>
          <div className="text-page-muted border-t border-page-line pt-2">
            <span>Performance Campaign Active</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}
