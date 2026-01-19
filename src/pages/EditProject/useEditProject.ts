import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
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
        try {
            await updateProject(id, formData)
            await queryClient.invalidateQueries({ queryKey: ['projects'], refetchType: 'all' })
            await queryClient.invalidateQueries({ queryKey: ['project', id] })
            await queryClient.invalidateQueries({ queryKey: ['search'], refetchType: 'all' })
            toast.success('Projeto atualizado com sucesso!')
            navigate('/')
        } catch {
            toast.error('Erro ao atualizar projeto. Tente novamente.')
            throw new Error('Erro ao atualizar projeto')
        }
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
