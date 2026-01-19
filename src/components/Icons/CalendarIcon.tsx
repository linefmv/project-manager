interface CalendarIconProps {
    className?: string
    size?: number
    variant?: 'start' | 'end'
}

export const CalendarIcon = ({ className = '', size = 24, variant = 'start' }: CalendarIconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect x="3" y="6" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
            <line x1="7" y1="3" x2="7" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="3" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {variant === 'start' ? (
                <rect x="7" y="14" width="5" height="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            ) : (
                <polyline points="9,15 11,17 15,13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            )}
        </svg>
    )
}
