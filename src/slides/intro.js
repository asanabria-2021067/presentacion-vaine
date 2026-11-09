import { d3 } from '../hero.js'
import { foot, fn, disc } from './util.js'

// 0 · Portada y equipo · 1 · Empresa y postres

const NAMES = ['Maria Sophie Santos', 'Diana Reyes', 'Alyssa Aragón', 'Marcela Ruano', 'Alejandra Roquel', 'Daisy Estrada']
const NAMES_DISH = ['brownie', 'cheesecake', 'muffin', 'pancakes']

const PRODUCT_STEPS = [
  { kind: 'brownie', name: 'Brownie', e: 0 },
  { kind: 'brownie', name: 'Brownie', e: 1 },
  { kind: 'cheesecake', name: 'Cheesecake', e: 1 },
  { kind: 'muffin', name: 'Muffin', e: 1 },
  { kind: 'pancakes', name: 'Pancakes', e: 1 },
]

export default [
  {
    id: 'portada',
    section: 0,
    title: 'Portada',
    bg: '#d7b782',
    brand: 'cover',
    dessert: { kind: 'brownie', x: 520, y: 30, s: 1.2 },
    notes: 'Entrada. Vainé: dulce que nutre. Proyecto final de Administración, Licenciatura en Nutrición, URL. Catedrática: Licda. Claudia Camposano.',
    html: `
      ${disc(520, 30, 740, '#fbf1da')}
      <div style="position:relative;z-index:2;margin-top:-30px">
        <div class="logo-big"></div>
        <p class="lead" data-in="up" style="margin-top:44px;color:#3a1807;font-weight:600;font-size:42px">Proyecto final de Administración</p>
        <p class="small" data-in="up" style="margin-top:14px;color:#5a3a22;font-size:28px">Licenciatura en Nutrición, Universidad Rafael Landívar<br/>Licda. Claudia Camposano</p>
      </div>`,
  },
  {
    id: 'equipo',
    section: 0,
    title: 'Presentación personal del equipo',
    bg: '#fbf1da',
    dessert: { kind: 'muffin', x: 500, y: 60, s: 1.22 },
    notes: 'Cada integrante dice su nombre al aparecer en pantalla (presentación personal). Un clic por persona.',
    html: `
      ${disc(500, 60, 700, '#e8d0a4')}
      <h2 class="title md" data-in="words" style="position:relative;z-index:2">Somos el equipo de Vainé</h2>
      <div class="team" style="position:relative;z-index:2">
        ${NAMES.map((n, i) => `<div data-step="${i + 1}" data-anim="up">${n}</div>`).join('')}
      </div>
      ${foot}`,
  },
  {
    id: 'empresa',
    section: 1,
    title: 'La empresa',
    bg: '#fbf1da',
    dessert: { kind: 'cheesecake', x: 520, y: 50, s: 1.2 },
    notes:
      'Industria: elaboran y comercializan postres. Empresa pequeña. Nombre comercial: Vainé. Actividad: elaboración, producción y venta de postres con mejor perfil nutricional. Un clic por dato.',
    html: `
      ${disc(520, 50, 740, '#e8d0a4')}
      ${fn('La empresa')}
      <h2 class="title" data-in="words" style="position:relative;z-index:2;max-width:900px">Postres con mejor perfil nutricional</h2>
      <div class="facts" style="position:relative;z-index:2;width:960px">
        <div class="fact" data-step="1"><span>Tipo de empresa</span><b>Industria</b></div>
        <div class="fact" data-step="2"><span>Tamaño</span><b>Pequeña empresa</b></div>
        <div class="fact" data-step="3"><span>Actividad principal</span><b>Elaborar, producir y vender postres</b></div>
      </div>
      ${foot}`,
  },
  {
    id: 'productos',
    section: 1,
    title: 'Los postres por capas (3D)',
    bg: '#fbf1da',
    dessert: { kind: 'brownie', x: 250, y: 40, s: 1.1 },
    notes:
      'Brownies, muffins, cheesecakes y pancakes (y galletas) con avena, frutas y cacao. Menos azúcares y grasas, porciones individuales, precios accesibles. Un clic: el postre se abre en capas y se muestran sus ingredientes. Siguientes clics: cada postre. (Las capas son ilustrativas: ajustar a las recetas reales.)',
    steps: 4,
    onStep(k, el, animate) {
      const p = PRODUCT_STEPS[k]
      d3.show({ kind: p.kind, x: 250, y: 40, s: 1.1, labels: p.e > 0 }, { animate })
      const nm = el.querySelector('.dname')
      if (nm.textContent !== p.name) nm.textContent = p.name
    },
    html: `
      ${disc(250, 40, 730, '#e8d0a4')}
      ${fn('Nuestros productos')}
      <div style="position:relative;z-index:2;max-width:700px">
        <div class="dname" data-in="blur">Brownie</div>
        <div class="pts">
          <p data-in="up">Hechos con avena, frutas y cacao</p>
          <p data-in="up">Menos azúcares y grasas en cada preparación</p>
          <p data-in="up">Porciones individuales, prácticas y atractivas</p>
          <p data-in="up">Precios accesibles</p>
        </div>
      </div>
      <div data-step="1" data-anim="none" style="position:absolute;width:1px;height:1px"></div>
      <div data-step="2" data-anim="none" style="position:absolute;width:1px;height:1px"></div>
      <div data-step="3" data-anim="none" style="position:absolute;width:1px;height:1px"></div>
      <div data-step="4" data-anim="none" style="position:absolute;width:1px;height:1px"></div>
      ${foot}`,
  },
]
