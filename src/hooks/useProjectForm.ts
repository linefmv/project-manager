import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import type { CreateProjectInput } from '../types/project'
import { validateName, validateClient, validateStartDate, validateEndDate } from '../utils/validators'

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

const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
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
        reset,
    } = useForm<ProjectFormData>({
        mode: 'all',
        defaultValues: {
            name: defaultValues?.name || '',
            client: defaultValues?.client || '',
            startDate: defaultValues?.startDate || '',
            endDate: defaultValues?.endDate || '',
        },
    })

    useEffect(() => {
        if (defaultValues) {
            reset({
                name: defaultValues.name || '',
                client: defaultValues.client || '',
                startDate: defaultValues.startDate || '',
                endDate: defaultValues.endDate || '',
            })
            setCoverImageBase64(defaultValues.coverImage)
        }
    }, [defaultValues, reset])

    const minDate = getTodayDateString()
    const startDateValue = watch('startDate')

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
            validate: (value: string) => validateStartDate(value, minDate),
        }),
        endDate: formRegister('endDate', {
            required: 'Selecione uma data válida',
            validate: (value: string) => validateEndDate(value, minDate, startDateValue),
        }),
    }

    const handleCoverImageChange = async (file: File | null) => {
        setCoverImageFile(file)
        if (file) {
            const base64 = await fileToBase64(file)
            setCoverImageBase64(base64)
        } else {
            setCoverImageBase64(undefined)
        }
    }

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

    const onSubmitForm = handleSubmit(async (data: ProjectFormData) => {
        try {
            const projectData: CreateProjectInput = {
                name: data.name.trim(),
                client: data.client.trim(),
                startDate: data.startDate,
                endDate: data.endDate,
            }

            projectData.coverImage = coverImageBase64

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
        coverImageBase64,
        setCoverImageFile: handleCoverImageChange,
        hasUnsavedChanges,
        minDate,
    }
}
