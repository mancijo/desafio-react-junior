import { usersFixture } from '../fixtures/users'
import { filterUsers, getCityOptions, getCompanyOptions } from '../../utils/filters'

describe('getCityOptions', () => {
  it('extrai as cidades dos dados, sem repetições e em ordem alfabética pt-BR', () => {
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

describe('filterUsers — cidade', () => {
  it('mantém apenas os usuários da cidade escolhida', () => {
    const result = filterUsers(usersFixture, { city: 'São Paulo', company: '' })

    expect(result.map((u) => u.name)).toEqual(['José Araújo', 'Érica Gonçalves'])
  })

  it('sem cidade escolhida (""), não filtra', () => {
    expect(filterUsers(usersFixture, { city: '', company: '' })).toEqual(usersFixture)
  })
})

describe('getCompanyOptions', () => {
  it('extrai as empresas dos dados, sem repetições e em ordem alfabética pt-BR', () => {
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

describe('filterUsers — empresa', () => {
  it('mantém apenas os usuários da empresa escolhida', () => {
    const result = filterUsers(usersFixture, { city: '', company: 'Café & Cia' })

    expect(result.map((u) => u.name)).toEqual(['José Araújo', 'Ana Júlia Souza'])
  })

  it('combina cidade e empresa', () => {
    const result = filterUsers(usersFixture, { city: 'São Paulo', company: 'Açaí Tech' })

    expect(result.map((u) => u.name)).toEqual(['Érica Gonçalves'])
  })

  it('combinação sem usuários resulta em lista vazia', () => {
    expect(filterUsers(usersFixture, { city: 'Curitiba', company: 'Açaí Tech' })).toEqual([])
  })
})
