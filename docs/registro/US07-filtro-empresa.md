# US07 — Filtrar usuários por empresa

- **Branch:** `feat/company-filter`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/utils/filters.ts`:
  - `getCompanyOptions(users)`: empresas sem repetições, em ordem alfabética pt-BR;
  - `filterUsers` passou a combinar cidade **e** empresa.
- `App.tsx`: seletor "Empresa" com a opção "Todas as empresas", ao lado da busca e da cidade (3 colunas a partir de telas médias).

## Testes

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Opções extraídas dos dados, sem repetições, em ordem alfabética | `filters.test.ts`: `getCompanyOptions`; `App.companyFilter.test.tsx`: "Café & Cia" aparece uma vez | passou |
| 2. Escolher uma empresa exibe só os usuários dela | `filters.test.ts` e `App.companyFilter.test.tsx` | passou |
| 3. "Todas as empresas" remove o filtro | `App.companyFilter.test.tsx` | passou |
| 4. Funciona com a busca e o filtro de cidade | `filters.test.ts` (cidade + empresa; combinação vazia) e `App.companyFilter.test.tsx` (cidade + empresa + busca) | passou |
| 5. Listas independentes (sempre todas as opções) | `App.companyFilter.test.tsx`: as opções de cada lista não mudam ao escolher na outra. Também cobre o critério 5 da US06 | passou |

Total da suíte: 57 testes passando. Lint e build OK.

## Textos da interface

| Onde | Texto |
|------|-------|
| Rótulo do filtro | Empresa |
| Primeira opção | Todas as empresas |
