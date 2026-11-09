import type { User } from '../types/user'
import { ptBRCollator } from './collator'

/** Filtros da lista. String vazia significa "todas". */
export interface UserFilters {
  city: string
  company: string
}

export const NO_FILTERS: UserFilters = { city: '', company: '' }

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort(ptBRCollator.compare)
}

/** Cidades presentes nos dados, sem repetições, em ordem alfabética pt-BR. */
export function getCityOptions(users: User[]): string[] {
  return uniqueSorted(users.map((user) => user.address.city))
}

/** Empresas presentes nos dados, sem repetições, em ordem alfabética pt-BR. */
export function getCompanyOptions(users: User[]): string[] {
  return uniqueSorted(users.map((user) => user.company.name))
}

/** Aplica os filtros (cidade e empresa combinados), preservando a ordem original. */
export function filterUsers(users: User[], filters: UserFilters): User[] {
  return users.filter(
    (user) =>
      (filters.city === '' || user.address.city === filters.city) &&
      (filters.company === '' || user.company.name === filters.company),
  )
}
