import type { ReactNode } from 'react'

interface HeaderProps {
  /** Ações à direita (ex.: alternância de tema). */
  actions?: ReactNode
}

/** Header fixo com fundo marinho translúcido, igual nos modos claro e escuro. */
export function Header({ actions }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-header border-b border-border-subtle bg-navy-header backdrop-blur-header">
      <div className="mx-auto flex h-full max-w-content items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-icon bg-primary-soft text-primary"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
              <circle cx="9" cy="7" r="3.5" />
              <path d="M22 19v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <span className="text-sm font-extrabold tracking-wide text-white sm:text-base">
            Desafio React Júnior
          </span>
        </div>
        {actions}
      </div>
    </header>
  )
}
