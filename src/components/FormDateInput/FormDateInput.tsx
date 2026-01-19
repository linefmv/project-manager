import { forwardRef, useId } from 'react'
import { CalendarIcon } from '../Icons'
import { FormFieldWrapper, useFormFieldStyles } from '../FormFieldWrapper'

interface FormDateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    required?: boolean
    variant?: 'start' | 'end'
}

export const FormDateInput = forwardRef<HTMLInputElement, FormDateInputProps>(
    ({ label, error, required, variant = 'start', className = '', id, ...props }, ref) => {
        const generatedId = useId()
        const inputId = id || generatedId
        const hasError = Boolean(error)
        const { borderColor, requiredColor } = useFormFieldStyles(hasError)

        return (
            <FormFieldWrapper
                label={label}
                error={error}
                required={required}
                htmlFor={inputId}
            >
                <div className="relative">
                    <input
                        id={inputId}
                        ref={ref}
                        type="date"
                        className={`
                            h-10 px-4 pr-12 rounded w-full
                            bg-white
                            border ${borderColor}
                            text-base leading-[22px] text-text-primary
                            focus:outline-none focus:ring-2 focus:ring-primary-purple/20
                            [&::-webkit-calendar-picker-indicator]:absolute
                            [&::-webkit-calendar-picker-indicator]:right-0
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
            </FormFieldWrapper>
        )
    }
)

FormDateInput.displayName = 'FormDateInput'

