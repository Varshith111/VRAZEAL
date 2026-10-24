'use client';

import Link from 'next/link';
import { ScrubText } from '@/components/motion/ScrubText';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { ServiceStack } from '@/components/services/ServiceStack';
import { ValuePillars } from '@/components/services/ValuePillars';
import { ClosingCta } from '@/components/ui/ClosingCta';
import { PageHero } from '@/components/ui/PageHero';
import { serviceDetails } from '@/lib/content';

export function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={[
          'Everything you',
          <>
            need to <span className="accent-serif">build</span>,
          </>,
          <>
            launch and grow<span className="text-accent">.</span>
          </>,
        ]}
        subtitle="Five disciplines, one team. Pick one, or let them work together — the strategy, the interface and the system are designed as one."
        meta={[
          { label: 'Disciplines', value: '05' },
          { label: 'Typical timeline', value: '4–16 weeks' },
          { label: 'Pricing', value: 'Fixed per phase' },
        ]}
      />

      {/* Thesis + jump index */}
      <section className="relative bg-void py-section">
        <div className="shell grid grid-cols-12 gap-y-14">
          <div className="col-span-12 lg:col-span-2">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-paper">01</span>
              <span className="h-px w-8 bg-paper/25" />
              Approach
            </p>
          </div>
          <ScrubText
            text="Most businesses do not need more software. They need the *right* software — designed around how they actually work, built to last, and owned by them."
            className="col-span-12 font-display text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.035em] lg:col-span-10"
          />

          <RevealGroup className="col-span-12 mt-6 grid grid-cols-1 border-t border-hair sm:grid-cols-2 lg:col-span-10 lg:col-start-3 lg:grid-cols-5" stagger={0.06}>
            {serviceDetails.map((service) => (
              <RevealItem key={service.id} y={16}>
                <Link
                  href={`#${service.id}`}
                  className="group flex h-full flex-col justify-between gap-6 border-b border-hair py-6 pr-4 transition-colors duration-500 hover:text-accent-bright lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0"
                >
                  <span className="font-mono text-label text-ash">{service.number}</span>
                  <span className="flex items-end justify-between gap-3 text-[1.0625rem] font-medium leading-snug tracking-[-0.015em]">
                    {service.title}
                    <span aria-hidden className="translate-y-1 text-ash transition-transform duration-500 ease-expo group-hover:translate-y-0 group-hover:text-accent-bright">
                      ↓
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className="shell pb-10">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-paper">02</span>
          <span className="h-px w-8 bg-paper/25" />
          The services
        </p>
      </div>
      <ServiceStack />
      <ValuePillars />
      <ClosingCta
        title={[
          'Not sure which',
          <>
            you <span className="accent-serif">need</span>?
          </>,
          <>
            Ask us<span className="text-accent">.</span>
          </>,
        ]}
      />
    </>
  );
}
