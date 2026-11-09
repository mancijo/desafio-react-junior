import { render, screen, within } from '@testing-library/react'
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

const optionsOf = (label: string) =>
  within(screen.getByLabelText(label))
    .getAllByRole('option')
    .map((o) => o.textContent)

const listedNames = () =>
  screen
    .getAllByRole('listitem')
    .map((item) => within(item).getByRole('button').querySelector('span')?.textContent)

describe('App — filtro por empresa (US07)', () => {
  it('lista as empresas dos dados, sem repetições, depois de "Todas as empresas"', async () => {
    await renderLoaded()
    const options = optionsOf('Empresa')

    expect(options[0]).toBe('Todas as empresas')
    expect(options.slice(1)).toHaveLength(8)
    expect(options.filter((o) => o === 'Café & Cia')).toHaveLength(1)
  })

  it('ao escolher uma empresa, exibe apenas os usuários dela', async () => {
    const user = await renderLoaded()

    await user.selectOptions(screen.getByLabelText('Empresa'), 'Café & Cia')

    expect(listedNames()).toHaveLength(2)
    expect(listedNames()).toEqual(expect.arrayContaining(['José Araújo', 'Ana Júlia Souza']))
  })

  it('"Todas as empresas" remove o filtro', async () => {
    const user = await renderLoaded()
    const select = screen.getByLabelText('Empresa')

    await user.selectOptions(select, 'Café & Cia')
    await user.selectOptions(select, 'Todas as empresas')

    expect(screen.getAllByRole('listitem')).toHaveLength(usersFixture.length)
  })

  it('funciona em conjunto com a busca e o filtro de cidade', async () => {
    const user = await renderLoaded()

    await user.selectOptions(screen.getByLabelText('Cidade'), 'São Paulo')
    await user.selectOptions(screen.getByLabelText('Empresa'), 'Açaí Tech')
    expect(listedNames()).toEqual(['Érica Gonçalves'])

    await user.type(screen.getByLabelText('Buscar por nome'), 'jose')
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('as listas de cidade e empresa são independentes: mostram sempre todas as opções', async () => {
    const user = await renderLoaded()
    const citiesBefore = optionsOf('Cidade')
    const companiesBefore = optionsOf('Empresa')

    await user.selectOptions(screen.getByLabelText('Empresa'), 'Café & Cia')
    expect(optionsOf('Cidade')).toEqual(citiesBefore)

    await user.selectOptions(screen.getByLabelText('Cidade'), 'Curitiba')
    expect(optionsOf('Empresa')).toEqual(companiesBefore)
  })
})
