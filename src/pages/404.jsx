import useSiteNavigation from '../hooks/use-site-navigation.js'

export default function NotFoundPage() {
    const navigate = useSiteNavigation()

    return (
        <section className="flex min-h-svh items-center justify-center bg-nav-bg px-6 pb-16 pt-28 text-center text-cream" aria-labelledby="not-found-title">
            <div>
                <p className="eyebrow text-nav-accent">Error 404</p>
                <h1 id="not-found-title" className="mt-5 text-[clamp(4.5rem,22vw,13rem)] font-thin leading-[.8] tracking-tighter text-nav-accent">
                    NOT FOUND
                </h1>
                <p className="mx-auto mt-8 max-w-sm text-sm leading-7 text-cream/70">
                    The page you're looking for isn't available..
                </p>
                <a
                    href="/#home"
                    className="group mt-9 inline-flex items-center gap-8 border border-cream/60 px-6 py-3.5 text-[10px] uppercase tracking-[.18em] transition-colors hover:border-nav-accent hover:bg-nav-accent hover:text-nav-bg focus-visible:bg-nav-accent focus-visible:text-nav-bg"
                    onClick={(event) => navigate(event, '/#home')}
                >
                    Back home
                    <span className="text-base transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
            </div>
        </section>
    )
}
