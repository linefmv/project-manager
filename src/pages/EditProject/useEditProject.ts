import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProjectById, updateProject } from '../../services/api'
import { useProjectForm } from '../../hooks/useProjectForm'
import type { CreateProjectInput } from '../../types/project'

export function useEditProject() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', id],
        queryFn: () => getProjectById(id!),
        enabled: Boolean(id),
    })

    const handleSubmit = async (formData: CreateProjectInput) => {
        if (!id) return
        await updateProject(id, formData)
        await queryClient.invalidateQueries({ queryKey: ['projects'] })
        navigate('/')
    }

    const handleBack = () => {
        navigate(-1)
    }

    const formState = useProjectForm({
        defaultValues: data?.project,
        onSubmit: handleSubmit,
    })

    return {
        ...formState,
        isLoading,
        isError,
        project: data?.project,
        handleBack,
    }
}
