# Lista de Usuários — Desafio React Júnior

Aplicação em **React + Vite + TypeScript** que consome a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) e exibe uma lista de usuários com busca, filtros, ordenação e detalhes em modal.

**Aplicação publicada:** https://mancijo.github.io/desafio-react-junior/

## Funcionalidades

- **Lista de usuários** com nome e email, carregada de `https://jsonplaceholder.typicode.com/users`.
- **Busca por nome em tempo real**:
  - ignora maiúsculas/minúsculas e acentos (`jose` encontra "José");
  - encontra qualquer parte do nome, como o sobrenome;
  - tolera erros de digitação a partir de 3 letras (`Lenne Grahm` encontra "Leanne Graham"), com Fuse.js.
- **Filtros** por cidade e por empresa (opções extraídas dos dados, em ordem alfabética).
- **Ordenação** por nome, A–Z ou Z–A (títulos como "Mrs." são ignorados para ordenar).
- **Modal de detalhes** com todos os dados do usuário, agrupados em Pessoal, Contato, Endereço e Empresa. Fecha pelo botão, com `Esc` ou clicando no fundo.
- **Estados visuais**: spinner de carregamento, mensagem de erro e aviso quando nenhum usuário é encontrado.
- **Modo claro e escuro**: segue o sistema na primeira visita; a escolha feita no botão fica salva no navegador.
- **Responsivo** a partir de 320 px e **acessível**: navegação por teclado, foco preso no modal, rótulos em todos os campos e contraste AA nos dois modos.
- Interface baseada no guia de identidade visual da CDT Software.

> **Observação sobre os dados:** no JSONPlaceholder, cada um dos 10 usuários tem cidade e empresa diferentes. Por isso, cada filtro sozinho sempre mostra um único usuário, e combinar os dois quase sempre resulta em "nenhum usuário encontrado". O comportamento está correto; os testes usam dados simulados com cidades e empresas repetidas para cobrir esses casos.

## Tecnologias

| Área | Ferramenta |
|------|------------|
| Interface | React 19, TypeScript 7 |
| Build e servidor de desenvolvimento | Vite 8 |
| Estilos | Tailwind CSS 4 (tokens da identidade visual em `tailwind.config.ts`) |
| Fonte | Plus Jakarta Sans (Fontsource, servida pelo próprio projeto) |
| Busca aproximada | Fuse.js |
| Requisições | `fetch` nativo encapsulado no hook `useUsers` |
| Testes | Vitest + React Testing Library + user-event (jsdom) |
| Qualidade | Oxlint, Prettier, Husky + lint-staged |
| Deploy | GitHub Actions → GitHub Pages |

## Como rodar

Pré-requisito: **Node.js 20.19+ ou 22.12+** (exigência do Vite 8; desenvolvido com Node 24).

```bash
npm install
npm run dev
```

O endereço aparece no terminal (por padrão, http://localhost:5173/desafio-react-junior/).

## Scripts

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | servidor de desenvolvimento |
| `npm test` | roda todos os testes uma vez |
| `npm run test:watch` | testes em modo observação |
| `npm run lint` | análise estática com Oxlint |
| `npm run format` | formata o código com Prettier |
| `npm run build` | verifica os tipos e gera o build de produção em `dist/` |
| `npm run preview` | serve o build de produção localmente |

## Testes

```bash
npm test
```

Os testes foram escritos **antes** da implementação (TDD), um por critério de aceitação do backlog. Eles nunca chamam a API real: usam `fetch` simulado e dados de exemplo com nomes acentuados (os dados reais não têm acentos).

## Estrutura

```
src/
├── components/   # componentes de interface (cards, modal, campos, estados)
├── hooks/        # useUsers, useUserListing, useTheme, useModalBehavior
├── services/     # acesso à API (fetchUsers)
├── types/        # User, Address, Company, Geo
├── utils/        # funções puras: busca, filtros, ordenação, normalização de texto
└── test/         # configuração dos testes, mocks e dados de exemplo
```

## Documentação do desenvolvimento

- [`docs/PLANEJAMENTO.md`](docs/PLANEJAMENTO.md): decisões do projeto e histórico.
- [`docs/BACKLOG.md`](docs/BACKLOG.md): histórias, critérios de aceitação e Definição de Pronto.
- [`docs/registro/`](docs/registro): registro de cada história (o que foi feito, testes, decisões e textos).
- [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md): pontos assumidos durante o desenvolvimento.
- [`docs/testereactjunior.pdf`](docs/testereactjunior.pdf): enunciado do desafio.

O desenvolvimento seguiu uma branch por história, com commits em Conventional Commits e integração na `main` por merge.
