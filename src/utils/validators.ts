export const validateName = (value: string): string | boolean => {
    const trimmed = value.trim()
    if (!trimmed) return 'Por favor, digite ao menos duas palavras'
    const words = trimmed.split(/\s+/).filter(word => word.length > 0)
    return words.length >= 2 || 'Por favor, digite ao menos duas palavras'
}

export const validateClient = (value: string): string | boolean => {
    const trimmed = value.trim()
    if (!trimmed) return 'Por favor, digite ao menos uma palavra'
    const words = trimmed.split(/\s+/).filter(word => word.length > 0)
    return words.length >= 1 || 'Por favor, digite ao menos uma palavra'
}

export const validateStartDate = (value: string, minDate: string): string | boolean => {
    if (value < minDate) {
        return 'A data não pode ser no passado'
    }
    return true
}

export const validateEndDate = (value: string, minDate: string, startDateValue?: string): string | boolean => {
    if (value < minDate) {
        return 'A data não pode ser no passado'
    }
    if (startDateValue && value < startDateValue) {
        return 'A data final deve ser após a data de início'
    }
    return true
}
