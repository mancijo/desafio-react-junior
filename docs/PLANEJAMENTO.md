# Planejamento — Lista de Usuários (JSONPlaceholder)

> Documento vivo de planejamento. Registra apenas o que foi **definido** pelo responsável do projeto.
> Status: **em planejamento** — o desenvolvimento ainda não foi iniciado.

Última atualização: 09/11/2026

---

## 1. Contexto

Projeto desenvolvido como resposta ao **Desafio Técnico – Desenvolvedor Front-End Júnior (React + Vite + TypeScript)**.

O teste avalia conhecimentos básicos em React, TypeScript, organização de código, consumo de API e criação de interfaces simples.

## 2. Objetivo

Criar uma aplicação simples com React, Vite e TypeScript que consome a API pública JSONPlaceholder e exibe uma lista de usuários, com busca por nome e visualização de detalhes.

## 3. Stack definida

| Item          | Tecnologia   | Origem |
|---------------|--------------|--------|
| Biblioteca    | React        | Desafio |
| Build/Dev     | Vite         | Responsável |
| Linguagem     | TypeScript   | Desafio |
| Estilização   | Tailwind CSS | Responsável (atende diferencial do desafio) |
| Requisições HTTP | `fetch` nativo + hook próprio | Responsável |
| Testes        | Vitest + React Testing Library | Responsável (atende diferencial do desafio; API compatível com Jest) |
| Busca aproximada | Fuse.js   | Responsável |
| Estado de carregando | Spinner com Tailwind (`animate-spin`) | Responsável |
| Estado de erro | Componente próprio com Tailwind | Responsável |
| Qualidade de código | Oxlint, Prettier, Husky + lint-staged | Responsável |
| Versionamento | Git          | Responsável |

## 4. Metodologia e organização

### 4.1 Desenvolvimento orientado a testes

**TDD:** para cada funcionalidade, os testes são definidos e escritos **primeiro**; só depois é feita a implementação que os faz passar.

Ferramenta de testes: **Vitest + React Testing Library**, configurado no próprio `vite.config.ts` (ambiente `jsdom`), reaproveitando a configuração do Vite.

### 4.2 Estrutura de pastas

Organização **por tipo**:

```
src/
├── components/   # componentes de interface
├── hooks/        # hooks próprios (ex.: requisição à API)
├── services/     # acesso à API
└── types/        # tipos e interfaces TypeScript
```

### 4.3 Qualidade de código

- **Oxlint** para análise estática (já incluído pelo template do Vite; configuração em `.oxlintrc.json`).
- **Prettier** para formatação automática.
- **Husky + lint-staged** para validar os arquivos alterados antes de cada commit.

### 4.4 Versionamento (Git)

- Mensagens no padrão **Conventional Commits** (`feat:`, `fix:`, `test:`, `docs:`, `chore:` etc.).
- **Uma branch por funcionalidade**, integrada à `main` via merge.

## 5. Requisitos funcionais

| ID   | Requisito | Status |
|------|-----------|--------|
| RF01 | Listar usuários a partir do endpoint `https://jsonplaceholder.typicode.com/users` | Definido |
| RF02 | Exibir **nome** e **email** de cada usuário na lista | Definido |
| RF03 | Campo de busca para filtrar usuários **pelo nome** | Definido |
| RF04 | Ao clicar em um usuário, exibir seus **detalhes completos** em um **modal** | Definido |
| RF05 | O modal exibe todos os dados do usuário retornados pela API (ver mapeamento abaixo), incluindo os exigidos pelo desafio: nome completo, email, telefone, empresa e cidade | Definido |
| RF06 | Estados visuais de **carregando** (spinner com Tailwind `animate-spin`) e **erro** (componente próprio estilizado com Tailwind, controlado pelo hook de requisição) | Definido |

### Mapeamento dos campos da API (referência)

Campos exibidos no modal de detalhes (★ = exigido pelo desafio):

| Grupo    | Exibição            | Campo na API              |
|----------|---------------------|---------------------------|
| Pessoal  | Nome completo ★     | `name`                    |
| Pessoal  | Nome de usuário     | `username`                |
| Contato  | Email ★             | `email`                   |
| Contato  | Telefone ★          | `phone`                   |
| Contato  | Website             | `website`                 |
| Endereço | Rua                 | `address.street`          |
| Endereço | Complemento         | `address.suite`           |
| Endereço | Cidade ★            | `address.city`            |
| Endereço | CEP                 | `address.zipcode`         |
| Endereço | Coordenadas         | `address.geo.lat`, `address.geo.lng` |
| Empresa  | Empresa ★           | `company.name`            |
| Empresa  | Slogan              | `company.catchPhrase`     |
| Empresa  | Ramo de atuação     | `company.bs`              |

Na lista, cada usuário exibe apenas nome (`name`) e email (`email`).

## 6. Requisitos não funcionais

| ID    | Requisito | Status |
|-------|-----------|--------|
| RNF01 | Código organizado e componentizado | Definido |
| RNF02 | Código totalmente tipado com TypeScript | Definido |
| RNF03 | Versionamento com Git | Definido |
| RNF04 | Documentação detalhada do desenvolvimento | Definido |
| RNF05 | O projeto deve rodar com `npm install` e `npm run dev` | Definido |
| RNF06 | Desenvolvimento orientado a testes (testes antes da implementação) | Definido |

## 7. Melhorias de UI/UX definidas

| ID    | Melhoria | Status |
|-------|----------|--------|
| UX01 | Responsividade (layout adaptado a celular e desktop) | Definido |
| UX02 | Mensagem quando a busca não retorna nenhum usuário | Definido |
| UX03 | Acessibilidade (navegação por teclado, foco no modal, atributos ARIA) | Definido |
| UX04 | Barra de pesquisa e filtros (ver 7.1 e 7.2) | Definido |
| UX05 | Modo escuro com botão de alternância (ver 7.3) | Definido |

### 7.1 Comportamento da busca por nome

- Filtragem em **tempo real** (a cada tecla digitada).
- **Ignora maiúsculas/minúsculas** (`ana` encontra `Ana`).
- **Ignora acentos** (`jose` encontra `José`).
- **Encontra palavras parecidas** (busca aproximada com **Fuse.js**, tolerante a pequenas diferenças de digitação).
- Considera **apenas o nome** (`name`); o `username` não entra na busca.
- Encontra **qualquer parte do nome**, inclusive o sobrenome (`graham` encontra `Leanne Graham`).
- Termos de **1 ou 2 letras** filtram pelo trecho exato, sem tolerância a erros.
- A partir de **3 letras**, o resultado reúne os nomes que contêm o trecho exato **e** as correspondências aproximadas do Fuse.js. Assim, um nome que contém o trecho nunca some ao digitar mais uma letra.
- Termos sem relação com nenhum nome (ex.: `xyz`) não retornam resultados.

### 7.2 Filtros e ordenação

| Filtro     | Campo na API    | Controle |
|------------|-----------------|----------|
| Cidade     | `address.city`  | Lista de seleção (opções extraídas dos dados da API, em ordem alfabética) |
| Empresa    | `company.name`  | Lista de seleção (opções extraídas dos dados da API, em ordem alfabética) |
| Ordenação  | Por nome (A–Z / Z–A) | Lista de seleção com apenas A–Z e Z–A; padrão **A–Z** |

- As listas de cidade e empresa são **independentes**: cada uma mostra sempre todas as opções. Uma combinação sem resultado exibe a mensagem de "nenhum usuário encontrado".
- A lista **abre em ordem A–Z** e nunca segue a ordem da API.
- Na ordenação, títulos de tratamento no início do nome (`Mr.`, `Mrs.`, `Ms.`, `Miss`, `Dr.`) são **ignorados**; o nome continua exibido completo ("Mrs. Dennis Schulist" fica na letra D).
- Com busca ativa, a **ordenação por nome prevalece** sobre a ordem de relevância da busca aproximada.

### 7.3 Identidade visual

A interface deve atender ao **[Guia de Identidade Visual e Interface — CDT Software](https://claude.ai/artifact/6uQbYBnBVYJwnBbYKj1mvy)**. Os valores abaixo foram extraídos do guia para servir de referência na configuração do Tailwind (tokens no `tailwind.config`).

**Tema da aplicação**

- **Fundo único claro (branco)**, sem alternância de seções escuras e claras.
- As cores da marca são usadas apenas para assemelhar a interface à identidade visual do site: ciano nos destaques (botões, links, ícones, foco, spinner), títulos em `#0F172A` e texto de corpo em `#475569`.
- **Ciano no modo claro:** o ciano de marca `#00AEEF` tem contraste de ~2,5:1 sobre branco e não atinge o AA. Por isso, no modo claro, os destaques usam o **ciano escuro `#0077A8`** (~5:1 sobre branco e com texto branco por cima): texto, links, rótulos, foco, fundo do botão primário e spinner. O `#00AEEF` continua sendo usado sobre fundo marinho (modo escuro e header) e em fundos translúcidos decorativos.
- Os cards seguem o modelo **card claro** do guia.
- Em cada modo, a aplicação usa um único fundo, sem alternância de seções. A **única exceção é o header**, que tem fundo marinho nos dois modos.

**Modo escuro**

A aplicação também oferece um **modo escuro**, montado com os valores de fundo escuro do guia:

| Elemento | Modo claro | Modo escuro |
|----------|------------|-------------|
| Fundo da página | `#FFFFFF` | `#0B1120` (marinho) |
| Cards | Card claro (branco, borda cinza sutil) | Card de vidro (branco 5–10%, borda clara translúcida) |
| Títulos | `#0F172A` | Branco |
| Texto de corpo | `#475569` | Branco a no mínimo 72% |
| Destaques | Ciano escuro `#0077A8` | Ciano `#00AEEF` |
| Bordas | `rgba(148,163,184,.32)` | `rgba(148,163,184,.32)` |
| Header | Marinho `rgba(11,17,32,.82)` | Marinho `rgba(11,17,32,.82)` |

Alternância entre os modos:

- Na primeira visita, segue a **preferência do sistema** (`prefers-color-scheme`).
- Um **botão** na interface permite trocar entre claro e escuro.
- A escolha do usuário fica **salva no navegador** (`localStorage`) e prevalece sobre a preferência do sistema nas visitas seguintes.
- Enquanto não houver escolha salva, a página **acompanha a preferência do sistema** também com a página aberta; depois de usar o botão, a escolha prevalece.
- Implementação com o modo `dark` do Tailwind por classe (`darkMode: 'class'`).

**Cores**

| Papel | Valor |
|-------|-------|
| Primária de marca (ciano) | `#00AEEF` (sobre fundo marinho) |
| Ciano escuro (destaques no modo claro, AA) | `#0077A8` |
| Fundo escuro principal (marinho) | `#0B1120` |
| Fundo escuro do rodapé | `#07101F` |
| Títulos em fundo claro | `#0F172A` |
| Texto secundário escuro | `#172033` |
| Texto de corpo em fundo claro | `#475569` (valor recomendado pelo guia para contraste AA) |
| Fundo claro | `#FFFFFF` |
| Texto sobre fundo escuro | branco a no mínimo 72% (`rgba(255,255,255,.72)`) |
| Ciano translúcido (ícones, chips) | `rgba(0,174,239,.09–.12)` |
| Vidro (cards sobre escuro) | `rgba(255,255,255,.05–.10)` |
| Borda sutil | `rgba(148,163,184,.32)` |

**Tipografia**

- Fonte única: **Plus Jakarta Sans**, fallback `system-ui, sans-serif`.
- Pesos: 400 (corpo), 500 (apoio), 600 (menu, rótulos), 700 (subtítulos), 800 (títulos de impacto e botões).
- Corpo: 16 px / 400, entrelinha 1,5.
- Títulos de seção em caixa alta, peso 800, entrelinha ~1,08.
- Sobretítulo (eyebrow) e rótulos: 10–12,8 px / 600, ciano, caixa alta, espaçamento entre letras aberto.
- Títulos de card: 16–18 px / 700.

**Componentes**

| Componente | Especificação |
|------------|---------------|
| Header | Fixo no topo, 62 px, fundo marinho `rgba(11,17,32,.82)` com `backdrop-blur` (18 px) **nos dois modos**, borda inferior de 1 px `rgba(148,163,184,.32)`; textos em branco e destaques em `#00AEEF` |
| Botão primário | Pílula (`rounded-full`), fundo `#0077A8` no modo claro e `#00AEEF` no escuro, texto branco 14,4 px / 800, padding 12×18 px |
| Botão secundário (ghost) | Pílula transparente, borda 1 px `rgba(148,163,184,.32)` |
| Card claro | Branco, raio 16 px, borda cinza sutil, título 16 px / 700, texto cinza |
| Card de vidro | Fundo branco 5–10% sobre marinho, raio 16 px, borda clara translúcida |
| Chips / tags | Pílula com fundo ciano 12% e texto ciano |
| Ícones | Linha fina (outline) em ciano, dentro de quadrado arredondado com fundo ciano 12% |

- Os componentes acima são referência: só são criados quando uma história precisar deles. Os tokens (cores, fonte, raios, sombras) ficam todos no `tailwind.config`.
- Raios: 999 px (pílula), 16 px, 12 px, 18 px e 8 px.
- Sombras: `0 28px 70px rgba(0,0,0,.26)` e `0 34px 90px rgba(2,8,23,.24)`.
- Espaçamento: padding de cards 24–32 px; container com largura máxima de 1280 px.

**Movimento e acessibilidade (recomendações do guia)**

- Hovers com transição de 0,3 s; links com transição de cor de 0,15 s.
- Animações de entrada curtas (~0,4 s) e respeito a `prefers-reduced-motion`.
- Contraste mínimo AA (valores de texto acima).
- Idioma `pt-BR` declarado; hierarquia semântica correta (H1 real como título principal).

## 8. Entrega e documentação

- Repositório público no **GitHub** com o nome **`desafio-react-junior`** (link enviado na entrega).
- `base` do Vite: `'/desafio-react-junior/'`; endereço publicado: `https://<usuário>.github.io/desafio-react-junior/`.
- Execução do projeto com `npm install` seguido de `npm run dev`.
- Aplicação publicada no **GitHub Pages**.

### 8.1 Documentação

- **`README.md`** — visão geral do projeto, tecnologias, como instalar, executar e testar, link do GitHub Pages.
- **`docs/`** — documentação detalhada do desenvolvimento: este planejamento e o registro de cada etapa.

## 9. Diferenciais do desafio (não obrigatórios)

| Diferencial | Situação |
|-------------|----------|
| Uso de CSS Modules, Tailwind ou Styled Components | Atendido pela escolha do Tailwind |
| Melhorias de UI/UX | Atendido (ver seção 7) |
| Testes leves (Jest, React Testing Library) | Atendido (TDD com Vitest — API compatível com Jest — + React Testing Library) |

## 10. Decisões em aberto

Nenhuma no momento.

## 11. Histórico de decisões

| Data       | Decisão |
|------------|---------|
| 09/11/2026 | Definidos stack (React + TypeScript + Tailwind + Git) e requisitos iniciais |
| 09/11/2026 | Incorporado o enunciado do desafio: Vite como ferramenta de build, execução via `npm install` / `npm run dev`, entrega por link de repositório e lista de diferenciais |
| 09/11/2026 | RF04: detalhes do usuário exibidos em **modal** |
| 09/11/2026 | Requisições com `fetch` nativo encapsulado em hook próprio |
| 09/11/2026 | Metodologia: desenvolvimento orientado a testes (testes definidos antes da implementação) |
| 09/11/2026 | Melhorias de UI/UX: responsividade, mensagem de busca sem resultados, acessibilidade, barra de pesquisa e filtros |
| 09/11/2026 | Ferramenta de testes: Jest + React Testing Library |
| 09/11/2026 | Filtros: cidade, empresa e ordenação por nome |
| 09/11/2026 | Busca por nome: tempo real, ignora maiúsculas/minúsculas e acentos, encontra palavras parecidas |
| 09/11/2026 | Estrutura de pastas organizada por tipo |
| 09/11/2026 | Busca aproximada com Fuse.js |
| 09/11/2026 | Filtros de cidade e empresa como listas de seleção |
| 09/11/2026 | Qualidade de código: ESLint, Prettier, Husky + lint-staged |
| 09/11/2026 | Git: Conventional Commits e uma branch por funcionalidade |
| 09/11/2026 | Documentação: `README.md` + pasta `docs/` com registro por etapa |
| 09/11/2026 | Deploy no GitHub Pages; repositório no GitHub |
| 09/11/2026 | Estados visuais: spinner com Tailwind para carregando e componente próprio para erro |
| 09/11/2026 | Interface deve atender ao Guia de Identidade Visual e Interface — CDT Software |
| 09/11/2026 | Tema: fundo único claro, sem alternância de cores; cores da marca usadas para assemelhar à identidade visual do site |
| 09/11/2026 | Modo escuro: segue a preferência do sistema na primeira visita, botão para alternar e escolha salva em `localStorage` |
| 09/11/2026 | RF04/RF05: o modal passa a exibir os detalhes completos do usuário (todos os campos da API) |
| 09/11/2026 | Com busca ativa, a ordenação por nome prevalece sobre a relevância da busca aproximada |
| 09/11/2026 | Ferramenta de testes alterada de Jest para **Vitest** + React Testing Library (alinha planejamento, backlog e CLAUDE.md) |
| 09/11/2026 | Modo claro: destaques em **ciano escuro `#0077A8`** para atingir contraste AA; `#00AEEF` mantido sobre fundo marinho |
| 09/11/2026 | **Header com fundo marinho** nos dois modos — única exceção ao fundo único |
| 09/11/2026 | Backlog revisado: TS04 passa a *Must* (exigida pela DoD) e vem antes da US01; dependências entre busca, filtros, ordenação e modo escuro corrigidas; critérios de aparência e layout marcados como *verificação manual* |
| 09/11/2026 | Modal: o botão de fechar e os atributos `role="dialog"`/`aria-modal`/`aria-labelledby` passam para a US09; a US10 fica com `Esc`, foco preso e retorno do foco |
| 09/11/2026 | Ordenação: a lista abre em **A–Z**; o seletor tem apenas A–Z e Z–A |
| 09/11/2026 | Busca: considera apenas `name`; encontra qualquer parte do nome; termos de 1–2 letras por trecho exato e busca aproximada a partir de 3 letras |
| 09/11/2026 | Filtros: opções em ordem alfabética e listas independentes (sem restrição entre cidade e empresa) |
| 09/11/2026 | Ordenação ignora títulos de tratamento (`Mr.`, `Mrs.`, `Ms.`, `Miss`, `Dr.`); o nome é exibido completo |
| 09/11/2026 | Header com borda inferior sutil nos dois modos (separa o header do fundo marinho no modo escuro) |
| 09/11/2026 | Sem escolha salva, o modo acompanha a preferência do sistema também com a página aberta |
| 09/11/2026 | Componentes do guia só são criados quando usados; tokens completos no `tailwind.config` |
| 09/11/2026 | Backlog: DoD proíbe `any` implícito e explícito; critérios estruturais marcados como *revisão de código*; requisição cancelada com `AbortController`; mensagem de lista vazia com `role="status"` |
| 09/11/2026 | Análise estática alterada de ESLint para **Oxlint**, que já vem no template atual do Vite |
| 09/11/2026 | Propostas do backlog confirmadas: termo buscado na mensagem de lista vazia; mensagem quando a API não retorna usuários; modal usa o usuário já carregado (sem nova requisição); clique fora fecha o modal; tema aplicado antes de o React montar (sem piscar); deploy automático via GitHub Actions |
| 09/11/2026 | Propostas do backlog descartadas: email e website como links no modal; anúncio da contagem de resultados com `aria-live` |
| 09/11/2026 | Nome do repositório: `desafio-react-junior` (define o `base` do Vite e o endereço do GitHub Pages) |
| 09/11/2026 | Sem estimativas, sprints ou prazo: a implementação é feita com IA, história por história, com revisão do responsável ao fim de cada uma |
| 09/11/2026 | Textos da interface: definidos pelo Claude Code em cada história, em pt-BR, listados no registro da etapa em `docs/` e revisados pelo responsável na entrega; valores da API mantidos no original |
| 09/11/2026 | Busca a partir de 3 letras: trecho exato **somado** às correspondências aproximadas do Fuse.js (evita que um acerto exato suma ao digitar mais uma letra); "sem falsos positivos" substituído por "termos sem relação não retornam resultados" |
