import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('tem texto acessível "Carregando usuários" com role="status"', () => {
    render(<LoadingSpinner />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando usuários')
  })

  it('exibe um spinner animado com animate-spin em ciano', () => {
    const { container } = render(<LoadingSpinner />)

    const spinner = container.querySelector('.animate-spin')
    expect(spinner).not.toBeNull()
    expect(spinner?.getAttribute('class')).toMatch(/primary-dark/)
    expect(spinner?.getAttribute('class')).toMatch(/dark:border-t-primary/)
  })
})
