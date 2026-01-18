import { useEffect, useCallback } from 'react'
import { TrashIcon } from '../Icons'
import { useEscapeKey } from '../../hooks/useEscapeKey'

interface DeleteModalProps {
    projectName: string
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isDeleting?: boolean
}

export function DeleteModal({
    projectName,
    isOpen,
    onClose,
    onConfirm,
    isDeleting = false,
}: DeleteModalProps) {
    const handleEscape = useCallback(() => {
        if (isOpen) {
            onClose()
        }
    }, [isOpen, onClose])

    useEscapeKey(handleEscape)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 md:p-8">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-purple flex items-center justify-center mb-6">
                        <TrashIcon size={32} className="text-white" />
                    </div>

                    <h2 className="text-xl font-semibold text-text-title mb-4">
                        Remover projeto
                    </h2>

                    <p className="text-text-secondary mb-2">
                        Essa ação removerá definitivamente o projeto:
                    </p>

                    <p className="font-semibold text-text-primary mb-8">
                        {projectName}
                    </p>

                    <div className="flex gap-4 w-full">
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="flex-1 py-3 px-6 border border-primary-purple text-primary-purple rounded-button hover:bg-background-light transition-colors disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="flex-1 py-3 px-6 bg-primary-purple text-white rounded-button hover:bg-primary-dark transition-colors disabled:opacity-50"
                        >
                            {isDeleting ? 'Removendo...' : 'Confirmar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
