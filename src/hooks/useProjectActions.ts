import { useState, useCallback, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { deleteProject, toggleFavorite } from '../services/api'
import type { Project } from '../types/project'

interface DeleteModalState {
    isOpen: boolean
    project: Project | null
}

interface UseProjectActionsOptions {
    projects: Project[]
    queryKeysToInvalidate: string[][]
}

export function useProjectActions({ projects, queryKeysToInvalidate }: UseProjectActionsOptions) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const togglingFavoriteId = useRef<string | null>(null)

    const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
        isOpen: false,
        project: null,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryKeysToInvalidate.forEach(key => {
                queryClient.invalidateQueries({ queryKey: key })
            })
            setDeleteModalState({ isOpen: false, project: null })
        },
    })

    const favoriteMutation = useMutation({
        mutationFn: ({ id, favorite }: { id: string; favorite: boolean }) =>
            toggleFavorite(id, favorite),
        onSuccess: () => {
            queryKeysToInvalidate.forEach(key => {
                queryClient.invalidateQueries({ queryKey: key })
            })
        },
        onSettled: () => {
            togglingFavoriteId.current = null
        },
    })

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

    const handleEdit = (id: string) => {
        navigate(`/projects/${id}/edit`)
    }

    const handleOpenDeleteModal = (id: string) => {
        const project = projects.find(p => p.id === id)
        if (project) {
            setDeleteModalState({ isOpen: true, project })
        }
    }

    const handleCloseDeleteModal = () => {
        setDeleteModalState({ isOpen: false, project: null })
    }

    const handleConfirmDelete = () => {
        if (deleteModalState.project) {
            deleteMutation.mutate(deleteModalState.project.id)
        }
    }

    return {
        deleteModalState,
        isDeleting: deleteMutation.isPending,
        isTogglingFavorite,
        handleToggleFavorite,
        handleEdit,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
    }
}
