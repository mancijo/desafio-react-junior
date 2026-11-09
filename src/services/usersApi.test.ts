import { mockFetchHttpError, mockFetchNetworkError, mockFetchSuccess } from '../test/fetchMock'
import { usersFixture } from '../test/fixtures/users'
import { USERS_URL, fetchUsers } from './usersApi'

describe('fetchUsers', () => {
  it('faz um GET no endpoint de usuários do JSONPlaceholder', async () => {
    const fetchMock = mockFetchSuccess(usersFixture)

    await fetchUsers()

    expect(USERS_URL).toBe('https://jsonplaceholder.typicode.com/users')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(USERS_URL)
    expect(init?.method ?? 'GET').toBe('GET')
  })

  it('devolve os usuários retornados pela API', async () => {
    mockFetchSuccess(usersFixture)

    await expect(fetchUsers()).resolves.toEqual(usersFixture)
  })

  it('repassa o AbortSignal para o fetch', async () => {
    const fetchMock = mockFetchSuccess(usersFixture)
    const controller = new AbortController()

    await fetchUsers(controller.signal)

    expect(fetchMock.mock.calls[0][1]?.signal).toBe(controller.signal)
  })

  it('lança erro quando a API responde com status diferente de 2xx', async () => {
    mockFetchHttpError(500)

    await expect(fetchUsers()).rejects.toThrow()
  })

  it('lança erro quando há falha de rede', async () => {
    mockFetchNetworkError()

    await expect(fetchUsers()).rejects.toThrow()
  })
})
