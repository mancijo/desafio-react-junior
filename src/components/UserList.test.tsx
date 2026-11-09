import { render, screen, within } from '@testing-library/react'
import { usersFixture } from '../test/fixtures/users'
import { UserList } from './UserList'

describe('UserList', () => {
  it('exibe o nome e o email de cada usuário', () => {
    render(<UserList users={usersFixture} onSelect={() => {}} />)

    for (const user of usersFixture) {
      const item = screen.getByText(user.name).closest('li')
      expect(item).not.toBeNull()
      expect(within(item as HTMLElement).getByText(user.email)).toBeInTheDocument()
    }
  })

  it('exibe um item para cada usuário (10 usuários → 10 itens)', () => {
    render(<UserList users={usersFixture} onSelect={() => {}} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(10)
  })

  it('não exibe outros dados do usuário na lista', () => {
    render(<UserList users={usersFixture} onSelect={() => {}} />)

    expect(screen.queryByText(usersFixture[0].phone)).not.toBeInTheDocument()
    expect(screen.queryByText(usersFixture[0].address.city)).not.toBeInTheDocument()
  })
})
