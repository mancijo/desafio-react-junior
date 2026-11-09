import type { User } from '../types/user'

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

/**
 * Busca a lista de usuários no JSONPlaceholder.
 * Lança erro em falha de rede ou status HTTP fora da faixa 2xx.
 */
export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { method: 'GET', signal })

  if (!response.ok) {
    throw new Error(`Falha ao carregar usuários (HTTP ${response.status})`)
  }

  return (await response.json()) as User[]
}
