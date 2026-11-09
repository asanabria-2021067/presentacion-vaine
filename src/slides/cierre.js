import { foot, fn } from './util.js'

const rec = (a, b) => `<div class="rc"><b>${a}</b><span>${b}</span></div>`

export default [
  {
    id: 'conclusiones',
    section: 8,
    title: 'Conclusiones',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Planeación: ya hay identidad, metas, estrategias, recursos y presupuesto. Organización e integración: departamentos, puestos y procesos de contratación. Dirección: jefatura democrática, motivación y comunicación. Control: cada área se supervisa con una periodicidad definida.',
    html: `
      ${fn('Conclusiones')}
      <h2 class="title md" data-in="words" style="margin-top:10px">Lo que nos deja el proyecto</h2>
      <div class="recap">
        <div data-step="1">${rec('Planeación', 'Vainé ya tiene identidad, metas, estrategias, recursos y presupuesto para iniciar y dirigir el emprendimiento.')}</div>
        <div data-step="2">${rec('Organización e integración', 'Departamentos, puestos y procesos de contratación dejan claro quién hace qué y cómo se suma gente nueva.')}</div>
        <div data-step="3">${rec('Dirección', 'Una jefatura democrática, con motivación y medios de comunicación, para que todo el equipo participe.')}</div>
        <div data-step="4">${rec('Control', 'Cada área se supervisa con una periodicidad definida para corregir a tiempo y crecer de forma ordenada.')}</div>
      </div>
      ${foot}`,
  },
  {
    id: 'recomendaciones',
    section: 8,
    title: 'Recomendaciones',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Indicadores mensuales (ventas, ingresos, costo variable por postre, margen y quejas); calcular el costo total de horno, batidora y refrigerador; definir el público objetivo y evitar afirmaciones de salud sin sustento (la nutricionista revisa todo lo que se comunica); estimar los salarios de auxiliar de producción, repartidor y community manager.',
    html: `
      ${fn('Recomendaciones')}
      <h2 class="title md" data-in="words" style="margin-top:10px">Qué sigue para Vainé</h2>
      <div class="recap">
        <div data-step="1">${rec('Medir cada mes', 'Ventas, ingresos, costo variable por postre, margen y quejas, para compararlos con las metas.')}</div>
        <div data-step="2">${rec('Calcular los equipos', 'El costo total de horno, batidora y refrigerador se evalúa aparte del presupuesto mensual.')}</div>
        <div data-step="3">${rec('Cuidar el mensaje', 'Definir el público objetivo y evitar afirmaciones de salud sin sustento; la nutricionista revisa etiquetas y redes.')}</div>
        <div data-step="4">${rec('Estimar los nuevos salarios', 'Auxiliar de producción, repartidor y community manager aún no están en los costos fijos.')}</div>
      </div>
      ${foot}`,
  },
  {
    id: 'gracias',
    section: 9,
    title: 'Cierre y preguntas',
    bg: '#d7b782',
    brand: 'center',
    dessert: null,
    notes: 'Gracias. Preguntas. Trabajo de elaboración propia: no se consultaron fuentes bibliográficas externas.',
    html: `
      <div class="bye">
        <div class="thanks" data-in="words">Gracias</div>
        <p class="lead" data-in="up" style="margin-top:22px;color:#3a1807;font-weight:600;font-size:46px">¿Preguntas?</p>
        <p class="small" data-in="fade" style="margin-top:40px;color:#5a3a22;font-size:24px">Trabajo de elaboración propia, sin fuentes bibliográficas externas. Fotos: Unsplash, licencia libre.</p>
      </div>`,
  },
]
