'use client';

import { Counter } from '@/components/motion/Counter';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Section } from '@/components/ui/Section';
import { stats } from '@/lib/content';

export function Stats() {
  return (
    <Section id="trust" index="01" label="Proof" meta="Numbers, not logos">
      <div className="shell mt-14 lg:mt-20">
        <RevealGroup className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="group relative border-b border-line px-0 py-9 sm:px-7 lg:border-l lg:first:border-l-0 lg:py-12"
            >
              {/* Accent rule that draws in on hover. */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-expo group-hover:w-full"
              />
              <p className="font-display text-[clamp(3.25rem,7vw,5.5rem)] font-medium leading-[0.85] tracking-[-0.05em]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-6 text-[1.0625rem] font-medium tracking-[-0.015em]">{stat.label}</p>
              <p className="mt-1.5 text-[0.9375rem] text-muted">{stat.note}</p>
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
