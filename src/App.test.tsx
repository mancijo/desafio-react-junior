import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('exibe o título principal como <h1>', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Lista de Usuários' })).toBeInTheDocument()
  })
})
