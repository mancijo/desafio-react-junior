# Pendências para revisão final

Pontos não definidos no planejamento ou no backlog que surgiram durante o desenvolvimento. Para não interromper o trabalho, foi adotada a opção mais simples e coerente com as decisões já registradas. Cada item deve ser confirmado ou ajustado pelo responsável ao final.

| # | História | O que foi assumido | Por quê |
|---|----------|--------------------|---------|
| 1 | US04 | Funções puras de busca, filtros e ordenação ficam em `src/utils/` (pasta a mais na estrutura por tipo) | A estrutura prevê `components`, `hooks`, `services` e `types`; nenhuma delas é adequada para funções puras, que precisam ficar isoladas e testáveis |
| 2 | US03 | Card de erro em vermelho suave (paleta padrão do Tailwind) | O guia da CDT não define uma cor de erro |
