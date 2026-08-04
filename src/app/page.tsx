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
import { faqs } from '@/lib/content';

/** Lets the practical questions surface directly in search results. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
