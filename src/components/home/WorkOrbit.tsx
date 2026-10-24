'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { clients, projects } from '@/lib/content';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/** A brand in the constellation — a project with a case study, or a client. */
type Brand = {
  key: string;
  name: string;
  sector: string;
  logo?: { src: string; width: number; height: number };
  preview?: string;
  href?: string;
};

function brands(): Brand[] {
  return [
    ...projects.map((project) => ({
      key: project.id,
      name: project.client,
      sector: project.industry ?? project.sector,
      logo: project.logo,
      preview: project.screens?.[0]?.src,
      href: `/projects#${project.id}`,
    })),
    ...clients.map((client) => ({
      key: client.name,
      name: client.name,
      sector: client.sector,
      logo: client.logo,
      preview: client.preview,
    })),
  ];
}

/**
 * Selected work as a constellation. The VRAZEAL wordmark opens the section
 * on its own, spanning the page. Scrolling shrinks it to the centre, draws an
 * orbit around it and flies every brand in from beyond the edges to take its
 * place on the ring. From then on the brands keep circling slowly, with depth:
 * those behind are smaller and dimmer, those in front pass over the mark.
 * Hovering (or tapping) a brand stops the orbit and shows its website.
 */
export function WorkOrbit() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();
  const all = useMemo(brands, []);

  return (
    <section id="work" className="relative scroll-mt-10 overflow-x-clip bg-void pt-section">
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
          aside="Brands we have designed and built for — from live e-commerce platforms to identities and campaigns. Hover a logo to see the work."
        />
      </div>
      {isDesktop && !reduced ? <PinnedOrbit all={all} /> : <InlineOrbit all={all} reduced={Boolean(reduced)} />}
    </section>
  );
}

/** Desktop: the sequence is scrubbed by scroll while the stage is pinned. */
function PinnedOrbit({ all }: { all: Brand[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <div ref={ref} className="relative mt-6 h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <OrbitStage all={all} progress={scrollYProgress} />
      </div>
    </div>
  );
}

/** Touch / reduced motion: the same sequence plays once on arrival. */
function InlineOrbit({ all, reduced }: { all: Brand[]; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-25% 0px -25% 0px' });
  const progress = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(progress, 1, { duration: 2.8, ease: [0.65, 0, 0.35, 1] });
    return () => controls.stop();
  }, [inView, reduced, progress]);

  return (
    // Bottom padding reserves room for the tapped brand's preview panel.
    <div ref={ref} className="mt-10 pb-40">
      <OrbitStage all={all} progress={progress} compact />
    </div>
  );
}

type Selection = { index: number; side: 'left' | 'right' } | null;

function OrbitStage({ all, progress, compact = false }: { all: Brand[]; progress: MotionValue<number>; compact?: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(stageRef);
  const [size, setSize] = useState({ w: 1200, h: 800 });
  const [selected, setSelected] = useState<Selection>(null);
  const spin = useMotionValue(0);

  useLayoutEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const measure = () => setSize({ w: node.clientWidth, h: node.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The orbit turns on its own (about one revolution a minute) while the
  // stage is on screen and nothing is being looked at.
  useAnimationFrame((_, delta) => {
    if (reduced || !inView || selected) return;
    spin.set(spin.get() + delta * 0.0001);
  });

  const total = all.length + 1; // brands + the open slot
  const rx = compact ? size.w * 0.35 : Math.min(size.w * 0.36, 640);
  const ry = compact ? size.h * 0.36 : size.h * 0.3;
  const planet = compact ? Math.max(64, Math.min(size.w * 0.19, 96)) : Math.max(130, Math.min(size.w * 0.115, 190));

  const markScale = useTransform(progress, [0, 0.12, 0.5], [1, 1, compact ? 0.42 : 0.3]);
  const ringLength = useTransform(progress, [0.28, 0.62], [0, 1]);
  const ringOpacity = useTransform(progress, [0.28, 0.4], [0, 1]);
  const captionOpacity = useTransform(progress, [0.72, 0.86], [0, 1]);
  const captionY = useTransform(progress, [0.72, 0.86], [16, 0]);

  const sectors = Array.from(new Set(all.map((brand) => brand.sector)));
  const active = selected ? all[selected.index] : null;

  return (
    <div
      ref={stageRef}
      className={cn('relative w-full', compact ? 'h-[min(118vw,36rem)]' : 'h-full')}
      onMouseLeave={() => setSelected(null)}
    >
      {/* Light pooling behind the mark. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: ringOpacity,
          background: 'radial-gradient(closest-side, rgba(10,132,255,0.16), transparent)',
        }}
      />

      {/* The orbit itself, drawn in as the brands arrive. */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <motion.ellipse
          cx={size.w / 2}
          cy={size.h / 2}
          rx={rx}
          ry={ry}
          fill="none"
          className="stroke-paper/15"
          strokeWidth={1}
          strokeDasharray="2 6"
          style={{ pathLength: ringLength, opacity: ringOpacity }}
        />
        <motion.ellipse
          cx={size.w / 2}
          cy={size.h / 2}
          rx={rx * 0.62}
          ry={ry * 0.62}
          fill="none"
          className="stroke-paper/[0.07]"
          strokeWidth={1}
          style={{ pathLength: ringLength, opacity: ringOpacity }}
        />
      </svg>

      {/* The wordmark — page-wide at first, then the centre of the orbit. */}
      <motion.div
        className={cn(
          'pointer-events-none absolute left-1/2 top-1/2 z-20',
          compact ? 'w-[90vw]' : 'w-[94vw] max-w-[1500px]',
        )}
        style={{ x: '-50%', y: '-50%', scale: markScale }}
      >
        <Image
          src="/logo-wordmark.png"
          alt="VRAZEAL"
          width={1200}
          height={172}
          priority={false}
          sizes="94vw"
          className="theme-invert h-auto w-full"
        />
      </motion.div>

      {all.map((brand, index) => (
        <Planet
          key={brand.key}
          brand={brand}
          index={index}
          total={total}
          progress={progress}
          spin={spin}
          rx={rx}
          ry={ry}
          size={planet}
          stage={size}
          compact={compact}
          showCard={!compact && selected?.index === index}
          cardSide={selected?.side ?? 'right'}
          onSelect={(side) => setSelected({ index, side })}
          onClear={() => setSelected(null)}
        />
      ))}
      <Planet
        index={all.length}
        total={total}
        progress={progress}
        spin={spin}
        rx={rx}
        ry={ry}
        size={planet}
        stage={size}
        compact={compact}
      />

      {/* Desktop caption. */}
      {!compact && (
        <motion.div
          className="shell absolute inset-x-0 bottom-8 z-40 flex items-end justify-between gap-6"
          style={{ opacity: captionOpacity, y: captionY }}
        >
          <p className="eyebrow max-w-[60ch] leading-relaxed">{sectors.join(' · ')}</p>
          <Button as={Link} href="/projects" variant="ghost" size="md">
            All case studies
          </Button>
        </motion.div>
      )}

      {/* Touch: the tapped brand's preview sits under the orbit. */}
      {compact && (
        <div className="shell absolute inset-x-0 bottom-0 z-40 translate-y-full pt-4">
          <AnimatePresence mode="wait">
            {active ? (
              <PreviewCard key={active.key} brand={active} onClose={() => setSelected(null)} wide />
            ) : (
              <motion.div
                key="hint"
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="eyebrow">Tap a logo to see the work</p>
                <Link href="/projects" className="link-underline py-2 text-[0.9375rem] text-accent-bright">
                  All case studies →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function Planet({
  brand,
  index,
  total,
  progress,
  spin,
  rx,
  ry,
  size,
  stage,
  compact,
  showCard = false,
  cardSide = 'right',
  onSelect,
  onClear,
}: {
  brand?: Brand;
  index: number;
  total: number;
  progress: MotionValue<number>;
  spin: MotionValue<number>;
  rx: number;
  ry: number;
  size: number;
  stage: { w: number; h: number };
  compact: boolean;
  showCard?: boolean;
  cardSide?: 'left' | 'right';
  onSelect?: (side: 'left' | 'right') => void;
  onClear?: () => void;
}) {
  const base = (index / total) * Math.PI * 2 - Math.PI / 2;
  const start = 0.3 + index * 0.05;
  const fly = useTransform(progress, [start, start + 0.26], [0, 1], { clamp: true });
  // Scrolling also swirls the ring a little, so arrival feels like a pull.
  const angle = useTransform([spin, progress], ([s, p]: number[]) => base + s + p * 0.9);
  const x = useTransform([angle, fly], ([a, f]: number[]) => Math.cos(a) * rx * (1 + (1 - f) * 1.5));
  const y = useTransform([angle, fly], ([a, f]: number[]) => Math.sin(a) * ry * (1 + (1 - f) * 1.5));
  const depth = useTransform(angle, (a: number) => (Math.sin(a) + 1) / 2); // 0 = back, 1 = front
  const scale = useTransform([depth, fly], ([d, f]: number[]) => (0.78 + d * 0.32) * (0.4 + 0.6 * f));
  const filter = useTransform(
    [depth, fly],
    ([d, f]: number[]) => `blur(${((1 - f) * 10).toFixed(1)}px) brightness(${(0.62 + d * 0.38).toFixed(2)})`,
  );
  const zIndex = useTransform(depth, (d: number) => (d > 0.5 ? 30 : 10));
  const lineX = useTransform(x, (v: number) => stage.w / 2 + v);
  const lineY = useTransform(y, (v: number) => stage.h / 2 + v);
  const lineOpacity = useTransform(fly, [0.6, 1], [0, 1]);

  const disc = (
    <motion.span
      className="relative flex h-full w-full items-center justify-center rounded-full"
      whileHover={{ scale: 1.14 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {brand ? (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-white p-[13%] shadow-[0_0_50px_-8px_rgba(10,132,255,0.55)] [[data-theme=light]_&]:bg-transparent [[data-theme=light]_&]:shadow-none">
          {brand.logo ? (
            <Image
              src={brand.logo.src}
              alt={`${brand.name} logo`}
              width={brand.logo.width}
              height={brand.logo.height}
              sizes="160px"
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-center font-display text-sm font-medium text-black">{brand.name}</span>
          )}
        </span>
      ) : (
        <span className="flex h-full w-full flex-col items-center justify-center rounded-full border border-dashed border-paper/30 text-center transition-colors duration-500 hover:border-accent">
          <span className={cn('accent-serif leading-none text-paper/80', compact ? 'text-[0.8125rem]' : 'text-[1.125rem]')}>
            Your logo
          </span>
          <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-ash">here →</span>
        </span>
      )}
    </motion.span>
  );

  // The preview opens towards the centre, so it never leaves the screen.
  const side = (): 'left' | 'right' => (x.get() > 0 ? 'left' : 'right');

  return (
    <>
      {/* Thread back to the centre. */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <motion.line
          x1={stage.w / 2}
          y1={stage.h / 2}
          x2={lineX}
          y2={lineY}
          className="stroke-paper/10"
          strokeWidth={1}
          style={{ opacity: lineOpacity }}
        />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ x, y, scale, opacity: fly, filter, zIndex: showCard ? 50 : zIndex, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      >
        {!brand ? (
          <Link href="/contact" aria-label="Your logo here — start a project" className="block h-full w-full">
            {disc}
          </Link>
        ) : brand.href && !compact ? (
          <Link
            href={brand.href}
            aria-label={`${brand.name} case study`}
            data-cursor-label="View"
            className="block h-full w-full"
            onMouseEnter={() => onSelect?.(side())}
            onMouseLeave={onClear}
            onFocus={() => onSelect?.(side())}
            onBlur={onClear}
          >
            {disc}
          </Link>
        ) : (
          <button
            type="button"
            aria-label={`Preview ${brand.name}`}
            data-cursor-label="Peek"
            className="block h-full w-full"
            onMouseEnter={() => !compact && onSelect?.(side())}
            // Touch keeps the tapped preview open; a mouse closes it on leave.
            onMouseLeave={() => !compact && onClear?.()}
            onFocus={() => onSelect?.(side())}
            onBlur={() => !compact && onClear?.()}
            onClick={() => onSelect?.(side())}
          >
            {disc}
          </button>
        )}

        <AnimatePresence>
          {showCard && brand && (
            <motion.div
              className={cn(
                'pointer-events-none absolute top-1/2 w-72',
                cardSide === 'right' ? 'left-[calc(100%+1.25rem)]' : 'right-[calc(100%+1.25rem)]',
              )}
              initial={{ opacity: 0, y: '-40%', x: cardSide === 'right' ? -12 : 12, scale: 0.94 }}
              animate={{ opacity: 1, y: '-50%', x: 0, scale: 1 }}
              exit={{ opacity: 0, y: '-45%', scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <PreviewCard brand={brand} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function PreviewCard({ brand, onClose, wide }: { brand: Brand; onClose?: () => void; wide?: boolean }) {
  return (
    <motion.div
      className={cn('overflow-hidden rounded-2xl border border-paper/10 bg-carbon shadow-[0_30px_80px_-30px_var(--shadow-c)]', wide && 'flex gap-4 p-3')}
      initial={wide ? { opacity: 0, y: 12 } : false}
      animate={wide ? { opacity: 1, y: 0 } : undefined}
      exit={wide ? { opacity: 0, y: -8 } : undefined}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {brand.preview && (
        <div className={cn('relative overflow-hidden bg-white', wide ? 'aspect-[16/10] w-[45%] shrink-0 rounded-xl' : 'aspect-[16/10] w-full')}>
          <Image src={brand.preview} alt={`${brand.name} website`} fill sizes="288px" className="object-cover object-top" />
        </div>
      )}
      <div className={cn('flex flex-col justify-between', wide ? 'min-w-0 flex-1 py-1' : 'p-4')}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-[1.125rem] font-medium tracking-[-0.02em]">{brand.name}</p>
            <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ash">{brand.sector}</p>
          </div>
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Close preview" className="-mr-1 -mt-1 p-2 text-ash">
              ✕
            </button>
          )}
        </div>
        {brand.href && (
          <Link href={brand.href} className="pointer-events-auto mt-3 text-[0.8125rem] text-accent-bright">
            Read the case study →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
