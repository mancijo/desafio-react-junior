import type { UseUserListingResult } from '../hooks/useUserListing'
import type { SortOrder } from '../utils/sort'
import { SearchBar } from './SearchBar'
import { SelectField } from './SelectField'

const SORT_OPTIONS = [
  { value: 'asc', label: 'A–Z' },
  { value: 'desc', label: 'Z–A' },
]

const toSortOrder = (value: string): SortOrder => (value === 'desc' ? 'desc' : 'asc')

type ListingControlsProps = Pick<
  UseUserListingResult,
  | 'searchTerm'
  | 'setSearchTerm'
  | 'filters'
  | 'setCity'
  | 'setCompany'
  | 'sortOrder'
  | 'setSortOrder'
  | 'cityOptions'
  | 'companyOptions'
>

/** Name search, city and company filters and sorting, side by side on desktop. */
export function ListingControls(props: ListingControlsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SearchBar value={props.searchTerm} onChange={props.setSearchTerm} />
      <SelectField
        label="Cidade"
        value={props.filters.city}
        options={props.cityOptions}
        onChange={props.setCity}
      />
      <SelectField
        label="Empresa"
        value={props.filters.company}
        options={props.companyOptions}
        onChange={props.setCompany}
      />
      <SelectField
        label="Ordenar por nome"
        value={props.sortOrder}
        options={SORT_OPTIONS}
        onChange={(value) => props.setSortOrder(toSortOrder(value))}
      />
    </div>
  )
}
