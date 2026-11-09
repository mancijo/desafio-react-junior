# TS05 — Publicar no GitHub Pages

- **Branch:** `chore/github-pages`
- **Data:** 09/11/2026
- **Situação:** concluída e integrada à `main`.
- **Endereço:** https://mancijo.github.io/desafio-react-junior/

## O que foi feito

- `vite.config.ts`: `base: '/desafio-react-junior/'`.
- `.github/workflows/deploy.yml`: a cada push na `main` (ou disparo manual), o workflow:
  1. instala as dependências (`npm ci`, Node 24);
  2. roda `npm run lint`, `npm test` e `npm run build`;
  3. publica a pasta `dist` com `actions/upload-pages-artifact` e `actions/deploy-pages`.

  Se o lint, os testes ou o build falharem, nada é publicado.
- GitHub Pages ativado no repositório com a fonte "GitHub Actions" (`gh api -X POST repos/mancijo/desafio-react-junior/pages -f build_type=workflow`).

## Verificações

| Critério | Como foi verificado | Resultado |
|----------|---------------------|-----------|
| 1. Aplicação acessível no GitHub Pages | após o primeiro deploy, o endereço respondeu HTTP 200 (ver abaixo) | OK |
| 2. `npm run build` sem erros | local e no workflow | OK |
| 3. `base` correto, sem 404 nos assets | `vite preview` local: `index.html`, JS, CSS e favicon com HTTP 200; fontes com o prefixo `/desafio-react-junior/` | OK |
| 4. Publicação automática a cada atualização da `main` | workflow com `on: push: branches: [main]` | OK |
| 5. Link no `README.md` | feito na TS06 | — |

## Decisões

- O workflow também roda lint e testes antes do build, para que nada quebrado seja publicado.
- O `base` vale também em desenvolvimento (`npm run dev` abre em `/desafio-react-junior/`), para que o ambiente local seja igual ao publicado.

## Textos da interface

Nenhum texto novo.
