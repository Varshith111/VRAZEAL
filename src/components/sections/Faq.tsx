'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Section } from '@/components/ui/Section';
import { faqs } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" index="09" label="Details" meta="Answered before you ask">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-h2 font-medium">
              <SplitText text="The practical" />
              <span className="block text-muted">
                <SplitText text="questions." delay={0.1} />
              </span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <RevealGroup className="border-t border-line" stagger={0.06}>
              {faqs.map((faq, index) => {
                const isOpen = open === index;
                return (
                  <RevealItem key={faq.q} y={18} className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span className="text-[1.125rem] font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent sm:text-[1.25rem]">
                          {faq.q}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500',
                            isOpen ? 'border-ink bg-ink text-paper' : 'border-line text-ink',
                          )}
                        >
                          <span className="absolute h-px w-3 bg-current" />
                          <motion.span
                            className="absolute h-3 w-px bg-current"
                            animate={{ scaleY: isOpen ? 0 : 1 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${index}`}
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] pb-7 pr-12 text-[0.9375rem] leading-[1.65] text-muted">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}
