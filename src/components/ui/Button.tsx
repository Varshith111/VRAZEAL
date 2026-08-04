'use client';

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Magnetic } from '@/components/motion/Magnetic';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'invert' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-3 overflow-hidden rounded-pill font-medium tracking-[-0.01em] transition-colors duration-500 ease-expo';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:text-paper',
  outline: 'border border-line bg-transparent text-ink hover:border-ink/25',
  invert: 'bg-paper text-ink',
  ghost: 'bg-transparent text-ink hover:bg-black/[0.04]',
};

/** The wash that sweeps up from the bottom edge on hover. */
const fills: Record<Variant, string> = {
  primary: 'bg-accent',
  outline: 'bg-ink',
  invert: 'bg-accent',
  ghost: 'bg-transparent',
};

const hoverText: Record<Variant, string> = {
  primary: '',
  outline: 'group-hover/btn:text-paper',
  invert: 'group-hover/btn:text-paper',
  ghost: '',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[0.8125rem]',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-[3.625rem] px-8 text-[0.9375rem]',
};

type Props<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
  icon?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

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
      {/* Fill sweeps up from below and stays; leaving reverses it. */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 z-0 translate-y-full rounded-pill transition-transform duration-[650ms] ease-expo group-hover/btn:translate-y-0',
          fills[variant],
        )}
      />
      <span className={cn('relative z-10 transition-colors duration-500 ease-expo', hoverText[variant])}>
        {children}
      </span>
      {icon !== null && (
        <span
          aria-hidden
          className={cn(
            'relative z-10 transition-all duration-500 ease-expo group-hover/btn:translate-x-1',
            hoverText[variant],
          )}
        >
          {icon ?? <ArrowRight />}
        </span>
      )}
    </Tag>
  );

  if (!magnetic) return button;
  return <Magnetic className="rounded-pill">{button}</Magnetic>;
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
