import { ReactNode } from 'react'
import { Header } from '../Header/Header'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="h-screen w-screen bg-background-light flex flex-col">
            <Header />
            <main className="flex-1 w-full overflow-y-auto pt-20">
                {children}
            </main>
        </div>
    )
}
