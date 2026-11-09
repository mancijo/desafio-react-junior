import { useMemo, useState } from 'react'
import type { SelectOption } from '../types/selectOption'
import type { User } from '../types/user'
import {
  NO_FILTERS,
  filterUsers,
  getCityOptions,
  getCompanyOptions,
  type UserFilters,
} from '../utils/filters'
import { searchUsersByName } from '../utils/search'
import { sortUsersByName, type SortOrder } from '../utils/sort'

export interface UseUserListingResult {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filters: UserFilters
  setCity: (city: string) => void
  setCompany: (company: string) => void
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
  cityOptions: SelectOption[]
  companyOptions: SelectOption[]
  /** Usuários após busca → filtros → ordenação. */
  visibleUsers: User[]
}

function toOptions(allLabel: string, values: string[]): SelectOption[] {
  return [{ value: '', label: allLabel }, ...values.map((value) => ({ value, label: value }))]
}

/**
 * Estado e regras da listagem: busca por nome, filtros de cidade e empresa e ordenação.
 * A lista visível é calculada na ordem busca → filtros → ordenação, então a ordenação
 * por nome sempre prevalece sobre a relevância da busca.
 */
export function useUserListing(users: User[]): UseUserListingResult {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<UserFilters>(NO_FILTERS)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const cityOptions = useMemo(() => toOptions('Todas as cidades', getCityOptions(users)), [users])
  const companyOptions = useMemo(
    () => toOptions('Todas as empresas', getCompanyOptions(users)),
    [users],
  )

  const visibleUsers = useMemo(
    () => sortUsersByName(filterUsers(searchUsersByName(users, searchTerm), filters), sortOrder),
    [users, searchTerm, filters, sortOrder],
  )

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setCity: (city) => setFilters((current) => ({ ...current, city })),
    setCompany: (company) => setFilters((current) => ({ ...current, company })),
    sortOrder,
    setSortOrder,
    cityOptions,
    companyOptions,
    visibleUsers,
  }
}
