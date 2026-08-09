'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { AboutSection, ease, LineReveal } from './shared';

export function AboutCta() {
  const reduced = useReducedMotion();

  return (
    <AboutSection index="08" label="Start a project" tone="paper">
      <div className="mt-14 grid grid-cols-12 gap-y-12 lg:mt-20 lg:gap-x-16">
        <div className="col-span-12 lg:col-span-7">
          <LineReveal
            className="text-[clamp(2rem,4.8vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.04em] text-page-ink"
            lines={['Have something', 'worth building?']}
          />
          <motion.p
            className="mt-8 max-w-[46ch] text-lead leading-[1.6] text-page-muted"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            Tell us what you&apos;re working on. We&apos;ll figure out what&apos;s possible.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            <Button as={Link} href="/contact" size="lg" data-cursor="link">
              Start a project
            </Button>
            <Button as={Link} href="/projects" variant="outline" size="lg" data-cursor="link">
              See our work
            </Button>
          </motion.div>
        </div>

        {/* Direct line — keeps the right column from sitting empty without
            inventing anything to fill it. */}
        <motion.div
          className="col-span-12 self-end lg:col-span-4 lg:col-start-9"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
        >
          <div className="h-px w-full bg-page-line" />
          <p className="pt-6 font-mono text-label uppercase tracking-[0.16em] text-page-muted">
            Direct
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 flex min-h-[44px] items-center font-display text-[clamp(1.125rem,1.8vw,1.5rem)] font-medium tracking-[-0.03em] text-page-ink"
          >
            <span className="link-underline">{site.email}</span>
          </a>
          <p className="mt-4 max-w-[32ch] text-[0.9375rem] leading-[1.6] text-page-muted">
            You will get a considered reply from an engineer, not a sales sequence.
          </p>
        </motion.div>
      </div>
    </AboutSection>
  );
}
