import React from 'react'

export function highlightText(text: string, query: string): React.ReactNode {
    if (!query.trim()) return text

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'))

    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <mark
                key={index}
                className="bg-accent-orange/30 text-text-primary rounded px-0.5"
            >
                {part}
            </mark>
        ) : (
            part
        )
    )
}
