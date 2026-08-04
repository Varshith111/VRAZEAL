'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { principles } from '@/lib/content';

export function WhyVrazeal() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="approach" index="03" label="Approach" meta="Why teams choose us">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-10">
          {/* Sticky thesis. */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+3.5rem)]">
              <h2 className="text-h2 font-medium">
                <SplitText text="Built properly," />
                <span className="block text-muted">
                  <SplitText text="the first time." delay={0.12} />
                </span>
              </h2>
              <p className="mt-7 max-w-[42ch] text-lead text-muted">
                Most agencies optimise for the pitch. We optimise for the third year — when the team
                has doubled, the requirements have changed, and the software still has to hold.
              </p>

              <div className="mt-9 space-y-4 border-t border-line pt-8">
                <p className="max-w-[40ch] text-[0.9375rem] text-muted">
                  If any of the seven below are not true of your current stack, that is usually the
                  conversation worth having.
                </p>
                <Button as="a" href="#contact" variant="outline" size="md" data-cursor="link">
                  Book a technical call
                </Button>
              </div>
            </div>
          </div>

          {/* Feature rows. */}
          <RevealGroup className="col-span-12 lg:col-span-7" stagger={0.06}>
            <div className="border-t border-line">
              {principles.map((principle, index) => (
                <RevealItem key={principle.title} y={18}>
                  <div
                    onMouseEnter={() => setActive(index)}
                    onMouseLeave={() => setActive(null)}
                    className="group relative cursor-default overflow-hidden border-b border-line"
                  >
                    {/* Wipe fill on hover. */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 origin-left bg-[#FAFAFA]"
                      initial={false}
                      animate={{ scaleX: active === index ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="relative flex items-baseline gap-5 px-1 py-7 transition-[padding] duration-500 ease-expo group-hover:pl-5 sm:gap-8">
                      <span className="w-8 shrink-0 font-mono text-label text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <h3 className="text-[1.375rem] font-medium tracking-[-0.028em]">
                            {principle.title}
                          </h3>
                          <span
                            className={`font-mono text-label transition-colors duration-500 ${
                              active === index ? 'text-accent' : 'text-muted'
                            }`}
                          >
                            {principle.metric}
                          </span>
                        </div>
                        <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-[1.6] text-muted">
                          {principle.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
