'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * A running interface for each capability, drawn from the same hairlines and
 * type scale as the rest of the page. These are the argument the copy makes —
 * a prospect should be able to tell what a discipline produces without
 * reading a word of it.
 *
 * Every visual is mounted fresh when the active capability changes, so the
 * entrance choreography replays on each switch. Anything that loops forever
 * is gated on `useReducedMotion` and simply holds its final frame instead.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const mono = 'font-mono text-[0.5rem] uppercase tracking-[0.12em]';

function Screen({
  label,
  status,
  children,
}: {
  label: string;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-line bg-[#FCFCFD]">
      <div className="flex shrink-0 items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className={cn(mono, 'ml-3 truncate text-muted')}>{label}</span>
        <span className={cn(mono, 'ml-auto shrink-0 text-muted')}>{status}</span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 01 — Websites: a page assembling itself, scored as it lands
 * ------------------------------------------------------------------ */

function Websites() {
  const metrics = [
    { label: 'Performance', value: 99 },
    { label: 'Accessible', value: 100 },
    { label: 'SEO', value: 100 },
  ];

  return (
    <Screen label="preview · vrazeal.com" status="LCP 0.9s">
      <div className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-2 p-4">
          <motion.div
            className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2.5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-1.5 w-7 rounded-full bg-ink" />
            <span className="ml-auto h-1.5 w-5 rounded-full bg-[#E8EAEE]" />
            <span className="h-1.5 w-7 rounded-full bg-[#E8EAEE]" />
            <span className="h-1.5 w-4 rounded-full bg-[#E8EAEE]" />
            <span className="h-3.5 w-9 rounded-md bg-ink" />
          </motion.div>

          <div className="shrink-0 rounded-lg border border-line bg-paper p-4">
            {[96, 78, 54].map((width, index) => (
              <motion.span
                key={width}
                className={cn(
                  'mt-1.5 block h-2.5 origin-left rounded-sm first:mt-0',
                  index === 2 ? 'bg-[#E4E6EA]' : 'bg-ink',
                )}
                style={{ width: `${width}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, delay: 0.15 + index * 0.09, ease }}
              />
            ))}
            <motion.div
              className="mt-3 flex gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <span className="h-4 w-16 rounded-md bg-accent" />
              <span className="h-4 w-12 rounded-md border border-line" />
            </motion.div>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="flex min-h-0 flex-col justify-between rounded-lg border border-line bg-paper p-2.5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.55 + index * 0.08, ease }}
              >
                <span className="h-4 w-4 rounded-sm border border-line" />
                <div>
                  <span className="block h-1.5 w-4/5 rounded-full bg-[#E8EAEE]" />
                  <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-[#EDEFF2]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-px border-t border-line bg-line">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="bg-paper px-3 py-2.5">
              <p className={cn(mono, 'truncate text-muted')}>{metric.label}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-display text-[0.9375rem] font-medium leading-none tabular-nums">
                  {metric.value}
                </span>
                <span className="h-1 min-w-0 flex-1 rounded-full bg-[#EDEFF2]">
                  <motion.span
                    className={cn(
                      'block h-1 rounded-full',
                      index === 0 ? 'bg-accent' : 'bg-ink',
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1.2, delay: 0.7 + index * 0.1, ease }}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ *
 * 02 — CRM: a deal moving through the pipeline it was modelled on
 * ------------------------------------------------------------------ */

function Crm() {
  const reduced = useReducedMotion();
  const columns = [
    { name: 'Lead', rows: 3 },
    { name: 'Qualified', rows: 2 },
    { name: 'Proposal', rows: 2 },
    { name: 'Won', rows: 1 },
  ];

  return (
    <Screen label="pipeline · enterprise" status="18 open">
      <div className="relative h-full p-4">
        <div className="grid h-full grid-cols-4 gap-2">
          {columns.map((column, columnIndex) => (
            <motion.div
              key={column.name}
              className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-line bg-paper p-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: columnIndex * 0.07, ease }}
            >
              <div className="flex shrink-0 items-baseline justify-between gap-1">
                <span className={cn(mono, 'truncate text-muted')}>{column.name}</span>
                <span className={cn(mono, columnIndex === 3 ? 'text-accent' : 'text-muted')}>
                  {column.rows}
                </span>
              </div>

              <div className="mt-2 space-y-1.5">
                {Array.from({ length: column.rows }).map((_, rowIndex) => (
                  <motion.div
                    key={rowIndex}
                    className="rounded-md border border-line p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 + columnIndex * 0.07 + rowIndex * 0.05 }}
                  >
                    <span className="block h-1.5 w-3/4 rounded-full bg-[#E8EAEE]" />
                    <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-[#EDEFF2]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* The deal in flight — the whole point of modelling the stages. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-10 w-[18%] rounded-md border border-accent/35 bg-accent-soft p-2 shadow-[0_10px_24px_-16px_rgba(10,132,255,0.9)]"
          initial={{ left: '6.5%', top: '34%', opacity: 0 }}
          animate={{
            left: ['6.5%', '31%', '55.5%', '80%'],
            top: ['34%', '48%', '38%', '54%'],
            opacity: [0, 1, 1, 1],
          }}
          transition={{
            duration: 4.8,
            times: [0, 0.34, 0.67, 1],
            delay: 0.6,
            ease,
            repeat: reduced ? 0 : Infinity,
            repeatDelay: 1.4,
          }}
        >
          <span className="block h-1.5 w-3/4 rounded-full bg-accent/60" />
          <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-accent/30" />
        </motion.div>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ *
 * 03 — Business software: a workflow graph with a live run passing through
 * ------------------------------------------------------------------ */

function Software() {
  const reduced = useReducedMotion();
  const nodes = [
    { x: 30, y: 60, label: 'Intake' },
    { x: 100, y: 26, label: 'Validate' },
    { x: 100, y: 94, label: 'Enrich' },
    { x: 170, y: 60, label: 'Route' },
  ];
  const edges = [
    'M52 60 L78 32',
    'M52 60 L78 88',
    'M122 32 L148 58',
    'M122 88 L148 64',
  ];
  const log = [
    ['08:41:02', 'order.received'],
    ['08:41:02', 'stock.checked'],
    ['08:41:03', 'credit.approved'],
    ['08:41:03', 'routed → wh-02'],
  ];

  return (
    <Screen label="workflow · order-intake" status="1,284 runs">
      <div className="grid h-full grid-cols-1 sm:grid-cols-[1fr_38%]">
        <div className="relative min-h-0 p-3">
          <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
            {edges.map((d, index) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#D9DCE1"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.25 + index * 0.08, ease }}
              />
            ))}

            {nodes.map((node, index) => (
              <motion.g
                key={node.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                transition={{ duration: 0.5, delay: index * 0.09, ease }}
              >
                <rect
                  x={node.x - 22}
                  y={node.y - 10}
                  width="44"
                  height="20"
                  rx="5"
                  fill="#FFFFFF"
                  stroke={index === 3 ? '#0A84FF' : '#E1E4E8'}
                />
                <text
                  x={node.x}
                  y={node.y + 2.6}
                  textAnchor="middle"
                  fontSize="7"
                  fill={index === 3 ? '#0A84FF' : '#666666'}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  letterSpacing="0.4"
                >
                  {node.label}
                </text>
              </motion.g>
            ))}

            {/* The packet: intake → validate → route, on repeat. */}
            <motion.circle
              r="3"
              fill="#0A84FF"
              initial={{ cx: 30, cy: 60, opacity: 0 }}
              animate={{
                cx: [30, 100, 170],
                cy: [60, 26, 60],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 2.4,
                delay: 0.9,
                ease: 'linear',
                repeat: reduced ? 0 : Infinity,
                repeatDelay: 1,
              }}
            />
          </svg>
        </div>

        <div className="hidden min-h-0 flex-col gap-1.5 border-l border-line p-3 sm:flex">
          <p className={cn(mono, 'text-muted')}>Run log</p>
          {log.map(([time, event], index) => (
            <motion.div
              key={event}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.16, ease }}
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span className={cn(mono, 'shrink-0 text-muted/70')}>{time}</span>
              <span className="truncate font-mono text-[0.5rem] text-ink">{event}</span>
            </motion.div>
          ))}
          <motion.div
            className="mt-auto rounded-md border border-line px-2 py-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <p className={cn(mono, 'text-muted')}>Median</p>
            <p className="mt-1 font-display text-[0.9375rem] font-medium leading-none">1.4s</p>
          </motion.div>
        </div>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ *
 * 04 — AI: a question, the passages it was answered from, the citation
 * ------------------------------------------------------------------ */

function Ai() {
  const chunks = [
    { label: 'MSA · clause 14.2', score: 96 },
    { label: 'Addendum · 3.1', score: 88 },
    { label: 'Order form · 2.4', score: 61 },
  ];

  return (
    <Screen label="retrieval · contracts.idx" status="4,120 chunks">
      <div className="flex h-full flex-col gap-2.5 p-4">
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2.5">
          <span className={cn(mono, 'shrink-0 text-muted')}>Ask</span>
          <span className="flex min-w-0 flex-1 items-center overflow-hidden">
            <motion.span
              className="whitespace-nowrap text-[0.6875rem] tracking-[-0.005em] text-ink"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.1, delay: 0.2, ease: 'linear' }}
            >
              What is our liability cap with Northwind?
            </motion.span>
            <span className="ml-1 h-3 w-px shrink-0 animate-caret-blink bg-accent" />
          </span>
        </div>

        <div className="shrink-0 space-y-1.5">
          {chunks.map((chunk, index) => (
            <motion.div
              key={chunk.label}
              className={cn(
                'flex items-center gap-2 rounded-md border px-2.5 py-2',
                index === 0 ? 'border-accent/30 bg-accent-soft' : 'border-line bg-paper',
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.15 + index * 0.1, ease }}
            >
              <span
                className={cn(
                  'truncate font-mono text-[0.5625rem]',
                  index === 0 ? 'text-ink' : 'text-muted',
                )}
              >
                {chunk.label}
              </span>
              <span className="ml-auto h-1 w-10 shrink-0 rounded-full bg-[#EDEFF2] sm:w-16">
                <motion.span
                  className={cn('block h-1 rounded-full', index === 0 ? 'bg-accent' : 'bg-ink/30')}
                  initial={{ width: 0 }}
                  animate={{ width: `${chunk.score}%` }}
                  transition={{ duration: 0.9, delay: 1.3 + index * 0.1, ease }}
                />
              </span>
              <span className={cn(mono, 'w-5 shrink-0 text-right tabular-nums text-muted')}>
                {chunk.score}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto min-h-0 rounded-lg border border-line bg-paper p-3">
          <p className={cn(mono, 'text-muted')}>Answer</p>
          <div className="mt-2.5 space-y-1.5">
            {[100, 92, 64].map((width, index) => (
              <motion.span
                key={width}
                className="block h-1.5 origin-left rounded-full bg-[#E4E6EA]"
                style={{ width: `${width}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.75 + index * 0.14, ease: 'linear' }}
              />
            ))}
          </div>
          <motion.div
            className="mt-3 flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 2.3, ease }}
          >
            <span className="rounded-pill border border-accent/30 bg-accent-soft px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-accent">
              Cited · 14.2
            </span>
            <span className={cn(mono, 'text-muted')}>Human review · below 70</span>
          </motion.div>
        </div>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ *
 * 05 — Brand: the kit, not the logo file
 * ------------------------------------------------------------------ */

function Brand() {
  const swatches = ['#000000', '#666666', '#E8E8E8', '#0A84FF'];

  return (
    <Screen label="identity kit · v2.1" status="12 tokens">
      <div className="grid h-full grid-cols-2 grid-rows-[1.25fr_1fr] gap-2 p-4">
        <div className="col-span-2 flex items-center justify-center overflow-hidden rounded-lg border border-line bg-paper">
          <motion.span
            className="font-display text-[clamp(1.25rem,3.4vw,2.25rem)] font-medium leading-none"
            initial={{ letterSpacing: '0.42em', opacity: 0 }}
            animate={{ letterSpacing: '-0.04em', opacity: 1 }}
            transition={{ duration: 1.5, ease }}
          >
            VRAZEAL
          </motion.span>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-line bg-paper">
          <div
            className="grid-lines absolute inset-0 opacity-70"
            style={{ backgroundSize: '18px 18px' }}
          />
          <div className="relative flex h-full items-center justify-center p-3">
            <svg viewBox="0 0 60 60" className="h-full max-h-20 w-auto" aria-hidden>
              <motion.path
                d="M12 14 L30 46 L48 14"
                fill="none"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="square"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.35, ease }}
              />
              <motion.circle
                cx="30"
                cy="46"
                r="3"
                fill="#0A84FF"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3, ease }}
                style={{ transformOrigin: '30px 46px' }}
              />
            </svg>
          </div>
        </div>

        <div className="flex min-h-0 flex-col justify-between rounded-lg border border-line bg-paper p-3">
          <div className="space-y-1">
            {['Display', 'Heading', 'Body', 'Label'].map((step, index) => (
              <motion.p
                key={step}
                className="font-display leading-none tracking-[-0.03em] text-ink"
                style={{ fontSize: `${[17, 13.5, 11, 9][index]}px` }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1 - index * 0.16, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.08, ease }}
              >
                {step}
              </motion.p>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {swatches.map((color, index) => (
              <motion.span
                key={color}
                className="block h-5 rounded-sm border border-line"
                style={{ background: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 + index * 0.07, ease }}
              />
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------------ *
 * 06 — Creative: the cut, still on the timeline
 * ------------------------------------------------------------------ */

const waveform = [
  28, 46, 72, 55, 88, 64, 40, 76, 96, 58, 34, 68, 84, 50, 30, 62, 90, 44, 70, 52, 38, 80, 60, 42,
  74, 92, 48, 36, 66, 54,
];

function Creative() {
  const reduced = useReducedMotion();

  return (
    <Screen label="timeline · launch-film.v4" status="01:24 / 02:10">
      <div className="flex h-full flex-col gap-2 p-4">
        <motion.div
          className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-line bg-[#F3F4F6]"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease }}
        >
          {/* A slow push-in, the way a product film actually opens. */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'linear', repeat: reduced ? 0 : Infinity, repeatType: 'reverse' }}
          >
            <div className="absolute left-1/2 top-1/2 h-[42%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-ink/10 bg-paper" />
            <div className="absolute left-[16%] top-[22%] h-10 w-10 rounded-full bg-accent/15" />
            <div className="absolute bottom-[18%] right-[14%] h-8 w-16 rounded-md bg-ink/5" />
          </motion.div>

          <div className="absolute inset-x-3 bottom-2 flex items-center justify-between">
            <span className={cn(mono, 'rounded-sm bg-paper/80 px-1.5 py-1 text-muted')}>4K · 24p</span>
            <span className={cn(mono, 'rounded-sm bg-paper/80 px-1.5 py-1 text-muted')}>Grade v3</span>
          </div>
        </motion.div>

        <div className="relative shrink-0 space-y-1.5 overflow-hidden rounded-lg border border-line bg-paper p-2">
          <div className="flex gap-1">
            {Array.from({ length: 14 }).map((_, index) => (
              <motion.span
                key={index}
                className={cn(
                  'h-5 flex-1 rounded-[3px]',
                  index === 6 || index === 7 ? 'bg-ink/20' : 'bg-[#EDEFF2]',
                )}
                initial={{ opacity: 0, scaleY: 0.4 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.03, ease }}
              />
            ))}
          </div>

          <div className="flex h-6 items-end gap-[2px]">
            {waveform.map((height, index) => (
              <motion.span
                key={index}
                className="flex-1 origin-bottom rounded-[1px] bg-[#D8DBE0]"
                style={{ height: `${height}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.45, delay: 0.3 + index * 0.015, ease }}
              />
            ))}
          </div>

          <motion.span
            aria-hidden
            className="absolute inset-y-1.5 z-10 w-px bg-accent"
            initial={{ left: '2%' }}
            animate={{ left: ['2%', '98%'] }}
            transition={{
              duration: 6,
              delay: 0.6,
              ease: 'linear',
              repeat: reduced ? 0 : Infinity,
            }}
          />
        </div>
      </div>
    </Screen>
  );
}

const visuals: Record<string, () => JSX.Element> = {
  websites: Websites,
  crm: Crm,
  software: Software,
  ai: Ai,
  brand: Brand,
  creative: Creative,
};

export function CapabilityVisual({ id }: { id: string }) {
  const Visual = visuals[id] ?? Websites;
  return <Visual />;
}
