import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useProjectForm } from '../../hooks/useProjectForm'
import { createProject } from '../../services/api'
import type { CreateProjectInput } from '../../types/project'

export function useCreateProject() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleSubmit = async (data: CreateProjectInput) => {
        try {
            await createProject(data)
            await queryClient.invalidateQueries({ queryKey: ['projects'] })
            await queryClient.invalidateQueries({ queryKey: ['search'] })
            toast.success('Projeto criado com sucesso!')
            navigate('/')
        } catch {
            toast.error('Erro ao criar projeto. Tente novamente.')
            throw new Error('Erro ao criar projeto')
        }
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
