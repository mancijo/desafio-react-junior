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
  it('A–Z: ascending alphabetical order by name', () => {
    expect(sortUsersByName(usersFixture, 'asc').map((u) => u.name)).toEqual(ascending)
  })

  it('Z–A: descending order', () => {
    expect(sortUsersByName(usersFixture, 'desc').map((u) => u.name)).toEqual(
      [...ascending].reverse(),
    )
  })

  it('respects Portuguese accents: "Érica" sits between "Eduardo" and "Ervin", not after Z', () => {
    const names = sortUsersByName(usersFixture, 'asc').map((u) => u.name)

    expect(names.indexOf('Eduardo Lima')).toBeLessThan(names.indexOf('Érica Gonçalves'))
    expect(names.indexOf('Érica Gonçalves')).toBeLessThan(names.indexOf('Ervin Howell'))
  })

  it('ignores titles only when sorting: "Mrs. Dennis Schulist" goes under D and keeps the full name', () => {
    const names = sortUsersByName(usersFixture, 'asc').map((u) => u.name)

    expect(names.indexOf('Mrs. Dennis Schulist')).toBe(names.indexOf('Clementine Bauch') + 1)
    expect(names).toContain('Mrs. Dennis Schulist')
  })

  it('ignores the titles Mr., Mrs., Ms., Miss and Dr.', () => {
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

  it('does not change the original list', () => {
    const copy = [...usersFixture]
    sortUsersByName(usersFixture, 'desc')

    expect(usersFixture).toEqual(copy)
  })
})
