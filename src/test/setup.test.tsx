import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMatchMedia } from './matchMedia'

describe('ambiente de testes', () => {
  it('simula window.matchMedia com o sistema em modo claro por padrão', () => {
    expect(window.matchMedia('(prefers-color-scheme: dark)').matches).toBe(false)
  })

  it('permite simular a troca da preferência do sistema', () => {
    const controller = mockMatchMedia(false)
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = vi.fn()
    mql.addEventListener('change', listener)

    controller.change(true)

    expect(mql.matches).toBe(true)
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ matches: true }))
  })

  it('disponibiliza o user-event para simular digitação', async () => {
    const user = userEvent.setup()
    render(<input aria-label="Campo" />)

    await user.type(screen.getByLabelText('Campo'), 'olá')

    expect(screen.getByLabelText('Campo')).toHaveValue('olá')
  })
})
