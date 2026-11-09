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

describe('App — sort by name (US08)', () => {
  it('on load, the list is in A–Z order (not in API order)', async () => {
    await renderLoaded()

    expect(listedNames()[0]).toBe('Ana Júlia Souza')
    expect(isSorted(listedNames(), 'asc')).toBe(true)
  })

  it('the sort select has only A–Z and Z–A, with A–Z selected', async () => {
    await renderLoaded()
    const select = screen.getByLabelText('Ordenar por nome')

    expect(
      within(select)
        .getAllByRole('option')
        .map((o) => o.textContent),
    ).toEqual(['A–Z', 'Z–A'])
    expect(select).toHaveDisplayValue('A–Z')
  })

  it('choosing Z–A sorts the list in descending order', async () => {
    const user = await renderLoaded()

    await user.selectOptions(screen.getByLabelText('Ordenar por nome'), 'Z–A')

    expect(listedNames()[0]).toBe('Nicholas Runolfsdottir V')
    expect(isSorted(listedNames(), 'desc')).toBe(true)
  })

  it('sorts the filtered result', async () => {
    const user = await renderLoaded()

    // The API returns José before Érica
    await user.selectOptions(screen.getByLabelText('Cidade'), 'São Paulo')

    expect(listedNames()).toEqual(['Érica Gonçalves', 'José Araújo'])
  })

  it('with an active search, sorting by name prevails', async () => {
    const user = await renderLoaded()

    await user.type(screen.getByLabelText('Buscar por nome'), 'e')
    expect(isSorted(listedNames(), 'asc')).toBe(true)

    await user.selectOptions(screen.getByLabelText('Ordenar por nome'), 'Z–A')
    expect(isSorted(listedNames(), 'desc')).toBe(true)
  })
})
