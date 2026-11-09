# US14 — Usar a aplicação com teclado e leitor de tela

- **Branch:** `feat/accessibility`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

A acessibilidade foi construída junto com cada componente: cards como `<button>` nativos, `<label>` em todos os campos, `role="status"`/`role="alert"`, modal com foco preso. Nesta história, os critérios foram cobertos por testes e o contraste foi **medido** no navegador, o que levou a dois ajustes:

- **Borda dos campos** (busca e selects): a borda sutil do guia (`rgba(148,163,184,.32)`) tinha só 1,31:1 contra o fundo, abaixo do 3:1 exigido para identificar componentes (WCAG 1.4.11). Novo token `border-strong` (`#64748B`) no modo claro e branco 40% no escuro. Os cards mantêm a borda sutil do guia, pois são identificados pelo próprio conteúdo.
- **Placeholder** da busca: de `#475569` a 70% (3,6:1) para `#475569` cheio (7,58:1).

## Testes (`App.a11y.test.tsx`)

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Usuário acionável por `Enter`/`Espaço`, com foco visível | Enter e Espaço abrem o modal; card com `focus-visible:outline` | passou |
| 2. Rótulos em busca, filtros e ordenação | `searchbox` e `combobox` encontrados pelo nome acessível | passou |
| 3. *(manual)* Contraste AA nos dois modos | medição no navegador (tabela abaixo) | OK |
| 4. *(manual)* Ordem de foco segue a ordem visual | também automatizado: Tab percorre tema → busca → cidade → empresa → ordenação → primeiro card | passou |

Os testes passaram de primeira, porque a acessibilidade já tinha sido implementada nas histórias anteriores.

### Contraste medido (texto: mínimo 4,5:1; bordas de campos: mínimo 3:1)

| Elemento | Modo claro | Modo escuro |
|----------|------------|-------------|
| Título `<h1>` | 17,85 | 18,83 |
| Texto de apoio / corpo | 7,58 | 9,99 |
| Sobretítulo ciano | 5,00 | 7,44 |
| Nome no card | 17,85 | 16,80 |
| Email no card | 7,58 | 9,24 |
| Texto digitado na busca | 17,85 | 16,80 |
| Placeholder da busca | 7,58 (antes 3,60) | 5,16 |
| Borda de busca e selects | 4,76 (antes 1,31) | 3,81 (antes 1,83) |

Total da suíte: 106 testes passando. Lint e build OK.

## Textos da interface

Nenhum texto novo.
