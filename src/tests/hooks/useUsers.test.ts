import { renderHook, waitFor } from '@testing-library/react'
import { mockFetchHttpError, mockFetchPending, mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'
import { useUsers } from '../../hooks/useUsers'

describe('useUsers', () => {
  it('starts loading and exposes the users when the request finishes', async () => {
    mockFetchSuccess(usersFixture)

    const { result } = renderHook(() => useUsers())

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.users).toEqual(usersFixture)
    expect(result.current.error).toBeNull()
  })

  it('exposes the error when the request fails', async () => {
    mockFetchHttpError(503)

    const { result } = renderHook(() => useUsers())

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.users).toEqual([])
    expect(result.current.error).toBeInstanceOf(Error)
  })

  it('aborts the request when unmounted before it finishes', () => {
    const pending = mockFetchPending()

    const { unmount } = renderHook(() => useUsers())
    const signal = pending.fetch.mock.calls[0][1]?.signal
    expect(signal?.aborted).toBe(false)

    unmount()

    expect(signal?.aborted).toBe(true)
  })
})
