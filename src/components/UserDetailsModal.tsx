import { useId, useRef } from 'react'
import { useModalBehavior } from '../hooks/useModalBehavior'
import type { User } from '../types/user'
import { DetailGroup, type DetailItem } from './DetailGroup'

interface UserDetailsModalProps {
  user: User
  onClose: () => void
}

function detailGroups(user: User): { title: string; items: DetailItem[] }[] {
  return [
    {
      title: 'Pessoal',
      items: [
        { label: 'Nome completo', value: user.name },
        { label: 'Nome de usuário', value: user.username },
      ],
    },
    {
      title: 'Contato',
      items: [
        { label: 'Email', value: user.email },
        { label: 'Telefone', value: user.phone },
        { label: 'Website', value: user.website },
      ],
    },
    {
      title: 'Endereço',
      items: [
        { label: 'Rua', value: user.address.street },
        { label: 'Complemento', value: user.address.suite },
        { label: 'Cidade', value: user.address.city },
        { label: 'CEP', value: user.address.zipcode },
        { label: 'Coordenadas', value: `${user.address.geo.lat}, ${user.address.geo.lng}` },
      ],
    },
    {
      title: 'Empresa',
      items: [
        { label: 'Empresa', value: user.company.name },
        { label: 'Slogan', value: user.company.catchPhrase },
        { label: 'Ramo de atuação', value: user.company.bs },
      ],
    },
  ]
}

/** Modal com todos os dados do usuário, agrupados em Pessoal, Contato, Endereço e Empresa. */
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
        className="relative flex max-h-[90vh] outline-none w-full max-w-3xl flex-col overflow-y-auto rounded-card-lg border border-border-subtle bg-white p-6 shadow-elevated sm:p-8 dark:bg-navy"
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {detailGroups(user).map((group) => (
            <DetailGroup key={group.title} title={group.title} items={group.items} />
          ))}
        </div>
      </div>
    </div>
  )
}
