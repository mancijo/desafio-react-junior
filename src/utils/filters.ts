import type { User } from '../types/user'
import { ptBRCollator } from './collator'

/** List filters. An empty string means "all". */
export interface UserFilters {
  city: string
  company: string
}

export const NO_FILTERS: UserFilters = { city: '', company: '' }

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort(ptBRCollator.compare)
}

/** Cities found in the data, without duplicates, in pt-BR alphabetical order. */
export function getCityOptions(users: User[]): string[] {
  return uniqueSorted(users.map((user) => user.address.city))
}

/** Companies found in the data, without duplicates, in pt-BR alphabetical order. */
export function getCompanyOptions(users: User[]): string[] {
  return uniqueSorted(users.map((user) => user.company.name))
}

/** Applies the filters (city and company combined), keeping the original order. */
export function filterUsers(users: User[], filters: UserFilters): User[] {
  return users.filter(
    (user) =>
      (filters.city === '' || user.address.city === filters.city) &&
      (filters.company === '' || user.company.name === filters.company),
  )
}
