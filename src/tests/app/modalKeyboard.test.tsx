import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'

async function openLeanne() {
  mockFetchSuccess(usersFixture)
  const user = userEvent.setup()
  render(<App />)
  const card = await screen.findByRole('button', { name: /Leanne Graham/ })
  await user.click(card)
  return { user, card, dialog: screen.getByRole('dialog') }
}

describe('App — modal with the keyboard (US10)', () => {
  it('Esc closes the modal', async () => {
    const { user } = await openLeanne()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('clicking the backdrop closes the modal', async () => {
    const { user } = await openLeanne()

    await user.click(screen.getByTestId('modal-backdrop'))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('clicking inside the modal does not close it', async () => {
    const { user, dialog } = await openLeanne()

    await user.click(dialog)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('on open, focus moves inside the modal', async () => {
    const { dialog } = await openLeanne()

    expect(dialog).toContainElement(document.activeElement as HTMLElement)
  })

  it('while open, Tab and Shift+Tab do not leave the modal', async () => {
    const { user, dialog } = await openLeanne()

    for (let i = 0; i < 4; i++) {
      await user.tab()
      expect(dialog).toContainElement(document.activeElement as HTMLElement)
    }
    for (let i = 0; i < 4; i++) {
      await user.tab({ shift: true })
      expect(dialog).toContainElement(document.activeElement as HTMLElement)
    }
  })

  it('closing with the button returns focus to the user that opened the modal', async () => {
    const { user, card } = await openLeanne()

    await user.click(screen.getByRole('button', { name: 'Fechar detalhes' }))

    expect(card).toHaveFocus()
  })

  it('closing with Esc returns focus to the user that opened the modal', async () => {
    const { user, card } = await openLeanne()

    await user.keyboard('{Escape}')

    expect(card).toHaveFocus()
  })
})
