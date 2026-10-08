import { useLenis } from 'lenis/react'
import { useLocation, useNavigate } from 'react-router'
import { scrollToHash } from '../lib/scroll.js'

export default function useSiteNavigation() {
    const lenis = useLenis()
    const location = useLocation()
    const routerNavigate = useNavigate()

    return function navigate(event, target) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        event.preventDefault()

        const isHomeHash = target.startsWith('/#')

        if (isHomeHash && location.pathname === '/') {
            const hash = target.slice(1)
            if (!scrollToHash(hash, lenis)) return

            window.history.replaceState(null, '', target)
            return
        }

        routerNavigate(target)
    }
}

