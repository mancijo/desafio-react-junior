interface LoadingSpinnerProps {
  label?: string
}

/** Loading indicator: cyan spinner with text announced to screen readers. */
export function LoadingSpinner({ label = 'Carregando usuários' }: LoadingSpinnerProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-16">
      <span
        aria-hidden="true"
        className="size-10 animate-spin rounded-full border-4 border-border-subtle border-t-primary-dark dark:border-t-primary"
      />
      <span className="text-sm font-semibold text-body dark:text-white/72">{label}</span>
    </div>
  )
}
