# Melhorias conhecidas

Pontos fracos identificados em uma revisão do código feita após a entrega, do ponto de vista de um avaliador sênior. Nenhum deles impede o funcionamento nem descumpre o enunciado: são questões de organização e de qualidade que **ainda não foram corrigidas**. Todos estão cobertos pelos testes atuais, então podem ser refatorados com segurança.

Data da revisão: 12/11/2026.

| # | Ponto | Onde | Gravidade |
|---|-------|------|-----------|
| 1 | Modal com responsabilidades demais | `src/components/UserDetailsModal.tsx` | Média |
| 2 | Tipo de interface na pasta de tipos de domínio, e rótulos de tela dentro de um hook | `src/types/selectOption.ts`, `src/hooks/useUserListing.ts` | Média |
| 3 | Efeito colateral dentro do atualizador de estado | `src/hooks/useTheme.ts` | Baixa |
| 4 | Testes presos a classes CSS | `src/tests/` (7 verificações) | Baixa |
| 5 | Atributo de teste no código de produção | `src/components/UserDetailsModal.tsx` | Baixa |

## 1. Modal com responsabilidades demais

**O que é:** `UserDetailsModal.tsx` tem 97 linhas, quase o dobro do segundo maior componente (`ListingControls`, com 51). Ele reúne três coisas no mesmo arquivo:

- a **casca do modal**: fundo escurecido, painel, atributos de acessibilidade (`role="dialog"`, `aria-modal`, `aria-labelledby`) e o comportamento de foco;
- o **botão de fechar**, com o ícone em SVG escrito no meio do código;
- o **conteúdo**: a lista com os cinco campos do usuário.

**Por que importa:** o enunciado pede código "componentizado". A casca é genérica e serviria para qualquer modal, mas hoje não pode ser reaproveitada sem copiar o arquivo.

**Como corrigir:** extrair um componente `Modal` genérico, que recebe o título e o conteúdo e cuida do fundo, do painel, do botão de fechar e do foco; deixar um componente pequeno só com os detalhes do usuário. O ícone de fechar pode virar um componente próprio.

## 2. `SelectOption` em `types/` e rótulos de tela dentro do hook

**O que é:**

- `src/types/selectOption.ts` tem 4 linhas (`value` e `label`) e fica na pasta dos tipos de domínio, ao lado de `User` e `Address`. Ele é o formato de uma opção de `<select>`, um detalhe de interface que pertence ao componente `SelectField`.
- O tipo foi para `types/` para o hook `useUserListing` não precisar importar de um componente. Isso encobre o problema real: o hook monta as opções já com os textos "Todas as cidades" e "Todas as empresas" (linhas 42 e 44).

**Por que importa:** um hook de regra de negócio não deveria conhecer rótulos de tela. A separação entre lógica e apresentação, que o restante do projeto respeita, é quebrada nesse ponto.

**Como corrigir:** o hook devolve apenas a lista de cidades e a de empresas (`string[]`); o componente `ListingControls` monta as opções com os rótulos. Com isso, `SelectOption` volta para junto do `SelectField` e o arquivo em `types/` deixa de existir.

## 3. Efeito colateral dentro do atualizador de estado

**O que é:** em `useTheme.ts`, o `toggleTheme` grava no `localStorage` (`saveTheme(next)`, linha 70) dentro da função passada ao `setState`.

**Por que importa:** a função atualizadora do `setState` deve ser pura. O React, em modo estrito, a executa duas vezes de propósito para revelar esse tipo de erro. Aqui não há defeito visível, porque gravar o mesmo valor duas vezes é inofensivo, mas é um erro conceitual.

**Como corrigir:** calcular o próximo tema fora do atualizador e gravar no `localStorage` no próprio manipulador do clique, ou em um `useEffect` que reage à mudança de uma escolha feita pelo usuário.

## 4. Testes presos a classes CSS

**O que é:** sete verificações conferem nomes de classes do Tailwind em vez de comportamento:

- `src/tests/app/layout.test.tsx` (4): header com `fixed`, `bg-navy-header`, `backdrop-blur-header` e `border-b`;
- `src/tests/components/LoadingSpinner.test.tsx` (2): spinner com `primary-dark` e `dark:border-t-primary`;
- `src/tests/app/accessibility.test.tsx` (1): card com `focus-visible:outline`.

**Por que importa:** esses testes quebram em qualquer ajuste visual, mesmo que nada tenha deixado de funcionar, e passam mesmo que a classe exista mas o estilo não seja aplicado. O `jsdom` não calcula CSS, então eles não provam o que parecem provar.

**Como corrigir:** remover essas verificações e manter os critérios visuais como verificação manual, como já é feito com os demais critérios de aparência do backlog; ou cobri-los com testes visuais em um navegador real.

## 5. Atributo de teste no código de produção

**O que é:** o fundo do modal tem `data-testid="modal-backdrop"` (`UserDetailsModal.tsx`, linha 38), usado só para o teste de "clicar fora fecha o modal" encontrar o elemento.

**Por que importa:** é código de teste dentro do componente. A Testing Library recomenda `data-testid` apenas como último recurso, quando não há como localizar o elemento da forma que um usuário o encontraria.

**Como corrigir:** no teste, localizar o fundo a partir do diálogo (o elemento irmão do painel) ou clicar em um ponto fora do painel; então remover o atributo. Ao extrair o `Modal` genérico (item 1), isso se resolve junto.

## Pontos menores

- **Regra do tema em dois lugares:** a escolha entre claro e escuro está no hook `useTheme` e repetida no script do `index.html`, que evita a tela piscar ao carregar. As duas precisam ser alteradas juntas.
- **Índice do Fuse.js recriado a cada tecla:** irrelevante com 10 usuários; passaria a pesar acima de cerca de 2.000 itens (ver o teste de estresse na branch `experiment/stress-todos`).
- **Tela de erro sem "tentar novamente":** a mensagem só orienta a recarregar a página.
- **Links do README em HTML:** usam `target="_blank"`, que o GitHub remove ao exibir a página.
- **Escopo acima do pedido:** o enunciado fala em aplicação e interfaces simples; a entrega inclui busca aproximada, filtros, ordenação, modo escuro e deploy automático.
