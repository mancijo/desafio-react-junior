import { ErrorMessage } from './components/ErrorMessage'
import { LoadingSpinner } from './components/LoadingSpinner'
import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers'

function App() {
  const { users, status } = useUsers()

  return (
    <div className="min-h-screen bg-white font-sans dark:bg-navy">
      <main className="mx-auto max-w-content px-4 py-12">
        <h1 className="text-3xl font-extrabold text-heading dark:text-white">Lista de Usuários</h1>
        <div className="mt-8">
          {status === 'loading' && <LoadingSpinner />}
          {status === 'error' && <ErrorMessage />}
          {status === 'success' && <UserList users={users} onSelect={() => {}} />}
        </div>
      </main>
    </div>
  )
}

export default App
