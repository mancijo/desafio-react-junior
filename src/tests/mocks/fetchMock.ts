import { vi, type Mock } from 'vitest'

type FetchMock = Mock<typeof fetch>

function install(implementation: typeof fetch): FetchMock {
  const mock = vi.fn(implementation)
  vi.stubGlobal('fetch', mock)
  return mock
}

/** `fetch` that responds 200 with the given JSON. */
export function mockFetchSuccess(data: unknown): FetchMock {
  return install(async () => new Response(JSON.stringify(data), { status: 200 }))
}

/** `fetch` that responds with an HTTP error status. */
export function mockFetchHttpError(status = 500): FetchMock {
  return install(async () => new Response('error', { status }))
}

/** `fetch` that fails with a network error. */
export function mockFetchNetworkError(): FetchMock {
  return install(async () => {
    throw new TypeError('Failed to fetch')
  })
}

/** `fetch` that responds 200 with the JSON registered for each URL (404 for any other URL). */
export function mockFetchByUrl(responses: Record<string, unknown>): FetchMock {
  return install(async (input) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
    return url in responses
      ? new Response(JSON.stringify(responses[url]), { status: 200 })
      : new Response('not found', { status: 404 })
  })
}

/**
 * `fetch` that only finishes when `resolve` is called.
 * Honors the AbortSignal: rejects with AbortError if the request is aborted.
 */
export function mockFetchPending(): { fetch: FetchMock; resolve: (data: unknown) => void } {
  let resolveResponse: (response: Response) => void = () => {}
  const fetchMock = install(
    (_input, init) =>
      new Promise<Response>((resolve, reject) => {
        resolveResponse = resolve
        init?.signal?.addEventListener('abort', () =>
          reject(new DOMException('The operation was aborted.', 'AbortError')),
        )
      }),
  )
  return {
    fetch: fetchMock,
    resolve: (data) => resolveResponse(new Response(JSON.stringify(data), { status: 200 })),
  }
}
