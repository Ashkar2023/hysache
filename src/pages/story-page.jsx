import { useLayoutEffect, useRef } from 'react'
import storyHeroImage from '../assets/images/story.webp'
import useNavigationAnimationDelay from '../hooks/use-navigation-animation-delay.jsx'
import useReducedMotion from '../hooks/use-reduced-motion.js'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import holdClothImage from '../assets/images/story-holdcloth.webp'
import fabricStudyImage from '../assets/images/story-fabricstudy.webp'
import throughMarketImage from '../assets/images/story-throughmarket.webp'


const STORY_IMAGES = {
    archive: 'https://placehold.co/900x1200/4f1425/f7dddd?text=The+Archive',
    fabric: 'https://placehold.co/1100x760/e8d4cc/6f1d33?text=Fabric+Study',
    journey: 'https://placehold.co/760x980/c98282/4f1425?text=On+The+Journey',
}

export default function StoryPage() {
    const page = useRef(null)
    const reduced = useReducedMotion()
    const navigationAnimationDelay = useNavigationAnimationDelay()

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const reveals = gsap.utils.toArray('[data-story-reveal]')
            const images = gsap.utils.toArray('[data-story-image]')

            if (reduced) {
                gsap.set([...reveals, ...images], { clearProps: 'all' })
                return
            }

            gsap.from('.story-hero-line', {
                yPercent: 115,
                duration: 1.1,
                stagger: 0.1,
                delay: navigationAnimationDelay / 1000,
                ease: 'power4.out',
            })

            reveals.forEach((element) => {
                gsap.from(element, {
                    y: 42,
                    autoAlpha: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 88%',
                        once: true,
                    },
                })
            })

            images.forEach((image) => {
                gsap.from(image, {
                    clipPath: 'inset(14% 0 14% 0)',
                    scale: 1.08,
                    duration: 1.25,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: image,
                        start: 'top 90%',
                        once: true,
                    },
                })
            })

            gsap.to('.story-film', {
                yPercent: 12,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.story-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }, page)

        const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
            window.cancelAnimationFrame(frame)
            context.revert()
        }
    }, [navigationAnimationDelay, reduced])

    return (
        <div ref={page} className="bg-cream text-nav-bg">
            <section className="story-hero relative isolate min-h-svh overflow-hidden bg-nav-bg text-cream" aria-labelledby="story-title">
                <img
                    src={storyHeroImage}
                    className="story-film absolute inset-0 -z-20 h-[112%] w-full object-cover opacity-40 saturate-[.7]"
                />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(35_7_18/.28)_0%,rgb(111_29_51/.16)_42%,rgb(35_7_18/.82)_100%)]" aria-hidden="true" />

                <div className="flex min-h-svh flex-col justify-between px-[6%] pb-10 pt-32 nav:px-[4%] nav:pb-14">
                    <p className="eyebrow text-nav-accent">Hysache / Est. through experience</p>

                    <div>
                        <h1 id="story-title" className="max-w-[1400px] uppercase text-[clamp(4.7rem,17vw,15rem)] font-thin leading-[.72] tracking-[-.065em] text-nav-accent">
                            <span className="block overflow-hidden pb-[.1em]"><span className="story-hero-line block">Our</span></span>
                            <span className="block overflow-hidden pb-[.1em]"><span className="story-hero-line ml-[12vw] block nav:ml-[23vw]">Story<span className="text-[.2em]">.</span></span></span>
                        </h1>

                        <div className="mt-6 flex flex-col gap-4 border-t border-cream/30 pt-5 nav:flex-row nav:items-start nav:justify-between">
                            <p className="small-caps text-nav-accent">Twenty years in the making</p>
                            <p className="max-w-[620px] text-[clamp(1rem,1.55vw,1.3rem)] leading-[1.65] text-cream/90">
                                For over two decades, we have been part of the world of ethnic fashion—not simply as a brand, but behind the scenes, as manufacturers and craftsmen who have spent years understanding fabrics, craftsmanship, and what truly makes a garment special.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-[6%] py-24 nav:px-[8%] nav:py-40" aria-labelledby="experience-title">
                <h2 id="experience-title" className="sr-only">More than twenty years of experience</h2>
                <div className="mx-auto grid max-w-[1500px] gap-12 nav:grid-cols-12 nav:gap-8">
                    <div className="nav:col-span-4" data-story-reveal>
                        <p className="eyebrow text-faint">Experience</p>
                        <p className="mt-7 text-[clamp(6rem,14vw,13rem)] font-thin leading-[.72] tracking-[-.08em] text-nav-bg">20<span className="align-top text-[.28em] tracking-normal">+</span></p>
                        <p className="mt-6 small-caps text-faint">Years behind the seams</p>
                    </div>

                    <figure className="relative nav:col-span-3 nav:col-start-6 nav:mt-20">
                        <div className="aspect-[3/4] overflow-hidden bg-footer-cream">
                            <img data-story-image className="h-full w-full object-cover" src={holdClothImage} alt="Placeholder for an image from the Hysache archive" />
                        </div>
                        <figcaption className="mt-3 small-caps text-faint">From the archive</figcaption>
                    </figure>

                    <div className="self-end nav:col-span-3 nav:col-start-10 nav:pb-16" data-story-reveal>
                        <p className="text-[clamp(1.5rem,2.6vw,2.7rem)] font-light leading-[1.25] tracking-[-.04em]">
                            Before there was a label, there was a lifetime spent learning the language of cloth.
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y border-nav-bg/15 px-[4%] py-24 nav:py-40" aria-labelledby="journey-title">
                <div className="mx-auto max-w-[1600px]">
                    <div className="mb-14 grid gap-8 nav:grid-cols-12 nav:items-end">
                        <div className="nav:col-span-5" data-story-reveal>
                            <p className="eyebrow mb-6 text-faint">The journey</p>
                            <h2 id="journey-title" className="text-[clamp(3.2rem,7vw,7.5rem)] font-thin leading-[.9] tracking-[-.055em]">In search of<br />what feels right.</h2>
                        </div>
                        <p className="max-w-[600px] text-[14px] leading-[1.95] text-muted nav:col-span-5 nav:col-start-8" data-story-reveal>
                            Our journey has taken us across different places in search of the right fabrics, the finest details, and the craftsmanship we believe in. Years of experience, countless journeys, and a deep understanding of ethnic wear eventually led us to one idea: to create something of our own.
                        </p>
                    </div>

                    <div className="grid grid-cols-12 items-start gap-3 nav:gap-6">
                        <figure className="col-span-12 overflow-hidden bg-footer-cream md:col-span-8 nav:col-span-6">
                            <img data-story-image className="aspect-[4/3] h-full w-full object-cover" src={fabricStudyImage} alt="Placeholder for a Hysache fabric sourcing photograph" />
                        </figure>
                        <figure className="hidden overflow-hidden bg-footer-cream md:col-span-4 md:col-start-9 md:mt-20 md:block nav:col-span-3 nav:col-start-8 nav:mt-36">
                            <img data-story-image className="aspect-[3/4] h-full w-full object-cover" src={throughMarketImage} alt="Placeholder for a photograph from the Hysache journey" />
                        </figure>
                        <p className="col-span-8 col-start-3 mt-16 text-center text-[clamp(2rem,5vw,5.5rem)] font-thin leading-[1.05] tracking-[-.05em] nav:col-span-7 nav:col-start-4 nav:mt-28" data-story-reveal>
                            And that is how <span className="text-nav-bg">HYSACHE</span> came to life.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-nav-bg px-[6%] py-24 text-cream nav:px-[8%] nav:py-40" aria-labelledby="hysache-title">
                <div className="pointer-events-none absolute -right-[.05em] top-8 text-[clamp(7rem,23vw,24rem)] font-thin leading-none tracking-[-.08em] text-nav-accent/[.06]" aria-hidden="true">H</div>
                <div className="relative mx-auto grid max-w-[1440px] gap-14 nav:grid-cols-12 nav:items-center">
                    <div className="nav:col-span-6" data-story-reveal>
                        <p className="eyebrow mb-8 text-nav-accent">Our name, our point of view</p>
                        <h2 id="hysache-title" className="text-[clamp(3.5rem,8vw,8rem)] font-thin leading-[.86] tracking-[-.055em] text-nav-accent">Everything<br />we learned,<br />made visible.</h2>
                    </div>
                    <div className="nav:col-span-4 nav:col-start-9" data-story-reveal>
                        <p className="text-[clamp(1.15rem,1.8vw,1.6rem)] leading-[1.75] text-cream/90">
                            HYSACHE is our way of bringing together everything we have learned over the years—our experience in manufacturing, our love for ethnic fashion, and our belief that beautifully made clothing should be within reach.
                        </p>
                        <div className="mt-12 h-px w-20 bg-nav-accent" aria-hidden="true" />
                    </div>
                </div>
            </section>

            <section className="px-[6%] py-24 nav:px-[8%] nav:py-44" aria-labelledby="luxe-title">
                <div className="mx-auto max-w-[1500px]">
                    <p className="eyebrow text-center text-faint">The belief</p>
                    <h2 id="luxe-title" className="mx-auto mt-8 max-w-[1200px] text-center text-[clamp(3.8rem,10vw,10rem)] font-thin leading-[.82] tracking-[-.065em]" data-story-reveal>
                        Homegrown<br /><span className="italic text-nav-bg/55">luxe.</span>
                    </h2>
                    <p className="mx-auto mt-14 max-w-[720px] text-center text-[clamp(1.2rem,2vw,1.8rem)] leading-[1.65] tracking-[-.02em] text-muted" data-story-reveal>
                        We believe in homegrown luxe: pieces that feel special, look refined, and are thoughtfully made.
                    </p>
                </div>
            </section>

            <section className="relative isolate flex min-h-[82svh] items-center overflow-hidden bg-nav-bg px-[6%] py-28 text-cream nav:px-[8%]" aria-labelledby="still-title">
                <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-[.2]"
                    style={{ backgroundImage: 'radial-gradient(rgb(247 221 221 / .3) .65px, transparent .65px)', backgroundSize: '4px 4px' }}
                    aria-hidden="true"
                />
                <div className="mx-auto w-full max-w-[1440px]" data-story-reveal>
                    <p className="eyebrow mb-8 text-nav-accent">Still becoming</p>
                    <h2 id="still-title" className="max-w-[1200px] text-[clamp(3rem,7.4vw,7.6rem)] font-thin leading-[.95] tracking-[-.055em]">
                        We are still on that journey—learning, creating, and bringing our vision of homegrown ethnic fashion to more people.
                    </h2>
                    <div className="mt-16 flex flex-col gap-6 border-t border-cream/25 pt-7 nav:flex-row nav:items-end nav:justify-between">
                        <p className="small-caps text-cream/55">Rooted in experience</p>
                        <p className="text-[clamp(1.4rem,2.5vw,2.5rem)] font-light text-nav-accent">HYSACHE — rooted in experience, made for today.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
