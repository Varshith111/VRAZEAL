'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

/** The page's Lenis instance, or null under reduced motion / before mount. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Drives the page with Lenis. Framer Motion's scroll hooks read native scroll,
 * which Lenis keeps in sync, so every scroll-linked animation agrees with it.
 * Disabled entirely for visitors who ask for reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    setLenis(instance);

    let frame = 0;

    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors are handed to Lenis so they glide instead of jumping.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href*="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      const [path, hash] = href.split('#');
      if (!hash || (path && path !== window.location.pathname)) return;
      const target = document.getElementById(hash);
      if (!target) return;
      event.preventDefault();
      instance.scrollTo(target, { offset: -24, duration: 1.5 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
