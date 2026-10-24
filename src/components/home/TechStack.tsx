'use client';

import { VelocityMarquee } from '@/components/motion/VelocityMarquee';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { technologies } from '@/lib/content';
import { Spark } from './DisciplineMarquee';

/** Two opposed rows of the stack, drifting and reacting to scroll speed. */
export function TechStack() {
  const half = Math.ceil(technologies.length / 2);
  const rows = [technologies.slice(0, half), technologies.slice(half)];

  return (
    <section id="stack" className="relative overflow-hidden bg-void py-section">
      <div className="shell">
        <SectionIntro
          index="07"
          label="Stack"
          title={[
            'Tools chosen',
            <>
              to <span className="accent-serif">last</span>
              <span className="text-accent">.</span>
            </>,
          ]}
          aside="Boring where boring is correct, modern where it earns its place. Technology you can still hire for in five years."
        />
      </div>

      <div className="mt-16 space-y-4 lg:mt-20">
        {rows.map((row, rowIndex) => (
          <VelocityMarquee key={rowIndex} baseVelocity={rowIndex === 0 ? -1.4 : 1.4} skew={false} className="mask-fade-x">
            {row.map((tech) => (
              <span
                key={tech.name}
                className="group mr-4 flex items-center gap-5 rounded-[18px] border border-hair bg-carbon py-6 pl-6 pr-9 transition-colors duration-500 hover:border-accent/40 hover:bg-accent/[0.06]"
              >
                <Spark className="h-4 w-4 text-paper/25 transition-[color,transform] duration-700 ease-expo group-hover:rotate-90 group-hover:text-accent" />
                <span>
                  <span className="block whitespace-nowrap font-display text-[clamp(1.375rem,2vw,1.75rem)] font-medium leading-tight tracking-[-0.035em]">
                    {tech.name}
                  </span>
                  <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ash">{tech.category}</span>
                </span>
              </span>
            ))}
          </VelocityMarquee>
        ))}
      </div>
    </section>
  );
}
