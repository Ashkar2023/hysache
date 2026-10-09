import { createContext, useContext, useRef } from 'react'
import { useLocation } from 'react-router'

const NavigationAnimationDelayContext = createContext(0)
const SUBSEQUENT_NAVIGATION_DELAY = 800

export function NavigationAnimationDelayProvider({ children }) {
    const location = useLocation()
    const initialPathname = useRef(location.pathname)
    const hasNavigated = useRef(false)

    if (location.pathname !== initialPathname.current) {
        hasNavigated.current = true
    }

    const delay = hasNavigated.current ? SUBSEQUENT_NAVIGATION_DELAY : 0

    return (
        <NavigationAnimationDelayContext.Provider value={delay}>
            {children}
        </NavigationAnimationDelayContext.Provider>
    )
}

export default function useNavigationAnimationDelay() {
    return useContext(NavigationAnimationDelayContext)
}
