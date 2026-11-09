# TS03 — Configurar Vitest + React Testing Library

- **Branch:** `chore/vitest-setup`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- Instalados: Vitest 5.1, jsdom 31, `@testing-library/react` 16.3, `@testing-library/dom` 10.4, `@testing-library/jest-dom` 7.0 e `@testing-library/user-event` 14.6.
- Bloco `test` no `vite.config.ts`: `environment: 'jsdom'`, `globals: true`, `setupFiles: ['./src/test/setup.ts']`, `css: false`.
- Scripts: `npm test` (`vitest run`) e `npm run test:watch` (`vitest`).
- `tsconfig.app.json` com os tipos `vitest/globals`.
- `src/test/setup.ts`:
  - matchers do jest-dom (`@testing-library/jest-dom/vitest`);
  - `cleanup()` e limpeza de `localStorage` e da classe `dark` após cada teste;
  - simulação de `window.matchMedia`, que o jsdom não implementa.
- `src/test/matchMedia.ts`: `mockMatchMedia(matches)` define a preferência do sistema e devolve `change(matches)` para simular a troca com a página aberta (US13).

## Testes

| Arquivo | Caso | Resultado |
|---------|------|-----------|
| `src/App.test.tsx` | exibe o título principal como `<h1>` | passou |
| `src/test/setup.test.tsx` | `matchMedia` simulado, sistema claro por padrão | passou |
| | simula a troca da preferência do sistema | passou |
| | `user-event` disponível para simular digitação | passou |

## Verificações

| Critério | Resultado |
|----------|-----------|
| 1. `npm test` executa o Vitest com `jsdom` | OK |
| 2. Configuração no `vite.config.ts` (`environment`, `globals`, `setupFiles`) | OK |
| 3. Matchers do jest-dom via `@testing-library/jest-dom/vitest` | OK |
| 4. `@testing-library/user-event` disponível | OK |
| 5. Um teste de exemplo passa | OK (4 testes) |
| 6. Simulação de `matchMedia` (e de `<dialog>`, se usado) | OK; o modal não usará `<dialog>` nativo (ver abaixo) |

`npm run lint` e `npm run build` também passaram.

## Decisões

- **Modal sem `<dialog>` nativo:** o modal (US09–US10) será um componente próprio com `role="dialog"`, `aria-modal` e foco preso implementado no React. Assim o comportamento é igual no navegador e no jsdom, sem precisar simular `showModal()`.
- **`css: false`:** os testes não processam CSS (o Tailwind não é necessário para testar comportamento), o que deixa a execução mais rápida.

## Textos da interface

Nenhum texto novo.
