import { forwardRef, useId } from 'react'
import { FormFieldWrapper, useFormFieldStyles } from '../FormFieldWrapper'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    required?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, required, className = '', id, ...props }, ref) => {
        const generatedId = useId()
        const inputId = id || generatedId
        const hasError = Boolean(error)
        const { borderColor, textColor } = useFormFieldStyles(hasError)

        return (
            <FormFieldWrapper
                label={label}
                error={error}
                required={required}
                htmlFor={inputId}
            >
                <input
                    id={inputId}
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
            </FormFieldWrapper>
        )
    }
)

FormInput.displayName = 'FormInput'
