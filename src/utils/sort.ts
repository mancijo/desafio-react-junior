import type { User } from '../types/user'
import { ptBRCollator } from './collator'

export type SortOrder = 'asc' | 'desc'

/** Títulos de tratamento ignorados na ordenação ("Mrs. Dennis" é ordenado como "Dennis"). */
const TITLE_PREFIX = /^(mrs|mr|ms|miss|dr)\.?\s+/i

function sortKey(name: string): string {
  return name.trim().replace(TITLE_PREFIX, '')
}

/**
 * Ordena por nome (A–Z ou Z–A) em português, ignorando títulos de tratamento.
 * Devolve uma nova lista; o nome exibido não muda.
 */
export function sortUsersByName(users: User[], order: SortOrder): User[] {
  const direction = order === 'asc' ? 1 : -1

  return [...users].sort((a, b) => {
    const byKey = ptBRCollator.compare(sortKey(a.name), sortKey(b.name))
    const result = byKey !== 0 ? byKey : a.name.localeCompare(b.name, 'pt-BR')
    return result * direction
  })
}
