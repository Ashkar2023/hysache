import { useLayoutEffect, useRef } from 'react'
import useNavigationAnimationDelay from '../hooks/use-navigation-animation-delay.jsx'
import useReducedMotion from '../hooks/use-reduced-motion.js'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import loomImage from '../assets/images/craft-loom.webp'
import threadImage from '../assets/images/craft-thread.webp'
import cutCloseImage from '../assets/images/craft-cutclose.webp'
import cutWideImage from '../assets/images/craft-cutwide.webp'

const CRAFT_IMAGES = {
    loom: 'https://placehold.co/1400x1000/4f1425/f7dddd?text=Loom+%26+Weaving',
    thread: 'https://placehold.co/760x980/e8d4cc/6f1d33?text=Thread+Study',
    hands: 'https://placehold.co/1200x900/c98282/4f1425?text=Made+By+Hand',
    finishing: 'https://placehold.co/760x980/f3efe8/6f1d33?text=Finishing+Details',
}

export default function CraftPage() {
    const page = useRef(null)
    const reduced = useReducedMotion()
    const navigationAnimationDelay = useNavigationAnimationDelay()

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const reveals = gsap.utils.toArray('[data-craft-reveal]')
            const images = gsap.utils.toArray('[data-craft-image]')

            if (reduced) {
                gsap.set([...reveals, ...images], { clearProps: 'all' })
                return
            }

            gsap.from('.craft-title-line', {
                yPercent: 115,
                duration: 1,
                stagger: 0.1,
                delay: navigationAnimationDelay / 1000,
                ease: 'power4.out',
            })

            reveals.forEach((element) => {
                gsap.from(element, {
                    y: 36,
                    autoAlpha: 0,
                    duration: 0.9,
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
                    clipPath: 'inset(10%)',
                    scale: 1.06,
                    duration: 1.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: image,
                        start: 'top 90%',
                        once: true,
                    },
                })
            })
        }, page)

        const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
            window.cancelAnimationFrame(frame)
            context.revert()
        }
    }, [navigationAnimationDelay, reduced])

    return (
        <div ref={page} className="overflow-hidden bg-cream text-nav-bg">
            <header className="flex min-h-[78svh] flex-col justify-end px-[6%] pb-14 pt-32 nav:px-[8%] nav:pb-20">
                <p className="eyebrow mb-8 text-faint">The making of Hysache</p>
                <h1 className="uppercase text-[clamp(5rem,18vw,16rem)] font-thin leading-[.72] tracking-[-.07em]">
                    <span className="block overflow-hidden pb-[.1em]"><span className="craft-title-line block">Craft</span></span>
                    <span className="block overflow-hidden pb-[.1em]"><span className="craft-title-line ml-[18vw] block text-nav-bg/45">& Detail<span className="text-[.2em]">.</span></span></span>
                </h1>
                <p className="ml-auto mt-10 max-w-[480px] border-t border-nav-bg/20 pt-5 text-[14px] leading-[1.9] text-muted">
                    From the making of the material to the final touch by hand, every stage leaves its mark.
                </p>
            </header>

            <div>
                <section className="bg-nav-bg px-[4%] py-24 text-cream nav:py-40" aria-labelledby="craft-material-title">
                    <div className="mx-auto max-w-[1600px]">
                        <div className="mb-14 grid gap-8 nav:grid-cols-12 nav:items-end">
                            <div className="nav:col-span-5" data-craft-reveal>
                                <p className="eyebrow mb-6 text-nav-accent">Craft</p>
                                <h2 id="craft-material-title" className="text-[clamp(3.3rem,7vw,7.2rem)] font-thin leading-[1] tracking-[-.055em] text-nav-accent">
                                    It begins with<br />the fabric.
                                </h2>
                            </div>
                            <p className="max-w-[540px] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.85] text-cream/75 nav:col-span-4 nav:col-start-9" data-craft-reveal>
                                Yarn, tension, rhythm, and time come together at the loom. We look closely at how a fabric is woven, how it falls, and how it will feel when worn.
                            </p>
                        </div>

                        <div className="grid grid-cols-12 items-start gap-3 nav:gap-6">
                            <figure className="col-span-9 overflow-hidden bg-nav-bg nav:col-span-8">
                                <img data-craft-image className="aspect-[4/3] h-full w-full object-cover" src={loomImage} alt="Placeholder for artisans weaving fabric on a loom" loading="eager" />
                            </figure>
                            <figure className="col-span-4 col-start-9 -mt-14 overflow-hidden border-[6px] border-nav-bg bg-nav-bg nav:col-span-3 nav:col-start-10 nav:mt-40 nav:border-0">
                                <img data-craft-image className="aspect-[3/4] h-full w-full object-cover" src={threadImage} alt="Placeholder for a close study of yarn and woven material" />
                            </figure>
                        </div>
                    </div>
                </section>

                <section className="bg-footer-cream px-[4%] py-24 nav:py-40" aria-labelledby="craft-detail-title">
                    <div className="mx-auto max-w-[1600px]">
                        <div className="grid grid-cols-12 items-start gap-3 nav:gap-6">
                            <figure className="col-span-6 col-start-1 row-start-2 -mt-16 overflow-hidden nav:col-span-3 nav:col-start-2 nav:row-start-1 nav:mt-40">
                                <img data-craft-image className="aspect-[3/4] h-full w-full object-cover" src={cutCloseImage} alt="Placeholder for a Hysache employee finishing a garment" />
                            </figure>
                            <figure className="col-span-11 col-start-2 row-start-1 overflow-hidden nav:col-span-7 nav:col-start-6">
                                <img data-craft-image className="aspect-[4/3] h-full w-full object-cover" src={cutWideImage} alt="Placeholder for employees handcrafting a Hysache piece" />
                            </figure>
                            <div className="col-span-5 col-start-8 row-start-2 self-center pl-2 nav:hidden" data-craft-reveal>
                                <span className="block h-px w-full bg-nav-bg/20" aria-hidden="true" />
                                <p className="eyebrow mt-4 text-faint">Measured / shaped / finished</p>
                                <p className="mt-4 text-[clamp(1.05rem,4.6vw,1.35rem)] font-light leading-[1.45] tracking-[-.025em] text-nav-bg/75">
                                    Every line considered before the final stitch.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 grid gap-8 nav:mt-24 nav:grid-cols-12">
                            <div className="nav:col-span-4" data-craft-reveal>
                                <p className="eyebrow mb-6 text-faint">Detail</p>
                                <h2 id="craft-detail-title" className="text-[clamp(3rem,6vw,6rem)] font-thin leading-[.92] tracking-[-.05em]">
                                    Finished<br />by hand.
                                </h2>
                            </div>
                            <div className="max-w-[680px] nav:col-span-6 nav:col-start-7" data-craft-reveal>
                                <p className="text-[clamp(1rem,1.6vw,1.35rem)] leading-[1.9] text-muted">
                                    This is where precision becomes personal. Our team shapes, embellishes, checks, and finishes each piece with a practiced eye and careful hands.
                                </p>
                                <p className="mt-7 text-[clamp(1rem,1.6vw,1.35rem)] leading-[1.9] text-muted">
                                    From elegant salwar suits and Pakistani sets to contemporary ethnic wear, every HYSACHE piece is chosen and created with the same attention to fabric, finish, and detail that has shaped our journey for more than 20 years.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex min-h-[55svh] items-center justify-center bg-cream px-[6%] py-24 text-center nav:px-[8%]" aria-label="Craft statement">
                    <p className="max-w-[1050px] text-[clamp(2.6rem,6vw,6.5rem)] font-thin leading-[1] tracking-[-.055em]" data-craft-reveal>
                        Made slowly.<br /><span className="text-nav-bg/45">Considered closely.</span>
                    </p>
                </section>
            </div>
        </div>
    )
}
