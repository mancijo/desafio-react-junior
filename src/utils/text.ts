/** Combining diacritical marks (accents) left after NFD decomposition. */
const COMBINING_MARKS = /\p{M}/gu

/** Removes accents, lowercases and trims surrounding spaces. */
export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(COMBINING_MARKS, '').toLowerCase().trim()
}
