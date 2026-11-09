import { mockFetchHttpError, mockFetchSuccess } from '../mocks/fetchMock'
import { todosFixture } from '../fixtures/todos'
import { TODOS_URL, fetchTodos } from '../../services/todosApi'

describe('fetchTodos', () => {
  it('makes a GET request to the JSONPlaceholder todos endpoint', async () => {
    const fetchMock = mockFetchSuccess(todosFixture)

    await fetchTodos()

    expect(TODOS_URL).toBe('https://jsonplaceholder.typicode.com/todos')
    expect(fetchMock.mock.calls[0][0]).toBe(TODOS_URL)
  })

  it('returns the todos sent by the API', async () => {
    mockFetchSuccess(todosFixture)

    await expect(fetchTodos()).resolves.toEqual(todosFixture)
  })

  it('passes the AbortSignal to fetch', async () => {
    const fetchMock = mockFetchSuccess(todosFixture)
    const controller = new AbortController()

    await fetchTodos(controller.signal)

    expect(fetchMock.mock.calls[0][1]?.signal).toBe(controller.signal)
  })

  it('throws when the API responds with a non-2xx status', async () => {
    mockFetchHttpError(500)

    await expect(fetchTodos()).rejects.toThrow()
  })

  it('throws when an item does not have the fields of a todo', async () => {
    mockFetchSuccess([todosFixture[0], { id: 2, title: 'no status' }])

    await expect(fetchTodos()).rejects.toThrow('unexpected format')
  })
})
