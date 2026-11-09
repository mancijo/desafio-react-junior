import Fuse from 'fuse.js'
import type { User } from '../types/user'
import { normalizeText } from './text'

/** From this length on, the term also uses fuzzy search. */
const FUZZY_MIN_LENGTH = 3

/**
 * Fuzzy search tolerance (0 = exact only, 1 = anything).
 * Strict on purpose: exact substrings are always included, so Fuse.js
 * only needs to cover small typos.
 */
const FUZZY_THRESHOLD = 0.3

/**
 * Filters users by name (`name`), ignoring case and accents.
 * - Empty term: all users.
 * - 1–2 letters: only names containing the exact substring.
 * - 3+ letters: names with the exact substring **plus** Fuse.js fuzzy matches.
 * The original order of users is kept (sorting is applied afterwards).
 */
export function searchUsersByName(users: User[], term: string): User[] {
  const query = normalizeText(term)
  if (query === '') return users

  const exactIds = new Set(
    users.filter((user) => normalizeText(user.name).includes(query)).map((user) => user.id),
  )

  if (query.length < FUZZY_MIN_LENGTH) {
    return users.filter((user) => exactIds.has(user.id))
  }

  const fuse = new Fuse(users, {
    keys: ['name'],
    getFn: (user) => normalizeText(user.name),
    threshold: FUZZY_THRESHOLD,
    ignoreLocation: true,
  })
  const fuzzyIds = new Set(fuse.search(query).map((result) => result.item.id))

  return users.filter((user) => exactIds.has(user.id) || fuzzyIds.has(user.id))
}
