import { ReactNode } from 'react'

interface PageContainerProps {
    children: ReactNode
    centered?: boolean
}

export function PageContainer({ children, centered = false }: PageContainerProps) {
    const baseClasses = "w-full min-h-full"
    const paddingClasses = centered ? "" : "px-4 md:px-[42px] pt-8 md:pt-[60px] pb-8"
    const centeredClasses = centered ? "flex items-center justify-center" : ""

    return (
        <div className={`${baseClasses} ${paddingClasses} ${centeredClasses}`}>
            {children}
        </div>
    )
}
