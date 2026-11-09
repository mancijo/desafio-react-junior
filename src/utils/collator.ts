/** Comparação de textos em português (trata acentos como a letra base: "É" junto de "E"). */
export const ptBRCollator = new Intl.Collator('pt-BR', { sensitivity: 'base' })
