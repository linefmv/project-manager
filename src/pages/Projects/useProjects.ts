import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getProjects } from '../../services/api'
import { useProjectActions } from '../../hooks/useProjectActions'
import type { Project, SortOption } from '../../types/project'

export function useProjects() {
    const navigate = useNavigate()

    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [sortOption, setSortOption] = useState<SortOption>('alphabetical')

    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ['projects', { sort: sortOption, favorite: showFavoritesOnly || undefined }],
        queryFn: () => getProjects({ sort: sortOption, favorite: showFavoritesOnly || undefined }),
    })

    const projects = useMemo((): Project[] => data?.projects || [], [data])
    const totalProjects = data?.total || 0

    const projectActions = useProjectActions({
        projects,
        queryKeysToInvalidate: [['projects']],
    })

    const handleCreateProject = () => {
        navigate('/projects/new')
    }

    const handleToggleFavoritesFilter = () => {
        setShowFavoritesOnly(prev => !prev)
    }

    const handleSortChange = (option: SortOption) => {
        setSortOption(option)
    }

    return {
        projects,
        totalProjects,
        isLoading,
        isFetching,
        isError,
        showFavoritesOnly,
        sortOption,
        handleCreateProject,
        handleToggleFavoritesFilter,
        handleSortChange,
        ...projectActions,
    }
}
