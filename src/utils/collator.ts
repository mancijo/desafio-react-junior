/** Portuguese text comparison (accents are treated as the base letter: "É" next to "E"). */
export const ptBRCollator = new Intl.Collator('pt-BR', { sensitivity: 'base' })
