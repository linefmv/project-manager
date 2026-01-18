import { Skeleton } from './Skeleton'

export function ProjectCardSkeleton() {
    return (
        <div className="w-full rounded-[16px] overflow-hidden">
            <Skeleton className="h-[180px] sm:h-[200px] md:h-[231px] rounded-none" />

            <div className="bg-white border border-border-default border-t-0 rounded-b-[16px] p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2 mb-4" />

                <div className="border-t border-border-light pt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                </div>
            </div>
        </div>
    )
}
