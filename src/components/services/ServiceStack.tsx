'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { CapabilityVisual } from '@/components/sections/CapabilityVisuals';
import { serviceDetails, type ServiceDetail } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

/**
 * The five services as a deck of cards. On desktop each card pins and the
 * next slides up over it, while the ones underneath shrink and dim — so you
 * always see how far through the deck you are.
 */
export function ServiceStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px) and (min-height: 700px)');
  const reduced = useReducedMotion();
  const stacked = isDesktop && !reduced;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section aria-label="Services" className="relative bg-void pb-section">
      <div ref={ref} className="shell">
        {serviceDetails.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            total={serviceDetails.length}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  total,
  progress,
  stacked,
}: {
  service: ServiceDetail;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, Math.min(1, (index + 1) / total)], [0, index === total - 1 ? 0 : 0.55]);

  const card = (
    <article className="relative overflow-hidden rounded-[28px] border border-paper/10 bg-carbon shadow-[0_-30px_80px_-30px_var(--shadow-c)]">
      {/* Each card carries its own pool of light. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 70% at ${index % 2 ? '10%' : '90%'} 0%, rgba(10,132,255,0.14), transparent 70%)`,
        }}
      />
      <div className="relative grid grid-cols-12 gap-y-10 p-7 sm:p-10 lg:gap-x-12 lg:p-12">
        <div className="col-span-12 flex flex-col lg:col-span-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-[3.5rem] font-medium leading-none tracking-[-0.06em] text-outline lg:text-[4.5rem]">
              {service.number}
            </span>
            <span className="h-px w-10 bg-paper/20" />
            <span className="font-mono text-label uppercase text-accent-bright">{service.title}</span>
          </div>

          <h2 className="mt-8 max-w-[18ch] font-display text-[clamp(1.875rem,3.4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            {service.headline}
          </h2>
          <p className="mt-5 max-w-[48ch] text-[1rem] leading-[1.65] text-smoke">{service.explain}</p>

          <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {service.capabilities.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-hair pb-3 text-[0.9375rem] text-paper">
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent shadow-[0_0_6px_#0A84FF]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
            {service.outcomes.map((outcome) => (
              <span
                key={outcome}
                className="rounded-pill border border-paper/10 bg-paper/[0.03] px-3.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke"
              >
                {outcome}
              </span>
            ))}
            {service.cta && (
              <Link href={service.cta.href} className="link-underline ml-auto py-2 text-[0.9375rem] text-accent-bright">
                {service.cta.label} →
              </Link>
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="h-[clamp(16rem,40vh,26rem)] overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_30px_80px_-40px_rgba(10,132,255,0.5)] lg:h-full lg:min-h-[24rem]">
            <CapabilityVisual id={service.visual} />
          </div>
        </div>
      </div>
      {stacked && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-void" style={{ opacity: dim }} />
      )}
    </article>
  );

  if (!stacked) {
    return (
      <div id={service.id} className="scroll-mt-28 pt-6 first:pt-0">
        <Reveal>{card}</Reveal>
      </div>
    );
  }

  return (
    <div id={service.id} className="sticky top-0 flex h-screen scroll-mt-0 items-center">
      <motion.div
        className={cn('w-full origin-top')}
        style={{ scale, top: `${index * 22}px`, position: 'relative' }}
      >
        {card}
      </motion.div>
    </div>
  );
}
