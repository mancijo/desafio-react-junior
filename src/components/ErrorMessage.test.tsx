import { render, screen } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
  it('é anunciado a leitores de tela com role="alert"', () => {
    render(<ErrorMessage />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('exibe uma mensagem clara sobre a falha', () => {
    render(<ErrorMessage />)

    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível carregar os usuários.')
  })
})
