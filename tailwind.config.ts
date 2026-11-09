import type { Config } from 'tailwindcss'

/**
 * Visual identity tokens (docs/PLANEJAMENTO.md, section 7.3).
 * Loaded by Tailwind v4 through `@config` in src/index.css.
 */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand cyan: used on navy backgrounds (dark mode and header)
        primary: {
          DEFAULT: '#00AEEF',
          // Dark cyan: light mode accents (AA contrast on white)
          dark: '#0077A8',
          // Translucent cyan: icon and chip backgrounds
          soft: 'rgba(0, 174, 239, 0.12)',
          subtle: 'rgba(0, 174, 239, 0.09)',
        },
        navy: {
          // Main dark background
          DEFAULT: '#0B1120',
          // Dark footer background
          deep: '#07101F',
          // Header background (with backdrop-blur)
          header: 'rgba(11, 17, 32, 0.82)',
        },
        heading: '#0F172A',
        'secondary-dark': '#172033',
        body: '#475569',
        'border-subtle': 'rgba(148, 163, 184, 0.32)',
        // Form field border: 3:1 contrast required for components (WCAG 1.4.11)
        'border-strong': '#64748B',
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          strong: 'rgba(255, 255, 255, 0.10)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        card: '16px',
        'card-lg': '18px',
        icon: '12px',
        sm: '8px',
      },
      boxShadow: {
        elevated: '0 28px 70px rgba(0, 0, 0, 0.26)',
        floating: '0 34px 90px rgba(2, 8, 23, 0.24)',
      },
      backdropBlur: {
        header: '18px',
      },
      height: {
        header: '62px',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
} satisfies Config
