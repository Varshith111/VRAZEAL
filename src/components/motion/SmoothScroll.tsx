'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Drives the page with Lenis and keeps GSAP ScrollTrigger (used by the
 * horizontal process timeline) on the same RAF loop, so both agree on
 * scroll position to the pixel.
 *
 * Disabled entirely for users who ask for reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    let detachGsap: (() => void) | undefined;

    // ScrollTrigger is only pulled in on the client, and only if it loads.
    import('gsap/ScrollTrigger')
      .then(async ({ ScrollTrigger }) => {
        const { gsap } = await import('gsap');
        gsap.registerPlugin(ScrollTrigger);
        const update = () => ScrollTrigger.update();
        lenis.on('scroll', update);
        detachGsap = () => lenis.off('scroll', update);
      })
      .catch(() => {
        /* timeline falls back to CSS scroll-snap */
      });

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links need to be handed to Lenis or they jump.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -90, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      detachGsap?.();
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
