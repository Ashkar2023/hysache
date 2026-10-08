import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import stackedVideoOne from '../../assets/videos/1.mp4'
import stackedVideoTwo from '../../assets/videos/2.mp4'
import storyVideo from '../../assets/videos/6.mp4'
import { HEADER_OFFSET, NAV_BREAKPOINT } from '../../config/layout.js'
import useReducedMotion from '../../hooks/use-reduced-motion.js'
import { gsap } from '../../lib/gsap.js'

const SECTIONS = [
    {
        id: 'story',
        video: storyVideo,
        eyebrow: 'The Hysache way',
        title: <>Bespoke.<br /><span className="md:whitespace-nowrap">Defined by detail.</span></>,
        copy: 'Hysache began with a simple idea: to create something thoughtful, distinctive, and quietly beautiful. Every detail is considered with care, shaped by a belief that the things we choose should feel as meaningful as they look.',
    },
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
        href: '/contact',
    },
]

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

function StackedPanel({ section, index, panelRef }) {
    const { id, video, eyebrow, title, copy, link, href } = section

    return (
        <section
            ref={panelRef}
            id={id}
            className="stacked-panel flex items-center justify-center overflow-hidden bg-ink text-white"
            style={{
                '--stack-top': `${HEADER_OFFSET + 12 + index * 14}px`,
                '--stack-top-mobile': `${HEADER_OFFSET + 4 + index * 8}px`,
                zIndex: index + 1,
            }}
            aria-labelledby={`${id}-title`}
        >
            <BackgroundVideo src={video} />

            <div className="absolute inset-0 bg-cream/[.08]" aria-hidden="true" />

            <div className="relative z-10 w-full px-[8%] py-28 text-center nav:px-[clamp(35px,7vw,120px)]">
                <Reveal className="mx-auto flex max-w-[820px] flex-col items-center">
                    <p className="eyebrow mb-8 text-white/85">{eyebrow}</p>
                    <h2
                        id={`${id}-title`}
                        className="text-[clamp(38px,6vw,82px)] font-light leading-[1.04] tracking-[-.055em]"
                    >
                        {title}
                    </h2>
                    <p className="mt-8 max-w-[580px] text-sm leading-[1.95] text-white/85">{copy}</p>
                    {link && href && (
                        <a className="small-caps group mt-10 inline-flex w-fit items-center gap-6 py-2" href={href}>
                            {link}
                            <span className="text-xl font-light transition-transform group-hover:translate-x-[5px]" aria-hidden="true">→</span>
                        </a>
                    )}
                </Reveal>
            </div>
        </section>
    )
}

export default function StackedSections() {
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

            media.add({
                mobile: `(max-width: ${NAV_BREAKPOINT - 1}px)`,
                desktop: `(min-width: ${NAV_BREAKPOINT}px)`,
            }, ({ conditions }) => {
                const isMobile = conditions.mobile
                const topBase = HEADER_OFFSET + (isMobile ? 4 : 12)
                const topStep = isMobile ? 8 : 14
                const scaleStep = isMobile ? 0.012 : 0.018

                gsap.set(elements, { transformOrigin: '50% 0%', scale: 1, opacity: 1 })

                elements.forEach((incoming, incomingIndex) => {
                    if (incomingIndex === 0) return

                    const previousPanels = elements.slice(0, incomingIndex)
                    gsap.fromTo(previousPanels,
                        {
                            scale: (panelIndex) => 1 - Math.max(0, incomingIndex - 1 - panelIndex) * scaleStep,
                        },
                        {
                            scale: (panelIndex) => 1 - (incomingIndex - panelIndex) * scaleStep,
                            ease: 'none',
                            immediateRender: false,
                            scrollTrigger: {
                                trigger: incoming,
                                start: isMobile ? 'top 96%' : 'top 92%',
                                end: () => `top ${topBase + incomingIndex * topStep}px`,
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
