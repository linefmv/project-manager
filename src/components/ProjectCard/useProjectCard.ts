import { useState, useCallback } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useEscapeKey } from '../../hooks/useEscapeKey'

interface UseProjectCardProps {
    id: string
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

export function useProjectCard({ id, onEdit, onDelete }: UseProjectCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false)
    }, [])

    const menuRef = useClickOutside<HTMLDivElement>(closeMenu)

    useEscapeKey(closeMenu)

    const handleMenuToggle = useCallback(() => {
        setIsMenuOpen(prev => !prev)
    }, [])

    const handleEdit = useCallback(() => {
        setIsMenuOpen(false)
        onEdit(id)
    }, [id, onEdit])

    const handleDelete = useCallback(() => {
        setIsMenuOpen(false)
        onDelete(id)
    }, [id, onDelete])

    return {
        isMenuOpen,
        menuRef,
        handleMenuToggle,
        handleEdit,
        handleDelete,
    }
}
