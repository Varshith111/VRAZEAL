'use client';

import { AboutServices } from '@/components/about/AboutServices';
import { PrincipleRows } from '@/components/about/PrincipleRows';
import { ReasonsList } from '@/components/about/ReasonsList';
import { Spark } from '@/components/home/DisciplineMarquee';
import { ScrubText } from '@/components/motion/ScrubText';
import { VelocityMarquee } from '@/components/motion/VelocityMarquee';
import { ClosingCta } from '@/components/ui/ClosingCta';
import { PageHero } from '@/components/ui/PageHero';
import { StepsLine } from '@/components/ui/StepsLine';
import { aboutCommitments, aboutProcess } from '@/lib/about';

export function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        focus={[0.25, 0.8]}
        title={[
          'A small team',
          <>
            with <span className="accent-serif">big</span> standards
            <span className="text-accent">.</span>
          </>,
        ]}
        subtitle="VRAZEAL is a creative and technology agency. We combine engineering, design, branding and AI in one team — so the thing you imagine is the thing that ships."
        meta={[
          { label: 'Disciplines', value: '05' },
          { label: 'Model', value: 'One team, end to end' },
          { label: 'Focus', value: 'Websites · Software · AI' },
        ]}
      />

      {/* Manifesto */}
      <section className="relative bg-void py-section">
        <div className="shell grid grid-cols-12 gap-y-10">
          <div className="col-span-12 lg:col-span-2">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-paper">01</span>
              <span className="h-px w-8 bg-paper/25" />
              Who we are
            </p>
          </div>
          <ScrubText
            text="We believe technology should *serve* the business — not the other way round. So we start with the problem, design the experience, engineer the system, and stay long after launch to make sure it keeps *working*."
            className="col-span-12 font-display text-[clamp(1.75rem,3.7vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.035em] lg:col-span-10"
          />
        </div>
      </section>

      <PrincipleRows />
      <AboutServices />

      <StepsLine
        index="04"
        label="How we work"
        title={[
          'From first call',
          <>
            to <span className="accent-serif">scale</span>
            <span className="text-accent">.</span>
          </>,
        ]}
        aside="The same six phases on every engagement, so you always know where the work is and what comes next."
        steps={aboutProcess}
      />

      <ReasonsList />

      {/* Commitments band */}
      <section aria-label="Our commitments" className="border-y border-hair bg-void py-12">
        <VelocityMarquee baseVelocity={-1.2} className="mask-fade-x">
          {aboutCommitments.map((item) => (
            <span
              key={item.number}
              className="flex items-center gap-[0.6em] pr-[0.6em] font-display text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.1] tracking-[-0.045em]"
            >
              <span className="font-mono text-[0.25em] tracking-normal text-ash">{item.number}</span>
              {item.text}
              <Spark className="text-accent" />
            </span>
          ))}
        </VelocityMarquee>
      </section>

      <ClosingCta />
    </>
  );
}
