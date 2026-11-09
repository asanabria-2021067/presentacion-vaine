import gsap from 'gsap'

// Fotos libres (Unsplash License) de los postres. Un círculo por postre que
// se mueve, crece y gira entre slides; los "chips" nombran los ingredientes.
const BASE = 560
const KINDS = {
  brownie: { src: 'media/postres/brownie.jpg', chips: [['Cacao', '#75340f'], ['Avena', '#c99a55'], ['Menos azúcar', '#a5314a']] },
  cheesecake: { src: 'media/postres/cheesecake.jpg', chips: [['Lácteos', '#e8d0a4'], ['Frutos rojos', '#a5314a'], ['Base de avena', '#c99a55']] },
  muffin: { src: 'media/postres/muffin.jpg', chips: [['Avena', '#c99a55'], ['Frutas', '#a5314a'], ['Yogur', '#e8d0a4']] },
  pancakes: { src: 'media/postres/pancakes.jpg', chips: [['Avena', '#c99a55'], ['Frutas', '#a5314a'], ['Lácteos', '#e8d0a4']] },
}
const ANGLES = [-38, 4, 44]

class Hero {
  constructor(root) {
    this.root = root
    this.cur = null
    this.cfg = null
    this.pics = {}
    for (const [k, v] of Object.entries(KINDS)) {
      const d = document.createElement('div')
      d.className = 'hp'
      d.innerHTML = `<img src="${v.src}" alt="" draggable="false" />`
      root.appendChild(d)
      gsap.set(d, { xPercent: -50, yPercent: -50, opacity: 0, visibility: 'hidden' })
      this.pics[k] = d
    }
    this.chips = []
  }

  place(cfg) {
    return { x: cfg.x || 0, y: cfg.y || 0, scale: cfg.s || 1 }
  }

  show(cfg, { animate = true } = {}) {
    const prev = this.cur
    const kind = cfg ? cfg.kind : null
    const tilt = cfg?.tilt ?? -4
    const dur = animate ? 1.05 : 0

    if (prev && prev !== kind) {
      const out = this.pics[prev]
      gsap.killTweensOf(out)
      if (animate) {
        gsap.to(out, {
          opacity: 0,
          rotation: '+=140',
          scale: '*=0.55',
          duration: 0.7,
          ease: 'power2.in',
          onComplete: () => gsap.set(out, { visibility: 'hidden' }),
        })
      } else gsap.set(out, { opacity: 0, visibility: 'hidden' })
    }

    if (!cfg) {
      this.cur = null
      this.cfg = null
      this.setChips(null, false)
      return
    }

    const el = this.pics[kind]
    const to = { ...this.place(cfg), rotation: tilt }
    gsap.killTweensOf(el)
    if (prev !== kind) {
      gsap.set(el, { visibility: 'visible', ...to, ...(animate ? { rotation: tilt - 200, scale: to.scale * 0.55, opacity: 0 } : { opacity: 1 }) })
      if (animate) gsap.to(el, { ...to, opacity: 1, duration: 1.2, ease: 'back.out(1.25)', delay: prev ? 0.25 : 0.15 })
    } else {
      gsap.set(el, { visibility: 'visible', opacity: 1 })
      if (animate) gsap.to(el, { ...to, duration: dur + 0.15, ease: 'power3.inOut' })
      else gsap.set(el, to)
    }
    this.cur = kind
    this.cfg = cfg
    this.setChips(cfg.labels ? cfg : null, animate)
  }

  // giro completo del círculo (p. ej. un paso del procedimiento)
  spin(turns, dur = 1.3) {
    if (!this.cur) return
    gsap.to(this.pics[this.cur], { rotation: -4 + turns * 360, duration: dur, ease: 'power3.inOut', overwrite: 'auto' })
  }

  setChips(cfg, animate) {
    const old = this.chips
    this.chips = []
    for (const c of old) {
      gsap.killTweensOf(c)
      if (animate) gsap.to(c, { opacity: 0, scale: 0.8, duration: 0.25, onComplete: () => c.remove() })
      else c.remove()
    }
    if (!cfg) return
    const R = (BASE * (cfg.s || 1)) / 2 + 14 * (cfg.s || 1)
    const cx = 960 + (cfg.x || 0)
    const cy = 540 + (cfg.y || 0)
    KINDS[cfg.kind].chips.forEach(([name, dot], i) => {
      const a = (ANGLES[i] * Math.PI) / 180
      const px = cx + Math.cos(a) * R
      const py = cy + Math.sin(a) * R
      const c = document.createElement('div')
      c.className = 'chip'
      c.style.setProperty('--dot', dot)
      c.textContent = name
      this.root.appendChild(c)
      const w = c.offsetWidth
      const h = c.offsetHeight
      // el chip nace sobre el borde del círculo y se desliza hacia afuera
      const tx = px - 40
      const ty = py - h / 2
      gsap.set(c, { x: tx - 60, y: ty, opacity: 0, scale: 0.85 })
      gsap.to(c, { x: tx, opacity: 1, scale: 1, duration: animate ? 0.7 : 0, delay: animate ? 0.9 + i * 0.14 : 0, ease: 'back.out(1.5)' })
      this.chips.push(c)
    })
  }
}

export let d3 = null
export function initD3(stage) {
  d3 = new Hero(stage.querySelector('#hero'))
  return d3
}
