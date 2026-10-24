'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { projects } from '@/lib/content';
import { ScreensRail } from './ScreensRail';

const project = projects[0];

/**
 * The flagship case study, staged as a scroll sequence: the project's name
 * sits centred with a small window of the live site between its halves; as
 * you scroll the window opens to fill the screen, the name parts to let it
 * through, and the case-study facts settle over the bottom of the frame.
 */
export function FeaturedWork() {
  return (
    <section id="work" className="relative scroll-mt-10 bg-void pt-section">
      <div className="shell">
        <SectionIntro
          index="03"
          label="Selected work"
          title={[
            'Work that',
            <>
              <span className="accent-serif">ships</span>
              <span className="text-accent">.</span>
            </>,
          ]}
          aside="Real products, live in production, used by real customers. Here is one of them, from the storefront to the admin portal behind it."
        />
      </div>

      <ZoomReveal />
      <ScreensRail project={project} perGroup={3} title="A look inside the build." />
    </section>
  );
}

function ZoomReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  if (reduced) return <StaticFeature />;

  return (
    <div ref={ref} className="relative mt-16 h-[280vh] lg:mt-24">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <SplitName progress={scrollYProgress} />
        <OpeningFrame progress={scrollYProgress} />
        <FactsOverlay progress={scrollYProgress} />
      </div>
    </div>
  );
}

function SplitName({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(progress, [0, 0.55], ['0vw', '-30vw']);
  const right = useTransform(progress, [0, 0.55], ['0vw', '30vw']);
  const opacity = useTransform(progress, [0.25, 0.55], [1, 0]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[32vw] font-display text-mega font-medium"
      style={{ opacity }}
    >
      <motion.span className="block" style={{ x: left }}>
        Fly
      </motion.span>
      <motion.span className="accent-serif block" style={{ x: right }}>
        meds
      </motion.span>
    </motion.div>
  );
}

function OpeningFrame({ progress }: { progress: MotionValue<number> }) {
  const inset = useTransform(progress, [0.04, 0.58], [36, 0]);
  const insetX = useTransform(progress, [0.04, 0.58], [35, 0]);
  const radius = useTransform(progress, [0.04, 0.58], [20, 0]);
  const clipPath = useTransform(
    [inset, insetX, radius],
    ([y, x, r]) => `inset(${y}% ${x}% ${y}% ${x}% round ${r}px)`,
  );
  // Counter-zoom: the image settles as its window opens.
  const scale = useTransform(progress, [0.04, 0.7], [1.35, 1]);
  const drift = useTransform(progress, [0.55, 1], ['0%', '-6%']);

  return (
    <motion.div className="absolute inset-0" style={{ clipPath }}>
      <motion.div className="absolute inset-0" style={{ scale, y: drift }}>
        <Image
          src={project.screens?.[0]?.src ?? '/work/flymeds/home.webp'}
          alt={project.screens?.[0]?.alt ?? project.client}
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}

function FactsOverlay({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.6, 0.78], [0, 1]);
  const y = useTransform(progress, [0.6, 0.85], [60, 0]);
  const shade = useTransform(progress, [0.5, 0.75], [0, 1]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void from-10% via-void/90 via-40% to-void/10"
        style={{ opacity: shade }}
      />
      <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity, y }}>
        <Facts />
      </motion.div>
    </>
  );
}

function Facts() {
  return (
    <div className="shell pb-10 lg:pb-14">
      <div className="grid grid-cols-12 items-end gap-y-8">
        <div className="col-span-12 lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-smoke">
            <span className="rounded-pill border border-accent/40 bg-accent/10 px-2.5 py-1 text-accent-bright">
              {project.status ?? 'Live'}
            </span>
            {project.sector} · {project.year}
          </p>
          <h3 className="mt-5 max-w-[22ch] font-display text-[clamp(1.75rem,3.4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.04em]">
            {project.title}
          </h3>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button as={Link} href="/projects" size="md">
              Read the case study
            </Button>
            {project.url && (
              <Button as="a" href={project.url} target="_blank" rel="noopener noreferrer" variant="ghost" size="md" icon={<span aria-hidden>↗</span>}>
                Visit {project.url.replace(/^https?:\/\/(www\.)?/, '')}
              </Button>
            )}
          </div>
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-6 border-t border-hair pt-6 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {project.outcome.map((item) => (
            <div key={item.label}>
              <p className="font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-medium leading-none tracking-[-0.05em]">
                {item.value}
              </p>
              <p className="mt-2 text-[0.8125rem] leading-snug text-smoke">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticFeature() {
  return (
    <div className="relative mt-16">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={project.screens?.[0]?.src ?? '/work/flymeds/home.webp'}
          alt={project.screens?.[0]?.alt ?? project.client}
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent" />
      </div>
      <div className="relative -mt-40">
        <Facts />
      </div>
    </div>
  );
}
