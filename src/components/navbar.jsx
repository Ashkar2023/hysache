import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useLocation } from 'react-router'
import { NAV_BREAKPOINT } from '../config/layout.js'
import { CONTACT_EMAIL, GOOGLE_MAPS_URL, INSTAGRAM_URL, MAIN_NAVIGATION, WHATSAPP_URL } from '../config/site.js'
import useNavigationAnimationDelay from '../hooks/use-navigation-animation-delay.jsx'
import useSiteNavigation from '../hooks/use-site-navigation.js'
import Logo from './logo.jsx'

// the duration of the navbar menu close seems to end faster cause of the cubic bezier. so keep this slightly earlier. it feels smooth
const MOBILE_MENU_TRANSITION_MS = 400

export default function Navbar() {
    const lenis = useLenis()
    const siteNavigate = useSiteNavigation()
    const navigationAnimationDelay = useNavigationAnimationDelay()
    const location = useLocation()
    const header = useRef(null)
    const toggle = useRef(null)
    const menu = useRef(null)
    const navigationTimer = useRef(null)
    const [open, setOpen] = useState(false)

    useEffect(() => () => window.clearTimeout(navigationTimer.current), [])

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

    function navigateAfterMenuClose(event, target) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        event.preventDefault()
        setOpen(false)
        window.clearTimeout(navigationTimer.current)
        navigationTimer.current = window.setTimeout(() => {
            lenis?.start()
            siteNavigate(null, target)
            navigationTimer.current = null
        }, MOBILE_MENU_TRANSITION_MS)
    }

    function toggleMenu() {
        if (!open) {
            window.clearTimeout(navigationTimer.current)
            navigationTimer.current = null
        }
        setOpen(!open)
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
                    className="col-start-3 row-start-1 flex h-11 w-[38px] cursor-pointer flex-col items-end justify-center justify-self-end gap-1.5 text-inherit nav:hidden"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={toggleMenu}
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

            <div
                id="mobile-menu"
                ref={menu}
                className={`fixed inset-x-0 top-0 z-40 flex h-[80svh] flex-col justify-between bg-nav-bg px-[8%] pb-10 pt-[120px] text-nav-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] nav:hidden ${open ? 'translate-y-0' : '-translate-y-full pointer-events-none'}`}
                role="dialog"
                aria-modal={open ? 'true' : undefined}
                aria-hidden={!open}
                aria-label="Navigation menu"
                inert={!open}
            >
                <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
                    {MAIN_NAVIGATION.map(([label, href]) => (
                        <a
                            key={href}
                            href={href}
                            className="flex items-center text-[clamp(28px,7vw,48px)] font-light"
                            onClick={(event) => navigateAfterMenuClose(event, href)}
                        >
                            {label}
                            <span className="ml-auto text-2xl">↗</span>
                        </a>
                    ))}
                </nav>

                <div>
                    <p className="eyebrow mb-6">Homegrown luxe.</p>
                    <div className="flex items-center justify-start gap-6">
                        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="transition-colors duration-300 hover:text-cream" aria-label="Message Hysache on WhatsApp">
                            <svg className="size-[21px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M20 11.6a8 8 0 0 1-12 6.94L4 19.6l1.14-3.88A8 8 0 1 1 20 11.6Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M9.33 7.4c-.38-.38-1.14 0-1.3.76-.45 2.66 3.8 6.84 6.46 7.22.76-.15 1.14-.91.76-1.3l-1.52-1.14c-.38-.22-.76.61-1.14.54-.99-.31-2.05-1.37-2.36-2.36-.07-.38.76-.76.54-1.14L9.33 7.4Z" fill="currentColor" />
                            </svg>
                        </a>
                        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="transition-colors duration-300 hover:text-cream" aria-label="Follow Hysache on Instagram">
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
                            </svg>
                        </a>
                        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="transition-colors duration-300 hover:text-cream" aria-label="Find Hysache on Google Maps">
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </a>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors duration-300 hover:text-cream" aria-label="Email Hysache">
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="2.75" y="5" width="18.5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
