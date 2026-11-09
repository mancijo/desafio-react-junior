import { todosDataset, todoToUser } from '../../datasets/todos'
import { usersDataset } from '../../datasets/users'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { todosFixture } from '../fixtures/todos'
import { fixtureUser } from '../fixtures/users'

describe('todoToUser', () => {
  it('maps a pending todo to the shape the listing understands', () => {
    const item = todoToUser({ userId: 3, id: 42, title: 'delectus aut autem', completed: false })

    expect(item.id).toBe(42)
    expect(item.name).toBe('delectus aut autem')
    expect(item.email).toBe('Usuário 3 · Pendente')
    expect(item.address.city).toBe('Pendente')
    expect(item.company.name).toBe('Usuário 3')
  })

  it('maps a completed todo with the "Concluída" status', () => {
    const item = todoToUser({ userId: 10, id: 7, title: 'x', completed: true })

    expect(item.email).toBe('Usuário 10 · Concluída')
    expect(item.address.city).toBe('Concluída')
  })
})

describe('todosDataset', () => {
  it('loads the todos and adapts every one of them', async () => {
    mockFetchSuccess(todosFixture)

    const items = await todosDataset.load()

    expect(items).toHaveLength(200)
    expect(items[0].name).toBe(todosFixture[0].title)
  })

  it('describes a todo with title, status, user and ID', () => {
    const details = todosDataset.details(todoToUser(todosFixture[2]))

    expect(details).toEqual([
      { label: 'Título', value: todosFixture[2].title },
      { label: 'Status', value: 'Concluída' },
      { label: 'Usuário', value: 'Usuário 1' },
      { label: 'ID', value: '3' },
    ])
  })
})

describe('usersDataset', () => {
  it('describes a user with the five fields required by the challenge', () => {
    const labels = usersDataset.details(fixtureUser('Leanne Graham')).map((item) => item.label)

    expect(labels).toEqual(['Nome completo', 'Email', 'Telefone', 'Empresa', 'Cidade'])
  })
})
