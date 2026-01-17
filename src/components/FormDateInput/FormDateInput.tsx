import { forwardRef } from 'react'
import { CalendarIcon } from './CalendarIcon'

interface FormDateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    required?: boolean
    variant?: 'start' | 'end'
}

export const FormDateInput = forwardRef<HTMLInputElement, FormDateInputProps>(
    ({ label, error, required, variant = 'start', className = '', ...props }, ref) => {
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
                <div className="relative">
                    <input
                        ref={ref}
                        type="date"
                        className={`
                            h-10 px-4 pr-12 rounded w-full
                            bg-white
                            border ${borderColor}
                            text-base leading-[22px] ${textColor}
                            focus:outline-none focus:ring-2 focus:ring-primary-purple/20
                            [&::-webkit-calendar-picker-indicator]:absolute
                            [&::-webkit-calendar-picker-indicator]:right-0
                            [&::-webkit-calendar-picker-indicator]:top-0
                            [&::-webkit-calendar-picker-indicator]:bottom-0
                            [&::-webkit-calendar-picker-indicator]:opacity-0
                            [&::-webkit-calendar-picker-indicator]:cursor-pointer
                            [&::-webkit-calendar-picker-indicator]:w-12
                            [&::-webkit-calendar-picker-indicator]:h-full
                            ${className}
                        `}
                        {...props}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <CalendarIcon
                            className={requiredColor}
                            size={24}
                            variant={variant}
                        />
                    </div>
                </div>
                {error && (
                    <span className="text-sm leading-[22px] text-error-text">
                        {error}
                    </span>
                )}
            </div>
        )
    }
)

FormDateInput.displayName = 'FormDateInput'
