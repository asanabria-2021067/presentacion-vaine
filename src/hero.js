import gsap from 'gsap'

// Postres con imágenes de Canva (vista frontal). En casi todas las slides se ve
// el postre COMPLETO flotando; al cambiar de slide se va hacia arriba y el
// siguiente entra desde abajo, como un scroll automático. Con `labels` el postre
// se separa en sus capas y cada capa nombra su ingrediente.
const DIR = 'media/capas/'
const GAP = 125
const RISE = 820 // distancia del "scroll" de entrada y salida

const KINDS = {
  brownie: {
    whole: 'brownie', ww: 470,
    layers: [
      { src: 'brownie-3', w: 470, chip: ['Menos azúcar', '#a5314a'] },
      { src: 'brownie-2', w: 470, ov: 0.1, chip: ['Avena', '#c99a55'] },
      { src: 'brownie-1', w: 470, ov: 0.1, chip: ['Cacao', '#75340f'] },
    ],
    bits: ['sprite-3', 'sprite-10', 'sprite-12', 'sprite-4', 'sprite-5'],
  },
  cheesecake: {
    whole: 'cheesecake', ww: 520,
    layers: [
      { src: 'cheesecake-3', w: 540, chip: ['Base de avena', '#c99a55'] },
      { src: 'cheesecake-2', w: 520, ov: 0.08, chip: ['Lácteos', '#e8d0a4'] },
      { src: 'cheesecake-1', w: 540, ov: 0.1, chip: ['Frutos rojos', '#a5314a'] },
    ],
    bits: ['sprite-1', 'sprite-9', 'sprite-18', 'sprite-15'],
  },
  muffin: {
    whole: 'muffin', ww: 440,
    layers: [
      { src: 'muffin-3', w: 390, chip: ['Yogur', '#e8d0a4'] },
      { src: 'muffin-2', w: 290, ov: 0.52, chip: ['Avena', '#c99a55'] },
      { src: 'muffin-1', w: 400, ov: 0.12, chip: ['Frutas', '#a5314a'] },
    ],
    bits: ['sprite-1', 'sprite-9', 'sprite-11', 'sprite-4'],
  },
  pancakes: {
    whole: 'pancakes', ww: 480,
    layers: [
      { src: 'pancakes-2', w: 500, chip: ['Lácteos', '#e8d0a4'] },
      { src: 'pancakes-2', w: 480, ov: 0.2, mirror: true, chip: ['Avena', '#c99a55'] },
      { src: 'pancakes-1', w: 500, ov: 0.22, chip: ['Frutas', '#a5314a'] },
    ],
    bits: ['sprite-2', 'sprite-8', 'sprite-15', 'sprite-18'],
  },
}

export const mkImg = (name, cls = '') => {
  const i = document.createElement('img')
  i.className = cls
  i.src = `${DIR}${name}.png`
  i.alt = ''
  i.draggable = false
  return i
}
const ready = (imgs) => Promise.all(imgs.map((i) => (i.complete && i.naturalWidth ? 1 : new Promise((r) => (i.onload = i.onerror = r)))))

class Hero {
  constructor(root) {
    this.root = root
    this.cur = null
    this.cfg = null
    this.chips = []
    this.objs = {}
    for (const [k, v] of Object.entries(KINDS)) this.objs[k] = this.build(k, v)
  }

  build(kind, def) {
    const el = document.createElement('div')
    el.className = 'dstack'
    el.style.visibility = 'hidden'
    const shadow = document.createElement('div')
    shadow.className = 'dshadow'
    el.appendChild(shadow)
    const whole = mkImg(def.whole, 'dwhole')
    whole.style.width = `${def.ww}px`
    el.appendChild(whole)
    const layers = def.layers.map((l, i) => {
      const img = mkImg(l.src, 'dlayer')
      img.style.width = `${l.w}px`
      img.style.zIndex = 10 + i
      el.appendChild(img)
      return { ...l, el: img, y: 0, h: 0 }
    })
    const bits = def.bits.map((b, i) => {
      const img = mkImg(b, 'dbit')
      el.appendChild(img)
      return { el: img, a: (i / def.bits.length) * 360 }
    })
    this.root.appendChild(el)
    const o = { kind, def, el, whole, shadow, layers, bits, split: 0 }
    o.ready = ready([whole, ...layers.map((l) => l.el)]).then(() => this.layout(o))
    // estado base
    gsap.set([whole, ...layers.map((l) => l.el)], { xPercent: -50, yPercent: -50, x: 0, y: 0 })
    gsap.set(layers.map((l) => l.el), { opacity: 0 })
    bits.forEach((b) => gsap.set(b.el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.6 }))
    return o
  }

  layout(o) {
    let prevTop = 0
    o.layers.forEach((l, i) => {
      l.h = (l.w * l.el.naturalHeight) / l.el.naturalWidth
      const bottom = i === 0 ? 0 : prevTop + (l.ov || 0) * l.h
      l.y = bottom - l.h / 2
      prevTop = bottom - l.h
      if (l.mirror) gsap.set(l.el, { scaleX: -1 })
    })
    const shift = -prevTop / 2
    o.layers.forEach((l) => (l.y += shift))
    o.stackH = -prevTop
    o.wholeH = (o.def.ww * o.whole.naturalHeight) / o.whole.naturalWidth
    gsap.set(o.shadow, { y: Math.max(o.wholeH, o.stackH) / 2 + 10 })
  }

  // posiciones de las capas: e = 0 juntas, 1 separadas
  layerY(o, i, e) {
    const n = o.layers.length
    return o.layers[i].y - GAP * e * (i - (n - 1) / 2)
  }

  // separa (on) o vuelve a juntar el postre en sus capas
  splitTo(o, on, { delay = 0, animate = true } = {}) {
    const d = animate ? 1 : 0
    const tl = gsap.timeline({ delay: animate ? delay : 0 })
    if (on) {
      tl.set(o.layers.map((l) => l.el), { opacity: 1 }, 0)
      o.layers.forEach((l, i) => tl.set(l.el, { y: this.layerY(o, i, 0) }, 0))
      tl.to(o.whole, { opacity: 0, duration: 0.25 * d }, 0)
      o.layers.forEach((l, i) => tl.to(l.el, { y: this.layerY(o, i, 1), rotation: (i - 1) * -2.5, duration: 1.1 * d, ease: 'power3.inOut' }, 0.1 * d))
      o.bits.forEach((b, i) => {
        const a = (b.a * Math.PI) / 180
        const R = Math.max(...o.layers.map((l) => l.w)) / 2 + 80
        tl.fromTo(b.el, { x: 0, y: 0, opacity: 0, scale: 0.3, rotation: 0 }, { x: Math.cos(a) * R, y: Math.sin(a) * (o.stackH / 2 + GAP), opacity: 1, scale: 0.75, rotation: 160, duration: 1.2 * d, ease: 'back.out(1.4)' }, 0.25 * d + i * 0.05 * d)
      })
    } else {
      o.layers.forEach((l, i) => tl.to(l.el, { y: this.layerY(o, i, 0), rotation: 0, duration: 0.8 * d, ease: 'power3.inOut' }, 0))
      tl.to(o.bits.map((b) => b.el), { x: 0, y: 0, opacity: 0, scale: 0.3, duration: 0.6 * d, ease: 'power2.in' }, 0)
      tl.to(o.whole, { opacity: 1, duration: 0.3 * d }, 0.65 * d)
      tl.set(o.layers.map((l) => l.el), { opacity: 0 }, 0.95 * d)
    }
    o.split = on ? 1 : 0
    return tl
  }

  reset(o) {
    gsap.killTweensOf([o.el, o.whole, ...o.layers.map((l) => l.el), ...o.bits.map((b) => b.el)])
    gsap.set(o.whole, { opacity: 1, y: 0, rotation: 0 })
    o.layers.forEach((l) => gsap.set(l.el, { opacity: 0, y: 0, rotation: 0 }))
    o.bits.forEach((b) => gsap.set(b.el, { opacity: 0, x: 0, y: 0, scale: 0.3 }))
    o.split = 0
  }

  show(cfg, { animate = true } = {}) {
    const prev = this.cur
    const kind = cfg ? cfg.kind : null

    // el anterior se va hacia arriba, como si se hiciera scroll
    if (prev && prev !== kind) {
      const o = this.objs[prev]
      gsap.killTweensOf(o.el)
      if (animate) {
        gsap.to(o.el, { y: `-=${RISE}`, rotation: -6, opacity: 0, duration: 0.9, ease: 'power2.in', onComplete: () => (o.el.style.visibility = 'hidden') })
      } else {
        o.el.style.visibility = 'hidden'
      }
    }

    if (!cfg) {
      this.cur = null
      this.cfg = null
      this.setChips(null, false)
      return
    }

    const o = this.objs[kind]
    const sc = cfg.s || 1
    const px = 960 + (cfg.x || 0)
    const py = 540 + (cfg.y || 0)
    const wantSplit = !!cfg.labels
    gsap.killTweensOf(o.el)
    o.ready.then(() => {
      if (prev !== kind) {
        this.reset(o)
        o.el.style.visibility = 'visible'
        if (animate) {
          gsap.fromTo(o.el, { x: px, y: py + RISE, scale: sc * 0.9, rotation: 8, opacity: 1 }, { y: py, scale: sc, rotation: 0, duration: 1.25, delay: prev ? 0.35 : 0.15, ease: 'power3.out' })
          if (wantSplit) this.splitTo(o, true, { delay: prev ? 1.35 : 1.2 })
        } else {
          gsap.set(o.el, { x: px, y: py, scale: sc, rotation: 0, opacity: 1 })
          if (wantSplit) this.splitTo(o, true, { animate: false })
        }
      } else {
        o.el.style.visibility = 'visible'
        gsap.to(o.el, { x: px, y: py, scale: sc, rotation: 0, opacity: 1, duration: animate ? 1.1 : 0, ease: 'power3.inOut' })
        if (wantSplit !== !!o.split) this.splitTo(o, wantSplit, { animate })
      }
      this.setChips(wantSplit ? cfg : null, animate)
    })
    this.cur = kind
    this.cfg = cfg
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
    const o = this.objs[cfg.kind]
    const sc = cfg.s || 1
    const cx = 960 + (cfg.x || 0)
    const cy = 540 + (cfg.y || 0)
    o.layers.forEach((l, i) => {
      const [name, dot] = l.chip
      const c = document.createElement('div')
      c.className = 'chip'
      c.style.setProperty('--dot', dot)
      c.textContent = name
      this.root.appendChild(c)
      const h = c.offsetHeight
      const tx = cx + (l.w / 2) * sc * 0.8 + 30
      const ty = cy + this.layerY(o, i, 1) * sc - h / 2
      gsap.set(c, { x: tx - 60, y: ty, opacity: 0, scale: 0.85 })
      gsap.to(c, { x: tx, opacity: 1, scale: 1, duration: animate ? 0.7 : 0, delay: animate ? 1.9 + i * 0.14 : 0, ease: 'back.out(1.5)' })
      this.chips.push(c)
    })
  }
}

export let d3 = null
export function initD3(stage) {
  d3 = new Hero(stage.querySelector('#hero'))
  return d3
}
