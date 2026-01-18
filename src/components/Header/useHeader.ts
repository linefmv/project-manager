import { useState, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useHeader() {
    const location = useLocation()
    const navigate = useNavigate()
    const isOnSearchPage = location.pathname === '/search'

    const [isSearchOpen, setIsSearchOpen] = useState(isOnSearchPage)

    useEffect(() => {
        setIsSearchOpen(isOnSearchPage)
    }, [isOnSearchPage])

    const handleOpenSearch = useCallback(() => {
        setIsSearchOpen(true)
    }, [])

    const handleCloseSearch = useCallback(() => {
        setIsSearchOpen(false)
        if (isOnSearchPage) {
            navigate('/')
        }
    }, [isOnSearchPage, navigate])

    return {
        isSearchOpen,
        handleOpenSearch,
        handleCloseSearch,
    }
}
