import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { mockFetchSuccess } from './test/fetchMock'
import { usersFixture } from './test/fixtures/users'

async function renderLoaded(data: unknown = usersFixture) {
  mockFetchSuccess(data)
  const user = userEvent.setup()
  render(<App />)
  await screen.findByLabelText('Buscar por nome')
  return user
}

describe('App — nenhum usuário encontrado (US05)', () => {
  it('exibe a mensagem no lugar da lista quando a busca não encontra ninguém', async () => {
    const user = await renderLoaded()

    await user.type(screen.getByLabelText('Buscar por nome'), 'xyz')

    expect(screen.getByRole('status')).toHaveTextContent('Nenhum usuário encontrado')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('exibe a mensagem quando os filtros não retornam ninguém', async () => {
    const user = await renderLoaded()

    await user.selectOptions(screen.getByLabelText('Cidade'), 'Curitiba')
    await user.selectOptions(screen.getByLabelText('Empresa'), 'Açaí Tech')

    expect(screen.getByRole('status')).toHaveTextContent('Nenhum usuário encontrado.')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('a mensagem some e a lista volta quando a busca passa a ter resultados', async () => {
    const user = await renderLoaded()
    const input = screen.getByLabelText('Buscar por nome')

    await user.type(input, 'xyz')
    await user.clear(input)
    await user.type(input, 'graham')

    expect(screen.queryByText(/Nenhum usuário encontrado/)).not.toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
  })

  it('é anunciada a leitores de tela (role="status")', async () => {
    const user = await renderLoaded()

    await user.type(screen.getByLabelText('Buscar por nome'), 'xyz')

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('mostra o termo buscado na mensagem', async () => {
    const user = await renderLoaded()

    await user.type(screen.getByLabelText('Buscar por nome'), 'xyz')

    expect(screen.getByRole('status')).toHaveTextContent('Nenhum usuário encontrado para "xyz".')
  })

  it('quando a API não retorna usuários, exibe "Nenhum usuário cadastrado."', async () => {
    await renderLoaded([])

    expect(screen.getByRole('status')).toHaveTextContent('Nenhum usuário cadastrado.')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
