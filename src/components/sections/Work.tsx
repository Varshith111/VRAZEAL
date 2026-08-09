'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
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

      {/* Desktop: panels pin and stack. Below that: a swipeable deck. */}
      {stacked ? (
        <div ref={stackRef} className="shell mt-16 lg:mt-24">
          {projects.map((project, index) => (
            <ProjectPanel
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      ) : (
        <SwipeDeck />
      )}

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

/* ------------------------------------------------------------------ *
 * Shared case-study parts
 * ------------------------------------------------------------------ */

/**
 * Problem and Solution read as a labelled pair — the spine of every case study.
 *
 * `sideLabels` is only safe where the column is wide (the desktop panel). On a
 * card the size of a phone it leaves the body about twenty characters per line,
 * so the label sits above the text instead.
 */
function Narrative({
  project,
  className,
  sideLabels = false,
}: {
  project: Project;
  className?: string;
  sideLabels?: boolean;
}) {
  return (
    <div className={cn(sideLabels ? 'space-y-5' : 'space-y-6', className)}>
      {(
        [
          ['Problem', project.problem],
          ['Solution', project.solution],
        ] as const
      ).map(([label, body]) => (
        <div key={label} className={cn(sideLabels && 'grid grid-cols-[4.5rem_1fr] gap-x-4')}>
          <p className={cn('eyebrow', sideLabels ? 'pt-[0.3em]' : 'mb-2 block')}>{label}</p>
          <p className="max-w-[58ch] text-[0.9375rem] leading-[1.62] text-muted">{body}</p>
        </div>
      ))}
    </div>
  );
}

function Impact({ project }: { project: Project }) {
  return (
    <div className="border-t border-line pt-6">
      <p className="eyebrow">Impact</p>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
        {project.outcome.map((item) => (
          <div key={item.label}>
            <p className="font-display text-[clamp(1.625rem,2.2vw,2.125rem)] font-medium leading-none tracking-[-0.04em]">
              {item.value}
            </p>
            <p className="mt-2 text-[0.8125rem] text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stack({ project, className }: { project: Project; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {project.stack.map((tech) => (
        <li
          key={tech}
          className="rounded-pill border border-line px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function AskLink({ project, className }: { project: Project; className?: string }) {
  return (
    <a
      href="#contact"
      data-cursor="view"
      data-cursor-label="Ask"
      className={cn(
        'group inline-flex items-center gap-2 self-start text-[0.9375rem] font-medium text-ink',
        className,
      )}
    >
      <span className="link-underline">Ask about {project.client}</span>
      <IconArrowDiagonal className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Desktop — pinned stacking panels
 * ------------------------------------------------------------------ */

function ProjectPanel({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
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
      className="sticky flex min-h-[100svh] items-center"
      style={{ top: `calc(var(--nav-h) + ${0.75 + index * 0.6}rem)` }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="w-full origin-top overflow-hidden rounded-card border border-line bg-paper shadow-[0_40px_90px_-70px_rgba(0,0,0,0.5)]"
      >
        {/* Narrative left, evidence right. Splitting them keeps either column
            from driving the panel past the height it is pinned into — the whole
            case study has to be readable without scrolling inside the frame. */}
        <div className="grid grid-cols-12 gap-x-10 gap-y-8 p-9 xl:p-10">
          <div className="col-span-5 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-mono text-label text-muted">
                {String(index + 1).padStart(2, '0')} / {project.sector}
              </span>
              <span className="font-mono text-label text-muted">{project.year}</span>
            </div>

            <p className="mt-6 text-[0.9375rem] font-medium tracking-[-0.01em]">{project.client}</p>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2.125rem)] font-medium leading-[1.08] tracking-[-0.035em]">
              {project.title}
            </h3>

            <Narrative project={project} sideLabels className="mt-6" />

            <AskLink project={project} className="mt-auto pt-7" />
          </div>

          <div className="col-span-7 flex flex-col">
            <motion.div style={{ y: visualY }} className="h-[min(42vh,21rem)] w-full">
              <ProjectVisual variant={project.visual} />
            </motion.div>

            {/* Impact over stack, both full width. Side by side, the stack gets
                squeezed into a narrow column and wraps one pill per line. */}
            <div className="mt-6 border-t border-line pt-6">
              <p className="eyebrow">Impact</p>
              <div className="mt-4 flex gap-x-10">
                {project.outcome.map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-[clamp(1.5rem,2vw,2rem)] font-medium leading-none tracking-[-0.04em]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[0.8125rem] text-muted">{item.label}</p>
                  </div>
                ))}
              </div>

              <Stack project={project} className="mt-6" />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Mobile + tablet — swipeable deck
 * ------------------------------------------------------------------ */

/**
 * A native scroll-snap carousel. No drag library: the browser's own momentum
 * and snapping are smoother than anything re-implemented in JS, and it keeps
 * keyboard and screen-reader traversal working for free.
 */
function SwipeDeck() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return;
    // Card width + the gap between cards.
    const stride = card.offsetWidth + 16;
    setActive(Math.round(track.scrollLeft / stride));
  }, []);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }, []);

  return (
    <div className="mt-12 md:mt-16">
      {/* The whole deck reveals when the track enters view — staggering on each
          card's own intersection would leave the off-screen cards blank until
          they are swiped to, which reads as a loading bug rather than motion. */}
      <RevealGroup stagger={0.08}>
        <ul
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-gutter pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <li
              key={project.id}
              className="w-[86vw] max-w-[30rem] shrink-0 snap-start md:w-[62vw] md:max-w-[34rem]"
            >
              <RevealItem y={24} className="h-full">
                <SwipeCard project={project} index={index} />
              </RevealItem>
            </li>
          ))}
          {/* Safari drops a scroll container's trailing padding; this restores it. */}
          <li aria-hidden className="w-px shrink-0" />
        </ul>
      </RevealGroup>

      {/* Pagination — tappable, and the only scroll affordance on a phone. */}
      <div className="shell mt-7 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${project.client}`}
              aria-current={index === active}
              // 44px tap target; the visible bar stays 3px.
              className="group relative flex h-11 items-center px-1"
            >
              <span
                className={cn(
                  'block h-[3px] rounded-pill transition-all duration-500 ease-expo',
                  index === active ? 'w-8 bg-ink' : 'w-3 bg-line group-hover:bg-muted',
                )}
              />
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-label text-muted">
          {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

function SwipeCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper">
      <div className="h-[13rem] w-full border-b border-line p-4 md:h-[17rem] md:p-5">
        <ProjectVisual variant={project.visual} />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-label text-muted">
            {String(index + 1).padStart(2, '0')} / {project.sector}
          </span>
          <span className="font-mono text-label text-muted">{project.year}</span>
        </div>

        <p className="mt-6 text-[0.9375rem] font-medium tracking-[-0.01em]">{project.client}</p>
        <h3 className="mt-2 font-display text-[1.375rem] font-medium leading-[1.14] tracking-[-0.032em] md:text-[1.75rem]">
          {project.title}
        </h3>

        <Narrative project={project} className="mt-6" />

        <div className="mt-7">
          <Impact project={project} />
        </div>

        <div className="mt-7">
          <Stack project={project} />
        </div>

        {/* -mb-2 keeps the enlarged tap area from adding visible space. */}
        <AskLink project={project} className="mt-5 -mb-2 min-h-[44px] py-2" />
      </div>
    </article>
  );
}
