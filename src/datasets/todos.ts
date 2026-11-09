import { fetchTodos } from '../services/todosApi'
import type { Dataset } from '../types/dataset'
import type { Todo } from '../types/todo'
import type { User } from '../types/user'

const statusLabel = (completed: boolean) => (completed ? 'Concluída' : 'Pendente')
const ownerLabel = (userId: number) => `Usuário ${userId}`

/**
 * Adapts a todo to the `User` shape, so the whole listing (search, filters,
 * sorting, cards and modal) can be stressed with 200 items without being rewritten:
 * - `name` ← title (searched and sorted);
 * - `email` ← "user · status" (second line of the card);
 * - `address.city` ← status (first filter);
 * - `company.name` ← owner (second filter).
 * The remaining `User` fields do not exist in a todo and stay empty.
 */
export function todoToUser(todo: Todo): User {
  const status = statusLabel(todo.completed)
  const owner = ownerLabel(todo.userId)

  return {
    id: todo.id,
    name: todo.title,
    username: '',
    email: `${owner} · ${status}`,
    phone: '',
    website: '',
    address: { street: '', suite: '', city: status, zipcode: '', geo: { lat: '', lng: '' } },
    company: { name: owner, catchPhrase: '', bs: '' },
  }
}

/** Stress data source: 200 todos from JSONPlaceholder. */
export const todosDataset: Dataset = {
  id: 'todos',
  label: 'Tarefas',
  load: async (signal) => (await fetchTodos(signal)).map(todoToUser),
  text: {
    eyebrow: 'JSONPlaceholder · Teste de estresse',
    title: 'Lista de Tarefas',
    intro:
      'Busque pelo título, filtre por status ou usuário e clique em uma tarefa para ver os detalhes.',
    searchLabel: 'Buscar por título',
    searchPlaceholder: 'Ex.: delectus aut autem',
    cityFilterLabel: 'Status',
    cityFilterAll: 'Todos os status',
    companyFilterLabel: 'Usuário',
    companyFilterAll: 'Todos os usuários',
    sortLabel: 'Ordenar por título',
    listLabel: 'Tarefas',
    loading: 'Carregando tarefas',
    errorTitle: 'Não foi possível carregar as tarefas.',
    emptyApi: 'Nenhuma tarefa cadastrada.',
    noResults: 'Nenhuma tarefa encontrada.',
    noResultsFor: (term) => `Nenhuma tarefa encontrada para "${term}".`,
    noResultsHint: 'Tente outro título ou altere os filtros.',
    detailsEyebrow: 'Detalhes da tarefa',
  },
  details: (item) => [
    { label: 'Título', value: item.name },
    { label: 'Status', value: item.address.city },
    { label: 'Usuário', value: item.company.name },
    { label: 'ID', value: String(item.id) },
  ],
}
