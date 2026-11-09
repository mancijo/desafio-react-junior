interface EmptyStateProps {
  title: string
  description?: string
}

/** Notice shown instead of the list when there are no users to display. */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="mx-auto max-w-xl rounded-card border border-dashed border-border-subtle p-8 text-center"
    >
      <p className="text-lg font-bold break-words text-heading dark:text-white">{title}</p>
      {description && <p className="mt-2 text-body dark:text-white/72">{description}</p>}
    </div>
  )
}
