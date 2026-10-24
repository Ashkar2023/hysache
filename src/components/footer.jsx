import { CONTACT_EMAIL, FOOTER_SITEMAP, FOOTER_VISIT, GOOGLE_MAPS_URL, INSTAGRAM_URL, WHATSAPP_URL } from '../config/site.js'
import footerPattern from '../assets/images/footer-bg-pattern-comp.png'
import fabricTexture from '../assets/images/fabric-texture.jpg'
import useSiteNavigation from '../hooks/use-site-navigation.js'
import Logo from './logo.jsx'

const COPYRIGHT_YEAR = new Date().getFullYear()
const FOOTER_LINK = 'mb-2.5 block w-fit text-[12px] leading-none text-nav-bg transition-colors duration-300 hover:text-ink focus-visible:text-ink nav:mb-4 nav:text-[13px]'

export default function Footer() {
    const navigate = useSiteNavigation()

    return (
        <footer id="contact" className="site-footer isolate flex flex-col justify-end overflow-hidden bg-footer-cream text-nav-bg">
            <div className="pointer-events-none absolute inset-x-0 bottom-1/2 top-0 z-0" aria-hidden="true">
                <img
                    src={footerPattern}
                    alt=""
                    className="h-full w-full object-cover object-center opacity-30 md:opacity-10 footer-bg-pattern"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                    }}
                />
            </div>

            <div className="relative z-10 flex gap-8 px-[7%] nav:grid nav:grid-cols-[minmax(0,1fr)_repeat(2,clamp(160px,18vw,260px))_auto] nav:gap-10">
                <div className="flex flex-1 flex-col nav:contents">
                    <div className="flex-1 nav:col-start-1 nav:row-start-1">
                        <a href="/#home" className="group inline-flex" aria-label="Hysache home" onClick={(event) => navigate(event, '/#home')}>
                            <Logo className="w-[42px] text-nav-bg transition-transform duration-400 ease-in-out group-hover:scale-110 nav:w-[54px]" />
                        </a>
                        <p className="mt-4 max-w-[240px] text-[11px] leading-[1.7] text-footer-muted nav:mt-7 nav:text-[12px]">
                            Homegrown luxe.
                        </p>
                    </div>

                    <div className="nav:col-start-4 nav:row-start-1">
                        <p className="mb-4 text-[9px] uppercase tracking-[.04em] text-footer-muted nav:mb-7 nav:text-[10px] hidden nav:block">Connect</p>
                        <div className="flex items-center gap-5 nav:flex-col nav:items-start nav:gap-6">
                            <a href={`mailto:${CONTACT_EMAIL}`} className="text-nav-bg transition-colors duration-300 hover:text-ink" aria-label="Email Hysache">
                                <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <rect x="2.75" y="5" width="18.5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-nav-bg transition-colors duration-300 hover:text-ink" aria-label="Message Hysache on WhatsApp">
                                <svg className="size-[21px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M20 11.6a8 8 0 0 1-12 6.94L4 19.6l1.14-3.88A8 8 0 1 1 20 11.6Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M9.33 7.4c-.38-.38-1.14 0-1.3.76-.45 2.66 3.8 6.84 6.46 7.22.76-.15 1.14-.91.76-1.3l-1.52-1.14c-.38-.22-.76.61-1.14.54-.99-.31-2.05-1.37-2.36-2.36-.07-.38.76-.76.54-1.14L9.33 7.4Z" fill="currentColor" />
                                </svg>
                            </a>
                            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="text-nav-bg transition-colors duration-300 hover:text-ink" aria-label="Find Hysache on Google Maps">
                                <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </a>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-nav-bg transition-colors duration-300 hover:text-ink" aria-label="Follow Hysache on Instagram">
                                <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <nav className="hidden nav:col-start-2 nav:row-start-1 nav:block" aria-label="Visit">
                    <p className="mb-7 text-[10px] uppercase tracking-[.04em] text-footer-muted">Visit</p>
                    {FOOTER_VISIT.map(([label, href]) => (
                        <a
                            key={href}
                            href={href}
                            className={FOOTER_LINK}
                            onClick={href.startsWith('http') ? undefined : (event) => navigate(event, href)}
                            {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <nav className="w-[40%] shrink-0 nav:col-start-3 nav:row-start-1 nav:w-auto" aria-label="Sitemap">
                    <p className="mb-4 text-[9px] uppercase tracking-[.04em] text-footer-muted nav:mb-7 nav:text-[10px]">Sitemap</p>
                    {FOOTER_SITEMAP.map(([label, href]) => (
                        <a key={href} href={href} className={FOOTER_LINK} onClick={(event) => navigate(event, href)}>{label}</a>
                    ))}
                </nav>
            </div>

            <a
                href="/#home"
                className="group relative z-10 mt-5 block w-full overflow-hidden"
                aria-label="Hysache home"
                onClick={(event) => navigate(event, '/#home')}
            >
                <svg
                    className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.01] group-focus-visible:scale-[1.01]"
                    viewBox="0 0 1600 280"
                    role="img"
                    aria-label="Hysache"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <pattern
                            id="footer-wordmark-texture"
                            width="320"
                            height="178"
                            patternUnits="userSpaceOnUse"
                        >
                            <image
                                href={fabricTexture}
                                width="320"
                                height="178"
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </pattern>
                        <mask id="footer-wordmark-mask">
                            <rect width="1600" height="280" fill="black" />
                            <text
                                x="32"
                                y="258"
                                fill="white"
                                fontFamily="Manrope, sans-serif"
                                fontSize="320"
                                fontWeight="500"
                                letterSpacing="12"
                                textLength="1536"
                                lengthAdjust="spacing"
                            >
                                HYSACHE
                            </text>
                        </mask>
                    </defs>
                    <rect
                        width="1600"
                        height="280"
                        fill="url(#footer-wordmark-texture)"
                        mask="url(#footer-wordmark-mask)"
                    />
                </svg>
            </a>
        </footer>
    )
}
