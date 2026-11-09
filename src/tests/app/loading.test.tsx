import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react'
import App from '../../App'
import { mockFetchHttpError, mockFetchPending } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'

describe('App — carregamento (US02)', () => {
  it('exibe o spinner enquanto a requisição não terminou', () => {
    mockFetchPending()
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando usuários')
  })

  it('esconde o spinner quando a requisição termina com sucesso', async () => {
    const pending = mockFetchPending()
    render(<App />)

    await act(async () => pending.resolve(usersFixture))

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.queryByText('Carregando usuários')).not.toBeInTheDocument()
  })

  it('esconde o spinner quando a requisição termina com erro', async () => {
    mockFetchHttpError(500)
    render(<App />)

    await waitFor(() => expect(screen.queryByText('Carregando usuários')).not.toBeInTheDocument())
  })
})
