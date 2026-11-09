import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { mockMatchMedia } from './matchMedia'

// O jsdom não implementa window.matchMedia (usado pela preferência de tema).
// Padrão: sistema em modo claro. Os testes podem trocar com mockMatchMedia().
mockMatchMedia(false)

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  mockMatchMedia(false)
})
