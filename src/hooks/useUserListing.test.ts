import { act, renderHook } from '@testing-library/react'
import { usersFixture } from '../test/fixtures/users'
import { useUserListing } from './useUserListing'

const names = (users: { name: string }[]) => users.map((u) => u.name)

describe('useUserListing', () => {
  it('começa sem busca nem filtros, em ordem A–Z', () => {
    const { result } = renderHook(() => useUserListing(usersFixture))

    expect(result.current.searchTerm).toBe('')
    expect(result.current.filters).toEqual({ city: '', company: '' })
    expect(result.current.sortOrder).toBe('asc')
    expect(names(result.current.visibleUsers)[0]).toBe('Ana Júlia Souza')
    expect(result.current.visibleUsers).toHaveLength(usersFixture.length)
  })

  it('monta as opções de cidade e empresa com a opção "todas" primeiro', () => {
    const { result } = renderHook(() => useUserListing(usersFixture))

    expect(result.current.cityOptions[0]).toEqual({ value: '', label: 'Todas as cidades' })
    expect(result.current.companyOptions[0]).toEqual({ value: '', label: 'Todas as empresas' })
    expect(result.current.cityOptions).toHaveLength(10)
    expect(result.current.companyOptions).toHaveLength(9)
  })

  it('aplica busca, filtros e ordenação, nessa ordem', () => {
    const { result } = renderHook(() => useUserListing(usersFixture))

    act(() => result.current.setCity('São Paulo'))
    expect(names(result.current.visibleUsers)).toEqual(['Érica Gonçalves', 'José Araújo'])

    act(() => result.current.setSortOrder('desc'))
    expect(names(result.current.visibleUsers)).toEqual(['José Araújo', 'Érica Gonçalves'])

    act(() => result.current.setSearchTerm('erica'))
    expect(names(result.current.visibleUsers)).toEqual(['Érica Gonçalves'])

    act(() => result.current.setCompany('Café & Cia'))
    expect(result.current.visibleUsers).toEqual([])
  })
})
