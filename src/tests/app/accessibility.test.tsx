import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'

async function renderLoaded() {
  mockFetchSuccess(usersFixture)
  const user = userEvent.setup()
  render(<App />)
  await screen.findByText('Leanne Graham')
  return user
}

describe('App — keyboard and screen reader (US14)', () => {
  it('each user is a focusable button that opens the details with Enter', async () => {
    const user = await renderLoaded()
    const card = screen.getByRole('button', { name: /Leanne Graham/ })

    card.focus()
    expect(card).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('dialog', { name: 'Leanne Graham' })).toBeInTheDocument()
  })

  it('each user also opens the details with Space', async () => {
    const user = await renderLoaded()

    screen.getByRole('button', { name: /Ervin Howell/ }).focus()
    await user.keyboard(' ')

    expect(screen.getByRole('dialog', { name: 'Ervin Howell' })).toBeInTheDocument()
  })

  it('search, filters and sorting have labels', async () => {
    await renderLoaded()

    expect(screen.getByRole('searchbox', { name: 'Buscar por nome' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Cidade' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Empresa' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Ordenar por nome' })).toBeInTheDocument()
  })

  it('Tab navigation goes through theme, data source, search, filters, sorting and users, in this order', async () => {
    const user = await renderLoaded()

    await user.tab()
    expect(screen.getByRole('button', { name: /Ativar modo/ })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Usuários' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Tarefas' })).toHaveFocus()
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

  it('cards have a visible focus indicator', async () => {
    await renderLoaded()

    const card = screen.getByRole('button', { name: /Leanne Graham/ })
    expect(card.className).toMatch(/focus-visible:outline/)
  })
})
