import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { EmptyState } from '../ProjectsList/components/EmptyState'
import { DeleteModal } from '../../components/DeleteModal/DeleteModal'
import { ProjectCardSkeleton } from '../../components/Skeleton'
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
        isFetching,
        isError,
        showFavoritesOnly,
        sortOption,
        deleteModalState,
        isDeleting,
        isTogglingFavorite,
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
            <div className="w-full min-h-full flex items-center justify-center">
                <p className="text-error-text">Erro ao carregar projetos</p>
            </div>
        )
    }

    const isEmpty = totalProjects === 0
    const isRefetching = isFetching && !isLoading

    if (isLoading) {
        return (
            <div className="w-full min-h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-purple" />
            </div>
        )
    }

    if (isEmpty) {
        return (
            <div className="w-full min-h-full px-4 md:px-[42px] pt-8 md:pt-[60px] pb-8 flex items-center justify-center">
                <EmptyState onCreateProject={handleCreateProject} />
            </div>
        )
    }

    return (
        <div className="w-full min-h-full px-4 md:px-[42px] pt-8 md:pt-[60px] pb-8">
            {isRefetching ? (
                <>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-2xl font-semibold text-text-title">
                                Projetos
                            </h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProjectCardSkeleton key={index} />
                        ))}
                    </div>
                </>
            ) : (
                <>
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
                                    className="appearance-none w-full sm:w-[200px] h-10 px-4 pr-10 bg-white border border-border-input rounded-lg text-base text-text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-purple/20"
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
                                Nenhum projeto favorito encontrado
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
                                    onToggleFavorite={handleToggleFavorite}
                                    onEdit={handleEdit}
                                    onDelete={handleOpenDeleteModal}
                                />
                            ))}
                        </div>
                    )}
                </>
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
