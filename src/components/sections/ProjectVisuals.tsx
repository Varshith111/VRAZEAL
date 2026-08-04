'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * Bespoke, drawn stand-ins for each case study rather than stock imagery.
 * Every one is a small abstraction of that project's real interface, built
 * from the same hairlines and type scale as the rest of the page — so the
 * showcase never looks like screenshots pasted into a template.
 */

const grow = (delay: number) => ({
  initial: { scaleY: 0 },
  whileInView: { scaleY: 1 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-[14px] border border-line bg-[#FCFCFD]',
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="ml-3 h-4 flex-1 rounded-sm bg-[#F2F3F5]" />
      </div>
      {children}
    </div>
  );
}

function Dashboard() {
  const bars = [42, 68, 55, 84, 61, 96, 74];
  return (
    <Frame>
      <div className="grid h-[calc(100%-41px)] grid-cols-[88px_1fr]">
        <aside className="hidden flex-col gap-2 border-r border-line p-4 sm:flex">
          {['Today', 'Intake', 'Rooms', 'Billing', 'Staff'].map((item, index) => (
            <span
              key={item}
              className={cn(
                'rounded-md px-2 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.1em]',
                index === 1 ? 'bg-ink text-paper' : 'text-muted',
              )}
            >
              {item}
            </span>
          ))}
        </aside>

        <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: 'Waiting', v: '12' },
              { k: 'Avg. wait', v: '6m' },
              { k: 'Today', v: '148' },
            ].map((cell) => (
              <div key={cell.k} className="rounded-lg border border-line bg-paper p-2.5">
                <p className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">{cell.k}</p>
                <p className="mt-1 font-display text-lg font-medium leading-none">{cell.v}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-line bg-paper p-3">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className={cn('flex-1 origin-bottom rounded-sm', index === 5 ? 'bg-accent' : 'bg-[#E4E6EA]')}
                style={{ height: `${height}%` }}
                {...grow(index * 0.06)}
              />
            ))}
          </div>

          <div className="hidden gap-1.5 sm:grid">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-center gap-2 rounded-md border border-line bg-paper px-2.5 py-2">
                <span className="h-4 w-4 rounded-full bg-[#EDEFF2]" />
                <span className="h-1.5 flex-1 rounded-full bg-[#EDEFF2]" />
                <span className="h-1.5 w-8 rounded-full bg-[#EDEFF2]" />
                <span className={cn('h-1.5 w-10 rounded-full', row === 0 ? 'bg-accent/70' : 'bg-[#EDEFF2]')} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Intelligence() {
  return (
    <Frame>
      <div className="grid h-[calc(100%-41px)] grid-cols-1 md:grid-cols-[1fr_150px]">
        <div className="flex flex-col gap-2 p-5">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted">
            Master services agreement · clause 14.2
          </p>
          <div className="mt-1 space-y-2">
            {[100, 92, 78].map((width, index) => (
              <span key={index} className="block h-1.5 rounded-full bg-[#EDEFF2]" style={{ width: `${width}%` }} />
            ))}
            <motion.span
              className="block h-1.5 rounded-full bg-accent"
              initial={{ width: 0 }}
              whileInView={{ width: '64%' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            {[88, 96, 70, 84].map((width, index) => (
              <span key={index} className="block h-1.5 rounded-full bg-[#EDEFF2]" style={{ width: `${width}%` }} />
            ))}
          </div>

          <div className="mt-auto rounded-lg border border-accent/25 bg-accent-soft p-3">
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-accent">
              Extracted · liability cap
            </p>
            <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink">
              Capped at fees paid in the preceding 12 months.
            </p>
          </div>
        </div>

        <aside className="hidden flex-col gap-3 border-l border-line p-4 md:flex">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted">Confidence</p>
          {[
            { label: 'Clause', value: 94 },
            { label: 'Party', value: 88 },
            { label: 'Term', value: 72 },
          ].map((item, index) => (
            <div key={item.label}>
              <div className="flex justify-between text-[0.5625rem] text-muted">
                <span>{item.label}</span>
                <span className="tabular-nums">{item.value}%</span>
              </div>
              <div className="mt-1 h-1 w-full rounded-full bg-[#EDEFF2]">
                <motion.span
                  className="block h-1 rounded-full bg-ink"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 1.1, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
          <div className="mt-auto space-y-1.5">
            <span className="block h-6 rounded-md bg-ink" />
            <span className="block h-6 rounded-md border border-line" />
          </div>
        </aside>
      </div>
    </Frame>
  );
}

function Commerce() {
  return (
    <Frame>
      <div className="grid h-[calc(100%-41px)] grid-cols-1 sm:grid-cols-[1fr_160px]">
        <div className="grid grid-cols-3 gap-2 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="flex flex-col justify-between rounded-lg border border-line bg-paper p-2.5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block h-9 rounded-md bg-[#F1F2F4]" />
              <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-[#EDEFF2]" />
              <span
                className={cn(
                  'mt-1.5 block h-1.5 w-1/2 rounded-full',
                  index === 1 ? 'bg-accent' : 'bg-[#EDEFF2]',
                )}
              />
            </motion.div>
          ))}
        </div>

        <aside className="hidden flex-col gap-2.5 border-l border-line p-4 sm:flex">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted">Account pricing</p>
          {[
            ['List', '£1,240'],
            ['Tier 3', '£1,012'],
            ['Contract', '£946'],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={cn(
                'flex items-center justify-between rounded-md border px-2.5 py-2 text-[0.5625rem]',
                index === 2 ? 'border-accent/30 bg-accent-soft text-ink' : 'border-line text-muted',
              )}
            >
              <span>{label}</span>
              <span className="font-medium tabular-nums">{value}</span>
            </div>
          ))}
          <span className="mt-auto block h-8 rounded-md bg-ink" />
        </aside>
      </div>
    </Frame>
  );
}

function Identity() {
  return (
    <div className="relative grid h-full w-full grid-cols-2 grid-rows-2 gap-3">
      <div className="flex items-center justify-center overflow-hidden rounded-[14px] border border-line bg-paper">
        <motion.span
          className="font-display text-[clamp(3rem,9vw,6rem)] font-medium leading-none tracking-[-0.06em]"
          initial={{ y: '18%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Nw
        </motion.span>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-line bg-ink p-4 text-paper">
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-paper/45">Type scale</p>
        <div className="mt-3 space-y-1.5">
          {['64 / Display', '32 / Heading', '17 / Body', '11 / Label'].map((item, index) => (
            <motion.p
              key={item}
              className="font-display leading-none tracking-[-0.03em]"
              style={{ fontSize: `${[19, 15, 12, 10][index]}px`, opacity: 1 - index * 0.18 }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1 - index * 0.18, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {item}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 rounded-[14px] border border-line bg-paper p-3">
        {['#000000', '#666666', '#E8E8E8', '#0A84FF'].map((color, index) => (
          <motion.div
            key={color}
            className="flex flex-col justify-end rounded-md p-1.5"
            style={{ background: color }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className={cn(
                'font-mono text-[0.4rem] uppercase',
                index === 2 ? 'text-muted' : 'text-paper/80',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[14px] border border-line bg-paper">
        <div className="grid-lines absolute inset-0 opacity-60" style={{ backgroundSize: '22px 22px' }} />
        <div className="relative flex h-full items-center justify-center">
          <motion.svg viewBox="0 0 120 60" className="w-3/5" aria-hidden>
            <motion.path
              d="M10 50 L35 12 L60 50 L85 12 L110 50"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.svg>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<Project['visual'], () => JSX.Element> = {
  dashboard: Dashboard,
  intelligence: Intelligence,
  commerce: Commerce,
  identity: Identity,
};

export function ProjectVisual({ variant }: { variant: Project['visual'] }) {
  const Visual = visuals[variant];
  return <Visual />;
}
