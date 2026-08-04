'use client';

import { Counter } from '@/components/motion/Counter';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Section } from '@/components/ui/Section';
import { stats } from '@/lib/content';

export function Stats() {
  return (
    <Section id="trust" index="01" label="Proof" meta="Numbers, not logos">
      <div className="shell mt-14 lg:mt-20">
        {/* Five metrics: 2-up on phones and tablets with the last spanning the
            full row so nothing orphans, then a single row of five on desktop. */}
        <RevealGroup className="grid grid-cols-2 border-t border-line lg:grid-cols-5">
          {stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="group relative border-b border-line py-8 pr-5 [&:last-child]:col-span-2 sm:py-9 md:pr-7 lg:border-l lg:py-12 lg:pl-7 lg:pr-6 lg:first:border-l-0 lg:first:pl-0 lg:[&:last-child]:col-span-1"
            >
              {/* Accent rule that draws in on hover. */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-expo group-hover:w-full"
              />
              <p className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[0.85] tracking-[-0.05em]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-5 text-[1rem] font-medium tracking-[-0.015em] lg:mt-6">{stat.label}</p>
              <p className="mt-1.5 text-[0.875rem] leading-[1.5] text-muted lg:text-[0.9375rem]">
                {stat.note}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-10 max-w-prose text-[0.9375rem] text-muted">
          Every engagement is scoped, priced, and delivered by the same people who write the code —
          no account layer between you and the build.
        </p>
      </div>
    </Section>
  );
}
