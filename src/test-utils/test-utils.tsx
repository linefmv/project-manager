import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'
import { ReactNode } from 'react'
import { vi } from 'vitest'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

interface TestWrapperProps {
  children: ReactNode
  initialEntries?: MemoryRouterProps['initialEntries']
  queryClient?: QueryClient
}

export function TestWrapper({
  children,
  initialEntries = ['/'],
  queryClient = createTestQueryClient(),
}: TestWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

export const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
}
