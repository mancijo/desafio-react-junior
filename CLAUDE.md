# CLAUDE.md — Lista de Usuários (JSONPlaceholder)

Instruções para o Claude Code neste repositório. Antes de qualquer tarefa, leia:

- `docs/PLANEJAMENTO.md` — decisões do projeto (fonte da verdade).
- `docs/BACKLOG.md` — histórias, critérios de aceitação e Definição de Pronto.
- `docs/Guia de Identidade Visual e Interface — CDT Software.md` — referência visual.
- `docs/testereactjunior.pdf` — enunciado original do desafio.

## Regras de trabalho

- **Desenvolvimento contínuo autorizado.** Você pode desenvolver o sistema inteiro, história após história, na ordem de dependências do backlog, sem esperar pedido a cada etapa.
- **Pendências não bloqueiam.** Se algo não estiver definido no planejamento ou no backlog, adote a opção mais simples e coerente com as decisões já tomadas, siga em frente e anote a pendência em `docs/PENDENCIAS.md` (o que foi assumido e por quê). Essas pendências são apresentadas ao responsável **no final do desenvolvimento**. Só pare para perguntar se a dúvida for essencial (ex.: impede a entrega ou contradiz uma decisão registrada).
- Itens marcados *(proposta)* no backlog só entram se forem confirmados.
- **Textos da interface:** você define os textos de cada história (título, rótulos, placeholders, mensagens, `aria-label`). Escreva em pt-BR, curtos e claros; mantenha os valores da API no original. Liste os textos usados no registro da etapa em `docs/`, para revisão na entrega.
- Ao surgir uma nova decisão, registre-a no `docs/PLANEJAMENTO.md` (seção e histórico de decisões).
- Responda e documente em **português (pt-BR)**.

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4 (`darkMode: 'class'`, tokens da identidade visual no `tailwind.config.ts`, carregado com `@config` em `src/index.css`)
- Fonte Plus Jakarta Sans servida pelo projeto (`@fontsource-variable/plus-jakarta-sans`)
- Requisições com `fetch` nativo encapsulado em hook próprio (ex.: `useUsers`)
- Busca aproximada com Fuse.js
- Testes: Vitest + React Testing Library (configuração no `vite.config.ts`, ambiente `jsdom`)
- Qualidade: Oxlint (`.oxlintrc.json`), Prettier, Husky + lint-staged

## Comandos

```bash
npm install      # instalar dependências
npm run dev      # rodar em desenvolvimento
npm test         # rodar os testes (Vitest)
npm run lint     # Oxlint
npm run build    # build de produção
```

## TDD (obrigatório)

1. Escreva primeiro os testes dos critérios de aceitação da história (`Dado / Quando / Então` → um caso de teste cada).
2. Rode os testes e confirme que falham.
3. Implemente o mínimo para passarem; depois refatore.
4. Commit dos testes (`test:`) antes ou junto da implementação (`feat:`).

Regras dos testes:

- Nunca chame a API real: use `fetch` simulado e fixtures.
- As fixtures incluem nomes acentuados (os dados reais do JSONPlaceholder não têm acentos).
- Simulações com `vi.fn()`, `vi.spyOn()` e `vi.mock()`; interações com `@testing-library/user-event`.
- O jsdom não implementa bem o `<dialog>` nativo (`showModal()`); se usá-lo no modal, simule-o nos testes.

## Estrutura de pastas (por tipo)

```
src/
├── components/   # componentes de interface
├── hooks/        # hooks próprios (ex.: useUsers, useUserSearch)
├── services/     # acesso à API
├── types/        # User, Address, Company, Geo
├── utils/        # funções puras: busca, filtros, ordenação, texto
└── test/         # setup, mocks (fetch, matchMedia) e fixtures
```

- Código totalmente tipado; sem `any`.
- Componentes pequenos e reutilizáveis; lógica de busca, filtros e ordenação isolada e testável.

## Git

- Uma branch por história, com o nome indicado no backlog (ex.: `feat/name-search`, `chore/vitest-setup`).
- Commits em **Conventional Commits**: `feat:`, `fix:`, `test:`, `docs:`, `chore:`, `refactor:`, `style:`.
- Integração na `main` via merge (`--no-ff`), só com testes, lint e build passando.
- **Commits, merges e push autorizados**: ao concluir cada história, faça o merge na `main` e envie a `main` e a branch ao GitHub (`origin`). Nunca use `--force` nem reescreva o histórico já publicado.

## Regras de comportamento já decididas

- Endpoint: `https://jsonplaceholder.typicode.com/users`.
- Lista mostra apenas nome e email; o clique abre um **modal com apenas nome completo, email, telefone, empresa e cidade** (sem grupos, nenhum outro campo). O modal já nasce com botão de fechar (US09) e usa o usuário já carregado, sem nova requisição; o email aparece como texto, sem link. `Esc`, clique no fundo e foco preso vêm na US10.
- Busca por nome em tempo real, ignorando maiúsculas/minúsculas e acentos, tolerante a erros de digitação (Fuse.js); termos sem relação com nenhum nome (ex.: `xyz`) não retornam resultados.
  - Considera **apenas `name`** e encontra qualquer parte do nome (inclusive o sobrenome).
  - Termos de 1–2 letras: trecho exato, sem tolerância. A partir de 3 letras: trecho exato **somado** às correspondências aproximadas do Fuse.js (um acerto exato nunca some ao digitar mais uma letra).
- Filtros de cidade e empresa em listas de seleção (opções extraídas dos dados, sem repetição, em ordem alfabética `pt-BR`), **independentes** entre si.
- Ordenação por nome com apenas A–Z e Z–A; a lista **abre em A–Z** e nunca segue a ordem da API. Títulos (`Mr.`, `Mrs.`, `Ms.`, `Miss`, `Dr.`) são ignorados só para ordenar.
- Requisição cancelada com `AbortController` ao desmontar.
- Lista vazia: mensagem com `role="status"` que mostra o termo buscado; se a API não retornar usuários, mensagem própria de "nenhum usuário cadastrado". Sem anúncio da contagem de resultados (`aria-live`).
- Com busca ativa, a **ordenação por nome prevalece** sobre a relevância do Fuse.js.
- Estados: spinner (`animate-spin`, ciano) ao carregar; componente próprio de erro (`role="alert"`); mensagem quando nada é encontrado.

## Interface

- Segue o guia da CDT Software, **sem alternância de seções**: um único fundo por modo.
- **Header fixo com fundo marinho** (`rgba(11,17,32,.82)` + `backdrop-blur`) e borda inferior sutil nos dois modos — é a única exceção ao fundo único.
- Tokens do guia completos no `tailwind.config`; componentes (botões, chips etc.) só quando uma história precisar.
- Modo claro: fundo `#FFFFFF`, títulos `#0F172A`, corpo `#475569`, cards claros (raio 16 px, borda `rgba(148,163,184,.32)`). Destaques em **ciano escuro `#0077A8`** (texto, links, rótulos, foco, fundo do botão primário, spinner), pois o `#00AEEF` não atinge contraste AA sobre branco.
- Modo escuro: fundo `#0B1120`, cards de vidro, títulos brancos, corpo branco ≥ 72%, destaques ciano `#00AEEF`.
- O ciano de marca `#00AEEF` continua valendo sobre fundo marinho (modo escuro e header) e em fundos translúcidos decorativos.
- Modo inicial segue `prefers-color-scheme` (e acompanha mudanças do sistema enquanto não houver escolha salva); botão alterna; escolha salva em `localStorage` (com fallback se indisponível). O tema é aplicado por script inline no `index.html`, antes de o React montar, para não piscar.
- Fonte Plus Jakarta Sans; botões em pílula; transições de 0,3 s; respeitar `prefers-reduced-motion`.
- Acessibilidade: `lang="pt-BR"`, `<h1>` real, rótulos em todos os campos, foco visível, modal com `role="dialog"`, `aria-modal`, foco preso e `Esc` para fechar, contraste AA.
- Responsivo a partir de 320 px, container máximo de 1280 px.

## Definição de Pronto

Siga a DoD do `docs/BACKLOG.md`. Ao concluir cada história, registre em `docs/` o que foi feito, as decisões e os testes.

## Entrega

- Repositório público no GitHub: `desafio-react-junior`; deploy no GitHub Pages com `base: '/desafio-react-junior/'` no Vite, publicado automaticamente por GitHub Actions a cada atualização da `main`.
- `README.md` com visão geral, tecnologias, como instalar, rodar, testar e o link publicado.
