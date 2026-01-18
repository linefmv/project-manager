import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { highlightText } from './highlight'

describe('highlightText', () => {
    it('highlights case-insensitively', () => {
        const result = highlightText('Hello World', 'world')
        const { container } = render(<>{result}</>)

        const mark = container.querySelector('mark')
        expect(mark).toBeInTheDocument()
        expect(mark).toHaveTextContent('World')
    })

    it('highlights multiple occurrences', () => {
        const result = highlightText('test Test TEST', 'test')
        const { container } = render(<>{result}</>)

        const marks = container.querySelectorAll('mark')
        expect(marks).toHaveLength(3)
    })

    it('handles special regex characters in query without breaking', () => {
        const result = highlightText('Hello (World)', '(World)')
        const { container } = render(<>{result}</>)

        const mark = container.querySelector('mark')
        expect(mark).toBeInTheDocument()
        expect(mark).toHaveTextContent('(World)')
    })
})
