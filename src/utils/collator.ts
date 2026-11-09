/**
 * Portuguese text comparison: accents are treated as the base letter ("É" next to "E")
 * and digit sequences are compared as numbers ("Usuário 2" before "Usuário 10").
 */
export const ptBRCollator = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true })
