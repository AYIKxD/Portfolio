/**
 * Splitter.js
 * A lightweight utility to split text into lines, words, and characters
 * for GSAP animations.
 */

export class Splitter {
  static split({ element, type = 'chars' }) {
    if (!element) return null

    const text = element.textContent.trim()
    element.innerHTML = ''

    // Split logic
    if (type === 'chars') {
      const chars = text.split('')
      chars.forEach((char, i) => {
        const span = document.createElement('span')
        span.classList.add('split-char')
        span.style.display = 'inline-block'
        span.style.whiteSpace = 'pre'
        span.textContent = char === ' ' ? '\u00A0' : char
        span.dataset.char = char
        element.appendChild(span)
      })
      return element.querySelectorAll('.split-char')
    }

    if (type === 'words') {
      const words = text.split(' ')
      words.forEach((word, i) => {
        const span = document.createElement('span')
        span.classList.add('split-word')
        span.style.display = 'inline-block'
        span.style.whiteSpace = 'pre'
        span.textContent = word + (i !== words.length - 1 ? '\u00A0' : '')
        span.dataset.word = word
        element.appendChild(span)
      })
      return element.querySelectorAll('.split-word')
    }

    if (type === 'lines') {
      // Basic line splitting (requires fixed width or manual <br> usually, 
      // but here we just wrap logical chunks if provided, otherwise words)
      // For true line splitting in responsive layout, we'd need more complex logic.
      // We'll fallback to words for now as it's safer for simple needs.
      return this.split({ element, type: 'words' })
    }
  }
}
