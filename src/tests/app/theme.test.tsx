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

describe('App — light and dark mode (US13)', () => {
  it('on the first visit, follows the system: dark preference → dark mode', () => {
    mockMatchMedia(true)
    renderApp()

    expect(isDark()).toBe(true)
  })

  it('on the first visit, follows the system: light preference → light mode', () => {
    mockMatchMedia(false)
    renderApp()

    expect(isDark()).toBe(false)
  })

  it('the button toggles between light and dark', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: 'Ativar modo escuro' }))
    expect(isDark()).toBe(true)

    await user.click(screen.getByRole('button', { name: 'Ativar modo claro' }))
    expect(isDark()).toBe(false)
  })

  it('the button label describes the action', async () => {
    mockMatchMedia(true)
    renderApp()

    expect(screen.getByRole('button', { name: 'Ativar modo claro' })).toBeInTheDocument()
  })

  it('the choice is saved and overrides the system on the next visit', async () => {
    const user = userEvent.setup()
    mockMatchMedia(false)
    const { unmount } = renderApp()

    await user.click(screen.getByRole('button', { name: 'Ativar modo escuro' }))
    unmount()
    document.documentElement.classList.remove('dark')

    // new visit, with the system still in light mode
    renderApp()

    expect(isDark()).toBe(true)
  })

  it('without a saved choice, follows system changes while the page is open', () => {
    const system = mockMatchMedia(false)
    renderApp()

    act(() => system.change(true))
    expect(isDark()).toBe(true)

    act(() => system.change(false))
    expect(isDark()).toBe(false)
  })

  it('with a saved choice, ignores system changes', async () => {
    const user = userEvent.setup()
    const system = mockMatchMedia(false)
    renderApp()

    await user.click(screen.getByRole('button', { name: 'Ativar modo escuro' }))
    act(() => system.change(false))

    expect(isDark()).toBe(true)
  })

  it('without localStorage, follows the system and the button still works', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('unavailable')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('unavailable')
    })
    const user = userEvent.setup()
    mockMatchMedia(true)
    renderApp()

    expect(isDark()).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Ativar modo claro' }))
    expect(isDark()).toBe(false)
  })
})
