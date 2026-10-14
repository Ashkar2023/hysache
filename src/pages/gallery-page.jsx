import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap.js'
import useNavigationAnimationDelay from '../hooks/use-navigation-animation-delay.jsx'

const GALLERY_COPY = [
    'Between fittings and final frames, there are quieter moments that shape the work: a sleeve being pinned, a hem finding its line, and morning light moving slowly across the studio floor.',
    'This is where we keep the fragments around each collection. Fabric studies, half-finished ideas, familiar faces, and glimpses from the road sit together without needing to become a campaign.',
    'Think of it as an open notebook from Hysache — a place for the process, the people, and the small details that usually remain just outside the finished photograph.',
]

const GALLERY_IMAGES = [
    {
        src: '/src/assets/images/1.png',
        alt: 'Gallery study one',
        className: 'col-span-4 col-start-1 row-start-1 aspect-[32/41] nav:col-span-2 nav:col-start-1',
    },
    {
        src: 'https://placehold.co/760x560',
        alt: 'Gallery study two',
        className: 'col-span-5 col-start-8 row-start-1 aspect-[19/14] nav:col-span-3 nav:col-start-4',
    },
    {
        src: 'https://placehold.co/580x760',
        alt: 'Gallery study three',
        className: 'col-span-4 col-start-2 row-start-2 aspect-[29/38] nav:col-span-2 nav:col-start-10 nav:row-start-1',
    },
    {
        src: 'https://placehold.co/820x620',
        alt: 'Gallery study four',
        className: 'col-span-4 col-start-9 row-start-2 aspect-[41/31] nav:col-span-2 nav:col-start-2 nav:row-start-2',
    },
    {
        src: 'https://placehold.co/620x880',
        alt: 'Gallery study five',
        className: 'col-span-3 col-start-1 row-start-3 aspect-[31/44] nav:col-span-2 nav:col-start-6 nav:row-start-2',
    },
    {
        src: 'https://placehold.co/780x600',
        alt: 'Gallery study six',
        className: 'col-span-4 col-start-8 row-start-3 aspect-[13/10] nav:col-span-2 nav:col-start-11 nav:row-start-2',
    },
    {
        src: 'https://placehold.co/600x840',
        alt: 'Gallery study seven',
        className: 'col-span-5 col-start-2 row-start-4 aspect-[5/7] nav:col-span-3 nav:col-start-2 nav:row-start-3',
    },
    {
        src: 'https://placehold.co/860x620',
        alt: 'Gallery study eight',
        className: 'col-span-4 col-start-9 row-start-4 aspect-[43/31] nav:col-span-2 nav:col-start-9 nav:row-start-3',
    },
    {
        src: 'https://placehold.co/650x900',
        alt: 'Gallery study nine',
        className: 'col-span-4 col-start-1 row-start-5 aspect-[13/18] nav:col-span-2 nav:col-start-3 nav:row-start-4',
    },
    {
        src: 'https://placehold.co/900x640',
        alt: 'Gallery study ten',
        className: 'col-span-5 col-start-7 row-start-5 aspect-[45/32] nav:col-span-3 nav:col-start-6 nav:row-start-4',
    },
    {
        src: 'https://placehold.co/610x830',
        alt: 'Gallery study eleven',
        className: 'col-span-4 col-start-2 row-start-6 aspect-[61/83] nav:col-span-2 nav:col-start-11 nav:row-start-4',
    },
    {
        src: 'https://placehold.co/840x590',
        alt: 'Gallery study twelve',
        className: 'col-span-4 col-start-9 row-start-6 aspect-[84/59] nav:col-span-3 nav:col-start-1 nav:row-start-5',
    },
    {
        src: 'https://placehold.co/620x860',
        alt: 'Gallery study thirteen',
        className: 'col-span-4 col-start-1 row-start-7 aspect-[31/43] nav:col-span-2 nav:col-start-5 nav:row-start-5',
    },
    {
        src: 'https://placehold.co/880x620',
        alt: 'Gallery study fourteen',
        className: 'col-span-5 col-start-7 row-start-7 aspect-[44/31] nav:col-span-3 nav:col-start-9 nav:row-start-5',
    },
    {
        src: 'https://placehold.co/600x800',
        alt: 'Gallery study fifteen',
        className: 'col-span-4 col-start-5 row-start-8 aspect-[3/4] nav:col-span-2 nav:col-start-4 nav:row-start-6',
    },
]

const WORD_STEP = 1
const REVEAL_DURATION = 0.9

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

export default function GalleryPage() {
    const section = useRef(null)
    const copy = useRef(null)
    const zoomMargin = useZoomMargin()
    const navigationAnimationDelay = useNavigationAnimationDelay();

    useLayoutEffect(() => {
        let split

        const context = gsap.context(() => {
            const imageCards = gsap.utils.toArray('.gallery-image-card')

            gsap.set(imageCards, { clipPath: 'inset(100%)' })

            gsap.to(imageCards, {
                clipPath: 'inset(0%)',
                duration: 0.8,
                stagger: 0.12,
                delay: .35,
                ease: 'power4.out',
            })

            split = SplitText.create(copy.current, {
                type: 'words,lines',
                wordsClass: 'gallery-reveal-word',
                aria: 'none',
                mask: 'lines',
            })

            gsap.from(split.lines, {
                yPercent: 100,
                duration: 0.45,
                delay: .35 + navigationAnimationDelay / 1000,
                ease: 'power2.out',
            })

            const words = split.words
            const textLayers = words.map((word) => {
                const text = document.createElement('span')
                text.className = 'gallery-reveal-word-text'

                while (word.firstChild) text.appendChild(word.firstChild)

                word.appendChild(text)
                word.dataset.mark = text.textContent
                return text
            })

            gsap.set(textLayers, { backgroundPosition: '100% 0' })

            const timeline = gsap.timeline({ defaults: { ease: 'none' } })

            words.forEach((_, index) => {
                const at = index * WORD_STEP
                const text = textLayers[index]

                timeline.to(text, {
                    backgroundPosition: '0% 0',
                    duration: REVEAL_DURATION,
                }, at)
            })

            const scrubDuration = timeline.duration()

            timeline.fromTo(
                '.gallery-copy-container',
                {
                    y: 0,
                },
                {
                    y: () => Math.max(0, section.current.offsetHeight - window.innerHeight) * 0.82,
                    duration: scrubDuration,
                    ease: 'none'
                },
                0,
            )

            ScrollTrigger.create({
                trigger: section.current,
                animation: timeline,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                invalidateOnRefresh: true,
            })
        }, section)

        const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
            window.cancelAnimationFrame(frame)
            context.revert()
            split?.revert()
        }
    }, [])

    return (
        <section
            ref={section}
            className="relative w-full min-w-0 overflow-x-hidden bg-nav-bg pb-[20vh] text-cream"
            aria-labelledby="gallery-title"
        >
            <h1
                id="gallery-title"
                className="px-[6%] pt-32 text-center text-[clamp(3.2rem,10vw,9rem)] font-thin leading-[.88] text-nav-accent nav:px-[8%] uppercase"
            >
                Behind the<br />scenes
            </h1>
            <div className="relative z-0 mt-32 grid w-full grid-cols-12 items-start gap-x-3 gap-y-[clamp(8rem,18vh,14rem)] px-3 min-[480px]:gap-x-4 min-[480px]:px-5 nav:gap-x-6 nav:px-[4%]">
                {GALLERY_IMAGES.map((image) => (
                    <figure
                        key={image.src}
                        className={`gallery-image-card overflow-hidden rounded-xs bg-nav-bg ${image.className}`}
                    >
                        <Zoom
                            a11yNameButtonZoom={`Expand ${image.alt}`}
                            a11yNameButtonUnzoom={`Close expanded ${image.alt}`}
                            zoomMargin={zoomMargin}
                        >
                            <img
                                className="block h-full w-full object-cover"
                                src={image.src}
                                alt={image.alt}
                                loading='eager'
                                decoding="async"
                            />
                        </Zoom>
                    </figure>
                ))}
            </div>

            <div className="gallery-copy-container pointer-events-none absolute inset-x-0 top-0 z-20 pt-[30vh] sm:pt-[35vh] md:pt-[40vh] nav:pt-[50vh]">
                <div className="flex h-svh items-center justify-center px-[6%] nav:px-[8%]">
                    <div
                        ref={copy}
                        className="gallery-reveal-copy max-w-[1120px] text-center font-thin tracking-[-.035em]"
                    >
                        {GALLERY_COPY.map((paragraph) => (
                            <p key={paragraph} className="mb-[.72em] last:mb-0">{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
