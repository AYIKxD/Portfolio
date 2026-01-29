import Emitter from './Emitter'
import { gsap } from 'gsap/gsap-core'

class Ticker {
  constructor() {
    this.callbacks = []
    this.delta = 0
  }

  init() {
    gsap.ticker.add(this.tick.bind(this))
  }

  tick(time, delta) {
    const self = this

    this.delta = delta

    this.callbacks.forEach((object, index) => {
      object.callback.apply(object.context)
      delete self.callbacks[index]
    })

    Emitter.emit('tick', time * 1000)
  }

  nextTick(callback, context) {
    this.callbacks.push({
      callback,
      context
    })
  }
}

export default new Ticker()
