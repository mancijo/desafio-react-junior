import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { mockFetchSuccess } from './test/fetchMock'
import { usersFixture } from './test/fixtures/users'

async function renderLoaded() {
  mockFetchSuccess(usersFixture)
  const user = userEvent.setup()
  render(<App />)
  await screen.findByText('Leanne Graham')
  return user
}

describe('App — teclado e leitor de tela (US14)', () => {
  it('cada usuário é um botão focável que abre os detalhes com Enter', async () => {
    const user = await renderLoaded()
    const card = screen.getByRole('button', { name: /Leanne Graham/ })

    card.focus()
    expect(card).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('dialog', { name: 'Leanne Graham' })).toBeInTheDocument()
  })

  it('cada usuário também abre os detalhes com Espaço', async () => {
    const user = await renderLoaded()

    screen.getByRole('button', { name: /Ervin Howell/ }).focus()
    await user.keyboard(' ')

    expect(screen.getByRole('dialog', { name: 'Ervin Howell' })).toBeInTheDocument()
  })

  it('busca, filtros e ordenação têm rótulos', async () => {
    await renderLoaded()

    expect(screen.getByRole('searchbox', { name: 'Buscar por nome' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Cidade' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Empresa' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Ordenar por nome' })).toBeInTheDocument()
  })

  it('a navegação por Tab percorre tema, busca, filtros, ordenação e os usuários, nessa ordem', async () => {
    const user = await renderLoaded()

    await user.tab()
    expect(screen.getByRole('button', { name: /Ativar modo/ })).toHaveFocus()
    await user.tab()
    expect(screen.getByLabelText('Buscar por nome')).toHaveFocus()
    await user.tab()
    expect(screen.getByLabelText('Cidade')).toHaveFocus()
    await user.tab()
    expect(screen.getByLabelText('Empresa')).toHaveFocus()
    await user.tab()
    expect(screen.getByLabelText('Ordenar por nome')).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: /Ana Júlia Souza/ })).toHaveFocus()
  })

  it('os cards têm indicador de foco visível', async () => {
    await renderLoaded()

    const card = screen.getByRole('button', { name: /Leanne Graham/ })
    expect(card.className).toMatch(/focus-visible:outline/)
  })
})
