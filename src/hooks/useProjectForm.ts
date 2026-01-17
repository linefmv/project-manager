import { useForm } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'
import type { CreateProjectInput } from '../types/project'

interface UseProjectFormOptions {
    defaultValues?: Partial<CreateProjectInput>
    onSubmit: (data: CreateProjectInput) => Promise<void>
}

interface ProjectFormData {
    name: string
    client: string
    startDate: string
    endDate: string
    coverImage?: File | null
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

const getTodayDateString = (): string => {
    const today = new Date()
    return today.toISOString().split('T')[0]
}

export function useProjectForm({ defaultValues, onSubmit }: UseProjectFormOptions) {
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
    const [coverImageBase64, setCoverImageBase64] = useState<string | undefined>(
        defaultValues?.coverImage
    )

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
        setError,
        watch,
    } = useForm<ProjectFormData>({
        mode: 'all',
        defaultValues: {
            name: defaultValues?.name || '',
            client: defaultValues?.client || '',
            startDate: defaultValues?.startDate || '',
            endDate: defaultValues?.endDate || '',
        },
    })

    const minDate = getTodayDateString()
    const startDateValue = watch('startDate')

    const validateName = (value: string) => {
        const trimmed = value.trim()
        if (!trimmed) return 'Por favor, digite ao menos duas palavras'
        const words = trimmed.split(/\s+/).filter(word => word.length > 0)
        return words.length >= 2 || 'Por favor, digite ao menos duas palavras'
    }

    const validateClient = (value: string) => {
        const trimmed = value.trim()
        if (!trimmed) return 'Por favor, digite ao menos uma palavra'
        const words = trimmed.split(/\s+/).filter(word => word.length > 0)
        return words.length >= 1 || 'Por favor, digite ao menos uma palavra'
    }

    const validateStartDate = (value: string) => {
        if (value < minDate) {
            return 'A data não pode ser no passado'
        }
        return true
    }

    const validateEndDate = (value: string) => {
        if (value < minDate) {
            return 'A data não pode ser no passado'
        }
        if (startDateValue && value < startDateValue) {
            return 'A data final deve ser após a data de início'
        }
        return true
    }

    const register = {
        name: formRegister('name', {
            required: 'Por favor, digite ao menos duas palavras',
            validate: validateName,
        }),
        client: formRegister('client', {
            required: 'Por favor, digite ao menos uma palavra',
            validate: validateClient,
        }),
        startDate: formRegister('startDate', {
            required: 'Selecione uma data válida',
            validate: validateStartDate,
        }),
        endDate: formRegister('endDate', {
            required: 'Selecione uma data válida',
            validate: validateEndDate,
        }),
    }

    const handleCoverImageChange = useCallback(async (file: File | null) => {
        setCoverImageFile(file)
        if (file) {
            const base64 = await fileToBase64(file)
            setCoverImageBase64(base64)
        } else {
            setCoverImageBase64(defaultValues?.coverImage)
        }
    }, [defaultValues?.coverImage])

    const hasUnsavedChanges = isDirty || coverImageFile !== null

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [hasUnsavedChanges])

    const onSubmitForm = handleSubmit(async (data) => {
        try {
            const projectData: CreateProjectInput = {
                name: data.name.trim(),
                client: data.client.trim(),
                startDate: data.startDate,
                endDate: data.endDate,
            }

            if (coverImageBase64) {
                projectData.coverImage = coverImageBase64
            }

            await onSubmit(projectData)
        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error) {
                const errorMessage = (error as { message: string }).message

                if (errorMessage.toLowerCase().includes('nome')) {
                    setError('name', {
                        type: 'manual',
                        message: 'Por favor, digite ao menos duas palavras',
                    })
                } else if (errorMessage.toLowerCase().includes('client')) {
                    setError('client', {
                        type: 'manual',
                        message: 'Por favor, digite ao menos uma palavra',
                    })
                } else if (errorMessage.toLowerCase().includes('data')) {
                    setError('startDate', {
                        type: 'manual',
                        message: 'Selecione uma data válida',
                    })
                }
            }
        }
    })

    return {
        register,
        errors,
        isSubmitting,
        isValid,
        onSubmitForm,
        coverImageFile,
        setCoverImageFile: handleCoverImageChange,
        hasUnsavedChanges,
        minDate,
    }
}
