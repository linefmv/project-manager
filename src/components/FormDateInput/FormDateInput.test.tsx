import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { FormDateInput } from './FormDateInput'

afterEach(() => {
    cleanup()
})

describe('FormDateInput', () => {
    it('renders correctly with label', () => {
        render(<FormDateInput label="Data de início" />)
        expect(screen.getByText('Data de início')).toBeInTheDocument()
        expect(screen.queryByText('(Obrigatório)')).not.toBeInTheDocument()
    })

    it('renders with required indicator when required prop is true', () => {
        render(<FormDateInput label="Data de início" required />)
        expect(screen.getByText('(Obrigatório)')).toBeInTheDocument()
    })

    it('displays error message when error prop is provided', () => {
        const errorMessage = 'Campo obrigatório'
        render(<FormDateInput label="Data de início" error={errorMessage} />)
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('renders the input element', () => {
        render(<FormDateInput label="Data de início" name="start_date" />)
        const input = screen.getByLabelText('Data de início')
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('name', 'start_date')
    })

    it('applies error styles to label and input', () => {
        render(<FormDateInput label="Data de início" error="Erro" />)
        const input = screen.getByLabelText('Data de início')
        const labelSpan = screen.getByText('Data de início')

        expect(input).toHaveClass('border-error-border')
        expect(labelSpan).toHaveClass('text-error-label')
    })
})
