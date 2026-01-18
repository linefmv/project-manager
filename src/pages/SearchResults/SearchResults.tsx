import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { DeleteModal } from '../../components/DeleteModal/DeleteModal'
import { ProjectCardSkeleton } from '../../components/Skeleton'
import { useSearchResults } from './useSearchResults'
import { useState, useCallback } from 'react'
import type { Project } from '../../types/project'

export function SearchResults() {
    const {
        query,
        projects,
        total,
        isLoading,
        isError,
        isDeleting,
        isTogglingFavorite,
        handleToggleFavorite,
        handleEdit,
        handleDelete,
        handleBack,
    } = useSearchResults()

    const [deleteModalState, setDeleteModalState] = useState<{
        isOpen: boolean
        project: Project | null
    }>({ isOpen: false, project: null })

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
            handleDelete(deleteModalState.project.id)
            setDeleteModalState({ isOpen: false, project: null })
        }
    }, [deleteModalState.project, handleDelete])

    if (query.length < 3) {
        return (
            <div className="w-full min-h-full px-4 md:px-[42px] pt-8 md:pt-[60px] pb-8">
                <div className="mb-6 md:mb-8">
                    <Breadcrumb title="Resultado da busca" onBack={handleBack} />
                </div>
                <div className="text-center py-12">
                    <p className="text-text-secondary">
                        Digite pelo menos 3 caracteres para buscar
                    </p>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-full px-4 md:px-[42px] pt-8 md:pt-[60px] pb-8">
                <div className="mb-6 md:mb-8">
                    <Breadcrumb title="Resultado da busca" onBack={handleBack} />
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                    <h2 className="text-xl font-semibold text-text-title">
                        Buscando "{query}"...
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <ProjectCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="w-full min-h-full flex items-center justify-center">
                <p className="text-error-text">Erro ao buscar projetos</p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-full px-4 md:px-[42px] pt-8 md:pt-[60px] pb-8">
            <div className="mb-6 md:mb-8">
                <Breadcrumb title="Resultado da busca" onBack={handleBack} />
            </div>

            <div className="flex items-baseline gap-2 mb-8">
                <h2 className="text-xl font-semibold text-text-title">
                    Resultados para "{query}"
                </h2>
                <span className="text-[17px] text-primary-purple">
                    ({total})
                </span>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-text-secondary">
                        Nenhum projeto encontrado para "{query}"
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            client={project.client}
                            startDate={project.startDate}
                            endDate={project.endDate}
                            coverImage={project.coverImage}
                            isFavorite={project.favorite}
                            isTogglingFavorite={isTogglingFavorite(project.id)}
                            searchQuery={query}
                            onToggleFavorite={handleToggleFavorite}
                            onEdit={handleEdit}
                            onDelete={handleOpenDeleteModal}
                        />
                    ))}
                </div>
            )}

            <DeleteModal
                projectName={deleteModalState.project?.name || ''}
                isOpen={deleteModalState.isOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    )
}
