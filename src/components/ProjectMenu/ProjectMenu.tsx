import { EditIcon, TrashIcon } from '../Icons'

interface ProjectMenuProps {
    onEdit: () => void
    onDelete: () => void
}

export function ProjectMenu({ onEdit, onDelete }: ProjectMenuProps) {
    return (
        <div className="absolute top-full right-0 mt-2 w-[240px] bg-white rounded-lg shadow-md z-10">
            <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white" />

            <button
                onClick={onEdit}
                className="w-full flex items-center gap-3 px-5 py-3 text-primary-purple hover:bg-background-light transition-colors rounded-t-lg"
            >
                <EditIcon size={24} className="text-primary-purple" />
                <span className="text-base">Editar</span>
            </button>

            <div className="h-px bg-background-light" />

            <button
                onClick={onDelete}
                className="w-full flex items-center gap-3 px-5 py-3 text-primary-purple hover:bg-background-light transition-colors rounded-b-lg"
            >
                <TrashIcon size={24} className="text-primary-purple" />
                <span className="text-base">Remover</span>
            </button>
        </div>
    )
}
