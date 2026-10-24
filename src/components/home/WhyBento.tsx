'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Counter } from '@/components/motion/Counter';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Spotlight } from '@/components/motion/Spotlight';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

function Tile({
  children,
  className,
  title,
  body,
  tag,
}: {
  children: ReactNode;
  className?: string;
  title: string;
  body: string;
  tag?: string;
}) {
  return (
    <RevealItem className={cn('h-full', className)} y={36}>
      <Spotlight className="tile flex h-full flex-col p-6 lg:p-8">
        <div className="relative z-[2] min-h-0 flex-1">{children}</div>
        <div className="relative z-[2] mt-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-display text-[1.5rem] font-medium tracking-[-0.035em]">{title}</h3>
            {tag && <span className="font-mono text-label uppercase text-accent-bright">{tag}</span>}
          </div>
          <p className="mt-2 max-w-[46ch] text-[0.9375rem] leading-[1.55] text-smoke">{body}</p>
        </div>
      </Spotlight>
    </RevealItem>
  );
}

/* ---------- A · code that writes itself ---------- */

type Token = { t: string; c?: string };
const CODE: Token[][] = [
  [{ t: '// Written for your business. Never retrofitted.', c: 'text-ash' }],
  [{ t: 'export async function ', c: 'text-accent-bright' }, { t: 'placeOrder' }, { t: '(cart: ', c: 'text-smoke' }, { t: 'Cart', c: 'text-[#9fd0ff]' }, { t: ') {', c: 'text-smoke' }],
  [{ t: '  const ', c: 'text-accent-bright' }, { t: 'rx = ' }, { t: 'await ', c: 'text-accent-bright' }, { t: 'verifyPrescription' }, { t: '(cart.rx);', c: 'text-smoke' }],
  [{ t: '  if ', c: 'text-accent-bright' }, { t: '(!rx.approved) ', c: 'text-smoke' }, { t: 'return ', c: 'text-accent-bright' }, { t: 'hold(cart, ' }, { t: "'rx_pending'", c: 'text-[#ffd18a]' }, { t: ');', c: 'text-smoke' }],
  [{ t: '  const ', c: 'text-accent-bright' }, { t: 'order = ' }, { t: 'await ', c: 'text-accent-bright' }, { t: 'db.order.create' }, { t: '({ data: cart });', c: 'text-smoke' }],
  [{ t: '  await ', c: 'text-accent-bright' }, { t: 'queue.add' }, { t: '(', c: 'text-smoke' }, { t: "'fulfil'", c: 'text-[#ffd18a]' }, { t: ', { id: order.id });', c: 'text-smoke' }],
  [{ t: '  return ', c: 'text-accent-bright' }, { t: 'order;' }],
  [{ t: '}', c: 'text-smoke' }],
];
const CODE_LENGTH = CODE.reduce((sum, line) => sum + line.reduce((s, token) => s + token.t.length, 0) + 1, 0);

function CodeEditor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(CODE_LENGTH);
      return;
    }
    const id = window.setInterval(() => {
      setCount((value) => {
        if (value >= CODE_LENGTH) {
          window.clearInterval(id);
          return value;
        }
        return value + 2;
      });
    }, 22);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  let remaining = count;
  let caretPlaced = false;

  return (
    <div ref={ref} data-theme="dark" className="h-full overflow-hidden rounded-xl border border-hair bg-void font-mono text-paper text-[0.75rem] leading-[1.9] sm:text-[0.8125rem]">
      <div className="flex items-center gap-2 border-b border-hair px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-paper/15" />
        <span className="h-2 w-2 rounded-full bg-paper/15" />
        <span className="h-2 w-2 rounded-full bg-paper/15" />
        <span className="ml-3 text-[0.6875rem] text-ash">orders/place-order.ts</span>
        <span className="ml-auto rounded bg-accent/15 px-2 py-0.5 text-[0.625rem] text-accent-bright">TypeScript</span>
      </div>
      <div className="overflow-x-auto px-4 py-4">
        {CODE.map((line, lineIndex) => {
          const lineLength = line.reduce((s, token) => s + token.t.length, 0) + 1;
          const visible = Math.max(0, Math.min(lineLength, remaining));
          remaining -= lineLength;
          let budget = visible;
          const showCaret = !caretPlaced && (remaining < 0 || lineIndex === CODE.length - 1);
          if (showCaret) caretPlaced = true;
          return (
            <div key={lineIndex} className="flex whitespace-pre">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-paper/20">{lineIndex + 1}</span>
              <span>
                {line.map((token, tokenIndex) => {
                  const text = token.t.slice(0, Math.max(0, budget));
                  budget -= token.t.length;
                  return (
                    <span key={tokenIndex} className={token.c ?? 'text-paper'}>
                      {text}
                    </span>
                  );
                })}
                {showCaret && <span className="ml-px inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] animate-caret-blink bg-accent" />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- B · performance gauge ---------- */

function Gauge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const circumference = 2 * Math.PI * 52;
  const metrics = [
    { label: 'LCP', value: '0.9s', width: 92 },
    { label: 'CLS', value: '0.01', width: 98 },
    { label: 'INP', value: '64ms', width: 88 },
  ];

  return (
    <div ref={ref} className="flex h-full items-center gap-7">
      <div className="relative h-32 w-32 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" className="stroke-paper/10" strokeWidth="6" />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#0A84FF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference * 0.02 } : undefined}
            transition={{ duration: 1.9, ease: EASE }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(10,132,255,0.8))' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[2.25rem] font-medium leading-none tracking-[-0.05em]">
            <Counter value={98} />
          </span>
          <span className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ash">Perf</span>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.label}>
            <div className="flex justify-between font-mono text-[0.6875rem]">
              <span className="text-ash">{metric.label}</span>
              <span className="text-paper">{metric.value}</span>
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-paper/[0.07]">
              <motion.div
                className="h-full rounded-full bg-paper"
                initial={{ width: 0 }}
                animate={inView ? { width: `${metric.width}%` } : undefined}
                transition={{ duration: 1.4, delay: 0.3 + index * 0.12, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- C · weekly builds ---------- */

function Weeks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const weeks = 8;
  const live = 5;

  return (
    <div ref={ref} className="flex h-full items-end gap-2">
      {Array.from({ length: weeks }).map((_, index) => {
        const done = index < live;
        const isLive = index === live;
        return (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              className={cn(
                'relative w-full origin-bottom rounded-md border',
                done ? 'border-accent/40 bg-accent/20' : isLive ? 'border-accent bg-accent/30' : 'border-hair bg-paper/[0.02]',
              )}
              style={{ height: `${40 + index * 9}px` }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : undefined}
              transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
            >
              {done && (
                <motion.svg
                  viewBox="0 0 16 16"
                  className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 text-accent-bright"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ delay: 0.6 + index * 0.08 }}
                >
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              )}
              {isLive && (
                <span className="absolute left-1/2 top-2 flex h-2 w-2 -translate-x-1/2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-80" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
              )}
            </motion.div>
            <span className={cn('font-mono text-[0.5625rem]', isLive ? 'text-accent-bright' : 'text-ash')}>W{index + 1}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- D · ownership ---------- */

function Ownership() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const items = ['Source code & repository', 'Cloud & infrastructure accounts', 'Design files & brand assets'];

  return (
    <div ref={ref} className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border border-hair bg-void/70 px-4 py-3">
        <motion.svg viewBox="0 0 24 24" className="h-5 w-5 text-accent-bright" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <motion.path
            d="M8 11V7a4 4 0 0 1 8 0"
            initial={{ rotate: 0 }}
            animate={inView ? { rotate: -28, x: -3, y: -1 } : undefined}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            style={{ originX: '8px', originY: '11px' }}
          />
        </motion.svg>
        <span className="truncate font-mono text-[0.75rem] text-smoke">github.com/<span className="text-paper">your-company</span>/product</span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <motion.li
            key={item}
            className="flex items-center gap-3 text-[0.875rem] text-paper"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.12, ease: EASE }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
              <svg viewBox="0 0 16 16" className="h-3 w-3">
                <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- E · growth curve ---------- */

function Growth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const path = 'M0 92 C 40 88, 60 80, 90 70 S 150 58, 180 40 S 240 18, 280 8';

  return (
    <div ref={ref} className="relative h-full min-h-[9rem]">
      <svg viewBox="0 0 280 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" x2="280" y1={y} y2={y} className="stroke-paper/[0.08]" strokeDasharray="3 5" />
        ))}
        <motion.path
          d={`${path} L 280 100 L 0 100 Z`}
          fill="url(#growth-fill)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="#5AB0FF"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </svg>
      <motion.div
        className="absolute right-0 top-0 rounded-md border border-accent/40 bg-void/90 px-2.5 py-1.5 font-mono text-[0.625rem] text-accent-bright"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        Built for the next 10×
      </motion.div>
    </div>
  );
}

/* ---------- F · type specimen ---------- */

function Specimen() {
  return (
    <div className="flex h-full items-center justify-between gap-4">
      <div className="relative h-28 w-28 overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center font-display text-[5.5rem] font-medium leading-none tracking-[-0.06em] transition-transform duration-700 ease-expo group-hover/spot:-translate-y-full">
          Aa
        </span>
        <span className="accent-serif absolute inset-0 flex translate-y-full items-center justify-center text-[5.5rem] leading-none text-accent-bright transition-transform duration-700 ease-expo group-hover/spot:translate-y-0">
          Aa
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {['#050506', '#FFFFFF', '#0A84FF', '#1E1E22'].map((color) => (
          <span
            key={color}
            className="h-9 w-9 rounded-lg border border-paper/10 transition-transform duration-500 ease-expo group-hover/spot:scale-110"
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- G · one team, end to end ---------- */

const CHAIN = ['Strategy', 'Design', 'Engineering', 'AI', 'Launch', 'Growth'];

function Chain() {
  const reduced = useReducedMotion();
  return (
    <div className="relative flex flex-wrap items-center justify-between gap-y-4">
      <span aria-hidden className="absolute inset-x-6 top-1/2 hidden h-px bg-hair md:block" />
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute top-1/2 hidden h-[3px] w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent md:block"
          animate={{ left: ['0%', '92%'] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
        />
      )}
      {CHAIN.map((step, index) => (
        <span
          key={step}
          className="relative z-[1] flex items-center gap-2.5 rounded-pill border border-paper/10 bg-carbon px-4 py-2.5 text-[0.875rem]"
        >
          <span className="font-mono text-[0.625rem] text-ash">0{index + 1}</span>
          {step}
        </span>
      ))}
    </div>
  );
}

export function WhyBento() {
  return (
    <section id="approach" className="relative scroll-mt-10 bg-void py-section">
      <div className="shell">
        <SectionIntro
          index="06"
          label="Why VRAZEAL"
          title={[
            'Built properly,',
            <>
              the <span className="accent-serif">first</span> time<span className="text-accent">.</span>
            </>,
          ]}
          aside="Most agencies optimise for the pitch. We optimise for year three — when your team has doubled and the software still has to hold."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 lg:mt-24 lg:grid-cols-12" stagger={0.08}>
          <Tile
            className="md:col-span-6 lg:col-span-7 lg:row-span-2"
            title="Custom built. Zero templates."
            body="Every line is written for your business — no page builders, no theme marketplaces, nothing retrofitted from a previous client."
            tag="Bespoke"
          >
            <CodeEditor />
          </Tile>
          <Tile
            className="md:col-span-3 lg:col-span-5"
            title="Performance first"
            body="Budgets are set before design starts. Sub-second loads and 90+ Lighthouse on launch day."
            tag="90+"
          >
            <Gauge />
          </Tile>
          <Tile
            className="md:col-span-3 lg:col-span-5"
            title="Weekly, visible progress"
            body="A live build you can click through every week, not a big reveal at the end."
            tag="Weekly"
          >
            <Weeks />
          </Tile>
          <Tile
            className="md:col-span-3 lg:col-span-4"
            title="You own everything"
            body="The repository, the infrastructure and the design files are yours from day one."
          >
            <Ownership />
          </Tile>
          <Tile
            className="md:col-span-3 lg:col-span-4"
            title="Scales with you"
            body="Typed end to end and modular, so the tenth engineer moves as fast as the first."
          >
            <Growth />
          </Tile>
          <Tile
            className="md:col-span-6 lg:col-span-4"
            title="Considered design"
            body="Typography, spacing and motion treated as engineering problems with right answers."
          >
            <Specimen />
          </Tile>
          <Tile
            className="md:col-span-6 lg:col-span-12"
            title="One team, end to end"
            body="The people who scope it design it, build it and support it. No hand-offs, no account layer in between."
          >
            <Chain />
          </Tile>
        </RevealGroup>
      </div>
    </section>
  );
}
