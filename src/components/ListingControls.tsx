import { usersDataset } from '../datasets/users'
import type { UseUserListingResult } from '../hooks/useUserListing'
import type { DatasetText } from '../types/dataset'
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
> & {
  text?: Pick<
    DatasetText,
    'searchLabel' | 'searchPlaceholder' | 'cityFilterLabel' | 'companyFilterLabel' | 'sortLabel'
  >
}

/** Search, the two filters and sorting, side by side on desktop. */
export function ListingControls({ text = usersDataset.text, ...props }: ListingControlsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SearchBar
        value={props.searchTerm}
        onChange={props.setSearchTerm}
        label={text.searchLabel}
        placeholder={text.searchPlaceholder}
      />
      <SelectField
        label={text.cityFilterLabel}
        value={props.filters.city}
        options={props.cityOptions}
        onChange={props.setCity}
      />
      <SelectField
        label={text.companyFilterLabel}
        value={props.filters.company}
        options={props.companyOptions}
        onChange={props.setCompany}
      />
      <SelectField
        label={text.sortLabel}
        value={props.sortOrder}
        options={SORT_OPTIONS}
        onChange={(value) => props.setSortOrder(toSortOrder(value))}
      />
    </div>
  )
}
