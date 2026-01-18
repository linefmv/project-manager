interface PlaceholderIconProps {
    className?: string
    size?: number
}

export function PlaceholderIcon({ className = '', size = 64 }: PlaceholderIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect
                x="8"
                y="12"
                width="36"
                height="28"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
            <rect
                x="20"
                y="24"
                width="36"
                height="28"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
            <line
                x1="8"
                y1="40"
                x2="44"
                y2="40"
                stroke="currentColor"
                strokeWidth="2"
            />
            <line
                x1="20"
                y1="52"
                x2="56"
                y2="52"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    )
}
