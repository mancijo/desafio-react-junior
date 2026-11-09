import { useId } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
}

/** Search field with a visible label. */
export function SearchBar({
  value,
  onChange,
  label = 'Buscar por nome',
  placeholder = 'Ex.: Leanne Graham',
}: SearchBarProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-heading dark:text-white">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-11 w-full rounded-icon border border-border-strong bg-white px-4 text-heading transition-colors duration-300 placeholder:text-body focus-visible:border-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark motion-reduce:transition-none dark:border-white/40 dark:bg-glass dark:text-white dark:placeholder:text-white/50 dark:focus-visible:border-primary dark:focus-visible:outline-primary"
      />
    </div>
  )
}
