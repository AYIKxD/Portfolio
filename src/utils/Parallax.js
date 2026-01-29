/**
 * Parallax.js
 * Custom parallax system using ScrollTrigger to mimic ScrollSmoother's data-speed behavior
 * Works with Lenis for smooth scrolling
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export class Parallax {
  static init() {
    // Find all elements with data-speed attribute
    const parallaxElements = document.querySelectorAll('[data-speed]')

    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute('data-speed') || '1')
      const clamp = element.getAttribute('data-speed')?.includes('clamp')

      // Different behavior for clamped vs unclamped
      if (clamp) {
        // Clamped: slower movement, stays within bounds
        gsap.fromTo(element,
          { y: 0 },
          {
            y: () => {
              const rect = element.getBoundingClientRect()
              const scrollDistance = window.innerHeight + rect.height
              return -(scrollDistance * (1 - speed))
            },
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        )
      } else {
        // Unclamped: faster/slower based on speed value
        gsap.to(element, {
          y: (i, target) => {
            const rect = target.getBoundingClientRect()
            return -(rect.top - ScrollTrigger.maxScroll(window)) * (speed - 1)
          },
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'max',
            scrub: true,
            invalidateOnRefresh: true
          }
        })
      }
    })
  }
}
