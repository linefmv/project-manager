import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSearchHistory } from '../../hooks/useSearchHistory'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useClickOutside } from '../../hooks/useClickOutside'

export function useSearchBar(onClose: () => void) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const initialQuery = searchParams.get('q') || ''

    const { history, addSearch, removeSearch } = useSearchHistory()
    const [query, setQuery] = useState(initialQuery)
    const [showHistory, setShowHistory] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const historyRef = useRef<HTMLDivElement>(null)

    const isValidQuery = query.trim().length >= 3

    const handleClickOutside = () => {
        if (isValidQuery) {
            setShowHistory(false)
        } else {
            onClose()
        }
    }

    const containerRef = useClickOutside<HTMLDivElement>(handleClickOutside, [historyRef])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        const urlQuery = searchParams.get('q') || ''
        setQuery(urlQuery)
    }, [searchParams])

    useEscapeKey(onClose)

    // Busca em tempo real após 3 caracteres com debounce
    useEffect(() => {
        if (query.trim().length < 3) return

        const timeoutId = setTimeout(() => {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
            setShowHistory(false)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query, navigate])

    // Salva no histórico quando o usuário para de digitar (após 3+ caracteres)
    useEffect(() => {
        if (query.trim().length < 3) return

        const timeoutId = setTimeout(() => {
            addSearch(query.trim())
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [query, addSearch])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValidQuery) return

        addSearch(query.trim())
        navigate(`/search?q=${encodeURIComponent(query.trim())}`)
        setShowHistory(false)
    }

    const handleHistoryClick = (term: string) => {
        setQuery(term)
        addSearch(term)
        navigate(`/search?q=${encodeURIComponent(term)}`)
        setShowHistory(false)
    }

    const handleRemoveHistory = (term: string, e: React.MouseEvent) => {
        e.stopPropagation()
        removeSearch(term)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setShowHistory(true)
    }

    const handleInputFocus = () => {
        setShowHistory(true)
    }

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
