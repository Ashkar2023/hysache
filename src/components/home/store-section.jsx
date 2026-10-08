import storeMapImage from '../../assets/images/hysache-map.svg'
import storeImage from '../../assets/images/store.jpeg'
import { GOOGLE_MAPS_URL } from '../../config/site.js'

export default function StoreSection() {
    return (
        <section
            id="store"
            className="relative isolate overflow-hidden bg-nav-bg"
            aria-labelledby="store-title"
        >
            <div className="grid min-h-svh nav:grid-cols-[46%_54%]">
                <div className="relative min-h-[62svh] overflow-hidden nav:min-h-svh">
                    <img
                        src={storeImage}
                        alt="Inside the Hysache store, with curated garments and warm wooden displays"
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-nav-bg/25" aria-hidden="true" />
                    <div
                        className="absolute inset-0 bg-linear-to-t from-nav-bg via-nav-bg/15 to-transparent nav:bg-linear-to-r nav:from-nav-bg/65 nav:via-nav-bg/15 nav:to-nav-bg"
                        aria-hidden="true"
                    />

                    <div className="absolute inset-x-0 bottom-0 z-10 px-[9%] pb-12 text-cream nav:bottom-auto nav:top-1/2 nav:-translate-y-1/2 nav:px-[14%] nav:pb-0">
                        <p className="eyebrow mb-7">04 — Our store</p>
                        <h2
                            id="store-title"
                            className="max-w-[520px] text-[clamp(40px,5.5vw,76px)] font-light leading-[1.04] tracking-[-.05em]"
                        >
                            Come in.
                            <br />Stay awhile.
                        </h2>
                        <p className="mt-7 max-w-[420px] text-sm leading-[1.95] text-cream/85">
                            Discover the collection in person, explore fabrics at your own pace, and let us help shape something that feels entirely yours.
                        </p>
                    </div>
                </div>

                <div className="relative flex items-center justify-center overflow-hidden bg-nav-bg nav:min-h-svh">
                    <a
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener"
                        referrerPolicy="origin"
                        className="relative block w-full h-full"
                        aria-label="Open Hysache in Google Maps"
                    >
                        <div
                            className="pointer-events-none absolute inset-0 z-10
                                bg-linear-to-b from-0% from-nav-bg to-10% to-transparent nav:bg-linear-to-r from-0% from-nav-bg to-20% to-transparent"
                            aria-hidden="true"
                        />
                        <img
                            src={storeMapImage}
                            alt="Illustrated map showing Hysache and nearby landmarks"
                            className="block h-full w-auto select-none object-cover scale-125 sm:scale-100"
                            draggable="false"
                        />
                        <span className="small-caps absolute bottom-6 right-6 inline-flex items-center text-nav-accent md:gap-4 md:px-5 md:py-3">
                            Open in Google Maps
                            <span className="text-base transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    )
}

