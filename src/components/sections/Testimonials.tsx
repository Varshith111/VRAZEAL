'use client';

import { motion } from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Section } from '@/components/ui/Section';
import { testimonials } from '@/lib/content';

export function Testimonials() {
  return (
    <Section id="clients" index="08" label="Clients" meta="In their words">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <h2 className="col-span-12 text-h2 font-medium lg:col-span-7">
            <SplitText text="What they said after" />
          </h2>
          <p className="col-span-12 max-w-prose text-lead text-muted lg:col-span-5">
            Lifted from real conversations — the messages that arrived once the work was live and the
            novelty had worn off.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-12">
          <div className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3">
            <RevealGroup className="space-y-12" stagger={0.1}>
              {testimonials.map((testimonial) => (
                <RevealItem key={testimonial.id} y={24}>
                  <div className="space-y-2.5">
                    {/* Client side */}
                    <div className="flex items-start gap-3.5">
                      <span
                        aria-hidden
                        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[0.625rem] tracking-[0.06em] text-muted"
                      >
                        {testimonial.initials}
                      </span>

                      <div className="min-w-0 flex-1 space-y-2">
                        <p className="text-[0.8125rem] text-muted">
                          <span className="font-medium text-ink">{testimonial.author}</span>
                          <span className="mx-2 text-line">·</span>
                          {testimonial.role}, {testimonial.company}
                        </p>

                        {testimonial.messages.map((message, index) => (
                          <div
                            key={index}
                            className="w-fit max-w-[60ch] rounded-[20px] rounded-tl-[6px] bg-[#F4F5F7] px-5 py-3.5 text-[1rem] leading-[1.55] tracking-[-0.011em] transition-colors duration-500 hover:bg-[#EFF0F3]"
                          >
                            {message}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Our reply */}
                    {testimonial.reply && (
                      <div className="flex justify-end pl-12">
                        <div className="w-fit max-w-[52ch] rounded-[20px] rounded-br-[6px] bg-ink px-5 py-3.5 text-[1rem] leading-[1.55] tracking-[-0.011em] text-paper">
                          {testimonial.reply}
                        </div>
                      </div>
                    )}
                  </div>
                </RevealItem>
              ))}

              {/* The thread ends on an open invitation. */}
              <RevealItem y={20}>
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.5625rem] tracking-[0.06em] text-paper"
                  >
                    You
                  </span>
                  <a
                    href="#contact"
                    data-cursor="link"
                    className="group flex items-center gap-3 rounded-[20px] rounded-tl-[6px] border border-dashed border-line px-5 py-3.5 text-[1rem] text-muted transition-colors duration-500 hover:border-accent/40 hover:text-ink"
                  >
                    <span className="flex gap-1" aria-hidden>
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="block h-1.5 w-1.5 rounded-full bg-muted"
                          animate={{ opacity: [0.25, 1, 0.25] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: dot * 0.18,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </span>
                    Start the conversation
                  </a>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}
