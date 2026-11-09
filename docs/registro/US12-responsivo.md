# US12 — Usar a aplicação no celular e no desktop

- **Branch:** `feat/responsive-layout`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

O layout responsivo foi construído junto com os componentes das histórias anteriores (mobile-first, com as quebras do Tailwind). Nesta história ele foi conferido no navegador, sem precisar de ajustes no código:

- **Lista:** 1 coluna no celular, 2 a partir de 640 px (`sm`), 3 a partir de 1024 px (`lg`).
- **Busca e filtros:** empilhados no celular, 2 colunas a partir de 768 px (`md`), 4 lado a lado a partir de 1024 px.
- **Modal:** largura total menos 16 px de margem no celular, altura máxima de 90% da tela com rolagem interna; ancorado embaixo no celular e centralizado a partir de 640 px.
- **Container:** `max-w-content` (1280 px) com 16 px de margem lateral.
- **Textos longos** (emails, nomes) quebram a linha em vez de estourar a largura.

## Verificações (todas *manuais*, no navegador com os dados reais)

| Critério | Medição | Resultado |
|----------|---------|-----------|
| 1. Sem rolagem horizontal a partir de 320 px | 320 px: `scrollWidth` = `clientWidth` = 320 | OK |
| 2. Cards em colunas conforme a largura | 320 px: 1 coluna; 1440 px: 3 colunas | OK |
| 3. Busca e filtros empilhados no celular e lado a lado no desktop | 320 px: 1 coluna; 1440 px: 4 colunas | OK |
| 4. Modal se ajusta ao celular e rola | 320 × 700: modal com 288 × 630 px e conteúdo rolável | OK |
| 5. Container de no máximo 1280 px | 1440 px: `<main>` com 1280 px | OK |

Testes automatizados: nenhum novo (critérios de layout não são calculados pelo jsdom). Suíte com 93 testes passando; lint e build OK.

## Textos da interface

Nenhum texto novo.
