import { foot, fn } from './util.js'

const F = 'Organización'

const node = (cls, x, y, text) => `<div class="node ${cls}" data-in="pop" style="left:${x}px;top:${y}px">${text}</div>`

export default [
  {
    id: 'organigrama',
    section: 4,
    title: 'Organigrama',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Cuatro niveles: directivo (gerente general y financiero), técnico (nutricionista y encargado de calidad), coordinación (encargados de producción, ventas y marketing, y compras y logística) y operativo (producción, ventas y atención, redes sociales y publicidad, empaque). Primer clic: los encargados. Segundo clic: el personal operativo.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="margin-top:10px">Quién responde a quién</h2>
      <div class="org">
        <svg viewBox="0 0 1664 540" width="1664" height="540">
          <path class="draw" d="M825 100 V150 M190 150 H1510 M190 150 V200 M590 150 V200 M1060 150 V200 M1510 150 V200" data-in="none" />
        </svg>
        ${node('l1', 645, 0, 'Gerente general y financiero')}
        <div class="layer" data-step="1" data-anim="none" style="position:absolute;inset:0">
          <svg viewBox="0 0 1664 540" width="1664" height="540" style="position:absolute;inset:0">
            <path class="draw" d="M825 100 V150 M190 150 H1510 M190 150 V200 M590 150 V200 M1060 150 V200 M1510 150 V200" />
          </svg>
          ${node('l2', 40, 200, 'Nutricionista y encargado de calidad')}
          ${node('l2', 440, 200, 'Encargado de producción')}
          ${node('l2', 910, 200, 'Encargado de ventas y marketing')}
          ${node('l2', 1360, 200, 'Encargado de compras y logística')}
        </div>
        <div class="layer" data-step="2" data-anim="none" style="position:absolute;inset:0">
          <svg viewBox="0 0 1664 540" width="1664" height="540" style="position:absolute;inset:0">
            <path class="draw" d="M590 308 V410 M1060 308 V358 M930 358 H1190 M930 358 V410 M1190 358 V410 M1510 308 V410" />
          </svg>
          ${node('l3', 465, 410, 'Personal de producción')}
          ${node('l3', 805, 410, 'Personal de ventas y atención al cliente')}
          ${node('l3', 1065, 410, 'Encargado de redes sociales y publicidad')}
          ${node('l3', 1385, 410, 'Personal de empaque')}
        </div>
      </div>
      ${foot}`,
  },
  {
    id: 'areas-coordinacion',
    section: 4,
    title: 'Áreas de trabajo y coordinación',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Cinco áreas: estratégica y financiera; nutricional y de calidad; producción; comercial y marketing; operativa y logística. Y cuatro mecanismos de coordinación: fichas y manuales; nutrición con producción; ventas con producción; compras y logística con producción y empaque.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="margin-top:10px">Cada área sabe qué hace</h2>
      <div class="twocol" style="margin-top:34px">
        <div data-step="1">
          <h3>Áreas de trabajo</h3>
          <p><b>Estratégica y financiera:</b> administración, presupuesto y decisiones generales</p>
          <p><b>Nutricional y de calidad:</b> perfil nutricional, etiquetado e inocuidad</p>
          <p><b>Producción:</b> elaboración, horneado, pesaje e higiene</p>
          <p><b>Comercial y marketing:</b> redes, publicidad, atención y ventas</p>
          <p><b>Operativa y logística:</b> compras de insumos, empaque y entrega</p>
        </div>
        <div data-step="2">
          <h3>Cómo se coordinan</h3>
          <p>Fichas estandarizadas y manuales de higiene e inocuidad</p>
          <p>Nutrición y producción verifican sustituciones y gramajes</p>
          <p>Ventas y producción ajustan los pedidos y entregas del día</p>
          <p>Compras y logística aseguran insumos con producción y empaque</p>
        </div>
      </div>
      ${foot}`,
  },
]
