import { useState, useRef } from 'react'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function useImageUpload(initialValue?: string) {
    const [preview, setPreview] = useState<string>(initialValue || '')
    const [validationError, setValidationError] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (file: File | null) => void) => {
        const file = e.target.files?.[0]
        if (!file) return

        setValidationError('')

        if (!ALLOWED_TYPES.includes(file.type)) {
            setValidationError('Formato inválido. Use JPG, PNG ou WebP')
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            setValidationError('A imagem deve ter no máximo 2MB')
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
            onChange(file)
        }
        reader.readAsDataURL(file)
    }

    const handleRemove = (onChange: (file: File | null) => void) => {
        setPreview('')
        setValidationError('')
        onChange(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const handleClick = () => {
        inputRef.current?.click()
    }

    return {
        preview,
        validationError,
        inputRef,
        handleFileChange,
        handleRemove,
        handleClick,
    }
}
