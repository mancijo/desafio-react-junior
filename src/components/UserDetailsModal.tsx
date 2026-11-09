import { useId, useRef } from 'react'
import { useModalBehavior } from '../hooks/useModalBehavior'
import type { User } from '../types/user'

interface UserDetailsModalProps {
  user: User
  onClose: () => void
}

interface DetailItem {
  label: string
  value: string
}

/** The fields required by the challenge, in display order (labels are shown to the user in pt-BR). */
function detailItems(user: User): DetailItem[] {
  return [
    { label: 'Nome completo', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Telefone', value: user.phone },
    { label: 'Empresa', value: user.company.name },
    { label: 'Cidade', value: user.address.city },
  ]
}

/** Modal with the user's full name, email, phone, company and city. */
export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useModalBehavior(dialogRef, onClose, closeButtonRef)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div
        aria-hidden="true"
        data-testid="modal-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-card-lg border border-border-subtle bg-white p-6 shadow-elevated outline-none sm:p-8 dark:bg-navy"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary-dark uppercase dark:text-primary">
              Detalhes do usuário
            </p>
            <h2
              id={titleId}
              className="mt-1 text-2xl font-extrabold break-words text-heading dark:text-white"
            >
              {user.name}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="flex size-10 shrink-0 items-center justify-center rounded-pill border border-border-subtle text-heading transition-colors duration-300 hover:border-primary-dark hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark motion-reduce:transition-none dark:text-white dark:hover:border-primary dark:hover:text-primary dark:focus-visible:outline-primary"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-5"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <dl className="mt-6 flex flex-col divide-y divide-border-subtle rounded-card border border-border-subtle px-5 dark:bg-glass">
          {detailItems(user).map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5 py-3">
              <dt className="text-sm font-medium text-body dark:text-white/72">{item.label}</dt>
              <dd className="font-semibold break-words text-heading dark:text-white">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
