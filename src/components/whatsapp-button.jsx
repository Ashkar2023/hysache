import { WHATSAPP_URL } from '../config/site.js'

export default function WhatsAppButton() {
    // Replace the generic WhatsApp destination with the label's verified number before launch.
    return (
        <a
            className="fixed bottom-6 right-6 z-30 grid size-12 place-items-center rounded-full bg-nav-bg text-nav-accent"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open WhatsApp"
            data-menu-background
        >
            <svg className="size-[29px]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M26 15.5a10.5 10.5 0 0 1-15.8 9.1L5 26l1.5-5.1A10.5 10.5 0 1 1 26 15.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 10c-.5-.5-1.5 0-1.7 1-.6 3.5 5 9 8.5 8.5 1-.2 1.5-1.2 1-1.7l-2-1.5c-.5-.3-1 .8-1.5.7-1.3-.4-2.7-1.8-3.1-3.1-.1-.5 1-1 .7-1.5L12 10Z" fill="currentColor" />
            </svg>
        </a>
    )
}

