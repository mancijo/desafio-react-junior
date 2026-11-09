import { mockFetchHttpError, mockFetchNetworkError, mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'
import { USERS_URL, fetchUsers } from '../../services/usersApi'

describe('fetchUsers', () => {
  it('makes a GET request to the JSONPlaceholder users endpoint', async () => {
    const fetchMock = mockFetchSuccess(usersFixture)

    await fetchUsers()

    expect(USERS_URL).toBe('https://jsonplaceholder.typicode.com/users')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(USERS_URL)
    expect(init?.method ?? 'GET').toBe('GET')
  })

  it('returns the users sent by the API', async () => {
    mockFetchSuccess(usersFixture)

    await expect(fetchUsers()).resolves.toEqual(usersFixture)
  })

  it('passes the AbortSignal to fetch', async () => {
    const fetchMock = mockFetchSuccess(usersFixture)
    const controller = new AbortController()

    await fetchUsers(controller.signal)

    expect(fetchMock.mock.calls[0][1]?.signal).toBe(controller.signal)
  })

  it('throws when the API responds with a non-2xx status', async () => {
    mockFetchHttpError(500)

    await expect(fetchUsers()).rejects.toThrow()
  })

  it('throws on a network failure', async () => {
    mockFetchNetworkError()

    await expect(fetchUsers()).rejects.toThrow()
  })

  it('throws when the response is not a list', async () => {
    mockFetchSuccess({ message: 'unexpected format' })

    await expect(fetchUsers()).rejects.toThrow('unexpected format')
  })

  it('throws when a list item does not have the fields of a user', async () => {
    mockFetchSuccess([usersFixture[0], { id: 2, name: 'No email' }])

    await expect(fetchUsers()).rejects.toThrow('unexpected format')
  })

  it('throws when the body is not valid JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('<html>', { status: 200 })),
    )

    await expect(fetchUsers()).rejects.toThrow()
  })
})
