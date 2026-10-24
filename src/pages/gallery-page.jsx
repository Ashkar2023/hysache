import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap.js'
import useNavigationAnimationDelay from '../hooks/use-navigation-animation-delay.jsx'
import galleryOne from '../assets/images/gallery/1.webp'
import galleryTwo from '../assets/images/gallery/12.webp'
import galleryThree from '../assets/images/gallery/3.webp'
import galleryFour from '../assets/images/gallery/2.webp'
import galleryFive from '../assets/images/gallery/11.webp'
import gallerySix from '../assets/images/gallery/9.webp'
import gallerySeven from '../assets/images/story-fabricstudy.webp'
import galleryEight from '../assets/images/gallery/8.webp'
import galleryNine from '../assets/images/gallery/6.webp'
import galleryTen from '../assets/images/gallery/10.webp'
import galleryEleven from '../assets/images/gallery/5.webp'
import galleryTwelve from '../assets/images/gallery/7.webp'

const GALLERY_COPY = [
    'Between fittings and final frames, there are quieter moments that shape the work: a sleeve being pinned, a hem finding its line, and morning light moving slowly across the studio floor.',
    'This is where we keep the fragments around each collection. Fabric studies, half-finished ideas, familiar faces, and glimpses from the road sit together without needing to become a campaign.',
    'Think of it as an open notebook from Hysache — a place for the process, the people, and the small details that usually remain just outside the finished photograph.',
]

const GALLERY_IMAGES = [
    {
        src: galleryOne,
        alt: 'Gallery study one',
        className: 'relative col-span-4 col-start-2 row-start-1 aspect-[3/4] nav:top-0 nav:col-span-2 nav:col-start-1',
    },
    {
        src: galleryTwo,
        alt: 'Gallery study two',
        className: 'relative top-12 col-span-5 col-start-7 row-start-1 aspect-[3/4] nav:top-20 nav:col-span-3 nav:col-start-4',
    },
    {
        src: galleryThree,
        alt: 'Gallery study three',
        className: 'relative col-span-5 col-start-1 row-start-2 aspect-[3/4] nav:top-8 nav:col-span-2 nav:col-start-10 nav:row-start-1',
    },
    {
        src: galleryFour,
        alt: 'Gallery study four',
        className: 'relative top-12 col-span-4 col-start-8 row-start-2 aspect-[3/4] nav:top-0 nav:col-span-3 nav:col-start-2 nav:row-start-2',
    },
    {
        src: galleryFive,
        alt: 'Gallery study five',
        className: 'relative col-span-4 col-start-2 row-start-3 aspect-[3/4] nav:top-24 nav:col-span-2 nav:col-start-7 nav:row-start-2',
    },
    {
        src: gallerySix,
        alt: 'Gallery study six',
        className: 'relative top-12 col-span-5 col-start-7 row-start-3 aspect-[3/4] nav:top-8 nav:col-span-2 nav:col-start-11 nav:row-start-2',
    },
    {
        src: gallerySeven,
        alt: 'Gallery study seven',
        className: 'relative col-span-5 col-start-1 row-start-4 aspect-[3/4] nav:top-12 nav:col-span-2 nav:col-start-1 nav:row-start-3',
    },
    {
        src: galleryEight,
        alt: 'Gallery study eight',
        className: 'relative top-12 col-span-4 col-start-8 row-start-4 aspect-[3/4] nav:top-0 nav:col-span-3 nav:col-start-4 nav:row-start-3',
    },
    {
        src: galleryNine,
        alt: 'Gallery study nine',
        className: 'relative col-span-4 col-start-2 row-start-5 aspect-[3/4] nav:top-20 nav:col-span-2 nav:col-start-10 nav:row-start-3',
    },
    {
        src: galleryTen,
        alt: 'Gallery study ten',
        className: 'relative top-12 col-span-5 col-start-7 row-start-5 aspect-[3/4] nav:top-16 nav:col-span-3 nav:col-start-2 nav:row-start-4',
    },
    {
        src: galleryEleven,
        alt: 'Gallery study eleven',
        className: 'relative col-span-5 col-start-1 row-start-6 aspect-[3/4] nav:top-0 nav:col-span-2 nav:col-start-7 nav:row-start-4',
    },
    {
        src: galleryTwelve,
        alt: 'Gallery study twelve',
        className: 'relative top-12 col-span-4 col-start-8 row-start-6 aspect-[3/4] nav:top-20 nav:col-span-2 nav:col-start-11 nav:row-start-4',
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
            const titleLines = gsap.utils.toArray('.gallery-title-line')

            gsap.from(titleLines, {
                yPercent: 110,
                duration: 0.9,
                stagger: 0.1,
                delay: navigationAnimationDelay / 1000,
                ease: 'power4.out',
            })

            gsap.set(imageCards, { clipPath: 'inset(100%)' })

            gsap.to(imageCards, {
                clipPath: 'inset(0%)',
                duration: 0.8,
                stagger: 0.12,
                delay: .35 + navigationAnimationDelay / 1000,
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
    }, [navigationAnimationDelay])

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
                <span className="inline-block text-left">
                    <span className="block overflow-hidden pb-[.1em]"><span className="gallery-title-line block">Behind</span></span>
                    <span className="block overflow-hidden pb-[.1em]"><span className="gallery-title-line ml-[12vw] block nav:ml-[23vw]">the scenes</span></span>
                </span>
            </h1>
            <div className="relative z-1 opacity-80 mt-32 grid w-full grid-cols-12 items-start gap-x-3 gap-y-[clamp(8rem,18vh,14rem)] px-3 min-[480px]:gap-x-4 min-[480px]:px-5 nav:gap-x-6 nav:px-[4%]">
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

            <div className="gallery-copy-container pointer-events-none absolute inset-x-0 top-0 pt-[30vh] sm:pt-[35vh] md:pt-[40vh] nav:pt-[50vh]">
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
