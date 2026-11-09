# TS04 — Configurar Oxlint, Prettier, Husky e lint-staged

- **Branch:** `chore/code-quality`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- **Oxlint** (`.oxlintrc.json`):
  - categoria `correctness` como **erro**;
  - `react/rules-of-hooks` como erro;
  - `typescript/no-explicit-any` como erro (reforça a regra "sem `any`");
  - `dist` ignorado.
  - Script `lint` com `--deny-warnings`: avisos também falham.
- **Prettier 3.9** (`.prettierrc.json`): sem ponto e vírgula, aspas simples, vírgula final, 100 colunas, fim de linha LF (mesmo estilo do template do Vite).
  - `.prettierignore` exclui `dist`, `node_modules`, `package-lock.json`, `docs/` e `CLAUDE.md`, para não reformatar as tabelas da documentação.
  - Scripts `format` e `format:check`.
- **Husky 9** com hook `pre-commit` que roda o **lint-staged 17**:
  - `*.{ts,tsx}`: `oxlint --deny-warnings` e `prettier --write`;
  - `*.{css,json,html}`: `prettier --write`.
- Script `prepare: husky`, que instala os hooks automaticamente após `npm install`.

## Verificações

| Critério | Como foi verificado | Resultado |
|----------|---------------------|-----------|
| 1. `npm run lint` sem erros | Executado no projeto | OK |
| 2. Prettier compatível com o Oxlint | O Oxlint só ativa regras de correção (nenhuma regra de estilo), então não há conflito; `npm run format:check` passa | OK |
| 3. Husky executa o lint-staged no commit | `.husky/pre-commit` com `npx lint-staged`; executado no commit desta história | OK |
| 4. Commit com erro de lint é bloqueado | Arquivo temporário com `debugger` → commit recusado com `eslint(no-debugger)`; o arquivo foi descartado depois | OK |

`npm test` e `npm run build` também passaram.

## Decisões

- **Avisos tratados como erro** (`--deny-warnings`) para que o hook realmente barre problemas.
- **Documentação fora do Prettier**, para preservar a formatação manual das tabelas em `docs/`.

## Textos da interface

Nenhum texto novo.
