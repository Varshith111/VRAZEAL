'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Counter } from '@/components/motion/Counter';
import { MaskText } from '@/components/motion/MaskText';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { ScreensRail } from '@/components/home/ScreensRail';
import { Button } from '@/components/ui/Button';
import { ClosingCta } from '@/components/ui/ClosingCta';
import { PageHero } from '@/components/ui/PageHero';
import { projects, type Project } from '@/lib/content';

const EASE = [0.16, 1, 0.3, 1] as const;

/** "5,170" → { value: 5170, suffix: '' }, "60%" → { value: 60, suffix: '%' }. */
function parseStat(raw: string) {
  const match = raw.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const value = Number(match[2].replace(/,/g, ''));
  if (Number.isNaN(value)) return null;
  return { prefix: match[1], value, suffix: match[3], grouped: match[2].includes(',') };
}

export function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Projects"
        title={[
          'Real products,',
          <>
            live in <span className="accent-serif">production</span>
            <span className="text-accent">.</span>
          </>,
        ]}
        subtitle="A focused portfolio of custom builds for real businesses. Every engagement is bespoke — no templates, no recycled layouts."
        meta={[
          { label: 'Delivered', value: '25+ projects' },
          { label: 'Featured', value: projects[0]?.client },
          { label: 'Status', value: <span className="text-accent-bright">● {projects[0]?.status ?? 'Live'}</span> },
        ]}
      />
      {projects.map((project, index) => (
        <CaseStudy key={project.id} project={project} index={index} />
      ))}
      <ClosingCta
        title={[
          'Your product',
          <>
            could be <span className="accent-serif">next</span>
            <span className="text-accent">.</span>
          </>,
        ]}
      />
    </>
  );
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const host = project.url?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <article id={project.id} className="relative scroll-mt-10 bg-void">
      {/* Title block */}
      <header className="shell pt-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-paper">Case {String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-paper/25" />
            {project.sector}
          </p>
          <p className="eyebrow">{project.year}</p>
        </div>
        <div className="mt-10 grid grid-cols-12 items-end gap-y-8">
          <MaskText
            as="h2"
            lines={[project.client]}
            className="col-span-12 font-display text-mega font-medium lg:col-span-8"
          />
          <Reveal className="col-span-12 lg:col-span-4 lg:pb-6" delay={0.2}>
            <p className="font-display text-[clamp(1.25rem,1.8vw,1.625rem)] font-medium leading-[1.25] tracking-[-0.025em]">
              {project.title}
            </p>
            {project.url && (
              <div className="mt-6">
                <Button as="a" href={project.url} target="_blank" rel="noopener noreferrer" size="md" icon={<span aria-hidden>↗</span>}>
                  Visit {host}
                </Button>
              </div>
            )}
          </Reveal>
        </div>
      </header>

      <HeroShot project={project} />

      {/* Overview */}
      <section className="shell py-section">
        <RevealGroup className="grid grid-cols-2 gap-y-8 border-y border-hair py-10 md:grid-cols-4" stagger={0.06}>
          {[
            { label: 'Client', value: project.clientName ?? project.client },
            { label: 'Services', value: (project.services ?? []).join(', ') },
            { label: 'Year', value: project.year },
            { label: 'Status', value: project.status ?? 'Delivered' },
          ].map((item) => (
            <RevealItem key={item.label} y={14} className="pr-6">
              <p className="eyebrow">{item.label}</p>
              <p className="mt-3 text-[1rem] leading-snug text-paper">{item.value}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-24 grid grid-cols-12 gap-y-16 lg:gap-x-12">
          {(
            [
              ['01', 'The problem', project.problem],
              ['02', 'What we built', project.solution],
            ] as const
          ).map(([number, label, body]) => (
            <div key={label} className="col-span-12 lg:col-span-6">
              <div className="flex items-center gap-4">
                <span className="font-display text-[3.5rem] font-medium leading-none tracking-[-0.06em] text-outline">
                  {number}
                </span>
                <span className="font-mono text-label uppercase text-accent-bright">{label}</span>
              </div>
              <Reveal delay={0.1}>
                <p className="mt-8 text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.6] tracking-[-0.012em] text-paper/85">
                  {body}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="relative overflow-hidden border-y border-hair bg-carbon py-section">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(50% 80% at 50% 120%, rgba(10,132,255,0.22), transparent 70%)' }}
        />
        <div className="shell relative grid grid-cols-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-paper">03</span>
              <span className="h-px w-8 bg-paper/25" />
              Impact
            </p>
            <MaskText
              className="mt-8 text-h2 font-medium"
              lines={[
                'What it',
                <>
                  <span className="accent-serif">delivers</span>
                  <span className="text-accent">.</span>
                </>,
              ]}
            />
          </div>
          <div className="col-span-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {project.outcome.map((item) => {
              const stat = parseStat(item.value);
              return (
                <Reveal key={item.label} className="border-t border-paper/15 pt-6">
                  <p className="font-display text-[clamp(4rem,9vw,8rem)] font-medium leading-[0.85] tracking-[-0.06em]">
                    {stat ? (
                      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} grouped={stat.grouped} />
                    ) : (
                      item.value
                    )}
                  </p>
                  <p className="mt-5 text-[1rem] text-smoke">{item.label}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      {project.highlights && (
        <section className="shell py-section">
          <div className="grid grid-cols-12 gap-y-12">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow flex items-center gap-3">
                <span className="text-paper">04</span>
                <span className="h-px w-8 bg-paper/25" />
                Highlights
              </p>
              <MaskText
                className="mt-8 text-h2 font-medium"
                lines={[
                  'Inside the',
                  <>
                    <span className="accent-serif">product</span>
                    <span className="text-accent">.</span>
                  </>,
                ]}
              />
            </div>
            <RevealGroup className="col-span-12 grid grid-cols-1 border-t border-hair sm:grid-cols-2 lg:col-span-8" stagger={0.06}>
              {project.highlights.map((item, i) => (
                <RevealItem key={item} y={14}>
                  <div className="group flex items-start gap-5 border-b border-hair py-6 pr-6">
                    <span className="mt-0.5 font-mono text-label text-ash transition-colors group-hover:text-accent-bright">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[1.0625rem] leading-snug tracking-[-0.012em] text-paper">{item}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Screens */}
      <section className="pb-section">
        <div className="shell">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-paper">05</span>
            <span className="h-px w-8 bg-paper/25" />
            Walkthrough
          </p>
        </div>
        <ScreensRail project={project} />
      </section>

      {/* Stack */}
      <section className="shell pb-section">
        <div className="grid grid-cols-12 items-end gap-y-8 border-t border-hair pt-10">
          <div className="col-span-12 lg:col-span-3">
            <p className="eyebrow">Built with</p>
          </div>
          <RevealGroup className="col-span-12 flex flex-wrap gap-2 lg:col-span-9" stagger={0.04}>
            {project.stack.map((tech) => (
              <RevealItem key={tech} y={10}>
                <span className="inline-block rounded-pill border border-paper/10 bg-paper/[0.03] px-5 py-2.5 font-display text-[1.0625rem] tracking-[-0.015em] transition-colors duration-500 hover:border-accent/50 hover:text-accent-bright">
                  {tech}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </article>
  );
}

/** The live site in a frame, opening from a slot as it scrolls into view. */
function HeroShot({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const inset = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v * 0.6}% ${v}% ${v * 0.6}% round 24px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const screen = project.screens?.[0];
  if (!screen) return null;

  return (
    <div ref={ref} className="mt-16 px-gutter lg:mt-20">
      <motion.div
        className="relative mx-auto aspect-[16/9] w-full max-w-shell overflow-hidden rounded-[24px] border border-paper/10 bg-white"
        style={reduced ? undefined : { clipPath }}
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      >
        <motion.div className="absolute inset-0" style={reduced ? undefined : { scale }}>
          <Image src={screen.src} alt={screen.alt} fill sizes="100vw" className="object-cover object-top" />
        </motion.div>
      </motion.div>
    </div>
  );
}
