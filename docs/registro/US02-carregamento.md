# US02 — Ver indicação de carregamento

- **Branch:** `feat/loading-state`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/components/LoadingSpinner.tsx`: spinner circular com `animate-spin`, borda superior em ciano (`#0077A8` no modo claro, `#00AEEF` no escuro), dentro de um contêiner `role="status"` com o texto visível "Carregando usuários".
- `App.tsx` exibe o spinner enquanto `useUsers` está em `loading`.

## Testes

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Spinner (`animate-spin`, ciano) enquanto carrega | `LoadingSpinner.test.tsx`: spinner com `animate-spin` em ciano; `App.loading.test.tsx`: exibe o spinner enquanto a requisição não terminou | passou |
| 2. Spinner some ao terminar (sucesso ou erro) | `App.loading.test.tsx`: esconde no sucesso e no erro | passou |
| 3. Texto acessível com `role="status"` | `LoadingSpinner.test.tsx` | passou |

Total da suíte: 21 testes passando. Lint e build OK.

## Decisões

- O texto "Carregando usuários" fica **visível** abaixo do spinner (e não só para leitores de tela): com `prefers-reduced-motion` a animação pode parar, e o texto continua indicando o carregamento.

## Textos da interface

| Onde | Texto |
|------|-------|
| Carregamento | Carregando usuários |
