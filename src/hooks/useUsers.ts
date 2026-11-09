import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/usersApi'
import type { User } from '../types/user'

export type UsersStatus = 'loading' | 'success' | 'error'

export interface UseUsersResult {
  users: User[]
  status: UsersStatus
  error: Error | null
}

type LoadUsers = (signal?: AbortSignal) => Promise<User[]>

/**
 * Loads the list from the API and exposes data, loading and error states.
 * The request is aborted (AbortController) if the component unmounts before it finishes.
 * `load` defaults to the users endpoint; pass another loader to use a different data source
 * (remount the component, e.g. with a `key`, to switch sources).
 */
export function useUsers(load: LoadUsers = fetchUsers): UseUsersResult {
  const [state, setState] = useState<UseUsersResult>({
    users: [],
    status: 'loading',
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    load(controller.signal)
      .then((users) => setState({ users, status: 'success', error: null }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          users: [],
          status: 'error',
          error: error instanceof Error ? error : new Error(String(error)),
        })
      })

    return () => controller.abort()
  }, [load])

  return state
}
