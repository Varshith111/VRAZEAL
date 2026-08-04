'use client';

import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { TiltCard } from '@/components/motion/TiltCard';
import { Section } from '@/components/ui/Section';
import { capabilityIcons, IconPlus } from '@/components/ui/icons';
import { capabilities } from '@/lib/content';

export function WhatWeBuild() {
  return (
    <Section id="build" index="02" label="Capabilities" meta="Six practices, one team">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <h2 className="col-span-12 text-h2 font-medium lg:col-span-7">
            <SplitText text="What we build" />
          </h2>
          <p className="col-span-12 max-w-prose text-lead text-muted lg:col-span-5">
            Six disciplines that usually live in six different companies. Keeping them under one roof
            is why the strategy, the interface, and the database agree with each other.
          </p>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
          {capabilities.map((capability) => {
            const Icon = capabilityIcons[capability.id as keyof typeof capabilityIcons];
            return (
              <RevealItem key={capability.id} className="h-full">
                <TiltCard className="h-full" max={4}>
                  <article
                    data-cursor="link"
                    className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper p-7 transition-[transform,border-color,box-shadow] duration-500 ease-expo will-change-transform hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.28)] lg:p-8"
                  >
                    <div className="relative z-10 flex items-start justify-between">
                      <Icon className="h-7 w-7 transition-colors duration-500 group-hover:text-accent" />
                      <span className="font-mono text-label text-muted">{capability.index}</span>
                    </div>

                    <h3 className="relative z-10 mt-14 text-[1.5rem] font-medium tracking-[-0.03em]">
                      {capability.title}
                    </h3>
                    <p className="relative z-10 mt-2 text-[1.0625rem] tracking-[-0.012em]">
                      {capability.summary}
                    </p>
                    <p className="relative z-10 mt-3 text-[0.9375rem] leading-[1.6] text-muted">
                      {capability.detail}
                    </p>

                    <ul className="relative z-10 mt-7 flex flex-wrap gap-1.5 pt-6">
                      {capability.deliverables.map((item) => (
                        <li
                          key={item}
                          className="rounded-pill border border-line px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted transition-colors duration-500 group-hover:border-accent/25 group-hover:text-ink"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Sits at the bottom of the card, revealed on hover. */}
                    <span
                      aria-hidden
                      className="absolute bottom-7 right-7 z-10 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <IconPlus />
                    </span>
                  </article>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
