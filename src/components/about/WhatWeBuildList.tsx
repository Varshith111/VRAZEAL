'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { capabilityIcons, IconArrowDiagonal } from '@/components/ui/icons';
import { aboutServices } from '@/lib/about';
import { cn } from '@/lib/utils';
import { AboutSection, ease, LineReveal } from './shared';

/**
 * Five services as full-width editorial rows rather than a card grid.
 *
 * Each row is a real link into the services pages, so the section carries
 * navigation as well as narrative. The hover state is built from three cheap
 * transforms — a wipe, a nudge, and a plate reveal — so a pointer moving down
 * the list never costs a layout pass.
 */
export function WhatWeBuildList() {
  return (
    <AboutSection index="02" label="What we build" tone="surface">
      <div className="mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-6">
          <LineReveal
            className="col-span-12 text-[clamp(1.875rem,4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.038em] text-page-ink lg:col-span-6"
            lines={['What we build']}
          />
          <p className="col-span-12 max-w-[46ch] text-[0.9375rem] leading-[1.65] text-page-muted lg:col-span-5 lg:col-start-8">
            Five disciplines, one team. Most engagements draw on more than one — which is the point
            of keeping them under the same roof.
          </p>
        </div>

        <ul className="mt-12 border-t border-page-line lg:mt-16">
          {aboutServices.map((service, index) => (
            <ServiceRow key={service.number} service={service} index={index} />
          ))}
        </ul>
      </div>
    </AboutSection>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof aboutServices)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const Icon = capabilityIcons[service.icon];

  return (
    <motion.li
      className="border-b border-page-line"
      initial={reduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease }}
    >
      <Link
        href={service.href}
        data-cursor="link"
        className="group relative flex w-full items-start gap-5 overflow-hidden px-1 py-8 sm:gap-8 lg:items-center lg:py-10"
      >
        {/* Wipe fill, matching the row treatment used elsewhere on the site. */}
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-paper transition-transform duration-[650ms] ease-expo group-hover:scale-x-100"
        />

        <span className="relative w-8 shrink-0 pt-1 font-mono text-label text-page-muted transition-colors duration-500 group-hover:text-page-ink lg:pt-0">
          {service.number}
        </span>

        <span className="relative min-w-0 flex-1 transition-transform duration-[650ms] ease-expo group-hover:translate-x-1.5 lg:flex lg:items-center lg:gap-10">
          <span className="block font-display text-[1.375rem] font-medium leading-[1.15] tracking-[-0.03em] text-page-ink sm:text-[1.75rem] lg:w-[46%] lg:shrink-0 lg:text-[clamp(1.5rem,2.1vw,2.125rem)]">
            {service.title}
          </span>
          <span className="mt-2.5 block max-w-[52ch] text-[0.9375rem] leading-[1.6] text-page-muted lg:mt-0">
            {service.description}
          </span>
        </span>

        {/* Plate reveal — desktop only; on a phone it would crowd the copy. */}
        <span
          aria-hidden
          className="relative hidden h-[4.5rem] w-[5.5rem] shrink-0 translate-x-3 items-center justify-center rounded-[10px] bg-page-ink text-paper opacity-0 transition-all duration-[650ms] ease-expo group-hover:translate-x-0 group-hover:opacity-100 lg:flex"
        >
          <Icon className="h-7 w-7" />
        </span>

        <span
          aria-hidden
          className={cn(
            'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-page-line text-page-ink',
            'transition-all duration-500 ease-expo group-hover:border-page-ink group-hover:bg-page-ink group-hover:text-paper',
          )}
        >
          <IconArrowDiagonal />
        </span>
      </Link>
    </motion.li>
  );
}
