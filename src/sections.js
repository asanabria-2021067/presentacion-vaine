// Reparto y tiempo tope de cada bloque (segundos). Ajusten `who` al reparto real del equipo.
export const SECTIONS = {
  0: { n: '00', title: 'Portada y equipo', who: 'Todas', tope: 45 },
  1: { n: '01', title: 'La empresa y sus postres', who: 'Sophie', tope: 55 },
  2: { n: '02', title: 'Planeación · identidad y planes', who: 'Diana', tope: 90 },
  3: { n: '03', title: 'Planeación · presupuesto', who: 'Alyssa', tope: 60 },
  4: { n: '04', title: 'Organización', who: 'Marcela', tope: 70 },
  5: { n: '05', title: 'Integración', who: 'Alejandra', tope: 85 },
  6: { n: '06', title: 'Dirección', who: 'Daisy', tope: 70 },
  7: { n: '07', title: 'Control', who: 'Sophie', tope: 70 },
  8: { n: '08', title: 'Conclusiones y recomendaciones', who: 'Diana y Alyssa', tope: 40 },
  9: { n: '09', title: 'Cierre', who: 'Todas', tope: 15 },
}

export const TOTAL_TOPE = 10 * 60
