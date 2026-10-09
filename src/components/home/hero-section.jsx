import { useLayoutEffect, useRef } from 'react'
import heroImage from '../../assets/images/1.png'
import useNavigationAnimationDelay from '../../hooks/use-navigation-animation-delay.jsx'
import useReducedMotion from '../../hooks/use-reduced-motion.js'
import { gsap, SplitText } from '../../lib/gsap.js'

export default function HeroSection() {
    const title = useRef(null)
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
                delay: .35 + navigationAnimationDelay / 1000,
                stagger: 0.06,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
            })
        }, title)

        return () => context.revert()
    }, [navigationAnimationDelay, reduced])

    return (
        <section id="home" className="relative h-svh" aria-label="Hysache — thoughtfully made kurtis">
            <h1 className="sr-only">Hysache — homegrown luxe</h1>
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
                    className="whitespace-nowrap font-light leading-none text-[#f29494] text-[clamp(4.5rem,15vw,12.5rem)] md:text-shadow-none text-shadow-lg"
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
