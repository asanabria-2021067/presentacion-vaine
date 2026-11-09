// Escenario 3D único: un solo canvas transparente encima de las slides.
// El postre se mueve, rota y se "explota" en capas según la slide (ver cfg en cada slide).
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import gsap from 'gsap'

const W = 1920
const H = 1080
const DIST = 12
const UNIT = (2 * DIST * Math.tan((30 * Math.PI) / 360)) / H // unidades 3D por píxel

// ---------- Materiales ----------
function speckle(base, specks, n = 900, size = 256) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  g.fillStyle = base
  g.fillRect(0, 0, size, size)
  for (let i = 0; i < n; i++) {
    g.fillStyle = specks[i % specks.length]
    const r = Math.random() * 3.2 + 0.6
    g.globalAlpha = 0.25 + Math.random() * 0.5
    g.beginPath()
    g.arc(Math.random() * size, Math.random() * size, r, 0, 7)
    g.fill()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

const mat = (color, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.7, metalness: 0, ...o })
const textured = (base, specks, o = {}) => {
  const map = speckle(base, specks)
  const bump = speckle('#808080', ['#fff', '#000', '#444'], 1200)
  bump.colorSpace = THREE.NoColorSpace
  return new THREE.MeshStandardMaterial({ map, bumpMap: bump, bumpScale: 1.4, roughness: 0.85, ...o })
}

const C = {
  oat: ['#b9823a', ['#d9ac66', '#8f5f25', '#caa060']],
  cocoa: ['#4b2510', ['#2a1208', '#6b3a1b', '#3a1b0b']],
  cream: ['#f6e6bd', ['#fff7dd', '#ead6a0']],
  gold: ['#b8742c', ['#d99a4e', '#8a5019', '#cb8a3d']],
}

function berry(r = 0.16) {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(r, 24, 16),
    mat('#a5314a', { roughness: 0.28, clearcoat: 1 }),
  )
  m.scale.y = 0.9
  return m
}

// ---------- Postres ----------
// Cada uno devuelve { group, layers: [{ obj, y0, label, ax }], height }
// y0 = posición del centro de la capa armada · label = texto de la capa al explotar · ax = ancho para el rótulo

function stack(parts) {
  const group = new THREE.Group()
  const layers = []
  let y = 0
  for (const p of parts) {
    const obj = p.build()
    const cy = y + p.h / 2
    obj.position.y = cy
    group.add(obj)
    layers.push({ obj, y0: cy, label: p.label ?? null, ax: p.ax ?? 1.2 })
    y += p.h
  }
  return { group, layers, height: y }
}

function brownie() {
  const S = 2.3
  const mk = (h, m, r = 0.07) => () => new THREE.Mesh(new RoundedBoxGeometry(S, h, S, 4, r), m)
  const topping = () => {
    const g = new THREE.Group()
    ;[[-0.7, -0.5], [0.1, 0.6], [0.65, -0.2], [-0.35, 0.35], [0.5, 0.75]].forEach(([x, z]) => {
      const b = berry(0.17)
      b.position.set(x, 0.13, z)
      g.add(b)
    })
    return g
  }
  return stack([
    { h: 0.28, build: mk(0.28, textured(...C.oat)), label: 'Base de avena', ax: S * 0.74 },
    { h: 0.66, build: mk(0.66, textured(...C.cocoa)), label: 'Masa de cacao', ax: S * 0.74 },
    { h: 0.14, build: mk(0.14, mat('#2a1208', { roughness: 0.22 }), 0.05), label: 'Cobertura de cacao', ax: S * 0.74 },
    { h: 0.2, build: topping, label: 'Frutas', ax: 0.9 },
  ])
}

function cheesecake() {
  const R = 1.3
  const cyl = (h, m) => () => new THREE.Mesh(new THREE.CylinderGeometry(R, R, h, 72), m)
  const topping = () => {
    const g = new THREE.Group()
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2
      const b = berry(0.17)
      b.position.set(Math.cos(a) * 0.72, 0.15, Math.sin(a) * 0.72)
      g.add(b)
    }
    const c = berry(0.19)
    c.position.set(0, 0.15, 0)
    g.add(c)
    return g
  }
  return stack([
    { h: 0.3, build: cyl(0.3, textured(...C.oat)), label: 'Base de avena', ax: R },
    { h: 0.7, build: cyl(0.7, textured(...C.cream, { roughness: 0.55 })), label: 'Relleno de lácteos', ax: R },
    { h: 0.1, build: cyl(0.1, mat('#a5314a', { roughness: 0.25 })), label: 'Salsa de fruta', ax: R },
    { h: 0.22, build: topping, label: 'Frutas', ax: 1.0 },
  ])
}

function muffin() {
  const cup = () => {
    const pts = [[0.72, 0], [0.8, 0.35], [0.95, 0.8]].map(([x, y]) => new THREE.Vector2(x, y))
    const g = new THREE.LatheGeometry(pts, 40)
    const m = new THREE.Mesh(g, mat('#efe0bd', { side: THREE.DoubleSide, roughness: 0.9 }))
    m.position.y = -0.4
    return m
  }
  const body = () => new THREE.Mesh(new THREE.CylinderGeometry(0.94, 0.82, 0.5, 48), textured(...C.gold))
  const dome = () => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      textured(...C.gold, { roughness: 0.75 }),
    )
    m.scale.y = 0.72
    m.position.y = -0.1
    return m
  }
  const fruit = () => {
    const g = new THREE.Group()
    ;[[0, 0], [0.45, 0.2], [-0.4, 0.3], [0.1, -0.5], [-0.2, -0.2]].forEach(([x, z]) => {
      const b = berry(0.15)
      b.position.set(x, 0.1, z)
      g.add(b)
    })
    return g
  }
  const s = stack([
    { h: 0.8, build: cup, label: 'Capacillo', ax: 0.9 },
    { h: 0.5, build: body, label: 'Masa de avena', ax: 0.9 },
    { h: 0.5, build: dome, label: 'Cúpula dorada', ax: 1.0 },
    { h: 0.15, build: fruit, label: 'Frutas', ax: 0.6 },
  ])
  // el capacillo y la masa se solapan: se sube la masa dentro del capacillo
  s.layers[1].y0 -= 0.35
  s.layers[1].obj.position.y = s.layers[1].y0
  s.layers[2].y0 -= 0.35
  s.layers[2].obj.position.y = s.layers[2].y0
  s.layers[3].y0 -= 0.35
  s.layers[3].obj.position.y = s.layers[3].y0
  s.height -= 0.35
  return s
}

function pancakes() {
  const R = 1.25
  const disc = () => {
    const pts = []
    const h = 0.26
    pts.push(new THREE.Vector2(0, -h / 2), new THREE.Vector2(R - 0.1, -h / 2))
    for (let i = 0; i <= 8; i++) {
      const a = -Math.PI / 2 + (i / 8) * Math.PI
      pts.push(new THREE.Vector2(R - 0.1 + Math.cos(a) * 0.1 * 1.2, Math.sin(a) * (h / 2)))
    }
    pts.push(new THREE.Vector2(0, h / 2))
    return new THREE.Mesh(new THREE.LatheGeometry(pts, 64), textured('#b87a32', ['#d79a4c', '#8d5420', '#c98a3e']))
  }
  const drizzle = () => {
    const g = new THREE.Group()
    const d = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.07, 48), mat('#2a1208', { roughness: 0.2 }))
    g.add(d)
    ;[0, 1.7, 3.5, 5].forEach((a) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), mat('#2a1208', { roughness: 0.2 }))
      s.scale.set(1, 0.8, 1)
      s.position.set(Math.cos(a) * 0.95, -0.02, Math.sin(a) * 0.95)
      g.add(s)
    })
    return g
  }
  const fruit = () => {
    const g = new THREE.Group()
    ;[[-0.3, 0], [0.3, 0.2], [0, -0.35], [0.1, 0.45]].forEach(([x, z]) => {
      const b = berry(0.17)
      b.position.set(x, 0.1, z)
      g.add(b)
    })
    return g
  }
  return stack([
    { h: 0.26, build: disc, label: null, ax: R },
    { h: 0.26, build: disc, label: 'Panqueques de avena', ax: R },
    { h: 0.26, build: disc, label: null, ax: R },
    { h: 0.07, build: drizzle, label: 'Salsa de cacao', ax: 0.9 },
    { h: 0.2, build: fruit, label: 'Frutas', ax: 0.6 },
  ])
}

const BUILD = { brownie, cheesecake, muffin, pancakes }

// ---------- Escenario ----------
export class Dessert {
  constructor(stage) {
    this.stage = stage
    this.kind = null
    this.cur = null
    this.p = { x: 0, y: 0, s: 0, ry: 0, rx: 0.5, e: 0, lab: 0, op: 1 }
    this.spin = 0.2
    this.t0 = performance.now()

    const canvas = document.createElement('canvas')
    canvas.id = 'dessert-canvas'
    stage.appendChild(canvas)
    this.labels = document.createElement('div')
    this.labels.id = 'dessert-labels'
    stage.appendChild(this.labels)

    const r = (this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }))
    r.setPixelRatio(1)
    r.setSize(W * 1.25, H * 1.25, false)
    r.outputColorSpace = THREE.SRGBColorSpace
    r.toneMapping = THREE.ACESFilmicToneMapping
    r.toneMappingExposure = 0.95
    const scene = (this.scene = new THREE.Scene())
    const pm = new THREE.PMREMGenerator(r)
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environmentIntensity = 0.75
    const cam = (this.camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100))
    cam.position.set(0, 0, DIST)
    const key = new THREE.DirectionalLight(0xffe6bd, 2.2)
    key.position.set(-3, 5, 6)
    scene.add(key, new THREE.AmbientLight(0xffffff, 0.35))

    this.pivot = new THREE.Group()
    this.tilt = new THREE.Group()
    this.pivot.add(this.tilt)
    scene.add(this.pivot)
    this.pivot.visible = false

    // sombra suave bajo el postre
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')
    const gr = g.createRadialGradient(64, 64, 4, 64, 64, 64)
    gr.addColorStop(0, 'rgba(40,16,4,.55)')
    gr.addColorStop(1, 'rgba(40,16,4,0)')
    g.fillStyle = gr
    g.fillRect(0, 0, 128, 128)
    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 4.4),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }),
    )
    this.shadow.rotation.x = -Math.PI / 2
    this.pivot.add(this.shadow)

    this.loop = this.loop.bind(this)
    requestAnimationFrame(this.loop)
  }

  build(kind) {
    if (this.cur) {
      this.tilt.remove(this.cur.group)
      this.labels.innerHTML = ''
    }
    this.kind = kind
    this.cur = null
    if (!kind) return
    const d = BUILD[kind]()
    d.group.position.y = -d.height / 2
    this.tilt.add(d.group)
    this.cur = d
    d.layers.forEach((l) => {
      if (!l.label) return
      l.el = document.createElement('div')
      l.el.className = 'dlabel'
      l.el.innerHTML = `<i></i><span>${l.label}</span>`
      this.labels.appendChild(l.el)
    })
  }

  // cfg: { kind, x, y (px desde el centro), s, rx, ry, e (0..1), labels, spin, side }
  show(cfg, { animate = true } = {}) {
    if (!cfg) cfg = { kind: null }
    this.side = cfg.side || 'right'
    if (cfg.spin != null) this.spin = cfg.spin
    else this.spin = 0.2
    const target = {
      x: cfg.x ?? 0,
      y: cfg.y ?? 0,
      s: cfg.kind ? cfg.s ?? 1.3 : 0,
      rx: cfg.rx ?? 0.5,
      e: cfg.e ?? 0,
      lab: cfg.labels ? 1 : 0,
    }
    if (cfg.ry != null) target.ry = cfg.ry
    gsap.killTweensOf(this.p)
    this.pivot.visible = true
    const swap = cfg.kind !== this.kind
    if (!animate) {
      if (swap) this.build(cfg.kind)
      Object.assign(this.p, { ry: 0.6 }, target)
      return
    }
    const go = () => gsap.to(this.p, { ...target, duration: 1.3, ease: 'power3.inOut' })
    if (swap) {
      gsap.to(this.p, {
        s: 0,
        lab: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          this.build(cfg.kind)
          Object.assign(this.p, { x: target.x, y: target.y, rx: target.rx, e: 0, ry: this.p.ry + 1.2 })
          go()
        },
      })
    } else go()
  }

  // Cambios rápidos dentro de una slide (pasos)
  to(vars, dur = 1.2) {
    gsap.to(this.p, { ...vars, duration: dur, ease: 'power3.inOut', overwrite: 'auto' })
  }

  loop() {
    requestAnimationFrame(this.loop)
    const p = this.p
    if (!this.cur || p.s < 0.001) {
      this.pivot.visible = false
      this.labels.style.opacity = 0
      return
    }
    const t = (performance.now() - this.t0) / 1000
    this.pivot.visible = true
    this.pivot.position.set(p.x * UNIT, -p.y * UNIT, 0)
    this.pivot.scale.setScalar(p.s)
    this.tilt.rotation.set(p.rx, p.ry + t * this.spin, 0)
    // capas
    const gap = 0.62
    const n = this.cur.layers.length
    this.cur.layers.forEach((l, i) => {
      l.obj.position.y = l.y0 + p.e * i * gap
    })
    this.cur.group.position.y = -this.cur.height / 2 - (p.e * (n - 1) * gap) / 2
    this.shadow.position.y = -(this.cur.height / 2) - (p.e * (n - 1) * gap) / 2 - 0.05
    this.shadow.scale.setScalar(1 + p.e * 0.2)
    this.renderer.render(this.scene, this.camera)

    // rótulos de capas
    this.labels.style.opacity = p.lab
    if (p.lab > 0.01) {
      this.pivot.updateMatrixWorld(true)
      const v = new THREE.Vector3()
      let maxAx = 0
      const pts = []
      for (const l of this.cur.layers) {
        if (!l.el) continue
        v.set(0, 0, 0)
        l.obj.localToWorld(v)
        v.project(this.camera)
        pts.push([l, (v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H])
        maxAx = Math.max(maxAx, l.ax)
      }
      const edge = (maxAx * p.s) / UNIT
      for (const [l, px, py] of pts) {
        const x = W / 2 + p.x + (this.side === 'left' ? -edge - 90 : edge + 90)
        l.el.style.transform = `translate(${x}px, ${py}px) translateY(-50%) ${this.side === 'left' ? 'translateX(-100%)' : ''}`
        l.el.classList.toggle('left', this.side === 'left')
        l.el.style.setProperty('--len', `${Math.abs(x - px) - 8}px`)
      }
    }
  }
}

// Singleton: main.js lo crea y las slides lo usan en sus pasos
export let d3 = null
export function initD3(stage) {
  d3 = new Dessert(stage)
  return d3
}
