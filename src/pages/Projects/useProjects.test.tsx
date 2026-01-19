import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { useProjects } from './useProjects'
import { getProjects } from '../../services/api'
import type { Project } from '../../types/project'

vi.mock('../../services/api')
vi.mock('../../hooks/useProjectActions', () => ({
    useProjectActions: () => ({
        deleteModalState: { isOpen: false, project: null },
        isDeleting: false,
        handleToggleFavorite: vi.fn(),
        handleEdit: vi.fn(),
        handleOpenDeleteModal: vi.fn(),
        handleCloseDeleteModal: vi.fn(),
        handleConfirmDelete: vi.fn(),
    }),
}))

const mockGetProjects = vi.mocked(getProjects)

const createWrapper = (initialEntries = ['/']) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    })

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={initialEntries}>
                {children}
            </MemoryRouter>
        </QueryClientProvider>
    )
}

const mockProject: Project = {
    id: '1',
    name: 'Projeto Teste',
    client: 'Cliente',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    favorite: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
}

describe('useProjects', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('fetches projects successfully', async () => {
        mockGetProjects.mockResolvedValue({ projects: [mockProject], total: 1 })

        const { result } = renderHook(() => useProjects(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.projects).toEqual([mockProject])
        expect(result.current.totalProjects).toBe(1)
        expect(mockGetProjects).toHaveBeenCalledWith({
            sort: 'alphabetical',
            favorite: undefined,
        })
    })

    it('handles loading state', () => {
        mockGetProjects.mockImplementation(() => new Promise(() => {}))

        const { result } = renderHook(() => useProjects(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isLoading).toBe(true)
        expect(result.current.projects).toEqual([])
    })

    it('handles error state', async () => {
        mockGetProjects.mockRejectedValue(new Error('Network error'))

        const { result } = renderHook(() => useProjects(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isError).toBe(true))
    })

    it('filters by favorites from URL', async () => {
        mockGetProjects.mockResolvedValue({ projects: [], total: 0 })

        const { result } = renderHook(() => useProjects(), {
            wrapper: createWrapper(['/?favorito=true']),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.showFavoritesOnly).toBe(true)
        expect(mockGetProjects).toHaveBeenCalledWith({
            sort: 'alphabetical',
            favorite: true,
        })
    })

    it('toggles favorites filter', async () => {
        mockGetProjects.mockResolvedValue({ projects: [mockProject], total: 1 })

        const { result } = renderHook(() => useProjects(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))
        expect(result.current.showFavoritesOnly).toBe(false)

        result.current.handleToggleFavoritesFilter()

        await waitFor(() => expect(result.current.showFavoritesOnly).toBe(true))
    })

    it('uses sort from URL params', async () => {
        mockGetProjects.mockResolvedValue({ projects: [mockProject], total: 1 })

        const { result } = renderHook(() => useProjects(), {
            wrapper: createWrapper(['/?ordenacao=recent']),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.sortOption).toBe('recent')
        expect(mockGetProjects).toHaveBeenCalledWith({
            sort: 'recent',
            favorite: undefined,
        })
    })

    it('changes sort option', async () => {
        mockGetProjects.mockResolvedValue({ projects: [mockProject], total: 1 })

        const { result } = renderHook(() => useProjects(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        result.current.handleSortChange('deadline')

        await waitFor(() => expect(result.current.sortOption).toBe('deadline'))
    })
})
