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
- `src/hero.js`: el postre completo (imágenes de Canva, vista frontal, en `public/media/capas/`). Flota en la slide; al cambiar de slide se va hacia arriba y el siguiente entra desde abajo, como un scroll automático. Con `labels` (slide de productos) se separa en sus capas y cada capa nombra su ingrediente.
- `src/proceso.js`: la escena de la preparación del brownie. Cada clic reproduce su tramo: el brownie se separa en ingredientes, todo cae al bowl y se bate, la masa se vierte al molde y se hornea, se corta y una porción entra a la caja. Atrás va una palabra gigante por paso.
- Las imágenes se generaron en Canva y se agrandaron 4 veces con superresolución (EDSR). Para cambiar una, reemplaza su PNG con fondo transparente y el mismo nombre.
- La marca: arriba a la derecha solo se ve la flor, grande y cortada por el borde, y gira un pétalo en cada cambio de slide. El logo completo sale en la portada y en el cierre.
- Marca (`#brand` en `index.html`): logo grande arriba a la derecha, con la flor girando en cada cambio de slide. Cada slide puede pedir `brand: 'cover'` (portada) o `brand: 'center'` (cierre); en slides oscuras (`layout: 'dark'`) usa la versión clara.
- `public/media/`: logo de Vainé, flor de vainilla y wordmark con fondo transparente.

## Música

Hay un lofi propio, generado por código y sin derechos de autor, en `public/audio/lofi.mp3`. Suena muy bajito en bucle desde la primera tecla o clic; la tecla M la silencia o la reactiva.
