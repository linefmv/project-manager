import { EmptyState } from './components/EmptyState'

export function ProjectsList() {
    const hasProjects = false

    return (
        <div className="w-full h-full flex justify-center px-[42px] py-[60px]">
            <div className="w-full max-w-[1856px] h-full bg-white rounded-[4px] shadow-sm relative flex flex-col items-center justify-center">

                {hasProjects ? (
                    <div className="w-full h-full p-8">
                        <p>Project List Component Placeholder</p>
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    )
}
