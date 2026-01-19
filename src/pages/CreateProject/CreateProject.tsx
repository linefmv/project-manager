import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb'
import { ProjectForm } from '../../components/ProjectForm/ProjectForm'
import { useCreateProject } from './useCreateProject'

export default function CreateProject() {
    const {
        register,
        errors,
        isSubmitting,
        isValid,
        onSubmitForm,
        setCoverImageFile,
        minDate,
        handleBack,
    } = useCreateProject()

    return (
        <div className="w-full min-h-full px-4 md:px-[45px] pt-8 md:pt-[67px] pb-8 md:pb-12">
            <div className="mb-6 md:mb-[33px]">
                <Breadcrumb title="Novo projeto" onBack={handleBack} />
            </div>

            <div className="border border-border-default rounded-lg p-6 md:p-12">
                <ProjectForm
                    register={register}
                    errors={errors}
                    onSubmit={onSubmitForm}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    onCoverImageChange={setCoverImageFile}
                    minDate={minDate}
                />
            </div>
        </div>
    )
}
