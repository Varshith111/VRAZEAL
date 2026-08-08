'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

const pillars = [
  {
    number: '01',
    title: 'Technology-first thinking',
    body: 'Every engagement starts with architecture. We design systems that are typed, tested, and built to survive the third year — not just the first demo.',
  },
  {
    number: '02',
    title: 'Creative precision',
    body: 'Design is an engineering problem with correct answers. Typography, spacing, motion, and identity are treated with the same rigour as the code beneath them.',
  },
  {
    number: '03',
    title: 'Business outcomes',
    body: 'We measure success by what changes in your business — not by deliverables. Every project starts with a clear definition of what winning looks like.',
  },
  {
    number: '04',
    title: 'Transparent process',
    body: 'Fixed timelines, weekly builds, and no black boxes. You see the product take shape from week one instead of waiting for a reveal.',
  },
];

const capabilities = [
  'Website Development',
  'Custom CRM & Software',
  'AI Solutions & Automations',
  'Branding & Graphic Design',
  'Digital Marketing',
];

export function AboutPage() {
  const reduced = useReducedMotion();

  return (
    <>
      <PageHero
        eyebrow="About VRAZEAL"
        title="Technology and creativity, built for business."
        subtitle="We are a creative and technology agency that helps ambitious businesses grow through custom software, AI-powered systems, and premium digital experiences."
      />

      {/* Mission */}
      <section className="py-section bg-paper">
        <div className="shell">
          <div className="h-px w-full bg-line" />
          <div className="grid grid-cols-12 gap-y-10 pt-14 lg:gap-x-16">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow">
                <span className="mr-3 text-ink">01</span>Our Mission
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <Reveal>
                <p className="text-lead text-muted leading-[1.65] max-w-[58ch]">
                  Most businesses are held back not by ambition, but by the tools they are running on.
                  Spreadsheets masquerading as systems. Websites that do not convert. Processes that
                  require a person to hold them together.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lead text-muted leading-[1.65] max-w-[58ch]">
                  VRAZEAL exists to replace those constraints with software, systems, and brands that
                  are built properly — so the business can grow into them rather than around them.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-section bg-paper">
        <div className="shell">
          <div className="h-px w-full bg-line" />
          <div className="grid grid-cols-12 gap-y-10 pt-14 lg:gap-x-16">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow">
                <span className="mr-3 text-ink">02</span>What We Do
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <Reveal>
                <p className="text-lead text-muted max-w-[52ch]">
                  Five disciplines. One team. Every engagement draws from the full stack.
                </p>
              </Reveal>
              <RevealGroup className="mt-10 space-y-0" stagger={0.05}>
                {capabilities.map((cap, i) => (
                  <RevealItem key={cap}>
                    <div className="flex items-center justify-between border-b border-line py-5 group">
                      <span className="text-[1.125rem] font-medium tracking-[-0.02em]">{cap}</span>
                      <span className="font-mono text-label text-muted">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="py-section bg-paper">
        <div className="shell">
          <div className="h-px w-full bg-line" />
          <div className="pt-14">
            <p className="eyebrow mb-10">
              <span className="mr-3 text-ink">03</span>Our Approach
            </p>
            <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
              {pillars.map((pillar) => (
                <RevealItem key={pillar.number}>
                  <div className="flex flex-col gap-6 rounded-card border border-line p-7 h-full">
                    <span className="font-mono text-label text-accent">{pillar.number}</span>
                    <div>
                      <h3 className="text-[1.125rem] font-medium tracking-[-0.025em] leading-[1.2]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">{pillar.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Why VRAZEAL */}
      <section className="py-section bg-ink text-paper">
        <div className="shell">
          <div className="h-px w-full bg-paper/15" />
          <div className="grid grid-cols-12 gap-y-10 pt-14 lg:gap-x-16">
            <div className="col-span-12 lg:col-span-5">
              <p className="eyebrow text-paper/45">
                <span className="mr-3 text-paper">04</span>Why VRAZEAL
              </p>
              <Reveal>
                <h2 className="mt-8 text-h2 font-medium">
                  Built for the long run, not the pitch.
                </h2>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-center gap-8">
              {[
                'We write every line of code for your business. Nothing is retrofitted from a previous client or built on a template.',
                'We fix the timeline before development starts and publish a live build every week. You always know where the project stands.',
                'We stay after launch. The first thirty days are included. After that, ongoing support is available — but the system is built to run without us.',
              ].map((text, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex gap-5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <p className="text-[1.0625rem] leading-[1.65] text-paper/70">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-paper">
        <div className="shell">
          <div className="h-px w-full bg-line" />
          <div className="pt-14 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <h2 className="text-h2 font-medium max-w-[16ch]">
                Ready to build something that lasts?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-4">
                <Button as={Link} href="/contact" size="lg">
                  Start a project
                </Button>
                <Button as={Link} href="/services" variant="outline" size="lg">
                  See our services
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
