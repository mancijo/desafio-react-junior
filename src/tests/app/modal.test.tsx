import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'

async function renderLoaded() {
  const fetchMock = mockFetchSuccess(usersFixture)
  const user = userEvent.setup()
  render(<App />)
  await screen.findByText('Leanne Graham')
  return { user, fetchMock }
}

describe('App — modal de detalhes (US09)', () => {
  it('ao clicar em um usuário, abre o modal com os dados dele', async () => {
    const { user } = await renderLoaded()

    await user.click(screen.getByRole('button', { name: /Leanne Graham/ }))

    const dialog = screen.getByRole('dialog', { name: 'Leanne Graham' })
    expect(within(dialog).getByText('Sincere@april.biz')).toBeInTheDocument()
    expect(within(dialog).getByText('Gwenborough')).toBeInTheDocument()
    expect(within(dialog).getByText('Romaguera-Crona')).toBeInTheDocument()
  })

  it('exibe os campos exigidos pelo desafio: nome, email, telefone, empresa e cidade', async () => {
    const { user } = await renderLoaded()
    const leanne = usersFixture[0]

    await user.click(screen.getByRole('button', { name: /Leanne Graham/ }))

    const dialog = screen.getByRole('dialog')
    for (const value of [
      leanne.name,
      leanne.email,
      leanne.phone,
      leanne.company.name,
      leanne.address.city,
    ]) {
      expect(within(dialog).getAllByText(value).length).toBeGreaterThan(0)
    }
  })

  it('o botão de fechar fecha o modal', async () => {
    const { user } = await renderLoaded()

    await user.click(screen.getByRole('button', { name: /Leanne Graham/ }))
    await user.click(screen.getByRole('button', { name: 'Fechar detalhes' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('usa o usuário já carregado, sem nova requisição', async () => {
    const { user, fetchMock } = await renderLoaded()

    await user.click(screen.getByRole('button', { name: /Leanne Graham/ }))

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
