export interface DetailItem {
  label: string
  value: string
}

interface DetailGroupProps {
  title: string
  items: DetailItem[]
}

/** Grupo de dados do usuário (ex.: Contato), em lista de definição. */
export function DetailGroup({ title, items }: DetailGroupProps) {
  return (
    <section className="rounded-card border border-border-subtle p-5 dark:bg-glass">
      <h3 className="text-xs font-semibold tracking-widest text-primary-dark uppercase dark:text-primary">
        {title}
      </h3>
      <dl className="mt-3 flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <dt className="text-sm font-medium text-body dark:text-white/72">{item.label}</dt>
            <dd className="font-semibold break-words text-heading dark:text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
