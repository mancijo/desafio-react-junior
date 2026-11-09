import { render, screen } from '@testing-library/react'
import { ErrorMessage } from '../../components/ErrorMessage'

describe('ErrorMessage', () => {
  it('is announced to screen readers with role="alert"', () => {
    render(<ErrorMessage />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('shows a clear message about the failure', () => {
    render(<ErrorMessage />)

    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível carregar os usuários.')
  })
})
