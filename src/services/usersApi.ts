import type { User } from '../types/user'

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Checks at runtime the fields the app uses.
 * The `User` type only exists at compile time; without this check, a response
 * in another format would crash the UI instead of showing the error.
 */
function isUser(value: unknown): value is User {
  if (!isRecord(value)) return false
  const { address, company } = value
  return (
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    typeof value.username === 'string' &&
    typeof value.email === 'string' &&
    typeof value.phone === 'string' &&
    typeof value.website === 'string' &&
    isRecord(address) &&
    typeof address.city === 'string' &&
    isRecord(address.geo) &&
    isRecord(company) &&
    typeof company.name === 'string'
  )
}

/**
 * Fetches the list of users from JSONPlaceholder.
 * Throws on network failure, non-2xx HTTP status or an unexpected response format.
 */
export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { method: 'GET', signal })

  if (!response.ok) {
    throw new Error(`Failed to load users (HTTP ${response.status})`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isUser)) {
    throw new Error('The API returned users in an unexpected format')
  }

  return data
}
