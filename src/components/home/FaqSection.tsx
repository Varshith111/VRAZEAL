'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MaskText } from '@/components/motion/MaskText';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { faqs } from '@/lib/content';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-void py-section">
      <div className="shell grid grid-cols-12 gap-y-14 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-paper">07</span>
              <span className="h-px w-8 bg-paper/25" />
              Details
            </p>
            <MaskText
              className="mt-8 text-h2 font-medium"
              lines={[
                'Questions,',
                <>
                  <span className="accent-serif">answered</span>
                  <span className="text-accent">.</span>
                </>,
              ]}
            />
            <p className="mt-8 max-w-[34ch] text-[0.9375rem] leading-[1.6] text-smoke">
              Something we have not covered? Write to{' '}
              <a href={`mailto:${site.email}`} className="link-underline text-paper">
                {site.email}
              </a>{' '}
              and an engineer will reply.
            </p>
          </div>
        </div>

        <RevealGroup className="col-span-12 border-t border-hair lg:col-span-7 lg:col-start-6" stagger={0.06}>
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <RevealItem key={faq.q} y={16}>
                <div className="border-b border-hair">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${index}`}
                      className="group flex w-full items-center gap-6 py-7 text-left"
                    >
                      <span className="font-mono text-label text-ash">0{index + 1}</span>
                      <span
                        className={cn(
                          'flex-1 font-display text-[clamp(1.125rem,1.7vw,1.5rem)] font-medium tracking-[-0.025em] transition-colors duration-300',
                          isOpen ? 'text-paper' : 'text-paper/75 group-hover:text-paper',
                        )}
                      >
                        {faq.q}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500',
                          isOpen ? 'border-accent bg-accent text-white' : 'border-paper/15 group-hover:border-paper/40',
                        )}
                      >
                        <span className="absolute h-px w-3.5 bg-current" />
                        <motion.span
                          className="absolute h-3.5 w-px bg-current"
                          animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[60ch] pb-8 pl-12 pr-14 text-[1rem] leading-[1.65] text-smoke">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
