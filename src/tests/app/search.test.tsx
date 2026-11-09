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

describe('App — name search (US04)', () => {
  it('has a labelled search field', async () => {
    await renderLoaded()

    expect(screen.getByLabelText('Buscar por nome')).toBeInTheDocument()
  })

  it('filters the list on every keystroke (real time)', async () => {
    const user = await renderLoaded()
    const input = screen.getByLabelText('Buscar por nome')

    await user.type(input, 'g')
    const afterOneKey = screen.getAllByRole('listitem').length
    expect(afterOneKey).toBeLessThan(usersFixture.length)

    await user.type(input, 'r')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
  })

  it('shows all users again when the field is cleared', async () => {
    const user = await renderLoaded()
    const input = screen.getByLabelText('Buscar por nome')

    await user.type(input, 'graham')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)

    await user.clear(input)
    expect(screen.getAllByRole('listitem')).toHaveLength(usersFixture.length)
  })
})
