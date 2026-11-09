import { render, screen } from '@testing-library/react'
import App from '../../App'
import { mockFetchHttpError, mockFetchNetworkError, mockFetchSuccess } from '../mocks/fetchMock'

describe('App — erro (US03)', () => {
  it('exibe o componente de erro quando a API responde com status de erro', async () => {
    mockFetchHttpError(500)
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os usuários.',
    )
  })

  it('exibe o componente de erro quando há falha de rede', async () => {
    mockFetchNetworkError()
    render(<App />)

    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })

  it('não exibe a lista nem o spinner quando houve erro', async () => {
    mockFetchHttpError(404)
    render(<App />)

    await screen.findByRole('alert')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByText('Carregando usuários')).not.toBeInTheDocument()
  })
})

describe('App — resposta inesperada da API', () => {
  it('exibe o componente de erro em vez de quebrar quando a API não devolve uma lista', async () => {
    mockFetchSuccess({ erro: 'formato inesperado' })
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os usuários.',
    )
  })
})
