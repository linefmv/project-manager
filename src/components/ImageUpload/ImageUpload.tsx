import { Trash2 } from 'lucide-react'
import { UploadIcon } from '../Icons'
import { useImageUpload } from '../../hooks/useImageUpload'

interface ImageUploadProps {
    label: string
    value?: string
    onChange: (file: File | null) => void
    error?: string
}

export function ImageUpload({ label, value, onChange, error }: ImageUploadProps) {
    const {
        preview,
        validationError,
        inputRef,
        handleFileChange,
        handleRemove,
        handleClick,
    } = useImageUpload(value)

    const displayError = error || validationError

    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg leading-[22px] font-medium text-primary-purple">
                {label}
            </label>

            {preview ? (
                <div className="relative rounded">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-[174px] object-cover rounded"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemove(onChange)}
                        className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-md shadow-md hover:bg-white transition-colors"
                    >
                        <Trash2 size={18} className="text-primary-purple" />
                    </button>
                </div>
            ) : (
                <div
                    className="h-[174px] rounded border border-dashed border-text-secondary flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary-purple transition-colors"
                    onClick={handleClick}
                >
                    <UploadIcon size={24} className="text-text-secondary" />
                    <p className="text-base leading-[22px] text-text-secondary text-center max-w-sm">
                        Escolha uma imagem .jpg ou .png no seu dispositivo
                    </p>
                    <button
                        type="button"
                        className="h-10 px-8 bg-white border border-primary-purple rounded-button text-primary-purple text-base leading-6 hover:bg-primary-purple/5 transition-colors"
                    >
                        Selecionar
                    </button>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleFileChange(e, onChange)}
                className="hidden"
            />

            {displayError && (
                <span className="text-sm leading-[22px] text-error-text">
                    {displayError}
                </span>
            )}
        </div>
    )
}
