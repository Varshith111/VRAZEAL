import type { Config } from 'tailwindcss';

/**
 * VRAZEAL design tokens.
 *
 * Two themes share one vocabulary: `void` is the canvas, `paper` is the type,
 * and the brand blue is treated as light — it glows, it never fills large
 * areas. Dark is the default; light is opted into with the theme switcher.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Theme-driven. Values live in globals.css under [data-theme], so every
        // utility (including /opacity modifiers) flips with the theme.
        void: 'rgb(var(--c-void) / <alpha-value>)',
        carbon: 'rgb(var(--c-carbon) / <alpha-value>)',
        graphite: 'rgb(var(--c-graphite) / <alpha-value>)',
        steel: 'rgb(var(--c-steel) / <alpha-value>)',
        // `paper` is the foreground (type, rules); `ink` is its inverse.
        paper: 'rgb(var(--c-fg) / <alpha-value>)',
        ink: 'rgb(var(--c-inv) / <alpha-value>)',
        smoke: 'rgb(var(--c-fg) / var(--a-smoke))',
        ash: 'rgb(var(--c-fg) / var(--a-ash))',
        hair: 'rgb(var(--c-fg) / var(--a-hair))',
        // Fixed light-surface tokens, used by the always-white product mockups.
        surface: '#F5F5F3',
        muted: '#666666',
        line: '#E8E8E8',
        accent: {
          DEFAULT: '#0A84FF',
          bright: 'rgb(var(--c-accent-bright) / <alpha-value>)',
          deep: '#0057D9',
          soft: 'rgba(10,132,255,0.10)',
          ring: 'rgba(10,132,255,0.28)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Fluid editorial scale. Second value carries line-height + tracking.
        mega: ['clamp(3.4rem, 11.5vw, 13rem)', { lineHeight: '0.86', letterSpacing: '-0.055em' }],
        display: ['clamp(3rem, 8.4vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        h1: ['clamp(2.6rem, 6.2vw, 6.25rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
        h2: ['clamp(2.1rem, 4.8vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        h3: ['clamp(1.5rem, 2.5vw, 2.375rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        lead: ['clamp(1.0625rem, 1.3vw, 1.3125rem)', { lineHeight: '1.55', letterSpacing: '-0.011em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4.5vw, 4.5rem)',
        section: 'clamp(6.5rem, 15vh, 12rem)',
      },
      maxWidth: {
        shell: '1600px',
        prose: '62ch',
      },
      borderRadius: {
        card: '22px',
        pill: '999px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
        curtain: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
        'caret-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
