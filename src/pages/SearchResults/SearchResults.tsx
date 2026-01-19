import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { DeleteModal } from '../../components/DeleteModal/DeleteModal'

import { ProjectGrid } from '../../components/ProjectGrid'
import { PageContainer } from '../../components/PageContainer'
import { useSearchResults } from './useSearchResults'

export default function SearchResults() {
    const {
        query,
        projects,
        isLoading,
        isError,
        isDeleting,
        deleteModalState,
        handleToggleFavorite,
        handleEdit,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
        handleBack,
    } = useSearchResults()

    if (query.length < 3) {
        return (
            <PageContainer>
                <div className="mb-8">
                    <Breadcrumb title="Resultado da busca" onBack={handleBack} />
                </div>
                <div className="text-center py-12">
                    <p className="text-text-secondary">
                        Digite pelo menos 3 caracteres para buscar
                    </p>
                </div>
            </PageContainer>
        )
    }

    if (isLoading) {
        return (
            <PageContainer>
                <div className="mb-8">
                    <Breadcrumb title="Resultado da busca" onBack={handleBack} />
                </div>
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-[3px] border-primary-purple" />
                </div>
            </PageContainer>
        )
    }

    if (isError) {
        return (
            <PageContainer centered>
                <p className="text-error-text">Erro ao buscar projetos</p>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <div className="mb-8">
                <Breadcrumb title="Resultado da busca" onBack={handleBack} />
            </div>

            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <p className="text-text-secondary text-lg">
                        Nenhum projeto encontrado para "{query}"
                    </p>
                </div>
            ) : (
                <ProjectGrid>
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
                            searchQuery={query}
                            onToggleFavorite={handleToggleFavorite}
                            onEdit={handleEdit}
                            onDelete={handleOpenDeleteModal}
                        />
                    ))}
                </ProjectGrid>
            )}

            <DeleteModal
                projectName={deleteModalState.project?.name || ''}
                isOpen={deleteModalState.isOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </PageContainer>
    )
}
