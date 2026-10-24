'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { Project, ProjectScreen } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

type Item =
  | { kind: 'intro'; key: string; index: string; title: string; body: string; count: number }
  | { kind: 'more'; key: string; total: number }
  | { kind: 'screen'; key: string; screen: ProjectScreen; group: string; path: string; n: number };

function hostOf(url?: string) {
  return url ? url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : 'preview';
}

/**
 * Every screen of the case study on one horizontal rail. On desktop the
 * section pins and vertical scroll drives the rail sideways one-to-one;
 * on touch it is a native swipe carousel with snap points.
 */
export function ScreensRail({
  project,
  perGroup,
  title = 'Fourteen screens, one system.',
}: {
  project: Project;
  /** Show only the first N screens of each group (the home page uses a curated cut). */
  perGroup?: number;
  title?: string;
}) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();
  const host = hostOf(project.url);

  const items = useMemo<Item[]>(() => {
    const store = (project.screens ?? []).slice(0, perGroup);
    const admin = (project.adminScreens ?? []).slice(0, perGroup);
    let n = 0;
    const list: Item[] = [
      {
        kind: 'intro',
        key: 'intro-store',
        index: 'A',
        title: 'The storefront',
        body: 'What customers see: search, generic savings, prescriptions and orders, built to be trusted at a glance.',
        count: store.length,
      },
      ...store.map((screen) => ({
        kind: 'screen' as const,
        key: `s-${screen.src}`,
        screen,
        group: 'Storefront',
        path: `${host}/${screen.label.toLowerCase().replace(/\s+/g, '-')}`,
        n: ++n,
      })),
      {
        kind: 'intro',
        key: 'intro-admin',
        index: 'B',
        title: 'The admin portal',
        body: 'What the pharmacy runs on: one queue for orders, the full catalogue, stock, reports, marketing and an audit trail.',
        count: admin.length,
      },
      ...admin.map((screen) => ({
        kind: 'screen' as const,
        key: `a-${screen.src}`,
        screen,
        group: 'Admin portal',
        path: `admin.${host}/${screen.label.toLowerCase().replace(/\s+/g, '-')}`,
        n: ++n,
      })),
    ];
    const all = (project.screens?.length ?? 0) + (project.adminScreens?.length ?? 0);
    if (perGroup !== undefined && all > n) list.push({ kind: 'more', key: 'more', total: all });
    return list;
  }, [project, host, perGroup]);

  const total = items.filter((item) => item.kind === 'screen').length;

  if (isDesktop && !reduced) return <PinnedRail items={items} total={total} title={title} />;
  return <SwipeRail items={items} />;
}

function PinnedRail({ items, total, title }: { items: Item[]; total: number; title: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 220, damping: 40, mass: 0.4 });
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setCurrent(Math.min(total, Math.max(1, Math.round(value * (total - 1)) + 1)));
  });

  return (
    // The rail travels 1.5× faster than the page scrolls, so long walkthroughs
    // stay brisk instead of turning into a marathon of vertical scrolling.
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${Math.round(distance / 1.5)}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="shell mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Inside the build</p>
            <p className="mt-3 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium tracking-[-0.035em]">
              {title}
            </p>
          </div>
          <p className="font-display text-[clamp(2rem,3vw,3rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">
            {String(current).padStart(2, '0')}
            <span className="text-ash"> / {String(total).padStart(2, '0')}</span>
          </p>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex items-start gap-6 pl-gutter will-change-transform">
          {items.map((item) => renderItem(item))}
          <div aria-hidden className="w-gutter shrink-0" />
        </motion.div>

        <div className="shell mt-10">
          <div className="relative h-px w-full bg-hair">
            <motion.span className="absolute inset-0 origin-left bg-accent shadow-[0_0_10px_#0A84FF]" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Touch carousel. Cards snap to the centre; the one in focus sits at full
 * size while its neighbours recede, and a counter plus tappable dots track
 * the position. Cards slide in staggered the first time the rail appears.
 */
function SwipeRail({ items }: { items: Item[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const centre = node.scrollLeft + node.clientWidth / 2;
      let best = 0;
      let distance = Infinity;
      Array.from(node.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    node.addEventListener('scroll', onScroll, { passive: true });
    measure();
    return () => {
      node.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    const node = scroller.current;
    const child = node?.children[index] as HTMLElement | undefined;
    if (!node || !child) return;
    node.scrollTo({ left: child.offsetLeft - (node.clientWidth - child.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <div className="mt-16">
      <div className="shell mb-6 flex items-end justify-between">
        <p className="eyebrow">Inside the build — swipe</p>
        <p className="font-display text-[1.375rem] font-medium leading-none tracking-[-0.04em] tabular-nums">
          {String(active + 1).padStart(2, '0')}
          <span className="text-ash"> / {String(items.length).padStart(2, '0')}</span>
        </p>
      </div>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.key}
            className="snap-center"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px -5% 0px 0px' }}
            transition={{ duration: 0.8, delay: Math.min(index, 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={cn(
                'origin-center transition-[transform,opacity,filter] duration-500 ease-expo',
                index === active ? 'scale-100 opacity-100' : 'scale-[0.93] opacity-50 saturate-50',
              )}
            >
              {renderItem(item, true)}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="shell mt-2 flex items-center justify-center gap-1.5" role="tablist" aria-label="Screens">
        {items.map((item, index) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Show item ${index + 1}`}
            onClick={() => goTo(index)}
            className="flex h-8 items-center px-0.5"
          >
            <span
              className={cn(
                'block h-1.5 rounded-full transition-all duration-500 ease-expo',
                index === active ? 'w-6 bg-accent shadow-[0_0_8px_#0A84FF]' : 'w-1.5 bg-paper/25',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function renderItem(item: Item, compact?: boolean) {
  if (item.kind === 'intro') return <IntroCard key={item.key} item={item} compact={compact} />;
  if (item.kind === 'more') return <MoreCard key={item.key} total={item.total} compact={compact} />;
  return <ScreenCard key={item.key} item={item} compact={compact} />;
}

function MoreCard({ total, compact }: { total: number; compact?: boolean }) {
  return (
    <Link
      href="/projects"
      data-cursor-label="Open"
      className={cn(
        'group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[18px] border border-accent/30 bg-accent/[0.06] p-7 transition-colors duration-700 ease-expo hover:bg-accent hover:text-white',
        compact ? 'h-[56vw] max-h-[22rem] w-[72vw] max-w-[20rem]' : 'aspect-[3/4] h-[min(52vh,33rem)]',
      )}
    >
      <span className="font-mono text-label uppercase text-accent-bright transition-colors group-hover:text-white">Full case study</span>
      <span>
        <span className="block font-display text-[clamp(2rem,3vw,3rem)] font-medium leading-[1] tracking-[-0.045em]">
          See all {total} screens
        </span>
        <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-700 ease-expo group-hover:translate-x-2">
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </Link>
  );
}

function IntroCard({ item, compact }: { item: Extract<Item, { kind: 'intro' }>; compact?: boolean }) {
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col justify-between rounded-[18px] border border-hair bg-carbon p-7',
        compact ? 'h-[56vw] max-h-[22rem] w-[72vw] max-w-[20rem]' : 'aspect-[3/4] h-[min(52vh,33rem)]',
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 font-mono text-label text-accent-bright">
          {item.index}
        </span>
        <span className="font-mono text-label text-ash">{item.count} screens</span>
      </div>
      <div>
        <p className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
          {item.title}
        </p>
        <p className="mt-4 text-[0.9375rem] leading-[1.55] text-smoke">{item.body}</p>
      </div>
    </div>
  );
}

function ScreenCard({ item, compact }: { item: Extract<Item, { kind: 'screen' }>; compact?: boolean }) {
  return (
    <figure
      data-cursor-label="View"
      className={cn('group shrink-0', compact ? 'w-[86vw] max-w-[34rem]' : 'w-[min(58vw,58rem)]')}
    >
      <div className="overflow-hidden rounded-[18px] border border-paper/10 bg-carbon shadow-[0_40px_100px_-50px_var(--shadow-c)]">
        <div className="flex items-center gap-3 border-b border-hair px-4 py-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-paper/15" />
            <span className="h-2 w-2 rounded-full bg-paper/15" />
            <span className="h-2 w-2 rounded-full bg-paper/15" />
          </span>
          <span className="mx-auto truncate rounded-md bg-paper/[0.05] px-3 py-1 font-mono text-[0.625rem] text-ash">
            {item.path}
          </span>
          <span className="font-mono text-[0.625rem] text-ash">{String(item.n).padStart(2, '0')}</span>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden bg-white">
          <Image
            src={item.screen.src}
            alt={item.screen.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 86vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <figcaption className="mt-5 grid grid-cols-[auto_1fr] gap-x-5">
        <span className="font-mono text-label uppercase text-accent-bright">{item.screen.label}</span>
        <span className="max-w-[52ch] text-[0.875rem] leading-[1.55] text-smoke">{item.screen.caption}</span>
      </figcaption>
    </figure>
  );
}
