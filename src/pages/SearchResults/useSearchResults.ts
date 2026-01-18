import { useCallback, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { searchProjects, deleteProject, toggleFavorite } from '../../services/api'
import type { Project } from '../../types/project'

export function useSearchResults() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const togglingFavoriteId = useRef<string | null>(null)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['search', query],
        queryFn: () => searchProjects(query),
        enabled: query.length >= 3,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['search', query] })
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
    })

    const favoriteMutation = useMutation({
        mutationFn: ({ id, favorite }: { id: string; favorite: boolean }) =>
            toggleFavorite(id, favorite),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['search', query] })
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
        onSettled: () => {
            togglingFavoriteId.current = null
        },
    })

    const projects = data?.projects || []
    const total = data?.total || 0

    const handleToggleFavorite = useCallback((id: string) => {
        const project = projects.find((p: Project) => p.id === id)
        if (project) {
            togglingFavoriteId.current = id
            favoriteMutation.mutate({ id, favorite: !project.favorite })
        }
    }, [projects, favoriteMutation])

    const isTogglingFavorite = useCallback((id: string) => {
        return togglingFavoriteId.current === id && favoriteMutation.isPending
    }, [favoriteMutation.isPending])

    const handleEdit = useCallback((id: string) => {
        navigate(`/projects/${id}/edit`)
    }, [navigate])

    const handleDelete = useCallback((id: string) => {
        deleteMutation.mutate(id)
    }, [deleteMutation])

    const handleBack = useCallback(() => {
        navigate('/')
    }, [navigate])

    return {
        query,
        projects,
        total,
        isLoading,
        isError,
        isDeleting: deleteMutation.isPending,
        isTogglingFavorite,
        handleToggleFavorite,
        handleEdit,
        handleDelete,
        handleBack,
    }
}
