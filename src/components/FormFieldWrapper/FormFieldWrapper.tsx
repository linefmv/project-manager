import { ReactNode } from 'react'
import { useFormFieldStyles } from './useFormFieldStyles'

interface FormFieldWrapperProps {
    label: string
    error?: string
    required?: boolean
    htmlFor?: string
    children: ReactNode
}

export function FormFieldWrapper({
    label,
    error,
    required,
    htmlFor,
    children,
}: FormFieldWrapperProps) {
    const hasError = Boolean(error)
    const { labelColor, requiredColor } = useFormFieldStyles(hasError)

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={htmlFor} className="flex items-end gap-2">
                <span className={`text-lg leading-[22px] font-medium ${labelColor}`}>
                    {label}
                </span>
                {required && (
                    <span className={`text-sm leading-[22px] ${requiredColor}`}>
                        (Obrigatório)
                    </span>
                )}
            </label>
            {children}
            {error && (
                <span className="text-sm leading-[22px] text-error-text">
                    {error}
                </span>
            )}
        </div>
    )
}
