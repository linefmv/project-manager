import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useProjectForm } from '../../hooks/useProjectForm'
import { createProject } from '../../services/api'
import type { CreateProjectInput } from '../../types/project'

export function useCreateProject() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleSubmit = async (data: CreateProjectInput) => {
        await createProject(data)
        await queryClient.invalidateQueries({ queryKey: ['projects'] })
        navigate('/')
    }

    const handleBack = () => {
        navigate(-1)
    }

    const formState = useProjectForm({
        onSubmit: handleSubmit,
    })

    return {
        ...formState,
        handleBack,
    }
}
