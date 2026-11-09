import { useMemo, useState } from 'react'
import { ErrorMessage } from './components/ErrorMessage'
import { LoadingSpinner } from './components/LoadingSpinner'
import { SearchBar } from './components/SearchBar'
import { SelectField } from './components/SelectField'
import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers'
import {
  NO_FILTERS,
  filterUsers,
  getCityOptions,
  getCompanyOptions,
  type UserFilters,
} from './utils/filters'
import { searchUsersByName } from './utils/search'

function App() {
  const { users, status } = useUsers()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<UserFilters>(NO_FILTERS)

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
    () => filterUsers(searchUsersByName(users, searchTerm), filters),
    [users, searchTerm, filters],
  )

  return (
    <div className="min-h-screen bg-white font-sans dark:bg-navy">
      <main className="mx-auto max-w-content px-4 py-12">
        <h1 className="text-3xl font-extrabold text-heading dark:text-white">Lista de Usuários</h1>
        <div className="mt-8">
          {status === 'loading' && <LoadingSpinner />}
          {status === 'error' && <ErrorMessage />}
          {status === 'success' && (
            <div className="flex flex-col gap-8">
              <div className="grid gap-4 md:grid-cols-3">
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
              </div>
              <UserList users={visibleUsers} onSelect={() => {}} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
