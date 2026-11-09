import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { mockFetchSuccess } from './test/fetchMock'
import { usersFixture } from './test/fixtures/users'

async function openLeanne() {
  mockFetchSuccess(usersFixture)
  const user = userEvent.setup()
  render(<App />)
  const card = await screen.findByRole('button', { name: /Leanne Graham/ })
  await user.click(card)
  return { user, card, dialog: screen.getByRole('dialog') }
}

describe('App — modal pelo teclado (US10)', () => {
  it('Esc fecha o modal', async () => {
    const { user } = await openLeanne()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('clicar no fundo fecha o modal', async () => {
    const { user } = await openLeanne()

    await user.click(screen.getByTestId('modal-backdrop'))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('clicar dentro do modal não o fecha', async () => {
    const { user, dialog } = await openLeanne()

    await user.click(dialog)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('ao abrir, o foco vai para dentro do modal', async () => {
    const { dialog } = await openLeanne()

    expect(dialog).toContainElement(document.activeElement as HTMLElement)
  })

  it('enquanto aberto, Tab e Shift+Tab não saem do modal', async () => {
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

  it('ao fechar pelo botão, o foco volta para o usuário que abriu o modal', async () => {
    const { user, card } = await openLeanne()

    await user.click(screen.getByRole('button', { name: 'Fechar detalhes' }))

    expect(card).toHaveFocus()
  })

  it('ao fechar com Esc, o foco volta para o usuário que abriu o modal', async () => {
    const { user, card } = await openLeanne()

    await user.keyboard('{Escape}')

    expect(card).toHaveFocus()
  })
})
