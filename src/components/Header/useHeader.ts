import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useHeader() {
    const location = useLocation()
    const navigate = useNavigate()
    const isOnSearchPage = location.pathname === '/search'

    const isOnCreateOrEditPage =
        location.pathname === '/projects/new' ||
        location.pathname.match(/^\/projects\/[^/]+\/edit$/)

    const [isSearchOpen, setIsSearchOpen] = useState(isOnSearchPage)

    useEffect(() => {
        setIsSearchOpen(isOnSearchPage)
    }, [isOnSearchPage])

    const handleOpenSearch = () => {
        setIsSearchOpen(true)
    }

    const handleCloseSearch = () => {
        setIsSearchOpen(false)
        if (isOnSearchPage) {
            navigate('/')
        }
    }

    return {
        isSearchOpen,
        handleOpenSearch,
        handleCloseSearch,
        shouldShowSearchIcon: !isOnCreateOrEditPage,
    }
}
