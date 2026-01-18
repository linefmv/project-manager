import { NewProjectButton } from '../../../components/NewProjectButton/NewProjectButton'

interface EmptyStateProps {
    onCreateProject?: () => void
}

export function EmptyState({ onCreateProject }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full text-center animate-fade-in">
            <h2 className="text-[24px] font-semibold text-primary-dark mb-4 font-sans leading-[30px]">
                Nenhum projeto
            </h2>
            <p className="text-[16px] text-text-secondary mb-8 max-w-[446px] leading-[22px]">
                Clique no botão abaixo para criar o primeiro e gerenciá-lo.
            </p>
            <NewProjectButton size="large" onClick={onCreateProject} />
        </div>
    )
}