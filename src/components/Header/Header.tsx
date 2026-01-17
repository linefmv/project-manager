import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-20 bg-primary-darker shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-50">
            <div className="h-full relative px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-3 pointer-events-auto hover:opacity-90 transition-opacity"
                    >
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="h-14 w-14"
                        />
                        <div className="flex flex-col justify-center leading-tight text-white font-brand text-lg md:text-xl">
                            <span>Gerenciador</span>
                            <span>de Projetos</span>
                        </div>
                    </Link>
                </div>

                <div className="h-full flex items-center justify-end">
                    <button
                        onClick={() => alert('clicou')}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors relative z-10"
                        aria-label="Buscar projetos"
                    >
                        <Search className="w-5 h-5 text-white" strokeWidth={2} />
                    </button>
                </div>
            </div>
        </header>
    )
}
