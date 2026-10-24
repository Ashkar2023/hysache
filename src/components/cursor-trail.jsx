import { useEffect, useRef } from 'react'
import useReducedMotion from '../hooks/use-reduced-motion.js'

const POINT_COUNT = 13 // more points = longer trail
const FOLLOW = 0.5 // how tightly each point follows the one in front (0.1 = very loose, 0.9 = tight)
const MAX_DELTA = 3

export default function CursorTrail() {
    const svg = useRef(null)
    const reduced = useReducedMotion()

    useEffect(() => {
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
        if (reduced || !finePointer.matches) return

        const trail = svg.current
        const path = trail.querySelector('path')
        const pointer = { x: 0, y: 0 }
        const points = Array.from({ length: POINT_COUNT }, () => ({
            x: 0,
            y: 0,
        }))

        let initialized = false
        let previousTime = 0
        let frame = null

        function resize() {
            trail.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`)
        }

        function draw() {
            let data = `M ${points[0].x} ${points[0].y}`

            for (let index = 1; index < points.length - 1; index += 1) {
                const point = points[index]
                const next = points[index + 1]
                const midpointX = (point.x + next.x) / 2
                const midpointY = (point.y + next.y) / 2

                data += ` Q ${point.x} ${point.y} ${midpointX} ${midpointY}`
            }

            const last = points.at(-1)
            data += ` L ${last.x} ${last.y}`
            path.setAttribute('d', data)
        }

        function animate(time) {
            const delta = previousTime ? Math.min((time - previousTime) / 16.667, MAX_DELTA) : 1
            const follow = 1 - Math.pow(1 - FOLLOW, delta)

            previousTime = time

            // The head sticks to the pointer.
            points[0].x = pointer.x
            points[0].y = pointer.y

            // Every other point walks toward the point in front of it.
            for (let index = 1; index < points.length; index += 1) {
                const point = points[index]
                const ahead = points[index - 1]

                point.x += (ahead.x - point.x) * follow
                point.y += (ahead.y - point.y) * follow
            }

            draw()

            // Keep animating until the tail has reached the pointer.
            const tail = points.at(-1)
            const gap = Math.abs(pointer.x - tail.x) + Math.abs(pointer.y - tail.y)

            if (gap > 0.05) {
                frame = window.requestAnimationFrame(animate)
            } else {
                frame = null
                previousTime = 0
            }
        }

        function handlePointerMove(event) {
            pointer.x = event.clientX
            pointer.y = event.clientY

            if (!initialized) {
                points.forEach((point) => {
                    point.x = pointer.x
                    point.y = pointer.y
                })
                initialized = true
                draw()
            }

            trail.style.opacity = '1'

            if (frame === null) {
                frame = window.requestAnimationFrame(animate)
            }
        }

        function handlePointerLeave() {
            trail.style.opacity = '0'
        }

        resize()
        window.addEventListener('resize', resize)
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        document.documentElement.addEventListener('pointerleave', handlePointerLeave)

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', handlePointerMove)
            document.documentElement.removeEventListener('pointerleave', handlePointerLeave)

            if (frame !== null) {
                window.cancelAnimationFrame(frame)
            }
        }
    }, [reduced])

    return (
        <svg
            ref={svg}
            className="pointer-events-none fixed inset-0 z-[60] h-svh w-screen opacity-0 mix-blend-difference transition-opacity duration-200"
            aria-hidden="true"
            preserveAspectRatio="none"
        >
            <path
                d="M 0 0"
                fill="none"
                stroke="var(--color-nav-accent)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    )
}