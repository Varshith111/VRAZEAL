'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import s from './Hero.module.css';

const heroDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hero-display',
});
const heroSans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-hero-sans',
});
const heroMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-hero-mono',
});

const CAPABILITIES = [
  { label: 'Websites', stage: 'Website', desc: 'Fast, search-ready sites that turn visitors into customers.' },
  { label: 'CRMs', stage: 'CRM', desc: 'Pipelines, contacts and reports built around how you sell.' },
  { label: 'Mobile apps', stage: 'Mobile app', desc: 'iOS and Android apps your customers keep on their home screen.' },
  {
    label: 'Custom software',
    stage: 'Custom software',
    desc: 'Internal tools and platforms that replace spreadsheets and manual work.',
  },
] as const;

const CYCLE_MS = 5200;

const INK = '#0B0B0D';
const MUTED = '#5B6270';
const ACCENT = 'var(--accent)';

/** Grey skeleton bar used throughout the product mocks. */
function Sk({ style }: { style: CSSProperties }) {
  return <span className={s.sk} style={style} />;
}

function Arrow({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function WebsiteMock() {
  const feature = (color: string) => (
    <div style={{ background: '#F3F6FC', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ width: 18, height: 18, borderRadius: 6, background: color }} />
      <Sk style={{ height: 7, width: '80%' }} />
      <Sk style={{ height: 7, width: '55%' }} />
    </div>
  );

  return (
    <div className={s.mock}>
      <div className={s.card} style={{ position: 'absolute', left: '5%', right: '5%', top: 62, overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '12px 14px',
            borderBottom: '1px solid rgba(11,11,13,.08)',
            background: '#F6F8FC',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: '#D5DAE4' }} />
          ))}
          <span
            className={s.mono}
            style={{
              marginLeft: 10,
              flex: 1,
              minWidth: 0,
              fontSize: 10,
              letterSpacing: '.08em',
              color: MUTED,
              background: '#fff',
              border: '1px solid rgba(11,11,13,.08)',
              borderRadius: 999,
              padding: '5px 12px',
              textTransform: 'lowercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            yourbrand.com
          </span>
        </div>
        <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 16, height: 16, borderRadius: 5, background: INK }} />
            <Sk style={{ width: 34, height: 7 }} />
            <Sk style={{ width: 34, height: 7 }} />
            <Sk style={{ width: 34, height: 7 }} />
            <span style={{ marginLeft: 'auto', width: 62, height: 22, borderRadius: 999, background: INK }} />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
            <div style={{ flex: 1.1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
              <span style={{ display: 'block', height: 16, width: '92%', borderRadius: 4, background: INK }} />
              <span style={{ display: 'block', height: 16, width: '64%', borderRadius: 4, background: INK }} />
              <Sk style={{ height: 7, width: '90%', marginTop: 6 }} />
              <Sk style={{ height: 7, width: '70%' }} />
              <span style={{ display: 'block', width: 92, height: 30, borderRadius: 999, background: ACCENT, marginTop: 8 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0, height: 178, borderRadius: 14, background: INK, position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: ACCENT, right: -26, top: -22 }} />
              <span style={{ position: 'absolute', width: 74, height: 74, borderRadius: '50%', border: '2px solid #fff', left: 16, bottom: 18 }} />
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: 46, height: 2, background: 'rgba(255,255,255,.35)' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
            {feature(ACCENT)}
            {feature(INK)}
            {feature('#C9D3E8')}
          </div>
        </div>
      </div>
      <div className={s.bob} style={{ position: 'absolute', zIndex: 3, right: '11%', top: 318, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
          <path d="M4 3l16 7.5-7 2-2.2 7.2z" fill={INK} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className={`${s.tag} ${s.mono}`} style={{ marginTop: 16 }}>
          Book a demo
        </span>
      </div>
      <span className={`${s.chip} ${s.mono}`} style={{ right: '4%', bottom: 34 }}>
        Next.js
      </span>
    </div>
  );
}

function DealCard({ name, bar, accent = false }: { name: string; bar: string; accent?: boolean }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 9,
        padding: 9,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        boxShadow: '0 1px 2px rgba(11,11,13,.06)',
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
      {accent ? (
        <span style={{ display: 'block', height: 6, width: bar, borderRadius: 4, background: ACCENT }} />
      ) : (
        <Sk style={{ height: 6, width: bar }} />
      )}
    </div>
  );
}

function CrmMock() {
  const column: CSSProperties = { background: '#F3F6FC', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', gap: 8 };
  const colLabel: CSSProperties = { fontSize: 9, color: MUTED, letterSpacing: '.12em' };

  return (
    <div className={s.mock}>
      <div className={s.card} style={{ position: 'absolute', left: '5%', right: '5%', top: 62, bottom: 44, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: 46, flex: 'none', background: INK, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '16px 0' }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, background: ACCENT }} />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ width: 18, height: 18, borderRadius: 6, background: '#3A3F4A' }} />
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 14, background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className={s.display} style={{ fontWeight: 600, fontSize: 20, letterSpacing: '-.02em' }}>
              Pipeline
            </span>
            <Sk style={{ marginLeft: 'auto', width: 70, height: 22, borderRadius: 999 }} />
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: ACCENT }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, flex: 1, minHeight: 0 }}>
            <div style={column}>
              <span className={s.mono} style={colLabel}>New</span>
              <DealCard name="Harbor Studio" bar="70%" />
              <DealCard name="Lumen Clinic" bar="55%" />
              <DealCard name="Atlas Freight" bar="62%" />
            </div>
            <div style={column}>
              <span className={s.mono} style={colLabel}>In talks</span>
              <DealCard name="Greenleaf Foods" bar="66%" />
              <div style={{ border: `1.5px dashed ${ACCENT}`, borderRadius: 9, height: 50 }} />
            </div>
            <div style={column}>
              <span className={s.mono} style={colLabel}>Won</span>
              <DealCard name="Oakline Realty" bar="40%" accent />
            </div>
          </div>
        </div>
      </div>
      <div
        className={s.bob}
        style={{
          position: 'absolute',
          zIndex: 3,
          left: '43%',
          top: 226,
          width: '30%',
          minWidth: 112,
          transform: 'rotate(5deg)',
          background: '#fff',
          border: `1.5px solid ${ACCENT}`,
          borderRadius: 10,
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          boxShadow: '0 18px 30px -14px rgba(11,11,13,.45)',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>Brightside Dental</span>
        <Sk style={{ height: 6, width: '60%' }} />
      </div>
      <span className={`${s.chip} ${s.mono}`} style={{ left: '3%', bottom: 24 }}>
        PostgreSQL
      </span>
    </div>
  );
}

function MobileMock() {
  const row = (a: string, b: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span style={{ width: 26, height: 26, borderRadius: 8, background: '#EEF3FC', flex: 'none' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Sk style={{ height: 7, width: a }} />
        <Sk style={{ height: 6, width: b }} />
      </div>
    </div>
  );

  return (
    <div className={s.mock}>
      {/* back phone */}
      <div
        style={{
          position: 'absolute',
          right: '9%',
          top: 96,
          width: '42%',
          aspectRatio: '9 / 18',
          background: INK,
          borderRadius: 30,
          padding: 7,
          boxSizing: 'border-box',
          transform: 'rotate(5deg)',
          boxShadow: '0 30px 50px -26px rgba(11,11,13,.55)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 24,
            background: '#16181D',
            padding: '30px 14px 14px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            overflow: 'hidden',
          }}
        >
          <span className={s.mono} style={{ fontSize: 8.5, color: '#9AA3B5', letterSpacing: '.14em' }}>
            Activity
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 96 }}>
            {['40%', '62%', '48%', '86%', '58%'].map((h, i) => (
              <span key={i} style={{ flex: 1, height: h, background: i === 3 ? ACCENT : '#2C313B', borderRadius: 4 }} />
            ))}
          </div>
          <span style={{ display: 'block', height: 7, width: '80%', borderRadius: 4, background: '#2C313B' }} />
          <span style={{ display: 'block', height: 7, width: '55%', borderRadius: 4, background: '#2C313B' }} />
        </div>
      </div>

      {/* front phone */}
      <div
        className={s.bob}
        style={{
          position: 'absolute',
          left: '9%',
          top: 58,
          width: '50%',
          aspectRatio: '9 / 18.4',
          background: INK,
          borderRadius: 34,
          padding: 8,
          boxSizing: 'border-box',
          transform: 'rotate(-3deg)',
          boxShadow: '0 40px 60px -26px rgba(11,11,13,.6)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 27,
            background: '#fff',
            padding: '30px 14px 12px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            overflow: 'hidden',
          }}
        >
          <span style={{ position: 'absolute', top: 9, left: '50%', width: 54, height: 14, marginLeft: -27, borderRadius: 999, background: INK }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span className={s.mono} style={{ fontSize: 8, color: MUTED, letterSpacing: '.12em' }}>
                Good morning
              </span>
              <span className={s.display} style={{ fontWeight: 600, fontSize: 20, letterSpacing: '-.02em' }}>
                Today
              </span>
            </div>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: INK }} />
          </div>
          <div style={{ background: ACCENT, borderRadius: 16, padding: 12, display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden style={{ flex: 'none' }}>
              <circle cx="24" cy="24" r="19" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="5" />
              <circle
                cx="24"
                cy="24"
                r="19"
                fill="none"
                stroke="#fff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="86 120"
                transform="rotate(-90 24 24)"
              />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <span className={s.mono} style={{ fontSize: 8, letterSpacing: '.12em', opacity: 0.8 }}>
                This week
              </span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>On track</span>
            </div>
          </div>
          {row('76%', '50%')}
          {row('66%', '44%')}
          {row('72%', '48%')}
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'space-around',
              paddingTop: 10,
              borderTop: '1px solid rgba(11,11,13,.08)',
            }}
          >
            {[ACCENT, '#D5DAE4', '#D5DAE4', '#D5DAE4'].map((c, i) => (
              <span key={i} style={{ width: 18, height: 18, borderRadius: 6, background: c }} />
            ))}
          </div>
        </div>
      </div>
      <span className={`${s.chip} ${s.mono}`} style={{ right: '5%', top: 54 }}>
        iOS + Android
      </span>
      <span className={`${s.chip} ${s.mono}`} style={{ right: '4%', bottom: 34 }}>
        TypeScript
      </span>
    </div>
  );
}

function CustomMock() {
  const node = (left: string, top: string, label: string, look: 'ink' | 'accent' | 'outline' | 'muted') => {
    const looks: Record<typeof look, CSSProperties> = {
      ink: { background: INK, color: '#fff' },
      accent: { background: ACCENT, color: '#fff' },
      outline: { background: '#fff', border: '1px solid rgba(11,11,13,.16)' },
      muted: { background: '#fff', border: '1px solid rgba(11,11,13,.16)', color: MUTED },
    };
    return (
      <span
        className={s.mono}
        style={{
          position: 'absolute',
          left,
          top,
          transform: 'translate(-50%,-50%)',
          fontSize: 9,
          letterSpacing: '.08em',
          padding: '7px 9px',
          borderRadius: 8,
          ...looks[look],
        }}
      >
        {label}
      </span>
    );
  };

  const run = (dot: string, order: string, status: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />
      <span style={{ fontWeight: 600 }}>{order}</span>
      <span style={{ marginLeft: 'auto', color: MUTED }}>{status}</span>
    </div>
  );

  return (
    <div className={s.mock}>
      <div
        className={s.card}
        style={{ position: 'absolute', left: '5%', right: '5%', top: 62, bottom: 44, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid rgba(11,11,13,.08)' }}>
          <span
            className={s.display}
            style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            Order approval
          </span>
          <span
            className={s.mono}
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 9,
              letterSpacing: '.12em',
              color: INK,
              background: '#EEF3FC',
              borderRadius: 999,
              padding: '5px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            <span className={s.blink} style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }} />
            Running
          </span>
        </div>
        <div
          style={{
            position: 'relative',
            height: 210,
            flex: 'none',
            background: 'radial-gradient(circle at 1px 1px, rgba(11,11,13,.1) 1px, transparent 0) 0 0/16px 16px, #FAFBFE',
          }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" aria-hidden style={{ position: 'absolute', inset: 0 }}>
            <g fill="none" stroke="#1F5BFF" strokeWidth="1.6" vectorEffect="non-scaling-stroke">
              <path className={s.flow} vectorEffect="non-scaling-stroke" d="M12 50 L36 50" />
              <path className={s.flow} vectorEffect="non-scaling-stroke" d="M36 50 C48 50 50 26 62 26" />
              <path d="M36 50 C48 50 50 74 62 74" vectorEffect="non-scaling-stroke" stroke="#C9D3E8" />
              <path className={s.flow} vectorEffect="non-scaling-stroke" d="M62 26 C75 26 75 50 88 50" />
              <path d="M62 74 C75 74 75 50 88 50" vectorEffect="non-scaling-stroke" stroke="#C9D3E8" />
            </g>
          </svg>
          {node('12%', '50%', 'Trigger', 'ink')}
          {node('36%', '50%', 'Validate', 'outline')}
          {node('62%', '26%', 'Approve', 'accent')}
          {node('62%', '74%', 'Review', 'muted')}
          {node('88%', '50%', 'Notify', 'ink')}
        </div>
        <div style={{ flex: 1, minHeight: 0, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid rgba(11,11,13,.08)' }}>
          <span className={s.mono} style={{ fontSize: 9, color: MUTED, letterSpacing: '.12em' }}>
            Recent runs
          </span>
          {run(ACCENT, 'Order 1042', 'Approved')}
          {run(INK, 'Order 1043', 'Needs review')}
          {run(ACCENT, 'Order 1044', 'Approved')}
        </div>
      </div>
      <span className={`${s.chip} ${s.mono}`} style={{ right: '3%', top: 46 }}>
        Node.js
      </span>
      <span className={`${s.chip} ${s.mono}`} style={{ left: '3%', bottom: 24 }}>
        Your workflow
      </span>
    </div>
  );
}

const MOCKS = [WebsiteMock, CrmMock, MobileMock, CustomMock];

export function Hero() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => setActive((a) => (a + 1) % CAPABILITIES.length), CYCLE_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [startTimer]);

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    startTimer();
  };

  const Mock = MOCKS[active];

  return (
    <section
      id="top"
      className={`${s.hero} ${heroDisplay.variable} ${heroSans.variable} ${heroMono.variable} pt-[var(--nav-h)]`}
    >
      <div className={s.inner}>
        <div className={s.body}>
          {/* LEFT */}
          <div className={s.left}>
            <div className={`${s.mono} ${s.eyebrowRow}`}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <span className={s.pulse} style={{ width: 9, height: 9, borderRadius: '50%', background: ACCENT }} />
                Now booking Q4 2026
              </span>
              <span style={{ width: 1, height: 16, background: 'rgba(11,11,13,.22)' }} />
              <span style={{ color: MUTED }}>Creative &amp; technology agency</span>
            </div>

            <h1 className={`${s.display} ${s.headline}`}>
              Building digital products that move
              <span className={s.arrowpill} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </span>
              businesses forward.
            </h1>

            <p className={s.lead}>
              Websites, CRMs, mobile apps and custom software, designed and engineered end to end by one small team
              that ships.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link className={`${s.btn} ${s.solid}`} href="/contact" data-cursor="link">
                Start a project
                <Arrow />
              </Link>
              <Link className={`${s.btn} ${s.ghost}`} href="/projects" data-cursor="link">
                View our work
                <Arrow />
              </Link>
            </div>
          </div>

          {/* RIGHT: product stage */}
          <div className={s.right}>
            <div className={s.stage} aria-hidden>
              <div
                className={s.mono}
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  left: 22,
                  top: 18,
                  right: 22,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 10.5,
                  color: MUTED,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: INK }}>
                  <span className={s.blink} style={{ width: 7, height: 7, background: ACCENT, borderRadius: 2 }} />
                  {CAPABILITIES[active].stage}
                </span>
                <span>Live preview</span>
              </div>
              <Mock key={active} />
            </div>
          </div>
        </div>

        {/* SELECTOR STRIP */}
        <div className={s.strip}>
          {CAPABILITIES.map((cap, i) => (
            <button
              key={cap.label}
              type="button"
              className={`${s.cap} ${i === active ? s.active : ''}`}
              onClick={() => pick(i)}
              aria-pressed={i === active}
              data-cursor="link"
            >
              {i === active && <span key={`prog-${active}`} className={s.prog} />}
              <span className={`${s.mono} ${s.capname}`}>{cap.label}</span>
              <span className={s.capdesc}>{cap.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
