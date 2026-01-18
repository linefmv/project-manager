import { useEffect, useRef, RefObject } from 'react'

export function useClickOutside<T extends HTMLElement>(
    onClickOutside: () => void,
    additionalRefs?: RefObject<HTMLElement | null>[]
): RefObject<T> {
    const ref = useRef<T>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node
            const isInsideMainRef = ref.current?.contains(target)
            const isInsideAdditionalRefs = additionalRefs?.some(
                additionalRef => additionalRef.current?.contains(target)
            )

            if (!isInsideMainRef && !isInsideAdditionalRefs) {
                onClickOutside()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClickOutside, additionalRefs])

    return ref
}
