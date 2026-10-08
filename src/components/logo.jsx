import logoMarkup from '../assets/logo.svg?raw'

const inlineLogo = logoMarkup
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/fill="#[^"]*"/g, 'fill="currentColor"')

export default function Logo({ className = '' }) {
    return (
        <span
            className={`block w-12 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:fill-current ${className}`}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: inlineLogo }}
        />
    )
}
