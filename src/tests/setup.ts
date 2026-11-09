import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { mockMatchMedia } from './mocks/matchMedia'

// jsdom does not implement window.matchMedia (used by the theme preference).
// Default: system in light mode. Tests can change it with mockMatchMedia().
mockMatchMedia(false)

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  mockMatchMedia(false)
})
