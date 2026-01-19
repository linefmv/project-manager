import { Spinner } from '../Spinner/Spinner'

export function LoadingOverlay() {
    return (
        <div className="fixed inset-0 top-20 bg-background-light/80 flex items-center justify-center z-10">
            <Spinner size="lg" />
        </div>
    )
}
