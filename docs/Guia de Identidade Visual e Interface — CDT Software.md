# Guia de Identidade Visual e Interface — CDT Software

Nov 9, 2026 · @Andrei

## Visão geral

A CDT Software usa uma identidade **tecnológica, escura e premium**: azul-marinho profundo (#0B1120) como base, azul ciano (#00AEEF) como cor de marca e a fonte Plus Jakarta Sans em toda a interface. Cada produto ganha sua própria seção.

- **Página analisada:** home de [www1.cdtsoftware.com.br](https://www1.cdtsoftware.com.br/) (pt-BR), \~9.230 px de altura em desktop 1400 px.
- **Método:** inspeção dos estilos computados (cores, fontes, raios, sombras, transições) via código da página + capturas de tela de cada seção.
- **Base técnica:** WordPress com Elementor (containers `e-con`), container de conteúdo com largura máxima de 1280 px.

## Paleta de cores

A paleta é quase bicolor — marinho + ciano — com branco e cinzas-ardósia de apoio. Transparências do ciano e do branco criam a profundidade das seções escuras.

| Papel | Cor | Hex / valor | Onde aparece |
| --- | --- | --- | --- |
| Primária de marca | Azul ciano | `#00AEEF` | Destaques em títulos, rótulos, links ativos (Downloads), ícones de check, botões principais |
| Fundo escuro principal | Marinho profundo | `#0B1120` | Hero, faixa de números, GestAI, eVolDX, DiagX AI, menu |
| Fundo escuro do rodapé | Marinho noite | `#07101F` | Rodapé |
| Texto de títulos (fundo claro) | Ardósia 900 | `#0F172A` | H2/H3 nas seções brancas |
| Texto secundário escuro | Ardósia 800 | `#172033` | Textos de apoio |
| Texto de corpo cinza | Cinza 500 / Ardósia 500 | `#6B7280` / `#64748B` | Parágrafos em fundo claro |
| Fundo claro | Branco | `#FFFFFF` | Seções de produtos e benefícios |
| Texto sobre escuro | Branco 56–72% | `rgba(255,255,255,.56–.72)` | Parágrafos e menu sobre fundo marinho |
| Ciano translúcido | Ciano 9–12% | `rgba(0,174,239,.09–.12)` | Fundo de ícones, chips, brilhos radiais |
| Vidro (glass) | Branco 5–10% | `rgba(255,255,255,.05–.10)` | Cards sobre fundo escuro |
| Borda sutil | Ardósia 400 a 32% | `rgba(148,163,184,.32)` | Botões secundários |
| Acento de brilho | Azul céu | `rgba(56,189,248,.06)` | Gradientes radiais decorativos |

**Gradientes:** sobreposição linear marinho (`rgba(11,17,32,.6→.85)`) sobre fotos e vídeos de fundo, mais halos radiais em ciano a 7–10% para dar profundidade. O botão de chat flutuante usa um azul mais saturado (≈ `#0044FF`), que vem do widget de terceiros e foge da paleta.

## Tipografia

**Plus Jakarta Sans** é a fonte única da interface (≈ 99% dos elementos), com fallback `system-ui, sans-serif`. Pontualmente aparecem **VAG Rounded Bold** (lettering do logotipo) e **Sora** (um rótulo de destaque).

- **Pesos usados:** 400 (corpo), 500 (texto de apoio), 600 (menu, rótulos), 700 (subtítulos), 800 (títulos de impacto e botões).
- **Corpo:** 16 px / 400, entrelinha 24 px (1,5).
- **Estilo de impacto:** títulos de seção em CAIXA ALTA, peso 800, entrelinha justa (\~1,08).
- **Eyebrow (sobretítulo):** texto pequeno em ciano, caixa alta e espaçamento entre letras aberto, acima dos títulos (ex.: “PRIMEIRA LINHA EM SOFTWARE PARA RADIOLOGIA ODONTOLÓGICA”).

| Nível | Tamanho / peso | Cor | Exemplo |
| --- | --- | --- | --- |
| Display de produto | 88 px / 800 | Branco ou preto | “eVolDX”, “GestAI” |
| H2 impacto (caixa alta) | 48–57,6 px / 800, entrelinha 1,08 | `#0F172A` | “TECNOLOGIA DE ALTO IMPACTO PARA TRANSFORMAR A ODONTOLOGIA!” |
| H2 de produto | 48 px / 700 | Branco | “A evolução definitiva em sistemas de saúde” |
| Destaque do hero | ≈ 52 px / 800, caixa alta | Ciano `#00AEEF` | “RADIOLOGIA ODONTOLÓGICA” |
| H3 subtítulo de produto | 35,2 px / 700 | Branco | “A próxima geração de plataformas…” |
| Números (contadores) | 36 px / 800 | Branco + “+” em ciano | “31+ ANOS” |
| H3 de card | 16–18 px / 700 | `#0F172A` ou branco | “Qualidade de Imagem” |
| Corpo | 16 px / 400 | Cinza ou branco 62% | Parágrafos |
| Menu | 14,08 px / 600 | Branco 68% | Home, Quem Somos… |
| Botão | 14,4 px / 800 | Branco | “Conheça o DiagX AI” |
| Rótulos / legendas | 10–12,8 px / 600 | Ciano, caixa alta | “CLIENTES ATENDIDOS” |

Observação: o H1 real da página tem 16 px (o texto grande do hero é estilizado em outro elemento), o que enfraquece a hierarquia semântica para SEO.

## Logo e elementos de marca

A marca combina um logotipo branco geométrico com uma família de sub-marcas de produto, todas no mesmo vocabulário azul-ciano.

- **Logotipo CDT:** símbolo circular com recorte + “CDT” em letras arredondadas e “SOFTWARE” em tamanho mínimo abaixo. Versão para fundo escuro (`CDT-FUNDO-ESCURO-02.png`, 571 px) usada no menu, no hero e no rodapé.
- **Assinatura tipográfica:** “CDT” em branco + “SOFTWARE” em ciano, caixa alta e espaçamento aberto (faixa de números).
- **Sub-marcas:** GestAI (“AI” em ciano), eVolDX (ícone de cubo em escudo azul com degradê), eVolCloud, DiagX AI (wordmark ciano com brilho/glow).
- **Imagens:** renders 3D de crânios e tomografias em tons cobre, mockups de notebook e telas reais do software, fotos com overlay escuro. Nas seções claras, imagens recortadas sem fundo.
- **Iconografia:** ícones de linha fina (outline) em ciano dentro de quadrados arredondados com fundo ciano a 12%; check circular preenchido em listas.
- **Tom de voz:** confiante e aspiracional, com exclamações em títulos (“Ideias inovadoras que geram resultados!”), vocabulário técnico-clínico (laudo, DICOM, tomografia) e prova social em números: **31+ anos, 3.860+ clientes, 9.520+ sistemas instalados**.

## Layout e grid

A home é uma landing page longa (≈ 9.230 px) em blocos que alternam fundo escuro e claro, criando ritmo visual. Conteúdo centralizado em container de até **1280 px**.

| # | Seção | Fundo | Altura | Estrutura |
| --- | --- | --- | --- | --- |
| 1 | Hero — “Tecnologia e Inovação para Radiologia Odontológica” | Marinho `#0B1120` + foto com overlay | 903 px | Centralizado: logo, título, parágrafo |
| 2 | Faixa de números | Marinho | 145 px | 4 colunas com divisores verticais |
| 3 | Apresentação + diferenciais | Branco | 1.405 px | 2 colunas (texto + imagem 3D) e grade de 4 cards |
| 4 | GestAI | Marinho + imagem | 1.095 px | Título central + 3 cards de vidro + CTA |
| 5 | eVolDX | Marinho → azul | 2.318 px | Título central, print grande do software, 3 recursos |
| 6 | eVolCloud | Branco | 875 px | 2 colunas: texto + grade 2×3 de cards |
| 7 | DiagX AI | Marinho | 938 px | 2 colunas: texto + mockup ilustrado de interface |
| 8 | Rodapé | Marinho noite `#07101F` | 447 px | 6 colunas: marca, Empresa, Produtos, Suporte, Legal, Contato |

**Espaçamento:** seções generosas (≈ 100–120 px verticais), gutter lateral ≈ 120 px em desktop, cards com padding de 24–32 px.

## Componentes de UI

Os componentes seguem três regras: cantos bem arredondados (botões em pílula de 999 px, cards de 12–18 px), superfícies de vidro sobre fundo escuro e sombras longas e difusas.

| Componente | Especificação observada |
| --- | --- |
| **Menu (header)** | Fixo no topo, 62 px de altura, fundo `rgba(11,17,32,.82)` com `backdrop-filter: blur(18px)`. Logo à esquerda; links Home, Quem Somos, Produtos ⌄, Suporte em branco 68%, 14 px/600; “Downloads” destacado em ciano. |
| **Mega-menu Produtos** | Dropdown em que cada item traz nome + descrição curta (ex.: “eVolDX — Diagnóstico tomográfico com visualização 2D/3D avançada”). |
| **Botão primário** | Pílula 999 px, fundo `#00AEEF`, texto branco 14,4 px/800, padding 12×18 px, seta → ao final (“Conheça o DiagX AI →”). |
| **Botão secundário (ghost)** | Pílula transparente, texto branco, borda 1 px `rgba(148,163,184,.32)` (“Comparar com DiagX”). |
| **Card claro** | Branco, raio 16 px, borda cinza muito sutil, ícone ciano no topo, título 16 px/700 e texto cinza (eVolCloud). |
| **Card de vidro** | Fundo branco 5–10% sobre marinho, raio 16 px, borda clara translúcida (GestAI). |
| **Chips / tags** | Pílulas pequenas com fundo ciano 12% e texto ciano (“Marcação assistida”, “Pré-laudo estruturado”). |
| **Contadores** | Número grande branco 36 px/800 + “+” ciano, legenda ciano em caixa alta, divisores verticais finos. |
| **Lista com check** | Ícone de check circular ciano + nome do produto, em 2 colunas. |
| **Mockups** | Janela estilizada com três pontos (estilo navegador), blocos e barras em ciano/cinza (DiagX AI); prints reais com sombra `0 28px 90px rgba(2,8,23,.3)`. |
| **Chat flutuante** | Botão circular azul no canto inferior direito (widget de atendimento). |
| **Rodapé** | Logo + descrição, colunas com títulos em caixa alta pequenos, links em branco 60%, contatos com ícones ciano, linha divisória e copyright centralizado. |

**Raios mais usados:** 999 px (24×), 16 px (17×), 12 px (16×), 18 px e 8 px. **Sombras:** `0 28px 70px rgba(0,0,0,.26)` e `0 34px 90px rgba(2,8,23,.24)`.

## Experiência do usuário (UX)

A página funciona como vitrine de portfólio: cada produto é uma “mini landing” com promessa, prova (prints e recursos) e CTA “Conheça o …”.

- **Navegação:** menu fixo com desfoque sempre acessível; mega-menu descritivo ajuda a escolher o produto certo; “Downloads” em ciano sinaliza a ação mais frequente de clientes atuais.
- **Fluxo narrativo:** autoridade (hero + 31 anos) → prova social (números) → visão geral do portfólio → produto a produto → contato no rodapé.
- **CTAs:** um primário por seção, às vezes com um secundário ghost (“Comparar com DiagX”, “Falar com especialista”).
- **Microinterações:** elementos entram com fade + deslocamento ao rolar (`opacity, transform` 0,8–0,95 s, 35 elementos); hovers em `all 0.3s`; links com transição de cor em 0,15 s.
- **Responsividade:** viewport configurado e breakpoints em 640, 667, 700, 768, 980, 1024, 1280 e 1536 px.
- **Acessibilidade:** idioma `pt-BR` declarado e todas as 12 imagens com `alt`. Pontos de atenção: texto em branco 56–62% sobre marinho e cinza claro sobre branco podem ficar abaixo do contraste AA em textos pequenos; animações de entrada deixam conteúdo desfocado/invisível até o scroll; H1 semântico pequeno (16 px).
- **Suporte e contato:** chat flutuante permanente; rodapé com e-mail comercial, dois telefones e endereço (São José dos Campos – SP). Não há formulários na home.

## Recomendações

1. **Formalizar tokens:** registrar a paleta e a escala tipográfica acima como variáveis globais (Elementor Global Colors/Fonts ou CSS `--cdt-*`) para manter consistência entre páginas.
2. **Contraste:** subir textos sobre marinho para no mínimo branco 72% e cinzas de corpo para `#475569` em fundo branco.
3. **Hierarquia semântica:** transformar o título grande do hero no H1 real.
4. **Movimento:** respeitar `prefers-reduced-motion` e encurtar as animações de entrada (0,8 s → \~0,4 s).
5. **Chat:** alinhar a cor do botão flutuante ao ciano `#00AEEF` da marca.

Fonte: análise direta de [www1.cdtsoftware.com.br](https://www1.cdtsoftware.com.br/) em desktop.
