# Revisão final contra os requisitos do desafio

- **Branch:** `refactor/review-fixes`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## Verificação dos requisitos

Feita no código, em um clone limpo do GitHub (`npm install`, testes, lint, build e `npm run dev`) e no app publicado.

| Requisito do enunciado | Situação |
|------------------------|----------|
| Listar usuários com `https://jsonplaceholder.typicode.com/users` | Atendido |
| Exibir nome e email | Atendido |
| Campo de busca para filtrar pelo nome | Atendido |
| Detalhes em modal com nome completo, email, telefone, empresa e cidade | Atendido |
| Estados visuais de carregando e erro | Atendido |
| Código organizado, componentizado e tipado | Atendido, com as melhorias abaixo |

## Correções feitas a partir da revisão

| Ponto fraco | Correção | Testes |
|-------------|----------|--------|
| A resposta da API era só convertida (`as User[]`); um formato inesperado quebrava a interface em `users.map` | `fetchUsers` valida em tempo de execução (lista e campos usados de cada usuário) e lança erro, que vira a tela de erro | 3 novos em `usersApi.test.ts` e 1 em `App.error.test.tsx`; o teste do App falhava antes da correção |
| `strict` não aparecia no `tsconfig` (o TypeScript 7 já é estrito por padrão) | `"strict": true` declarado em `tsconfig.app.json` e `tsconfig.node.json` | `tsc -b` sem erros |
| `onSelect` recebia um parâmetro `trigger` que ninguém usava | Parâmetro removido de `UserCard` e `UserList` | suíte existente |
| `App.tsx` concentrava estado, regras e layout (130 linhas) | Hook `useUserListing` (busca, filtros, ordenação, opções) e componentes `ListingControls` e `PageIntro`; `App.tsx` com 61 linhas. O tipo `SelectOption` foi para `src/types` | 3 novos em `useUserListing.test.ts`; os testes do App continuaram passando sem alteração |
| README com o número de testes fixo, que ficaria desatualizado | Frase reescrita sem o número | — |

Total da suíte: 113 testes passando. Lint e build OK.

## Não alterado

- **Botão "tentar novamente" no erro:** não é exigido e seria uma funcionalidade nova; a mensagem segue orientando a recarregar a página.
- **Pasta antiga no OneDrive** (`C:\Users\TeonDesk\OneDrive\Documentos\TesteEstagio`): cópia desatualizada de `claude.md` e `docs/`, fora do repositório. Apagar fica a critério do responsável.
