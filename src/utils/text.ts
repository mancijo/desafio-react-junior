/** Marcas diacríticas combinantes (acentos) que sobram após a decomposição NFD. */
const COMBINING_MARKS = /\p{M}/gu

/** Remove acentos, converte para minúsculas e apara espaços nas pontas. */
export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(COMBINING_MARKS, '').toLowerCase().trim()
}
