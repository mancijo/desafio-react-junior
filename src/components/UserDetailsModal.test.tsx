import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fixtureUser } from '../test/fixtures/users'
import { UserDetailsModal } from './UserDetailsModal'

const user = fixtureUser('José Araújo')

function field(label: string) {
  const term = screen.getByText(label, { selector: 'dt' })
  return term.nextElementSibling?.textContent
}

describe('UserDetailsModal', () => {
  it('é um diálogo modal rotulado pelo nome do usuário', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)

    const dialog = screen.getByRole('dialog', { name: 'José Araújo' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('agrupa os dados em Pessoal, Contato, Endereço e Empresa', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')

    for (const group of ['Pessoal', 'Contato', 'Endereço', 'Empresa']) {
      expect(within(dialog).getByRole('heading', { name: group })).toBeInTheDocument()
    }
  })

  it('exibe todos os campos do usuário', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)

    expect(field('Nome completo')).toBe('José Araújo')
    expect(field('Nome de usuário')).toBe(user.username)
    expect(field('Email')).toBe(user.email)
    expect(field('Telefone')).toBe(user.phone)
    expect(field('Website')).toBe(user.website)
    expect(field('Rua')).toBe(user.address.street)
    expect(field('Complemento')).toBe(user.address.suite)
    expect(field('Cidade')).toBe('São Paulo')
    expect(field('CEP')).toBe(user.address.zipcode)
    expect(field('Coordenadas')).toBe(`${user.address.geo.lat}, ${user.address.geo.lng}`)
    expect(field('Empresa')).toBe('Café & Cia')
    expect(field('Slogan')).toBe(user.company.catchPhrase)
    expect(field('Ramo de atuação')).toBe(user.company.bs)
  })

  it('exibe email e website como texto, sem links', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)

    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })

  it('o botão de fechar tem rótulo acessível e chama onClose', async () => {
    const onClose = vi.fn()
    render(<UserDetailsModal user={user} onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: 'Fechar detalhes' }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
