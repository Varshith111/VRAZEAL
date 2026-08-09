'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { aboutCommitments } from '@/lib/about';
import { AboutSection, ease, LineReveal } from './shared';

/**
 * The page's dark beat. Display-scale type on ink, with the three commitments
 * ruled beneath it and a hairline that tracks scroll across the section — the
 * only scroll-linked motion on the page, kept to a single transform.
 */
export function LongRun() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <AboutSection index="07" label="Built for the long run" tone="ink">
      <div ref={ref} className="mt-14 lg:mt-20">
        <LineReveal
          className="text-[clamp(2rem,5.2vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-paper"
          lines={["We don't build projects to launch."]}
        />
        <LineReveal
          className="text-[clamp(2rem,5.2vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-paper/45"
          lines={['We build systems to last.']}
          delay={0.14}
        />

        <div className="relative mt-16 h-px w-full bg-paper/15 lg:mt-24">
          <motion.span
            aria-hidden
            className="absolute inset-y-0 left-0 block bg-paper"
            style={reduced ? { width: '100%' } : { width }}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-10 pt-12 sm:grid-cols-3 sm:gap-x-10 lg:pt-16">
          {aboutCommitments.map((item, index) => (
            <motion.div
              key={item.number}
              initial={reduced ? undefined : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.85, delay: index * 0.12, ease }}
            >
              <span className="font-mono text-label text-paper/35">{item.number}</span>
              <p className="mt-5 max-w-[26ch] font-display text-[clamp(1.25rem,1.9vw,1.625rem)] font-medium leading-[1.22] tracking-[-0.028em] text-paper/90">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
