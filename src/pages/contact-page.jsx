import { useLayoutEffect, useRef, useState } from 'react'
import ArrowIcon from '../components/arrow-icon.jsx'
import { CONTACT_FORM_URL } from '../config/site.js'
import useNavigationAnimationDelay from '../hooks/use-navigation-animation-delay.jsx'
import useReducedMotion from '../hooks/use-reduced-motion.js'
import { gsap } from '../lib/gsap.js'

const FIELD_CLASS = 'w-full rounded-xs border border-cream/15 bg-black/10 px-4 py-3.5 text-sm text-cream outline-none transition-colors placeholder:text-cream/35 hover:border-cream/30 focus:border-nav-accent'

function SuccessMessage() {
    return (
        <div className="contact-success mx-auto mt-12 flex min-h-[326px] max-w-[930px] flex-col items-center justify-center text-center nav:mt-14" role="status" aria-live="polite">
            <svg className="contact-success-mark h-40 w-40 overflow-visible nav:h-48 nav:w-48" viewBox="0 0 200 200" aria-hidden="true">
                <g className="contact-success-rays" fill="none" stroke="var(--color-nav-accent)" strokeLinecap="round" strokeWidth="6">
                    <line pathLength="1" x1="100" y1="24" x2="100" y2="8" />
                    <line pathLength="1" x1="100" y1="176" x2="100" y2="192" />
                    <line pathLength="1" x1="24" y1="100" x2="8" y2="100" />
                    <line pathLength="1" x1="176" y1="100" x2="192" y2="100" />
                    <line pathLength="1" x1="46" y1="46" x2="35" y2="35" />
                    <line pathLength="1" x1="154" y1="154" x2="165" y2="165" />
                    <line pathLength="1" x1="46" y1="154" x2="35" y2="165" />
                    <line pathLength="1" x1="154" y1="46" x2="165" y2="35" />
                </g>

                <polygon
                    className="contact-success-seal"
                    points="100,28 113,34 128,34 137,44 151,49 156,63 167,72 166,87 172,100 166,113 167,128 156,137 151,151 137,156 128,167 113,166 100,172 87,166 72,167 63,156 49,151 44,137 33,128 34,113 28,100 34,87 33,72 44,63 49,49 63,44 72,33 87,34"
                    fill="var(--color-nav-accent)"
                    stroke="var(--color-nav-accent)"
                    strokeLinejoin="round"
                    strokeWidth="8"
                />

                <path
                    className="contact-success-tick"
                    d="M65 101l24 24 48-51"
                    fill="none"
                    stroke="var(--color-nav-bg)"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="10"
                />
            </svg>

            <h2 className="contact-success-copy mt-5 text-2xl font-light text-nav-accent nav:text-3xl">Enquiry received.</h2>
            <p className="contact-success-copy mt-3 max-w-md text-sm leading-6 text-cream/70">
                Thank you for getting in touch. We’ll get back to you soon about your enquiry.
            </p>
        </div>
    )
}

export default function ContactPage() {
    const page = useRef(null)
    const reduced = useReducedMotion()
    const navigationAnimationDelay = useNavigationAnimationDelay()
    const [submissionState, setSubmissionState] = useState('idle')
    const [submissionError, setSubmissionError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        if (!CONTACT_FORM_URL) {
            setSubmissionError('The enquiry form is not configured yet. Please try again later.')
            return
        }

        const form = event.currentTarget
        const formData = new FormData(form)
        const payload = new URLSearchParams({
            name: String(formData.get('name') ?? '').trim(),
            contact: String(formData.get('contact') ?? '').trim(),
            message: String(formData.get('message') ?? '').trim(),
        })

        setSubmissionState('submitting')
        setSubmissionError('')

        try {
            await fetch(CONTACT_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: payload.toString(),
            })

            form.reset()
            setSubmissionState('success')
        } catch {
            setSubmissionState('idle')
            setSubmissionError('We couldn’t send your enquiry. Please check your connection and try again.')
        }
    }

    useLayoutEffect(() => {
        if (reduced) return

        const context = gsap.context(() => {
            gsap.from('.contact-title', {
                yPercent: 24,
                autoAlpha: 0,
                duration: 0.8,
                delay: navigationAnimationDelay / 1000,
                ease: 'power3.out',
            })

            gsap.from('.contact-form > *', {
                y: 20,
                autoAlpha: 0,
                duration: 0.55,
                stagger: 0.07,
                delay: 0.42 + navigationAnimationDelay / 1000,
                ease: 'power3.out',
            })
        }, page)

        return () => context.revert()
    }, [navigationAnimationDelay, reduced])

    return (
        <div ref={page} className="relative isolate min-h-svh place-content-center overflow-hidden bg-nav-bg px-[6%] pb-12 pt-24 text-cream nav:px-[8%] nav:pb-16 nav:pt-20">
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-[.18]"
                style={{
                    backgroundImage: 'radial-gradient(rgb(247 221 221 / .22) .65px, transparent .65px)',
                    backgroundSize: '4px 4px',
                }}
                aria-hidden="true"
            />
            {/* <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgb(35_7_18/.24)_70%,rgb(35_7_18/.55)_100%)]" aria-hidden="true" /> */}

            <section className="mx-auto max-w-[1180px]" aria-labelledby="contact-title">
                <h1
                    id="contact-title"
                    className="contact-title text-center text-[clamp(2rem,15.5vw,10rem)] font-thin leading-[.88] text-nav-accent"
                >
                    CONTACT<span className="text-[.28em]">.</span>
                </h1>

                {submissionState === 'success' ? (
                    <SuccessMessage />
                ) : (
                    <form
                        className="contact-form mx-auto mt-12 grid max-w-[930px] gap-5 nav:mt-14 nav:grid-cols-2 nav:gap-x-6 nav:gap-y-5"
                        onSubmit={handleSubmit}
                    >
                        <label className="grid gap-2 text-[12px] text-cream nav:col-span-1">
                            <span>Name <span className="text-nav-accent" aria-hidden="true">*</span></span>
                            <input className={FIELD_CLASS} type="text" name="name" placeholder="Your name" autoComplete="name" disabled={submissionState === 'submitting'} required />
                        </label>

                        <label className="grid gap-2 text-[12px] text-cream nav:col-span-1">
                            <span>Phone / Email <span className="text-nav-accent" aria-hidden="true">*</span></span>
                            <input className={FIELD_CLASS} type="text" name="contact" placeholder="Phone number or email address" autoComplete="email" disabled={submissionState === 'submitting'} required />
                        </label>

                        <label className="grid gap-2 text-[12px] text-cream nav:col-span-2">
                            <span>Message <span className="text-nav-accent" aria-hidden="true">*</span></span>
                            <textarea className={`${FIELD_CLASS} min-h-[130px] resize-y`} name="message" placeholder="Tell us how we can help" disabled={submissionState === 'submitting'} required />
                        </label>

                        <div className="flex flex-col items-end gap-3 nav:col-span-2">
                            {submissionError && (
                                <p className="text-right text-xs leading-5 text-nav-accent" role="alert">{submissionError}</p>
                            )}
                            <button
                                className="group mt-2 inline-flex min-w-[150px] cursor-pointer items-center justify-between gap-8 border border-cream/70 px-6 py-3.5 text-[10px] uppercase tracking-[.18em] text-cream transition-colors hover:border-nav-accent hover:bg-nav-accent hover:text-nav-bg focus-visible:bg-nav-accent focus-visible:text-nav-bg disabled:cursor-wait disabled:opacity-60"
                                type="submit"
                                disabled={submissionState === 'submitting'}
                            >
                                {submissionState === 'submitting' ? 'Sending…' : 'Send'}
                                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </div>
    )
}
