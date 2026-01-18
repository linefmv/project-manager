interface SearchIconProps {
    size?: number
    className?: string
}

export function SearchIcon({ size = 24, className = '' }: SearchIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M16 16L20 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}
