import { d3 } from '../hero.js'
import { foot, fn } from './util.js'

const F = 'Control'
const POS = [-560, 0, 560]

export default [
  {
    id: 'control-lote',
    section: 7,
    title: 'Tres controles en cada lote',
    bg: '#fbf1da',
    dessert: { kind: 'brownie', x: POS[0], y: -110, s: 0.66, tilt: -4 },
    steps: 3,
    onStep(k, el, animate) {
      d3.show({ kind: 'brownie', x: POS[Math.max(0, k - 1)], y: -110, s: 0.66 }, { animate })
    },
    notes:
      'Producción y calidad: tres tipos de control en cada lote. Preventivo, antes de iniciar: receta estandarizada, cantidades exactas de endulzantes, harinas y grasas, fechas de vencimiento y calidad de ingredientes. Concurrente, durante la preparación: se cumple la receta, el procedimiento y la higiene. De retroalimentación, después: tamaño de porciones, textura, sabor y presentación. El brownie se desplaza con cada clic.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="position:absolute;left:140px;top:150px">Tres controles en cada lote</h2>
      <div class="track" data-in="growx"></div>
      <div class="ctrl" data-step="1" style="left:140px"><div class="dot">1</div><h3>Preventivo</h3><div class="when">Antes de iniciar el lote</div><p>Receta estandarizada, cantidades exactas de endulzantes, harinas y grasas, y fechas de vencimiento.</p></div>
      <div class="ctrl" data-step="2" style="left:700px"><div class="dot">2</div><h3>Concurrente</h3><div class="when">Durante la preparación</div><p>Se sigue la receta y el procedimiento, con medidas de higiene en cada paso.</p></div>
      <div class="ctrl" data-step="3" style="left:1260px"><div class="dot">3</div><h3>De retroalimentación</h3><div class="when">Después de elaborar</div><p>Se revisan el tamaño de las porciones, la textura, el sabor y la presentación.</p></div>
      ${foot}`,
  },
  {
    id: 'control-periodicidad',
    section: 7,
    title: 'Periodicidad del control',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Tres ritmos. Continuo: antes de cada lote, en cada entrega del proveedor, al inicio de la jornada y con cada pedido. Periódico: al finalizar cada lote, evaluación de proveedores antes de la primera compra y cada tres meses, evaluación del personal cada seis meses, presupuesto al inicio de cada mes. Eventual: ingrediente en mal estado, queja de un cliente o proveedor nuevo.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words" style="margin-top:10px">Con qué frecuencia se controla</h2>
      <div class="rhythm">
        <div data-step="1">
          <svg viewBox="0 0 600 130"><path class="draw" d="M0 65 C 40 15, 80 15, 120 65 S 200 115, 240 65 S 320 15, 360 65 S 440 115, 480 65 S 560 15, 600 65" /></svg>
          <h3>Continuo</h3>
          <p>Antes de cada lote: receta y pesaje</p>
          <p>En cada entrega del proveedor: calidad, fechas y empaques</p>
          <p>Con cada pedido: se registra la venta y se pide opinión</p>
        </div>
        <div data-step="2">
          <svg viewBox="0 0 600 130"><path class="draw" d="M0 110 H600 M30 60 V110 M130 60 V110 M230 60 V110 M330 60 V110 M430 60 V110 M530 60 V110" /></svg>
          <h3>Periódico</h3>
          <p>Al terminar cada lote: se revisan los resultados</p>
          <p>Proveedores: antes de la primera compra y cada tres meses</p>
          <p>Presupuesto: al iniciar y al cerrar cada mes</p>
          <p>Personal: evaluación cada seis meses</p>
        </div>
        <div data-step="3">
          <svg viewBox="0 0 600 130"><path class="draw" d="M0 110 H110 L130 15 L150 110 H340 L355 50 L370 110 H520 L535 70 L550 110 H600" /></svg>
          <h3>Eventual</h3>
          <p>Un ingrediente en mal estado o un producto fuera de calidad</p>
          <p>Una queja o reclamo de un cliente</p>
          <p>Un proveedor nuevo, antes de empezar a trabajar con él</p>
        </div>
      </div>
      ${foot}`,
  },
]
