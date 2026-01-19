import { describe, it, expect } from 'vitest'
import { validateName, validateClient, validateStartDate, validateEndDate } from './validators'

describe('validators', () => {
    describe('validateName', () => {
        it('validates at least two words', () => {
            expect(validateName('Project Name')).toBe(true)
            expect(validateName('Name')).toBe('Por favor, digite ao menos duas palavras')
            expect(validateName('')).toBe('Por favor, digite ao menos duas palavras')
            expect(validateName('   ')).toBe('Por favor, digite ao menos duas palavras')
        })
    })

    describe('validateClient', () => {
        it('validates at least one word', () => {
            expect(validateClient('Client')).toBe(true)
            expect(validateClient('New Client')).toBe(true)
            expect(validateClient('')).toBe('Por favor, digite ao menos uma palavra')
            expect(validateClient('   ')).toBe('Por favor, digite ao menos uma palavra')
        })
    })

    describe('validateStartDate', () => {
        const minDate = '2024-01-01'

        it('allows today or future dates', () => {
            expect(validateStartDate('2024-01-01', minDate)).toBe(true)
            expect(validateStartDate('2024-01-02', minDate)).toBe(true)
        })

        it('rejects past dates', () => {
            expect(validateStartDate('2023-12-31', minDate)).toBe('Selecione uma data válida')
        })
    })

    describe('validateEndDate', () => {
        const minDate = '2024-01-01'
        const startDate = '2024-02-01'

        it('rejects dates before minDate', () => {
            expect(validateEndDate('2023-12-31', minDate)).toBe('Selecione uma data válida')
        })

        it('rejects dates before startDate', () => {
            expect(validateEndDate('2024-01-15', minDate, startDate)).toBe('Selecione uma data válida')
        })

        it('accepts valid dates', () => {
            expect(validateEndDate('2024-02-02', minDate, startDate)).toBe(true)
            expect(validateEndDate('2024-02-01', minDate, startDate)).toBe(true)
        })
    })
})
