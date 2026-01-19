interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
    return (
        <div
            className={`animate-spin rounded-full border-b-[3px] border-primary-purple ${sizeClasses[size]} ${className}`}
        />
    )
}
