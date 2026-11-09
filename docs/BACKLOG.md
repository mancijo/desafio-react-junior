# Backlog do Produto — Lista de Usuários (JSONPlaceholder)

> Derivado do [PLANEJAMENTO.md](./PLANEJAMENTO.md).
> Sem estimativas nem sprints: a implementação é feita com IA, história por história, com revisão do responsável ao fim de cada uma.

Última atualização: 09/11/2026

---

## Como ler este backlog

- **US** = história de usuário (valor visível para quem usa a aplicação). **TS** = história técnica (fundação, qualidade, entrega).
- **Prioridade (MoSCoW):** *Must* = exigido pelo desafio, pelos requisitos RF/RNF do planejamento, pela identidade visual ("deve atender") ou pré-requisito técnico; *Should* = melhoria ou escolha complementar definida no planejamento.
- **Critérios de aceitação** estão no formato *Dado / Quando / Então*. Cada critério vira **um caso de teste escrito antes da implementação** (TDD, Vitest + React Testing Library).
- Critérios marcados com *(verificação manual)* tratam de aparência e layout (cores, tipografia, colunas, contraste, ordem visual), que o `jsdom` não calcula. Eles não viram teste automatizado: são conferidos no navegador, nos modos claro e escuro e nas larguras de 320 px e desktop, e o resultado é registrado em `docs/`.
- Critérios marcados com *(revisão de código)* tratam da organização do código (tipos, pastas, isolamento da lógica). Eles não viram teste de componente: são conferidos na revisão do código e pela compilação do TypeScript (`npm run build`).
- Os critérios das histórias técnicas (TS) são conferidos executando os comandos e verificando as configurações que eles descrevem.
- **Dados de teste:** os testes usam dados simulados (fixtures) e `fetch` simulado, nunca a API real. Como os nomes do JSONPlaceholder não têm acentos, as fixtures incluem nomes acentuados para cobrir a busca e a ordenação.
- **Branch** segue uma branch por funcionalidade; commits em Conventional Commits.
- Itens marcados com *(proposta)* são detalhes sugeridos para completar a história e **não** foram definidos explicitamente no planejamento; só entram após confirmação do responsável. No momento, não há nenhum.

## Definição de Pronto (DoD)

Uma história só está pronta quando:

1. Os testes dos critérios de aceitação foram escritos **antes** da implementação e estão passando; os critérios *(verificação manual)* foram conferidos no navegador.
2. Código tipado com TypeScript, sem `any` (implícito ou explícito), e organizado na estrutura por tipo (`components/`, `hooks/`, `services/`, `types/`).
3. Oxlint e Prettier sem erros; hooks do Husky + lint-staged passando no commit.
4. Commits em Conventional Commits, branch integrada à `main` via merge.
5. Quando a história tiver interface: funciona em celular e desktop (a partir da conclusão da US12) e nos modos claro e escuro (a partir da conclusão da US13).
6. `npm install`, `npm run dev`, `npm test` e `npm run build` executam sem erros.
7. Registro da etapa adicionado em `docs/`, incluindo os textos da interface criados na história (título, rótulos, mensagens, `aria-label`) para revisão.

---

## Visão geral

| ID   | Título | Épico | Prioridade | Rastreabilidade | Depende de |
|------|--------|-------|------------|-----------------|------------|
| TS01 | Criar o projeto base | Fundação | Must | RNF03, RNF05, 4.2 | — |
| TS02 | Configurar Tailwind e tokens da identidade visual | Fundação | Must | 7.3 | TS01 |
| TS03 | Configurar Vitest + React Testing Library | Fundação | Must | RNF06, 4.1 | TS01 |
| TS04 | Configurar Oxlint, Prettier, Husky e lint-staged | Fundação | Must | 4.3 | TS01 |
| US01 | Ver a lista de usuários | Listagem | Must | RF01, RF02 | TS02, TS03, TS04 |
| US02 | Ver indicação de carregamento | Listagem | Must | RF06 | US01 |
| US03 | Ver mensagem de erro | Listagem | Must | RF06 | US01 |
| US04 | Buscar usuários pelo nome | Busca e filtros | Must | RF03, 7.1 | US01 |
| US05 | Ver aviso quando a busca não encontra ninguém | Busca e filtros | Should | UX02 | US04, US06, US07 |
| US06 | Filtrar usuários por cidade | Busca e filtros | Should | UX04, 7.2 | US04 |
| US07 | Filtrar usuários por empresa | Busca e filtros | Should | UX04, 7.2 | US04, US06 |
| US08 | Ordenar usuários por nome | Busca e filtros | Should | UX04, 7.2 | US04, US06, US07 |
| US09 | Ver os detalhes em um modal | Detalhes | Must | RF04, RF05 | US01 |
| US10 | Usar o modal pelo teclado | Detalhes | Should | UX03 | US09 |
| US11 | Interface com a identidade visual da CDT | Interface | Must | 7.3 | TS02, US01 |
| US12 | Usar a aplicação no celular e no desktop | Interface | Should | UX01 | US11 |
| US13 | Alternar entre modo claro e escuro | Interface | Should | UX05, 7.3 | TS02, US11 |
| US14 | Usar a aplicação com teclado e leitor de tela | Interface | Should | UX03, 7.3 | US01, US04, US06–US08 |
| TS05 | Publicar no GitHub Pages | Entrega | Should | 8 | TS01 |
| TS06 | Documentar o projeto (README + docs/) | Entrega | Must | RNF04, 8.1 | — (contínua) |

**Notas sobre as dependências**

- **TS04** vem antes da US01 porque a DoD (item 3) exige Husky + lint-staged desde a primeira história.
- **US06 → US07:** o filtro de cidade é implementado primeiro; o teste de combinação entre os dois filtros (critério 4) é escrito na US07.
- **US05 e US08** dependem da busca e dos dois filtros porque seus critérios atuam sobre o resultado combinado.
- **US13** depende da US11 porque o modo escuro é aplicado sobre a interface já estilizada com a identidade visual (header, cards, destaques).

---

## Épico 0 — Fundação

### TS01 — Criar o projeto base

**Como** desenvolvedor, **quero** o projeto criado com React, Vite e TypeScript e versionado no Git, **para** ter uma base padronizada para as demais histórias.

**Critérios de aceitação**

1. Projeto criado com Vite (template React + TypeScript).
2. `npm install` seguido de `npm run dev` sobe a aplicação sem erros.
3. Estrutura `src/components`, `src/hooks`, `src/services`, `src/types` criada.
4. Repositório Git iniciado, com `.gitignore` adequado e primeiro commit em Conventional Commits; publicado como **repositório público** no GitHub com o nome `desafio-react-junior` (o push é feito pelo responsável ou a pedido dele).
5. Pasta `docs/` existente (`PLANEJAMENTO.md`, `BACKLOG.md`, guia visual e enunciado) e o `CLAUDE.md` versionados no primeiro commit.

**Branch:** `chore/project-setup`

---

### TS02 — Configurar Tailwind e tokens da identidade visual

**Como** desenvolvedor, **quero** o Tailwind configurado com as cores, fonte, raios e sombras do guia, **para** construir a interface com os tokens da marca.

**Critérios de aceitação**

1. Tailwind instalado e aplicado aos componentes.
2. Tokens do guia no `tailwind.config`: ciano `#00AEEF`, ciano escuro `#0077A8` (destaques no modo claro), marinho `#0B1120`, títulos `#0F172A`, corpo `#475569`, borda `rgba(148,163,184,.32)`, vidro, ciano translúcido, raios e sombras da seção 7.3.
3. Fonte Plus Jakarta Sans carregada, com fallback `system-ui, sans-serif`.
4. `darkMode: 'class'` habilitado.
5. `<html lang="pt-BR">` declarado.

**Observação:** a TS02 configura apenas os tokens (cores, fonte, raios, sombras). Componentes do guia (botões, chips, sobretítulo etc.) só são criados quando uma história precisar deles.

**Branch:** `chore/tailwind-setup`

---

### TS03 — Configurar Vitest + React Testing Library

**Como** desenvolvedor, **quero** o Vitest funcionando com TypeScript e React, **para** escrever os testes antes da implementação.

**Critérios de aceitação**

1. `npm test` executa o Vitest com ambiente `jsdom`.
2. Configuração no próprio `vite.config.ts` (bloco `test`: `environment: 'jsdom'`, `globals: true`, `setupFiles`), reaproveitando a configuração do Vite.
3. Matchers do `@testing-library/jest-dom` disponíveis nos testes (importados via `@testing-library/jest-dom/vitest` no arquivo de setup).
4. `@testing-library/user-event` disponível para simular digitação, cliques e teclado.
5. Um teste de exemplo passa.
6. O arquivo de setup simula as APIs do navegador que o `jsdom` não implementa e que o projeto usa: `window.matchMedia` (preferência de tema, US13) e, se o modal usar `<dialog>` nativo, `HTMLDialogElement.showModal`/`close` (US09–US10).

**Observação:** o Vitest usa a mesma configuração do Vite, então TypeScript, CSS e `import.meta.env` funcionam nos testes sem configuração extra. Simulações com `vi.fn()`, `vi.spyOn()` e `vi.mock()`.

**Branch:** `chore/vitest-setup`

---

### TS04 — Configurar Oxlint, Prettier, Husky e lint-staged

**Como** desenvolvedor, **quero** validação automática do código a cada commit, **para** manter o padrão de qualidade.

**Critérios de aceitação**

1. `npm run lint` executa o Oxlint sem erros no projeto (configuração em `.oxlintrc.json`, criada pelo template na TS01).
2. Prettier configurado e compatível com o Oxlint (sem regras de estilo conflitantes).
3. Ao fazer um commit, o Husky executa o lint-staged sobre os arquivos alterados.
4. Um commit com erro de lint é bloqueado.

**Branch:** `chore/code-quality`

---

## Épico 1 — Listagem

### US01 — Ver a lista de usuários

**Como** visitante, **quero** ver a lista de usuários com nome e email, **para** encontrar a pessoa que procuro.

**Critérios de aceitação**

1. **Dado** que a API responde com sucesso, **quando** a página carrega, **então** uma requisição `GET` é feita a `https://jsonplaceholder.typicode.com/users`.
2. **Dado** que a API retornou usuários, **então** cada usuário aparece na lista com **nome** e **email**.
3. **Dado** que a API retornou 10 usuários, **então** a lista exibe 10 itens.
4. *(revisão de código)* Os dados são tipados (`User`, `Address`, `Company`, `Geo` em `src/types`).
5. *(revisão de código)* A requisição fica em `src/services` e o estado (dados, carregando, erro) é exposto por um hook próprio em `src/hooks` (ex.: `useUsers`).
6. **Quando** o componente é desmontado antes de a requisição terminar, **então** a requisição é cancelada (`AbortController`) e o estado não é atualizado. Isso também evita a requisição duplicada do `StrictMode` em desenvolvimento.

**Testes previstos:** serviço de API (com `fetch` simulado), hook `useUsers`, componente de lista.

**Branch:** `feat/user-list`

---

### US02 — Ver indicação de carregamento

**Como** visitante, **quero** ver que os dados estão carregando, **para** saber que a aplicação está funcionando.

**Critérios de aceitação**

1. **Dado** que a requisição ainda não terminou, **então** um spinner (`animate-spin`, em ciano: `#0077A8` no modo claro, `#00AEEF` no escuro) é exibido.
2. **Dado** que a requisição terminou (com sucesso ou erro), **então** o spinner deixa de ser exibido.
3. O spinner tem texto acessível (ex.: `role="status"` com rótulo "Carregando usuários").

**Branch:** `feat/loading-state`

---

### US03 — Ver mensagem de erro

**Como** visitante, **quero** ser avisado quando não for possível carregar os usuários, **para** entender o que aconteceu.

**Critérios de aceitação**

1. **Dado** que a requisição falha (erro de rede ou status HTTP diferente de 2xx), **então** o componente de erro próprio é exibido com uma mensagem clara.
2. **Dado** que houve erro, **então** a lista e o spinner não são exibidos.
3. A mensagem de erro é anunciada a leitores de tela (ex.: `role="alert"`).

**Branch:** `feat/error-state`

---

## Épico 2 — Busca e filtros

### US04 — Buscar usuários pelo nome

**Como** visitante, **quero** digitar um nome e ver a lista filtrada na hora, **para** encontrar alguém rapidamente, mesmo digitando errado.

**Critérios de aceitação**

1. **Quando** digito no campo de busca, **então** a lista é filtrada a cada tecla (tempo real).
2. **Dado** o usuário "Leanne Graham", **quando** busco `leanne`, **então** ele aparece (ignora maiúsculas/minúsculas).
3. **Dado** um nome com acento, **quando** busco o termo sem acento, **então** o usuário aparece (ignora acentos).
4. **Quando** busco `Lenne Grahm`, **então** "Leanne Graham" aparece (busca aproximada com Fuse.js).
5. **Quando** busco um termo sem relação com nenhum nome (ex.: `xyz`), **então** nenhum usuário é exibido.
6. **Quando** o campo está vazio, **então** todos os usuários são exibidos.
7. *(revisão de código)* A lógica de busca fica isolada e testável (ex.: função ou hook `useUserSearch`).
8. A busca considera **apenas o nome** (`name`). **Dado** um usuário da fixture cujo `username` não se parece com nenhum nome (ex.: `qwzk`), **quando** busco esse `username`, **então** nenhum usuário é exibido.
9. **Quando** busco qualquer parte do nome, como o sobrenome (ex.: `graham`), **então** "Leanne Graham" aparece.
10. **Quando** o termo tem 1 ou 2 letras, **então** a busca filtra pelo trecho exato (ignorando maiúsculas/minúsculas e acentos), sem tolerância a erros. Ex.: `gr` traz "Leanne Graham", e `gx` não traz ninguém.
11. **Quando** o termo tem 3 letras ou mais, **então** o resultado reúne os nomes que contêm o trecho exato **e** as correspondências aproximadas do Fuse.js (critérios 4 e 5), sem repetições.
12. **Dado** que um nome contém o trecho buscado, **quando** digito mais uma letra e o nome continua contendo o trecho, **então** ele continua na lista. Ex.: "Leanne Graham" aparece com `gr` e continua com `gra` e `grah`.

**Observação:** a tolerância da busca aproximada depende do `threshold` do Fuse.js, que será ajustado pelos testes dos critérios 4, 5 e 9; como o trecho exato sempre entra no resultado, o `threshold` pode ser rígido, servindo só para tolerar erros de digitação. Para encontrar trechos em qualquer posição do nome, usar `ignoreLocation: true`. Para ignorar acentos, usar a opção do Fuse.js para isso ou normalizar os textos (NFD) antes da busca.

**Branch:** `feat/name-search`

---

### US05 — Ver aviso quando a busca não encontra ninguém

**Como** visitante, **quero** ser avisado quando nenhum usuário corresponde à busca ou aos filtros, **para** não achar que a aplicação travou.

**Critérios de aceitação**

1. **Dado** que a busca e os filtros não retornam resultados, **então** uma mensagem de "nenhum usuário encontrado" é exibida no lugar da lista.
2. **Quando** altero a busca ou os filtros e há resultados, **então** a mensagem some e a lista volta.
3. A mensagem é anunciada a leitores de tela (`role="status"`).
4. **Dado** que há um termo na busca, **então** a mensagem mostra o termo buscado.
5. **Dado** que a API responde com sucesso mas sem nenhum usuário, **então** uma mensagem de "nenhum usuário cadastrado" é exibida.

**Branch:** `feat/empty-search-state`

---

### US06 — Filtrar usuários por cidade

**Como** visitante, **quero** escolher uma cidade em uma lista, **para** ver apenas os usuários dessa cidade.

**Critérios de aceitação**

1. As opções da lista de seleção são as cidades (`address.city`) extraídas dos dados da API, sem repetições e em ordem alfabética (`localeCompare` com `pt-BR`).
2. **Quando** escolho uma cidade, **então** apenas os usuários dessa cidade são exibidos.
3. Existe uma opção "Todas as cidades" que remove o filtro.
4. O filtro funciona em conjunto com a busca por nome e os demais filtros.
5. A lista mostra sempre todas as cidades, independentemente da empresa escolhida; uma combinação sem resultado exibe o aviso da US05.

**Branch:** `feat/city-filter`

---

### US07 — Filtrar usuários por empresa

**Como** visitante, **quero** escolher uma empresa em uma lista, **para** ver apenas os usuários dessa empresa.

**Critérios de aceitação**

1. As opções da lista de seleção são as empresas (`company.name`) extraídas dos dados da API, sem repetições e em ordem alfabética (`localeCompare` com `pt-BR`).
2. **Quando** escolho uma empresa, **então** apenas os usuários dessa empresa são exibidos.
3. Existe uma opção "Todas as empresas" que remove o filtro.
4. O filtro funciona em conjunto com a busca por nome e os demais filtros.
5. A lista mostra sempre todas as empresas, independentemente da cidade escolhida; uma combinação sem resultado exibe o aviso da US05.

**Branch:** `feat/company-filter`

---

### US08 — Ordenar usuários por nome

**Como** visitante, **quero** ordenar a lista por nome, **para** percorrê-la em ordem alfabética.

**Critérios de aceitação**

1. **Quando** escolho A–Z, **então** a lista é exibida em ordem alfabética crescente pelo nome.
2. **Quando** escolho Z–A, **então** a lista é exibida em ordem decrescente.
3. A ordenação respeita acentos do português (ex.: `localeCompare` com `pt-BR`).
4. A ordenação se aplica sobre o resultado da busca e dos filtros.
5. **Dado** que há uma busca ativa, **então** a ordenação por nome prevalece sobre a ordem de relevância do Fuse.js.
6. **Quando** a página carrega, **então** a lista é exibida em ordem A–Z.
7. O seletor de ordenação tem apenas as opções A–Z e Z–A (não existe "sem ordenação"); a lista nunca segue a ordem da API nem a relevância do Fuse.js.
8. Títulos de tratamento no início do nome (`Mr.`, `Mrs.`, `Ms.`, `Miss`, `Dr.`) são ignorados **apenas para ordenar**; o nome continua exibido completo. Ex.: "Mrs. Dennis Schulist" é ordenado como "Dennis Schulist" (letra D).

**Branch:** `feat/name-sort`

---

## Épico 3 — Detalhes

### US09 — Ver os detalhes em um modal

**Como** visitante, **quero** clicar em um usuário e ver seus dados principais em um modal, **para** conhecer o contato sem sair da lista.

**Critérios de aceitação**

1. **Quando** clico em um usuário da lista, **então** um modal é aberto com os dados desse usuário.
2. O modal exibe **apenas** nome completo, email, telefone, empresa e cidade, nesta ordem e sem agrupamento.
3. Nenhum outro dado do usuário (nome de usuário, website, endereço, coordenadas, slogan, ramo de atuação) aparece no modal.
4. **Quando** clico no botão de fechar, **então** o modal fecha.
5. O modal tem `role="dialog"`, `aria-modal="true"` e é rotulado pelo nome do usuário (`aria-labelledby`); o botão de fechar tem rótulo acessível (ex.: "Fechar detalhes").
6. **Quando** o modal abre, **então** os dados vêm do usuário já carregado na lista, sem nova requisição à API.
7. O email é exibido como texto (sem link).

**Branch:** `feat/user-details-modal`

---

### US10 — Usar o modal pelo teclado

**Como** visitante, incluindo quem usa teclado ou leitor de tela, **quero** fechar o modal pelo teclado e navegar dentro dele, **para** voltar à lista sem perder o contexto.

> O botão de fechar e os atributos `role="dialog"`, `aria-modal` e `aria-labelledby` são entregues na US09.

**Critérios de aceitação**

1. **Quando** pressiono `Esc`, **então** o modal fecha.
2. **Quando** clico fora do modal (no fundo), **então** o modal fecha.
3. **Quando** o modal abre, **então** o foco vai para dentro dele; **enquanto** está aberto, o `Tab` não sai do modal.
4. **Quando** o modal fecha (por qualquer meio), **então** o foco volta para o usuário que o abriu.

**Branch:** `feat/modal-a11y`

---

## Épico 4 — Interface

### US11 — Interface com a identidade visual da CDT

**Como** visitante, **quero** uma interface com a aparência da CDT Software, **para** reconhecer a identidade visual da empresa.

**Critérios de aceitação**

1. *(verificação manual)* Fundo único claro (branco), sem alternância de seções (exceto o header).
2. *(verificação manual)* Destaques em ciano escuro `#0077A8` (botões, links, rótulos, ícones, foco, spinner), com contraste AA sobre branco; títulos em `#0F172A`; corpo em `#475569`.
3. *(verificação manual)* Usuários exibidos em cards no modelo "card claro" (raio 16 px, borda sutil).
4. *(verificação manual)* Header fixo de 62 px com fundo marinho `rgba(11,17,32,.82)` e `backdrop-blur`, borda inferior de 1 px `rgba(148,163,184,.32)`, textos brancos e destaques em `#00AEEF`, conforme a seção 7.3 do planejamento.
5. *(verificação manual)* Tipografia Plus Jakarta Sans com os pesos e tamanhos do guia.
6. *(verificação manual)* Hovers com transição de 0,3 s; animações respeitam `prefers-reduced-motion`.
7. Título principal da página como `<h1>` real.

**Branch:** `feat/visual-identity`

---

### US12 — Usar a aplicação no celular e no desktop

**Como** visitante, **quero** usar a aplicação em qualquer tamanho de tela, **para** acessá-la de onde estiver.

**Critérios de aceitação**

Todos os critérios desta história são de *(verificação manual)*.

1. Sem rolagem horizontal da página em larguras a partir de 320 px.
2. A lista de cards se reorganiza em colunas conforme a largura (ex.: 1 coluna no celular, mais colunas no desktop).
3. Busca e filtros ficam empilhados no celular e lado a lado em telas maiores.
4. O modal se ajusta à tela do celular e permite rolar o conteúdo.
5. Conteúdo limitado a um container de no máximo 1280 px no desktop.

**Branch:** `feat/responsive-layout`

---

### US13 — Alternar entre modo claro e escuro

**Como** visitante, **quero** escolher entre modo claro e escuro, **para** usar a aplicação com o visual mais confortável.

**Critérios de aceitação**

1. **Dado** que é a primeira visita, **então** o modo segue a preferência do sistema (`prefers-color-scheme`).
2. **Quando** clico no botão de alternância, **então** o modo muda entre claro e escuro.
3. **Quando** volto à aplicação, **então** o modo escolhido anteriormente é mantido (`localStorage`), prevalecendo sobre a preferência do sistema.
4. *(verificação manual)* No modo escuro: fundo `#0B1120`, cards de vidro, títulos brancos, corpo branco a no mínimo 72%, destaques em ciano `#00AEEF`.
5. O botão tem rótulo acessível que indica a ação (ex.: "Ativar modo escuro").
6. Se o `localStorage` não estiver disponível, a aplicação funciona normalmente seguindo o sistema.
7. **Dado** que não há escolha salva, **quando** a preferência do sistema muda com a página aberta, **então** o modo acompanha o sistema. **Dado** que há escolha salva, **então** a mudança do sistema é ignorada.
8. *(verificação manual)* A página não pisca no tema errado ao carregar (o tema é aplicado por um script inline no `index.html`, antes de o React montar).

**Branch:** `feat/dark-mode`

---

### US14 — Usar a aplicação com teclado e leitor de tela

**Como** visitante que usa teclado ou leitor de tela, **quero** acessar todas as funções da aplicação, **para** ter a mesma experiência que os demais.

**Critérios de aceitação**

1. Cada usuário da lista é acionável pelo teclado (`Enter`/`Espaço`) e tem foco visível.
2. Campo de busca, filtros e ordenação têm rótulos (`<label>` ou `aria-label`).
3. *(verificação manual)* Contraste mínimo AA nos dois modos, com os valores de texto da seção 7.3.
4. *(verificação manual)* Ordem de foco segue a ordem visual.

**Branch:** `feat/accessibility`

---

## Épico 5 — Entrega

### TS05 — Publicar no GitHub Pages

**Como** avaliador do desafio, **quero** acessar a aplicação publicada, **para** testá-la sem instalar nada.

**Critérios de aceitação**

1. A aplicação está acessível pelo endereço do GitHub Pages do repositório.
2. `npm run build` gera o build de produção sem erros.
3. O `base` do Vite está configurado como `'/desafio-react-junior/'` (assets carregam sem erro 404).
4. A publicação é refeita automaticamente a cada atualização da `main`, por um workflow do GitHub Actions.
5. O link está no `README.md`.

**Branch:** `chore/github-pages`

---

### TS06 — Documentar o projeto

**Como** avaliador do desafio, **quero** documentação clara do projeto e do desenvolvimento, **para** entender as decisões e conseguir executá-lo.

**Critérios de aceitação**

1. `README.md` com: visão geral, tecnologias, como instalar (`npm install`), executar (`npm run dev`), testar (`npm test`), verificar o código (`npm run lint`), gerar o build (`npm run build`) e link do GitHub Pages.
2. `docs/` com o planejamento, o backlog e o registro de cada etapa concluída (o que foi feito, decisões e testes).
3. Documentação atualizada ao final de cada história (item da DoD).

**Branch:** `docs/*` (ou junto da branch de cada história)

---

## Observações

- Filtros com os dados reais: no JSONPlaceholder, cada um dos 10 usuários tem cidade e empresa diferentes, então cada filtro sempre retorna um único usuário. O comportamento planejado continua válido; fica o registro para não parecer erro na avaliação.
