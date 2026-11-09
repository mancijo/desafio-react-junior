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
  - 3+ letras → trecho exato **mais** as correspondências do Fuse.js (`keys: ['name']`, `ignoreLocation: true`, `threshold: 0.2` (0.3 na primeira versão), texto normalizado pelo `getFn`);
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

- `threshold` de 0,3 na primeira versão (revisto para 0,2; ver abaixo).
- Funções puras em `src/utils/`, uma pasta a mais na estrutura por tipo: nenhuma das pastas previstas servia para funções puras isoladas e testáveis. Decisão aceita pelo responsável.

## Textos da interface

| Onde | Texto |
|------|-------|
| Rótulo da busca | Buscar por nome |
| Placeholder | Ex.: Leanne Graham |

## Revisão posterior — busca mais exata (`threshold` 0,2)

O responsável reduziu o `FUZZY_THRESHOLD` de 0,3 para **0,2** em `src/utils/search.ts`, para a busca aproximada ficar mais exata.

**Efeito** (o Fuse.js aceita um resultado quando erros ÷ tamanho do termo ≤ `threshold`):

| Tamanho do termo | Erros tolerados com 0,3 | Erros tolerados com 0,2 |
|------------------|-------------------------|-------------------------|
| 3 letras | 0 | 0 |
| 4 letras | 1 | 0 |
| 5 a 9 letras | 1 a 2 | 1 |
| 10 a 14 letras | 3 a 4 | 2 |

**Comparação com os 10 nomes reais da API** (22 termos testados; só 2 mudaram):

| Termo | Com 0,3 | Com 0,2 |
|-------|---------|---------|
| `lean` | Leanne Graham, **Glenna Reichert** | Leanne Graham |
| `ervn` | Ervin Howell | nenhum resultado |
| `lenne grahm`, `chelsy`, `weisnat`, `patrica`, `glena`, `nicolas`, `denis`, `howel` | encontram o nome certo | iguais |
| `xyz`, `bret`, `sam`, `buach` | nenhum resultado | iguais |

- **Ganho:** some a correspondência fraca `lean` → "Glenna Reichert".
- **Custo:** um erro de digitação em um termo de 4 letras (`ervn`) deixa de ser tolerado.
- **Margem:** `Lenne Grahm` (2 erros em 11 letras = 0,18) continua passando, mas perto do limite; `grahm` (1 erro em 5 letras = 0,20) passa exatamente no limite. Um valor abaixo de 0,2 quebraria os critérios 4 e 11.

**Testes novos** em `src/tests/utils/search.test.ts`:

- `lean` encontra só "Leanne Graham" (falha com 0,3, passa com 0,2);
- um erro de digitação é tolerado em termos com 5 letras ou mais (`glena`, `eduado`).

Os 12 critérios da história continuam passando sem alteração.
