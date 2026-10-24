import { useLayoutEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { Outlet, useLocation } from 'react-router'
import CursorTrail from '../components/cursor-trail.jsx'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import WhatsAppButton from '../components/whatsapp-button.jsx'
import useReducedMotion from '../hooks/use-reduced-motion.js'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { scrollToHash, scrollToTop } from '../lib/scroll.js'

export default function SiteLayout() {
    const location = useLocation()
    const lenis = useLenis()
    const main = useRef(null)
    const reduced = useReducedMotion()

    useLayoutEffect(() => {
        if (location.hash) {
            scrollToHash(location.hash, lenis)
        } else {
            scrollToTop(lenis)
        }
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
                        refreshPriority: -1,
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
            gsap.set(main.current, { clearProps: 'transform,willChange' })
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
            <CursorTrail />
        </>
    )
}
