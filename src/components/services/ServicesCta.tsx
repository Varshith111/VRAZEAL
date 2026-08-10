'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { AboutSection, ease, LineReveal } from '@/components/about/shared';

export function ServicesCta() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="06" label="Engagement" tone="paper">
      <div className="mt-12 py-12 lg:mt-16 lg:py-20">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-8">
            <LineReveal
              className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-page-ink"
              lines={['HAVE A PROBLEM', 'WORTH SOLVING?']}
            />

            <motion.p
              className="mt-8 max-w-[48ch] text-lead leading-[1.6] text-page-muted"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              Tell us what you&apos;re trying to build, improve or automate. We&apos;ll figure out what&apos;s possible.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
            >
              <Button as={Link} href="/contact" size="lg" data-cursor="link">
                START A PROJECT →
              </Button>
              <Button as={Link} href="/about" variant="outline" size="lg" data-cursor="link">
                ABOUT VRAZEAL →
              </Button>
            </motion.div>
          </div>

          <div className="col-span-12 self-end lg:col-span-4 lg:text-right">
            <div className="rounded-2xl border border-page-line bg-surface p-6 font-mono text-xs text-page-muted">
              <span className="block font-semibold text-page-ink">Direct Technical Contact</span>
              <p className="mt-2">Speak directly with engineers and designers, not account managers.</p>
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
