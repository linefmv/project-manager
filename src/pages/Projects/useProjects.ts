import { useMemo } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getProjects } from '../../services/api'
import { useProjectActions } from '../../hooks/useProjectActions'
import type { Project, SortOption } from '../../types/project'

export function useProjects() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const showFavoritesOnly = searchParams.get('favorito') === 'true'
    const sortOption = (searchParams.get('ordenacao') as SortOption) || 'alphabetical'

    const { data, isLoading, isError, isPlaceholderData, isFetching } = useQuery({
        queryKey: ['projects', { sort: sortOption, favorite: showFavoritesOnly || undefined }],
        queryFn: () => getProjects({ sort: sortOption, favorite: showFavoritesOnly || undefined }),
        placeholderData: keepPreviousData,
    })

    const showFetching = isPlaceholderData || (isFetching && !isLoading)

    const projects = useMemo((): Project[] => data?.projects || [], [data])
    const totalProjects = data?.total || 0

    const projectActions = useProjectActions({
        projects,
        queryKeysToInvalidate: [
            ['projects'],
        ],
    })

    const handleCreateProject = () => {
        navigate('/projects/new')
    }

    const handleToggleFavoritesFilter = () => {
        const newParams = new URLSearchParams(searchParams)
        if (showFavoritesOnly) {
            newParams.delete('favorito')
        } else {
            newParams.set('favorito', 'true')
        }
        setSearchParams(newParams)
    }

    const handleSortChange = (option: SortOption) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('ordenacao', option)
        setSearchParams(newParams)
    }

    return {
        projects,
        totalProjects,
        isLoading,
        isError,
        isFetching: showFetching,
        showFavoritesOnly,
        sortOption,
        handleCreateProject,
        handleToggleFavoritesFilter,
        handleSortChange,
        ...projectActions,
    }
}
