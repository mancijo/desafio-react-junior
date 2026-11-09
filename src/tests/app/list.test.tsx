import { render, screen } from '@testing-library/react'
import App from '../../App'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'

describe('App', () => {
  it('shows the main title as an <h1>', () => {
    mockFetchSuccess(usersFixture)
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Lista de Usuários' })).toBeInTheDocument()
  })

  it('on load, fetches users from the API and shows the list', async () => {
    const fetchMock = mockFetchSuccess(usersFixture)
    render(<App />)

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(fetchMock.mock.calls[0][0]).toBe('https://jsonplaceholder.typicode.com/users')
    expect(screen.getAllByRole('listitem')).toHaveLength(10)
  })
})
