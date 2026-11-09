# US05 — Ver aviso quando a busca não encontra ninguém

- **Branch:** `feat/empty-search-state`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/components/EmptyState.tsx`: aviso com `role="status"`, título e descrição opcional, em um card com borda tracejada.
- `App.tsx`:
  - busca e filtros sem resultado → `Nenhum usuário encontrado para "<termo>".` (ou `Nenhum usuário encontrado.` quando não há termo), com a orientação "Tente outro nome ou altere os filtros.";
  - API sem nenhum usuário → `Nenhum usuário cadastrado.` (sem busca e filtros, que não teriam o que filtrar).

## Testes (`App.empty.test.tsx`)

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Mensagem no lugar da lista quando busca/filtros não retornam ninguém | busca "xyz"; filtros Curitiba + Açaí Tech | passou |
| 2. Mensagem some e a lista volta quando há resultados | "xyz" → "graham" | passou |
| 3. Anunciada a leitores de tela (`role="status"`) | passou | passou |
| 4. Mostra o termo buscado | `Nenhum usuário encontrado para "xyz".` | passou |
| 5. API sem usuários → "Nenhum usuário cadastrado." | `fetch` devolvendo `[]` | passou |

Total da suíte: 63 testes passando. Lint e build OK.

## Decisões

- Com a API vazia, a busca e os filtros não aparecem (não há o que filtrar). Decisão aceita pelo responsável.

## Textos da interface

| Onde | Texto |
|------|-------|
| Sem resultado, com termo | Nenhum usuário encontrado para "<termo>". |
| Sem resultado, sem termo | Nenhum usuário encontrado. |
| Orientação | Tente outro nome ou altere os filtros. |
| API sem usuários | Nenhum usuário cadastrado. |
