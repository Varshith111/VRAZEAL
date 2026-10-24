'use client';

import { MaskText } from '@/components/motion/MaskText';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { aboutReasons } from '@/lib/about';

/** Sticky thesis on the left, five reasons that light up on hover on the right. */
export function ReasonsList() {
  return (
    <section className="relative bg-void py-section">
      <div className="shell grid grid-cols-12 gap-y-14 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-paper">05</span>
              <span className="h-px w-8 bg-paper/25" />
              Why VRAZEAL
            </p>
            <MaskText
              className="mt-8 text-h2 font-medium"
              lines={[
                'What working',
                <>
                  with us <span className="accent-serif">feels</span> like
                  <span className="text-accent">.</span>
                </>,
              ]}
            />
          </div>
        </div>

        <RevealGroup className="col-span-12 border-t border-hair lg:col-span-7" stagger={0.07}>
          {aboutReasons.map((reason, index) => (
            <RevealItem key={reason.title} y={18}>
              <div className="group relative overflow-hidden border-b border-hair">
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent/[0.12] to-transparent transition-transform duration-700 ease-expo group-hover:scale-x-100"
                />
                <div className="relative flex items-baseline gap-6 py-8 transition-[padding] duration-700 ease-expo group-hover:pl-4">
                  <span className="font-mono text-label text-ash transition-colors group-hover:text-accent-bright">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium tracking-[-0.04em]">
                      {reason.title}
                    </h3>
                    <p className="mt-2 max-w-[48ch] text-[0.9375rem] leading-[1.6] text-smoke">{reason.body}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
