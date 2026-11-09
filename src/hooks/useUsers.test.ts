import { renderHook, waitFor } from '@testing-library/react'
import { mockFetchHttpError, mockFetchPending, mockFetchSuccess } from '../test/fetchMock'
import { usersFixture } from '../test/fixtures/users'
import { useUsers } from './useUsers'

describe('useUsers', () => {
  it('começa carregando e expõe os usuários quando a requisição termina', async () => {
    mockFetchSuccess(usersFixture)

    const { result } = renderHook(() => useUsers())

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.users).toEqual(usersFixture)
    expect(result.current.error).toBeNull()
  })

  it('expõe o erro quando a requisição falha', async () => {
    mockFetchHttpError(503)

    const { result } = renderHook(() => useUsers())

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.users).toEqual([])
    expect(result.current.error).toBeInstanceOf(Error)
  })

  it('cancela a requisição ao desmontar antes de ela terminar', () => {
    const pending = mockFetchPending()

    const { unmount } = renderHook(() => useUsers())
    const signal = pending.fetch.mock.calls[0][1]?.signal
    expect(signal?.aborted).toBe(false)

    unmount()

    expect(signal?.aborted).toBe(true)
  })
})
