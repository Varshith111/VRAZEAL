import { Capabilities } from '@/components/home/Capabilities';
import { DisciplineMarquee } from '@/components/home/DisciplineMarquee';
import { FaqSection } from '@/components/home/FaqSection';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { HomeHero } from '@/components/home/HomeHero';
import { Manifesto } from '@/components/home/Manifesto';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { TechStack } from '@/components/home/TechStack';
import { WhyBento } from '@/components/home/WhyBento';
import { ClosingCta } from '@/components/ui/ClosingCta';
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ScrollProgress />
      <HomeHero />
      <DisciplineMarquee />
      <Manifesto />
      <Capabilities />
      <FeaturedWork />
      <ProcessSteps />
      <WhyBento />
      <TechStack />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
