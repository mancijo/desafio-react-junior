import { useMemo, useState } from 'react'
import { EmptyState } from './components/EmptyState'
import { ErrorMessage } from './components/ErrorMessage'
import { LoadingSpinner } from './components/LoadingSpinner'
import { SearchBar } from './components/SearchBar'
import { SelectField } from './components/SelectField'
import { UserDetailsModal } from './components/UserDetailsModal'
import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers'
import type { User } from './types/user'
import {
  NO_FILTERS,
  filterUsers,
  getCityOptions,
  getCompanyOptions,
  type UserFilters,
} from './utils/filters'
import { searchUsersByName } from './utils/search'
import { sortUsersByName, type SortOrder } from './utils/sort'

const SORT_OPTIONS = [
  { value: 'asc', label: 'A–Z' },
  { value: 'desc', label: 'Z–A' },
]

function App() {
  const { users, status } = useUsers()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<UserFilters>(NO_FILTERS)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const cityOptions = useMemo(
    () => [
      { value: '', label: 'Todas as cidades' },
      ...getCityOptions(users).map((city) => ({ value: city, label: city })),
    ],
    [users],
  )

  const companyOptions = useMemo(
    () => [
      { value: '', label: 'Todas as empresas' },
      ...getCompanyOptions(users).map((company) => ({ value: company, label: company })),
    ],
    [users],
  )

  const visibleUsers = useMemo(
    () => sortUsersByName(filterUsers(searchUsersByName(users, searchTerm), filters), sortOrder),
    [users, searchTerm, filters, sortOrder],
  )

  return (
    <div className="min-h-screen bg-white font-sans dark:bg-navy">
      <main className="mx-auto max-w-content px-4 py-12">
        <h1 className="text-3xl font-extrabold text-heading dark:text-white">Lista de Usuários</h1>
        <div className="mt-8">
          {status === 'loading' && <LoadingSpinner />}
          {status === 'error' && <ErrorMessage />}
          {status === 'success' && users.length === 0 && (
            <EmptyState title="Nenhum usuário cadastrado." />
          )}
          {status === 'success' && users.length > 0 && (
            <div className="flex flex-col gap-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <SelectField
                  label="Cidade"
                  value={filters.city}
                  options={cityOptions}
                  onChange={(city) => setFilters((current) => ({ ...current, city }))}
                />
                <SelectField
                  label="Empresa"
                  value={filters.company}
                  options={companyOptions}
                  onChange={(company) => setFilters((current) => ({ ...current, company }))}
                />
                <SelectField
                  label="Ordenar por nome"
                  value={sortOrder}
                  options={SORT_OPTIONS}
                  onChange={(order) => setSortOrder(order === 'desc' ? 'desc' : 'asc')}
                />
              </div>
              {visibleUsers.length > 0 ? (
                <UserList users={visibleUsers} onSelect={(user) => setSelectedUser(user)} />
              ) : (
                <EmptyState
                  title={
                    searchTerm.trim()
                      ? `Nenhum usuário encontrado para "${searchTerm.trim()}".`
                      : 'Nenhum usuário encontrado.'
                  }
                  description="Tente outro nome ou altere os filtros."
                />
              )}
            </div>
          )}
        </div>
      </main>

      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}

export default App
