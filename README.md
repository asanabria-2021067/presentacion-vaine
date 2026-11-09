# Vainé · Presentación final de Administración

Deck animado (1920×1080, escala a cualquier pantalla) para la exposición del proyecto final de Administración (Licenciatura en Nutrición, URL). Sigue la guía de presentación: contenido por función administrativa (planeación, organización, integración, dirección y control), exposición de 10 minutos y todas las integrantes hablan. Funciona sin internet: fuentes, GSAP y three.js van dentro del proyecto. El fondo cubre toda la ventana; la slide de 1920×1080 va centrada.

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
- `src/hero.js`: el postre en 3D (three.js). Un plato visto desde arriba con el postre armado por capas (brownie, cheesecake, muffin y pancakes); gira solo y las capas se separan en vertical. Cada slide le dice dónde ponerlo (`dessert: { kind, x, y, s, labels, explode }`); `labels` lo abre del todo y muestra los chips de ingredientes (editarlos en `KINDS`). Las texturas se pintan por código, no hay modelos ni fotos externas. Cambiar capas o colores en `BUILD` y `T`.
- Marca (`#brand` en `index.html`): logo grande arriba a la derecha, con la flor girando en cada cambio de slide. Cada slide puede pedir `brand: 'cover'` (portada) o `brand: 'center'` (cierre); en slides oscuras (`layout: 'dark'`) usa la versión clara.
- `public/media/`: logo de Vainé, flor de vainilla y wordmark con fondo transparente.

## Música

Hay un lofi propio, generado por código y sin derechos de autor, en `public/audio/lofi.mp3`. Suena muy bajito en bucle desde la primera tecla o clic; la tecla M la silencia o la reactiva.
