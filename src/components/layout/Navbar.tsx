'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLenis } from '@/components/motion/SmoothScroll';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { nav, site } from '@/lib/site';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(!open && latest > previous + 2 && latest > 480);
    if (latest < previous - 2) setHidden(false);
  });

  // Freeze the page under the open menu.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const indicator = hovered ?? nav.find((item) => isActive(item.href))?.href ?? null;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100]"
        initial={{ y: '-100%' }}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <nav className="shell flex h-[var(--nav-h)] items-center justify-between gap-6" aria-label="Primary">
          <Link
            href="/"
            className="relative z-[110] -mx-2 flex min-h-[44px] shrink-0 items-center px-2"
            aria-label={`${site.name} — home`}
          >
            <Image
              src="/logo-wordmark.png"
              alt={site.name}
              width={1200}
              height={172}
              priority
              className="theme-invert h-[13px] w-auto sm:h-[15px]"
            />
          </Link>

          {/* Floating glass pill with a sliding highlight. */}
          <ul
            onMouseLeave={() => setHovered(null)}
            className={cn(
              'absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-pill border p-1.5 transition-[background-color,border-color,box-shadow] duration-700 ease-expo lg:flex',
              scrolled
                ? 'glass border-paper/10 shadow-[0_20px_60px_-20px_var(--shadow-c)]'
                : 'border-paper/[0.06] bg-paper/[0.02]',
            )}
          >
            {nav.map((item) => (
              <li key={item.href} className="relative">
                {indicator === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-pill bg-paper/[0.09]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Link
                  href={item.href}
                  onMouseEnter={() => setHovered(item.href)}
                  className={cn(
                    'relative flex h-9 items-center gap-2 rounded-pill px-4 text-[0.8125rem] transition-colors duration-300',
                    isActive(item.href) ? 'text-paper' : 'text-smoke hover:text-paper',
                  )}
                >
                  {isActive(item.href) && (
                    <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_#0A84FF]" aria-hidden />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-[110] flex items-center gap-2">
            <ThemeToggle />
            <Button as={Link} href="/contact" size="sm" className="hidden sm:inline-flex">
              Start a project
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="glass flex h-11 items-center gap-3 rounded-pill border border-paper/10 pl-4 pr-3.5 text-[0.8125rem] text-paper lg:hidden"
            >
              <span className="relative block h-4 overflow-hidden leading-4">
                <motion.span className="block" animate={{ y: open ? '-100%' : '0%' }} transition={{ duration: 0.5, ease: EASE }}>
                  Menu
                </motion.span>
                <motion.span
                  className="absolute inset-0 block"
                  animate={{ y: open ? '0%' : '100%' }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  Close
                </motion.span>
              </span>
              <span aria-hidden className="relative flex h-2.5 w-4 flex-col justify-between">
                <motion.span
                  className="block h-px w-full bg-current"
                  animate={open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
                <motion.span
                  className="block h-px w-full bg-current"
                  animate={open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[105] flex flex-col justify-between overflow-hidden bg-void px-gutter pb-10 pt-[calc(var(--nav-h)+2.5rem)] lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.6rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.6rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.6rem)' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(70% 45% at 85% 0%, rgba(10,132,255,0.22), transparent 70%)' }}
            />

            <ul className="relative flex flex-col">
              {[...nav, { label: 'Contact', href: '/contact' }].map((item, index) => (
                <li key={item.href} className="overflow-hidden border-b border-hair">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.06, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between py-3.5"
                    >
                      <span
                        className={cn(
                          'font-display text-[clamp(2.25rem,10vw,3.5rem)] font-medium leading-none tracking-[-0.045em] transition-colors',
                          isActive(item.href) ? 'text-paper' : 'text-paper/50 group-hover:text-paper',
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="font-mono text-label text-ash">{String(index + 1).padStart(2, '0')}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              className="relative space-y-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            >
              <a href={`mailto:${site.email}`} className="block font-display text-[1.5rem] tracking-[-0.03em] text-paper">
                {site.email}
              </a>
              <div className="-my-3 flex flex-wrap gap-x-6">
                {site.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="eyebrow flex min-h-[44px] items-center transition-colors hover:text-paper"
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
