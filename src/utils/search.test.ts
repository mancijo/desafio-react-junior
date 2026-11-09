import { usersFixture } from '../test/fixtures/users'
import { searchUsersByName } from './search'

const names = (term: string) => searchUsersByName(usersFixture, term).map((u) => u.name)

describe('searchUsersByName', () => {
  it('ignora maiúsculas/minúsculas: "leanne" encontra "Leanne Graham"', () => {
    expect(names('leanne')).toContain('Leanne Graham')
    expect(names('LEANNE')).toContain('Leanne Graham')
  })

  it('ignora acentos: termos sem acento encontram nomes acentuados', () => {
    expect(names('jose araujo')).toContain('José Araújo')
    expect(names('erica goncalves')).toContain('Érica Gonçalves')
  })

  it('também encontra quando o termo tem acento e o nome não', () => {
    expect(names('léanne')).toContain('Leanne Graham')
  })

  it('busca aproximada: "Lenne Grahm" encontra "Leanne Graham"', () => {
    expect(names('Lenne Grahm')).toContain('Leanne Graham')
  })

  it('termo sem relação com nenhum nome ("xyz") não retorna ninguém', () => {
    expect(names('xyz')).toEqual([])
  })

  it('campo vazio (ou só espaços) retorna todos os usuários', () => {
    expect(names('')).toHaveLength(usersFixture.length)
    expect(names('   ')).toHaveLength(usersFixture.length)
  })

  it('considera apenas o nome: buscar o username "qwzk" não retorna ninguém', () => {
    expect(names('qwzk')).toEqual([])
  })

  it('encontra qualquer parte do nome, como o sobrenome ("graham")', () => {
    expect(names('graham')).toEqual(['Leanne Graham'])
  })

  it('termos de 1–2 letras filtram pelo trecho exato, sem tolerância', () => {
    expect(names('gr')).toEqual(['Leanne Graham'])
    expect(names('gx')).toEqual([])
  })

  it('a partir de 3 letras, junta o trecho exato e as correspondências aproximadas', () => {
    // "grahm" não é trecho exato de nenhum nome: só a busca aproximada encontra
    expect(names('grahm')).toContain('Leanne Graham')
    // "lima" é trecho exato; o resultado não tem repetições
    const lima = names('lima')
    expect(lima).toContain('Eduardo Lima')
    expect(new Set(lima).size).toBe(lima.length)
  })

  it('um nome que contém o trecho continua na lista ao digitar mais letras', () => {
    for (const term of ['gr', 'gra', 'grah', 'graha', 'graham']) {
      expect(names(term)).toContain('Leanne Graham')
    }
  })

  it('não altera a ordem original dos usuários', () => {
    const all = searchUsersByName(usersFixture, '')
    expect(all).toEqual(usersFixture)
  })
})
