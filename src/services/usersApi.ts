import type { User } from '../types/user'

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Confere em tempo de execução os campos que a aplicação usa.
 * O tipo `User` só existe na compilação; sem esta checagem, uma resposta
 * em outro formato quebraria a interface em vez de mostrar o erro.
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
 * Busca a lista de usuários no JSONPlaceholder.
 * Lança erro em falha de rede, status HTTP fora da faixa 2xx ou resposta em formato inesperado.
 */
export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { method: 'GET', signal })

  if (!response.ok) {
    throw new Error(`Falha ao carregar usuários (HTTP ${response.status})`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isUser)) {
    throw new Error('A API devolveu os usuários em um formato inesperado')
  }

  return data
}
