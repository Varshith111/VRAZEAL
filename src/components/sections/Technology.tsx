'use client';

import { useCallback, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { Section } from '@/components/ui/Section';
import { technologies } from '@/lib/content';
import { cn } from '@/lib/utils';

/** Hand-placed so the cluster reads as a composition, not a random scatter. */
const LAYOUT = [
  { x: 6, y: 14, depth: 0.9 },
  { x: 27, y: 4, depth: 0.5 },
  { x: 48, y: 17, depth: 1 },
  { x: 71, y: 6, depth: 0.62 },
  { x: 88, y: 22, depth: 0.85 },
  { x: 3, y: 62, depth: 0.55 },
  { x: 24, y: 76, depth: 0.95 },
  { x: 47, y: 60, depth: 0.42 },
  { x: 68, y: 78, depth: 0.88 },
  { x: 86, y: 58, depth: 0.6 },
];

/**
 * Abstract geometric marks. Deliberately not the official brand logos —
 * simple shapes that sit in the same drawn language as the rest of the icons.
 */
function TechGlyph({ index }: { index: number }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.2,
    'aria-hidden': true,
    className: 'h-[18px] w-[18px]',
  } as const;

  switch (index) {
    case 0: // orbits
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
        </svg>
      );
    case 1: // circle + diagonal
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 16V8l7 8" />
        </svg>
      );
    case 2: // bracketed square
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" />
          <path d="M8 9h8M12 9v7" />
        </svg>
      );
    case 3: // hexagon
      return (
        <svg {...common}>
          <path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3L12 2.6Z" />
        </svg>
      );
    case 4: // database
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
          <path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11" />
          <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
        </svg>
      );
    case 5: // interlocking squares
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="11" height="11" rx="2" />
          <rect x="9.5" y="9.5" width="11" height="11" rx="2" />
        </svg>
      );
    case 6: // knot
      return (
        <svg {...common}>
          <path d="M12 3.2 20 8v8l-8 4.8L4 16V8l8-4.8Z" />
          <circle cx="12" cy="12" r="3.4" />
        </svg>
      );
    case 7: // stacked containers
      return (
        <svg {...common}>
          <rect x="3.5" y="13" width="5" height="5" />
          <rect x="9.5" y="13" width="5" height="5" />
          <rect x="9.5" y="7" width="5" height="5" />
          <path d="M3 18.5h13.5c2.8 0 4-1.6 4.5-3.5" />
        </svg>
      );
    case 8: // cloud arc
      return (
        <svg {...common}>
          <path d="M6.5 16.5a4 4 0 0 1 .6-8 5.5 5.5 0 0 1 10.4 1.6 3.4 3.4 0 0 1-.5 6.4" />
          <path d="M4 19.5c5 2 11 2 16 0" />
        </svg>
      );
    default: // motion chevrons
      return (
        <svg {...common}>
          <path d="M5 4h14l-7 7Z" />
          <path d="M5 11h14l-7 7Z" />
        </svg>
      );
  }
}

export function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || event.pointerType !== 'mouse') return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
      my.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    },
    [reduced, mx, my],
  );

  const reset = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <Section id="stack" index="07" label="Stack" meta="Chosen for longevity">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <h2 className="col-span-12 text-h2 font-medium lg:col-span-6">
            <SplitText text="The tools behind it" />
          </h2>
          <p className="col-span-12 max-w-prose text-lead text-muted lg:col-span-5 lg:col-start-8">
            Boring where boring is correct, modern where it earns its place. We pick technology you
            can still hire for in five years.
          </p>
        </div>

        {/* Floating cluster on desktop; an ordinary wrap on small screens. */}
        <div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={reset}
          className="relative mt-16 hidden h-[min(62vh,32rem)] w-full md:block"
        >
          <div aria-hidden className="grid-lines mask-fade-y absolute inset-0 opacity-[0.55]" />
          {technologies.map((tech, index) => (
            <FloatingTech
              key={tech.name}
              name={tech.name}
              category={tech.category}
              index={index}
              mx={smx}
              my={smy}
              reduced={Boolean(reduced)}
            />
          ))}
        </div>

        <ul className="mt-12 flex flex-wrap gap-2 md:hidden">
          {technologies.map((tech, index) => (
            <li
              key={tech.name}
              className="flex items-center gap-2.5 rounded-pill border border-line px-4 py-2.5"
            >
              <TechGlyph index={index} />
              <span className="text-[0.875rem] font-medium tracking-[-0.01em]">{tech.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function FloatingTech({
  name,
  category,
  index,
  mx,
  my,
  reduced,
}: {
  name: string;
  category: string;
  index: number;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
  reduced: boolean;
}) {
  const spot = LAYOUT[index] ?? { x: 50, y: 50, depth: 0.6 };
  const x = useTransform(mx, (value) => value * spot.depth * -26);
  const y = useTransform(my, (value) => value * spot.depth * -20);

  return (
    <motion.div
      className="absolute"
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, x: reduced ? 0 : x, y: reduced ? 0 : y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 5 + (index % 4), repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
      >
        <div
          data-cursor="link"
          className={cn(
            'group flex cursor-default items-center gap-3 rounded-pill border border-line bg-paper/80 px-4 py-2.5 backdrop-blur-md',
            'transition-[border-color,box-shadow] duration-500 ease-expo hover:border-accent/30 hover:shadow-[0_18px_40px_-24px_rgba(10,132,255,0.55)]',
          )}
          // Centred on its coordinate, then scaled by depth so nearer tiles read larger.
          style={{ transform: `translate(-50%, -50%) scale(${(0.86 + spot.depth * 0.2).toFixed(2)})` }}
        >
          <span className="text-muted transition-colors duration-500 group-hover:text-accent">
            <TechGlyph index={index} />
          </span>
          <span className="whitespace-nowrap">
            <span className="block text-[0.875rem] font-medium leading-tight tracking-[-0.012em]">
              {name}
            </span>
            <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
              {category}
            </span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
