import { d3 } from '../hero.js'
import { icon } from '../fx.js'
import { foot, fn, disc, money } from './util.js'

// 2 · Planeación (identidad y planes) · 3 · Planeación (presupuesto)

const F = 'Planeación'

const HB = [
  ['Personal de repostería', 4500, 0],
  ['Ventas y atención al cliente', 2800, 0],
  ['Administración y control financiero', 2800, 0],
  ['Empaque y entrega', 2200, 0],
  ['Nutricionista (medio tiempo)', 2000, 0],
  ['Redes sociales y publicidad', 2000, 0],
  ['Servicios básicos', 1200, 1],
  ['Publicidad y promoción', 800, 1],
  ['Fondo para imprevistos', 500, 1],
  ['Permisos y registros', 300, 1],
]

const fmt = (n) => `Q${n.toLocaleString('en-US')}`

export default [
  {
    id: 'ambiente',
    section: 2,
    title: 'Factores del ambiente',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Cuatro factores que pueden afectar a Vainé. Económico: inflación y precios de frutas, avena, cacao y lácteos. Sociocultural: hay quienes buscan mejor perfil nutricional y quienes prefieren el postre tradicional. Tecnológico: hornos, batidoras y refrigeración; redes y mensajería para pedidos. Ambiental: temporadas, lluvias y sequías.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words">Cuatro factores que pueden mover el negocio</h2>
      <div class="cols4">
        <div class="col" data-step="1">${icon('coin')}<h3>Económico</h3><p>Sube el precio de frutas, avena, cacao y lácteos, y eso puede subir el costo de cada postre.</p></div>
        <div class="col" data-step="2">${icon('users')}<h3>Sociocultural</h3><p>Hay quienes buscan mejor perfil nutricional y quienes prefieren el postre de siempre.</p></div>
        <div class="col" data-step="3">${icon('gear')}<h3>Tecnológico</h3><p>Hornos y refrigeración ayudan a producir con inocuidad; las redes traen los pedidos.</p></div>
        <div class="col" data-step="4">${icon('cloud')}<h3>Ambiental</h3><p>Lluvias, sequías y temporadas cambian la disponibilidad de la fruta.</p></div>
      </div>
      ${foot}`,
  },
  {
    id: 'mision-vision',
    section: 2,
    title: 'Misión y visión',
    layout: 'dark',
    bg: '#3a1807',
    dessert: { kind: 'muffin', x: 640, y: 80, s: 1.12 },
    notes:
      'Misión (qué, cómo y para quién): elaborar y comercializar postres con mejor perfil nutricional, con recetas estandarizadas, ingredientes de calidad e higiene, para personas y familias que quieren disfrutar algo dulce dentro de una alimentación equilibrada. Visión: en 2031 ser una de las marcas de repostería con enfoque nutricional más reconocidas de Guatemala, con planta propia y presencia en cafeterías.',
    html: `
      ${disc(640, 80, 740, '#75340f')}
      ${fn(F)}
      <div class="statement" style="position:relative;z-index:2;max-width:1060px">
        <h3 data-in="fade">Misión</h3>
        <p data-in="up">Elaborar y vender postres con mejor perfil nutricional, con recetas estandarizadas, ingredientes de calidad e higiene, para personas y familias que quieren disfrutar algo dulce dentro de una alimentación equilibrada.</p>
      </div>
      <div class="statement" data-step="1" style="position:relative;z-index:2;max-width:1060px">
        <h3>Visión</h3>
        <p>En 2031, ser una de las marcas de repostería con enfoque nutricional más reconocidas de Guatemala, con planta propia y presencia en cafeterías.</p>
      </div>
      ${foot}`,
  },
  {
    id: 'metas-objetivos',
    section: 2,
    title: 'Metas y objetivos',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Metas: marca reconocida en 2031; costo variable promedio de máximo Q15 por postre; al menos cinco recetas estandarizadas antes de ampliar el catálogo. Objetivos: estandarizar cinco recetas con ingredientes, cantidades, porciones y costo; conocer las preferencias de 50 consumidores con una encuesta previa al lanzamiento; evaluar cada mes ventas, ingresos, costos y utilidad (referencia: 900 postres y Q7,900 de utilidad).',
    html: `
      ${fn(F)}
      <div class="rowhead" data-in="fade">Metas</div>
      <div class="nums" style="margin-top:18px">
        <div class="num" data-step="1"><b data-count="2031" data-sep="">2031</b><span>Ser una marca reconocida de repostería nutricional en Guatemala</span></div>
        <div class="num" data-step="2"><b>Q<span data-count="15">15</span></b><span>Costo variable máximo por postre</span></div>
        <div class="num" data-step="3"><b data-count="5">5</b><span>Recetas estandarizadas antes de ampliar el catálogo</span></div>
      </div>
      <div class="rowhead" data-step="4" style="margin-top:60px">Objetivos</div>
      <div class="nums" style="margin-top:18px">
        <div class="num" data-step="4"><b data-count="5">5</b><span>Recetas con ingredientes, cantidades, porciones y costo por unidad</span></div>
        <div class="num" data-step="5"><b data-count="50">50</b><span>Consumidores potenciales encuestados antes del lanzamiento</span></div>
        <div class="num" data-step="6"><b data-count="900" data-sep=",">900</b><span>Postres al mes como referencia para evaluar ventas y utilidad</span></div>
      </div>
      ${foot}`,
  },
  {
    id: 'reglas-estrategias',
    zoom: 1.2,
    section: 2,
    title: 'Reglas, políticas y estrategias',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Reglas: declarar ingredientes y alérgenos y no usar afirmaciones de salud sin sustento; higiene y contaminación cruzada; respetar gramaje, técnica y rendimiento de las recetas. Políticas: materias primas de calidad y buena conservación; atención amable y recibir comentarios y reclamos. Estrategias: promoción en Instagram, TikTok y Facebook; diferenciación por recetas estandarizadas e información nutricional transparente.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words">Cómo vamos a trabajar</h2>
      <div class="trio">
        <div data-step="1">
          <h3>Reglas</h3>
          <p>Declarar ingredientes y alérgenos; sin afirmaciones de salud sin sustento</p>
          <p>Higiene, limpieza y cero contaminación cruzada</p>
          <p>Respetar gramaje, técnica y rendimiento de cada receta</p>
        </div>
        <div data-step="2">
          <h3>Políticas</h3>
          <p>Materias primas de calidad y buena conservación</p>
          <p>Atención amable y oportuna, y escuchar comentarios y reclamos</p>
        </div>
        <div data-step="3">
          <h3>Estrategias</h3>
          <div class="chips"><span class="chip">Instagram</span><span class="chip">TikTok</span><span class="chip">Facebook</span></div>
          <p>Promocionar con fotos y videos ajustados al presupuesto</p>
          <p>Diferenciarnos con información nutricional transparente</p>
        </div>
      </div>
      ${foot}`,
  },
  {
    id: 'procedimiento',
    section: 2,
    title: 'Procedimiento: brownie de avena y cacao',
    bg: '#fbf1da',
    dessert: { kind: 'brownie', x: 540, y: 70, s: 1.0 },
    steps: 5,
    onStep(k, el, animate) {
      d3.phase(k, animate)
    },
    notes:
      'Procedimiento de 10 pasos agrupados en 5 etapas: preparar (ficha técnica, higiene, pesar), mezclar, hornear, enfriar y porcionar, empacar y registrar. El brownie se arma por etapas: se abre en capas (ingredientes), se mezcla, se hornea, se corta en porciones y se empaca.',
    html: `
      ${disc(540, 70, 620, '#e8d0a4')}
      ${fn(F)}
      <h2 class="title sm" data-in="words" style="position:relative;z-index:2;font-size:64px">Así se hace el brownie de avena y cacao</h2>
      <div class="proc" style="position:relative;z-index:2">
        <div class="stage-row" data-step="1"><i>1</i><div><b>Preparar</b><span>Revisar la ficha técnica, lavarse las manos, desinfectar y pesar cada ingrediente.</span></div></div>
        <div class="stage-row" data-step="2"><i>2</i><div><b>Mezclar</b><span>Preparar horno y molde; mezclar en el orden de la receta hasta una masa homogénea.</span></div></div>
        <div class="stage-row" data-step="3"><i>3</i><div><b>Hornear</b><span>Distribuir en el molde, hornear el tiempo estandarizado y comprobar la cocción.</span></div></div>
        <div class="stage-row" data-step="4"><i>4</i><div><b>Enfriar y porcionar</b><span>Enfriar con higiene, dividir en porciones estandarizadas y revisar la presentación.</span></div></div>
        <div class="stage-row" data-step="5"><i>5</i><div><b>Empacar y registrar</b><span>Etiquetar con ingredientes y alérgenos, almacenar y registrar las unidades.</span></div></div>
      </div>
      ${foot}`,
  },

  // ---------------- Presupuesto ----------------
  {
    id: 'presupuesto',
    section: 3,
    title: 'Presupuesto mensual',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Proyección: 900 postres a Q45 = Q40,500 de ingresos. Costos variables Q13,500 (Q15 por postre). Costos fijos Q19,100 (salarios Q16,300 y otros Q2,800). Resultado operativo mensual estimado: Q7,900, margen de 19.5 %. El punto de equilibrio (≈637 postres) se calculó dividiendo los costos fijos entre la ganancia por postre (Q30): no está en el documento escrito.',
    html: `
      ${fn(F)}
      <div class="split" style="display:grid;grid-template-columns:520px 1fr;column-gap:80px;align-items:center;margin-top:30px">
        <div>
          <h2 class="title md" data-in="words">Cuánto deja cada mes</h2>
          <p class="lead" data-in="up" style="font-size:32px">900 postres vendidos a Q45 cada uno</p>
          <div data-step="4" style="margin-top:50px">
            <div style="font-family:var(--f-display);font-weight:600;font-size:150px;line-height:.95;color:var(--cocoa)"><span data-count="19.5" data-decimals="1">19.5</span> %</div>
            <p class="small" style="margin-top:8px">de margen sobre ventas</p>
          </div>
          <p class="small" data-step="5" style="margin-top:34px;max-width:520px">Con unos 637 postres al mes ya se cubren todos los costos.</p>
        </div>
        <div style="margin-top:70px">
          <div class="chart">
            <div class="cbar" data-step="1" data-anim="none">
              <div class="bar" data-in="grow" style="bottom:0;height:560px;background:var(--cocoa)"></div>
              <div class="val" style="bottom:574px">Q<span data-count="40500" data-sep=",">40,500</span></div>
            </div>
            <div class="cbar" data-step="2" data-anim="none">
              <div class="bar" data-in="grow" style="bottom:373px;height:187px;background:var(--tan-3)"></div>
              <div class="val" style="bottom:574px">−Q<span data-count="13500" data-sep=",">13,500</span></div>
            </div>
            <div class="cbar" data-step="3" data-anim="none">
              <div class="bar" data-in="grow" style="bottom:109px;height:264px;background:var(--tan-3)"></div>
              <div class="val" style="bottom:387px">−Q<span data-count="19100" data-sep=",">19,100</span></div>
            </div>
            <div class="cbar" data-step="4" data-anim="none">
              <div class="bar" data-in="grow" style="bottom:0;height:109px;background:var(--deep)"></div>
              <div class="val" style="bottom:123px">Q<span data-count="7900" data-sep=",">7,900</span></div>
            </div>
          </div>
          <div class="clabels"><span>Ingresos por ventas</span><span>Costos variables</span><span>Costos fijos</span><span>Resultado mensual</span></div>
        </div>
      </div>
      ${foot}`,
  },
  {
    id: 'costos-postre',
    section: 3,
    title: 'Qué cuesta cada postre',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'De los Q45 de venta, Q15 son costos variables: Q10 de ingredientes, Q3 de empaques y etiquetas y Q2 de transporte. Quedan Q30 para cubrir costos fijos y utilidad. Se cumple la meta de no pasar de Q15 de costo variable por postre.',
    html: `
      ${fn(F)}
      <h2 class="title md" data-in="words">Cada postre se vende a Q45</h2>
      <p class="lead" data-in="up" style="font-size:32px">Así se reparte ese precio</p>
      <div class="seg" style="width:1640px;height:150px;margin-top:50px">
        <i data-in="growx" style="flex:10;background:#75340f"></i>
        <i data-in="growx" style="flex:3;background:#b88a4b"></i>
        <i data-in="growx" style="flex:2;background:#d7b782"></i>
        <i data-in="growx" style="flex:30;background:#3a1807"></i>
      </div>
      <div class="legend" style="display:grid;grid-template-columns:repeat(4,1fr);gap:30px;width:1640px;margin-top:26px">
        <div data-step="1"><b style="font-family:var(--f-display);font-size:64px;color:var(--cocoa)">Q10</b><p class="small">Ingredientes</p></div>
        <div data-step="2"><b style="font-family:var(--f-display);font-size:64px;color:var(--tan-3)">Q3</b><p class="small">Empaques y etiquetas</p></div>
        <div data-step="3"><b style="font-family:var(--f-display);font-size:64px;color:#a9803f">Q2</b><p class="small">Transporte y entrega</p></div>
        <div data-step="4"><b style="font-family:var(--f-display);font-size:64px;color:var(--deep)">Q30</b><p class="small">Quedan para costos fijos y utilidad</p></div>
      </div>
      <p class="lead" data-step="5" style="margin-top:40px;font-size:34px;color:var(--deep);font-weight:600">Q15 de costo variable: justo en la meta de no pasar de Q15 por postre.</p>
      ${foot}`,
  },
  {
    id: 'costos-fijos',
    zoom: 1.08,
    section: 3,
    title: 'Costos fijos mensuales',
    bg: '#fbf1da',
    dessert: null,
    notes:
      'Costos fijos de Q19,100 al mes: Q16,300 en salarios (nutricionista medio tiempo, repostería, ventas y atención, redes y publicidad, administración y control financiero, empaque y entrega) y Q2,800 en otros gastos (servicios, publicidad, permisos prorrateados e imprevistos).',
    html: `
      ${fn(F)}
      <div style="display:grid;grid-template-columns:560px 1fr;column-gap:50px;align-items:center;margin-top:20px">
        <div>
          <h2 class="title md" data-in="words">Costos fijos</h2>
          <div style="font-family:var(--f-display);font-weight:600;font-size:128px;line-height:1;color:var(--cocoa);margin-top:30px;white-space:nowrap" data-in="up">Q<span data-count="19100" data-sep=",">19,100</span></div>
          <p class="small" data-in="up" style="margin-top:10px">al mes</p>
          <div style="margin-top:44px;display:flex;flex-direction:column;gap:14px" data-in="up">
            <div class="small" style="display:flex;gap:14px;align-items:center"><i style="width:34px;height:14px;border-radius:7px;background:var(--cocoa);display:block"></i>Salarios: Q16,300</div>
            <div class="small" style="display:flex;gap:14px;align-items:center"><i style="width:34px;height:14px;border-radius:7px;background:var(--tan-3);display:block"></i>Otros gastos: Q2,800</div>
          </div>
        </div>
        <div class="hbars" style="width:1050px;margin-top:0">
          ${HB.map(
            ([n, v, l]) =>
              `<div class="hb"><span>${n}</span><em class="${l ? 'light' : ''}" data-in="growx" style="width:${Math.round((v / 4500) * 100)}%"></em><b>${fmt(v)}</b></div>`,
          ).join('')}
        </div>
      </div>
      ${foot}`,
  },
]
