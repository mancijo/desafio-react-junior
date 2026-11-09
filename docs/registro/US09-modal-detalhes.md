# US09 — Ver os detalhes completos em um modal

- **Branch:** `feat/user-details-modal`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## O que foi feito

- `src/components/UserDetailsModal.tsx`: modal próprio (sem `<dialog>` nativo) com:
  - fundo escurecido com desfoque;
  - painel `role="dialog"`, `aria-modal="true"` e `aria-labelledby` apontando para o `<h2>` com o nome;
  - sobretítulo "Detalhes do usuário" e botão de fechar (ícone X, `aria-label="Fechar detalhes"`);
  - quatro grupos em grade (2 colunas a partir de telas pequenas), com altura máxima de 90% da tela e rolagem interna.
- `src/components/DetailGroup.tsx`: grupo com título e lista de definição (`<dl>`, `<dt>`, `<dd>`).
- `App.tsx` guarda o usuário selecionado: o clique no card abre o modal com o objeto já carregado, sem nova requisição.

## Testes

| Critério | Teste | Resultado |
|----------|-------|-----------|
| 1. Clique abre o modal com os dados do usuário | `App.modal.test.tsx` | passou |
| 2. Todos os campos, agrupados em Pessoal, Contato, Endereço e Empresa | `UserDetailsModal.test.tsx`: grupos e os 13 campos | passou |
| 3. Campos exigidos pelo desafio presentes | `App.modal.test.tsx` | passou |
| 4. Botão de fechar fecha o modal | `UserDetailsModal.test.tsx` (chama `onClose`) e `App.modal.test.tsx` | passou |
| 5. `role="dialog"`, `aria-modal`, rotulado pelo nome; botão com rótulo acessível | `UserDetailsModal.test.tsx` | passou |
| 6. Sem nova requisição | `App.modal.test.tsx`: `fetch` chamado uma vez | passou |
| 7. Email e website como texto, sem links | `UserDetailsModal.test.tsx` | passou |

Total da suíte: 83 testes passando. Lint e build OK.

## Textos da interface

| Onde | Texto |
|------|-------|
| Sobretítulo do modal | Detalhes do usuário |
| Título | nome do usuário |
| Grupos | Pessoal, Contato, Endereço, Empresa |
| Rótulos | Nome completo, Nome de usuário, Email, Telefone, Website, Rua, Complemento, Cidade, CEP, Coordenadas, Empresa, Slogan, Ramo de atuação |
| Coordenadas | `<lat>, <lng>` |
| Botão de fechar (`aria-label`) | Fechar detalhes |
