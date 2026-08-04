'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <StaticSculpture />,
});

/**
 * Decides whether the visitor gets the WebGL sculpture or the drawn fallback.
 * The fallback is not a downgrade path bolted on afterwards — it is the same
 * composition rendered in SVG, so small screens still get a real hero.
 */
export function HeroVisual() {
  const [mode, setMode] = useState<'pending' | 'webgl' | 'static'>('pending');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wideEnough = window.matchMedia('(min-width: 768px)').matches;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowMemory = typeof deviceMemory === 'number' && deviceMemory < 4;

    let webgl = false;
    try {
      const canvas = document.createElement('canvas');
      webgl = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      webgl = false;
    }

    setMode(webgl && wideEnough && !reduced && !lowMemory ? 'webgl' : 'static');
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Radial wash sitting behind the object. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(58% 52% at 58% 44%, rgba(10,132,255,0.09), rgba(10,132,255,0) 68%), radial-gradient(42% 38% at 34% 70%, rgba(0,0,0,0.05), rgba(0,0,0,0) 72%)',
        }}
      />
      {mode === 'webgl' ? <HeroScene /> : <StaticSculpture />}
    </div>
  );
}

/** Drawn twin of the WebGL scene — ring, faceted core, accent satellite. */
function StaticSculpture() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.svg
        viewBox="0 0 420 420"
        className="h-auto w-[min(80%,26rem)] overflow-visible"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      >
        <defs>
          <linearGradient id="facetA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dfe9f5" />
          </linearGradient>
          <linearGradient id="facetB" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f8ff" />
            <stop offset="100%" stopColor="#c9d9ec" />
          </linearGradient>
          <linearGradient id="facetC" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#eef4fc" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 68, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '210px 210px' }}
        >
          <ellipse cx="210" cy="210" rx="182" ry="70" fill="none" stroke="#111" strokeWidth="1" opacity="0.5" />
        </motion.g>

        <motion.g
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Faceted crystal, drawn as an isometric icosahedron silhouette. */}
          <polygon points="210,92 306,150 210,214" fill="url(#facetA)" stroke="#c3d3e6" strokeWidth="0.8" />
          <polygon points="210,92 114,150 210,214" fill="url(#facetC)" stroke="#c3d3e6" strokeWidth="0.8" />
          <polygon points="114,150 210,214 114,268" fill="url(#facetB)" stroke="#c3d3e6" strokeWidth="0.8" />
          <polygon points="306,150 210,214 306,268" fill="url(#facetA)" stroke="#c3d3e6" strokeWidth="0.8" />
          <polygon points="114,268 210,214 210,330" fill="url(#facetC)" stroke="#c3d3e6" strokeWidth="0.8" />
          <polygon points="306,268 210,214 210,330" fill="url(#facetB)" stroke="#c3d3e6" strokeWidth="0.8" />
        </motion.g>

        <motion.circle
          cx="352"
          cy="150"
          r="7"
          fill="#0A84FF"
          animate={{ cy: [150, 132, 150] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <rect x="66" y="300" width="9" height="9" fill="#111" transform="rotate(36 70 304)" />
      </motion.svg>
    </div>
  );
}
