import type { User } from '../types/user'

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
}

/** Card com nome e email; o clique abre os detalhes do usuário. */
export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onSelect(user)}
      className="flex h-full w-full flex-col gap-1 rounded-card border border-border-subtle bg-white p-6 text-left transition duration-300 hover:-translate-y-0.5 hover:border-primary-dark hover:shadow-floating focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-glass dark:hover:border-primary dark:hover:bg-glass-strong dark:focus-visible:outline-primary"
    >
      <span className="text-lg font-bold text-heading dark:text-white">{user.name}</span>
      <span className="break-all text-sm text-body dark:text-white/72">{user.email}</span>
    </button>
  )
}
