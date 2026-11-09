import { render, screen, within } from '@testing-library/react'
import App from '../../App'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'

describe('App — identidade visual e estrutura (US11)', () => {
  it('tem um header (landmark banner) com o nome da aplicação', () => {
    mockFetchSuccess(usersFixture)
    render(<App />)

    const header = screen.getByRole('banner')
    expect(within(header).getByText('Desafio React Júnior')).toBeInTheDocument()
  })

  it('o header é fixo e usa o fundo marinho com desfoque e borda inferior', () => {
    mockFetchSuccess(usersFixture)
    render(<App />)

    const header = screen.getByRole('banner')
    expect(header.className).toMatch(/\bfixed\b/)
    expect(header.className).toMatch(/bg-navy-header/)
    expect(header.className).toMatch(/backdrop-blur-header/)
    expect(header.className).toMatch(/border-b/)
  })

  it('o título principal é um <h1> real dentro do conteúdo principal', () => {
    mockFetchSuccess(usersFixture)
    render(<App />)

    const main = screen.getByRole('main')
    expect(
      within(main).getByRole('heading', { level: 1, name: 'Lista de Usuários' }),
    ).toBeInTheDocument()
  })
})
