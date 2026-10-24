import { useLayoutEffect, useRef } from 'react'
import useNavigationAnimationDelay from '../../hooks/use-navigation-animation-delay.jsx'
import useReducedMotion from '../../hooks/use-reduced-motion.js'
import { gsap, SplitText } from '../../lib/gsap.js'

const TAGLINE = 'Homegrown Luxe'

export default function HeroSection() {
    const title = useRef(null)
    const tagline = useRef(null)
    const reduced = useReducedMotion()
    const navigationAnimationDelay = useNavigationAnimationDelay()

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
                delay: navigationAnimationDelay / 1000,
                stagger: 0.06,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
            })

            gsap.from(tagline.current.children, {
                y: 7,
                autoAlpha: 0,
                filter: 'blur(4px)',
                duration: 0.8,
                delay: 0.5 + navigationAnimationDelay / 1000,
                stagger: 0.045,
                ease: 'power2.out',
                clearProps: 'transform,opacity,visibility,filter',
            })
        }, title)

        return () => context.revert()
    }, [navigationAnimationDelay, reduced])

    return (
        <section id="home" className="relative h-svh" aria-label="Hysache — thoughtfully made kurtis">
            <h1 className="sr-only">Hysache — homegrown luxe</h1>
            <img
                className="h-full w-full object-cover object-center select-none"
                src="/hero.jpg"
                alt="Hysache kurti editorial, celebrating soft silhouettes and natural textures"
                fetchPriority="high"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/[.23] to-transparent to-30%" />
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none">
                <p
                    ref={title}
                    className="whitespace-nowrap font-normal leading-none text-[#f29494] text-[clamp(4.5rem,15vw,12.5rem)] md:text-shadow-xs text-shadow-lg"
                >
                    HYSACHE
                </p>
                <span
                    ref={tagline}
                    aria-hidden="true"
                    className="mt-1 nav:mt-0 flex w-full justify-between whitespace-nowrap text-[clamp(1rem,1vw,2rem)] text-shadow-md py-2 nav:py-0 font-light uppercase leading-none nav:tracking-[0.4em] text-nav-accent nav:justify-end"
                >
                    {Array.from(TAGLINE).map((character, index) => (
                        <span key={`${character}-${index}`}>
                            {character === ' ' ? '\u00a0' : character}
                        </span>
                    ))}
                </span>
            </div>
        </section>
    )
}
