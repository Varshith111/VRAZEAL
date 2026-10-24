'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLenis } from '@/components/motion/SmoothScroll';
import { nav } from '@/lib/site';
import { stage } from '@/lib/stage';

type Phase = 'idle' | 'cover' | 'reveal';

const EASE = [0.76, 0, 0.24, 1] as const;

const extraLabels: Record<string, string> = {
  '/contact': 'Contact',
  '/privacy': 'Privacy',
  '/terms': 'Terms',
};

function labelFor(pathname: string) {
  const match = nav.find((item) => item.href === pathname);
  if (match) return match.label;
  if (extraLabels[pathname]) return extraLabels[pathname];
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';
  return slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Home';
}

const panel = {
  idle: { y: '100%', transition: { duration: 0 } },
  cover: (delay: number) => ({ y: '0%', transition: { duration: 0.7, ease: EASE, delay } }),
  reveal: (delay: number) => ({ y: '-100%', transition: { duration: 0.8, ease: EASE, delay } }),
};

/**
 * Route-change curtain. Internal links are intercepted globally (capture
 * phase, so Next's <Link> sees the click as already handled); the curtain
 * rises with the destination's name, the route changes behind it, and it
 * lifts once the new page has painted.
 *
 * Modified clicks, new-tab links, downloads, same-page anchors and
 * reduced-motion visitors all fall straight through to normal navigation.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>('idle');
  const [label, setLabel] = useState('');
  const pendingPath = useRef<string | null>(null);
  const pendingHref = useRef<string | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.('a');
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;

      const url = new URL(href, window.location.href);
      // Same page: let in-page anchors (handled by SmoothScroll) work as usual.
      if (url.pathname === window.location.pathname) return;
      if (reduced) return;

      event.preventDefault();
      pendingPath.current = url.pathname;
      pendingHref.current = href;
      setLabel(labelFor(url.pathname));
      stage.setCovered(true);
      setPhase('cover');
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // The new route has rendered: reset scroll behind the curtain, then lift it.
  useEffect(() => {
    if (phase !== 'cover' || pendingPath.current !== pathname) return;
    pendingPath.current = null;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        stage.setCovered(false);
        setPhase('reveal');
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname, phase, lenis]);

  // Safety net: if navigation stalls, never leave the page covered.
  useEffect(() => {
    if (phase !== 'cover') return;
    const timeout = window.setTimeout(() => {
      stage.setCovered(false);
      setPhase('reveal');
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  const onCovered = () => {
    if (phase !== 'cover' || !pendingHref.current) return;
    const href = pendingHref.current;
    pendingHref.current = null;
    router.push(href, { scroll: false });
  };

  const onRevealed = () => {
    if (phase === 'reveal') setPhase('idle');
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9800]"
      style={{ pointerEvents: phase === 'idle' ? 'none' : 'auto' }}
    >
      {/* Leading blade of light */}
      <motion.div
        className="absolute inset-0 bg-accent"
        initial="idle"
        animate={phase}
        variants={panel}
        custom={phase === 'reveal' ? 0.08 : 0}
      />
      <motion.div
        className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-void px-gutter py-8"
        initial="idle"
        animate={phase}
        variants={panel}
        custom={phase === 'reveal' ? 0 : 0.08}
        onAnimationComplete={phase === 'cover' ? onCovered : onRevealed}
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow">VRAZEAL</span>
          <span className="eyebrow">Loading</span>
        </div>
        <div className="overflow-hidden">
          <motion.p
            key={label}
            className="font-display text-display font-medium text-paper"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            {label}
            <span className="text-accent">.</span>
          </motion.p>
        </div>
        <div className="h-px w-full overflow-hidden bg-hair">
          <motion.span
            className="block h-full w-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === 'cover' ? 1 : 0 }}
            transition={{ duration: phase === 'cover' ? 1.1 : 0, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </div>
  );
}
