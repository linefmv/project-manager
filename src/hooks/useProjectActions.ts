import { useState, useCallback } from 'react'
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
        onMutate: async ({ id, favorite }) => {
            await queryClient.cancelQueries({ queryKey: ['projects'] })

            const previousProjects = queryClient.getQueriesData({ queryKey: ['projects'] })

            queryClient.setQueriesData({ queryKey: ['projects'] }, (old: { projects: Project[] } | undefined) => {
                if (!old) return old
                return {
                    ...old,
                    projects: old.projects.map(p =>
                        p.id === id ? { ...p, favorite } : p
                    )
                }
            })

            return { previousProjects }
        },
        onError: (_err, _variables, context) => {
            if (context?.previousProjects) {
                context.previousProjects.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data)
                })
            }
        },
        onSettled: () => {
            queryKeysToInvalidate.forEach(key => {
                queryClient.invalidateQueries({ queryKey: key })
            })
        },
    })

    const handleToggleFavorite = useCallback((id: string) => {
        const project = projects.find(p => p.id === id)
        if (project) {
            favoriteMutation.mutate({ id, favorite: !project.favorite })
        }
    }, [projects, favoriteMutation])

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
        handleToggleFavorite,
        handleEdit,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
    }
}
