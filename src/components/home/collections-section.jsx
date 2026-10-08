import { useLayoutEffect, useRef } from 'react'
import mandalaOrnament from '../../assets/images/mandala-ornament.png'
import collectionOne from '../../assets/images/collections/1.jpg'
import collectionFour from '../../assets/images/collections/4.jpg'
import collectionTwo from '../../assets/videos/3.mov'
import collectionThree from '../../assets/videos/4.mov'
import useReducedMotion from '../../hooks/use-reduced-motion.js'
import { gsap } from '../../lib/gsap.js'

const COLLECTIONS = [
    {
        image: collectionOne,
        title: 'The Day Edit',
        description: 'Easy silhouettes made for unhurried days.',
        href: '/contact',
    },
    {
        video: collectionTwo,
        title: 'Evening Light',
        description: 'Quiet detail, softened for after dark.',
        href: '/contact',
    },
    {
        video: collectionThree,
        title: 'In Bloom',
        description: 'Botanical notes in considered colour.',
        href: '/contact',
    },
    {
        image: collectionFour,
        title: 'Foundations',
        description: 'Enduring pieces for an everyday wardrobe.',
        href: '#contact',
    },
]

export default function CollectionsSection() {
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
            className="relative isolate flex flex-col gap-10 overflow-hidden px-[6%] py-24 sm:px-[7%] lg:flex-row lg:gap-16 lg:py-36"
            aria-labelledby="collections-title"
        >
            <img
                className="pointer-events-none absolute top-0 right-0 z-0 h-1/12 sm:h-1/4 lg:h-2/5 rotate-180 select-none opacity-90 lg:top-auto lg:right-auto lg:bottom-0 lg:left-0 lg:rotate-0"
                src={mandalaOrnament}
                alt=""
                aria-hidden="true"
                draggable="false"
            />

            <div className="relative z-10 w-full self-start lg:top-24 lg:basis-[30%] lg:shrink-0">
                <p className="eyebrow mb-7">02 — Collections</p>
                <h2
                    id="collections-title"
                    className="mb-6 max-w-[420px] text-[clamp(34px,5vw,58px)] font-light leading-[1.12] tracking-[-.05em]"
                >
                    Made to live beautifully.
                </h2>
                <p className="max-w-[360px] text-sm leading-[1.95] text-muted">
                    Thoughtful shapes, tactile fabrics, and enduring details. Explore pieces designed to feel special in the moments you wear them most.
                </p>
                <a className="small-caps group mt-9 inline-flex items-center gap-6 py-2" href="/contact">
                    View all
                    <span className="text-xl font-light transition-transform group-hover:translate-x-[5px]" aria-hidden="true">→</span>
                </a>
            </div>

            <div className="relative z-10 grid min-w-0 flex-1 grid-cols-8 gap-3 sm:gap-5">
                {COLLECTIONS.map((collection, index) => {
                    const span = index % 4 === 0 || index % 4 === 3 ? 'sm:col-span-5' : 'sm:col-span-3'

                    return (
                        <a
                            key={collection.title}
                            className={`collection-card group relative col-span-8 block h-[350px] w-full overflow-hidden sm:h-[450px] ${span} rounded-xs`}
                            aria-label={`${collection.title}: ${collection.description}`}
                            onMouseEnter={(event) => animateCardImage(event, 1.1)}
                            onMouseLeave={(event) => animateCardImage(event, 1)}
                            onFocus={(event) => animateCardImage(event, 1.1)}
                            onBlur={(event) => animateCardImage(event, 1)}
                        >
                            <div className="image-zoom-out h-full w-full">
                                {collection.video ? (
                                    <video
                                        className="h-full w-full object-cover"
                                        src={collection.video}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <img
                                        className="h-full w-full object-cover"
                                        src={collection.image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                    />
                                )}
                            </div>
                        </a>
                    )
                })}
            </div>
        </section>
    )
}
