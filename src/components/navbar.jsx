import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useLocation } from 'react-router'
import { NAV_BREAKPOINT } from '../config/layout.js'
import { MAIN_NAVIGATION } from '../config/site.js'
import useNavigationAnimationDelay from '../hooks/use-navigation-animation-delay.jsx'
import useSiteNavigation from '../hooks/use-site-navigation.js'
import Logo from './logo.jsx'

export default function Navbar() {
    const lenis = useLenis()
    const siteNavigate = useSiteNavigation()
    const navigationAnimationDelay = useNavigationAnimationDelay()
    const location = useLocation()
    const header = useRef(null)
    const toggle = useRef(null)
    const menu = useRef(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const update = () => {
            const opacity = location.pathname === '/'
                ? Math.min(1, Math.max(0, window.scrollY / 120))
                : 1
            header.current?.style.setProperty('--nav-opacity', opacity)
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [location.pathname])

    useEffect(() => {
        if (!open) return

        lenis?.stop()
        const toggleElement = toggle.current
        const background = [...document.querySelectorAll('main, footer, [data-menu-background]')]
        const previousOverflow = document.body.style.overflow

        background.forEach((element) => { element.inert = true })
        document.body.style.overflow = 'hidden'
        menu.current?.querySelector('a')?.focus()

        const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false) }
        const onResize = () => { if (window.innerWidth >= NAV_BREAKPOINT) setOpen(false) }
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('resize', onResize)

        return () => {
            lenis?.start()
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('resize', onResize)
            background.forEach((element) => { element.inert = false })
            toggleElement?.focus()
        }
    }, [open, lenis])

    function navigate(event, target) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        setOpen(false)
        lenis?.start()
        siteNavigate(event, target)
    }

    const barLine = 'block h-px w-6 bg-current transition-transform'

    return (
        <>
            <header
                ref={header}
                className={`fixed inset-x-0 top-0 z-50 grid h-20 grid-cols-[1fr_auto_1fr] items-center bg-[rgb(111_29_51/var(--nav-opacity))] px-6 text-nav-accent [--nav-opacity:0] nav:px-[3.5%] ${open ? 'max-nav:bg-nav-bg' : ''}`}
            >
                <nav
                    className="hidden gap-[clamp(16px,2vw,34px)] nav:flex"
                    key={location.pathname}
                    aria-label="Main navigation"
                >
                    {MAIN_NAVIGATION.map(([label, href], index) => (
                        <a
                            key={href}
                            href={href}
                            className="desktop-nav-item nav-link-roll small-caps py-3"
                            style={{ '--nav-item-delay': `${120 + navigationAnimationDelay + index * 80}ms` }}
                            onClick={(event) => navigate(event, href)}
                        >
                            <span className="nav-link-roll-text">
                                <span className="nav-link-roll-label">{label}</span>
                                <span className="nav-link-roll-label nav-link-roll-label-clone" aria-hidden="true">{label}</span>
                            </span>
                        </a>
                    ))}
                </nav>

                <button
                    ref={toggle}
                    className="col-start-1 row-start-1 flex h-11 w-[38px] cursor-pointer flex-col justify-center gap-1.5 text-inherit nav:hidden"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen(!open)}
                >
                    <span className={`${barLine} ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
                    <span className={`${barLine} ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
                </button>

                <a
                    className="brand-link col-start-2 flex items-center gap-2.5 p-[7px]"
                    href="/#home"
                    aria-label="Hysache home"
                    data-menu-background
                    onClick={(event) => navigate(event, '/#home')}
                >
                    <Logo className="brand-logo" />
                </a>
            </header>

            {open && (
                <div
                    id="mobile-menu"
                    ref={menu}
                    className="fixed inset-0 z-40 flex flex-col justify-center bg-nav-bg px-[8%] pb-10 pt-[120px] text-nav-accent nav:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                >
                    <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
                        {MAIN_NAVIGATION.map(([label, href], index) => (
                            <a
                                key={href}
                                href={href}
                                className="flex items-baseline gap-5 text-[clamp(28px,7vw,48px)] font-light"
                                onClick={(event) => navigate(event, href)}
                            >
                                <span className="text-[9px] tracking-[.15em]">0{index + 1}</span>
                                {label}
                                <span className="ml-auto text-2xl">↗</span>
                            </a>
                        ))}
                    </nav>
                    <p className="eyebrow mt-16">A quieter kind of beautiful.</p>
                </div>
            )}
        </>
    )
}
