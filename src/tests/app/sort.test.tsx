import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'
import { ptBRCollator } from '../../utils/collator'

async function renderLoaded() {
  mockFetchSuccess(usersFixture)
  const user = userEvent.setup()
  render(<App />)
  await screen.findByText('Leanne Graham')
  return user
}

const listedNames = () =>
  screen
    .getAllByRole('listitem')
    .map((item) => within(item).getByRole('button').querySelector('span')?.textContent ?? '')

const sortKey = (name: string) => name.replace(/^(mrs|mr|ms|miss|dr)\.?\s+/i, '')
const isSorted = (names: string[], order: 'asc' | 'desc') =>
  names.every((name, i) => {
    if (i === 0) return true
    const cmp = ptBRCollator.compare(sortKey(names[i - 1]), sortKey(name))
    return order === 'asc' ? cmp <= 0 : cmp >= 0
  })

describe('App — ordenação por nome (US08)', () => {
  it('ao carregar, a lista está em ordem A–Z (e não na ordem da API)', async () => {
    await renderLoaded()

    expect(listedNames()[0]).toBe('Ana Júlia Souza')
    expect(isSorted(listedNames(), 'asc')).toBe(true)
  })

  it('o seletor de ordenação tem apenas A–Z e Z–A, com A–Z selecionado', async () => {
    await renderLoaded()
    const select = screen.getByLabelText('Ordenar por nome')

    expect(
      within(select)
        .getAllByRole('option')
        .map((o) => o.textContent),
    ).toEqual(['A–Z', 'Z–A'])
    expect(select).toHaveDisplayValue('A–Z')
  })

  it('ao escolher Z–A, a lista fica em ordem decrescente', async () => {
    const user = await renderLoaded()

    await user.selectOptions(screen.getByLabelText('Ordenar por nome'), 'Z–A')

    expect(listedNames()[0]).toBe('Nicholas Runolfsdottir V')
    expect(isSorted(listedNames(), 'desc')).toBe(true)
  })

  it('ordena o resultado dos filtros', async () => {
    const user = await renderLoaded()

    // A API devolve José antes de Érica
    await user.selectOptions(screen.getByLabelText('Cidade'), 'São Paulo')

    expect(listedNames()).toEqual(['Érica Gonçalves', 'José Araújo'])
  })

  it('com busca ativa, a ordenação por nome prevalece', async () => {
    const user = await renderLoaded()

    await user.type(screen.getByLabelText('Buscar por nome'), 'e')
    expect(isSorted(listedNames(), 'asc')).toBe(true)

    await user.selectOptions(screen.getByLabelText('Ordenar por nome'), 'Z–A')
    expect(isSorted(listedNames(), 'desc')).toBe(true)
  })
})
