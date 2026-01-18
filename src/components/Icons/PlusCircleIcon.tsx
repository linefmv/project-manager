interface PlusCircleIconProps {
    className?: string
    size?: number
}

export function PlusCircleIcon({ className = '', size = 24 }: PlusCircleIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M12 8V16M8 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
}
