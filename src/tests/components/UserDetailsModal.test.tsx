import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fixtureUser } from '../fixtures/users'
import { UserDetailsModal } from '../../components/UserDetailsModal'

const user = fixtureUser('José Araújo')

const fieldLabels = () => screen.getAllByRole('term').map((term) => term.textContent)

function field(label: string) {
  const term = screen.getByText(label, { selector: 'dt' })
  return term.nextElementSibling?.textContent
}

describe('UserDetailsModal', () => {
  it('is a modal dialog labelled by the user name', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)

    const dialog = screen.getByRole('dialog', { name: 'José Araújo' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('shows only full name, email, phone, company and city, in this order', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)

    expect(fieldLabels()).toEqual(['Nome completo', 'Email', 'Telefone', 'Empresa', 'Cidade'])
  })

  it('shows the values of the required fields', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)

    expect(field('Nome completo')).toBe('José Araújo')
    expect(field('Email')).toBe(user.email)
    expect(field('Telefone')).toBe(user.phone)
    expect(field('Empresa')).toBe('Café & Cia')
    expect(field('Cidade')).toBe('São Paulo')
  })

  it('does not show any other user data', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')

    for (const value of [
      user.username,
      user.website,
      user.address.street,
      user.address.suite,
      user.address.zipcode,
      user.company.catchPhrase,
      user.company.bs,
    ]) {
      expect(dialog).not.toHaveTextContent(value)
    }
  })

  it('shows the email as plain text, without links', () => {
    render(<UserDetailsModal user={user} onClose={() => {}} />)

    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })

  it('has an accessible close button that calls onClose', async () => {
    const onClose = vi.fn()
    render(<UserDetailsModal user={user} onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: 'Fechar detalhes' }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
