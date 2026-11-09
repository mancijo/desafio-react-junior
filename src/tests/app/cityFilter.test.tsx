import { render, screen, within } from '@testing-library/react'
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

const listedNames = () =>
  screen
    .getAllByRole('listitem')
    .map((item) => within(item).getByRole('button').querySelector('span')?.textContent)

describe('App — city filter (US06)', () => {
  it('lists the cities from the data, without duplicates, after "Todas as cidades"', async () => {
    await renderLoaded()
    const select = screen.getByLabelText('Cidade')
    const options = within(select)
      .getAllByRole('option')
      .map((o) => o.textContent)

    expect(options[0]).toBe('Todas as cidades')
    expect(options.slice(1)).toHaveLength(9)
    expect(options.filter((o) => o === 'São Paulo')).toHaveLength(1)
  })

  it('choosing a city shows only its users', async () => {
    const user = await renderLoaded()

    await user.selectOptions(screen.getByLabelText('Cidade'), 'São Paulo')

    expect(listedNames()).toHaveLength(2)
    expect(listedNames()).toEqual(expect.arrayContaining(['José Araújo', 'Érica Gonçalves']))
  })

  it('"Todas as cidades" removes the filter', async () => {
    const user = await renderLoaded()
    const select = screen.getByLabelText('Cidade')

    await user.selectOptions(select, 'São Paulo')
    await user.selectOptions(select, 'Todas as cidades')

    expect(screen.getAllByRole('listitem')).toHaveLength(usersFixture.length)
  })

  it('works together with the name search', async () => {
    const user = await renderLoaded()

    await user.selectOptions(screen.getByLabelText('Cidade'), 'São Paulo')
    await user.type(screen.getByLabelText('Buscar por nome'), 'jose')

    expect(listedNames()).toEqual(['José Araújo'])
  })
})
