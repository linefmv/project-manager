import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'

export function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
            <div className="bg-primary-purple/10 p-8 rounded-full mb-6 animate-bounce-slow">
                <FileQuestion size={64} className="text-primary-purple" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Ops! Nada por aqui.
            </h1>
            <Link
                to="/"
                className="bg-primary-purple text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
                Voltar para o Início
            </Link>
        </div>
    )
}
