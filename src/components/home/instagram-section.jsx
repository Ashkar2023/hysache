import instagramHysache from '../../assets/images/ig/hysache-campaign.webp'
import instagramStyle from '../../assets/images/ig/hysache-style.webp'
import instagramZarafshan from '../../assets/images/ig/zarafshan-campaign.webp'
import { INSTAGRAM_URL } from '../../config/site.js'

const INSTAGRAM_IMAGES = [
    {
        src: instagramHysache,
        alt: 'Hysache campaign featuring a model in an ivory embroidered outfit',
    },
    {
        src: instagramStyle,
        alt: 'Hysache campaign featuring a model in an orange embroidered outfit',
    },
    {
        src: instagramZarafshan,
        alt: 'Hysache Zarafshan campaign featuring a model in a blue embroidered outfit',
    },
]

export default function InstagramSection() {
    return (
        <section
            id="instagram"
            className="relative z-10 overflow-hidden bg-footer-cream py-24 nav:py-36"
            aria-labelledby="instagram-title"
        >
            <div className="px-[7%]">
                <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 text-center nav:flex-row nav:items-end nav:justify-between nav:text-left">
                    <div>
                        <p className="eyebrow mb-7 text-nav-bg">From our Instagram</p>
                        <h2
                            id="instagram-title"
                            className="max-w-[760px] text-[clamp(42px,6vw,82px)] font-light leading-[1.02] tracking-[-.055em] text-nav-bg"
                        >
                            Worn, loved, shared.
                        </h2>
                    </div>

                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="small-caps group inline-flex w-fit items-center gap-4 border-b border-nav-bg/30 pb-2 text-nav-bg transition-colors duration-300 hover:border-nav-bg"
                    >
                        Explore
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
                        </svg>
                    </a>
                </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-[1440px] gap-8 px-[7%] nav:mt-24 nav:grid-cols-3 nav:gap-[clamp(18px,2.5vw,42px)]">
                {INSTAGRAM_IMAGES.map((image) => (
                    <a
                        key={image.src}
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="block aspect-[3/4] overflow-hidden shadow-[0_12px_30px_rgba(111,29,51,0.12)]"
                        aria-label="View Hysache on Instagram"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="size-full object-cover"
                            loading="lazy"
                        />
                    </a>
                ))}
            </div>
        </section>
    )
}
