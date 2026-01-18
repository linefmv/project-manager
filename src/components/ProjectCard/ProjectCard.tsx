import { StarIcon, MoreIcon, PlaceholderIcon } from '../Icons'
import { CalendarIcon } from '../FormDateInput/CalendarIcon'
import { ProjectMenu } from '../ProjectMenu/ProjectMenu'
import { formatDate } from '../../utils/formatDate'
import { highlightText } from '../../utils/highlight'
import { useProjectCard } from './useProjectCard'

interface ProjectCardProps {
    id: string
    name: string
    client: string
    startDate: string
    endDate: string
    coverImage?: string
    isFavorite: boolean
    searchQuery?: string
    onToggleFavorite: (id: string) => void
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

export function ProjectCard({
    id,
    name,
    client,
    startDate,
    endDate,
    coverImage,
    isFavorite,
    searchQuery,
    onToggleFavorite,
    onEdit,
    onDelete,
}: ProjectCardProps) {
    const {
        isMenuOpen,
        menuRef,
        handleMenuToggle,
        handleEdit,
        handleDelete,
    } = useProjectCard({ id, onEdit, onDelete })

    return (
        <div className="w-full rounded-[16px] overflow-hidden">
            <div className="relative h-[180px] sm:h-[200px] md:h-[231px] bg-primary-purple">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <PlaceholderIcon size={64} className="text-white/50" />
                    </div>
                )}

                <div className="absolute bottom-3 right-4 flex items-center gap-2">
                    <button
                        onClick={() => onToggleFavorite(id)}
                        className="drop-shadow-md transition-transform hover:scale-110"
                        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                        <StarIcon
                            size={20}
                            filled={isFavorite}
                            className={`transition-colors ${isFavorite ? 'text-accent-orange' : 'text-white'}`}
                        />
                    </button>

                    <div ref={menuRef} className="relative">
                        <button
                            onClick={handleMenuToggle}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md"
                            aria-label="Abrir menu de opções"
                        >
                            <MoreIcon size={16} className="text-primary-purple" />
                        </button>

                        {isMenuOpen && (
                            <ProjectMenu
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-border-default border-t-0 rounded-b-[16px] p-6">
                <h3 className="font-bold text-xl leading-[25px] text-text-title mb-2">
                    {searchQuery ? highlightText(name, searchQuery) : name}
                </h3>

                <p className="text-base leading-5 text-text-secondary mb-4">
                    <span className="font-bold">Cliente:</span> {searchQuery ? highlightText(client, searchQuery) : client}
                </p>

                <div className="border-t border-border-light pt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <CalendarIcon size={24} variant="start" className="text-text-secondary" />
                        <span className="text-base leading-5 text-text-secondary">
                            {formatDate(startDate)}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CalendarIcon size={24} variant="end" className="text-text-secondary" />
                        <span className="text-base leading-5 text-text-secondary">
                            {formatDate(endDate)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
