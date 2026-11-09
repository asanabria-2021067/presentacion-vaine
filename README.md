# Vainé · Presentación final de Administración

Deck animado (1920×1080, escala a cualquier pantalla) para la exposición del proyecto final de Administración (Licenciatura en Nutrición, URL). Sigue la guía de presentación: contenido por función administrativa (planeación, organización, integración, dirección y control), exposición de 10 minutos y todas las integrantes hablan. Funciona sin internet: fuentes, GSAP y las imágenes van dentro del proyecto. El fondo cubre toda la ventana; la slide de 1920×1080 va centrada.

Está construido con el mismo motor que las presentaciones de Kontrol y UVGenius (slides con pasos, vista de presentador con cronómetro, URL con la posición).

## Correrlo

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # genera dist/
npm run preview    # http://localhost:4180 (conviene el día de la exposición)
```

## Controles

| Tecla | Acción |
|---|---|
| → · Espacio · PageDown · Enter | Siguiente paso o slide (sirve con clicker) |
| ← · PageUp · Backspace | Paso o slide anterior |
| número + Enter | Saltar a esa slide |
| F | Pantalla completa |
| P | Vista de presentador: notas, cronómetro por bloque contra su tope y total contra 10:00 |
| B o . | Pantalla negra |
| R | Repetir la animación de entrada de la slide |

La URL guarda la posición (`#4.2` = slide 4, paso 2).

## Dónde va cada cosa

- `src/slides/*.js`: el contenido de cada slide, sus pasos (`data-step`) y sus notas para quien expone.
- `src/sections.js`: quién expone cada bloque y su tiempo tope. **Ajustar al reparto real.**
- `src/hero.js`: el postre por capas en 2D. Cada postre son imágenes de Canva en vista frontal (una por capa, en `public/media/capas/`) que flotan y se mecen; al abrirse (`labels`) se separan en vertical, los ingredientes giran alrededor y cada capa se nombra con un chip. Cada slide dice dónde ponerlo (`dessert: { kind, x, y, s, labels, explode }`). `phase(k)` anima el paso a paso del brownie (preparar, mezclar, hornear, porcionar, empacar). Para cambiar una capa, reemplaza su PNG (fondo transparente) y ajusta `w` en `KINDS`.
- Marca (`#brand` en `index.html`): logo grande arriba a la derecha, con la flor girando en cada cambio de slide. Cada slide puede pedir `brand: 'cover'` (portada) o `brand: 'center'` (cierre); en slides oscuras (`layout: 'dark'`) usa la versión clara.
- `public/media/`: logo de Vainé, flor de vainilla y wordmark con fondo transparente.

## Música

Hay un lofi propio, generado por código y sin derechos de autor, en `public/audio/lofi.mp3`. Suena muy bajito en bucle desde la primera tecla o clic; la tecla M la silencia o la reactiva.
