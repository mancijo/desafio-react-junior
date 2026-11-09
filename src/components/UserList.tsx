import type { User } from '../types/user'
import { UserCard } from './UserCard'

interface UserListProps {
  users: User[]
  onSelect: (user: User, trigger: HTMLButtonElement) => void
}

/** Lista de usuários em cards (nome e email). */
export function UserList({ users, onSelect }: UserListProps) {
  return (
    <ul aria-label="Usuários" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}
