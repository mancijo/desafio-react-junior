import { usersFixture } from '../fixtures/users'
import { searchUsersByName } from '../../utils/search'

const names = (term: string) => searchUsersByName(usersFixture, term).map((u) => u.name)

describe('searchUsersByName', () => {
  it('ignores case: "leanne" finds "Leanne Graham"', () => {
    expect(names('leanne')).toContain('Leanne Graham')
    expect(names('LEANNE')).toContain('Leanne Graham')
  })

  it('ignores accents: unaccented terms find accented names', () => {
    expect(names('jose araujo')).toContain('José Araújo')
    expect(names('erica goncalves')).toContain('Érica Gonçalves')
  })

  it('also matches when the term has accents and the name does not', () => {
    expect(names('léanne')).toContain('Leanne Graham')
  })

  it('fuzzy search: "Lenne Grahm" finds "Leanne Graham"', () => {
    expect(names('Lenne Grahm')).toContain('Leanne Graham')
  })

  it('a term unrelated to any name ("xyz") returns no one', () => {
    expect(names('xyz')).toEqual([])
  })

  it('an empty field (or only spaces) returns all users', () => {
    expect(names('')).toHaveLength(usersFixture.length)
    expect(names('   ')).toHaveLength(usersFixture.length)
  })

  it('considers only the name: searching the username "qwzk" returns no one', () => {
    expect(names('qwzk')).toEqual([])
  })

  it('finds any part of the name, such as the last name ("graham")', () => {
    expect(names('graham')).toEqual(['Leanne Graham'])
  })

  it('1–2 letter terms filter by exact substring, without tolerance', () => {
    expect(names('gr')).toEqual(['Leanne Graham'])
    expect(names('gx')).toEqual([])
  })

  it('from 3 letters on, combines exact substring and fuzzy matches', () => {
    // "grahm" is not an exact substring of any name: only the fuzzy search finds it
    expect(names('grahm')).toContain('Leanne Graham')
    // "lima" is an exact substring; the result has no duplicates
    const lima = names('lima')
    expect(lima).toContain('Eduardo Lima')
    expect(new Set(lima).size).toBe(lima.length)
  })

  it('a name containing the substring stays in the list while typing more letters', () => {
    for (const term of ['gr', 'gra', 'grah', 'graha', 'graham']) {
      expect(names(term)).toContain('Leanne Graham')
    }
  })

  it('does not change the original order of users', () => {
    const all = searchUsersByName(usersFixture, '')
    expect(all).toEqual(usersFixture)
  })
})
