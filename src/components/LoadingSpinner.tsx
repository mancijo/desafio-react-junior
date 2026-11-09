/** Indicador de carregamento: spinner ciano com texto anunciado a leitores de tela. */
export function LoadingSpinner() {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-16">
      <span
        aria-hidden="true"
        className="size-10 animate-spin rounded-full border-4 border-border-subtle border-t-primary-dark dark:border-t-primary"
      />
      <span className="text-sm font-semibold text-body dark:text-white/72">
        Carregando usuários
      </span>
    </div>
  )
}
