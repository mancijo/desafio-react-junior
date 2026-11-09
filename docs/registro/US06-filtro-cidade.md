# US06 — Filtrar usuários por cidade

- **Branch:** `feat/city-filter`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/utils/collator.ts`: `Intl.Collator('pt-BR')` compartilhado para ordenar textos em português.
- `src/utils/filters.ts`:
  - `getCityOptions(users)`: cidades sem repetições, em ordem alfabética pt-BR;
  - `filterUsers(users, { city, company })`: aplica o filtro de cidade (`''` = todas), preservando a ordem.
- `src/components/SelectField.tsx`: lista de seleção reutilizável com `<label>` visível.
- `App.tsx`: seletor "Cidade" com a opção "Todas as cidades" e as cidades dos dados; a lista aplica a busca e depois o filtro.
- Refatoração: `normalizeText` passou a usar `\p{M}` para remover acentos. O Prettier transformava o intervalo `̀-ͯ` em caracteres invisíveis no código.

## Testes

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Opções extraídas dos dados, sem repetições, em ordem alfabética | `filters.test.ts`: `getCityOptions`; `App.filters.test.tsx`: "São Paulo" aparece uma vez | passou |
| 2. Escolher uma cidade exibe só os usuários dela | `filters.test.ts` e `App.filters.test.tsx` | passou |
| 3. "Todas as cidades" remove o filtro | `filters.test.ts` (`''`) e `App.filters.test.tsx` | passou |
| 4. Funciona com a busca e os demais filtros | `App.filters.test.tsx`: cidade + busca "jose". A combinação com a empresa é testada na US07 | passou |
| 5. Lista mostra sempre todas as cidades | a lista depende só dos dados carregados; teste com a empresa escolhida na US07 | — |

Total da suíte: 48 testes passando. Lint e build OK.

## Textos da interface

| Onde | Texto |
|------|-------|
| Rótulo do filtro | Cidade |
| Primeira opção | Todas as cidades |
