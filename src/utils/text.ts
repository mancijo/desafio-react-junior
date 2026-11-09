/** Remove acentos, converte para minúsculas e apara espaços nas pontas. */
export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}
