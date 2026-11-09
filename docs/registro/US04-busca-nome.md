# US04 — Buscar usuários pelo nome

- **Branch:** `feat/name-search`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- **Fuse.js 7.5** instalado.
- `src/utils/text.ts`: `normalizeText` remove acentos (NFD), converte para minúsculas e apara espaços.
- `src/utils/search.ts`: `searchUsersByName(users, term)`, função pura:
  - termo vazio → todos;
  - 1–2 letras → só nomes com o trecho exato;
  - 3+ letras → trecho exato **mais** as correspondências do Fuse.js (`keys: ['name']`, `ignoreLocation: true`, `threshold: 0.3`, texto normalizado pelo `getFn`);
  - preserva a ordem original (a ordenação vem na US08).
- `src/components/SearchBar.tsx`: campo `type="search"` com `<label>` visível.
- `App.tsx` guarda o termo e filtra a lista a cada tecla (`useMemo`).

## Testes

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Filtra a cada tecla | `App.search.test.tsx`: filtra a lista a cada tecla digitada | passou |
| 2. Ignora maiúsculas/minúsculas | `search.test.ts`: "leanne" e "LEANNE" | passou |
| 3. Ignora acentos | `search.test.ts`: "jose araujo", "erica goncalves" e "léanne" | passou |
| 4. "Lenne Grahm" encontra "Leanne Graham" | `search.test.ts` | passou |
| 5. "xyz" não retorna ninguém | `search.test.ts` | passou |
| 6. Campo vazio mostra todos | `search.test.ts` (vazio e só espaços) e `App.search.test.tsx` (ao limpar o campo) | passou |
| 7. *(revisão de código)* Lógica isolada | função pura em `src/utils/search.ts` | OK |
| 8. Só `name`: username "qwzk" não retorna ninguém | `search.test.ts` | passou |
| 9. Qualquer parte do nome ("graham") | `search.test.ts` | passou |
| 10. 1–2 letras por trecho exato ("gr" sim, "gx" não) | `search.test.ts` | passou |
| 11. 3+ letras: exato + aproximado, sem repetições | `search.test.ts` ("grahm" e "lima") | passou |
| 12. Nome com o trecho continua ao digitar mais letras | `search.test.ts` ("gr" → "graham") | passou |

Total da suíte: 41 testes passando. Lint e build OK.

### Conferência com os nomes reais da API

Além dos testes, a busca foi conferida com os 10 nomes reais do JSONPlaceholder:

| Termo | Resultado |
|-------|-----------|
| `chelsy` | Chelsey Dietrich (aproximado) |
| `weisnat` | Kurtis Weissnat (aproximado) |
| `lenne grahm` | Leanne Graham (aproximado) |
| `bret`, `eri`, `sam`, `abc`, `xyz`, `qwe` | nenhum resultado |

## Decisões

- `threshold` de 0,3: tolera um ou dois erros de digitação em nomes de tamanho médio e não traz resultados para termos sem relação.
- Funções puras em `src/utils/` (ver `docs/PENDENCIAS.md`, item 1).

## Textos da interface

| Onde | Texto |
|------|-------|
| Rótulo da busca | Buscar por nome |
| Placeholder | Ex.: Leanne Graham |
