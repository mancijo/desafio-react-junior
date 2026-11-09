# US13 — Alternar entre modo claro e escuro

- **Branch:** `feat/dark-mode`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/hooks/useTheme.ts`:
  - estado inicial: escolha salva em `localStorage` (chave `theme`) ou, sem escolha, `prefers-color-scheme`;
  - aplica a classe `dark` no `<html>`;
  - sem escolha salva, escuta a mudança do sistema (`matchMedia(...).addEventListener('change')`) e acompanha;
  - `toggleTheme()` alterna e salva a escolha, que passa a prevalecer;
  - todo acesso ao `localStorage` fica em `try/catch`: sem ele, a aplicação segue o sistema e o botão funciona só na visita atual.
- `src/components/ThemeToggle.tsx`: botão em pílula no header, com ícone de lua (ativa o escuro) ou sol (ativa o claro) e `aria-label`/`title` que indicam a ação.
- `index.html`: script inline no `<head>` que aplica a classe `dark` antes de o React montar, com a mesma regra do hook, para a página não piscar no modo errado.
- `src/test/setup.ts`: `vi.restoreAllMocks()` após cada teste (para as simulações de `localStorage`).

## Testes (`App.theme.test.tsx`)

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Primeira visita segue o sistema | sistema escuro → escuro; sistema claro → claro | passou |
| 2. Botão alterna | claro → escuro → claro | passou |
| 3. Escolha salva prevalece na próxima visita | escolhe escuro, desmonta e monta de novo com o sistema claro → escuro | passou |
| 4. *(manual)* Cores do modo escuro | navegador: fundo `rgb(11, 17, 32)`, cards de vidro, títulos brancos | OK |
| 5. Rótulo acessível indica a ação | "Ativar modo escuro" / "Ativar modo claro" | passou |
| 6. Sem `localStorage`, segue o sistema | `getItem`/`setItem` lançando erro: segue o sistema e o botão funciona | passou |
| 7. Sem escolha, acompanha o sistema; com escolha, ignora | troca simulada com `mockMatchMedia().change()` | passou |
| 8. *(manual)* Não pisca ao carregar | navegador: com `theme=dark` salvo, o `<html>` já tem a classe `dark` ao carregar; o botão alterna e salva `light` | OK |

Total da suíte: 101 testes passando. Lint e build OK.

## Textos da interface

| Onde | Texto |
|------|-------|
| Botão de tema (modo claro ativo) | Ativar modo escuro |
| Botão de tema (modo escuro ativo) | Ativar modo claro |
