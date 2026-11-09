# Organização dos arquivos, código em inglês, modal enxuto e mocks

- **Branches:** `refactor/test-structure`, `feat/modal-required-fields`, `refactor/english-code`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.

## Pedidos e o que foi feito

### 1. Organizar arquivos (testes espalhados e vários na raiz)

- Os 23 arquivos de teste estavam espalhados: 13 `App.*.test.tsx` na raiz de `src/` e os demais ao lado de cada arquivo testado. Agora estão todos em `src/tests/`:
  - `app/`: testes de integração do App, um por história, com nomes curtos (ex.: `search.test.tsx`, `modalKeyboard.test.tsx`);
  - `components/`, `hooks/`, `services/` e `utils/`: testes unitários, espelhando `src/`;
  - `mocks/`, `fixtures/` e `setup.ts`: o que antes ficava em `src/test/`.
- Os arquivos foram movidos com `git mv`, preservando o histórico, e os imports foram reescritos por script.
- Raiz do projeto:
  - `tsconfig.app.json` e `tsconfig.node.json` unificados em um `tsconfig.json`;
  - a configuração do Prettier foi para o `package.json` (sem `.prettierrc.json`);
  - de 15 para 13 arquivos. Os que ficaram são exigidos pelas ferramentas (Vite, TypeScript, Tailwind, Oxlint, npm, Git).

### 2. Código e comentários em inglês

- Comentários, descrições dos testes (`describe`/`it`), mensagens de erro internas, dados de exemplo (ruas, emails, slogans) e nomes do workflow do GitHub Actions foram traduzidos.
- Conforme decidido com o responsável, os **textos exibidos ao usuário continuam em pt-BR** (`lang="pt-BR"`). Por isso os testes ainda conferem textos como "Buscar por nome".
- Os nomes acentuados das fixtures (José, Érica, São Paulo) foram mantidos de propósito: são eles que testam a busca sem acento.
- As mensagens de commit e a documentação em `docs/` continuam em pt-BR.

### 3. Modal com apenas nome completo, email, telefone, empresa e cidade

Registrado em `docs/registro/US09-modal-detalhes.md` (seção "Revisão posterior") e na RF05 do planejamento. Teste escrito antes, falhando, e implementação depois.

### 4. "Inativar mock para consumo de API"

Conferido com o responsável: a aplicação **já consome a API real** em desenvolvimento e no GitHub Pages; os mocks existem só nos testes. Nada mudou no código; a separação ficou explícita no README e no `CLAUDE.md`.

## Verificações

- 114 testes passando, `npm run lint`, `npm run format:check`, `tsc` e `npm run build` OK.
- Nenhum comentário ou descrição de teste em português restante (busca por acentos e palavras comuns em português).
