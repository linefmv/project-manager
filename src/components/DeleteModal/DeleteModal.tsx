import * as React from 'react'
import { createPortal } from 'react-dom'
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
    useEscapeKey(() => {
        if (isOpen) onClose()
    })

    React.useEffect(() => {
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

    const modalContent = (
        <div className="modal-overlay">
            <div
                onClick={onClose}
                aria-hidden="true"
                className="modal-backdrop"
            />

            <div className="relative flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary-purple flex items-center justify-center relative z-10 -mb-7 shadow-md">
                    <TrashIcon size={24} className="text-white" />
                </div>

                <div className="modal-content">
                    <h2 className="font-semibold text-xl leading-7 text-center text-primary-dark">
                        Remover projeto
                    </h2>

                    <div className="w-full h-px bg-[#8C8B93] mt-4" />

                    <p className="text-sm leading-5 text-center text-text-secondary mt-4">
                        Essa ação removerá definitivamente o projeto:
                    </p>

                    <p className="max-w-[350px] font-medium text-lg leading-6 text-center text-primary-darker mt-1 text-truncate">
                        {projectName}
                    </p>

                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="btn-secondary"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="btn-confirm"
                        >
                            {isDeleting ? 'Removendo...' : 'Confirmar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}
