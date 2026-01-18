import { useEffect } from 'react'
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

    const modalContent = (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[9999] backdrop-blur-[5px]">
            <div
                onClick={onClose}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full bg-[rgba(24,24,24,0.9)]"
            />

            <div className="relative flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary-purple flex items-center justify-center relative z-10 -mb-7 shadow-md">
                    <TrashIcon size={24} className="text-white" />
                </div>

                <div className="relative bg-white rounded-lg flex flex-col items-center pt-11 pb-8 px-12">
                    <h2 className="font-sans font-semibold text-xl leading-7 text-center text-primary-dark m-0">
                        Remover projeto
                    </h2>

                    <div className="w-full h-px bg-[#8C8B93] mt-4" />

                    <p className="font-sans font-normal text-sm leading-5 text-center text-text-secondary m-0 mt-4">
                        Essa ação removerá definitivamente o projeto:
                    </p>

                    <p className="max-w-[350px] font-sans font-medium text-lg leading-6 text-center text-primary-darker m-0 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {projectName}
                    </p>

                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="py-2.5 px-10 bg-white border border-primary-purple rounded-button font-sans font-normal text-base leading-[22px] text-primary-purple cursor-pointer transition-colors duration-200 hover:bg-background-light disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="py-2.5 px-10 bg-primary-purple border-none rounded-button font-sans font-normal text-base leading-[22px] text-white cursor-pointer transition-colors duration-200 hover:bg-button-submitHover disabled:cursor-not-allowed disabled:opacity-50"
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
