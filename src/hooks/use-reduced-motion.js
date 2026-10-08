import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export default function useReducedMotion() {
    const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION_QUERY).matches)

    useEffect(() => {
        const media = window.matchMedia(REDUCED_MOTION_QUERY)
        const update = () => setReduced(media.matches)
        media.addEventListener('change', update)
        return () => media.removeEventListener('change', update)
    }, [])

    return reduced
}

