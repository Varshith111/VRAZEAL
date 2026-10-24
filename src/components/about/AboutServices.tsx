'use client';

import Link from 'next/link';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Spotlight } from '@/components/motion/Spotlight';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { capabilityIcons } from '@/components/ui/icons';
import { aboutServices } from '@/lib/about';

/** The five services as a row of lit cards, each leading to its detail. */
export function AboutServices() {
  return (
    <section className="relative bg-void py-section">
      <div className="shell">
        <SectionIntro
          index="03"
          label="What we do"
          title={[
            'Five disciplines,',
            <>
              one <span className="accent-serif">team</span>
              <span className="text-accent">.</span>
            </>,
          ]}
          aside="Engineering, design, branding, AI and growth under one roof — so nothing gets lost between agencies."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5" stagger={0.07}>
          {aboutServices.map((service) => {
            const Icon = capabilityIcons[service.icon];
            return (
              <RevealItem key={service.number} className="h-full" y={30}>
                <Link href={service.href} className="block h-full" data-cursor-label="Open">
                  <Spotlight className="tile flex h-full min-h-[20rem] flex-col justify-between p-6 lg:min-h-[24rem]">
                    <div className="relative z-[2] flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-paper/10 bg-void transition-all duration-700 ease-expo group-hover/spot:rotate-[-8deg] group-hover/spot:border-accent/50 group-hover/spot:text-accent-bright">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-label text-ash">{service.number}</span>
                    </div>
                    <div className="relative z-[2]">
                      <h3 className="font-display text-[1.5rem] font-medium leading-[1.1] tracking-[-0.035em]">{service.title}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-[1.55] text-smoke">{service.description}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] text-accent-bright">
                        <span className="h-px w-4 bg-current transition-all duration-500 ease-expo group-hover/spot:w-8" />
                        Explore
                      </span>
                    </div>
                  </Spotlight>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
