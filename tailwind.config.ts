import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        paper: '#FFFFFF',
        muted: '#666666',
        line: '#E8E8E8',
        accent: {
          DEFAULT: '#0A84FF',
          soft: 'rgba(10,132,255,0.08)',
          ring: 'rgba(10,132,255,0.24)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Fluid editorial scale. Second value carries line-height + tracking.
        display: ['clamp(3rem, 9.2vw, 8.75rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        h1: ['clamp(2.5rem, 6.1vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
        h2: ['clamp(2rem, 4.6vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        h3: ['clamp(1.5rem, 2.4vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        lead: ['clamp(1.0625rem, 1.35vw, 1.3125rem)', { lineHeight: '1.55', letterSpacing: '-0.011em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      spacing: {
        gutter: 'clamp(1.25rem, 5vw, 5rem)',
        section: 'clamp(6rem, 14vh, 11rem)',
      },
      maxWidth: {
        shell: '1560px',
        prose: '62ch',
      },
      borderRadius: {
        card: '18px',
        pill: '999px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
