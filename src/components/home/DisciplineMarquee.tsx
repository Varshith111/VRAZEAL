'use client';

import { VelocityMarquee } from '@/components/motion/VelocityMarquee';
import { cn } from '@/lib/utils';

const DISCIPLINES = ['Websites', 'Custom CRM', 'Business Software', 'AI Automation', 'Brand Identity', 'Creative Content'];

/** Four-point star used as the separator — the brand's one ornament. */
export function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('h-[0.42em] w-[0.42em] shrink-0', className)}>
      <path
        d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * The disciplines, set huge and alternating solid / outline, sliding past in
 * two opposed rows that react to how fast the reader scrolls.
 */
export function DisciplineMarquee() {
  return (
    <section aria-label="Disciplines" className="relative overflow-hidden border-y border-hair bg-void py-10 sm:py-14">
      <VelocityMarquee baseVelocity={-1.6} className="mask-fade-x">
        {DISCIPLINES.map((item, index) => (
          <span
            key={item}
            className="flex items-center gap-[0.5em] pr-[0.5em] font-display text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[1.05] tracking-[-0.045em]"
          >
            <span className={index % 2 ? 'text-outline' : 'text-paper'}>{item}</span>
            <Spark className="text-accent" />
          </span>
        ))}
      </VelocityMarquee>
      <VelocityMarquee baseVelocity={1.2} className="mask-fade-x mt-2 sm:mt-3">
        {DISCIPLINES.map((item, index) => (
          <span
            key={item}
            className="flex items-center gap-[0.6em] pr-[0.6em] font-serif text-[clamp(1.75rem,3.6vw,3.25rem)] italic leading-[1.1] tracking-[-0.02em]"
          >
            <span className={index % 2 ? 'text-paper/80' : 'text-ash'}>{item}</span>
            <span aria-hidden className="h-px w-[1.2em] bg-paper/20" />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
