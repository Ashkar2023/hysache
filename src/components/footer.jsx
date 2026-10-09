import { CONTACT_EMAIL, FOOTER_NAVIGATION, GOOGLE_MAPS_URL, WHATSAPP_URL } from '../config/site.js'
import footerPattern from '../assets/images/footer-bg-pattern.png'
import useSiteNavigation from '../hooks/use-site-navigation.js'
import Logo from './logo.jsx'

const COPYRIGHT_YEAR = new Date().getFullYear()
const FOOTER_LINK = 'mb-2.5 block w-fit text-[12px] leading-none text-nav-bg transition-colors duration-300 hover:text-ink focus-visible:text-ink nav:mb-4 nav:text-[13px]'

export default function Footer() {
    const navigate = useSiteNavigation()

    return (
        <footer id="contact" className="site-footer isolate flex flex-col justify-end overflow-hidden bg-footer-cream px-[7%] pb-6 text-nav-bg">
            <div className="pointer-events-none absolute inset-x-0 bottom-[430px] top-0 z-0 nav:bottom-[285px]" aria-hidden="true">
                <img
                    src={footerPattern}
                    alt=""
                    className="h-full w-full object-cover object-center opacity-30 md:opacity-10"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 0%, black 25%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 25%, transparent 100%)',
                    }}
                />
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-6 pb-9 nav:grid-cols-[1.65fr_.85fr_1fr_.85fr_.28fr] nav:gap-10 nav:pb-[54px]">
                <div className="col-span-full nav:col-auto">
                    <a href="/#home" className="group inline-flex items-center gap-4" aria-label="Hysache home" onClick={(event) => navigate(event, '/#home')}>
                        <Logo className="w-[42px] text-nav-bg transition-transform duration-300 group-hover:rotate-6 nav:w-[54px]" />
                        <span className="text-[32px] font-light leading-none tracking-[-.055em] nav:text-[44px] uppercase tracking-wide">Hysache</span>
                    </a>
                    <p className="max-w-[240px] text-[11px] leading-[1.7] text-footer-muted nav:mt-7 nav:text-[12px]">
                        Homegrown luxe.
                    </p>
                </div>

                <nav aria-label="Explore">
                    <p className="mb-4 text-[9px] uppercase tracking-[.04em] text-footer-muted nav:mb-7 nav:text-[10px]">Explore</p>
                    {FOOTER_NAVIGATION.explore.map(([label, href]) => (
                        <a key={label} href={href} className={FOOTER_LINK} onClick={(event) => navigate(event, href)}>{label}</a>
                    ))}
                </nav>

                <nav aria-label="Collections">
                    <p className="mb-4 text-[9px] uppercase tracking-[.04em] text-footer-muted nav:mb-7 nav:text-[10px]">Collections</p>
                    {FOOTER_NAVIGATION.collections.map(([label, href]) => (
                        <a key={label} href={href} className={FOOTER_LINK} onClick={(event) => navigate(event, href)}>{label}</a>
                    ))}
                </nav>

                <nav aria-label="Visit">
                    <p className="mb-4 text-[9px] uppercase tracking-[.04em] text-footer-muted nav:mb-7 nav:text-[10px]">Visit</p>
                    {FOOTER_NAVIGATION.visit.map(([label, href]) => (
                        <a
                            key={label}
                            href={href}
                            className={FOOTER_LINK}
                            onClick={href.startsWith('http') ? undefined : (event) => navigate(event, href)}
                            {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <div>
                    <p className="mb-4 text-[9px] uppercase tracking-[.04em] text-footer-muted nav:mb-7 nav:text-[10px]">Connect</p>
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
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3 border-t border-line pt-5 font-mono text-[9px] text-footer-muted nav:flex-row nav:items-center nav:justify-between nav:pt-6 nav:text-[10px]">
                <span>© {COPYRIGHT_YEAR} Hysache</span>
                <div className="flex flex-wrap gap-x-7 gap-y-3">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Cookie Settings</span>
                </div>
            </div>
        </footer>
    )
}
