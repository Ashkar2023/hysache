import { useLayoutEffect, useRef } from 'react'
import testimonialOrnament from '../../assets/images/testimonial-ornament.png'
import { GOOGLE_REVIEWS_URL } from '../../config/site.js'
import useReducedMotion from '../../hooks/use-reduced-motion.js'
import { gsap } from '../../lib/gsap.js'

const TESTIMONIALS = [
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
]

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

export default function TestimonialsSection() {
    const section = useRef(null)
    const pin = useRef(null)
    const stack = useRef(null)
    const reduced = useReducedMotion()

    useLayoutEffect(() => {
        if (reduced) return

        const context = gsap.context(() => {
            const cards = gsap.utils.toArray('[data-testimonial-card]', stack.current)
            const movementDuration = 0.55
            const opacityDuration = movementDuration * 0.2

            gsap.set(cards, {
                autoAlpha: 0,
                y: 32,
                scale: 0.985,
                rotation: 4,
                clipPath: 'polygon(0 0, 0 0, 14% 100%, 0 100%)',
                transformOrigin: '50% 22px',
                zIndex: (index) => index + 1,
            })

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: pin.current,
                    start: 'top top',
                    end: () => `+=${cards.length * Math.max(window.innerHeight * 0.55, 420)}`,
                    pin: true,
                    anticipatePin: 1,
                    scrub: 1.3,
                    invalidateOnRefresh: true,
                },
            })

            cards.forEach((card, index) => {
                timeline.to(card, {
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: movementDuration,
                    ease: 'power2.out',
                }, index)

                timeline.to(card, {
                    autoAlpha: 1,
                    duration: opacityDuration,
                    ease: 'power2.out',
                }, index)

                cards.slice(0, index).forEach((previousCard, previousIndex) => {
                    const depth = index - previousIndex

                    if (depth > 2) {
                        timeline.set(previousCard, { autoAlpha: 0 }, index)
                        return
                    }

                    timeline.to(previousCard, {
                        scale: 1 - depth * 0.025,
                        y: 0,
                        rotation: depth === 1 ? -3 : 4,
                        duration: movementDuration,
                        ease: 'power2.out',
                    }, index)

                    timeline.to(previousCard, {
                        autoAlpha: 1 - depth * 0.24,
                        duration: opacityDuration,
                        ease: 'power2.out',
                    }, index)
                })

                timeline.to({}, { duration: 1 - movementDuration }, index + movementDuration)
            })

            timeline.to({}, { duration: 0.45 })
        }, section)

        return () => context.revert()
    }, [reduced])

    return (
        <section
            ref={section}
            id="testimonials"
            className="relative z-10"
            aria-labelledby="testimonials-title"
        >
            <div ref={pin} className="relative isolate overflow-hidden bg-cream">
                <img
                    className="pointer-events-none absolute top-1/2 -left-1 z-0 h-1/4 md:h-1/2 w-auto max-w-none -translate-x-[5%] -translate-y-1/2 select-none opacity-90"
                    src={testimonialOrnament}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                />
                <img
                    className="pointer-events-none absolute top-1/2 -right-1 z-0 h-1/4 md:h-1/2 w-auto max-w-none translate-x-[5%] -translate-y-1/2 -scale-x-100 select-none opacity-90"
                    src={testimonialOrnament}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                />

                <div className="relative z-10 flex min-h-svh flex-col justify-center py-12 nav:py-16">
                    <div className="px-[7%] text-center">
                        <p className="eyebrow mb-7 text-nav-bg">05 — Testimonials</p>
                        <div className="flex flex-col gap-6">
                            <h2
                                id="testimonials-title"
                                className="mx-auto max-w-[760px] text-[clamp(38px,5vw,64px)] font-light leading-[1.08] tracking-[-.045em] text-nav-bg"
                            >
                                What our customers say.
                            </h2>
                            <p className="mx-auto max-w-[420px] text-sm leading-[1.95] text-muted">
                                Kind words from people who have made Hysache part of their wardrobes and their everyday moments.
                            </p>
                        </div>
                    </div>

                    <div
                        ref={stack}
                        className={reduced
                            ? 'mt-10 grid gap-px px-[7%] nav:grid-cols-2'
                            : 'relative mx-auto mt-16 h-[clamp(260px,42svh,330px)] w-[90vw] max-w-[680px] [perspective:1200px]'
                        }
                    >
                        {!reduced && (
                            <span
                                className="pointer-events-none absolute left-1/2 top-[10px] z-50 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border border-nav-bg/30 bg-nav-accent shadow-[0_5px_16px_rgba(111,29,51,0.24)]"
                                aria-hidden="true"
                            >
                                <span className="size-2 rounded-full bg-nav-bg" />
                            </span>
                        )}

                        {TESTIMONIALS.map((testimonial, index) => (
                            <article
                                key={testimonial.name}
                                data-testimonial-card
                                className={`${reduced ? 'min-h-[300px] w-full nav:min-h-[330px]' : 'absolute inset-0 h-full w-full will-change-[transform,opacity,clip-path] shadow-[0_18px_55px_rgba(111,29,51,0.16)]'} flex flex-col rounded-xs border border-nav-bg/15 p-7 nav:p-10 ${index % 2 === 0 ? 'bg-footer-cream' : 'bg-nav-bg text-cream'}`}
                            >
                                <blockquote className="my-auto line-clamp-4 py-8 text-[clamp(14px,1.1vw,17px)] font-light leading-[1.55] tracking-[-.02em]">
                                    <span>“</span>{testimonial.quote}”
                                </blockquote>

                                <footer className={`flex items-center justify-between gap-5 border-t pt-5 ${index % 2 === 0 ? 'border-nav-bg/15' : 'border-cream/20'}`}>
                                    <p className="text-[10px] font-semibold uppercase tracking-[.16em]">{testimonial.name}</p>
                                    <GoogleLogo className="size-5 shrink-0" />
                                </footer>
                            </article>
                        ))}

                        <a
                            data-testimonial-card
                            className={`${reduced ? 'min-h-[300px] w-full nav:min-h-[330px]' : 'absolute inset-0 h-full w-full will-change-[transform,opacity,clip-path] shadow-[0_18px_55px_rgba(111,29,51,0.16)]'} group flex flex-col justify-between rounded-sm border border-nav-bg bg-nav-accent p-7 text-nav-bg nav:p-10`}
                            href={GOOGLE_REVIEWS_URL}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Read all Hysache reviews on Google"
                        >
                            <GoogleLogo className="size-9" />
                            <p className="max-w-[360px] text-[clamp(28px,3vw,46px)] font-light leading-[1.12] tracking-[-.045em]">
                                Read all reviews on Google.
                            </p>
                            <span className="small-caps inline-flex items-center gap-5">
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
