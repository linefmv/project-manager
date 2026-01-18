import { ArrowLeft } from 'lucide-react'

interface BreadcrumbProps {
    title: string
    onBack: () => void
}

export function Breadcrumb({ title, onBack }: BreadcrumbProps) {
    return (
        <div className="flex flex-col gap-[8px]">
            <button
                onClick={onBack}
                className="flex items-center gap-1 text-primary-purple hover:opacity-80 transition-opacity w-fit"
            >
                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                <span className="text-base leading-5 font-normal">Voltar</span>
            </button>
            <h1 className="text-2xl leading-[30px] font-semibold text-primary-purple">
                {title}
            </h1>
        </div>
    )
}
