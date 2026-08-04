import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { ScrollStory } from '@/components/sections/ScrollStory';
import { Stats } from '@/components/sections/Stats';
import { Technology } from '@/components/sections/Technology';
import { Testimonials } from '@/components/sections/Testimonials';
import { Work } from '@/components/sections/Work';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { WhyVrazeal } from '@/components/sections/WhyVrazeal';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <Stats />
      <WhatWeBuild />
      <WhyVrazeal />
      <Process />
      <Work />
      <ScrollStory />
      <Technology />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
