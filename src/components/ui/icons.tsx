import { cn } from '@/lib/utils';

type IconProps = { className?: string };

/**
 * A single drawn icon set: 24×24 grid, 1.25 stroke, square caps, no fills.
 * Geometric rather than illustrative — they read as diagrams, not decoration.
 */
const base = 'h-6 w-6 shrink-0';

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      className={cn(base, className)}
    >
      {children}
    </svg>
  );
}

export function IconWebsite(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="4" width="19" height="15" />
      <path d="M2.5 8.5h19" />
      <path d="M5.5 6.25h1.5M8.5 6.25H10" />
      <path d="M6 12h6M6 15h9" />
    </Svg>
  );
}

export function IconCrm(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="12" r="2" />
      <path d="M7 6.6 17.2 11M7 17.4 17.2 13" />
      <path d="M5 8v8" />
    </Svg>
  );
}

export function IconSoftware(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2.5 21 7l-9 4.5L3 7l9-4.5Z" />
      <path d="M3 12l9 4.5L21 12" />
      <path d="M3 17l9 4.5L21 17" />
    </Svg>
  );
}

export function IconAi(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.5" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.5" transform="rotate(120 12 12)" />
    </Svg>
  );
}

export function IconBrand(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="12" r="6.5" />
      <rect x="8.5" y="5.5" width="13" height="13" />
    </Svg>
  );
}

export function IconCreative(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="5" width="19" height="14" />
      <path d="M10 9.5 15 12l-5 2.5v-5Z" />
      <path d="M2.5 5 5 2.5M8 5l2.5-2.5M13.5 5 16 2.5" />
    </Svg>
  );
}

export function IconArrowDiagonal({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="square"
      aria-hidden
      className={cn('h-4 w-4', className)}
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden className={cn('h-4 w-4', className)}>
      <path d="M8 2.5v11M2.5 8h11" />
    </svg>
  );
}

export const capabilityIcons = {
  websites: IconWebsite,
  crm: IconCrm,
  software: IconSoftware,
  ai: IconAi,
  brand: IconBrand,
  creative: IconCreative,
} as const;
