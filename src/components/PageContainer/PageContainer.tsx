import { ReactNode } from 'react'

interface PageContainerProps {
    children: ReactNode
    centered?: boolean
    loading?: boolean
}

export function PageContainer({ children, centered = false, loading = false }: PageContainerProps) {
    if (loading) {
        return (
            <div className="w-full min-h-full flex items-center justify-center">
                {children}
            </div>
        )
    }

    if (centered) {
        return (
            <div className="w-full min-h-full px-4 md:px-[42px] py-4 md:py-[60px]">
                <div className="w-full min-h-[calc(100vh-80px-120px)] bg-white rounded-[4px] shadow-sm flex items-center justify-center">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-full px-4 md:px-[42px] pt-8 md:pt-[60px] pb-8">
            {children}
        </div>
    )
}
