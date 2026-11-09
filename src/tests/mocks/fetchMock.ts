import { vi, type Mock } from 'vitest'

type FetchMock = Mock<typeof fetch>

function install(implementation: typeof fetch): FetchMock {
  const mock = vi.fn(implementation)
  vi.stubGlobal('fetch', mock)
  return mock
}

/** `fetch` que responde 200 com o JSON informado. */
export function mockFetchSuccess(data: unknown): FetchMock {
  return install(async () => new Response(JSON.stringify(data), { status: 200 }))
}

/** `fetch` que responde com um status HTTP de erro. */
export function mockFetchHttpError(status = 500): FetchMock {
  return install(async () => new Response('erro', { status }))
}

/** `fetch` que falha por erro de rede. */
export function mockFetchNetworkError(): FetchMock {
  return install(async () => {
    throw new TypeError('Failed to fetch')
  })
}

/**
 * `fetch` que só termina quando `resolve` é chamado.
 * Respeita o AbortSignal: rejeita com AbortError se a requisição for cancelada.
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
