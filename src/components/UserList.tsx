import type { User } from '../types/user'
import { UserCard } from './UserCard'

interface UserListProps {
  users: User[]
  onSelect: (user: User) => void
  /** Accessible name of the list. */
  label?: string
}

/** List of items as cards (name and email). */
export function UserList({ users, onSelect, label = 'Usuários' }: UserListProps) {
  return (
    <ul aria-label={label} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}
