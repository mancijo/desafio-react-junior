import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { mockFetchSuccess } from '../mocks/fetchMock'
import { usersFixture } from '../fixtures/users'
import { mockMatchMedia } from '../mocks/matchMedia'

const isDark = () => document.documentElement.classList.contains('dark')

function renderApp() {
  mockFetchSuccess(usersFixture)
  return render(<App />)
}

describe('App — modo claro e escuro (US13)', () => {
  it('na primeira visita, segue o sistema: preferência escura → modo escuro', () => {
    mockMatchMedia(true)
    renderApp()

    expect(isDark()).toBe(true)
  })

  it('na primeira visita, segue o sistema: preferência clara → modo claro', () => {
    mockMatchMedia(false)
    renderApp()

    expect(isDark()).toBe(false)
  })

  it('o botão alterna entre claro e escuro', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: 'Ativar modo escuro' }))
    expect(isDark()).toBe(true)

    await user.click(screen.getByRole('button', { name: 'Ativar modo claro' }))
    expect(isDark()).toBe(false)
  })

  it('o rótulo do botão indica a ação', async () => {
    mockMatchMedia(true)
    renderApp()

    expect(screen.getByRole('button', { name: 'Ativar modo claro' })).toBeInTheDocument()
  })

  it('a escolha fica salva e prevalece sobre o sistema na próxima visita', async () => {
    const user = userEvent.setup()
    mockMatchMedia(false)
    const { unmount } = renderApp()

    await user.click(screen.getByRole('button', { name: 'Ativar modo escuro' }))
    unmount()
    document.documentElement.classList.remove('dark')

    // nova visita, com o sistema ainda em modo claro
    renderApp()

    expect(isDark()).toBe(true)
  })

  it('sem escolha salva, acompanha a mudança do sistema com a página aberta', () => {
    const system = mockMatchMedia(false)
    renderApp()

    act(() => system.change(true))
    expect(isDark()).toBe(true)

    act(() => system.change(false))
    expect(isDark()).toBe(false)
  })

  it('com escolha salva, ignora a mudança do sistema', async () => {
    const user = userEvent.setup()
    const system = mockMatchMedia(false)
    renderApp()

    await user.click(screen.getByRole('button', { name: 'Ativar modo escuro' }))
    act(() => system.change(false))

    expect(isDark()).toBe(true)
  })

  it('sem localStorage disponível, segue o sistema e o botão continua funcionando', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('indisponível')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('indisponível')
    })
    const user = userEvent.setup()
    mockMatchMedia(true)
    renderApp()

    expect(isDark()).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Ativar modo claro' }))
    expect(isDark()).toBe(false)
  })
})
