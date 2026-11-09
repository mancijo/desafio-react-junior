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

describe('App — details modal (US09)', () => {
  it('clicking a user opens the modal with their data', async () => {
    const { user } = await renderLoaded()

    await user.click(screen.getByRole('button', { name: /Leanne Graham/ }))

    const dialog = screen.getByRole('dialog', { name: 'Leanne Graham' })
    expect(within(dialog).getByText('Sincere@april.biz')).toBeInTheDocument()
    expect(within(dialog).getByText('Gwenborough')).toBeInTheDocument()
    expect(within(dialog).getByText('Romaguera-Crona')).toBeInTheDocument()
  })

  it('shows the fields required by the challenge: name, email, phone, company and city', async () => {
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

  it('the close button closes the modal', async () => {
    const { user } = await renderLoaded()

    await user.click(screen.getByRole('button', { name: /Leanne Graham/ }))
    await user.click(screen.getByRole('button', { name: 'Fechar detalhes' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('uses the already loaded user, without a new request', async () => {
    const { user, fetchMock } = await renderLoaded()

    await user.click(screen.getByRole('button', { name: /Leanne Graham/ }))

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
