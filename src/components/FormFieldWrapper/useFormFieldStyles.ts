export function useFormFieldStyles(hasError: boolean) {
    return {
        borderColor: hasError ? 'border-error-border' : 'border-border-input',
        labelColor: hasError ? 'text-error-text' : 'text-primary-purple',
        textColor: hasError ? 'text-error-text' : 'text-text-primary',
        requiredColor: hasError ? 'text-error-text' : 'text-text-secondary',
    }
}
