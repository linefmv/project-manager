import { FormInput } from '../FormInput/FormInput'
import { FormDateInput } from '../FormDateInput/FormDateInput'
import { ImageUpload } from '../ImageUpload/ImageUpload'
import type { FieldErrors } from 'react-hook-form'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface ProjectFormData {
    name: string
    client: string
    startDate: string
    endDate: string
}

interface RegisterFields {
    name: UseFormRegisterReturn<'name'>
    client: UseFormRegisterReturn<'client'>
    startDate: UseFormRegisterReturn<'startDate'>
    endDate: UseFormRegisterReturn<'endDate'>
}

interface ProjectFormProps {
    register: RegisterFields
    errors: FieldErrors<ProjectFormData>
    onSubmit: (e: React.FormEvent) => void
    isSubmitting: boolean
    isValid: boolean
    coverImage?: string
    onCoverImageChange: (file: File | null) => void
    minDate: string
    submitLabel?: string
}

export function ProjectForm({
    register,
    errors,
    onSubmit,
    isSubmitting,
    isValid,
    coverImage,
    onCoverImageChange,
    minDate,
    submitLabel = 'Salvar projeto',
}: ProjectFormProps) {
    const isDisabled = isSubmitting || !isValid
    return (
        <form onSubmit={onSubmit} className="w-full max-w-[500px] mx-auto flex flex-col gap-6">
            <FormInput
                label="Nome do projeto"
                required
                error={errors.name?.message}
                {...register.name}
            />

            <FormInput
                label="Cliente"
                required
                error={errors.client?.message}
                {...register.client}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormDateInput
                    label="Data de Início"
                    variant="start"
                    required
                    min={minDate}
                    error={errors.startDate?.message}
                    {...register.startDate}
                />

                <FormDateInput
                    label="Data Final"
                    variant="end"
                    required
                    min={minDate}
                    error={errors.endDate?.message}
                    {...register.endDate}
                />
            </div>

            <ImageUpload
                label="Capa do projeto"
                value={coverImage}
                onChange={onCoverImageChange}
            />

            <button
                type="submit"
                disabled={isDisabled}
                className="
                    h-[52px] w-full rounded-button
                    bg-button-submit hover:bg-button-submitHover
                    text-white text-xl leading-[22px]
                    transition-colors
                    disabled:bg-button-submitDisabled disabled:cursor-not-allowed disabled:hover:bg-button-submitDisabled
                "
            >
                {isSubmitting ? 'Salvando...' : submitLabel}
            </button>
        </form>
    )
}
