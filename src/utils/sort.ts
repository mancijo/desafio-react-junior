import type { User } from '../types/user'
import { ptBRCollator } from './collator'

export type SortOrder = 'asc' | 'desc'

/** Honorific titles ignored when sorting ("Mrs. Dennis" is sorted as "Dennis"). */
const TITLE_PREFIX = /^(mrs|mr|ms|miss|dr)\.?\s+/i

function sortKey(name: string): string {
  return name.trim().replace(TITLE_PREFIX, '')
}

/**
 * Sorts by name (A–Z or Z–A) using Portuguese rules, ignoring honorific titles.
 * Returns a new list; the displayed name does not change.
 */
export function sortUsersByName(users: User[], order: SortOrder): User[] {
  const direction = order === 'asc' ? 1 : -1

  return [...users].sort((a, b) => {
    const byKey = ptBRCollator.compare(sortKey(a.name), sortKey(b.name))
    const result = byKey !== 0 ? byKey : a.name.localeCompare(b.name, 'pt-BR')
    return result * direction
  })
}
