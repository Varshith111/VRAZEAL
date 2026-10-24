'use client';

import { AutomationSweep } from '@/components/ai/AutomationSweep';
import { SolutionExplorer } from '@/components/ai/SolutionExplorer';
import { ClosingCta } from '@/components/ui/ClosingCta';
import { PageHero } from '@/components/ui/PageHero';
import { StepsLine } from '@/components/ui/StepsLine';
import { aiDelivery } from '@/lib/ai';

export function AiSolutionsPage() {
  return (
    <>
      <PageHero
        label="AI Solutions"
        focus={[0.5, 0.85]}
        title={[
          'Automate the',
          <>
            <span className="accent-serif">repetitive</span>
            <span className="text-accent">.</span>
          </>,
        ]}
        subtitle="We replace manual, time-consuming workflows with AI-powered systems that run reliably — so your team can focus on the work that actually needs a person."
        meta={[
          { label: 'Solutions', value: '08' },
          { label: 'Typical build', value: '6–10 weeks' },
          { label: 'Approach', value: 'Human-in-the-loop' },
        ]}
      />
      <SolutionExplorer />
      <AutomationSweep />
      <StepsLine
        index="03"
        label="How AI projects run"
        title={[
          'Evaluated, not',
          <>
            <span className="accent-serif">guessed</span>
            <span className="text-accent">.</span>
          </>,
        ]}
        aside="AI that cannot prove it is accurate is a liability. Every system we ship is measured against real cases before it touches a customer."
        steps={aiDelivery}
      />
      <ClosingCta
        title={[
          'Find out what',
          <>
            you can <span className="accent-serif">automate</span>
            <span className="text-accent">.</span>
          </>,
        ]}
        eyebrow="Talk to an engineer"
      />
    </>
  );
}
