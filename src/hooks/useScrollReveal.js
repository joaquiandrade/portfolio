import { useEffect, useRef } from 'react'

/**
 * Adds the `is-visible` class to elements with the `reveal` class
 * once they enter the viewport. Attach the returned ref to a
 * container; every descendant with class="reveal ..." will animate.
 */
export default function useScrollReveal() {
  const containerRef = useRef(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const targets = node.classList.contains('reveal')
      ? [node, ...node.querySelectorAll('.reveal')]
      : [...node.querySelectorAll('.reveal')]

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return containerRef
}
