import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
    it('formats date correctly for pt-BR locale', () => {
        const output = formatDate('2023-10-15')
        expect(output).toBe('15 de outubro de 2023')
    })

    it('handles start of year', () => {
        const output = formatDate('2024-01-01')
        expect(output).toBe('01 de janeiro de 2024')
    })

    it('handles end of year', () => {
        const output = formatDate('2024-12-31')
        expect(output).toBe('31 de dezembro de 2024')
    })
})
