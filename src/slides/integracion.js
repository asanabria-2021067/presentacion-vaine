import { foot, fn } from './util.js'

const F = 'Integración'

export default [
  {
    id: 'plan-rrhh',
    section: 5,
    title: 'Planeación de recursos humanos',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'La estructura actual cubre los puestos básicos. Se suman tres plazas de forma gradual: auxiliar de producción (0 a 6 meses), repartidor (2 a 12 meses) y community manager o auxiliar de marketing digital (más de 12 meses). Cada plaza depende de los pedidos, la capacidad de producción y el presupuesto.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="margin-top:10px">Se contrata según crece Vainé</h2>
      <div class="gantt">
        <div class="axis"><span>Mes 0</span><span>Mes 3</span><span>Mes 6</span><span>Mes 9</span><span>Mes 12</span><span>Más de 12</span></div>
        <div class="grow" data-step="1" data-anim="none">
          <div class="gtext" data-in="fade" style="left:0;top:14px">Auxiliar de producción<small>ayuda cuando aumentan los pedidos</small></div>
          <div class="gbar" data-in="growx" style="left:0;width:500px;top:76px"></div>
        </div>
        <div class="grow" data-step="2" data-anim="none">
          <div class="gtext" data-in="fade" style="left:167px;top:14px">Repartidor<small>más entregas sin sobrecargar a producción ni a ventas</small></div>
          <div class="gbar" data-in="growx" style="left:167px;width:833px;top:76px"></div>
        </div>
        <div class="grow" data-step="3" data-anim="none">
          <div class="gtext" data-in="fade" style="left:1000px;top:14px">Community manager</div>
          <div class="gbar open" data-in="growx" style="left:1000px;width:500px;top:76px"></div>
        </div>
      </div>
      <p class="small" data-step="4" style="margin-top:10px;max-width:1300px">Antes de abrir cada plaza, Administración define salario, jornada, tipo de contratación y requisitos.</p>
      ${foot}`,
  },
  {
    id: 'proceso-integracion',
    section: 5,
    title: 'Del reclutamiento a la evaluación',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Reclutamiento: interno para puestos de más responsabilidad y externo en Instagram, Facebook, LinkedIn y Computrabajo. Selección en siete etapas: currículums, llamada, entrevista, prueba práctica, referencias y documentación sanitaria, comparación y oferta. Inducción en la primera semana. Capacitación por área con refuerzo trimestral o semestral. Evaluación del desempeño cada seis meses.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="margin-top:10px">Del reclutamiento a la evaluación</h2>
      <div class="flow">
        <div class="stp" data-step="1"><i>1</i><h3>Reclutamiento</h3><p>Interno para puestos de más responsabilidad; externo en Instagram, Facebook, LinkedIn y Computrabajo.</p></div>
        <div class="stp" data-step="2"><i>2</i><h3>Selección</h3><p>Siete etapas, desde revisar currículums hasta presentar la oferta de trabajo.</p></div>
        <div class="stp" data-step="3"><i>3</i><h3>Inducción</h3><p>Primera semana: historia de Vainé, normas, recorrido y presentación del equipo.</p></div>
        <div class="stp" data-step="4"><i>4</i><h3>Capacitación</h3><p>Por área, con refuerzo trimestral o semestral y capacitaciones extra cuando cambian los procesos.</p></div>
        <div class="stp" data-step="5"><i>5</i><h3>Evaluación</h3><p>Cada seis meses, con conversación sobre fortalezas y mejoras.</p></div>
      </div>
      ${foot}`,
  },
]
