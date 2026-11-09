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

describe('App — busca por nome (US04)', () => {
  it('tem um campo de busca rotulado', async () => {
    await renderLoaded()

    expect(screen.getByLabelText('Buscar por nome')).toBeInTheDocument()
  })

  it('filtra a lista a cada tecla digitada (tempo real)', async () => {
    const user = await renderLoaded()
    const input = screen.getByLabelText('Buscar por nome')

    await user.type(input, 'g')
    const afterOneKey = screen.getAllByRole('listitem').length
    expect(afterOneKey).toBeLessThan(usersFixture.length)

    await user.type(input, 'r')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
  })

  it('volta a exibir todos os usuários quando o campo é esvaziado', async () => {
    const user = await renderLoaded()
    const input = screen.getByLabelText('Buscar por nome')

    await user.type(input, 'graham')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)

    await user.clear(input)
    expect(screen.getAllByRole('listitem')).toHaveLength(usersFixture.length)
  })
})
