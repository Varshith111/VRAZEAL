'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'dark' | 'light';

export const THEME_KEY = 'vrazeal:theme';

const THEME_COLOR: Record<Theme, string> = { dark: '#050506', light: '#F6F6F3' };

/**
 * Runs in <head> before first paint so a returning visitor never sees the
 * wrong theme flash. Dark is the default; a saved choice wins.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

type Origin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme, origin?: Origin) => void;
  toggle: (origin?: Origin) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => undefined,
  toggle: () => undefined,
});

export function useTheme() {
  return useContext(ThemeContext);
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  // Adopt whatever the head script decided.
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === 'light' || current === 'dark') {
      setThemeState(current);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[current]);
    }
  }, []);

  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next]);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode: the choice lasts for this page view only */
    }
    setThemeState(next);
  }, []);

  /**
   * Switches theme. Where the View Transitions API exists, the new theme is
   * revealed as a circle growing out of `origin` (the toggle); otherwise, or
   * under reduced motion, it switches instantly.
   */
  const setTheme = useCallback(
    (next: Theme, origin?: Origin) => {
      if (next === document.documentElement.dataset.theme) return;
      const doc = document as ViewTransitionDocument;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!doc.startViewTransition || reduced || document.visibilityState === 'hidden') {
        apply(next);
        return;
      }

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const root = document.documentElement;
      root.style.setProperty('--vt-x', `${x}px`);
      root.style.setProperty('--vt-y', `${y}px`);
      root.style.setProperty('--vt-r', `${radius}px`);

      let applied = false;
      const run = () => {
        if (applied) return;
        applied = true;
        flushSync(() => apply(next));
      };
      const transition = doc.startViewTransition(run) as {
        ready?: Promise<void>;
        finished: Promise<void>;
      };
      transition.ready?.catch(() => undefined);
      transition.finished.catch(() => undefined);
      // If the browser never gets a frame to run the transition (a throttled
      // or occluded tab), switch anyway rather than ignoring the click.
      window.setTimeout(run, 400);
    },
    [apply],
  );

  const toggle = useCallback(
    (origin?: Origin) => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light', origin),
    [setTheme],
  );

  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>;
}
