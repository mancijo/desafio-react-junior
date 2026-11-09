import { render, screen } from '@testing-library/react'
import App from '../../App'
import { mockFetchHttpError, mockFetchNetworkError, mockFetchSuccess } from '../mocks/fetchMock'

describe('App — error (US03)', () => {
  it('shows the error component when the API responds with an error status', async () => {
    mockFetchHttpError(500)
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os usuários.',
    )
  })

  it('shows the error component on a network failure', async () => {
    mockFetchNetworkError()
    render(<App />)

    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })

  it('shows neither the list nor the spinner after an error', async () => {
    mockFetchHttpError(404)
    render(<App />)

    await screen.findByRole('alert')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByText('Carregando usuários')).not.toBeInTheDocument()
  })
})

describe('App — unexpected API response', () => {
  it('shows the error component instead of crashing when the API does not return a list', async () => {
    mockFetchSuccess({ error: 'unexpected format' })
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os usuários.',
    )
  })
})
