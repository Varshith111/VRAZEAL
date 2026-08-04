'use client';

import { useCallback, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(48rem circle at ${sx}% ${sy}%, rgba(10,132,255,0.20), transparent 62%)`;

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduced || event.pointerType !== 'mouse') return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(((event.clientX - rect.left) / rect.width) * 100);
      y.set(((event.clientY - rect.top) / rect.height) * 100);
    },
    [reduced, x, y],
  );

  return (
    <section
      ref={ref}
      id="contact"
      onPointerMove={onMove}
      className="noise relative scroll-mt-24 overflow-hidden bg-ink py-section text-paper"
    >
      {!reduced && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      )}

      <div className="shell relative">
        <div className="h-px w-full bg-paper/15" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-5">
          <p className="eyebrow text-paper/45">
            <span className="mr-3 text-paper">10</span>Contact
          </p>
          <p className="eyebrow text-paper/45">Usually replies within 24 hours</p>
        </div>

        <div className="mt-20 lg:mt-28">
          <h2 className="max-w-[14ch] text-display font-medium">
            <SplitText text="Let's build" />
            <span className="block">
              <SplitText text="something people" delay={0.1} />
            </span>
            <span className="block text-paper/40">
              <SplitText text="remember." delay={0.2} />
            </span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-12 items-end gap-y-12 lg:mt-24">
          <div className="col-span-12 lg:col-span-6">
            <Button
              as="a"
              href={`mailto:${site.email}?subject=New%20project%20enquiry`}
              variant="invert"
              data-cursor="view"
              data-cursor-label="Send"
            >
              Start your project
            </Button>
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] text-paper/50">
              Tell us what you are trying to build and what is currently in the way. You will get a
              considered reply from an engineer, not a sales sequence.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="space-y-6">
              <div>
                <p className="eyebrow text-paper/40">Direct</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline mt-3 block font-display text-[clamp(1.25rem,2.4vw,1.875rem)] font-medium tracking-[-0.03em]"
                >
                  {site.email}
                </a>
              </div>
              <div className="h-px w-full bg-paper/15" />
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {site.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="eyebrow text-paper/45 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
