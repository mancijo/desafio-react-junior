import { useState } from 'react'
import { EmptyState } from './components/EmptyState'
import { ErrorMessage } from './components/ErrorMessage'
import { Header } from './components/Header'
import { ListingControls } from './components/ListingControls'
import { LoadingSpinner } from './components/LoadingSpinner'
import { PageIntro } from './components/PageIntro'
import { ThemeToggle } from './components/ThemeToggle'
import { UserDetailsModal } from './components/UserDetailsModal'
import { UserList } from './components/UserList'
import { useTheme } from './hooks/useTheme'
import { useUserListing } from './hooks/useUserListing'
import { useUsers } from './hooks/useUsers'
import type { User } from './types/user'

function noResultsTitle(searchTerm: string): string {
  const term = searchTerm.trim()
  return term ? `Nenhum usuário encontrado para "${term}".` : 'Nenhum usuário encontrado.'
}

function App() {
  const { users, status } = useUsers()
  const { theme, toggleTheme } = useTheme()
  const listing = useUserListing(users)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <>
      <Header actions={<ThemeToggle theme={theme} onToggle={toggleTheme} />} />
      <main className="mx-auto max-w-content px-4 pt-[calc(62px+3rem)] pb-16 sm:pt-[calc(62px+4rem)]">
        <PageIntro />
        <div className="mt-10">
          {status === 'loading' && <LoadingSpinner />}
          {status === 'error' && <ErrorMessage />}
          {status === 'success' && users.length === 0 && (
            <EmptyState title="Nenhum usuário cadastrado." />
          )}
          {status === 'success' && users.length > 0 && (
            <div className="flex flex-col gap-8">
              <ListingControls {...listing} />
              {listing.visibleUsers.length > 0 ? (
                <UserList users={listing.visibleUsers} onSelect={setSelectedUser} />
              ) : (
                <EmptyState
                  title={noResultsTitle(listing.searchTerm)}
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
