import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { TODOS_URL } from '../../services/todosApi'
import { USERS_URL } from '../../services/usersApi'
import { mockFetchByUrl } from '../mocks/fetchMock'
import { todosFixture } from '../fixtures/todos'
import { usersFixture } from '../fixtures/users'

async function renderTodos() {
  const fetchMock = mockFetchByUrl({ [USERS_URL]: usersFixture, [TODOS_URL]: todosFixture })
  const user = userEvent.setup()
  render(<App />)
  await screen.findByText('Leanne Graham')
  await user.click(screen.getByRole('button', { name: 'Tarefas' }))
  await screen.findByRole('heading', { level: 1, name: 'Lista de Tarefas' })
  await screen.findByRole('list', { name: 'Tarefas' })
  return { user, fetchMock }
}

const listedTitles = () =>
  screen
    .getAllByRole('listitem')
    .map((item) => within(item).getByRole('button').querySelector('span')?.textContent ?? '')

describe('App — todos data source (stress)', () => {
  it('starts with the users source selected', async () => {
    mockFetchByUrl({ [USERS_URL]: usersFixture, [TODOS_URL]: todosFixture })
    render(<App />)

    await screen.findByText('Leanne Graham')
    expect(screen.getByRole('button', { name: 'Usuários' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Tarefas' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('choosing "Tarefas" fetches the todos endpoint and renders all 200 items', async () => {
    const { fetchMock } = await renderTodos()

    expect(fetchMock.mock.calls.map((call) => call[0])).toContain(TODOS_URL)
    expect(screen.getAllByRole('listitem')).toHaveLength(200)
  })

  it('shows the title and "user · status" on each card', async () => {
    await renderTodos()

    const card = screen.getByRole('button', { name: /^delectus aut autem 1\s?Usuário/ })
    expect(card).toHaveTextContent('Usuário 1 · Pendente')
  })

  it('searches by title', async () => {
    const { user } = await renderTodos()

    await user.type(screen.getByLabelText('Buscar por título'), 'fugiat veniam')

    expect(screen.getAllByRole('listitem')).toHaveLength(50)
    expect(listedTitles().every((title) => title.includes('fugiat veniam'))).toBe(true)
  })

  it('filters by status and by user, combined', async () => {
    const { user } = await renderTodos()

    await user.selectOptions(screen.getByLabelText('Status'), 'Concluída')
    expect(screen.getAllByRole('listitem')).toHaveLength(66)

    await user.selectOptions(screen.getByLabelText('Usuário'), 'Usuário 2')
    // user 2 owns todos 21 to 40; the completed ones are the multiples of 3 (21, 24, ..., 39)
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
  })

  it('lists the users in numeric order in the filter', async () => {
    await renderTodos()

    const options = within(screen.getByLabelText('Usuário'))
      .getAllByRole('option')
      .map((option) => option.textContent)

    expect(options).toEqual([
      'Todos os usuários',
      ...Array.from({ length: 10 }, (_, index) => `Usuário ${index + 1}`),
    ])
  })

  it('sorts by title, A–Z by default and Z–A on demand', async () => {
    const { user } = await renderTodos()
    expect(listedTitles()[0]).toBe('delectus aut autem 1')

    await user.selectOptions(screen.getByLabelText('Ordenar por título'), 'Z–A')

    expect(listedTitles()[0]).toMatch(/^quis ut nam facilis/)
  })

  it('opens the modal with title, status, user and ID', async () => {
    const { user } = await renderTodos()

    await user.click(screen.getByRole('button', { name: /^delectus aut autem 1\s?Usuário/ }))

    const dialog = screen.getByRole('dialog', { name: 'delectus aut autem 1' })
    expect(
      within(dialog)
        .getAllByRole('term')
        .map((term) => term.textContent),
    ).toEqual(['Título', 'Status', 'Usuário', 'ID'])
  })

  it('shows the todos empty message when a search finds nothing', async () => {
    const { user } = await renderTodos()

    await user.type(screen.getByLabelText('Buscar por título'), 'xyzxyz')

    expect(screen.getByRole('status')).toHaveTextContent('Nenhuma tarefa encontrada para "xyzxyz".')
  })

  it('going back to "Usuários" shows the users again with a clean search', async () => {
    const { user } = await renderTodos()
    await user.type(screen.getByLabelText('Buscar por título'), 'fugiat')

    await user.click(screen.getByRole('button', { name: 'Usuários' }))

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.getByLabelText('Buscar por nome')).toHaveValue('')
    expect(screen.getAllByRole('listitem')).toHaveLength(usersFixture.length)
  })
})
