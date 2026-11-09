import { render, screen, within } from '@testing-library/react'
import { usersFixture } from '../fixtures/users'
import { UserList } from '../../components/UserList'

describe('UserList', () => {
  it('shows the name and email of each user', () => {
    render(<UserList users={usersFixture} onSelect={() => {}} />)

    for (const user of usersFixture) {
      const item = screen.getByText(user.name).closest('li')
      expect(item).not.toBeNull()
      expect(within(item as HTMLElement).getByText(user.email)).toBeInTheDocument()
    }
  })

  it('shows one item per user (10 users → 10 items)', () => {
    render(<UserList users={usersFixture} onSelect={() => {}} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(10)
  })

  it('does not show other user data in the list', () => {
    render(<UserList users={usersFixture} onSelect={() => {}} />)

    expect(screen.queryByText(usersFixture[0].phone)).not.toBeInTheDocument()
    expect(screen.queryByText(usersFixture[0].address.city)).not.toBeInTheDocument()
  })
})
