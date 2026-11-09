import { useId } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

/** Campo de busca por nome, com rótulo visível. */
export function SearchBar({ value, onChange }: SearchBarProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-heading dark:text-white">
        Buscar por nome
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ex.: Leanne Graham"
        autoComplete="off"
        className="h-11 w-full rounded-icon border border-border-subtle bg-white px-4 text-heading transition-colors duration-300 placeholder:text-body/70 focus-visible:border-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark motion-reduce:transition-none dark:bg-glass dark:text-white dark:placeholder:text-white/50 dark:focus-visible:border-primary dark:focus-visible:outline-primary"
      />
    </div>
  )
}
