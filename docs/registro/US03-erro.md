# US03 — Ver mensagem de erro

- **Branch:** `feat/error-state`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/components/ErrorMessage.tsx`: componente próprio com `role="alert"`, título e orientação, em um card com tom de alerta (vermelho suave, com variante para o modo escuro).
- `App.tsx` exibe o componente quando `useUsers` está em `error`; nesse estado, lista e spinner não aparecem.
- O serviço da US01 já tratava falha de rede e status fora de 2xx como erro.

## Testes

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Erro de rede ou HTTP ≠ 2xx exibe o componente com mensagem clara | `App.error.test.tsx`: status de erro e falha de rede; `ErrorMessage.test.tsx`: mensagem | passou |
| 2. Lista e spinner não aparecem | `App.error.test.tsx` | passou |
| 3. Anunciado a leitores de tela (`role="alert"`) | `ErrorMessage.test.tsx` | passou |

Total da suíte: 26 testes passando. Lint e build OK.

## Decisões

- Sem botão "tentar novamente": não está no escopo; a mensagem orienta a recarregar a página.
- Cor de alerta em vermelho suave (paleta padrão do Tailwind), já que o guia não define cor de erro. Registrado em `docs/PENDENCIAS.md`.

## Textos da interface

| Onde | Texto |
|------|-------|
| Erro — título | Não foi possível carregar os usuários. |
| Erro — orientação | Verifique sua conexão e recarregue a página. |
