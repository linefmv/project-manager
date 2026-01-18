interface MoreIconProps {
    className?: string
    size?: number
}

export function MoreIcon({ className = '', size = 16 }: MoreIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="2" cy="2" r="2" fill="currentColor" />
            <circle cx="8" cy="2" r="2" fill="currentColor" />
            <circle cx="14" cy="2" r="2" fill="currentColor" />
        </svg>
    )
}
