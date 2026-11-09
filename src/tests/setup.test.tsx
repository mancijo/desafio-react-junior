import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMatchMedia } from './mocks/matchMedia'

describe('test environment', () => {
  it('mocks window.matchMedia with the system in light mode by default', () => {
    expect(window.matchMedia('(prefers-color-scheme: dark)').matches).toBe(false)
  })

  it('allows simulating a change in the system preference', () => {
    const controller = mockMatchMedia(false)
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = vi.fn()
    mql.addEventListener('change', listener)

    controller.change(true)

    expect(mql.matches).toBe(true)
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ matches: true }))
  })

  it('provides user-event to simulate typing', async () => {
    const user = userEvent.setup()
    render(<input aria-label="Field" />)

    await user.type(screen.getByLabelText('Field'), 'olá')

    expect(screen.getByLabelText('Field')).toHaveValue('olá')
  })
})
