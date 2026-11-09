# TS01 — Criar o projeto base

- **Branch:** `chore/project-setup`
- **Data:** 09/11/2026
- **Situação:** concluída localmente; falta publicar o repositório no GitHub (push a pedido do responsável).

## O que foi feito

- Projeto gerado com `create-vite` 9.3.4, template `react-ts`:
  - React 19.3, Vite 8.3, TypeScript 7.0, `@vitejs/plugin-react` 6.1.
- `package.json` renomeado para `desafio-react-junior` (nome do repositório).
- Estrutura por tipo criada: `src/components`, `src/hooks`, `src/services`, `src/types` (com `.gitkeep` para o Git versionar as pastas vazias).
- `.gitignore` do template mantido (ignora `node_modules`, `dist`, `*.local`, logs e arquivos de editor).
- `claude.md` renomeado para `CLAUDE.md`, nome que o Claude Code procura em sistemas que diferenciam maiúsculas/minúsculas (Linux, GitHub).
- Repositório Git iniciado na branch `main`:
  - 1º commit na `main`: documentação (`docs/` e `CLAUDE.md`).
  - Commit na branch `chore/project-setup`: projeto base.

## Verificações

| Critério | Como foi verificado | Resultado |
|----------|---------------------|-----------|
| 1. Projeto criado com Vite (React + TS) | `create-vite --template react-ts` | OK |
| 2. `npm install` + `npm run dev` sem erros | `npm install` (0 vulnerabilidades); servidor respondeu HTTP 200 em `localhost:5173` e a página renderizou sem erros no console | OK |
| 3. Estrutura `src/components`, `hooks`, `services`, `types` | Pastas criadas e versionadas | OK |
| 4. Git, `.gitignore`, Conventional Commits, repositório público | Git local e commits OK; **push para o GitHub pendente** | Parcial |
| 5. `docs/` e `CLAUDE.md` no primeiro commit | 1º commit da `main` | OK |

Outros comandos da DoD:

- `npm run build`: OK.
- `npm run lint`: OK (ver observação sobre o Oxlint).
- `npm test`: ainda não existe; é configurado na TS03.

## Testes

Nenhum teste automatizado: a TS01 é uma história técnica e o Vitest só é configurado na TS03. Os critérios foram conferidos executando os comandos (ver tabela).

## Decisões e observações

- **Oxlint no lugar do ESLint:** a versão atual do template do Vite traz o **Oxlint** (`.oxlintrc.json`, script `lint: oxlint`) em vez do ESLint. O planejamento define ESLint (TS04). O template foi mantido como veio; a troca (ou a adoção do Oxlint) fica para a TS04, após decisão do responsável.
- **Conteúdo de demonstração:** `App.tsx`, `App.css`, `index.css` e os arquivos de `src/assets` e `public` são os do template. Eles serão substituídos a partir da TS02/US01.
- **`index.html`:** ainda com `lang="en"` e título `vite-app`; o `lang="pt-BR"` é critério da TS02.
- **`README.md`:** ainda é o do template, em inglês; será reescrito na TS06.

## Textos da interface

Nenhum texto de interface criado nesta história.
