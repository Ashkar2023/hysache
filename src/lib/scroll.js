import { HEADER_OFFSET } from '../config/layout.js'

export function scrollToHash(hash, lenis) {
    const target = document.querySelector(hash)
    if (!target) return false

    if (lenis) {
        lenis.scrollTo(hash, { offset: -HEADER_OFFSET })
    } else {
        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        window.scrollTo({ top, behavior: 'instant' })
    }

    return true
}

export function scrollToTop(lenis) {
    if (lenis) {
        lenis.scrollTo(0, { immediate: true })
    } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }
}

