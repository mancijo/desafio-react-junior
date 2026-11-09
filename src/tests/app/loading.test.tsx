import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react'
import App from '../../App'
import { mockFetchHttpError, mockFetchPending } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'

describe('App — loading (US02)', () => {
  it('shows the spinner while the request has not finished', () => {
    mockFetchPending()
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando usuários')
  })

  it('hides the spinner when the request succeeds', async () => {
    const pending = mockFetchPending()
    render(<App />)

    await act(async () => pending.resolve(usersFixture))

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.queryByText('Carregando usuários')).not.toBeInTheDocument()
  })

  it('hides the spinner when the request fails', async () => {
    mockFetchHttpError(500)
    render(<App />)

    await waitFor(() => expect(screen.queryByText('Carregando usuários')).not.toBeInTheDocument())
  })
})
