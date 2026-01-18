import { useState, useCallback, useMemo, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getProjects, deleteProject, toggleFavorite } from '../../services/api'
import type { Project, SortOption } from '../../types/project'

export function useProjects() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [sortOption, setSortOption] = useState<SortOption>('alphabetical')
    const [deleteModalState, setDeleteModalState] = useState<{
        isOpen: boolean
        project: Project | null
    }>({ isOpen: false, project: null })
    const togglingFavoriteId = useRef<string | null>(null)

    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ['projects', { sort: sortOption, favorite: showFavoritesOnly || undefined }],
        queryFn: () => getProjects({ sort: sortOption, favorite: showFavoritesOnly || undefined }),
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            setDeleteModalState({ isOpen: false, project: null })
        },
    })

    const favoriteMutation = useMutation({
        mutationFn: ({ id, favorite }: { id: string; favorite: boolean }) =>
            toggleFavorite(id, favorite),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
        onSettled: () => {
            togglingFavoriteId.current = null
        },
    })

    const projects = useMemo((): Project[] => data?.projects || [], [data])
    const totalProjects = data?.total || 0

    const handleToggleFavorite = useCallback((id: string) => {
        const project = projects.find(p => p.id === id)
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

    const handleOpenDeleteModal = useCallback((id: string) => {
        const project = projects.find(p => p.id === id)
        if (project) {
            setDeleteModalState({ isOpen: true, project })
        }
    }, [projects])

    const handleCloseDeleteModal = useCallback(() => {
        setDeleteModalState({ isOpen: false, project: null })
    }, [])

    const handleConfirmDelete = useCallback(() => {
        if (deleteModalState.project) {
            deleteMutation.mutate(deleteModalState.project.id)
        }
    }, [deleteModalState.project, deleteMutation])

    const handleCreateProject = useCallback(() => {
        navigate('/projects/new')
    }, [navigate])

    const handleToggleFavoritesFilter = useCallback(() => {
        setShowFavoritesOnly(prev => !prev)
    }, [])

    const handleSortChange = useCallback((option: SortOption) => {
        setSortOption(option)
    }, [])

    return {
        projects,
        totalProjects,
        isLoading,
        isFetching,
        isError,
        showFavoritesOnly,
        sortOption,
        deleteModalState,
        isDeleting: deleteMutation.isPending,
        isTogglingFavorite,
        handleToggleFavorite,
        handleEdit,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
        handleCreateProject,
        handleToggleFavoritesFilter,
        handleSortChange,
    }
}
