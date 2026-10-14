import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { createBrowserRouter, Outlet } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { NavigationAnimationDelayProvider } from './hooks/use-navigation-animation-delay.jsx'
import useReducedMotion from './hooks/use-reduced-motion.js'
import SiteLayout from './layouts/site-layout.jsx'
import { gsap, ScrollTrigger } from './lib/gsap.js'
import CollectionsPage from './pages/collections-page.jsx'
import ContactPage from './pages/contact-page.jsx'
import GalleryPage from './pages/gallery-page.jsx'
import HomePage from './pages/home-page.jsx'
import NotFoundPage from './pages/404.jsx'

const LENIS_OPTIONS = { lerp: 0.08, wheelMultiplier: 0.9, touchMultiplier: 0.9, autoRaf: false }

function LenisSync() {
    useLenis(ScrollTrigger.update)
    return null
}

function SiteShell() {
    const reduced = useReducedMotion()
    const lenisRef = useRef(null)

    useEffect(() => {
        if (reduced) return

        const tick = (time) => lenisRef.current?.lenis?.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        const lenis = lenisRef.current?.lenis
        lenis?.on('scroll', ScrollTrigger.update)

        return () => {
            gsap.ticker.remove(tick)
            lenis?.off('scroll', ScrollTrigger.update)
        }
    }, [reduced])

    if (reduced) {
        return (
            <NavigationAnimationDelayProvider>
                <Outlet />
            </NavigationAnimationDelayProvider>
        )
    }

    return (
        <NavigationAnimationDelayProvider>
            <ReactLenis root ref={lenisRef} options={LENIS_OPTIONS}>
                <LenisSync />
                <Outlet />
            </ReactLenis>
        </NavigationAnimationDelayProvider>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <SiteShell />,
        children: [
            {
                element: <SiteLayout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: 'contact',
                        element: <ContactPage />,
                    },
                    {
                        path: 'collections',
                        element: <CollectionsPage />,
                    },
                    {
                        path: 'gallery',
                        element: <GalleryPage />,
                    },
                    {
                        path: '*',
                        element: <NotFoundPage />,
                    },
                ],
            },
        ],
    },
])

export default function App() {
    return <RouterProvider router={router} />
}
