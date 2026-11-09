# TS02 — Configurar Tailwind e tokens da identidade visual

- **Branch:** `chore/tailwind-setup`
- **Data:** 09/11/2026
- **Situação:** concluída na branch; aguardando merge na `main`.

## O que foi feito

- **Tailwind CSS 4.3** instalado com o plugin oficial do Vite (`@tailwindcss/vite`).
- **Tokens da identidade visual** em `tailwind.config.ts`, carregado pelo Tailwind v4 com `@config` em `src/index.css`:

  | Grupo | Classe / token | Valor |
  |-------|----------------|-------|
  | Cores | `primary` | `#00AEEF` (ciano de marca, sobre marinho) |
  | | `primary-dark` | `#0077A8` (destaques no modo claro, AA) |
  | | `primary-soft` / `primary-subtle` | ciano 12% / 9% (ícones, chips) |
  | | `navy` / `navy-deep` / `navy-header` | `#0B1120` / `#07101F` / marinho 82% |
  | | `heading` / `body` / `secondary-dark` | `#0F172A` / `#475569` / `#172033` |
  | | `border-subtle` | `rgba(148,163,184,.32)` |
  | | `glass` / `glass-strong` | branco 5% / 10% |
  | Fonte | `font-sans` | Plus Jakarta Sans, fallback `system-ui, sans-serif` |
  | Raios | `rounded-pill` / `card` / `card-lg` / `icon` / `sm` | 999 / 16 / 18 / 12 / 8 px |
  | Sombras | `shadow-elevated` / `shadow-floating` | valores do guia |
  | Outros | `backdrop-blur-header`, `h-header`, `max-w-content` | 18 px, 62 px, 1280 px |

- **`darkMode: 'class'`** no `tailwind.config.ts`: as variantes `dark:` valem quando `<html>` tem a classe `dark`.
- **Fonte** Plus Jakarta Sans (variável, pesos 200–800) servida pelo próprio projeto com `@fontsource-variable/plus-jakarta-sans`, importada em `src/main.tsx`.
- **`index.html`**: `lang="pt-BR"` e título "Lista de Usuários".
- `tailwind.config.ts` incluído no `tsconfig.node.json` para ser verificado pelo TypeScript no build.
- **Conteúdo de demonstração do Vite removido** (`App.css`, imagens de `src/assets`, `public/icons.svg`). O `App.tsx` virou uma página mínima que aplica os tokens; o conteúdo real começa na US01.

## Verificações

| Critério | Como foi verificado | Resultado |
|----------|---------------------|-----------|
| 1. Tailwind instalado e aplicado | `App.tsx` usa as classes; o CSS gerado no build contém as regras | OK |
| 2. Tokens no `tailwind.config` | Cores, raios, sombras e medidas presentes no CSS gerado (ex.: `#0b1120`, `#0f172a`, `#475569`, `max-width:1280px`) | OK |
| 3. Plus Jakarta Sans com fallback | No navegador: `document.fonts.check` confirma a fonte carregada; `font-family` = `"Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif` | OK |
| 4. `darkMode: 'class'` | Com a classe `dark` no `<html>`: fundo `rgb(11,17,32)`, título branco, texto branco 72%. Sem a classe: fundo branco, título `#0F172A`, texto `#475569` | OK |
| 5. `<html lang="pt-BR">` | `document.documentElement.lang` = `pt-BR` | OK |

Outros comandos da DoD:

- `npm run lint` (Oxlint): OK.
- `npm run build`: OK.
- Console do navegador: sem erros.
- `npm test`: ainda não existe; é configurado na TS03.

## Testes

Nenhum teste automatizado: a TS02 é uma história técnica e o Vitest só é configurado na TS03. Os critérios foram conferidos pelo build e no navegador (tabela acima).

## Decisões e observações

- **Tailwind v4 com `tailwind.config.ts`:** a versão atual do Tailwind (v4) configura o tema direto no CSS e não usa mais `tailwind.config` por padrão. Para seguir o planejamento (tokens no `tailwind.config` e `darkMode: 'class'`), o arquivo de configuração é carregado com a diretiva `@config`, que o v4 mantém para esse formato. O build confirmou que tokens e `dark:` funcionam.
- **Fonte servida pelo projeto (Fontsource)** em vez do Google Fonts: funciona sem depender de outro domínio e é publicada junto no GitHub Pages.
- **Nomes dos tokens:** semânticos (`primary`, `heading`, `body`, `navy`...) para as classes ficarem legíveis, como `text-heading` e `dark:bg-navy`.
- Componentes do guia (botões, chips etc.) não foram criados, conforme decidido: só entram quando uma história precisar.

## Textos da interface

| Onde | Texto |
|------|-------|
| `<title>` | Lista de Usuários |
| `<h1>` provisório | Lista de Usuários |
| Parágrafo provisório | Projeto em construção. |

O `<h1>` e o parágrafo são provisórios e serão revistos na US01/US11.
