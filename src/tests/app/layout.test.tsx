import { render, screen, within } from '@testing-library/react'
import App from '../../App'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'

describe('App — visual identity and structure (US11)', () => {
  it('has a header (banner landmark) with the app name', () => {
    mockFetchSuccess(usersFixture)
    render(<App />)

    const header = screen.getByRole('banner')
    expect(within(header).getByText('Desafio React Júnior')).toBeInTheDocument()
  })

  it('the header is fixed with a navy background, blur and bottom border', () => {
    mockFetchSuccess(usersFixture)
    render(<App />)

    const header = screen.getByRole('banner')
    expect(header.className).toMatch(/\bfixed\b/)
    expect(header.className).toMatch(/bg-navy-header/)
    expect(header.className).toMatch(/backdrop-blur-header/)
    expect(header.className).toMatch(/border-b/)
  })

  it('the main title is a real <h1> inside the main content', () => {
    mockFetchSuccess(usersFixture)
    render(<App />)

    const main = screen.getByRole('main')
    expect(
      within(main).getByRole('heading', { level: 1, name: 'Lista de Usuários' }),
    ).toBeInTheDocument()
  })
})
