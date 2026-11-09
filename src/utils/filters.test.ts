import { usersFixture } from '../test/fixtures/users'
import { filterUsers, getCityOptions } from './filters'

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
