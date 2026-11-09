import type { Dataset, DatasetId } from '../types/dataset'

interface DatasetSwitchProps {
  datasets: Dataset[]
  selectedId: DatasetId
  onSelect: (id: DatasetId) => void
}

/** Pill buttons that choose which data source feeds the listing. */
export function DatasetSwitch({ datasets, selectedId, onSelect }: DatasetSwitchProps) {
  return (
    <div
      role="group"
      aria-label="Fonte de dados"
      className="mt-6 flex flex-wrap items-center gap-2"
    >
      <span className="mr-1 text-sm font-semibold text-heading dark:text-white">
        Fonte de dados
      </span>
      {datasets.map((dataset) => {
        const selected = dataset.id === selectedId
        return (
          <button
            key={dataset.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(dataset.id)}
            className={`rounded-pill border px-4 py-2 text-sm font-extrabold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark motion-reduce:transition-none dark:focus-visible:outline-primary ${
              selected
                ? 'border-primary-dark bg-primary-dark text-white dark:border-primary dark:bg-primary dark:text-navy'
                : 'border-border-strong text-heading hover:border-primary-dark hover:text-primary-dark dark:border-white/40 dark:text-white dark:hover:border-primary dark:hover:text-primary'
            }`}
          >
            {dataset.label}
          </button>
        )
      })}
    </div>
  )
}
