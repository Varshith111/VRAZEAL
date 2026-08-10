import Image from 'next/image';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServicesOverviewRow } from '@/components/services/ServicesOverviewRow';
import { ProblemFirstStatement } from '@/components/services/ProblemFirstStatement';
import { ServiceDetailDeepDive } from '@/components/services/ServiceDetailDeepDive';
import { ScrollServiceCounter } from '@/components/services/ScrollServiceCounter';
import { TechPlusCreativity } from '@/components/services/TechPlusCreativity';
import { HowWeCreateValue } from '@/components/services/HowWeCreateValue';
import { ServicesCta } from '@/components/services/ServicesCta';

/**
 * Completely redesigned VRAZEAL "What We Do" / Services page.
 * Orchestrates a 9-section interactive narrative journey:
 * Hero -> Disciplines Overview & CSS Panels -> Problem First -> 5 Deep-Dive Services ->
 * Scroll Counter -> Tech + Creativity -> Value Architecture -> Services CTA.
 */
export function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-paper text-page-ink selection:bg-accent/20">
      {/* Global Architectural Fixed Watermark */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="relative w-[110vw] h-[50vh] max-w-[1600px] select-none"
          style={{ 
            opacity: 0.035,
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <Image
            src="/logo-wordmark.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 9 Sequential Narrative Sections */}
      <div className="relative z-10">
        <ServicesHero />
        <ServicesOverviewRow />
        <ProblemFirstStatement />
        <ServiceDetailDeepDive />
        <ScrollServiceCounter />
        <TechPlusCreativity />
        <HowWeCreateValue />
        <ServicesCta />
      </div>
    </div>
  );
}
