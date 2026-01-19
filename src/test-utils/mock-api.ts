import { vi, type Mock } from 'vitest'


export interface MockFetchOptions {
  ok?: boolean
  status?: number
  data?: unknown
  delay?: number
  error?: Error
}

export function mockFetch(options: MockFetchOptions = {}) {
  const {
    ok = true,
    status = 200,
    data = {},
    delay = 0,
    error,
  } = options

  return vi.fn(
    (): Promise<Response> =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (error) {
            reject(error)
            return
          }

          resolve({
            ok,
            status,
            json: async () => data,
            text: async () => JSON.stringify(data),
          } as Response)
        }, delay)
      })
  )
}

export function resetFetchMock() {
  if (globalThis.fetch && vi.isMockFunction(globalThis.fetch)) {
    ; (globalThis.fetch as Mock).mockClear()
  }
}

export function setupFetchMock() {
  globalThis.fetch = vi.fn()
}
