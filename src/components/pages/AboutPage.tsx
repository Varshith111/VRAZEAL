import Image from 'next/image';
import { AboutHero } from '@/components/about/AboutHero';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { VisualSystem } from '@/components/about/VisualSystem';
import { WhatWeDoInteractive } from '@/components/about/WhatWeDoInteractive';
import { HowWeThink } from '@/components/about/HowWeThink';
import { InteractiveProcess } from '@/components/about/InteractiveProcess';
import { SelectedWorkShowcase } from '@/components/about/SelectedWorkShowcase';
import { WhyVrazealHuman } from '@/components/about/WhyVrazealHuman';
import { BrandStatement } from '@/components/about/BrandStatement';
import { FinalStatement } from '@/components/about/FinalStatement';
import { AboutCta } from '@/components/about/AboutCta';

/**
 * Completely redesigned VRAZEAL About page built from scratch.
 * Orchestrates an 11-section narrative journey:
 * Hero -> Who We Are -> The System Equation -> What We Do -> How We Think -> 
 * Process -> Selected Work -> Why VRAZEAL -> Brand Statement -> Final Statement -> CTA.
 */
export function AboutPage() {
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

      {/* 11 Sequential Narrative Sections */}
      <div className="relative z-10">
        <AboutHero />
        <WhoWeAre />
        <VisualSystem />
        <WhatWeDoInteractive />
        <HowWeThink />
        <InteractiveProcess />
        <SelectedWorkShowcase />
        <WhyVrazealHuman />
        <BrandStatement />
        <FinalStatement />
        <AboutCta />
      </div>
    </div>
  );
}
