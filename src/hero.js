import gsap from 'gsap'

// Postres por capas hechos con imágenes de Canva (vista frontal, una por capa).
// Las capas flotan y se mecen como en una página de producto: al abrirse se
// separan en vertical, los ingredientes giran alrededor y cada capa se nombra.
const GAP = 150 // separación entre capas al abrir (px de diseño)
const DIR = 'media/capas/'

// capas de abajo hacia arriba. w = ancho de diseño, ov = cuánto se hunde en la de abajo
const KINDS = {
  brownie: {
    layers: [
      { src: 'brownie-3', w: 500, chip: ['Menos azúcar', '#a5314a'] },
      { src: 'brownie-2', w: 500, ov: 0.1, chip: ['Avena', '#c99a55'] },
      { src: 'brownie-1', w: 500, ov: 0.1, chip: ['Cacao', '#75340f'] },
    ],
    bits: ['sprite-8', 'sprite-8', 'sprite-3', 'sprite-7', 'sprite-9', 'sprite-8'],
  },
  cheesecake: {
    layers: [
      { src: 'cheesecake-3', w: 540, chip: ['Base de avena', '#c99a55'] },
      { src: 'cheesecake-2', w: 520, ov: 0.08, chip: ['Lácteos', '#e8d0a4'] },
      { src: 'cheesecake-1', w: 540, ov: 0.1, chip: ['Frutos rojos', '#a5314a'] },
    ],
    bits: ['sprite-1', 'sprite-6', 'sprite-12', 'sprite-1', 'sprite-6'],
  },
  muffin: {
    layers: [
      { src: 'muffin-3', w: 390, chip: ['Yogur', '#e8d0a4'] },
      { src: 'muffin-2', w: 290, ov: 0.52, chip: ['Avena', '#c99a55'] },
      { src: 'muffin-1', w: 400, ov: 0.12, chip: ['Frutas', '#a5314a'] },
    ],
    bits: ['sprite-1', 'sprite-6', 'sprite-13', 'sprite-3', 'sprite-12'],
  },
  pancakes: {
    layers: [
      { src: 'pancakes-2', w: 500, chip: ['Lácteos', '#e8d0a4'] },
      { src: 'pancakes-2', w: 480, ov: 0.2, mirror: true, chip: ['Avena', '#c99a55'] },
      { src: 'pancakes-1', w: 500, ov: 0.22, chip: ['Frutas', '#a5314a'] },
    ],
    bits: ['sprite-2', 'sprite-4', 'sprite-10', 'sprite-12', 'sprite-7'],
  },
}

const mkImg = (name, cls) => {
  const i = document.createElement('img')
  i.className = cls
  i.src = `${DIR}${name}.png`
  i.alt = ''
  i.draggable = false
  return i
}

class Hero {
  constructor(root) {
    this.root = root
    this.cur = null
    this.cfg = null
    this.chips = []
    this.objs = {}
    for (const [k, v] of Object.entries(KINDS)) this.objs[k] = this.build(k, v)
    gsap.ticker.add((t) => this.tick(t))
  }

  build(kind, def) {
    const el = document.createElement('div')
    el.className = 'dstack'
    el.style.visibility = 'hidden'
    const glow = document.createElement('div')
    glow.className = 'dglow'
    const shadow = document.createElement('div')
    shadow.className = 'dshadow'
    el.append(glow, shadow)
    const layers = def.layers.map((l, i) => {
      const img = mkImg(l.src, 'dlayer')
      img.style.zIndex = 10 + i
      el.appendChild(img)
      return { ...l, el: img, h: 0, y: 0, a: 1, drop: 0, flip: 0, wob: 0 }
    })
    const bits = def.bits.map((b, i) => {
      const img = mkImg(b, 'dbit')
      el.appendChild(img)
      return { el: img, ph: (i / def.bits.length) * Math.PI * 2, sp: 0.35 + (i % 3) * 0.09, size: 50 + (i % 4) * 9, lift: ((i * 37) % 100) / 100 - 0.5 }
    })
    const cuts = [-1, 1].map(() => {
      const c = document.createElement('div')
      c.className = 'dcut'
      el.appendChild(c)
      return c
    })
    const pack = document.createElement('div')
    pack.className = 'dpack'
    pack.innerHTML = '<b>VAINÉ</b>'
    el.appendChild(pack)
    this.root.appendChild(el)
    const o = { kind, el, glow, shadow, layers, bits, cuts, pack, s: { e: 0.12, orbit: 0.85, heat: 0, cut: 0, pack: 0, scale: 1, alpha: 1, fade: 1 }, ready: false, maxW: Math.max(...def.layers.map((l) => l.w)) }
    const loaded = Promise.all([...layers.map((l) => l.el), ...bits.map((b) => b.el)].map((i) => (i.complete ? 1 : new Promise((r) => (i.onload = i.onerror = r)))))
    loaded.then(() => {
      this.layout(o)
      o.ready = true
    })
    return o
  }

  // posiciones de reposo de cada capa (apiladas y centradas)
  layout(o) {
    let prevTop = 0
    o.layers.forEach((l, i) => {
      l.h = (l.w * l.el.naturalHeight) / l.el.naturalWidth
      const bottom = i === 0 ? 0 : prevTop + (l.ov || 0) * l.h
      l.y = bottom - l.h / 2
      prevTop = bottom - l.h
      l.el.style.width = `${l.w}px`
    })
    const shift = -(0 + prevTop) / 2
    o.layers.forEach((l) => (l.y += shift))
    o.stackH = -prevTop
  }

  tick(t) {
    for (const o of Object.values(this.objs)) {
      if (!o.ready || o.el.style.visibility === 'hidden') continue
      const { s } = o
      const n = o.layers.length
      o.layers.forEach((l, i) => {
        const open = GAP * s.e * (i - (n - 1) / 2)
        const bob = Math.sin(t * 1.4 + i * 1.3) * 5 * (0.4 + s.e)
        const y = l.y - open + bob + l.drop
        gsap.set(l.el, {
          x: 0,
          y,
          xPercent: -50,
          yPercent: -50,
          transformPerspective: 1100,
          rotationY: Math.sin(t * 0.6 + i * 0.9) * 13 + l.flip,
          rotationZ: Math.sin(t * 0.5 + i) * 1.1,
          scaleX: l.mirror ? -1 : 1,
          opacity: l.a * s.fade,
        })
      })
      // los ingredientes giran alrededor, delante y detrás de las capas
      const Rx = o.maxW / 2 + 60
      o.bits.forEach((b) => {
        const a = t * b.sp + b.ph
        const d = Math.sin(a)
        const amp = s.orbit
        gsap.set(b.el, {
          xPercent: -50,
          yPercent: -50,
          x: Math.cos(a) * Rx * amp,
          y: b.lift * (o.stackH + 120 + GAP * s.e * 1.2) + d * 38 * amp,
          scale: (b.size / 100) * (0.8 + 0.3 * d) * (0.6 + 0.4 * Math.min(1, amp + 0.2)),
          rotation: t * 24 + b.ph * 57,
          zIndex: d > 0 ? 40 : 4,
          opacity: Math.min(1, amp * 1.2) * s.fade * (0.82 + 0.18 * d),
        })
      })
      // brillo del horno
      gsap.set(o.glow, { opacity: s.heat * (0.7 + 0.15 * Math.sin(t * 3)), scale: 1 + 0.04 * Math.sin(t * 2) })
      const f = s.heat > 0.01 ? `brightness(${1 + s.heat * 0.1}) sepia(${s.heat * 0.28}) saturate(${1 + s.heat * 0.25})` : 'none'
      if (o.filter !== f) {
        o.filter = f
        o.layers.forEach((l) => (l.el.style.filter = f))
      }
      gsap.set(o.shadow, { scaleX: 1 - s.e * 0.12, opacity: 0.55 * s.fade, y: o.stackH / 2 + 14 + GAP * s.e * 1.05 })
      // cortes y empaque
      o.cuts.forEach((c, i) => {
        gsap.set(c, { x: (i ? 1 : -1) * (o.maxW / 6), y: 0, height: o.stackH + 20, scaleY: s.cut, opacity: s.cut > 0.02 ? 1 : 0, xPercent: -50, yPercent: -50 })
      })
      gsap.set(o.pack, { x: 0, y: -(1 - s.pack) * 520, yPercent: -50, xPercent: -50, height: o.stackH + 36, width: 150, opacity: s.pack > 0.02 ? Math.min(1, s.pack * 1.6) : 0 })
    }
  }

  show(cfg, { animate = true } = {}) {
    const prev = this.cur
    const kind = cfg ? cfg.kind : null

    if (prev && prev !== kind) {
      const o = this.objs[prev]
      gsap.killTweensOf([o.s, o.el, ...o.layers])
      const done = () => {
        o.el.style.visibility = 'hidden'
      }
      if (animate) {
        o.layers.forEach((l, i) => gsap.to(l, { drop: -520, duration: 0.6, delay: (o.layers.length - 1 - i) * 0.07, ease: 'power2.in' }))
        gsap.to(o.s, { fade: 0, orbit: 0, duration: 0.55, ease: 'power1.in', onComplete: done })
      } else done()
    }

    if (!cfg) {
      this.cur = null
      this.cfg = null
      this.setChips(null, false)
      return
    }

    const o = this.objs[kind]
    const e = cfg.labels ? 1 : cfg.explode ?? 0.12
    const sc = cfg.s || 1
    const px = 960 + (cfg.x || 0)
    const py = 540 + (cfg.y || 0)
    gsap.killTweensOf([o.s, o.el, ...o.layers])
    if (prev !== kind) {
      o.el.style.visibility = 'visible'
      gsap.set(o.el, { x: px, y: py, scale: sc })
      if (animate) {
        Object.assign(o.s, { e: 0.9, orbit: 0, heat: 0, cut: 0, pack: 0, fade: 0 })
        o.layers.forEach((l, i) => {
          l.drop = -640 - i * 120
          l.flip = -140
          gsap.to(l, { drop: 0, flip: 0, duration: 1.25, delay: (prev ? 0.45 : 0.2) + i * 0.16, ease: 'back.out(1.25)' })
        })
        gsap.to(o.s, { fade: 1, duration: 0.5, delay: prev ? 0.45 : 0.2 })
        gsap.to(o.s, { e, orbit: 0.85, duration: 1.4, delay: (prev ? 0.45 : 0.2) + 0.5, ease: 'power3.inOut' })
      } else {
        Object.assign(o.s, { e, orbit: 0.85, heat: 0, cut: 0, pack: 0, fade: 1 })
        o.layers.forEach((l) => Object.assign(l, { drop: 0, flip: 0 }))
      }
    } else {
      o.el.style.visibility = 'visible'
      const dur = animate ? 1.15 : 0
      gsap.to(o.el, { x: px, y: py, scale: sc, duration: dur, ease: 'power3.inOut' })
      gsap.to(o.s, { e, orbit: cfg.labels ? 1.1 : 0.85, heat: 0, cut: 0, pack: 0, fade: 1, duration: dur, ease: 'power3.inOut' })
    }
    this.cur = kind
    this.cfg = cfg
    this.setChips(cfg.labels ? cfg : null, animate)
  }

  // volteo de todas las capas, una tras otra, como un giro de plato
  spin(turns = 1, dur = 1.5) {
    if (!this.cur) return
    const o = this.objs[this.cur]
    o.layers.forEach((l, i) => gsap.fromTo(l, { flip: 0 }, { flip: 360 * Math.max(1, turns), duration: dur, delay: i * 0.12, ease: 'power3.inOut' }))
  }

  // paso a paso del procedimiento: 0 reposo, 1 preparar, 2 mezclar, 3 hornear, 4 enfriar y porcionar, 5 empacar
  phase(k, animate = true) {
    if (!this.cur) return
    const o = this.objs[this.cur]
    const P = [
      { e: 0.12, orbit: 0.85, heat: 0, cut: 0, pack: 0 },
      { e: 1, orbit: 1.15, heat: 0, cut: 0, pack: 0 },
      { e: 0, orbit: 0, heat: 0, cut: 0, pack: 0 },
      { e: 0, orbit: 0, heat: 1, cut: 0, pack: 0 },
      { e: 0.1, orbit: 0, heat: 0, cut: 1, pack: 0 },
      { e: 0, orbit: 0, heat: 0, cut: 1, pack: 1 },
    ][Math.max(0, Math.min(5, k))]
    gsap.to(o.s, { ...P, duration: animate ? 1.3 : 0, ease: 'power3.inOut', overwrite: 'auto' })
    if (k === 2 && animate) this.spin(1, 1.5)
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
    const n = o.layers.length
    o.layers.forEach((l, i) => {
      const [name, dot] = l.chip
      const c = document.createElement('div')
      c.className = 'chip'
      c.style.setProperty('--dot', dot)
      c.textContent = name
      this.root.appendChild(c)
      const h = c.offsetHeight
      const place = () => {
        const yy = (l.y - GAP * (i - (n - 1) / 2)) * sc
        const tx = cx + (l.w / 2) * sc * 0.78 + 36
        return { tx, ty: cy + yy - h / 2 }
      }
      const { tx, ty } = place()
      gsap.set(c, { x: tx - 60, y: ty, opacity: 0, scale: 0.85 })
      gsap.to(c, { x: tx, opacity: 1, scale: 1, duration: animate ? 0.7 : 0, delay: animate ? 1.15 + i * 0.14 : 0, ease: 'back.out(1.5)' })
      this.chips.push(c)
    })
  }
}

export let d3 = null
export function initD3(stage) {
  d3 = new Hero(stage.querySelector('#hero'))
  return d3
}
