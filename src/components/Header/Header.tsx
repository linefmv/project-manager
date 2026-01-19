import { Link } from 'react-router-dom'
import { SearchIcon } from '../Icons'
import { SearchBar } from '../SearchBar/SearchBar'
import { useHeader } from './useHeader'

export function Header() {
    const { isSearchOpen, handleOpenSearch, handleCloseSearch, shouldShowSearchIcon } = useHeader()

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-colors ${isSearchOpen ? 'bg-white' : 'bg-primary-darker shadow-[0_4px_4px_rgba(0,0,0,0.25)]'}`}>
            <div className={`relative ${isSearchOpen ? 'px-6' : 'h-20 px-4 sm:px-6 lg:pr-[56px] lg:pl-12 xl:pl-16 2xl:pl-20'}`}>
                {isSearchOpen ? (
                    <SearchBar onClose={handleCloseSearch} />
                ) : (
                    <>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Link
                                to="/"
                                className="flex items-center justify-center gap-3 pointer-events-auto hover:opacity-90 transition-opacity"
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}logo.svg`}
                                    alt="Logo"
                                    className="h-14 w-14"
                                />
                                <div className="flex flex-col justify-center leading-tight text-white font-brand text-lg md:text-xl">
                                    <span>Gerenciador</span>
                                    <span>de Projetos</span>
                                </div>
                            </Link>
                        </div>

                        {shouldShowSearchIcon && (
                            <div className="h-full flex items-center justify-end">
                                <button
                                    onClick={handleOpenSearch}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors relative z-10"
                                    aria-label="Buscar projetos"
                                >
                                    <SearchIcon size={20} className="text-white" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </header>
    )
}
