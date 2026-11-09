export const foot = ''
export const fn = (t) => `<div class="fn" data-in="fade">${t}</div>`
// Disco de color detrás del postre; cx, cy = desplazamiento desde el centro (igual que la config 3D)
export const disc = (cx, cy, d, color) =>
  `<div class="disc" data-in="scale" style="left:${960 + cx - d / 2}px;top:${540 + cy - d / 2}px;width:${d}px;height:${d}px;background:${color}"></div>`
export const money = (n, pre = 'Q') => `${pre}<span data-count="${n}" data-sep=","></span>`
