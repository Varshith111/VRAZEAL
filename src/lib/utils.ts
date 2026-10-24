import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge only knows Tailwind's default type scale. Without this, a
 * custom size such as `text-h2` is mistaken for a colour and silently dropped
 * whenever a real colour (`text-paper`) appears alongside it.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['mega', 'display', 'h1', 'h2', 'h3', 'lead', 'label'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
