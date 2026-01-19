import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb'
import { ProjectForm } from '../../components/ProjectForm/ProjectForm'
import { Spinner } from '../../components/Spinner/Spinner'
import { useEditProject } from './useEditProject'

export function EditProject() {
    const {
        register,
        errors,
        isSubmitting,
        isValid,
        onSubmitForm,
        setCoverImageFile,
        minDate,
        isLoading,
        isError,
        project,
        handleBack,
    } = useEditProject()

    if (isLoading) {
        return (
            <div className="w-full min-h-full px-4 md:px-[45px] pt-8 md:pt-[67px] pb-8 md:pb-12">
                <div className="mb-6 md:mb-[52px]">
                    <Breadcrumb title="Editar projeto" onBack={handleBack} />
                </div>

                <div className="flex items-center justify-center min-h-[400px]">
                    <Spinner size="lg" />
                </div>
            </div>
        )
    }

    if (isError || !project) {
        return (
            <div className="w-full min-h-full flex items-center justify-center">
                <p className="text-error-text">Erro ao carregar projeto</p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-full px-4 md:px-[45px] pt-8 md:pt-[67px] pb-8 md:pb-12">
            <div className="mb-6 md:mb-[52px]">
                <Breadcrumb title="Editar projeto" onBack={handleBack} />
            </div>

            <div className="border border-border-default rounded-lg p-6 md:p-12">
                <ProjectForm
                    register={register}
                    errors={errors}
                    onSubmit={onSubmitForm}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    coverImage={project.coverImage}
                    onCoverImageChange={setCoverImageFile}
                    minDate={minDate}
                />
            </div>
        </div>
    )
}
