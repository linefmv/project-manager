import { useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useEscapeKey } from '../../hooks/useEscapeKey'

interface UseProjectCardProps {
    id: string
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

export function useProjectCard({ id, onEdit, onDelete }: UseProjectCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = () => setIsMenuOpen(false)

    const menuRef = useClickOutside<HTMLDivElement>(closeMenu)
    useEscapeKey(closeMenu)

    const handleMenuToggle = () => setIsMenuOpen(prev => !prev)

    const handleEdit = () => {
        closeMenu()
        onEdit(id)
    }

    const handleDelete = () => {
        closeMenu()
        onDelete(id)
    }

    return {
        isMenuOpen,
        menuRef,
        handleMenuToggle,
        handleEdit,
        handleDelete,
    }
}
