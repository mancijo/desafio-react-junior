# US11 — Interface com a identidade visual da CDT

- **Branch:** `feat/visual-identity`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/components/Header.tsx`: header fixo de 62 px com:
  - fundo marinho translúcido, `backdrop-blur` de 18 px e borda inferior sutil, igual nos dois modos;
  - ícone de usuários em linha fina ciano dentro de um quadrado arredondado com ciano 12%;
  - nome "Desafio React Júnior" em branco;
  - espaço à direita para a alternância de tema (US13).
- Topo da página:
  - sobretítulo "JSONPlaceholder" (ciano, caixa alta, espaçamento aberto);
  - `<h1>` real "Lista de Usuários" em caixa alta, peso 800, entrelinha 1,08;
  - texto de apoio.
- `src/index.css`:
  - `body` com fundo único por modo (branco ou marinho), fonte Plus Jakarta Sans 16 px / 400 / 1,5 e cor de corpo;
  - `color-scheme` por modo (controles nativos acompanham o tema);
  - cor de seleção de texto;
  - bloco `prefers-reduced-motion` que reduz animações e transições.
- Componentes já criados nas histórias anteriores seguem o guia:
  - cards claros (raio 16 px, borda sutil) e de vidro no escuro;
  - hover com transição de 0,3 s;
  - destaques em `#0077A8` no claro e `#00AEEF` no escuro;
  - modal com raio de 18 px e sombra do guia.

## Testes e verificações

| Critério | Como foi verificado | Resultado |
|----------|---------------------|-----------|
| 1. *(manual)* Fundo único, exceto o header | navegador, modos claro e escuro | OK |
| 2. *(manual)* Destaques ciano, títulos e corpo nas cores do guia | navegador | OK |
| 3. *(manual)* Cards "card claro" | navegador | OK |
| 4. *(manual)* Header fixo marinho com desfoque e borda | `App.layout.test.tsx` (classes) + navegador | OK |
| 5. *(manual)* Plus Jakarta Sans com pesos e tamanhos do guia | navegador | OK |
| 6. *(manual)* Transições de 0,3 s; `prefers-reduced-motion` | código (`duration-300`, `motion-reduce:` e bloco global) | OK |
| 7. `<h1>` real | `App.layout.test.tsx`: `<h1>` dentro do `<main>` | passou |

No navegador, com os dados reais: sem rolagem horizontal (`scrollWidth` = `clientWidth`), modal no modo escuro legível e foco inicial no botão de fechar.

Total da suíte: 93 testes passando. Lint e build OK.

## Decisões

- Sem animação de entrada (~0,4 s, recomendação do guia): não é critério da história e o modal abre instantaneamente. Registrado em `docs/PENDENCIAS.md`.

## Textos da interface

| Onde | Texto |
|------|-------|
| Header | Desafio React Júnior |
| Sobretítulo | JSONPlaceholder |
| `<h1>` | Lista de Usuários (exibido em caixa alta) |
| Apoio | Busque pelo nome, filtre por cidade ou empresa e clique em um usuário para ver os detalhes. |
