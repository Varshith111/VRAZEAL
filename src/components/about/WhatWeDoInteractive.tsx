'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutServices } from '@/lib/about';
import { capabilityIcons, IconArrowDiagonal } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { AboutSection, ease, LineReveal } from './shared';

export function WhatWeDoInteractive() {
  const [activeHover, setActiveHover] = useState<number | null>(null);

  return (
    <AboutSection index="03" label="What We Do" tone="paper">
      <div className="mt-12 lg:mt-16">
        <div className="grid grid-cols-12 items-end gap-y-6">
          <LineReveal
            className="col-span-12 text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.04em] text-page-ink lg:col-span-6"
            lines={['Five core disciplines.','One continuous team.']}
          />
          <p className="col-span-12 max-w-[46ch] text-lead leading-[1.65] text-page-muted lg:col-span-5 lg:col-start-8">
            We don&apos;t split engineering from brand or AI from strategy. Every engagement draws on whichever disciplines the business problem requires.
          </p>
        </div>

        <div className="mt-12 border-t border-page-line lg:mt-16">
          {aboutServices.map((service, index) => (
            <InteractiveServiceRow
              key={service.number}
              service={service}
              index={index}
              isHovered={activeHover === index}
              onHover={() => setActiveHover(index)}
              onLeave={() => setActiveHover(null)}
            />
          ))}
        </div>
      </div>
    </AboutSection>
  );
}

function InteractiveServiceRow({
  service,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  service: (typeof aboutServices)[number];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const reduced = useReducedMotion();
  const Icon = capabilityIcons[service.icon];

  return (
    <motion.div
      className="group relative border-b border-page-line transition-colors duration-500"
      initial={reduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link
        href={service.href}
        data-cursor="link"
        className="relative flex w-full flex-col justify-between gap-6 px-2 py-8 sm:py-10 lg:flex-row lg:items-center lg:py-12"
      >
        {/* Background Highlight Wipe */}
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 z-0 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-expo',
            isHovered && 'scale-x-100'
          )}
        />

        <div className="relative z-10 flex items-start gap-6 lg:items-center lg:gap-10">
          <span className="font-mono text-base font-semibold text-page-muted/60 transition-colors duration-300 group-hover:text-page-ink lg:text-lg">
            {service.number}
          </span>
          <h3 className="font-display text-[clamp(1.75rem,3.2vw,3rem)] font-medium tracking-tight text-page-ink transition-transform duration-500 group-hover:translate-x-2">
            {service.title}
          </h3>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-8 lg:justify-end">
          <p className="max-w-[44ch] text-sm text-page-muted transition-colors duration-300 group-hover:text-page-ink/90 sm:text-base lg:text-right">
            {service.description}
          </p>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-page-line bg-paper text-page-ink transition-all duration-500 group-hover:border-page-ink group-hover:bg-page-ink group-hover:text-paper">
            <IconArrowDiagonal className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
