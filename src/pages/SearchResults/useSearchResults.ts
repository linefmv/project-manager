import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchProjects } from '../../services/api'
import { useProjectActions } from '../../hooks/useProjectActions'

export function useSearchResults() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''

    const { data, isLoading, isError } = useQuery({
        queryKey: ['search', query],
        queryFn: () => searchProjects(query),
        enabled: query.length >= 3,
    })

    const projects = data?.projects || []
    const total = data?.total || 0

    const projectActions = useProjectActions({
        projects,
        queryKeysToInvalidate: [['search', query], ['projects']],
    })

    const handleBack = () => {
        navigate('/')
    }

    return {
        query,
        projects,
        total,
        isLoading,
        isError,
        handleBack,
        ...projectActions,
    }
}
