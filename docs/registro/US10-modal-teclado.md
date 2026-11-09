# US10 — Usar o modal pelo teclado

- **Branch:** `feat/modal-a11y`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/hooks/useModalBehavior.ts`: hook reutilizável que, enquanto o modal está aberto:
  - move o foco para o botão de fechar;
  - fecha com `Esc`;
  - prende o foco: `Tab` e `Shift+Tab` circulam só entre os elementos focáveis do modal;
  - trava a rolagem da página ao fundo;
  - ao fechar (por qualquer meio), devolve o foco ao elemento que abriu o modal.
- `UserDetailsModal.tsx`: usa o hook; o fundo escurecido fecha o modal ao clique (cliques dentro do painel não fecham); o painel recebe `tabIndex={-1}` para poder receber foco se não houver elementos focáveis.

## Testes (`App.modalKeyboard.test.tsx`)

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. `Esc` fecha | Esc fecha o modal | passou |
| 2. Clique no fundo fecha | clicar no fundo fecha; clicar dentro não fecha | passou |
| 3. Foco vai para dentro; `Tab` não sai | foco dentro ao abrir; 4× `Tab` e 4× `Shift+Tab` continuam dentro | passou |
| 4. Foco volta para o usuário que abriu | ao fechar pelo botão e com `Esc` | passou |

Total da suíte: 90 testes passando. Lint e build OK.

## Decisões

- O foco inicial vai para o botão de fechar, o único elemento interativo do modal (email e website são texto, conforme decidido).
- A lógica fica em um hook próprio, separado do componente, como pede a organização por tipo.

## Textos da interface

Nenhum texto novo.
