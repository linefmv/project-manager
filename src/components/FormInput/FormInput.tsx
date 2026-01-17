import { forwardRef } from 'react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    required?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, required, className = '', ...props }, ref) => {
        const hasError = Boolean(error)
        const borderColor = hasError ? 'border-error-border' : 'border-border-input'
        const labelColor = hasError ? 'text-error-label' : 'text-primary-purple'
        const textColor = hasError ? 'text-error-text' : 'text-text-primary'
        const requiredColor = hasError ? 'text-error-text' : 'text-text-secondary'

        return (
            <div className="flex flex-col gap-2">
                <label className="flex items-end gap-2">
                    <span className={`text-lg leading-[22px] font-medium ${labelColor}`}>
                        {label}
                    </span>
                    {required && (
                        <span className={`text-sm leading-[22px] ${requiredColor}`}>
                            (Obrigatório)
                        </span>
                    )}
                </label>
                <input
                    ref={ref}
                    className={`
                        h-10 px-4 rounded-lg
                        bg-white
                        border ${borderColor}
                        text-base leading-[22px] ${textColor}
                        placeholder:text-text-secondary
                        focus:outline-none focus:ring-2 focus:ring-primary-purple/20
                        ${className}
                    `}
                    {...props}
                />
                {error && (
                    <span className="text-sm leading-[22px] text-error-text">
                        {error}
                    </span>
                )}
            </div>
        )
    }
)

FormInput.displayName = 'FormInput'
