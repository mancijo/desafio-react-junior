import { render, screen } from '@testing-library/react'
import App from './App'
import { mockFetchSuccess } from './test/fetchMock'
import { usersFixture } from './test/fixtures/users'

describe('App', () => {
  it('exibe o título principal como <h1>', () => {
    mockFetchSuccess(usersFixture)
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Lista de Usuários' })).toBeInTheDocument()
  })

  it('ao carregar, busca os usuários na API e exibe a lista', async () => {
    const fetchMock = mockFetchSuccess(usersFixture)
    render(<App />)

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(fetchMock.mock.calls[0][0]).toBe('https://jsonplaceholder.typicode.com/users')
    expect(screen.getAllByRole('listitem')).toHaveLength(10)
  })
})
