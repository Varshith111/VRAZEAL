'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { nav, services, site } from '@/lib/site';

const legal = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

/** 44px touch rows on phones, back to the tight desktop rhythm above lg. */
const linkClass =
  'flex min-h-[44px] items-center text-[0.9375rem] text-paper/70 transition-colors duration-300 hover:text-paper lg:block lg:min-h-0';

export function Footer() {
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink pb-8 pt-section text-paper">
      <div className="shell">
        <div className="h-px w-full bg-paper/15" />

        <RevealGroup className="grid grid-cols-12 gap-y-12 pt-14 sm:gap-x-8" stagger={0.08}>
          <RevealItem y={20} className="col-span-12 lg:col-span-4">
            <Image
              src="/logo-lockup.png"
              alt={`${site.name} — ${site.tagline}`}
              width={1600}
              height={340}
              className="h-auto w-[13rem] invert"
            />
            <p className="mt-7 max-w-[34ch] text-[0.9375rem] leading-[1.6] text-paper/50">
              A creative and technology agency building software, systems, and brands for businesses
              that intend to grow into them.
            </p>
          </RevealItem>

          <RevealItem y={20} className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-7">
            <nav aria-label="Footer navigation">
              <p className="eyebrow text-paper/40">Navigate</p>
            {/* Touch rows below lg; the tighter desktop rhythm above it. The
                underline lives on an inner span so padding cannot drag it away
                from the baseline. */}
              <ul className="mt-4 space-y-1 lg:mt-5 lg:space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      <span className="link-underline">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </RevealItem>

          <RevealItem y={20} className="col-span-6 sm:col-span-4 lg:col-span-2">
            <p className="eyebrow text-paper/40">Services</p>
            <ul className="mt-4 space-y-1 lg:mt-5 lg:space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className={linkClass}>
                    <span className="link-underline">{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem y={20} className="col-span-12 sm:col-span-4 lg:col-span-2">
            <p className="eyebrow text-paper/40">Connect</p>
            <ul className="mt-4 space-y-1 lg:mt-5 lg:space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  <span className="link-underline">{site.email}</span>
                </a>
              </li>
              {site.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className={linkClass}>
                    <span className="link-underline">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>

        <div className="mask-fade-x mt-20 overflow-hidden">
          <motion.div
            initial={reduced ? undefined : { y: '22%', opacity: 0 }}
            whileInView={reduced ? undefined : { y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo-wordmark.png"
              alt=""
              aria-hidden
              width={1200}
              height={172}
              className="h-auto w-full opacity-[0.14] invert"
            />
          </motion.div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-paper/15 pt-7">
          <p className="eyebrow text-paper/40">
            © {year} {site.name}. All rights reserved.
          </p>
          {/* -my-3 keeps the touch targets from adding visible space. */}
          <div className="-my-3 flex flex-wrap items-center gap-x-7 lg:my-0">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="eyebrow flex min-h-[44px] items-center text-paper/40 transition-colors duration-300 hover:text-paper lg:min-h-0"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#top"
              className="eyebrow flex min-h-[44px] items-center text-paper/40 transition-colors duration-300 hover:text-paper lg:min-h-0"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
