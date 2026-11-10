import gsap from 'gsap'
import { mkImg } from './hero.js'

// Escena de la preparación del brownie, al estilo de una página con scroll
// automático: cada paso (clic) reproduce solo su tramo. El brownie se separa en
// ingredientes, los ingredientes caen al bowl, la masa se vierte al molde, se
// hornea, se porciona y se empaca. Detrás va una palabra gigante por paso.
// state(k) es el estado final de cada paso; play(k) lo anima desde k-1.

const CX = 1450 // centro de la escena en el lienzo de 1920×1080
const CY = 590
const WORDS = ['Brownie', 'Pesar', 'Mezclar', 'Hornear', 'Porcionar', 'Empacar']
const LAYERS = [
  { src: 'brownie-3', chip: ['Menos azúcar', '#a5314a'] },
  { src: 'brownie-2', chip: ['Avena', '#c99a55'] },
  { src: 'brownie-1', chip: ['Cacao', '#75340f'] },
]
const LY = [175, 0, -185] // capas separadas
const LY0 = [62, 2, -62] // capas juntas
const FALL = ['sprite-3', 'sprite-4', 'sprite-5', 'sprite-10', 'sprite-6', 'sprite-11', 'sprite-12', 'sprite-13', 'sprite-14', 'sprite-7']

const div = (cls) => {
  const d = document.createElement('div')
  d.className = cls
  return d
}

export class Proceso {
  constructor(host) {
    this.host = host
    host.innerHTML = ''
    const add = (n) => (host.appendChild(n), n)
    this.word = add(div('pword'))
    this.glow = add(div('pglow'))
    this.whole = add(mkImg('brownie', 'pimg'))
    this.layers = LAYERS.map((l) => add(mkImg(l.src, 'pimg')))
    this.chips = LAYERS.map((l) => {
      const c = add(div('chip pchip'))
      c.style.setProperty('--dot', l.chip[1])
      c.textContent = l.chip[0]
      return c
    })
    this.bowl = add(mkImg('bowl', 'pimg'))
    this.bowlMasa = add(mkImg('bowl-masa', 'pimg'))
    this.whisk = add(mkImg('batidor', 'pimg'))
    this.stream = add(div('pstream'))
    this.panMasa = add(mkImg('molde-masa', 'pimg'))
    this.panHorn = add(mkImg('molde-horneado', 'pimg'))
    this.steam = [0, 1, 2].map(() => add(div('psteam')))
    this.cuts = [0, 1, 2].map(() => add(div('pcut')))
    this.piece = add(mkImg('brownie', 'pimg'))
    this.box = add(mkImg('caja', 'pimg'))
    this.fall = FALL.map((s) => add(mkImg(s, 'pimg pfall')))
    this.dust = Array.from({ length: 34 }, () => add(div('pdust')))

    const W = (el, w) => (el.style.width = `${w}px`)
    W(this.whole, 430)
    this.layers.forEach((l) => W(l, 440))
    W(this.bowl, 470)
    W(this.bowlMasa, 470)
    W(this.whisk, 230)
    W(this.panMasa, 520)
    W(this.panHorn, 520)
    W(this.piece, 300)
    W(this.box, 330)
    this.fall.forEach((f, i) => W(f, 46 + (i % 3) * 14))
    gsap.set(host.querySelectorAll('.pimg, .pchip, .pword, .pglow, .pstream, .psteam, .pcut, .pdust'), { position: 'absolute', left: 0, top: 0, xPercent: -50, yPercent: -50 })
    this.k = -1
  }

  // estado final de cada paso (sin animación)
  state(k) {
    const S = (el, v) => gsap.set(el, { x: CX, y: CY, rotation: 0, scale: 1, opacity: 0, ...v })
    const all = [this.whole, ...this.layers, ...this.chips, this.bowl, this.bowlMasa, this.whisk, this.stream, this.panMasa, this.panHorn, this.piece, this.box, this.glow, ...this.steam, ...this.cuts, ...this.fall, ...this.dust]
    gsap.killTweensOf(all)
    gsap.killTweensOf(this.word)
    all.forEach((el) => S(el, {}))
    gsap.set(this.word, { x: CX, y: CY - 60, opacity: 1, yPercent: -50, xPercent: -50 })
    this.word.textContent = WORDS[k]
    if (k === 0) S(this.whole, { opacity: 1 })
    if (k === 1) {
      this.layers.forEach((l, i) => S(l, { opacity: 1, x: CX - 70, y: CY + LY[i], rotation: (i - 1) * -2.5 }))
      this.chips.forEach((c, i) => S(c, { opacity: 1, x: CX + 175, y: CY + LY[i], xPercent: 0 }))
    }
    if (k === 2) {
      S(this.bowlMasa, { opacity: 1, y: CY + 90 })
      S(this.bowl, { opacity: 0, y: CY + 90 })
      S(this.whisk, { opacity: 1, x: CX + 120, y: CY - 70, rotation: -30 })
    }
    if (k === 3) S(this.panHorn, { opacity: 1, y: CY + 80 })
    if (k === 4) {
      S(this.panHorn, { opacity: 1, y: CY + 150, scale: 0.9 })
      this.cutPos().forEach((p, i) => S(this.cuts[i], { opacity: 1, ...p }))
      S(this.piece, { opacity: 1, y: CY - 160, rotation: -4 })
    }
    if (k === 5) {
      S(this.box, { opacity: 1, y: CY + 60 })
      S(this.piece, { opacity: 0, y: CY + 60, scale: 0.5 })
    }
    this.k = k
  }

  cutPos() {
    // dos cortes verticales y uno horizontal sobre la superficie del molde
    return [
      { x: CX - 70, y: CY + 130, width: 6, height: 150, rotation: 0 },
      { x: CX + 70, y: CY + 130, width: 6, height: 150, rotation: 0 },
      { x: CX, y: CY + 128, width: 380, height: 6, rotation: 0 },
    ]
  }

  wordTo(k, tl, at = 0) {
    const w = this.word
    tl.to(w, { y: CY - 300, opacity: 0, duration: 0.45, ease: 'power2.in' }, at)
    tl.call(() => (w.textContent = WORDS[k]), null, at + 0.45)
    tl.fromTo(w, { y: CY + 200, opacity: 0 }, { y: CY - 60, opacity: 1, duration: 0.8, ease: 'power3.out' }, at + 0.46)
  }

  // tramo animado hacia el paso k (k-1 ya está en pantalla)
  play(k) {
    if (k !== this.k + 1) return this.state(k)
    const tl = gsap.timeline()
    this.tl = tl
    this.wordTo(k, tl)
    const to = (el, v, at) => tl.to(el, { duration: 1, ease: 'power3.inOut', ...v }, at)

    if (k === 0) {
      tl.fromTo(this.whole, { y: CY + 800, opacity: 1, rotation: 10 }, { y: CY, rotation: 0, duration: 1.3, ease: 'power3.out' }, 0.1)
    }
    if (k === 1) {
      // el brownie entero se separa en sus capas = sus ingredientes
      this.layers.forEach((l, i) => tl.set(l, { opacity: 1, y: CY + LY0[i], x: CX }, 0.2))
      to(this.whole, { opacity: 0, duration: 0.3 }, 0.2)
      this.layers.forEach((l, i) => to(l, { x: CX - 70, y: CY + LY[i], rotation: (i - 1) * -2.5, duration: 1.2 }, 0.3))
      this.chips.forEach((c, i) => tl.fromTo(c, { x: CX + 120, y: CY + LY[i], xPercent: 0, opacity: 0 }, { x: CX + 175, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, 1 + i * 0.12))
    }
    if (k === 2) {
      // las capas suben y salen (scroll), cae todo al bowl y se bate
      this.layers.forEach((l, i) => to(l, { y: `-=${900}`, rotation: -8 + i * 3, duration: 0.9, ease: 'power2.in' }, i * 0.06))
      to(this.chips, { opacity: 0, duration: 0.3 }, 0)
      tl.fromTo(this.bowl, { y: CY + 700, opacity: 1 }, { y: CY + 90, duration: 1, ease: 'power3.out' }, 0.5)
      this.fall.forEach((f, i) => {
        const x = CX + (((i * 53) % 220) - 110)
        tl.fromTo(f, { x, y: CY - 620 - (i % 4) * 60, opacity: 1, rotation: i * 40 }, { y: CY + 50, rotation: `+=${200 + i * 20}`, duration: 0.9, ease: 'power2.in' }, 1 + i * 0.09)
        tl.to(f, { opacity: 0, duration: 0.12 }, 1.86 + i * 0.09)
      })
      this.dust.forEach((d, i) => {
        const x = CX - 30 + ((i * 17) % 60)
        tl.fromTo(d, { x, y: CY - 600, opacity: 1, scale: 0.6 + (i % 3) * 0.3 }, { y: CY + 40, x: x + ((i % 5) - 2) * 6, duration: 0.8, ease: 'power1.in' }, 1.2 + i * 0.035)
        tl.to(d, { opacity: 0, duration: 0.1 }, 1.95 + i * 0.035)
      })
      tl.set(this.bowlMasa, { opacity: 0, y: CY + 90, x: CX }, 0)
      to(this.bowlMasa, { opacity: 1, duration: 0.9 }, 2.4)
      tl.set(this.bowl, { opacity: 0 }, 3.3)
      tl.fromTo(this.whisk, { x: CX + 500, y: CY - 500, rotation: -60, opacity: 1 }, { x: CX + 120, y: CY - 70, rotation: -30, duration: 0.9, ease: 'power3.out' }, 2)
      // batido: el batidor gira en círculos sobre la masa
      tl.to(this.whisk, { keyframes: [{ x: CX + 60, y: CY - 50 }, { x: CX + 120, y: CY - 30 }, { x: CX + 170, y: CY - 50 }, { x: CX + 120, y: CY - 70 }], rotation: '-=12', duration: 0.9, repeat: 1, ease: 'none' }, 2.9)
    }
    if (k === 3) {
      // se vierte la masa al molde y se hornea
      to(this.whisk, { x: CX + 600, y: CY - 600, rotation: -80, duration: 0.8, ease: 'power2.in' }, 0)
      to(this.bowlMasa, { x: CX - 120, y: CY - 280, rotation: 58, scale: 0.75, duration: 1.1 }, 0.2)
      tl.fromTo(this.panMasa, { y: CY + 700, opacity: 1 }, { y: CY + 80, duration: 1, ease: 'power3.out' }, 0.3)
      tl.fromTo(this.stream, { x: CX - 40, y: CY - 175, height: 0, opacity: 1, yPercent: 0 }, { height: 210, duration: 0.5, ease: 'power1.in' }, 1.2)
      tl.to(this.stream, { y: CY + 35, height: 0, duration: 0.5, ease: 'power1.in' }, 2.2)
      to(this.bowlMasa, { y: CY - 900, opacity: 0, duration: 0.8, ease: 'power2.in' }, 2.4)
      tl.fromTo(this.glow, { y: CY + 80, opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1.1, duration: 0.9, ease: 'power2.out' }, 2.7)
      tl.to(this.glow, { opacity: 0.55, scale: 1, duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 3.6)
      tl.set(this.panHorn, { opacity: 0, x: CX, y: CY + 80 }, 0)
      to(this.panHorn, { opacity: 1, duration: 1.2 }, 3.4)
      tl.set(this.panMasa, { opacity: 0 }, 4.6)
      this.steam.forEach((s, i) => tl.fromTo(s, { x: CX - 120 + i * 120, y: CY + 20, opacity: 0, scale: 0.6 }, { y: CY - 260, opacity: 0.8, scale: 1.4, duration: 1.4, ease: 'sine.out', repeat: 1 }, 3.3 + i * 0.25))
      this.steam.forEach((s, i) => tl.to(s, { opacity: 0, duration: 0.4 }, 6 + i * 0.1))
      tl.to(this.glow, { opacity: 0, duration: 0.6 }, 5.6)
    }
    if (k === 4) {
      // se corta en porciones y una porción sale del molde
      to(this.panHorn, { y: CY + 150, scale: 0.9, duration: 0.8 }, 0)
      this.cutPos().forEach((p, i) => {
        const vertical = p.height > p.width
        tl.fromTo(this.cuts[i], { ...p, opacity: 1, scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.45, ease: 'power2.inOut' }, 0.8 + i * 0.35)
      })
      tl.fromTo(this.piece, { x: CX, y: CY + 130, scale: 0.4, opacity: 0, rotation: 0 }, { y: CY - 160, scale: 1, opacity: 1, rotation: -4, duration: 1.1, ease: 'back.out(1.3)' }, 2)
    }
    if (k === 5) {
      // la porción entra a la caja kraft
      to(this.panHorn, { y: CY + 900, opacity: 0, duration: 0.9, ease: 'power2.in' }, 0)
      to(this.cuts, { opacity: 0, duration: 0.3 }, 0)
      to(this.piece, { y: CY - 60, scale: 0.75, rotation: 0, duration: 0.8 }, 0.2)
      tl.fromTo(this.box, { y: CY + 700, opacity: 1 }, { y: CY + 60, duration: 1, ease: 'power3.out' }, 0.5)
      to(this.piece, { y: CY + 60, scale: 0.5, duration: 0.5, ease: 'power2.in' }, 1.4)
      tl.set(this.piece, { opacity: 0 }, 1.9)
      tl.to(this.box, { keyframes: [{ scaleY: 0.92, scaleX: 1.05, duration: 0.12 }, { scaleY: 1.04, scaleX: 0.97, duration: 0.18 }, { scaleY: 1, scaleX: 1, duration: 0.2 }] }, 1.9)
    }
    this.k = k
    return tl
  }
}
