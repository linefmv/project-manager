import { useState, useCallback, useEffect } from 'react'
import {
    getSearchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
} from '../utils/storage'

export function useSearchHistory() {
    const [history, setHistory] = useState<string[]>([])

    useEffect(() => {
        setHistory(getSearchHistory())
    }, [])

    const addSearch = useCallback((query: string) => {
        const updated = addToSearchHistory(query)
        setHistory(updated)
    }, [])

    const removeSearch = useCallback((query: string) => {
        const updated = removeFromSearchHistory(query)
        setHistory(updated)
    }, [])

    return {
        history,
        addSearch,
        removeSearch,
    }
}
