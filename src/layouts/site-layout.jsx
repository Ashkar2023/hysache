import { useEffect, useLayoutEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { Outlet, useLocation } from 'react-router'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import WhatsAppButton from '../components/whatsapp-button.jsx'
import useReducedMotion from '../hooks/use-reduced-motion.js'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { scrollToHash, scrollToTop } from '../lib/scroll.js'

const LENIS_OPTIONS = { lerp: 0.08, wheelMultiplier: 0.9, touchMultiplier: 0.9, autoRaf: false }

function SiteShell() {
    const location = useLocation()
    const lenis = useLenis()
    const main = useRef(null)
    const reduced = useReducedMotion()

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            if (location.hash) {
                scrollToHash(location.hash, lenis)
            } else {
                scrollToTop(lenis)
            }
        })

        return () => window.cancelAnimationFrame(frame)
    }, [lenis, location.hash, location.pathname])

    useLayoutEffect(() => {
        if (reduced) {
            gsap.set(main.current, { clearProps: 'transform' })
            return
        }

        const context = gsap.context(() => {
            gsap.fromTo(main.current,
                { scaleX: 1 },
                {
                    scaleX: 0.95,
                    ease: 'none',
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: main.current,
                        start: 'bottom bottom',
                        end: 'bottom 10%',
                        scrub: true,
                        invalidateOnRefresh: true,
                        onToggle: (self) => {
                            main.current.style.willChange = self.isActive ? 'transform' : ''
                        },
                        onLeaveBack: () => gsap.set(main.current, { clearProps: 'transform' }),
                    },
                },
            )
        }, main)

        const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
            window.cancelAnimationFrame(frame)
            context.revert()
        }
    }, [location.pathname, reduced])

    return (
        <>
            <Navbar />
            <main ref={main} id="main-content" className="page-content">
                <Outlet />
            </main>
            <Footer />
            {location.pathname === '/' && <WhatsAppButton />}
        </>
    )
}

function LenisSync() {
    useLenis(ScrollTrigger.update)
    return null
}

export default function SiteLayout() {
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

    if (reduced) return <SiteShell />

    return (
        <ReactLenis root ref={lenisRef} options={LENIS_OPTIONS}>
            <LenisSync />
            <SiteShell />
        </ReactLenis>
    )
}
