import { ReactNode } from 'react'
import { Header } from '../Header/Header'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="h-screen w-screen bg-background-light overflow-hidden flex flex-col">
            <Header />
            <main className="flex-1 w-full pt-20 overflow-hidden">
                {children}
            </main>
        </div>
    )
}
