import { CONTACT_EMAIL } from '../config/site.js'

const FIELD_CLASS = 'w-full rounded-xs border border-cream/15 bg-black/10 px-4 py-3.5 text-sm text-cream outline-none transition-colors placeholder:text-cream/35 hover:border-cream/30 focus:border-nav-accent'

export default function ContactPage() {
    return (
        <div className="relative isolate min-h-svh overflow-hidden bg-nav-bg px-[6%] pb-12 pt-24 text-cream nav:px-[8%] nav:pb-16 nav:pt-20">
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-[.18]"
                style={{
                    backgroundImage: 'radial-gradient(rgb(247 221 221 / .22) .65px, transparent .65px)',
                    backgroundSize: '4px 4px',
                }}
                aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgb(35_7_18/.24)_70%,rgb(35_7_18/.55)_100%)]" aria-hidden="true" />

            <section className="mx-auto max-w-[1180px]" aria-labelledby="contact-title">
                <h1
                    id="contact-title"
                    className="text-center text-[clamp(4.8rem,15.5vw,13.5rem)] font-light leading-[.88] tracking-[-.075em] text-nav-accent"
                >
                    CONTACT<span className="text-[.28em]">.</span>
                </h1>

                <form
                    className="mx-auto mt-12 grid max-w-[930px] gap-5 nav:mt-14 nav:grid-cols-2 nav:gap-x-6 nav:gap-y-5"
                    action={`mailto:${CONTACT_EMAIL}`}
                    method="post"
                    encType="text/plain"
                >
                    <label className="grid gap-2 text-[12px] text-cream nav:col-span-1">
                        <span>Name <span className="text-nav-accent" aria-hidden="true">*</span></span>
                        <input className={FIELD_CLASS} type="text" name="name" placeholder="Your name" autoComplete="name" required />
                    </label>

                    <label className="grid gap-2 text-[12px] text-cream nav:col-span-1">
                        <span>Phone / Email <span className="text-nav-accent" aria-hidden="true">*</span></span>
                        <input className={FIELD_CLASS} type="text" name="contact" placeholder="Phone number or email address" autoComplete="email" required />
                    </label>

                    <label className="grid gap-2 text-[12px] text-cream nav:col-span-2">
                        <span>Message <span className="text-nav-accent" aria-hidden="true">*</span></span>
                        <textarea className={`${FIELD_CLASS} min-h-[130px] resize-y`} name="message" placeholder="Tell us how we can help" required />
                    </label>

                    <div className="flex justify-end nav:col-span-2">
                        <button
                            className="group mt-2 inline-flex min-w-[150px] cursor-pointer items-center justify-between gap-8 border border-cream/70 px-6 py-3.5 text-[10px] uppercase tracking-[.18em] text-cream transition-colors hover:border-nav-accent hover:bg-nav-accent hover:text-nav-bg focus-visible:bg-nav-accent focus-visible:text-nav-bg"
                            type="submit"
                        >
                            Send
                            <span className="text-base font-light transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}
