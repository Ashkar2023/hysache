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

        const targetUrl = new URL(target, window.location.href)
        const isSameRoute = targetUrl.pathname === location.pathname

        if (isSameRoute) {
            if (!targetUrl.hash) return
            if (!scrollToHash(targetUrl.hash, lenis)) return

            window.history.replaceState(null, '', target)
            return
        }

        routerNavigate(target, { viewTransition: true })
    }
}
