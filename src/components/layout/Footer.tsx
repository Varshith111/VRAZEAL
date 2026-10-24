'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from '@/components/motion/SmoothScroll';
import { nav, services, site } from '@/lib/site';

const legal = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

/** Studio clock. Rendered client-side only so server and client never disagree. */
function StudioTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      }).format(new Date());
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time ?? '--:--:--'}</span>;
}

export function Footer() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const markY = useTransform(scrollYProgress, [0.35, 1], ['45%', '0%']);
  const markOpacity = useTransform(scrollYProgress, [0.35, 0.9], [0, 1]);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const columns = [
    { title: 'Navigate', links: [...nav, { label: 'Contact', href: '/contact' }] },
    { title: 'Services', links: services },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-hair bg-void pt-24 text-paper">
      <div className="shell relative">
        <div className="grid grid-cols-12 gap-y-14 sm:gap-x-8">
          <div className="col-span-12 lg:col-span-4">
            <p className="max-w-[30ch] font-display text-[1.625rem] font-medium leading-[1.15] tracking-[-0.03em]">
              Websites, software and AI systems — designed and engineered by one team.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-8 inline-block font-display text-[1.25rem] tracking-[-0.02em] text-accent-bright"
            >
              {site.email}
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-auto">
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-6 space-y-3">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[0.9375rem] text-smoke transition-colors duration-300 hover:text-paper"
                    >
                      <span className="h-px w-0 bg-accent transition-all duration-500 ease-expo group-hover:w-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-12 sm:col-span-4 lg:col-span-3 lg:col-start-10">
            <p className="eyebrow">Connect</p>
            <ul className="mt-6 space-y-3">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.9375rem] text-smoke transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                    <span aria-hidden className="text-ash transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-hair bg-paper/[0.02] p-5">
              <p className="eyebrow flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Studio time · IST
              </p>
              <p className="mt-3 font-display text-[2rem] font-medium leading-none tracking-[-0.04em]">
                <StudioTime />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-hair pt-7">
          <p className="eyebrow">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="eyebrow transition-colors duration-300 hover:text-paper">
                {item.label}
              </Link>
            ))}
            <button type="button" onClick={toTop} className="eyebrow group flex items-center gap-2 transition-colors duration-300 hover:text-paper">
              Back to top
              <span aria-hidden className="inline-block transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark rising out of the bottom edge. */}
      <div className="relative mt-14 overflow-hidden px-gutter">
        <motion.div style={reduced ? undefined : { y: markY, opacity: markOpacity }} className="mx-auto max-w-shell">
          <Image
            src="/logo-wordmark.png"
            alt=""
            aria-hidden
            width={1200}
            height={172}
            className="theme-invert h-auto w-full"
            style={{
              WebkitMaskImage: 'linear-gradient(180deg, #000 10%, rgba(0,0,0,0.08) 100%)',
              maskImage: 'linear-gradient(180deg, #000 10%, rgba(0,0,0,0.08) 100%)',
            }}
          />
        </motion.div>
      </div>
    </footer>
  );
}
