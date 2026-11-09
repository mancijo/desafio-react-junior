import type { Todo } from '../types/todo'

export const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false
  const todo = value as Record<string, unknown>
  return (
    typeof todo.userId === 'number' &&
    typeof todo.id === 'number' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean'
  )
}

/**
 * Fetches the list of todos from JSONPlaceholder.
 * Throws on network failure, non-2xx HTTP status or an unexpected response format.
 */
export async function fetchTodos(signal?: AbortSignal): Promise<Todo[]> {
  const response = await fetch(TODOS_URL, { method: 'GET', signal })

  if (!response.ok) {
    throw new Error(`Failed to load todos (HTTP ${response.status})`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isTodo)) {
    throw new Error('The API returned todos in an unexpected format')
  }

  return data
}
