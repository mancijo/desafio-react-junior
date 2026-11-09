# US01 — Ver a lista de usuários

- **Branch:** `feat/user-list`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/types/user.ts`: tipos `User`, `Address`, `Company` e `Geo`.
- `src/services/usersApi.ts`: `fetchUsers(signal?)` faz `GET` em `USERS_URL` e lança erro em falha de rede ou status fora de 2xx.
- `src/hooks/useUsers.ts`: expõe `{ users, status, error }` (`status`: `loading`, `success` ou `error`). A requisição é cancelada com `AbortController` ao desmontar e um cancelamento não vira erro.
- `src/components/UserList.tsx` e `UserCard.tsx`: lista em cards; cada card é um `<button>` com nome e email (já preparado para abrir o modal na US09).
- `App.tsx` usa o hook e exibe a lista quando os dados chegam.
- Apoio aos testes: `src/test/fixtures/users.ts` (10 usuários, com nomes acentuados) e `src/test/fetchMock.ts` (sucesso, erro HTTP, erro de rede e requisição pendente que respeita o `AbortSignal`).

## Testes

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. `GET` em `https://jsonplaceholder.typicode.com/users` | `usersApi.test.ts`: faz um GET no endpoint; `App.test.tsx`: ao carregar, busca na API | passou |
| 2. Cada usuário com nome e email | `UserList.test.tsx`: exibe o nome e o email de cada usuário; não exibe outros dados | passou |
| 3. 10 usuários → 10 itens | `UserList.test.tsx` e `App.test.tsx` | passou |
| 4. *(revisão de código)* Tipos em `src/types` | conferido no código e no `tsc` do build | OK |
| 5. *(revisão de código)* Serviço em `services`, estado em hook | conferido no código | OK |
| 6. Cancelamento ao desmontar | `useUsers.test.ts`: cancela a requisição ao desmontar | passou |

Também testado: `fetchUsers` devolve os dados, repassa o `AbortSignal` e lança erro em HTTP 500 e falha de rede; `useUsers` expõe sucesso e erro.

Total da suíte: 16 testes passando. `npm run lint` e `npm run build` OK.

## Textos da interface

| Onde | Texto |
|------|-------|
| `aria-label` da lista | Usuários |
