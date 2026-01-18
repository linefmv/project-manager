const SEARCH_HISTORY_KEY = 'search_history'
const MAX_HISTORY_ITEMS = 5

export function getSearchHistory(): string[] {
    try {
        const stored = localStorage.getItem(SEARCH_HISTORY_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

function saveSearchHistory(history: string[]): boolean {
    try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history))
        return true
    } catch {
        return false
    }
}

export function addToSearchHistory(query: string): string[] {
    const trimmed = query.trim()
    const history = getSearchHistory()

    if (!trimmed || trimmed.length < 3) return history

    const filtered = history.filter(item => item.toLowerCase() !== trimmed.toLowerCase())
    const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY_ITEMS)

    return saveSearchHistory(updated) ? updated : history
}

export function removeFromSearchHistory(query: string): string[] {
    const history = getSearchHistory()
    const updated = history.filter(item => item.toLowerCase() !== query.toLowerCase())

    if (updated.length === history.length) return history

    return saveSearchHistory(updated) ? updated : history
}

export function clearSearchHistory(): void {
    try {
        localStorage.removeItem(SEARCH_HISTORY_KEY)
    } catch {
        return
    }
}
