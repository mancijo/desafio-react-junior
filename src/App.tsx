import { useMemo, useState } from 'react'
import { EmptyState } from './components/EmptyState'
import { ErrorMessage } from './components/ErrorMessage'
import { Header } from './components/Header'
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
    <>
      <Header />
      <main className="mx-auto max-w-content px-4 pt-[calc(62px+3rem)] pb-16 sm:pt-[calc(62px+4rem)]">
        <section aria-labelledby="page-title" className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary-dark uppercase dark:text-primary">
            JSONPlaceholder
          </p>
          <h1
            id="page-title"
            className="mt-3 text-3xl leading-[1.08] font-extrabold text-heading uppercase sm:text-5xl dark:text-white"
          >
            Lista de Usuários
          </h1>
          <p className="mt-4 text-body dark:text-white/72">
            Busque pelo nome, filtre por cidade ou empresa e clique em um usuário para ver os
            detalhes.
          </p>
        </section>
        <div className="mt-10">
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
    </>
  )
}

export default App
