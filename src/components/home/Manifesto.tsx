'use client';

import { Counter } from '@/components/motion/Counter';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { ScrubText } from '@/components/motion/ScrubText';
import { stats } from '@/lib/content';

const STATEMENT =
  'VRAZEAL is a creative and technology studio. We design and engineer *websites,* *software* and *AI* *systems* for businesses that refuse to settle for templates — one small team that owns the work from the first conversation to the last deploy, and stays for what comes after.';

/** The thesis, read by scrolling, followed by the numbers that back it. */
export function Manifesto() {
  return (
    <section id="manifesto" className="relative scroll-mt-10 bg-void py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 opacity-60"
        style={{ background: 'radial-gradient(50% 50% at 50% 0%, rgba(10,132,255,0.12), transparent 70%)' }}
      />

      <div className="shell relative">
        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 lg:col-span-2">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-paper">01</span>
              <span className="h-px w-8 bg-paper/25" />
              Studio
            </p>
          </div>
          <ScrubText
            text={STATEMENT}
            className="col-span-12 font-display text-[clamp(1.75rem,3.7vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.035em] lg:col-span-10"
          />
        </div>

        <RevealGroup className="mt-24 grid grid-cols-2 border-t border-hair lg:mt-32 lg:grid-cols-5" stagger={0.08}>
          {stats.map((stat, index) => (
            <RevealItem
              key={stat.label}
              className={`group relative border-b border-hair py-9 pr-4 lg:border-b-0 lg:py-12 lg:pl-7 ${
                index > 0 ? 'lg:border-l' : ''
              } ${index % 2 === 1 ? 'border-l pl-5 lg:pl-7' : ''}`}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-accent shadow-[0_0_12px_#0A84FF] transition-[width] duration-700 ease-expo group-hover:w-full"
              />
              <p className="font-display text-[clamp(2.75rem,5vw,4.75rem)] font-medium leading-[0.85] tracking-[-0.055em]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-5 text-[0.9375rem] font-medium tracking-[-0.01em] text-paper">{stat.label}</p>
              <p className="mt-1 text-[0.8125rem] text-ash">{stat.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
