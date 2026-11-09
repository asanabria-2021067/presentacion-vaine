import gsap from 'gsap'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Postres en 3D real, armados por capas sobre un plato visto desde arriba.
// Giran sin parar y las capas se separan (vista explotada) cuando la slide lo pide.
// Las texturas se pintan por código (canvas), no hay fotos ni modelos externos.
const BASE = 560
const TILT = 0.98
const KINDS = {
  brownie: { chips: [['Cacao', '#75340f'], ['Avena', '#c99a55'], ['Menos azúcar', '#a5314a']] },
  cheesecake: { chips: [['Lácteos', '#e8d0a4'], ['Frutos rojos', '#a5314a'], ['Base de avena', '#c99a55']] },
  muffin: { chips: [['Avena', '#c99a55'], ['Frutas', '#a5314a'], ['Yogur', '#e8d0a4']] },
  pancakes: { chips: [['Avena', '#c99a55'], ['Frutas', '#a5314a'], ['Lácteos', '#e8d0a4']] },
}
const ANGLES = [-38, 4, 44]

/* ---------------- texturas pintadas ---------------- */
function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function paint(seed, fn, size = 512) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const x = c.getContext('2d')
  fn(x, rng(seed), size)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}
const dots = (x, r, S, n, cols, rmin, rmax) => {
  for (let i = 0; i < n; i++) {
    x.fillStyle = cols[(r() * cols.length) | 0]
    x.beginPath()
    x.arc(r() * S, r() * S, rmin + r() * (rmax - rmin), 0, 7)
    x.fill()
  }
}
const oats = (x, r, S, n, fill, line) => {
  for (let i = 0; i < n; i++) {
    x.save()
    x.translate(r() * S, r() * S)
    x.rotate(r() * 6.28)
    x.fillStyle = fill
    x.strokeStyle = line
    x.lineWidth = 1.5
    x.beginPath()
    x.ellipse(0, 0, 9 + r() * 8, 5 + r() * 4, 0, 0, 7)
    x.fill()
    x.stroke()
    x.restore()
  }
}
const T = {
  brownieTop: () =>
    paint(11, (x, r, S) => {
      x.fillStyle = '#3a1b0b'
      x.fillRect(0, 0, S, S)
      for (let i = 0; i < 70; i++) {
        const px = r() * S, py = r() * S, rad = 30 + r() * 70
        const g = x.createRadialGradient(px, py, 0, px, py, rad)
        g.addColorStop(0, r() > 0.5 ? 'rgba(110,58,28,.55)' : 'rgba(20,8,3,.5)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        x.fillStyle = g
        x.fillRect(0, 0, S, S)
      }
      x.lineCap = 'round'
      for (let i = 0; i < 26; i++) {
        x.strokeStyle = r() > 0.4 ? 'rgba(15,6,2,.8)' : 'rgba(150,95,55,.5)'
        x.lineWidth = 1 + r() * 3
        x.beginPath()
        let px = r() * S, py = r() * S
        x.moveTo(px, py)
        for (let k = 0; k < 5; k++) {
          px += (r() - 0.5) * 120
          py += (r() - 0.5) * 120
          x.lineTo(px, py)
        }
        x.stroke()
      }
      oats(x, r, S, 55, '#dcbd86', '#a98147')
      dots(x, r, S, 90, ['#1b0a03', '#2c1408'], 2, 5)
    }),
  crumb: (seed, base, a, b) =>
    paint(seed, (x, r, S) => {
      x.fillStyle = base
      x.fillRect(0, 0, S, S)
      dots(x, r, S, 2400, [a, b, base], 1, 4.5)
    }),
  glaze: () =>
    paint(23, (x, r, S) => {
      x.fillStyle = '#251c4a'
      x.fillRect(0, 0, S, S)
      for (let i = 0; i < 170; i++) {
        const px = r() * S, py = r() * S, rad = 15 + r() * 14
        const g = x.createRadialGradient(px - rad * 0.3, py - rad * 0.35, 1, px, py, rad)
        g.addColorStop(0, '#6a77c4')
        g.addColorStop(0.45, '#33377c')
        g.addColorStop(1, '#171538')
        x.fillStyle = g
        x.beginPath()
        x.arc(px, py, rad, 0, 7)
        x.fill()
        x.fillStyle = 'rgba(255,255,255,.55)'
        x.beginPath()
        x.arc(px - rad * 0.35, py - rad * 0.4, rad * 0.14, 0, 7)
        x.fill()
      }
    }),
  muffinTop: () =>
    paint(31, (x, r, S) => {
      x.fillStyle = '#d19a52'
      x.fillRect(0, 0, S, S)
      for (let i = 0; i < 40; i++) {
        const px = r() * S, py = r() * S, rad = 30 + r() * 60
        const g = x.createRadialGradient(px, py, 0, px, py, rad)
        g.addColorStop(0, r() > 0.5 ? 'rgba(240,200,130,.5)' : 'rgba(150,90,35,.4)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        x.fillStyle = g
        x.fillRect(0, 0, S, S)
      }
      oats(x, r, S, 60, '#ecd09a', '#b78a4c')
      dots(x, r, S, 14, ['#51438f'], 10, 18)
    }),
  pancake: (seed) =>
    paint(seed, (x, r, S) => {
      const g = x.createRadialGradient(S / 2, S / 2, 20, S / 2, S / 2, S * 0.7)
      g.addColorStop(0, '#e8b96e')
      g.addColorStop(0.7, '#d6a04f')
      g.addColorStop(1, '#a8702f')
      x.fillStyle = g
      x.fillRect(0, 0, S, S)
      dots(x, r, S, 90, ['rgba(150,90,35,.45)', 'rgba(250,215,150,.5)'], 8, 26)
      dots(x, r, S, 500, ['rgba(120,70,25,.5)'], 1, 2.6)
    }),
  shadow: () =>
    paint(5, (x, r, S) => {
      const g = x.createRadialGradient(S / 2, S / 2, S * 0.18, S / 2, S / 2, S / 2)
      g.addColorStop(0, 'rgba(50,20,5,.55)')
      g.addColorStop(1, 'rgba(50,20,5,0)')
      x.fillStyle = g
      x.fillRect(0, 0, S, S)
    }),
}

/* ---------------- piezas ---------------- */
const std = (o) => new THREE.MeshStandardMaterial({ roughness: 0.75, metalness: 0, ...o })
const shadowOn = (o) => {
  o.traverse((m) => {
    if (m.isMesh) {
      m.castShadow = true
      m.receiveShadow = true
    }
  })
  return o
}
function disc(r, h, topTex, sideCol, bump = 0.6, rough = 0.8) {
  const geo = new THREE.CylinderGeometry(r, r * 1.01, h, 72)
  const side = std({ color: sideCol, roughness: rough })
  const top = std({ map: topTex, bumpMap: topTex, bumpScale: bump, roughness: rough })
  return new THREE.Mesh(geo, [side, top, std({ color: sideCol })])
}
function slab(w, h, topTex, sideTex, bump = 1.2) {
  const geo = new RoundedBoxGeometry(w, h, w, 4, 10)
  const m = new THREE.Mesh(geo, std({ map: sideTex, bumpMap: sideTex, bumpScale: bump, roughness: 0.85 }))
  const cap = new THREE.Mesh(
    new THREE.PlaneGeometry(w - 18, w - 18).rotateX(-Math.PI / 2),
    std({ map: topTex, bumpMap: topTex, bumpScale: bump, roughness: 0.45 }),
  )
  cap.position.y = h / 2 + 0.6
  const g = new THREE.Group()
  g.add(m, cap)
  return g
}
function berry(r, col = 0x2d3a7a, rough = 0.35) {
  const g = new THREE.Group()
  const s = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), std({ color: col, roughness: rough }))
  s.scale.y = 0.88
  const c = new THREE.Mesh(new THREE.CircleGeometry(r * 0.28, 6), std({ color: 0x15183a, roughness: 0.9 }))
  c.rotation.x = -Math.PI / 2
  c.position.y = r * 0.86
  g.add(s, c)
  return g
}
function raspberry(r) {
  const g = new THREE.Group()
  const m = std({ color: 0xc4223f, roughness: 0.4 })
  const geo = new THREE.SphereGeometry(r * 0.38, 10, 8)
  for (let i = 0; i < 14; i++) {
    const a = i * 2.4, ring = Math.sqrt(i / 14)
    const p = new THREE.Mesh(geo, m)
    p.position.set(Math.cos(a) * ring * r * 0.7, Math.sin(ring * 1.5) * r * 0.55, Math.sin(a) * ring * r * 0.7)
    g.add(p)
  }
  return g
}
function plate() {
  const pts = [[0, 0], [170, 0], [215, 5], [262, 32], [284, 50], [279, 55], [262, 42], [222, 18], [170, 11], [0, 11]].map(([x, y]) => new THREE.Vector2(x, y))
  const m = new THREE.Mesh(
    new THREE.LatheGeometry(pts, 96),
    new THREE.MeshPhysicalMaterial({ color: 0xfaf6ee, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.25, side: THREE.DoubleSide }),
  )
  return shadowOn(m)
}

// cada capa: { obj, y (reposo), dy (cuánto sube al separarse) }
const BUILD = {
  brownie() {
    const side = T.crumb(41, '#4e2711', '#2f1508', '#6e3d1d')
    const slabs = [
      slab(310, 46, T.crumb(42, '#4a2410', '#2c1307', '#69391a'), side),
      slab(310, 46, T.crumb(43, '#5d3016', '#3b1c0c', '#85502a'), side),
      slab(310, 46, T.brownieTop(), side),
    ]
    const cut = new THREE.Group()
    const cm = std({ color: 0x1c0b04, roughness: 0.9 })
    for (const rot of [0, Math.PI / 2]) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(300, 3, 7), cm)
      b.rotation.y = rot
      cut.add(b)
    }
    cut.position.y = 24
    slabs[2].add(cut)
    const pack = new THREE.Mesh(new THREE.BoxGeometry(336, 150, 74), std({ color: 0xa8814a, roughness: 0.95 }))
    pack.position.y = 12 + 70
    const out = slabs.map((s, i) => ({ obj: s, y: 12 + 23 + i * 47, dy: 30 + i * 135 }))
    out.extra = { cut, pack }
    return out
  },
  cheesecake() {
    const crust = disc(205, 34, T.crumb(51, '#c08f55', '#8f6330', '#dcb27a'), 0xb98550, 1.4)
    const cream = disc(200, 78, T.crumb(52, '#f3e4bf', '#e6d09b', '#fff3d4'), 0xf0dfb4, 0.15, 0.6)
    const glaze = disc(200, 26, T.glaze(), 0x2a2050, 1.2, 0.25)
    const g = new THREE.Group()
    g.add(glaze)
    const r = rng(7)
    for (let i = 0; i < 16; i++) {
      const a = r() * 6.28, d = Math.sqrt(r()) * 165
      const b = berry(15 + r() * 6)
      b.position.set(Math.cos(a) * d, 13 + 12, Math.sin(a) * d)
      g.add(b)
    }
    return [
      { obj: crust, y: 12 + 17, dy: 20 },
      { obj: cream, y: 12 + 34 + 39, dy: 150 },
      { obj: g, y: 12 + 34 + 78 + 13, dy: 290 },
    ]
  },
  muffin() {
    const cup = new THREE.CylinderGeometry(150, 108, 108, 56, 1, true)
    const p = cup.attributes.position
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), f = 1 + 0.055 * Math.cos(Math.atan2(z, x) * 22)
      p.setX(i, x * f)
      p.setZ(i, z * f)
    }
    cup.computeVertexNormals()
    const cupMesh = new THREE.Mesh(cup, std({ color: 0xf2e8d2, roughness: 0.95, side: THREE.DoubleSide }))
    const body = disc(150, 70, T.crumb(61, '#ebca8e', '#c99a58', '#f6dfae'), 0xe5c083, 0.8)
    const dome = new THREE.Group()
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(176, 56, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      std({ map: T.muffinTop(), bumpMap: T.muffinTop(), bumpScale: 1.6, roughness: 0.7 }),
    )
    cap.scale.y = 0.5
    dome.add(cap)
    const r = rng(9)
    for (let i = 0; i < 9; i++) {
      const a = r() * 6.28, d = Math.sqrt(r()) * 100
      const b = berry(15 + r() * 5)
      b.position.set(Math.cos(a) * d, Math.sqrt(Math.max(0, 1 - (d / 176) ** 2)) * 88 - 2, Math.sin(a) * d)
      dome.add(b)
    }
    return [
      { obj: cupMesh, y: 12 + 54, dy: 20 },
      { obj: body, y: 12 + 108 + 28, dy: 150 },
      { obj: dome, y: 12 + 108 + 62, dy: 300 },
    ]
  },
  pancakes() {
    const mk = (seed) => disc(190, 38, T.pancake(seed), 0xe3b66c, 1.2, 0.7)
    const top = new THREE.Group()
    top.add(mk(73))
    const honey = new THREE.Mesh(
      new THREE.CylinderGeometry(120, 124, 5, 48),
      new THREE.MeshPhysicalMaterial({ color: 0xd98a1d, roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.8 }),
    )
    honey.position.set(14, 21, -8)
    top.add(honey)
    const r = rng(3)
    for (let i = 0; i < 5; i++) {
      const rb = raspberry(36)
      const a = i * 1.26 + 0.4
      rb.position.set(Math.cos(a) * 80, 38, Math.sin(a) * 80)
      top.add(rb)
    }
    for (let i = 0; i < 8; i++) {
      const a = r() * 6.28, d = 20 + r() * 110
      const b = berry(17)
      b.position.set(Math.cos(a) * d, 36, Math.sin(a) * d)
      top.add(b)
    }
    return [
      { obj: mk(71), y: 12 + 19, dy: 20 },
      { obj: mk(72), y: 12 + 19 + 40, dy: 150 },
      { obj: top, y: 12 + 19 + 80, dy: 285 },
    ]
  },
}

class Hero {
  constructor(root) {
    this.root = root
    this.cur = null
    this.cfg = null
    this.chips = []
    this.t = 0

    this.canvas = document.createElement('canvas')
    this.canvas.id = 'hero3d'
    root.appendChild(this.canvas)
    const dpr = Math.min(2, Math.max(1, (window.devicePixelRatio || 1) * Math.min(window.innerWidth / 1920, window.innerHeight / 1080 + 0.0001) * 1.0))
    const r = (this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true }))
    r.setPixelRatio(Math.max(1, dpr))
    r.setSize(1920, 1080, false)
    r.setClearColor(0x000000, 0)
    r.toneMapping = THREE.ACESFilmicToneMapping
    r.toneMappingExposure = 1.05
    r.shadowMap.enabled = true
    r.shadowMap.type = THREE.PCFSoftShadowMap

    const scene = (this.scene = new THREE.Scene())
    const fov = 28
    this.cam = new THREE.PerspectiveCamera(fov, 1920 / 1080, 10, 8000)
    this.cam.position.set(0, 0, 540 / Math.tan((fov / 2) * (Math.PI / 180)))
    const pm = new THREE.PMREMGenerator(r)
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environmentIntensity = 0.55
    scene.add(new THREE.HemisphereLight(0xfff0dc, 0x8a5a30, 0.55))
    const sun = new THREE.DirectionalLight(0xfff4e6, 2.4)
    sun.position.set(-500, 900, 700)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    Object.assign(sun.shadow.camera, { left: -700, right: 700, top: 700, bottom: -700, near: 100, far: 3000 })
    sun.shadow.bias = -0.0006
    sun.shadow.radius = 5
    scene.add(sun)

    this.objs = {}
    for (const k of Object.keys(KINDS)) {
      const outer = new THREE.Group()
      const spinner = new THREE.Group()
      outer.add(spinner)
      spinner.add(plate())
      const layers = BUILD[k]()
      for (const l of layers) {
        shadowOn(l.obj)
        l.obj.position.y = l.y
        spinner.add(l.obj)
      }
      const sh = new THREE.Mesh(
        new THREE.PlaneGeometry(760, 760).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ map: T.shadow(), transparent: true, depthWrite: false }),
      )
      sh.position.y = -6
      outer.add(sh)
      outer.visible = false
      scene.add(outer)
      const mats = new Set()
      layers.forEach((l) => l.obj.traverse((m) => m.isMesh && [].concat(m.material).forEach((x) => x.emissive && mats.add(x))))
      if (layers.extra) {
        spinner.add(layers.extra.pack)
        layers.extra.pack.scale.z = 0.001
        layers.extra.cut.scale.setScalar(0.001)
      }
      this.objs[k] = { outer, spinner, layers, mats: [...mats], extra: layers.extra, s: { e: 0.3, extra: 0, tilt: TILT, scale: 1, heat: 0, cut: 0, pack: 0 } }
    }
    gsap.ticker.add((time) => this.render(time))
  }

  render(time) {
    const any = Object.values(this.objs).some((o) => o.outer.visible)
    if (!any) {
      if (this.dirty) {
        this.renderer.clear()
        this.dirty = false
      }
      return
    }
    this.dirty = true
    this.t = time
    for (const o of Object.values(this.objs)) {
      if (!o.outer.visible) continue
      for (const m of o.mats) {
        m.emissive.setRGB(1, 0.32, 0.06)
        m.emissiveIntensity = o.s.heat * 0.2
      }
      if (o.extra) {
        o.extra.cut.scale.setScalar(Math.max(0.001, o.s.cut))
        o.extra.pack.scale.z = Math.max(0.001, o.s.pack)
        o.extra.pack.visible = o.s.pack > 0.01
      }
      o.outer.rotation.x = o.s.tilt
      o.outer.scale.setScalar(Math.max(0.001, o.s.scale))
      o.spinner.rotation.y = time * 0.32 + o.s.extra
      o.layers.forEach((l, i) => {
        const bob = Math.sin(time * 1.3 + i * 1.7) * 7 * o.s.e
        l.obj.position.y = l.y + l.dy * o.s.e + bob
      })
    }
    this.renderer.render(this.scene, this.cam)
  }

  explodeFor(cfg) {
    return cfg.labels ? 1 : cfg.explode ?? 0.3
  }

  show(cfg, { animate = true } = {}) {
    const prev = this.cur
    const kind = cfg ? cfg.kind : null

    if (prev && prev !== kind) {
      const o = this.objs[prev]
      this.leaving = true
      gsap.killTweensOf([o.s, o.outer.position])
      if (animate) {
        gsap.to(o.s, { scale: o.s.scale * 0.4, extra: o.s.extra + 2.4, e: 1.4, duration: 0.7, ease: 'power2.in', onComplete: () => {
          o.outer.visible = false
          this.leaving = false
        } })
      } else {
        o.outer.visible = false
        this.leaving = false
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
    const e = this.explodeFor(cfg)
    const px = cfg.x || 0
    const py = -(cfg.y || 0)
    gsap.killTweensOf([o.s, o.outer.position])
    if (prev !== kind) {
      o.outer.visible = true
      o.outer.position.set(px, py, 0)
      if (animate) {
        Object.assign(o.s, { scale: sc * 0.4, extra: -3.2, e: 1.5, tilt: 0.55, heat: 0, cut: 0, pack: 0 })
        const d = prev ? 0.3 : 0.15
        gsap.to(o.s, { scale: sc, extra: 0, e, tilt: TILT, duration: 1.6, delay: d, ease: 'power3.out' })
      } else Object.assign(o.s, { scale: sc, extra: 0, e, tilt: TILT, heat: 0, cut: 0, pack: 0 })
    } else {
      o.outer.visible = true
      const dur = animate ? 1.15 : 0
      gsap.to(o.outer.position, { x: px, y: py, duration: dur, ease: 'power3.inOut' })
      gsap.to(o.s, { scale: sc, e, tilt: TILT, heat: 0, cut: 0, pack: 0, duration: dur, ease: 'power3.inOut' })
    }
    this.cur = kind
    this.cfg = cfg
    this.setChips(cfg.labels ? cfg : null, animate)
  }

  // vuelta completa del plato (p. ej. un paso del procedimiento)
  spin(turns, dur = 1.5) {
    if (!this.cur) return
    gsap.to(this.objs[this.cur].s, { extra: turns * Math.PI * 2, duration: dur, ease: 'power3.inOut', overwrite: 'auto' })
  }

  // paso a paso del procedimiento (brownie): 0 reposo, 1 preparar, 2 mezclar, 3 hornear, 4 enfriar y porcionar, 5 empacar
  phase(k, animate = true) {
    if (!this.cur) return
    const o = this.objs[this.cur]
    const P = [
      { e: 0.3, tilt: TILT, heat: 0, cut: 0, pack: 0 },
      { e: 0.62, tilt: TILT, heat: 0, cut: 0, pack: 0 },
      { e: 0, tilt: TILT, heat: 0, cut: 0, pack: 0 },
      { e: 0, tilt: TILT, heat: 1, cut: 0, pack: 0 },
      { e: 0.5, tilt: 1.22, heat: 0, cut: 1, pack: 0 },
      { e: 0, tilt: 1.12, heat: 0, cut: 1, pack: 1 },
    ][Math.max(0, Math.min(5, k))]
    const dur = animate ? 1.3 : 0
    gsap.to(o.s, { ...P, duration: dur, ease: 'power3.inOut', overwrite: 'auto' })
    if (k === 2) gsap.to(o.s, { extra: o.s.extra + Math.PI * 4, duration: animate ? 1.6 : 0, ease: 'power2.inOut' })
    
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
      const h = c.offsetHeight
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
