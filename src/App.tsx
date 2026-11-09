import { useMemo, useState } from 'react'
import { ErrorMessage } from './components/ErrorMessage'
import { LoadingSpinner } from './components/LoadingSpinner'
import { SearchBar } from './components/SearchBar'
import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers'
import { searchUsersByName } from './utils/search'

function App() {
  const { users, status } = useUsers()
  const [searchTerm, setSearchTerm] = useState('')

  const visibleUsers = useMemo(() => searchUsersByName(users, searchTerm), [users, searchTerm])

  return (
    <div className="min-h-screen bg-white font-sans dark:bg-navy">
      <main className="mx-auto max-w-content px-4 py-12">
        <h1 className="text-3xl font-extrabold text-heading dark:text-white">Lista de Usuários</h1>
        <div className="mt-8">
          {status === 'loading' && <LoadingSpinner />}
          {status === 'error' && <ErrorMessage />}
          {status === 'success' && (
            <div className="flex flex-col gap-8">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <UserList users={visibleUsers} onSelect={() => {}} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
