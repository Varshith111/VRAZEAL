'use client';

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Magnetic } from '@/components/motion/Magnetic';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'light' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative isolate inline-flex select-none items-center justify-center gap-3 overflow-hidden rounded-pill font-medium tracking-[-0.01em] transition-[color,border-color,box-shadow] duration-500 ease-expo';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white shadow-[0_0_0_1px_rgba(10,132,255,0.6),0_10px_40px_-10px_rgba(10,132,255,0.65)] hover:text-ink hover:shadow-[0_0_0_1px_rgb(var(--c-fg)),0_10px_50px_-10px_rgb(var(--c-fg)/0.35)]',
  // Inverse of the theme: a white button on dark, a black one on light.
  light: 'bg-paper text-ink hover:text-white',
  ghost: 'border border-paper/15 bg-paper/[0.02] text-paper hover:border-paper hover:text-ink',
  dark: 'bg-ink text-paper hover:text-white',
};

/** The wash that sweeps up from the bottom edge on hover. */
const fills: Record<Variant, string> = {
  primary: 'bg-paper',
  light: 'bg-accent',
  ghost: 'bg-paper',
  dark: 'bg-accent',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 pl-5 pr-4 text-[0.8125rem]',
  md: 'h-12 pl-6 pr-5 text-[0.9375rem]',
  lg: 'h-[3.75rem] pl-8 pr-6 text-[1rem]',
};

type Props<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
  /** Pass `null` to drop the arrow. */
  icon?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/**
 * The one button. A fill sweeps up from below on hover, the label rolls to a
 * duplicate of itself, and the arrow turns from diagonal to straight —
 * three small movements that read as one.
 */
export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'lg',
  children,
  className,
  magnetic = true,
  icon,
  ...rest
}: Props<T>) {
  const Tag = (as ?? 'button') as ElementType;

  const button = (
    <Tag className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] transition-transform duration-[650ms] ease-expo group-hover/btn:translate-y-0',
          fills[variant],
        )}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-[650ms] ease-expo group-hover/btn:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-[650ms] ease-expo group-hover/btn:translate-y-0"
        >
          {children}
        </span>
      </span>
      {icon !== null && (
        <span aria-hidden className="relative flex h-5 w-5 items-center justify-center">
          {icon ?? <ArrowRight className="-rotate-45 transition-transform duration-[650ms] ease-expo group-hover/btn:rotate-0" />}
        </span>
      )}
    </Tag>
  );

  if (!magnetic) return button;
  return <Magnetic className="rounded-pill">{button}</Magnetic>;
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
