import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
    getSearchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
    clearSearchHistory
} from './storage'

describe('storage utils', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.clearAllMocks()
    })

    describe('getSearchHistory', () => {
        it('returns empty array when no history exists', () => {
            expect(getSearchHistory()).toEqual([])
        })

        it('returns stored history', () => {
            localStorage.setItem('search_history', JSON.stringify(['test']))
            expect(getSearchHistory()).toEqual(['test'])
        })
    })

    describe('addToSearchHistory', () => {
        it('adds new item to history', () => {
            addToSearchHistory('project a')
            expect(getSearchHistory()).toEqual(['project a'])
        })

        it('adds item to beginning of list', () => {
            addToSearchHistory('first')
            addToSearchHistory('second')
            expect(getSearchHistory()).toEqual(['second', 'first'])
        })

        it('ignores duplicates and moves existing to top', () => {
            addToSearchHistory('first')
            addToSearchHistory('second')
            addToSearchHistory('first')
            expect(getSearchHistory()).toEqual(['first', 'second'])
        })

        it('limits history to 5 items', () => {
            for (let i = 1; i <= 6; i++) {
                addToSearchHistory(`item ${i}`)
            }
            const history = getSearchHistory()
            expect(history).toHaveLength(5)
            expect(history[0]).toBe('item 6')
            expect(history[4]).toBe('item 2')
        })

        it('ignores short queries (< 3 chars)', () => {
            addToSearchHistory('ab')
            expect(getSearchHistory()).toEqual([])
        })
    })

    describe('removeFromSearchHistory', () => {
        it('removes item from history', () => {
            addToSearchHistory('item 1')
            addToSearchHistory('item 2')
            removeFromSearchHistory('item 1')
            expect(getSearchHistory()).toEqual(['item 2'])
        })
    })

    describe('clearSearchHistory', () => {
        it('clears all history', () => {
            addToSearchHistory('item 1')
            clearSearchHistory()
            expect(getSearchHistory()).toEqual([])
        })
    })
})
