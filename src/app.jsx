import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import logoMarkup from './assets/logo.svg?raw'
import heroImage from './assets/images/1.png'
import houseImage from './assets/images/house.png'
import collectionImage from './assets/images/collections.png'
import craftImage from './assets/images/craft.png'
import storyVideo from './assets/videos/2.mp4'

/* -------------------------------------------------------------------------- */
/*  Config & content                                                          */
/* -------------------------------------------------------------------------- */

const LENIS_OPTIONS = { lerp: 0.08, wheelMultiplier: 0.9, touchMultiplier: 0.9, autoRaf: true }
const COPYRIGHT_YEAR = new Date().getFullYear()
const HEADER_OFFSET = 80
const DESKTOP_BREAKPOINT = 900 // keep in sync with --breakpoint-nav in index.css

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

const NAVIGATION = [
    ['Home', '#home'],
    ['About', '#about'],
    ['Collections', '#collections'],
    ['Contact', '#contact'],
]

const SECTIONS = [
    {
        id: 'about',
        image: houseImage,
        alt: 'An intimate glimpse into the world of Hysache',
        eyebrow: '01 — The house of Hysache',
        title: <>Rooted in tradition.<br />Made for your everyday.</>,
        copy: 'We believe the things you wear should feel like you. Thoughtful silhouettes, familiar textures, and a little of the extraordinary — woven into the everyday.',
        link: 'Our story',
        href: '#craft',
    },
    {
        id: 'collections',
        image: collectionImage,
        alt: 'Kurtis from the Hysache collection, with considered details and relaxed shapes',
        eyebrow: '02 — A considered wardrobe',
        title: <>For moments.<br />For years.</>,
        copy: 'Easy shapes. Quiet details. Pieces that move with you, from slow mornings to evenings that linger. Discover our expression of modern Indian dressing.',
        link: 'Explore the craft',
        href: '#craft',
        reverse: true,
    },
    {
        id: 'craft',
        image: craftImage,
        alt: 'A close look at the fabric and handwork behind a Hysache kurti',
        eyebrow: '03 — The art of making',
        title: <>Care in every thread.</>,
        copy: 'It begins with the fabric, and lives in the details. A patient process, a thoughtful finish, and a respect for the hands that bring each piece to life.',
        link: 'Get in touch',
        href: '#contact',
    },
]

const FOOTER_EXPLORE = [
    ['Home', '#home'],
    ['Our story', '#about'],
    ['Collections', '#collections'],
]

const inlineLogo = logoMarkup
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/fill="#[^"]*"/g, 'fill="currentColor"')

/* Shared Tailwind class strings */
const SMALL_CAPS = 'text-[10px] font-normal uppercase tracking-[.19em]'
const EYEBROW = `${SMALL_CAPS} leading-[1.8]`
const FOOTER_LINK = 'mb-3.5 block w-fit text-xs'

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function useReducedMotion() {
    const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION_QUERY).matches)

    useEffect(() => {
        const media = window.matchMedia(REDUCED_MOTION_QUERY)
        const update = () => setReduced(media.matches)
        media.addEventListener('change', update)
        return () => media.removeEventListener('change', update)
    }, [])

    return reduced
}

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function Logo({ className = '' }) {
    return (
        <span
            className={`block w-12 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:fill-current ${className}`}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: inlineLogo }}
        />
    )
}

function Reveal({ children, className = '' }) {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (reduced || !('IntersectionObserver' in window)) {
            setVisible(true)
            return
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true)
                observer.disconnect()
            }
        }, { threshold: 0.20 })
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [reduced])

    return (
        <div
            ref={ref}
            className={`transition-[opacity,transform] duration-[900ms] ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
        >
            {children}
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */

function Navbar() {
    const lenis = useLenis()
    const header = useRef(null)
    const toggle = useRef(null)
    const menu = useRef(null)
    const [open, setOpen] = useState(false)

    // Fade the header background in on scroll. A CSS variable avoids re-rendering every frame.
    useEffect(() => {
        const update = () => {
            const opacity = Math.min(1, Math.max(0, window.scrollY / 120))
            header.current?.style.setProperty('--nav-opacity', opacity)
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])

    // While the mobile menu is open: freeze scrolling, hide the page from assistive tech, close on Escape / resize.
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
        const onResize = () => { if (window.innerWidth >= DESKTOP_BREAKPOINT) setOpen(false) }
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
        event.preventDefault()
        setOpen(false)
        lenis?.start()

        if (lenis) {
            lenis.scrollTo(target, { offset: -HEADER_OFFSET })
        } else {
            const top = document.querySelector(target).getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
            window.scrollTo({ top, behavior: 'instant' })
        }
        window.history.replaceState(null, '', target)
    }

    const barLine = 'block h-px w-6 bg-current transition-transform'

    return (
        <>
            <header
                ref={header}
                className={`fixed inset-x-0 top-0 z-50 grid h-20 grid-cols-[1fr_auto_1fr] items-center bg-[rgb(111_29_51/var(--nav-opacity))] px-6 text-nav-accent [--nav-opacity:0] nav:px-[3.5%] ${open ? 'max-nav:bg-nav-bg' : ''}`}
            >
                <nav className="hidden gap-[clamp(16px,2vw,34px)] nav:flex" aria-label="Main navigation">
                    {NAVIGATION.map(([label, href]) => (
                        <a key={href} href={href} className={`nav-link-roll py-3 ${SMALL_CAPS}`} onClick={(event) => navigate(event, href)}>
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
                    href="#home"
                    aria-label="Hysache home"
                    data-menu-background
                    onClick={(event) => navigate(event, '#home')}
                >
                    <Logo className="brand-logo" />
                    {/* <p className="text-3xl font-medium tracking-widest text-nav-accent">HYSACHE</p> */}
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
                        {NAVIGATION.map(([label, href], index) => (
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
                    <p className={`mt-16 ${EYEBROW}`}>A quieter kind of beautiful.</p>
                </div>
            )}
        </>
    )
}

/* -------------------------------------------------------------------------- */
/*  Page sections                                                             */
/* -------------------------------------------------------------------------- */

function Hero() {
    const title = useRef(null)
    const reduced = useReducedMotion()

    useLayoutEffect(() => {
        if (reduced) return

        const context = gsap.context(() => {
            const split = SplitText.create(title.current, {
                type: 'chars',
                mask: 'chars',
                charsClass: 'hero-title-char',
                tag: 'span',
                aria: 'hidden',
            })

            gsap.from(split.chars, {
                yPercent: 20,
                autoAlpha: 0,
                duration: 0.45,
                delay: 0.20,
                stagger: 0.06,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
            })
        }, title)

        return () => context.revert()
    }, [reduced])

    return (
        <section id="home" className="relative h-svh" aria-label="Hysache — thoughtfully made kurtis">
            <h1 className="sr-only">Hysache — a quieter kind of beautiful</h1>
            <img
                className="h-full w-full object-cover object-center select-none"
                src={heroImage}
                alt="Hysache kurti editorial, celebrating soft silhouettes and natural textures"
                fetchPriority="high"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/[.23] to-transparent to-30%" />
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none">
                <p
                    ref={title}
                    className="whitespace-nowrap font-extrabold leading-none text-[#f29494] text-[clamp(4rem,15vw,12.5rem)]"
                >
                    HYSACHE
                </p>
                <span
                    aria-hidden="true"
                    className="absolute uppercase right-1 bottom-0 leading-2 whitespace-nowrap text-[clamp(.3rem,.8vw,2rem)] font-light tracking-[.38em] text-[#f29494]"
                >
                    Homegrown Luxe
                </span>
            </div>
        </section>
    )
}

function StorySection() {
    const reduced = useReducedMotion()

    return (
        <section
            id="story"
            className="relative overflow-hidden px-[9%] py-24 text-cream nav:px-[clamp(35px,7vw,130px)] nav:py-36"
            aria-labelledby="story-title"
        >
            {!reduced && (
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={storyVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                />
            )}

            <div className="absolute inset-0 bg-nav-bg/65" aria-hidden="true" />

            <Reveal className="relative mx-auto max-w-[620px] text-center">
                <p className="mb-[34px] leading-[1.8] font-normal uppercase tracking-[.19em] text-xs">The Hysache story</p>

                <h2
                    id="story-title"
                    className="mb-7 text-[clamp(30px,5vw,56px)] font-light leading-[1.3] tracking-[-.045em]"
                >
                    Couture. <br /> Meant to be remembered.
                </h2>

                <p className="mx-auto text-sm leading-[1.95] opacity-90">
                    Hysache began with a simple idea: to create something thoughtful,
                    distinctive, and quietly beautiful. Every detail is considered with
                    care, shaped by a belief that the things we choose should feel as
                    meaningful as they look.
                </p>
            </Reveal>
        </section>
    )
}

function SplitSection({ id, image, alt, eyebrow, title, copy, link, href, reverse = false, number }) {
    const gutter = 'nav:px-[clamp(35px,7vw,130px)]'

    return (
        <section id={id} className="grid grid-cols-1 nav:min-h-screen nav:grid-cols-2" aria-labelledby={`${id}-title`}>
            <div className={`aspect-[4/5] overflow-hidden nav:aspect-auto nav:min-h-screen ${reverse ? 'nav:order-2' : ''}`}>
                <img className="h-full w-full object-cover" src={image} alt={alt} loading="lazy" decoding="async" />
            </div>

            <div className={`relative flex min-h-[520px] items-center justify-center px-[9%] pb-[100px] pt-20 nav:min-h-0 nav:py-[100px] ${gutter}`}>
                <Reveal className="w-full nav:max-w-[410px]">
                    <p className={`mb-[34px] ${EYEBROW}`}>{eyebrow}</p>
                    <h2
                        id={`${id}-title`}
                        className="mb-7 text-[clamp(30px,6vw,42px)] font-light leading-[1.3] tracking-[-.045em] nav:text-[clamp(28px,3vw,48px)]"
                    >
                        {title}
                    </h2>
                    <p className="mb-10 max-w-[345px] text-sm leading-[1.95] text-muted">{copy}</p>
                    <a className={`group inline-flex items-center gap-6 py-2 ${SMALL_CAPS}`} href={href}>
                        {link}
                        <span className="text-xl font-light transition-transform group-hover:translate-x-[5px]" aria-hidden="true">→</span>
                    </a>
                </Reveal>

                <span
                    className="absolute bottom-7 left-[9%] text-[8px] tracking-[.18em] text-faint nav:bottom-[35px] nav:left-[clamp(35px,7vw,130px)]"
                    aria-hidden="true"
                >
                    {number} / HYSACHE
                </span>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer id="contact" className="site-footer border-t border-line bg-footer-cream px-[7%] pb-6 flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 pb-[70px] nav:grid-cols-[2fr_1fr_1fr] nav:gap-[45px]">
                <div className="col-span-full nav:col-auto">
                    <Logo className="w-[60px] text-nav-bg" />
                    <p className="mt-[22px] text-xs text-footer-muted">A quieter kind of beautiful.</p>
                </div>

                <nav aria-label="Explore">
                    <p className={`mb-6 text-footer-muted ${EYEBROW}`}>Explore</p>
                    {FOOTER_EXPLORE.map(([label, href]) => (
                        <a key={href} href={href} className={FOOTER_LINK}>{label}</a>
                    ))}
                </nav>

                <div>
                    <p className={`mb-6 text-footer-muted ${EYEBROW}`}>Say hello</p>
                    <a href="mailto:hello@hysache.com" className={FOOTER_LINK}>hello@hysache.com ↗</a>
                    <a href="#craft" className={FOOTER_LINK}>Our craft →</a>
                </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-line pt-6 text-[9px] tracking-[.06em] text-footer-muted nav:flex-row nav:justify-between nav:gap-5">
                <span>© {COPYRIGHT_YEAR} Hysache. All rights reserved.</span>
                <span>Thoughtfully made. Beautifully worn.</span>
            </div>
        </footer>
    )
}

function WhatsAppButton() {
    // Replace the generic WhatsApp destination with the label's verified number before launch.
    return (
        <a
            className="fixed bottom-6 right-6 z-30 grid size-12 place-items-center rounded-full bg-nav-bg text-nav-accent"
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open WhatsApp"
            data-menu-background
        >
            <svg className="size-[29px]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M26 15.5a10.5 10.5 0 0 1-15.8 9.1L5 26l1.5-5.1A10.5 10.5 0 1 1 26 15.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 10c-.5-.5-1.5 0-1.7 1-.6 3.5 5 9 8.5 8.5 1-.2 1.5-1.2 1-1.7l-2-1.5c-.5-.3-1 .8-1.5.7-1.3-.4-2.7-1.8-3.1-3.1-.1-.5 1-1 .7-1.5L12 10Z" fill="currentColor" />
            </svg>
        </a>
    )
}

/* -------------------------------------------------------------------------- */
/*  App                                                                       */
/* -------------------------------------------------------------------------- */

function Page() {
    const main = useRef(null)
    const reduced = useReducedMotion()

    useLayoutEffect(() => {
        if (reduced) {
            gsap.set(main.current, { clearProps: 'transform' })
            return
        }

        const context = gsap.context(() => {
            gsap.fromTo(main.current,
                { scaleX: 1 },
                {
                    scaleX: 0.93,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: main.current,
                        start: 'bottom bottom',
                        end: 'bottom 10%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                },
            )
        }, main)

        return () => context.revert()
    }, [reduced])

    return (
        <>
            <Navbar />
            <main ref={main} id="main-content" className="page-content">
                <Hero />
                <StorySection />
                {SECTIONS.map((section, index) => (
                    <SplitSection key={section.id} number={String(index + 1).padStart(2, '0')} {...section} />
                ))}
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}

export default function App() {
    const reduced = useReducedMotion()

    // Reduced motion bypasses the smooth-scroll provider.
    if (reduced) return <Page />

    return (
        <ReactLenis root options={LENIS_OPTIONS}>
            <Page />
        </ReactLenis>
    )
}
