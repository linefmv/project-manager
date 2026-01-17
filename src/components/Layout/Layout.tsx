import { ReactNode } from 'react'
import { Header } from '../Header/Header'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background-light">
            <Header />
            <main className="w-full pt-20">
                {children}
            </main>
        </div>
    )
}
