# Pendências para revisão final

Pontos não definidos no planejamento ou no backlog que surgiram durante o desenvolvimento. Para não interromper o trabalho, foi adotada a opção mais simples e coerente com as decisões já registradas. Cada item deve ser confirmado ou ajustado pelo responsável ao final.

| # | História | O que foi assumido | Por quê |
|---|----------|--------------------|---------|
| 1 | US04 | Funções puras de busca, filtros e ordenação ficam em `src/utils/` (pasta a mais na estrutura por tipo) | A estrutura prevê `components`, `hooks`, `services` e `types`; nenhuma delas é adequada para funções puras, que precisam ficar isoladas e testáveis |
| 3 | US05 | Quando a API não retorna nenhum usuário, a busca e os filtros ficam ocultos e só aparece "Nenhum usuário cadastrado." | Sem dados, os controles não teriam efeito |
| 4 | US11 | Sem animações de entrada (~0,4 s) nos cards e no modal | Recomendação do guia, mas não é critério de aceitação; mantém a interface simples |
| 5 | US14 | Busca e selects com borda mais forte (`#64748B` no claro, branco 40% no escuro) em vez da borda sutil do guia | A borda do guia tem 1,31:1 de contraste, abaixo do 3:1 exigido para componentes (WCAG 1.4.11); a decisão de contraste AA prevalece |
| 2 | US03 | Card de erro em vermelho suave (paleta padrão do Tailwind) | O guia da CDT não define uma cor de erro |
