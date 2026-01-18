import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import { Header } from '../Header/Header'
import 'react-toastify/dist/ReactToastify.css'

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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}
