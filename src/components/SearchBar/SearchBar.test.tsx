import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { SearchBar } from './SearchBar'

vi.mock('../../hooks/useSearchHistory', () => ({
    useSearchHistory: () => ({
        history: ['projeto teste', 'outro projeto'],
        addSearch: vi.fn(),
        removeSearch: vi.fn(),
    }),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

const renderSearchBar = (onClose = vi.fn()) => {
    return render(
        <BrowserRouter>
            <SearchBar onClose={onClose} />
        </BrowserRouter>
    )
}

afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})

describe('SearchBar', () => {
    it('shows validation message when query has less than 3 characters', () => {
        renderSearchBar()

        const input = screen.getByPlaceholderText('Digite o nome do projeto...')
        fireEvent.change(input, { target: { value: 'ab' } })

        expect(screen.getByText('Digite pelo menos 3 caracteres')).toBeInTheDocument()
    })

    it('navigates to search results on valid form submit', () => {
        renderSearchBar()

        const input = screen.getByPlaceholderText('Digite o nome do projeto...')
        fireEvent.change(input, { target: { value: 'projeto teste' } })

        const form = input.closest('form')!
        fireEvent.submit(form)

        expect(mockNavigate).toHaveBeenCalledWith('/search?q=projeto%20teste')
    })

    it('does not navigate when query is too short', () => {
        renderSearchBar()

        const input = screen.getByPlaceholderText('Digite o nome do projeto...')
        fireEvent.change(input, { target: { value: 'ab' } })

        const form = input.closest('form')!
        fireEvent.submit(form)

        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('closes on Escape key press', () => {
        const onClose = vi.fn()
        renderSearchBar(onClose)

        fireEvent.keyDown(document, { key: 'Escape' })

        expect(onClose).toHaveBeenCalled()
    })

    it('closes when clicking outside', () => {
        const onClose = vi.fn()
        renderSearchBar(onClose)

        fireEvent.mouseDown(document.body)

        expect(onClose).toHaveBeenCalled()
    })

    it('shows search history on focus when query is empty', async () => {
        renderSearchBar()

        const input = screen.getByPlaceholderText('Digite o nome do projeto...')
        fireEvent.focus(input)

        await waitFor(() => {
            expect(screen.getByText('projeto teste')).toBeInTheDocument()
        })
    })

    it('navigates when clicking a history item', async () => {
        renderSearchBar()

        const input = screen.getByPlaceholderText('Digite o nome do projeto...')
        fireEvent.focus(input)

        await waitFor(() => {
            expect(screen.getByText('projeto teste')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('projeto teste'))

        expect(mockNavigate).toHaveBeenCalledWith('/search?q=projeto%20teste')
    })
})
