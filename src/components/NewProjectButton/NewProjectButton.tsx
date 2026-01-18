import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface NewProjectButtonProps {
    size?: 'default' | 'large'
    className?: string
    onClick?: () => void
}

export function NewProjectButton({ className, size = 'default', onClick }: NewProjectButtonProps) {
    const baseStyles = "flex items-center justify-center gap-2 bg-primary-purple text-white rounded-button hover:bg-opacity-90 transition-all group"

    const sizeStyles = {
        default: "h-[40px] px-6 text-[16px] leading-[24px]",
        large: "w-[230px] h-[52px] text-[20px] leading-[22px]"
    }

    const content = (
        <>
            <div className="bg-transparent border border-white rounded-full p-[2px] transition-transform group-hover:scale-110">
                <Plus size={16} strokeWidth={3} />
            </div>
            <span className="font-normal">Novo projeto</span>
        </>
    )

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={twMerge(baseStyles, sizeStyles[size], className)}
            >
                {content}
            </button>
        )
    }

    return (
        <Link
            to="/projects/new"
            className={twMerge(baseStyles, sizeStyles[size], className)}
        >
            {content}
        </Link>
    )
}
