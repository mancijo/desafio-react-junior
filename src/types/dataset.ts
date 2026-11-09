import type { User } from './user'

export type DatasetId = 'users' | 'todos'

/** One labelled value shown in the details modal. */
export interface DetailItem {
  label: string
  value: string
}

/** Every user-facing text that depends on the data source (shown in pt-BR). */
export interface DatasetText {
  eyebrow: string
  title: string
  intro: string
  searchLabel: string
  searchPlaceholder: string
  /** Filter backed by `address.city`. */
  cityFilterLabel: string
  cityFilterAll: string
  /** Filter backed by `company.name`. */
  companyFilterLabel: string
  companyFilterAll: string
  sortLabel: string
  listLabel: string
  loading: string
  errorTitle: string
  emptyApi: string
  noResults: string
  noResultsFor: (term: string) => string
  noResultsHint: string
  detailsEyebrow: string
}

/**
 * A data source for the listing. Items are always delivered in the `User` shape,
 * which is what search, filters, sorting, cards and the modal understand.
 */
export interface Dataset {
  id: DatasetId
  /** Label of the option in the data source switch. */
  label: string
  load: (signal?: AbortSignal) => Promise<User[]>
  text: DatasetText
  details: (item: User) => DetailItem[]
}
