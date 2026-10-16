'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { Project, ProjectScreen } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

function hostOf(url?: string) {
  return url?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

/** Browser chrome around a screenshot. */
function BrowserFrame({
  screen,
  url,
  className,
  priority = false,
  eager = false,
  sizes = '(min-width: 1024px) 60vw, 92vw',
}: {
  screen: ProjectScreen;
  url?: string;
  className?: string;
  priority?: boolean;
  /** Load immediately — for screens hidden behind a clip-path until scrolled to. */
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[16px] border border-black/[0.08] bg-white shadow-[0_50px_100px_-50px_rgba(8,8,8,0.45),0_2px_8px_rgba(8,8,8,0.04)]',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-black/[0.06] bg-[#F7F8FA] px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]/80" />
        {url && (
          <span className="mx-auto flex min-w-0 items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 font-mono text-[0.625rem] tracking-[0.04em] text-page-muted ring-1 ring-black/[0.06]">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {hostOf(url)}
          </span>
        )}
        <span className="w-[42px]" />
      </div>
      <div className="relative aspect-[1896/1068] w-full bg-white">
        <Image src={screen.src} alt={screen.alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : eager ? 'eager' : 'lazy'} className="object-cover object-top" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 1 — Fan: three screens start stacked and spread in 3D on scroll
 * ------------------------------------------------------------------ */

type GroupProps = { screens: ProjectScreen[]; url?: string; title: string };

function Fan({ screens, url }: GroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [left, center, right] = [screens[1], screens[0], screens[2] ?? screens[1]];

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const sideX = useTransform(p, [0, 1], ['0%', '58%']);
  const sideXNeg = useTransform(p, [0, 1], ['0%', '-58%']);
  const sideRotate = useTransform(p, [0, 1], [0, 16]);
  const sideRotateNeg = useTransform(p, [0, 1], [0, -16]);
  const sideScale = useTransform(p, [0, 1], [0.94, 0.82]);
  const sideOpacity = useTransform(p, [0, 0.35, 1], [0, 1, 1]);
  const centerScale = useTransform(p, [0, 1], [0.86, 1]);
  const centerTilt = useTransform(p, [0, 1], [24, 0]);
  const glow = useTransform(p, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mx-auto mt-6 w-full max-w-[1100px] [perspective:2000px]">
      {/* Soft brand glow that blooms as the fan opens */}
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-x-[10%] top-[10%] bottom-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.18),rgba(20,184,166,0.08)_55%,transparent)] blur-2xl"
      />
      <div className="relative mx-auto w-[64%] [transform-style:preserve-3d]">
        <motion.div
          className="absolute inset-0 origin-right"
          style={{ x: sideXNeg, rotateY: sideRotate, scale: sideScale, opacity: sideOpacity, z: -120 }}
        >
          <BrowserFrame screen={left} url={url} sizes="40vw" />
        </motion.div>
        <motion.div
          className="absolute inset-0 origin-left"
          style={{ x: sideX, rotateY: sideRotateNeg, scale: sideScale, opacity: sideOpacity, z: -120 }}
        >
          <BrowserFrame screen={right} url={url} sizes="40vw" />
        </motion.div>
        <motion.div className="relative origin-bottom" style={{ scale: centerScale, rotateX: centerTilt }}>
          <BrowserFrame screen={center} url={url} priority />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 2 — Walkthrough: pinned frame, each screen wipes in over the last
 * ------------------------------------------------------------------ */

function StackedScreen({
  screen,
  index,
  count,
  progress,
  url,
}: {
  screen: ProjectScreen;
  index: number;
  count: number;
  progress: MotionValue<number>;
  url?: string;
}) {
  const seg = 1 / (count - 1);
  // Enter: wipe up from the bottom while lifting into place.
  const inStart = (index - 0.8) * seg;
  const inEnd = (index - 0.2) * seg;
  // Exit: sink back as the next screen covers it.
  const outStart = (index + 0.2) * seg;
  const outEnd = (index + 0.8) * seg;

  const clip = useTransform(progress, [inStart, inEnd], [100, 0], { clamp: true });
  const clipPath = useTransform(clip, (v) => `inset(${v}% 0% 0% 0% round 16px)`);
  const y = useTransform(progress, [inStart, inEnd], [80, 0], { clamp: true });
  const scale = useTransform(progress, [outStart, outEnd], [1, 0.9], { clamp: true });
  const rotateX = useTransform(progress, [outStart, outEnd], [0, 8], { clamp: true });
  const dim = useTransform(progress, [outStart, outEnd], [0, 0.55], { clamp: true });
  const isLast = index === count - 1;

  return (
    <motion.div
      className="absolute inset-0 origin-top"
      style={{
        zIndex: index,
        clipPath: index === 0 ? undefined : clipPath,
        y: index === 0 ? 0 : y,
        scale: isLast ? 1 : scale,
        rotateX: isLast ? 0 : rotateX,
      }}
    >
      <BrowserFrame screen={screen} url={url} eager />
      {!isLast && (
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-[16px] bg-[#0b1220]" />
      )}
    </motion.div>
  );
}

function Walkthrough({ screens, url, title }: GroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const count = screens.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const rail = useTransform(progress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(progress, 'change', (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.round(v * (count - 1))));
    setActive((cur) => (cur === next ? cur : next));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * i) / (count - 1) + 2, behavior: 'smooth' });
  };

  return (
    <div ref={ref} className="relative" style={{ height: `${count * 70 + 30}vh` }}>
      <div className="sticky top-[var(--nav-h)] flex h-[calc(100svh-var(--nav-h))] items-center">
        <div className="grid w-full grid-cols-12 items-center gap-x-12">
          {/* Captions */}
          <div className="col-span-4">
            <p className="font-mono text-label uppercase text-page-muted">{title}</p>
            <div className="relative mt-8 pl-6">
              <span className="absolute left-0 top-0 h-full w-px bg-page-line" />
              <motion.span style={{ height: rail }} className="absolute left-0 top-0 w-px bg-page-accent" />
              <ol className="space-y-1">
                {screens.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.src}>
                      <button
                        type="button"
                        onClick={() => jump(i)}
                        data-cursor="link"
                        className="group block w-full py-2.5 text-left"
                      >
                        <span className="flex items-baseline gap-3">
                          <span
                            className={cn(
                              'font-mono text-[0.6875rem] tabular-nums transition-colors duration-500',
                              on ? 'text-page-accent' : 'text-page-muted/60',
                            )}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={cn(
                              'font-display text-[1.375rem] font-medium tracking-[-0.025em] transition-all duration-500',
                              on ? 'translate-x-1 text-page-ink' : 'text-page-muted/50 group-hover:text-page-muted',
                            )}
                          >
                            {s.label}
                          </span>
                        </span>
                        <motion.span
                          initial={false}
                          animate={on ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="block overflow-hidden"
                        >
                          <span className="block max-w-[34ch] pl-[2.1rem] pt-2 text-[0.9375rem] leading-[1.6] text-page-muted">
                            {s.caption}
                          </span>
                        </motion.span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Stage */}
          <div className="relative col-span-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_60%_40%,rgba(37,99,235,0.10),transparent_70%)]"
            />
            <div className="relative [perspective:1800px]">
              {/* Spacer gives the stack its height */}
              <div className="invisible">
                <BrowserFrame screen={screens[0]} url={url} />
              </div>
              {screens.map((s, i) => (
                <StackedScreen key={s.src} screen={s} index={i} count={count} progress={progress} url={url} />
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between font-mono text-label text-page-muted">
              <span>{screens[active].label}</span>
              <span className="tabular-nums">
                <span className="text-page-ink">{String(active + 1).padStart(2, '0')}</span> /{' '}
                {String(count).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Small screens + reduced motion: framed screens that rise in one by one
 * ------------------------------------------------------------------ */

function ScreenList({ screens, url, animate }: GroupProps & { animate: boolean }) {
  return (
    <div className="mt-12 space-y-14">
      {screens.map((s, i) => (
        <motion.figure
          key={s.src}
          initial={animate ? { opacity: 0, y: 50, rotateX: 12, scale: 0.96 } : false}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="[perspective:1400px]"
        >
          <BrowserFrame screen={s} url={url} sizes="92vw" />
          <figcaption className="mt-4 flex gap-3">
            <span className="font-mono text-[0.6875rem] text-page-accent">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="block font-medium text-page-ink">{s.label}</span>
              {s.caption && <span className="mt-1 block text-[0.9375rem] leading-[1.6] text-page-muted">{s.caption}</span>}
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

function ScreenGroup({ screens, url, title }: GroupProps) {
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)');
  const pinned = wide && !reduced && screens.length > 1;

  return (
    <div>
      {!reduced && <Fan screens={screens} url={url} title={title} />}
      {pinned ? (
        <Walkthrough screens={screens} url={url} title={title} />
      ) : (
        <ScreenList screens={screens} url={url} title={title} animate={!reduced} />
      )}
    </div>
  );
}

/** Heading that opens each group of screens. */
function GroupIntro({ index, eyebrow, title, body }: { index: string; eyebrow: string; title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="mb-10 grid grid-cols-12 items-end gap-y-4 border-t border-page-line pt-10 lg:mb-14"
    >
      <div className="col-span-12 lg:col-span-7">
        <p className="font-mono text-label uppercase text-page-muted">
          <span className="text-page-accent">{index}</span> &nbsp;/&nbsp; {eyebrow}
        </p>
        <h3 className="mt-4 text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em] text-page-ink">
          {title}
        </h3>
      </div>
      <p className="col-span-12 max-w-[44ch] text-[1.0625rem] leading-[1.65] text-page-muted lg:col-span-5">{body}</p>
    </motion.div>
  );
}

export function ProjectShowcase({ project }: { project: Project }) {
  const hasAdmin = Boolean(project.adminScreens?.length);
  if (!project.screens?.length && !hasAdmin) return null;

  return (
    <div className="space-y-24 lg:space-y-32">
      {project.screens?.length ? (
        <section>
          <GroupIntro
            index="01"
            eyebrow="Customer storefront"
            title="What patients see."
            body="The public pharmacy at flymeds.in: search, compare branded and generic, upload a prescription and track the order."
          />
          <ScreenGroup screens={project.screens} url={project.url} title={`Inside ${hostOf(project.url) ?? project.client}`} />
        </section>
      ) : null}

      {hasAdmin ? (
        <section>
          <GroupIntro
            index="02"
            eyebrow="Admin portal"
            title="What the team runs it on."
            body="The internal portal for admins, pharmacists, inventory and marketing staff: orders, catalogue, stock, reports and a full audit trail."
          />
          <ScreenGroup screens={project.adminScreens!} url={`${project.client} admin`} title={`Inside ${project.client} admin`} />
        </section>
      ) : null}
    </div>
  );
}
