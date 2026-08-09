import { AboutHero } from '@/components/about/AboutHero';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { WhatWeBuildList } from '@/components/about/WhatWeBuildList';
import { Approach } from '@/components/about/Approach';
import { Process } from '@/components/about/Process';
import { SelectedWork } from '@/components/about/SelectedWork';
import { WhyVrazeal } from '@/components/about/WhyVrazeal';
import { LongRun } from '@/components/about/LongRun';
import { AboutCta } from '@/components/about/AboutCta';

/**
 * The page reads as one argument, in order: who we are → what we build → how we
 * think → how we work → what we have built → why trust us → start a project.
 *
 * Backgrounds alternate paper / surface so neighbouring sections separate
 * without needing extra rules, and the dark band lands late as the page's
 * strongest beat before the close.
 */
export function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <WhatWeBuildList />
      <Approach />
      <Process />
      <SelectedWork />
      <WhyVrazeal />
      <LongRun />
      <AboutCta />
    </>
  );
}
