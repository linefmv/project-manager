import { Skeleton } from './Skeleton'

export function ProjectFormSkeleton() {
    return (
        <div className="w-full max-w-[704px] mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-[174px] w-full rounded" />
            </div>

            <Skeleton className="h-[52px] w-full rounded-button" />
        </div>
    )
}
