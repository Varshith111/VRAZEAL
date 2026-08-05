'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';

/**
 * One drawing, assembled across the whole Process section.
 *
 * Every phase adds a layer and nothing is ever taken away: scattered research
 * becomes a graph, the graph becomes a frame, the frame fills, goes live, and
 * starts compounding. Scroll is the only clock — each element interpolates
 * across its own slice of progress, so the visitor is scrubbing a build rather
 * than triggering an animation.
 *
 * Co-ordinates live in a fixed 400×300 space; the SVG scales to whatever the
 * stage gives it.
 */

const PHASES = 6;

/** A sub-range inside `phase`, expressed in fractions of that phase. */
const seg = (phase: number, from: number, to: number) => ({
  from: (phase + from) / PHASES,
  to: (phase + to) / PHASES,
});

type Range = { from: number; to: number };
type Scrub = { p: MotionValue<number> } & Range;

/** Fades a group in over its range, optionally dimming again later. */
function Layer({
  p,
  from,
  to,
  dim,
  children,
}: Scrub & { dim?: { at: number; to: number; opacity: number }; children: React.ReactNode }) {
  const opacity = useTransform(
    p,
    dim ? [from, to, dim.at, dim.to] : [from, to],
    dim ? [0, 1, 1, dim.opacity] : [0, 1],
  );
  return <motion.g style={{ opacity }}>{children}</motion.g>;
}

/** Draws a path along its length as the range passes. */
function Draw({
  p,
  from,
  to,
  d,
  stroke = '#D9DCE1',
  width = 1,
  dash,
}: Scrub & { d: string; stroke?: string; width?: number; dash?: string }) {
  const pathLength = useTransform(p, [from, to], [0, 1]);
  const opacity = useTransform(p, [from, from + 0.004], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash}
      style={{ pathLength, opacity }}
    />
  );
}

/* Phase 01 — the field of research the work starts from. */
const field: [number, number][] = [
  [28, 44],
  [74, 26],
  [126, 58],
  [52, 110],
  [18, 168],
  [76, 196],
  [36, 246],
  [120, 268],
  [188, 22],
  [264, 40],
  [330, 28],
  [372, 86],
  [352, 152],
  [378, 214],
  [318, 262],
  [236, 282],
];

/* Phase 02 — the structure found inside it. */
const links = [
  'M28 44 L74 26 L126 58',
  'M126 58 L188 22 L264 40 L330 28',
  'M52 110 L18 168 L76 196 L36 246',
  'M372 86 L352 152 L378 214 L318 262',
  'M76 196 L120 268 L236 282 L318 262',
  'M52 110 L126 58',
];

const anchors: [number, number][] = [
  [126, 58],
  [264, 40],
  [76, 196],
];

export function ProcessArtifact({ progress }: { progress: MotionValue<number> }) {
  const p = progress;

  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* 01 · Discover — findings landing one at a time, dimming once the
          product they informed takes the centre of the frame. */}
      <Layer p={p} {...seg(0, 0.02, 0.2)} dim={{ at: 2.3 / PHASES, to: 2.8 / PHASES, opacity: 0.32 }}>
        {field.map(([x, y], index) => {
          const range = seg(0, 0.04 + index * 0.045, 0.16 + index * 0.045);
          return <Dot key={`${x}-${y}`} p={p} {...range} x={x} y={y} />;
        })}
      </Layer>

      {/* 02 · Strategy — the connections that turn findings into a plan. */}
      <Layer p={p} {...seg(1, 0, 0.05)} dim={{ at: 2.3 / PHASES, to: 2.8 / PHASES, opacity: 0.3 }}>
        {links.map((d, index) => (
          <Draw key={d} p={p} d={d} {...seg(1, 0.05 + index * 0.11, 0.45 + index * 0.11)} />
        ))}
        {anchors.map(([x, y], index) => (
          <Ring key={`${x}-${y}`} p={p} {...seg(1, 0.55 + index * 0.1, 0.75 + index * 0.1)} x={x} y={y} />
        ))}
      </Layer>

      {/* 03 · Design — the frame, drawn over the plan. */}
      <Layer p={p} {...seg(2, 0.05, 0.3)}>
        <motion.rect
          x="96"
          y="64"
          width="208"
          height="172"
          rx="8"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="1.4"
          style={{ scale: useTransform(p, [seg(2, 0.05, 0.3).from, seg(2, 0.05, 0.3).to], [0.94, 1]) }}
          transform-origin="200 150"
        />
        <Draw p={p} {...seg(2, 0.3, 0.5)} d="M96 92 L304 92" stroke="#000000" width="1.1" />
        <Draw p={p} {...seg(2, 0.42, 0.62)} d="M150 92 L150 236" stroke="#E1E4E8" width="1" />
        {[122, 158, 194].map((y, index) => (
          <Draw
            key={y}
            p={p}
            {...seg(2, 0.55 + index * 0.08, 0.8 + index * 0.08)}
            d={`M166 ${y} L288 ${y}`}
            stroke="#EDEFF2"
            width="1"
          />
        ))}
      </Layer>

      {/* 04 · Development — the frame filling in, row by row. */}
      <Layer p={p} {...seg(3, 0, 0.04)}>
        {[104, 120, 136, 152].map((y, index) => (
          <Block
            key={y}
            p={p}
            {...seg(3, 0.05 + index * 0.07, 0.2 + index * 0.07)}
            x={106}
            y={y}
            w={34}
            h={8}
            fill={index === 0 ? '#000000' : '#EDEFF2'}
          />
        ))}
        {[
          [110, 118],
          [126, 96],
          [142, 112],
          [158, 74],
        ].map(([y, w], index) => (
          <Block
            key={y}
            p={p}
            {...seg(3, 0.3 + index * 0.08, 0.46 + index * 0.08)}
            x={166}
            y={y}
            w={w}
            h={7}
            fill={index === 1 ? '#0A84FF' : '#E4E6EA'}
          />
        ))}
        <Block p={p} {...seg(3, 0.68, 0.88)} x={166} y={178} w={122} h={44} r={4} fill="#F5F6F8" />
      </Layer>

      {/* 05 · Launch — chrome, a live badge, and the line that says it shipped. */}
      <Layer p={p} {...seg(4, 0.05, 0.25)}>
        {[108, 116, 124].map((x) => (
          <circle key={x} cx={x} cy="78" r="2.2" fill="#D9DCE1" />
        ))}
        <rect x="248" y="71" width="46" height="14" rx="7" fill="rgba(10,132,255,0.08)" stroke="#0A84FF" strokeWidth="0.8" />
        <text
          x="271"
          y="80.5"
          textAnchor="middle"
          fontSize="6.5"
          letterSpacing="1"
          fill="#0A84FF"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          LIVE
        </text>
      </Layer>
      <Layer p={p} {...seg(4, 0.45, 0.7)}>
        <text
          x="200"
          y="258"
          textAnchor="middle"
          fontSize="7"
          letterSpacing="1.4"
          fill="#666666"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          ZERO-DOWNTIME CUTOVER
        </text>
      </Layer>

      {/* 06 · Growth — the part that only shows up after launch. */}
      <Draw
        p={p}
        {...seg(5, 0.1, 0.6)}
        d="M172 212 L200 200 L228 204 L256 184 L282 166"
        stroke="#0A84FF"
        width="2"
      />
      <Layer p={p} {...seg(5, 0.55, 0.72)}>
        <circle cx="282" cy="166" r="3.4" fill="#0A84FF" />
      </Layer>
      <Draw p={p} {...seg(5, 0.6, 0.8)} d="M330 226 L330 176 M322 184 L330 176 L338 184" stroke="#000000" width="1.4" />
      <Draw
        p={p}
        {...seg(5, 0.7, 1)}
        d="M92 244 C 48 210 48 90 92 56"
        stroke="#C9CDD3"
        width="1"
        dash="3 5"
      />
    </svg>
  );
}

function Dot({ p, from, to, x, y }: Scrub & { x: number; y: number }) {
  const scale = useTransform(p, [from, to], [0, 1]);
  const opacity = useTransform(p, [from, to], [0, 1]);
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="2.6"
      fill="#C9CDD3"
      style={{ scale, opacity, transformOrigin: `${x}px ${y}px` }}
    />
  );
}

function Ring({ p, from, to, x, y }: Scrub & { x: number; y: number }) {
  const scale = useTransform(p, [from, to], [0.4, 1]);
  const opacity = useTransform(p, [from, to], [0, 1]);
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="7"
      fill="none"
      stroke="#0A84FF"
      strokeWidth="1"
      style={{ scale, opacity, transformOrigin: `${x}px ${y}px` }}
    />
  );
}

function Block({
  p,
  from,
  to,
  x,
  y,
  w,
  h,
  r = 2,
  fill,
}: Scrub & { x: number; y: number; w: number; h: number; r?: number; fill: string }) {
  const scaleX = useTransform(p, [from, to], [0, 1]);
  const opacity = useTransform(p, [from, from + 0.004], [0, 1]);
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      style={{ scaleX, opacity, transformOrigin: `${x}px ${y}px` }}
    />
  );
}
