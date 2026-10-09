import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import { CATALOG_COLLECTIONS } from '../data/catalog.js'
import useReducedMotion from '../hooks/use-reduced-motion.js'
import { gsap, ScrollTrigger } from '../lib/gsap.js'

const CARD_LAYOUTS = {
    'wide-left': 'col-span-2 md:col-span-5 nav:col-span-7',
    'narrow-right': 'col-span-1 max-[359px]:col-span-2 md:col-span-3 nav:col-span-5',
    'narrow-left': 'col-span-1 max-[359px]:col-span-2 md:col-span-3 nav:col-span-5',
    'wide-right': 'col-span-2 md:col-span-5 nav:col-span-7',
    full: 'col-span-1 max-[359px]:col-span-2 md:col-span-8 nav:col-span-12',
}

const PAIRED_CARD_LAYOUTS = {
    'wide-left': 'col-span-2 md:col-span-5 nav:col-span-7',
    'narrow-right': 'col-span-2 md:col-span-3 nav:col-span-5',
    'narrow-left': 'col-span-2 md:col-span-3 nav:col-span-5',
    'wide-right': 'col-span-2 md:col-span-5 nav:col-span-7',
    full: 'col-span-2 md:col-span-8 nav:col-span-12',
}

const CARD_ASPECTS = {
    'wide-left': 'aspect-[4/5] min-[480px]:aspect-[16/11] md:aspect-[5/6] nav:aspect-[7/5]',
    'narrow-right': 'aspect-[3/4] md:aspect-[3/5] nav:aspect-[5/7]',
    'narrow-left': 'aspect-[3/4] md:aspect-[3/5] nav:aspect-[5/7]',
    'wide-right': 'aspect-[4/5] min-[480px]:aspect-[16/11] md:aspect-[5/6] nav:aspect-[7/5]',
    full: 'aspect-[3/4] max-[359px]:aspect-[4/5] md:aspect-[16/9]',
}

function useZoomMargin() {
    const [margin, setMargin] = useState(16)

    useEffect(() => {
        const media = window.matchMedia('(min-width: 768px)')
        const update = () => setMargin(media.matches ? 40 : 16)

        update()
        media.addEventListener('change', update)
        return () => media.removeEventListener('change', update)
    }, [])

    return margin
}

function CollectionStory({ collection, index, compact = false }) {
    if (compact) {
        return (
            <p className="collection-story-enter flex items-center gap-3 whitespace-nowrap small-caps">
                <span className="text-faint">{String(index + 1).padStart(2, '0')} / {String(CATALOG_COLLECTIONS.length).padStart(2, '0')}</span>
                <span className="h-px w-5 bg-line" aria-hidden="true" />
                <span>{collection.title}</span>
            </p>
        )
    }

    return (
        <div className="collection-story-enter">
            <p className="eyebrow mb-7 text-faint">
                {String(index + 1).padStart(2, '0')} / {String(CATALOG_COLLECTIONS.length).padStart(2, '0')}
            </p>
            <h2 className="max-w-[310px] text-[clamp(2rem,3.5vw,3.8rem)] font-light leading-[1.04] text-nav-bg tracking-[-.05em]">
                {collection.title}
            </h2>
            <p className="mt-6 max-w-[310px] text-[13px] leading-[1.9] text-muted">
                {collection.description}
            </p>
        </div>
    )
}

export default function CollectionsPage() {
    const catalog = useRef(null)
    const compactBarSentinel = useRef(null)
    const reduced = useReducedMotion()
    const zoomMargin = useZoomMargin()
    const [activeIndex, setActiveIndex] = useState(0)
    const [isCompactBarStuck, setIsCompactBarStuck] = useState(false)
    const activeCollection = CATALOG_COLLECTIONS[activeIndex]

    useEffect(() => {
        const sentinel = compactBarSentinel.current
        if (!sentinel) return

        const observer = new IntersectionObserver(([entry]) => {
            setIsCompactBarStuck(entry.boundingClientRect.top <= 80)
        }, {
            rootMargin: '-80px 0px 0px 0px',
            threshold: 0,
        })

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [])

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const sections = gsap.utils.toArray('.catalog-collection')

            sections.forEach((section, index) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 38%',
                    end: 'bottom 38%',
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                })
            })

            const cards = gsap.utils.toArray('.catalog-image-card')

            if (reduced) {
                gsap.set(cards, { clearProps: 'all' })
                return
            }

            cards.forEach((card) => {
                gsap.from(card, {
                    y: 36,
                    autoAlpha: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 92%',
                        once: true,
                    },
                })
            })
        }, catalog)

        const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
            window.cancelAnimationFrame(frame)
            context.revert()
        }
    }, [reduced])

    return (
        <div className="bg-cream shadow-xs shadow-nav-bg border-zinc-300 bg-linear-to-b from-transparent via-transparent via-80% to-nav-bg/15">
            <section className="flex min-h-[clamp(300px,58svh,380px)] items-end px-[5%] pb-12 pt-32 sm:px-[7%] sm:pb-16" aria-labelledby="magazine-title">
                <div className="mx-auto w-full max-w-[1600px]">
                    <p className="eyebrow mb-6 text-faint text-center">The complete collection</p>
                    <div className="flex flex-col items-center">
                        <h1 id="magazine-title" className="uppercase text-[clamp(3.2rem,10vw,9rem)] text-center font-thin leading-[.90] tracking-tight pb-4 text-nav-bg">
                            Hysache Magazine
                        </h1>
                        <p className="mx-auto w-full md:w-1/3 text-center text-sm leading-[1.9] text-muted md:pb-1">
                            A living edit of thoughtful silhouettes, tactile fabrics, and pieces made to move through everyday rituals. Explore the complete Hysache wardrobe, gathered in one place.
                        </p>
                        <p className="small-caps mt-6 text-center text-faint">
                            [Select any image for a closer look]
                        </p>
                    </div>
                </div>
            </section>

            <section ref={catalog} className="relative mx-auto max-w-[1600px] px-3 pb-28 pt-8 min-[480px]:px-5 md:grid md:grid-cols-[minmax(0,2.125fr)_minmax(210px,1fr)] md:gap-6 md:px-[4%] md:pb-40 md:pt-16 nav:grid-cols-[minmax(0,2.85fr)_minmax(240px,1fr)] nav:gap-[clamp(32px,4vw,72px)]" aria-label="All Hysache collections">
                <div ref={compactBarSentinel} className="pointer-events-none absolute left-0 top-8 h-px w-px" aria-hidden="true" />
                <div
                    className={`sticky top-20 z-30 -mx-3 mb-7 border-y border-line bg-cream/95 px-4 py-4 backdrop-blur-sm transition-[opacity,transform] duration-300 min-[480px]:-mx-5 min-[480px]:px-6 md:hidden ${isCompactBarStuck ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}
                    aria-hidden="true"
                >
                    <CollectionStory key={activeCollection.id} collection={activeCollection} index={activeIndex} compact />
                </div>

                <div className="min-w-0 md:mt-0 -mt-20">
                    {CATALOG_COLLECTIONS.map((collection, collectionIndex) => (
                        <section
                            key={collection.id}
                            id={collection.id}
                            className="catalog-collection mb-20 scroll-mt-[136px] last:mb-0 md:mb-24 md:scroll-mt-28 nav:mb-32"
                            aria-labelledby={`${collection.id}-title`}
                        >
                            <div className="mb-7 px-1 md:sr-only">
                                <p className="eyebrow mb-3 text-faint">{String(collectionIndex + 1).padStart(2, '0')} — Collection</p>
                                <h2 id={`${collection.id}-title`} className="text-[clamp(2rem,10vw,3.25rem)] font-light text-nav-bg leading-none tracking-[-.05em]">
                                    {collection.title}
                                </h2>
                                <p className="mt-4 max-w-[520px] text-[13px] leading-[1.8] text-muted">
                                    {collection.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 min-[480px]:gap-3 md:grid-cols-8 md:gap-3 nav:grid-cols-12 nav:gap-4">
                                {collection.products.map((product, productIndex) => {
                                    const layout = collection.products.length === 2
                                        ? PAIRED_CARD_LAYOUTS[product.layout]
                                        : CARD_LAYOUTS[product.layout]

                                    return (
                                        <figure
                                            key={product.id}
                                            className={`catalog-image-card min-w-0 overflow-hidden rounded-xs bg-footer-cream ${layout} ${CARD_ASPECTS[product.layout]}`}
                                        >
                                            <Zoom
                                                a11yNameButtonZoom={`Expand ${product.name}`}
                                                a11yNameButtonUnzoom={`Close expanded ${product.name}`}
                                                zoomMargin={zoomMargin}
                                            >
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={product.image}
                                                    alt={product.alt}
                                                    style={{ objectPosition: product.position }}
                                                    loading={collectionIndex === 0 && productIndex === 0 ? 'eager' : 'lazy'}
                                                    decoding="async"
                                                />
                                            </Zoom>
                                        </figure>
                                    )
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                <aside className="relative hidden md:block" aria-hidden="true">
                    <div className="sticky top-[80px] border-t border-line pt-7">
                        <CollectionStory key={activeCollection.id} collection={activeCollection} index={activeIndex} />
                    </div>
                </aside>
            </section>
        </div>
    )
}
