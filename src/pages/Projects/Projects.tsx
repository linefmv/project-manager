import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { EmptyState } from '../ProjectsList/components/EmptyState'
import { DeleteModal } from '../../components/DeleteModal/DeleteModal'
import { ProjectGrid } from '../../components/ProjectGrid'
import { PageContainer } from '../../components/PageContainer'
import { PlusCircleIcon, ChevronDownIcon } from '../../components/Icons'
import { useProjects } from './useProjects'
import type { SortOption } from '../../types/project'

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'alphabetical', label: 'Ordem alfabética' },
    { value: 'recent', label: 'Incluídos mais recentes' },
    { value: 'deadline', label: 'Prazo mais próximo' },
]

export function Projects() {
    const {
        projects,
        totalProjects,
        isLoading,
        isError,
        showFavoritesOnly,
        sortOption,
        deleteModalState,
        isDeleting,
        handleToggleFavorite,
        handleEdit,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
        handleCreateProject,
        handleToggleFavoritesFilter,
        handleSortChange,
    } = useProjects()

    if (isError) {
        return (
            <PageContainer centered>
                <p className="text-error-text">Erro ao carregar projetos</p>
            </PageContainer>
        )
    }

    const isEmpty = totalProjects === 0

    if (isLoading) {
        return (
            <PageContainer loading>
                <div className="animate-spin rounded-full h-12 w-12 border-b-[3px] border-primary-purple" />
            </PageContainer>
        )
    }

    if (isEmpty) {
        return (
            <PageContainer centered>
                <EmptyState onCreateProject={handleCreateProject} />
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-baseline gap-2">
                    <h1 className="text-2xl font-semibold text-text-title">
                        Projetos
                    </h1>
                    <span className="text-[17px] text-primary-purple">
                        ({totalProjects})
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <button
                            onClick={handleToggleFavoritesFilter}
                            className={`
                                relative w-[48px] h-[24px] rounded-full transition-colors
                                ${showFavoritesOnly ? 'bg-primary-purple' : 'bg-toggle-background'}
                            `}
                            role="switch"
                            aria-checked={showFavoritesOnly}
                        >
                            <span
                                className={`
                                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                                    ${showFavoritesOnly ? 'left-7' : 'left-1'}
                                `}
                            />
                        </button>
                        <span className="text-base text-text-primary">
                            Apenas Favoritos
                        </span>
                    </label>

                    <div className="relative w-full sm:w-auto">
                        <select
                            value={sortOption}
                            onChange={(e) => handleSortChange(e.target.value as SortOption)}
                            className="appearance-none w-full sm:w-[240px] h-10 px-4 pr-10 bg-white border border-border-input rounded-lg text-base text-text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-purple/20"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDownIcon
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                        />
                    </div>

                    <button
                        onClick={handleCreateProject}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 h-10 bg-primary-purple hover:bg-primary-dark text-white rounded-button transition-colors"
                    >
                        <PlusCircleIcon size={20} className="text-white" />
                        <span className="text-base">Novo projeto</span>
                    </button>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-text-secondary">
                        {showFavoritesOnly
                            ? "Nenhum projeto favorito encontrado"
                            : "Nenhum projeto encontrado"}
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
