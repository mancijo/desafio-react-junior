import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../../components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('has accessible text "Carregando usuários" with role="status"', () => {
    render(<LoadingSpinner />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando usuários')
  })

  it('shows a cyan spinner animated with animate-spin', () => {
    const { container } = render(<LoadingSpinner />)

    const spinner = container.querySelector('.animate-spin')
    expect(spinner).not.toBeNull()
    expect(spinner?.getAttribute('class')).toMatch(/primary-dark/)
    expect(spinner?.getAttribute('class')).toMatch(/dark:border-t-primary/)
  })
})
