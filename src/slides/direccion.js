import { foot, fn } from './util.js'

const F = 'Dirección'

const MEDIA = [
  ['Dirección general', ['Reuniones mensuales', 'Correo', 'Informes']],
  ['Producción', ['Reuniones semanales', 'WhatsApp', 'Órdenes escritas', 'Pizarra diaria']],
  ['Nutrición y calidad', ['Informes técnicos', 'Fichas y formatos', 'Reuniones con producción']],
  ['Ventas y mercadeo', ['Reuniones semanales', 'Redes sociales', 'WhatsApp', 'Reportes de ventas']],
  ['Administración y finanzas', ['Correo', 'Reportes financieros', 'Hojas compartidas', 'Reuniones mensuales']],
]

export default [
  {
    id: 'jefatura',
    section: 6,
    title: 'Jefatura democrática',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Tipo de jefatura: democrática. Se escuchan las opiniones y sugerencias antes de decidir, pero la decisión final es de quien dirige. Producción sabe qué ingredientes funcionan; ventas conoce lo que piden los clientes. Cuando el equipo siente que su opinión cuenta, se compromete más y la calidad se mantiene.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="margin-top:10px">Jefatura democrática</h2>
      <p class="lead" data-in="up" style="margin-top:20px;font-size:32px;max-width:1300px">Se escucha a cada área antes de decidir; la decisión final es de quien dirige.</p>
      <div class="decide" style="width:1640px;margin-top:30px">
        <div class="layer" data-step="1" data-anim="none" style="position:absolute;inset:0">
          <div class="bub" data-in="left" style="left:0;top:0"><b>Producción</b><span>Sabe qué ingredientes funcionan mejor en las recetas</span></div>
          <div class="bub" data-in="left" style="left:0;top:190px"><b>Ventas</b><span>Conoce lo que piden y comentan los clientes</span></div>
          <div class="bub" data-in="left" style="left:0;top:380px"><b>Nutrición</b><span>Cuida el perfil nutricional de cada receta</span></div>
        </div>
        <div class="layer" data-step="2" data-anim="none" style="position:absolute;inset:0">
          <svg viewBox="0 0 1640 520" width="1640" height="520">
            <path class="draw" d="M600 62 C 860 62, 860 255, 1100 255" />
            <path class="draw" d="M600 237 C 860 237, 860 255, 1100 255" />
            <path class="draw" d="M600 412 C 860 412, 860 255, 1100 255" />
          </svg>
          <div class="final" data-in="pop" style="right:0;top:115px"><b>Decisión final</b><span>Queda en manos de quien dirige Vainé</span></div>
        </div>
      </div>
      <p class="small" data-step="3" style="margin-top:40px;max-width:1500px">Así se mejoran recetas y se resuelven problemas más rápido, y el equipo se siente parte de Vainé.</p>
      ${foot}`,
  },
  {
    id: 'motivacion',
    section: 6,
    title: 'Motivación por nivel',
    bg: '#fbf1da',
    dessert: null,
    steps: 3,
    onStep(k, el) {
      const on = (i) => k === 0 || i <= k
      ;[1, 2, 3].forEach((i) => {
        const p = el.querySelector(`.p${i}`)
        p.style.transition = 'opacity .6s'
        p.style.opacity = on(i) ? 1 : 0.3
      })
    },
    notes:
      'Motivación económica y no económica según el nivel. Estratégico (gerencia y dueñas): metas mensuales de crecimiento y celebrarlas. Táctico (administración y nutrición): incentivo por reducir gastos sin afectar la calidad; la nutricionista propone recetas. Operativo (producción, compras, ventas, redes y empaque): reconocimientos e incentivos por calidad, higiene, ventas, creatividad y entregas a tiempo. Evaluaciones cada seis meses.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="margin-top:10px">Cómo se motiva a cada nivel</h2>
      <div class="levels">
        <div class="pyr" data-in="up">
          <div class="p1"></div>
          <div class="p2"></div>
          <div class="p3"></div>
        </div>
        <div>
          <div class="lvl" data-step="1" style="--dot:#3a1807"><h3>Estratégico: gerencia y dueñas</h3><p><b>Metas mensuales de crecimiento</b> y celebrar cuando se alcanzan.</p></div>
          <div class="lvl" data-step="2" style="--dot:#75340f"><h3>Táctico: administración y nutrición</h3><p><b>Incentivo por reducir gastos</b> sin afectar la calidad; reconocer a la nutricionista cuando sus recetas entran al menú.</p></div>
          <div class="lvl" data-step="3" style="--dot:#b88a4b"><h3>Operativo: producción, compras, ventas, redes y empaque</h3><p><b>Reconocimientos e incentivos</b> por calidad, higiene, metas de ventas, creatividad y entregas a tiempo.</p></div>
        </div>
      </div>
      ${foot}`,
  },
  {
    id: 'comunicacion',
    section: 6,
    title: 'Medios de comunicación',
    bg: '#fbf1da',
    dessert: null,
    notes: 'Qué canal usa cada área: reuniones, correo, WhatsApp, informes, fichas, redes, hojas compartidas.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="margin-top:10px">Cómo se comunica cada área</h2>
      <div class="media">
        ${MEDIA.map(([a, m]) => `<div class="mrow" data-in="up"><b>${a}</b><div>${m.map((x) => `<span>${x}</span>`).join('')}</div></div>`).join('')}
      </div>
      ${foot}`,
  },
]
