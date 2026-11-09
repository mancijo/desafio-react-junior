import { usersFixture } from '../fixtures/users'
import { sortUsersByName } from '../../utils/sort'

const ascending = [
  'Ana Júlia Souza',
  'Clementine Bauch',
  'Mrs. Dennis Schulist',
  'Eduardo Lima',
  'Érica Gonçalves',
  'Ervin Howell',
  'Glenna Reichert',
  'José Araújo',
  'Leanne Graham',
  'Nicholas Runolfsdottir V',
]

describe('sortUsersByName', () => {
  it('A–Z: ordem alfabética crescente pelo nome', () => {
    expect(sortUsersByName(usersFixture, 'asc').map((u) => u.name)).toEqual(ascending)
  })

  it('Z–A: ordem decrescente', () => {
    expect(sortUsersByName(usersFixture, 'desc').map((u) => u.name)).toEqual(
      [...ascending].reverse(),
    )
  })

  it('respeita acentos do português: "Érica" fica entre "Eduardo" e "Ervin", não depois do Z', () => {
    const names = sortUsersByName(usersFixture, 'asc').map((u) => u.name)

    expect(names.indexOf('Eduardo Lima')).toBeLessThan(names.indexOf('Érica Gonçalves'))
    expect(names.indexOf('Érica Gonçalves')).toBeLessThan(names.indexOf('Ervin Howell'))
  })

  it('ignora títulos só para ordenar: "Mrs. Dennis Schulist" fica na letra D e mantém o nome completo', () => {
    const names = sortUsersByName(usersFixture, 'asc').map((u) => u.name)

    expect(names.indexOf('Mrs. Dennis Schulist')).toBe(names.indexOf('Clementine Bauch') + 1)
    expect(names).toContain('Mrs. Dennis Schulist')
  })

  it('ignora os títulos Mr., Mrs., Ms., Miss e Dr.', () => {
    const titled = ['Dr. Zeca', 'Miss Bia', 'Mr. Caio', 'Ms. Ana', 'Mrs. Davi'].map((name, id) => ({
      ...usersFixture[0],
      id,
      name,
    }))

    expect(sortUsersByName(titled, 'asc').map((u) => u.name)).toEqual([
      'Ms. Ana',
      'Miss Bia',
      'Mr. Caio',
      'Mrs. Davi',
      'Dr. Zeca',
    ])
  })

  it('não altera a lista original', () => {
    const copy = [...usersFixture]
    sortUsersByName(usersFixture, 'desc')

    expect(usersFixture).toEqual(copy)
  })
})
