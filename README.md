# Lista de Usuários — Desafio React Júnior

Aplicação em **React + Vite + TypeScript** que consome a API pública <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noopener noreferrer">JSONPlaceholder</a> e exibe uma lista de usuários com busca, filtros, ordenação e detalhes em modal.

**Aplicação publicada:** <a href="https://mancijo.github.io/desafio-react-junior/" target="_blank" rel="noopener noreferrer">https://mancijo.github.io/desafio-react-junior/</a>

## Funcionalidades

- **Lista de usuários** com nome e email, carregada de `https://jsonplaceholder.typicode.com/users`.
- **Busca por nome em tempo real**:
  - ignora maiúsculas/minúsculas e acentos (`jose` encontra "José");
  - encontra qualquer parte do nome, como o sobrenome;
  - tolera erros de digitação (`Lenne Grahm` encontra "Leanne Graham"), com Fuse.js: 1 erro em termos com 5 letras ou mais, 2 erros com 10 ou mais.
- **Filtros** por cidade e por empresa (opções extraídas dos dados, em ordem alfabética).
- **Ordenação** por nome, A–Z ou Z–A (títulos como "Mrs." são ignorados para ordenar).
- **Modal de detalhes** com nome completo, email, telefone, empresa e cidade. Fecha pelo botão, com `Esc` ou clicando no fundo.
- **Estados visuais**: spinner de carregamento, mensagem de erro e aviso quando nenhum usuário é encontrado.
- **Modo claro e escuro**: segue o sistema na primeira visita; a escolha feita no botão fica salva no navegador.
- **Responsivo** a partir de 320 px e **acessível**: navegação por teclado, foco preso no modal, rótulos em todos os campos e contraste AA nos dois modos.
- **Identidade visual** do site da CDT Software (ver abaixo).

> **Observação sobre os dados:** no JSONPlaceholder, cada um dos 10 usuários tem cidade e empresa diferentes. Por isso, cada filtro sozinho sempre mostra um único usuário, e combinar os dois quase sempre resulta em "nenhum usuário encontrado". O comportamento está correto; os testes usam dados simulados com cidades e empresas repetidas para cobrir esses casos.

## Identidade visual

A interface aplica os padrões visuais do site da empresa, <a href="https://www1.cdtsoftware.com.br/" target="_blank" rel="noopener noreferrer">www1.cdtsoftware.com.br</a>, descritos no <a href="docs/Guia%20de%20Identidade%20Visual%20e%20Interface%20%E2%80%94%20CDT%20Software.md" target="_blank" rel="noopener noreferrer">guia de identidade visual</a> do projeto:

| Padrão do site | Como foi aplicado |
|----------------|-------------------|
| Azul ciano de marca (`#00AEEF`) | Destaques no modo escuro e no header; no modo claro, um ciano mais escuro (`#0077A8`) garante o contraste AA sobre branco |
| Azul-marinho profundo (`#0B1120`) | Fundo do modo escuro e do header fixo, translúcido e com desfoque |
| Fonte Plus Jakarta Sans | Fonte única da interface, com os pesos do guia (títulos em 800, corpo em 400) |
| Títulos em caixa alta e sobretítulo ciano | Topo da página e cabeçalho do modal |
| Cards claros e de vidro, raio de 16 px e borda sutil | Cards de usuário e painel do modal, nos modos claro e escuro |
| Botões em pílula | Botão de tema e botão de fechar do modal |
| Ícones em linha fina sobre fundo ciano translúcido | Ícone do header |
| Transições de 0,3 s | Hover dos cards, campos e botões, respeitando `prefers-reduced-motion` |

Os valores ficam como tokens em `tailwind.config.ts`. Diferente do site, a página usa um único fundo por modo, sem alternar seções claras e escuras.

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

O endereço aparece no terminal (por padrão, <a href="http://localhost:5173/desafio-react-junior/" target="_blank" rel="noopener noreferrer">http://localhost:5173/desafio-react-junior/</a>).

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

Os testes foram escritos **antes** da implementação (TDD), um por critério de aceitação do backlog.

> **API real × mock:** a aplicação (em `npm run dev` e no GitHub Pages) **sempre consome a API real** do JSONPlaceholder; não há nenhum mock no código da aplicação. O `fetch` simulado e os dados de exemplo existem **só nos testes** (`src/tests/mocks` e `src/tests/fixtures`), para que eles não dependam da internet e possam cobrir casos que a API real não oferece: erro HTTP, falha de rede, resposta fora do formato e nomes acentuados.

## Estrutura

```
src/
├── components/   # componentes de interface (cards, modal, campos, estados)
├── hooks/        # useUsers, useUserListing, useTheme, useModalBehavior
├── services/     # acesso à API (fetchUsers)
├── types/        # User, Address, Company, Geo, SelectOption
├── utils/        # funções puras: busca, filtros, ordenação, normalização de texto
└── tests/        # todos os testes
    ├── app/          # integração: o App inteiro, um arquivo por história
    ├── components/   # unitários dos componentes
    ├── hooks/        # unitários dos hooks
    ├── services/     # unitários do acesso à API
    ├── utils/        # unitários das funções puras
    ├── mocks/        # fetch e matchMedia simulados
    ├── fixtures/     # dados de exemplo
    └── setup.ts      # configuração do Vitest
```

## Documentação do desenvolvimento

- <a href="docs/PLANEJAMENTO.md" target="_blank" rel="noopener noreferrer"><code>docs/PLANEJAMENTO.md</code></a>: decisões do projeto e histórico.
- <a href="docs/BACKLOG.md" target="_blank" rel="noopener noreferrer"><code>docs/BACKLOG.md</code></a>: histórias, critérios de aceitação e Definição de Pronto.
- <a href="docs/registro" target="_blank" rel="noopener noreferrer"><code>docs/registro/</code></a>: registro de cada história (o que foi feito, testes, decisões e textos).
- <a href="docs/testereactjunior.pdf" target="_blank" rel="noopener noreferrer"><code>docs/testereactjunior.pdf</code></a>: enunciado do desafio.

O desenvolvimento seguiu uma branch por história, com commits em Conventional Commits e integração na `main` por merge.
