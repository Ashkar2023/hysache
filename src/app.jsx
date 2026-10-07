import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import logoMarkup from './assets/logo.svg?raw'
import heroImage from './assets/images/1.png'
import collectionOne from './assets/images/collections/1.jpg'
import collectionTwo from './assets/images/collections/2.jpg'
import collectionThree from './assets/images/collections/3.jpg'
import collectionFour from './assets/images/collections/4.jpg'
import stackedVideoOne from './assets/videos/1.mp4'
import stackedVideoTwo from './assets/videos/2.mp4'
import storyImage from './assets/images/2.jpg';
import storyImageLarge from './assets/images/2-large.jpg';

/* -------------------------------------------------------------------------- */
/*  Config & content                                                          */
/* -------------------------------------------------------------------------- */

const LENIS_OPTIONS = { lerp: 0.08, wheelMultiplier: 0.9, touchMultiplier: 0.9, autoRaf: false }
const COPYRIGHT_YEAR = new Date().getFullYear()
const HEADER_OFFSET = 80
const DESKTOP_BREAKPOINT = 900 // keep in sync with --breakpoint-nav in index.css

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

const NAVIGATION = [
    ['home', '#home'],
    ['story', '#collections'],
    ['Enquire', '#contact'],
]

const SECTIONS = [
    {
        id: 'about',
        video: stackedVideoOne,
        eyebrow: '01 — The house of Hysache',
        title: <>Rooted in tradition.<br />Made for your everyday.</>,
        copy: 'We believe the things you wear should feel like you. Thoughtful silhouettes, familiar textures, and a little of the extraordinary — woven into the everyday.',
        link: 'Our story',
        href: '#craft',
    },
    {
        id: 'craft',
        video: stackedVideoTwo,
        eyebrow: '03 — The art of making',
        title: <>Care in every thread.</>,
        copy: 'It begins with the fabric, and lives in the details. A patient process, a thoughtful finish, and a respect for the hands that bring each piece to life.',
        link: 'Get in touch',
        href: '#contact',
    }
]

const COLLECTIONS = [
    {
        image: collectionOne,
        title: 'The Day Edit',
        description: 'Easy silhouettes made for unhurried days.',
        href: '#contact',
    },
    {
        image: collectionTwo,
        title: 'Evening Light',
        description: 'Quiet detail, softened for after dark.',
        href: '#contact',
    },
    {
        image: collectionThree,
        title: 'In Bloom',
        description: 'Botanical notes in considered colour.',
        href: '#contact',
    },
    {
        image: collectionFour,
        title: 'Foundations',
        description: 'Enduring pieces for an everyday wardrobe.',
        href: '#contact',
    },
]

const TESTIMONIALS = [
    // {
    //     name: 'Roshni Kt',
    //     quote: 'We were really impressed with this store’s stitching services. They handle every customization flawlessly—whether it’s intricate designs or simple tweaks. Plus, the store’s atmosphere is great, and the staff was super friendly and helpful throughout. Definitely a place to go if you want perfect stitching and great service!❤️',
    // },
    {
        name: 'Merleena Paul',
        quote: 'Fast, affordable, and top-tier stitching quality! Excellent customer service as well, they really listen to what you want. Will definitely be coming back',
    },
    {
        name: 'Wardha Naushad',
        quote: 'Absolutely loved shopping from Hysache. The collection is stylish, elegant, and the quality of the fabrics feels premium. Highly recommended for anyone looking for beautiful ladies clothing at great value.',
    },
    {
        name: 'Amna Fathima PS',
        quote: 'One of my all time favourite boutique….loved their collections so much and especially they customize costumes to our preferences…..supportive lovely staffs and their stitching was so amazing beyond words….',
    },
    {
        name: 'Refia Salam',
        quote: 'Good fabrics, clean stitching, and reliable service — definitely a place I’d recommend if you’re looking for something custom and well-made.❤️',
    },
    {
        name: 'Geethu V Nair',
        quote: '\u200bGreat experience. The stitching was done perfectly and the staff is very friendly and professional. I’m very satisfied with the final product.',
    },
    {
        name: 'Renjana Nibu',
        quote: 'Absolutely loved the stitching and fitting the outfit was neatly done amd looked exactly how i wanted',
    },
    {
        name: 'Merin Tom',
        quote: 'Loved this boutique! Stylish, well-curated collection with great quality. The staff were friendly and helpful, making the whole experience enjoyable. Definitely worth a visit!',
    },
    {
        name: 'Prarthana Karinatt',
        quote: 'Owner helped me out a lot and i got my dream engagement dress at the last moment ♥️Thankyou team',
    },
    // {
    //     name: 'Sajeena Nazar',
    //     quote: 'Satisfied with the Alteration and had a good customer interaction . Also the collections were quite unique',
    // },
    // {
    //     name: 'Irene Jacob',
    //     quote: 'The best that I’ve seen so far in town!! Very comfortable fabric and good quality.😍🧿',
    // },
    // {
    //     name: 'gazia george',
    //     quote: 'Nice quality clothes and the staff were very polite and friendly. Had a great shopping experience overall.',
    // },
    // {
    //     name: 'Fousiya Shebeer',
    //     quote: 'Truly satisfied with their stitching ❤️ & unique collection in salwars & kurti sets',
    // },
    // {
    //     name: 'Muhammed Nazim',
    //     quote: 'stylish collection, great quality, and excellent customer service. Highly recommended!',
    // },
    // {
    //     name: 'Siji E. A',
    //     quote: 'Good service at Hysache. Special thanks to Alameen for customer support. 👍',
    // },
]

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Hysache&utm_source=chatgpt.com#lrd=0x3b080dceb29ebf31:0x38c6fb734f861d3f,1,,,,'

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

function GoogleLogo({ className = '' }) {
    return (
        <svg
            className={className}
            viewBox="-3 0 262 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            aria-hidden="true"
        >
            <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
            <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
            <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
            <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
        </svg>
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

function BackgroundVideo({ src }) {
    const video = useRef(null)
    const reduced = useReducedMotion()

    useEffect(() => {
        const element = video.current
        if (!element || reduced) return

        const play = () => element.play().catch(() => { })

        if (!('IntersectionObserver' in window)) {
            play()
            return
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) play()
            else element.pause()
        }, { rootMargin: '20% 0px', threshold: 0.05 })

        observer.observe(element)
        return () => observer.disconnect()
    }, [reduced, src])

    return (
        <video
            ref={video}
            className="stacked-panel-video absolute inset-0 size-full object-cover"
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
        />
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
                    {NAVIGATION.map(([label, href], index) => (
                        <a
                            key={href}
                            href={href}
                            className={`desktop-nav-item nav-link-roll py-3 ${SMALL_CAPS}`}
                            style={{ '--nav-item-delay': `${120 + index * 80}ms` }}
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
                delay: .35,
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
                    className="whitespace-nowrap font-thin leading-none text-[#f29494] text-[clamp(4.5rem,15vw,12.5rem)] md:text-shadow-none text-shadow-lg"
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
            className="relative flex min-h-[100svh] items-center overflow-hidden text-cream"
            aria-labelledby="story-title"
        >
            <picture className="absolute inset-0">
                <source
                    media="(min-width: 900px)"
                    srcSet={storyImageLarge}
                />

                <img
                    src={storyImage}
                    className="h-full w-full object-cover object-[50%_35%]"
                />
            </picture>

            {/* Main burgundy treatment */}
            <div
                className="absolute inset-0 bg-nav-bg/35"
                aria-hidden="true"
            />

            {/* Darker left side for text readability */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-nav-bg/60 via-nav-bg/20 to-transparent"
                aria-hidden="true"
            />

            {/* Slight bottom darkening */}
            {/* <div
                className="absolute inset-0 bg-gradient-to-t from-nav-bg/30 via-transparent to-nav-bg/15"
                aria-hidden="true"
            /> */}

            <div className="relative z-10 w-full px-[9%] nav:px-[clamp(35px,7vw,120px)]">
                <Reveal className="max-w-[620px] text-left">
                    <p className="mb-8 text-xs font-normal uppercase leading-[1.8] tracking-[.19em] opacity-90">
                        The Hysache story
                    </p>

                    <h2
                        id="story-title"
                        className="mb-8 text-[clamp(38px,5vw,64px)] font-light leading-[1.08] tracking-[-.045em]"
                    >
                        Couture.
                        <br />
                        <span className='md:whitespace-nowrap'>
                            Defined by detail.
                        </span>
                    </h2>

                    <p className="max-w-[540px] text-sm leading-[1.95] opacity-85">
                        Hysache began with a simple idea: to create something thoughtful,
                        distinctive, and quietly beautiful. Every detail is considered with
                        care, shaped by a belief that the things we choose should feel as
                        meaningful as they look.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

function CollectionsSection() {
    const section = useRef(null)
    const reduced = useReducedMotion()

    function animateCardImage(event, scale) {
        if (reduced) return
        gsap.to(event.currentTarget.querySelector('img'), {
            scale,
            duration: 0.6,
            ease: 'power4.out',
            overwrite: 'auto',
        })
    }

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const cards = gsap.utils.toArray('.collection-card')

            if (reduced) {
                gsap.set(cards, { clipPath: 'inset(0%)' })
                return
            }

            gsap.set(cards, { clipPath: 'inset(25%)' })

            cards.forEach((card) => {
                gsap.to(card, {
                    clipPath: 'inset(0%)',
                    duration: 1.7,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        once: true,
                    },
                })
            })
        }, section)

        return () => context.revert()
    }, [reduced])

    return (
        <section
            ref={section}
            id="collections"
            className="flex flex-col gap-10 px-[6%] py-24 sm:px-[7%] lg:flex-row lg:gap-16 lg:py-36"
            aria-labelledby="collections-title"
        >
            <div className="w-full self-start lg:sticky lg:top-24 lg:basis-[30%] lg:shrink-0">
                <p className={`mb-7 ${EYEBROW}`}>02 — Collections</p>
                <h2
                    id="collections-title"
                    className="mb-6 max-w-[420px] text-[clamp(34px,5vw,58px)] font-light leading-[1.12] tracking-[-.05em]"
                >
                    Made to live beautifully.
                </h2>
                <p className="max-w-[360px] text-sm leading-[1.95] text-muted">
                    Thoughtful shapes, tactile fabrics, and enduring details. Explore pieces designed to feel special in the moments you wear them most.
                </p>
                <a className={`group mt-9 inline-flex items-center gap-6 py-2 ${SMALL_CAPS}`} href="#contact">
                    View all
                    <span className="text-xl font-light transition-transform group-hover:translate-x-[5px]" aria-hidden="true">→</span>
                </a>
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-8 gap-3 sm:gap-5">
                {COLLECTIONS.map((collection, index) => {
                    const span = index % 4 === 0 || index % 4 === 3 ? 'sm:col-span-5' : 'sm:col-span-3'

                    return (
                        <a
                            key={collection.title}
                            className={`collection-card group relative col-span-8 block h-[350px] w-full overflow-hidden sm:h-[450px] ${span}`}
                            aria-label={`${collection.title}: ${collection.description}`}
                            onMouseEnter={(event) => animateCardImage(event, 1.1)}
                            onMouseLeave={(event) => animateCardImage(event, 1)}
                            onFocus={(event) => animateCardImage(event, 1.1)}
                            onBlur={(event) => animateCardImage(event, 1)}
                        >
                            <div className="image-zoom-out h-full w-full">
                                <img
                                    className="h-full w-full object-cover"
                                    src={collection.image}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" aria-hidden="true" />
                            <div className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-4.5rem)] p-6 text-white transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 sm:p-8">
                                <h3 className="text-2xl font-light tracking-[-.035em]">{collection.title}</h3>
                                <p className="mt-3 max-w-[320px] text-xs leading-relaxed text-white/85">{collection.description}</p>
                            </div> */}
                        </a>
                    )
                })}
            </div>
        </section>
    )
}

function StackedPanel({ section, index, panelRef }) {
    const { id, video, eyebrow, title, copy, link, href } = section

    return (
        <section
            ref={panelRef}
            id={id}
            className="stacked-panel flex items-center justify-center overflow-hidden bg-ink text-white"
            style={{ '--stack-top': `${HEADER_OFFSET + 12 + index * 14}px`, zIndex: index + 1 }}
            aria-labelledby={`${id}-title`}
        >
            <BackgroundVideo src={video} />

            <div className="absolute inset-0 bg-cream/[.08]" aria-hidden="true" />

            <div className="relative z-10 w-full px-[8%] py-28 text-center nav:px-[clamp(35px,7vw,120px)]">
                <Reveal className="mx-auto flex max-w-[820px] flex-col items-center">
                    <p className={`mb-8 text-white/85 ${EYEBROW}`}>{eyebrow}</p>
                    <h2
                        id={`${id}-title`}
                        className="text-[clamp(38px,6vw,82px)] font-light leading-[1.04] tracking-[-.055em]"
                    >
                        {title}
                    </h2>
                    <p className="mt-8 max-w-[580px] text-sm leading-[1.95] text-white/85">{copy}</p>
                    <a className={`group mt-10 inline-flex w-fit items-center gap-6 py-2 ${SMALL_CAPS}`} href={href}>
                        {link}
                        <span className="text-xl font-light transition-transform group-hover:translate-x-[5px]" aria-hidden="true">→</span>
                    </a>
                </Reveal>
            </div>
        </section>
    )
}

function StackedSections() {
    const stack = useRef(null)
    const panels = useRef([])
    const reduced = useReducedMotion()

    useLayoutEffect(() => {
        const elements = panels.current.slice(0, SECTIONS.length).filter(Boolean)

        if (reduced) {
            gsap.set(elements, { clearProps: 'transform,opacity' })
            return
        }

        const context = gsap.context(() => {
            const media = gsap.matchMedia()

            media.add(`(min-width: ${DESKTOP_BREAKPOINT}px)`, () => {
                gsap.set(elements, { transformOrigin: '50% 0%', scale: 1, opacity: 1 })

                elements.forEach((incoming, incomingIndex) => {
                    if (incomingIndex === 0) return

                    const previousPanels = elements.slice(0, incomingIndex)
                    gsap.fromTo(previousPanels,
                        {
                            scale: (panelIndex) => 1 - Math.max(0, incomingIndex - 1 - panelIndex) * 0.018,
                            opacity: (panelIndex) => 1 - Math.max(0, incomingIndex - 1 - panelIndex) * 0.14,
                        },
                        {
                            scale: (panelIndex) => 1 - (incomingIndex - panelIndex) * 0.018,
                            opacity: (panelIndex) => 1 - (incomingIndex - panelIndex) * 0.14,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: incoming,
                                start: 'top 92%',
                                end: () => `top ${HEADER_OFFSET + 12 + incomingIndex * 14}px`,
                                scrub: 0.6,
                                invalidateOnRefresh: true,
                            },
                        },
                    )
                })

                return () => gsap.set(elements, { clearProps: 'transform,opacity' })
            })

            return () => media.revert()
        }, stack)

        return () => context.revert()
    }, [reduced])

    return (
        <div ref={stack} className="stacked-sections bg-cream">
            {SECTIONS.map((section, index) => (
                <StackedPanel
                    key={section.id}
                    section={section}
                    index={index}
                    panelRef={(element) => { panels.current[index] = element }}
                />
            ))}
        </div>
    )
}

function TestimonialsSection() {
    const section = useRef(null)
    const pin = useRef(null)
    const track = useRef(null)
    const reduced = useReducedMotion()

    useLayoutEffect(() => {
        if (reduced) return

        const context = gsap.context(() => {
            const horizontalDistance = () => Math.max(0, track.current.scrollWidth - window.innerWidth)

            gsap.to(track.current, {
                x: () => -horizontalDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: pin.current,
                    start: 'top top',
                    end: () => `+=${horizontalDistance()}`,
                    pin: true,
                    anticipatePin: 1,
                    scrub: 0.15,
                    invalidateOnRefresh: true,
                },
            })
        }, section)

        return () => context.revert()
    }, [reduced])

    return (
        <section
            ref={section}
            id="testimonials"
            className="relative z-10 bg-footer-cream"
            aria-labelledby="testimonials-title"
        >
            <div ref={pin} className="overflow-hidden bg-footer-cream">
                <div className="flex min-h-svh flex-col justify-center py-12 nav:py-16">
                    <div className="px-[7%]">
                        <p className={`mb-7 text-nav-bg ${EYEBROW}`}>04 — Testimonials</p>
                        <div className="flex flex-col gap-6">
                            <h2
                                id="testimonials-title"
                                className="max-w-[760px] text-[clamp(38px,5vw,64px)] font-light leading-[1.08] tracking-[-.045em] text-nav-bg"
                            >
                                What our customers say.
                            </h2>
                            <p className="max-w-[420px] text-sm leading-[1.95] text-muted">
                                Kind words from people who have made Hysache part of their wardrobes and their everyday moments.
                            </p>
                        </div>
                    </div>

                    <div
                        ref={track}
                        className={reduced
                            ? 'mt-10 grid gap-px px-[7%] nav:grid-cols-2'
                            : 'mt-10 flex w-max gap-px px-[7%] will-change-transform'
                        }
                    >
                        {TESTIMONIALS.map((testimonial, index) => (
                            <article
                                key={testimonial.name}
                                className={`${reduced ? 'w-full' : 'w-[82vw] max-w-[500px] nav:w-[38vw]'} flex min-h-[300px] flex-col border border-nav-bg/15 p-7 nav:min-h-[330px] nav:p-10 ${index % 2 === 0 ? 'bg-cream' : 'bg-nav-bg text-cream'}`}
                            >
                                <blockquote className="my-auto line-clamp-4 py-8 text-[clamp(14px,1.1vw,17px)] font-light leading-[1.55] tracking-[-.02em]">
                                    “{testimonial.quote}”
                                </blockquote>

                                <footer className={`flex items-center justify-between gap-5 border-t pt-5 ${index % 2 === 0 ? 'border-nav-bg/15' : 'border-cream/20'}`}>
                                    <p className="text-sm font-normal">{testimonial.name}</p>
                                    <GoogleLogo className="size-5 shrink-0" />
                                </footer>
                            </article>
                        ))}

                        <a
                            className={`${reduced ? 'w-full' : 'w-[82vw] max-w-[500px] nav:w-[38vw]'} group flex min-h-[300px] flex-col justify-between border border-nav-bg bg-nav-accent p-7 text-nav-bg nav:min-h-[330px] nav:p-10`}
                            href={GOOGLE_REVIEWS_URL}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Read all Hysache reviews on Google"
                        >
                            <GoogleLogo className="size-9" />
                            <p className="max-w-[360px] text-[clamp(28px,3vw,46px)] font-light leading-[1.12] tracking-[-.045em]">
                                Read all reviews on Google.
                            </p>
                            <span className={`inline-flex items-center gap-5 ${SMALL_CAPS}`}>
                                Open Google
                                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
                            </span>
                        </a>
                    </div>
                </div>
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

        return () => context.revert()
    }, [reduced])

    return (
        <>
            <Navbar />
            <main ref={main} id="main-content" className="page-content">
                <Hero />
                <CollectionsSection />
                <StorySection />
                <StackedSections />
                <TestimonialsSection />
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}

function LenisSync() {
    useLenis(ScrollTrigger.update) // runs on every Lenis scroll
    return null
}

export default function App() {
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

    // Reduced motion bypasses the smooth-scroll provider.
    if (reduced) return <Page />

    return (
        <ReactLenis root ref={lenisRef} options={LENIS_OPTIONS}>
            <LenisSync />
            <Page />
        </ReactLenis>
    )
}
