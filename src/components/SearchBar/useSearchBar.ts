import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSearchHistory } from '../../hooks/useSearchHistory'
import { useEscapeKey } from '../../hooks/useEscapeKey'

export function useSearchBar(onClose: () => void) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const initialQuery = searchParams.get('q') || ''

    const { history, addSearch, removeSearch } = useSearchHistory()
    const [query, setQuery] = useState(initialQuery)
    const [showHistory, setShowHistory] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const historyRef = useRef<HTMLDivElement>(null)

    const isValidQuery = query.trim().length >= 3

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        const urlQuery = searchParams.get('q') || ''
        setQuery(urlQuery)
    }, [searchParams])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node
            const isInsideContainer = containerRef.current?.contains(target)
            const isInsideHistory = historyRef.current?.contains(target)

            if (!isInsideContainer && !isInsideHistory) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClose])

    useEscapeKey(onClose)

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        if (!isValidQuery) return

        addSearch(query.trim())
        navigate(`/search?q=${encodeURIComponent(query.trim())}`)
        setShowHistory(false)
    }, [query, isValidQuery, addSearch, navigate])

    const handleHistoryClick = useCallback((term: string) => {
        setQuery(term)
        addSearch(term)
        navigate(`/search?q=${encodeURIComponent(term)}`)
        setShowHistory(false)
    }, [addSearch, navigate])

    const handleRemoveHistory = useCallback((term: string, e: React.MouseEvent) => {
        e.stopPropagation()
        removeSearch(term)
    }, [removeSearch])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setShowHistory(true)
    }, [])

    const handleInputFocus = useCallback(() => {
        setShowHistory(true)
    }, [])

    return {
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
        onClose,
    }
}
