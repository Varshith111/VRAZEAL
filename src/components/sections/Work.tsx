'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { IconArrowDiagonal } from '@/components/ui/icons';
import { ProjectVisual } from './ProjectVisuals';
import { projects, type Project } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

export function Work() {
  const stackRef = useRef<HTMLDivElement>(null);
  const canStack = useMediaQuery('(min-width: 1024px) and (min-height: 720px)');
  const reduced = useReducedMotion();
  const stacked = canStack && !reduced;

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  return (
    <Section id="work" index="05" label="Selected work" meta="Four of twenty-five">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <h2 className="col-span-12 text-h2 font-medium lg:col-span-7">
            <SplitText text="Work that had to hold up" />
          </h2>
          <p className="col-span-12 max-w-prose text-lead text-muted lg:col-span-5">
            Each of these replaced something the business had outgrown. The interesting part is never
            the launch — it is what the numbers did ninety days later.
          </p>
        </div>
      </div>

      {/* Desktop: panels pin and stack. Elsewhere: an ordinary, readable column. */}
      <div ref={stackRef} className={cn('shell mt-16 lg:mt-24', !stacked && 'space-y-6')}>
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
      </div>

      <div className="shell mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10 lg:mt-24">
        <p className="max-w-[38ch] text-lead text-muted">
          The rest of the portfolio is under NDA. Happy to walk you through it on a call.
        </p>
        <Button as="a" href="#contact" variant="outline" data-cursor="link">
          Request the full portfolio
        </Button>
      </div>
    </Section>
  );
}

function ProjectPanel({
  project,
  index,
  total,
  progress,
  stacked,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const isLast = index === total - 1;
  const span = 1 / Math.max(1, total - 1);
  // Each panel is covered by the next one over exactly one screen of scroll.
  const start = index * span;
  const end = start + span;

  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.93], { clamp: true });
  const opacity = useTransform(progress, [start, end], [1, isLast ? 1 : 0.5], { clamp: true });
  const visualY = useTransform(progress, [start, end], [0, isLast ? 0 : -18], { clamp: true });

  return (
    <div
      className={cn(
        stacked && 'sticky flex min-h-[100svh] items-center',
      )}
      style={stacked ? { top: `calc(var(--nav-h) + ${0.75 + index * 0.6}rem)` } : undefined}
    >
      <motion.article
        style={stacked ? { scale, opacity } : undefined}
        className="w-full origin-top overflow-hidden rounded-card border border-line bg-paper shadow-[0_40px_90px_-70px_rgba(0,0,0,0.5)]"
      >
        <div className="grid grid-cols-12 gap-y-9 p-7 lg:gap-x-10 lg:p-10">
          <div className="col-span-12 flex flex-col lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-label text-muted">
                {String(index + 1).padStart(2, '0')} / {project.sector}
              </span>
              <span className="font-mono text-label text-muted">{project.year}</span>
            </div>

            <p className="mt-7 text-[0.9375rem] font-medium tracking-[-0.01em]">{project.client}</p>
            <h3 className="mt-2 font-display text-[clamp(1.625rem,2.7vw,2.375rem)] font-medium leading-[1.08] tracking-[-0.035em]">
              {project.title}
            </h3>

            <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-[1.62] text-muted">{project.summary}</p>

            <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
              {project.outcome.map((item) => (
                <div key={item.label}>
                  <p className="font-display text-[clamp(1.625rem,2.2vw,2.125rem)] font-medium leading-none tracking-[-0.04em]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[0.8125rem] text-muted">{item.label}</p>
                </div>
              ))}
            </div>

            <ul className="mt-7 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-pill border border-line px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              data-cursor="view"
              data-cursor-label="Ask"
              className="group mt-7 inline-flex items-center gap-2 self-start text-[0.9375rem] font-medium text-ink"
            >
              <span className="link-underline">Ask about {project.client}</span>
              <IconArrowDiagonal className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <motion.div
              style={stacked ? { y: visualY } : undefined}
              className="h-[clamp(18rem,40vh,24rem)] w-full lg:h-[min(56vh,30rem)]"
            >
              <ProjectVisual variant={project.visual} />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
