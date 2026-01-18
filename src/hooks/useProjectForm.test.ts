import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProjectForm } from './useProjectForm'

const mockOnSubmit = vi.fn()

describe('useProjectForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('initialization', () => {
        it('initializes with invalid state when no values provided', () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            expect(result.current.isValid).toBe(false)
            expect(result.current.isSubmitting).toBe(false)
            expect(result.current.hasUnsavedChanges).toBe(false)
        })

        it('returns minDate as today', () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            const today = new Date().toISOString().split('T')[0]
            expect(result.current.minDate).toBe(today)
        })

        it('initializes errors as empty object', () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            expect(result.current.errors).toEqual({})
        })
    })

    describe('cover image handling', () => {
        it('sets coverImageFile when file is provided', async () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            const file = new File(['test'], 'test.png', { type: 'image/png' })

            await act(async () => {
                await result.current.setCoverImageFile(file)
            })

            expect(result.current.coverImageFile).toBe(file)
        })

        it('marks form as having unsaved changes when image is added', async () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            expect(result.current.hasUnsavedChanges).toBe(false)

            const file = new File(['test'], 'test.png', { type: 'image/png' })

            await act(async () => {
                await result.current.setCoverImageFile(file)
            })

            expect(result.current.hasUnsavedChanges).toBe(true)
        })

        it('clears coverImageFile when null is passed', async () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            const file = new File(['test'], 'test.png', { type: 'image/png' })

            await act(async () => {
                await result.current.setCoverImageFile(file)
            })

            await act(async () => {
                await result.current.setCoverImageFile(null)
            })

            expect(result.current.coverImageFile).toBe(null)
        })
    })

    describe('register fields', () => {
        it('returns register object with all required fields', () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            expect(result.current.register.name).toBeDefined()
            expect(result.current.register.client).toBeDefined()
            expect(result.current.register.startDate).toBeDefined()
            expect(result.current.register.endDate).toBeDefined()
        })

        it('each register field has name property', () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            expect(result.current.register.name.name).toBe('name')
            expect(result.current.register.client.name).toBe('client')
            expect(result.current.register.startDate.name).toBe('startDate')
            expect(result.current.register.endDate.name).toBe('endDate')
        })
    })

    describe('form state', () => {
        it('returns onSubmitForm function', () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            expect(typeof result.current.onSubmitForm).toBe('function')
        })

        it('isSubmitting starts as false', () => {
            const { result } = renderHook(() =>
                useProjectForm({ onSubmit: mockOnSubmit })
            )

            expect(result.current.isSubmitting).toBe(false)
        })
    })
})
