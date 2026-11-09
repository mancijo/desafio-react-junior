import type { Config } from 'tailwindcss'

/**
 * Tokens da identidade visual (docs/PLANEJAMENTO.md, seção 7.3).
 * Carregado pelo Tailwind v4 via `@config` em src/index.css.
 */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ciano de marca: usado sobre fundo marinho (modo escuro e header)
        primary: {
          DEFAULT: '#00AEEF',
          // Ciano escuro: destaques no modo claro (contraste AA sobre branco)
          dark: '#0077A8',
          // Ciano translúcido: fundo de ícones e chips
          soft: 'rgba(0, 174, 239, 0.12)',
          subtle: 'rgba(0, 174, 239, 0.09)',
        },
        navy: {
          // Fundo escuro principal
          DEFAULT: '#0B1120',
          // Fundo escuro do rodapé
          deep: '#07101F',
          // Fundo do header (com backdrop-blur)
          header: 'rgba(11, 17, 32, 0.82)',
        },
        heading: '#0F172A',
        'secondary-dark': '#172033',
        body: '#475569',
        'border-subtle': 'rgba(148, 163, 184, 0.32)',
        // Borda de campos de formulário: contraste 3:1 exigido para componentes (WCAG 1.4.11)
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
