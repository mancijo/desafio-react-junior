import { useState } from 'react'
import { useUserListing } from '../hooks/useUserListing'
import { useUsers } from '../hooks/useUsers'
import type { Dataset } from '../types/dataset'
import type { User } from '../types/user'
import { EmptyState } from './EmptyState'
import { ErrorMessage } from './ErrorMessage'
import { ListingControls } from './ListingControls'
import { LoadingSpinner } from './LoadingSpinner'
import { UserDetailsModal } from './UserDetailsModal'
import { UserList } from './UserList'

interface ListingProps {
  dataset: Dataset
}

/**
 * Loads one data source and renders its states, controls, list and details modal.
 * Render it with `key={dataset.id}` so switching sources starts from a clean state.
 */
export function Listing({ dataset }: ListingProps) {
  const { text } = dataset
  const { users, status } = useUsers(dataset.load)
  const listing = useUserListing(users, text)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const searchTerm = listing.searchTerm.trim()

  return (
    <>
      {status === 'loading' && <LoadingSpinner label={text.loading} />}
      {status === 'error' && <ErrorMessage title={text.errorTitle} />}
      {status === 'success' && users.length === 0 && <EmptyState title={text.emptyApi} />}
      {status === 'success' && users.length > 0 && (
        <div className="flex flex-col gap-8">
          <ListingControls {...listing} text={text} />
          {listing.visibleUsers.length > 0 ? (
            <UserList
              users={listing.visibleUsers}
              onSelect={setSelectedUser}
              label={text.listLabel}
            />
          ) : (
            <EmptyState
              title={searchTerm ? text.noResultsFor(searchTerm) : text.noResults}
              description={text.noResultsHint}
            />
          )}
        </div>
      )}

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          eyebrow={text.detailsEyebrow}
          details={dataset.details}
        />
      )}
    </>
  )
}
