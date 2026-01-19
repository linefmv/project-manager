import { SearchIcon, HistoryIcon, CloseIcon } from '../Icons'
import { useSearchBar } from './useSearchBar'

interface SearchBarProps {
    onClose: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
    const {
        query,
        history,
        showHistory,
        isValidQuery,
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
        <div ref={containerRef} className={`w-full`}>
            <form onSubmit={handleSubmit} className="h-20 flex items-center">
                <div className="relative flex items-center w-full">
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

                {query.length > 0 && !isValidQuery && (
                    <p className="text-xs text-text-secondary mt-1 pl-8">
                        Digite pelo menos 3 caracteres para buscar
                    </p>
                )}
            </form>

            {hasHistory && (
                <div ref={historyRef} className="bg-white -mx-6">
                    <ul>
                        {history.map((term) => (
                            <li key={term}>
                                <div className="flex items-center py-3 px-6 border-t border-[#F4F2FF] hover:bg-background-light transition-colors">
                                    <button
                                        type="button"
                                        onClick={() => handleHistoryClick(term)}
                                        className="flex-1 flex items-center gap-3 text-left"
                                    >
                                        <HistoryIcon size={16} className="text-text-secondary flex-shrink-0" />
                                        <span className="text-sm text-text-primary">
                                            {term}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemoveHistory(term, e)}
                                        className="p-1 hover:bg-border-light rounded transition-colors"
                                        aria-label={`Remover "${term}" do histórico`}
                                    >
                                        <CloseIcon size={16} className="text-text-secondary" />
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
