interface ErrorMessageProps {
  title?: string
}

/** Notice of a failure to load the data, announced to screen readers. */
export function ErrorMessage({
  title = 'Não foi possível carregar os usuários.',
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-xl rounded-card border border-red-300 bg-red-50 p-6 text-center dark:border-red-400/40 dark:bg-red-500/10"
    >
      <p className="text-lg font-bold text-heading dark:text-white">{title}</p>
      <p className="mt-2 text-body dark:text-white/72">
        Verifique sua conexão e recarregue a página.
      </p>
    </div>
  )
}
