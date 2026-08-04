'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { nav, site } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    // Only hide well past the hero, and never while the menu is open.
    setHidden(!open && latest > previous && latest > 420);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100]"
        animate={{ y: hidden ? '-120%' : '0%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            'transition-all duration-500 ease-expo',
            scrolled && !open ? 'glass border-b border-line/70' : 'border-b border-transparent',
          )}
        >
          <nav className="shell flex h-[var(--nav-h)] items-center justify-between gap-6" aria-label="Primary">
            <a href="#top" className="relative z-10 -mx-2 shrink-0 px-2 py-2" aria-label={`${site.name} — home`}>
              <Image
                src="/logo-wordmark.png"
                alt={site.name}
                width={1200}
                height={172}
                priority
                className={cn(
                  'h-[13px] w-auto transition-[filter] duration-500 sm:h-[15px]',
                  open && 'invert',
                )}
              />
            </a>

            <ul className="hidden items-center gap-9 lg:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-[0.875rem] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Button as="a" href="#contact" size="sm" className="hidden sm:inline-flex" icon={null}>
                Start a project
              </Button>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={cn(
                  'relative z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
                  open ? 'border-paper/25 text-paper' : 'border-line text-ink',
                )}
              >
                <span className="sr-only">Menu</span>
                <span aria-hidden className="flex h-3 w-4 flex-col justify-between">
                  <motion.span
                    className="block h-px w-full bg-current"
                    animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.span
                    className="block h-px w-full bg-current"
                    animate={open ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block h-px w-full bg-current"
                    animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink px-gutter pb-10 pt-[calc(var(--nav-h)+2rem)] text-paper lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, index) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-[clamp(2rem,9vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.035em]"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    transition={{ duration: 0.75, delay: 0.15 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="h-px w-full bg-paper/15" />
              <a href={`mailto:${site.email}`} className="block text-lead text-paper/70">
                {site.email}
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {site.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="eyebrow text-paper/45 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
