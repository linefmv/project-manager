import { SearchIcon, ClockIcon, CloseIcon } from '../Icons'
import { useSearchBar } from './useSearchBar'

interface SearchBarProps {
    onClose: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
    const {
        query,
        history,
        showHistory,
        inputRef,
        containerRef,
        historyRef,
        handleSubmit,
        handleHistoryClick,
        handleRemoveHistory,
        handleInputChange,
        handleInputFocus,
    } = useSearchBar(onClose)

    const hasHistory = history.length > 0 && showHistory && query.length === 0

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="relative flex items-center">
                    <SearchIcon
                        size={20}
                        className="absolute left-0 text-text-secondary"
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder="Digite o nome do projeto..."
                        className="w-full h-10 pl-8 pr-4 bg-transparent border-none text-base text-text-primary placeholder:text-text-secondary focus:outline-none"
                    />
                </div>

                {query.length > 0 && query.length < 3 && (
                    <p className="absolute top-full left-0 mt-2 text-sm text-text-secondary">
                        Digite pelo menos 3 caracteres
                    </p>
                )}
            </form>

            {hasHistory && (
                <div ref={historyRef} className="fixed top-20 left-0 right-0 bg-white shadow-lg z-40">
                    <ul className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
                        {history.map((term) => (
                            <li key={term} className="border-b border-border-light last:border-b-0">
                                <div className="flex items-center gap-3 py-3 hover:bg-background-light transition-colors">
                                    <button
                                        type="button"
                                        onClick={() => handleHistoryClick(term)}
                                        className="flex-1 flex items-center gap-3 text-left"
                                    >
                                        <ClockIcon size={18} className="text-text-secondary flex-shrink-0" />
                                        <span className="text-base text-text-primary truncate">
                                            {term}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemoveHistory(term, e)}
                                        className="p-1 hover:bg-border-light rounded transition-colors"
                                        aria-label={`Remover "${term}" do histórico`}
                                    >
                                        <CloseIcon size={14} className="text-text-secondary" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
