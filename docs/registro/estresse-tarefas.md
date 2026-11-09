# Teste de estresse com 200 tarefas

- **Branch:** `experiment/stress-todos` (experimento; **não** integrada à `main` nem publicada)
- **Data:** 09/11/2026
- **Fonte:** `https://jsonplaceholder.typicode.com/todos` (200 itens, 10 usuários, 90 concluídas)

## Objetivo

Colocar muitos elementos na tela para ver como a listagem (busca, filtros, ordenação, cards e modal) se comporta com 20 vezes mais dados do que os 10 usuários do desafio.

## Como a estrutura diferente foi adaptada

Uma tarefa tem só `userId`, `id`, `title` e `completed`. Em vez de reescrever a listagem, um adaptador (`todoToUser`, em `src/datasets/todos.ts`) converte cada tarefa para o formato que a listagem já entende:

| Na listagem | Vem da tarefa | Onde aparece |
|-------------|---------------|--------------|
| `name` | `title` | título do card, busca e ordenação |
| `email` | "Usuário N · Concluída/Pendente" | segunda linha do card |
| `address.city` | status ("Concluída" ou "Pendente") | primeiro filtro |
| `company.name` | "Usuário N" | segundo filtro |

Os textos da tela mudam junto com a fonte de dados ("Lista de Tarefas", "Buscar por título", "Status", "Usuário", "Ordenar por título", "Nenhuma tarefa encontrada…"), e o modal mostra Título, Status, Usuário e ID.

## O que foi feito

- **Seletor "Fonte de dados"** (Usuários | Tarefas) abaixo do título. O padrão continua sendo Usuários, então o comportamento do desafio e os testes existentes não mudam.
- `src/types/todo.ts` e `src/services/todosApi.ts` (`fetchTodos`, com a mesma validação de formato do serviço de usuários).
- `src/datasets/`: cada fonte de dados define como carregar, os textos da interface e os campos do modal (`usersDataset` e `todosDataset`).
- `Listing` (novo componente): carrega uma fonte e mostra estados, controles, lista e modal. É remontado ao trocar de fonte (`key`), o que limpa busca, filtros e modal.
- Os componentes passaram a receber os textos por props, com os textos de usuários como padrão.
- `ptBRCollator` com `numeric: true`: "Usuário 2" vem antes de "Usuário 10".

## Testes

20 testes novos (136 no total, todos passando; lint, tipos e build OK):

- `services/todosApi.test.ts`: URL, retorno, `AbortSignal`, erro HTTP e formato inesperado;
- `datasets/todos.test.ts`: adaptador e campos do modal das duas fontes;
- `app/todosStress.test.tsx`: troca de fonte, 200 itens renderizados, busca por título, filtros combinados, ordem numérica dos usuários, ordenação, modal, mensagem de vazio e volta para Usuários com a busca limpa.

Um teste antigo foi ajustado: a ordem do `Tab` agora passa pelos dois botões do seletor.

## Resultados do estresse

Medidos no navegador, com os 200 itens reais da API.

### Interface (build de produção, tempo até a tela estar atualizada)

| Ação | Itens exibidos | Tempo |
|------|----------------|-------|
| Digitar `d` | 138 | 36,5 ms |
| Digitar `de` | 35 | 3,8 ms |
| Digitar `del` (busca aproximada) | 11 | 7,2 ms |
| Digitar `delectus aut` | 3 | 6,2 ms |
| Limpar a busca | 200 | 27,5 ms |
| Filtrar por status "Concluída" | 90 | 4,7 ms |
| Remover o filtro | 200 | 13,1 ms |
| Ordenar Z–A | 200 | 22,0 ms |
| Ordenar A–Z | 200 | 26,5 ms |

- A página ficou com 865 elementos no DOM (116 com os 10 usuários) e 14.264 px de altura.
- Em desenvolvimento (`npm run dev`), os mesmos passos levam de 2 a 3 vezes mais (até ~77 ms), por causa do React em modo de desenvolvimento.

### Lógica isolada (ms por chamada, escalando os dados artificialmente)

| Itens | Busca exata (2 letras) | Busca aproximada (3 letras) | Busca aproximada (12 letras) | Filtros | Ordenação |
|-------|------------------------|-----------------------------|------------------------------|---------|-----------|
| 200 | 0,11 | 1,26 | 1,82 | 0,01 | 0,33 |
| 2.000 | 1,00 | 6,09 | 15,02 | 0,06 | 6,50 |
| 10.000 | 5,63 | 49,40 | 93,43 | 0,23 | 40,53 |
| 20.000 | 11,87 | 103,80 | 182,47 | 0,47 | 86,63 |

## Conclusões

- **Com 200 itens o sistema se comporta bem.** Toda interação fica abaixo de 40 ms no build de produção, sem travamento perceptível. A lógica (busca + filtros + ordenação) soma menos de 3 ms; o tempo restante é o React desenhando os cards.
- **O gargalo é a renderização, não a busca.** As ações mais lentas são as que redesenham muitos cards (digitar a primeira letra, limpar a busca, ordenar).
- **A lógica cresce de forma linear** e só passaria de 100 ms por tecla perto de 10.000 itens. Bem antes disso a tela já estaria inviável por outro motivo: todos os cards são desenhados de uma vez.
- **Usabilidade:** com 200 cards a página tem mais de 14.000 px de altura. Funciona, mas rolar tudo é cansativo.

## Se o volume real fosse grande (não implementado)

1. **Paginação ou "carregar mais"**: resolve a altura da página e o custo de desenhar tudo; é a melhoria de maior efeito.
2. **Lista virtualizada** (desenhar só os cards visíveis): necessária a partir de alguns milhares de itens.
3. **Reaproveitar o índice do Fuse.js**: hoje ele é recriado a cada tecla; só compensa acima de ~2.000 itens.
4. **`useDeferredValue` na busca**: mantém a digitação fluida enquanto a lista é recalculada.

## Limitações do experimento

- O adaptador encaixa a tarefa no tipo `User` (status em `address.city`, dono em `company.name`). Serve para estressar o sistema sem reescrevê-lo, mas não é o desenho ideal: para manter tarefas de verdade, a listagem deveria usar um tipo de item genérico.
- As medições foram feitas em uma máquina de desenvolvimento, com a aba em segundo plano; os números servem como ordem de grandeza.

## Textos da interface (novos)

| Onde | Texto |
|------|-------|
| Seletor | Fonte de dados · Usuários · Tarefas |
| Sobretítulo | JSONPlaceholder · Teste de estresse |
| `<h1>` | Lista de Tarefas |
| Apoio | Busque pelo título, filtre por status ou usuário e clique em uma tarefa para ver os detalhes. |
| Busca | Buscar por título · Ex.: delectus aut autem |
| Filtros | Status (Todos os status, Concluída, Pendente) · Usuário (Todos os usuários, Usuário 1…10) |
| Ordenação | Ordenar por título |
| Card | Usuário N · Concluída/Pendente |
| Estados | Carregando tarefas · Não foi possível carregar as tarefas. · Nenhuma tarefa cadastrada. · Nenhuma tarefa encontrada (para "termo"). · Tente outro título ou altere os filtros. |
| Modal | Detalhes da tarefa · Título, Status, Usuário, ID |
