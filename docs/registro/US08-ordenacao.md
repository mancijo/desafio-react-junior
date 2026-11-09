# US08 — Ordenar usuários por nome

- **Branch:** `feat/name-sort`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/utils/sort.ts`: `sortUsersByName(users, 'asc' | 'desc')`, função pura:
  - compara com `Intl.Collator('pt-BR')` (acentos tratados como a letra base);
  - ignora os títulos `Mr.`, `Mrs.`, `Ms.`, `Miss` e `Dr.` só na comparação;
  - em empate, desempata pelo nome completo;
  - devolve uma nova lista, sem alterar a original.
- `App.tsx`:
  - seletor "Ordenar por nome" com apenas A–Z e Z–A, iniciando em A–Z;
  - fluxo da lista: busca → filtros → ordenação. Com busca ativa, a ordem é sempre a do nome (a busca preserva a ordem e a ordenação é aplicada no fim).
  - Controles em 4 colunas no desktop e 2 em telas médias.

## Testes

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. A–Z em ordem crescente | `sort.test.ts`; `App.sort.test.tsx` | passou |
| 2. Z–A em ordem decrescente | `sort.test.ts`; `App.sort.test.tsx`: escolher Z–A | passou |
| 3. Respeita acentos do português | `sort.test.ts`: "Érica" entre "Eduardo" e "Ervin" | passou |
| 4. Ordena o resultado da busca e dos filtros | `App.sort.test.tsx`: São Paulo → Érica antes de José (a API devolve José primeiro) | passou |
| 5. Com busca ativa, a ordenação prevalece | `App.sort.test.tsx`: busca "e" em A–Z e Z–A | passou |
| 6. Abre em A–Z | `App.sort.test.tsx`: primeiro item "Ana Júlia Souza" | passou |
| 7. Só A–Z e Z–A; nunca a ordem da API | `App.sort.test.tsx`: opções do seletor | passou |
| 8. Títulos ignorados só para ordenar | `sort.test.ts`: "Mrs. Dennis Schulist" na letra D; os cinco títulos | passou |

Total da suíte: 74 testes passando. Lint e build OK.

## Textos da interface

| Onde | Texto |
|------|-------|
| Rótulo | Ordenar por nome |
| Opções | A–Z, Z–A |
