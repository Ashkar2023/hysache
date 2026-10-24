export default function ArrowIcon({ className = '', direction = 'right' }) {
    const path = direction === 'up-right'
        ? 'M7 17 17 7M8 7h9v9'
        : 'M5 12h14m-5-5 5 5-5 5'

    return (
        <svg
            className={`block shrink-0 ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            <path d={path} />
        </svg>
    )
}
