import { usersFixture } from '../fixtures/users'
import { filterUsers, getCityOptions, getCompanyOptions } from '../../utils/filters'

describe('getCityOptions', () => {
  it('extracts cities from the data, without duplicates and in pt-BR alphabetical order', () => {
    expect(getCityOptions(usersFixture)).toEqual([
      'Aliyaview',
      'Bartholomebury',
      'Belo Horizonte',
      'Curitiba',
      'Gwenborough',
      'McKenziehaven',
      'São Paulo',
      'South Christy',
      'Wisokyburgh',
    ])
  })
})

describe('filterUsers — city', () => {
  it('keeps only the users of the chosen city', () => {
    const result = filterUsers(usersFixture, { city: 'São Paulo', company: '' })

    expect(result.map((u) => u.name)).toEqual(['José Araújo', 'Érica Gonçalves'])
  })

  it('without a chosen city (""), does not filter', () => {
    expect(filterUsers(usersFixture, { city: '', company: '' })).toEqual(usersFixture)
  })
})

describe('getCompanyOptions', () => {
  it('extracts companies from the data, without duplicates and in pt-BR alphabetical order', () => {
    expect(getCompanyOptions(usersFixture)).toEqual([
      'Abernathy Group',
      'Açaí Tech',
      'Café & Cia',
      'Considine-Lockman',
      'Deckow-Crist',
      'Romaguera-Crona',
      'Romaguera-Jacobson',
      'Yost and Sons',
    ])
  })
})

describe('filterUsers — company', () => {
  it('keeps only the users of the chosen company', () => {
    const result = filterUsers(usersFixture, { city: '', company: 'Café & Cia' })

    expect(result.map((u) => u.name)).toEqual(['José Araújo', 'Ana Júlia Souza'])
  })

  it('combines city and company', () => {
    const result = filterUsers(usersFixture, { city: 'São Paulo', company: 'Açaí Tech' })

    expect(result.map((u) => u.name)).toEqual(['Érica Gonçalves'])
  })

  it('a combination without users results in an empty list', () => {
    expect(filterUsers(usersFixture, { city: 'Curitiba', company: 'Açaí Tech' })).toEqual([])
  })
})
