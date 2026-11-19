# Propuesta de rediseño móvil (390 px) — El Otro Portón

**Alcance:** solo el contenido principal de `index.html` (Sobre nosotros + galería) y la carta de `carta.html`.
**Fuera de alcance:** hero/intro y footer/contacto — Nico los aprobó, no se tocan.
**Destinatario:** desarrollador que aplique el cambio en CSS/HTML. Este documento no contiene código; contiene reglas concretas, selectors y valores.

La propuesta se apoya en lo que ya existe: la paleta vino/oro de `css/base/tokens.css`, las fuentes Playfair Display + Inter, la escala `--sp-*` y el patrón de "carta de papel" (nombre · puntitos · precio) que ya usa la galería. No se propone una identidad nueva, sino **recomponer la misma identidad para el pulgar y la lectura vertical**.

---

## 1. Diagnóstico: qué está mal hoy en móvil y por qué

1. **Sobre nosotros se lee como un bloque de texto interminable y una foto coronada.** `.about__layout` es un `auto-fit` sin media query propia: a 390 px cae a una columna con la foto de 4/5 *debajo* de dos párrafos largos y tres stats. El resultado es ~600 px de texto antes de ver una imagen, y la capitular de 3.6em pelea con el `h2` por la jerarquía. Las stats (1984 / Live Art / Infiernillo) no son cifras comparables: se leen como tres datos sueltos sin jerarquía.
2. **La galería no tiene ritmo: es la misma tarjeta repetida.** Cada `.galeria-bloque--pareja` se resuelve en móvil como "foto 4/3 → panel de vidrio con título + lista". Cuatro bloques seguidos con el mismo patrón producen una tira de tarjetas apiladas. A eso se suma el mosaico: pasar de 12 columnas a 6 con `span 2` convierte las ocho celdas desiguales en **una cuadrícula de 3 × 3 de celdas idénticas**, que es exactamente lo que el diseño quería evitar.
3. **El panel de vidrio pierde sentido cuando no hay foto debajo.** En escritorio el panel flota sobre la imagen; en móvil la foto va arriba y el panel queda como una caja con borde y fondo propio separada de ella. El degradado/franja pensado para superponerse se convierte en un adorno sin función, y el `padding` de `clamp(1.5rem, 3vw, 2.5rem)` come ancho en una pantalla de 390 px.
4. **Los puntitos de la galería se rompen en nombres largos.** `.galeria-plato__puntos` es `flex: 1` con `min-width` implícito de 0: con nombres como "Fainá con cebolla al tannat y queso Colonia" el precio se empuja y la línea de puntos se achica hasta desaparecer, o el nombre se parte en tres líneas y el precio queda colgando. No hay control de cuántas líneas ocupa el nombre.
5. **La carta parece un listado de e-commerce, no una carta.** La miniatura de 6.5rem a la izquierda más el cuerpo con borde y `background: var(--c-superficie)` por fila produce una pila de "tarjetas de producto" — 13 miniaturas seguidas exigen demasiado scroll. El precio compite con el nombre en el mismo renglón y el mismo `--fs-base`, sin jerarquía. Los filtros en una fila deslizable son prácticos pero no dicen dónde estás: al deslizar, "Todo" y las categorías se parecen entre sí y no hay ningún encabezado de categoría en la lista.
6. **La carta no avisa de los cambios de categoría al scrollear.** Todo el menú se vierte en un `.carta__grid` plano con `data-categoria` en cada tarjeta. Al hacer scroll no hay ninguna señal de "entradas / parrilla / postres": la jerarquía del documento existe en `window.MENU` pero no se ve en pantalla. Y las fotos que sí hay (una por plato) se gastan en miniaturas ilegibles en vez de usarse como cabeceras de categoría.

---

## 2. Principios de diseño responsive aplicados

1. **Jerarquía antes que densidad:** en móvil manda una sola decisión por pantalla — qué se mira (foto), qué se lee (nombre) y cuánto cuesta (precio). Nada compite en el mismo tamaño de letra.
2. **Ritmo alternado:** foto de impacto → bloque de texto/platos → pausa → foto de impacto. Nunca dos bloques con la misma silueta seguidos. La pausa puede ser tipográfica (una cita, un eyebrow) o una tira horizontal, no tiene que ser otra foto.
3. **Legibilidad sobre ocultamiento:** descripción a `--fs-sm` con `line-height` holgado y `--c-texto`, nunca gris sobre gris. `--fs-xs` se reserva para eyebrows y notas, no para cuerpos de plato.
4. **Fotos grandes pero contadas:** en 390 px una foto a 4/3 de ancho completo ya es protagonista. Mejor seis fotos bien compuestas que doce apiladas. El ojo necesita un descanso entre imágenes.
5. **Precio como remate, no como etiqueta:** nombre en `--font-display`, precio en `--font-display` con `--c-acento` y `font-variant-numeric: tabular-nums`, al final de la línea y unido al nombre por puntitos. Es la sintaxis de una carta impresa; el usuario la reconoce sin aprender nada nuevo.
6. **El scroll es parte del diseño:** la primera pantalla debe vender (foto + título), no agotar. Los controles que se usan mientras se lee (filtros) se quedan a la vista; el contenido se organiza en tramos con entra y salida claras.
7. **Cero efectos que no se ven en el dedo:** `background-attachment: fixed` ya está limitado a `min-width: 1025px`, bien. No reintroducirlo ni sustituirlo por parallax en móvil.

---

## 3. Propuesta (A): contenido principal de `index.html`

### 3.1 Sobre nosotros — de "muro de texto" a "retrato + historia"

**Estructura en móvil (arriba → abajo):**

1. Eyebrow "Nuestra historia" ( `--fs-xs`, `--tracking-wide`, `--c-acento`).
2. `h2` con el titular completo; en móvil conviene que el salto de línea sea natural y que `text-wrap: balance` evite una última línea de dos palabras.
3. **Foto de la sala (`about__figure`) sube antes de los párrafos.** Es el cambio clave: en 390 px el local tiene que verse antes de leerse. Proporción `4 / 5` (la que ya trae) está bien; conviene mantenerla y poner radio `--r-lg`. El marco decorativo `::after` se desplaza hacia afuera y se recorta: en móvil reducir el desplazamiento o eliminarlo para no generar scroll horizontal.
4. Párrafo de apertura (`about__intro`) con capitular reducida: de `3.6em` a ~`2.4em`, y solo sobre este párrafo (el selector actual `.about__text > p.about__intro` ya es correcto, verificar que no alcance a las stats).
5. Segundo párrafo, separado por `--sp-4`.
6. Stats: **pasar de 3 columnas iguales a una fila de 2 + una de 1, o a una sola fila de 3 con el valor en `--fs-lg`**. Lo importante: que el número sea lo primero que se lee. Sugerencia de jerarquía: `1984` en `--fs-xl` con etiqueta "Fuego desde entonces"; los otros dos en `--fs-lg`. No inventar cifras nuevas; si "Live Art" no es un dato verificable, tratarlo como texto y no como número.

**Espaciado:** `--seccion-pad-y` ya baja solo a 4rem; mantener. Entre foto y texto, `--sp-5`. Entre texto y stats, `--sp-5` con el borde superior existente.

### 3.2 Banda de transición (`transicion--mollejas`)

No es hero ni footer, pero tampoco es contenido propiamente dicho. **Dejarla como está** — es el respiro entre Sobre nosotros y la galería y ya funciona en móvil. Solo verificar que el CTA siga apuntando a `#galeria`.

### 3.3 Bloques de platos con foto (`.galeria-bloque--pareja`, `--pareja-inversa`, `--ancha`)

**Estructura en móvil:** foto arriba → lista de platos abajo, **sin panel de vidrio, sin borde, sin fondo de caja**. La lista es texto directo sobre el fondo de la página, con el mismo ancho del contenedor. Esto elimina la "tarjeta” y devuelve la lectura de carta.

- Foto: una sola por bloque, `aspect-ratio: 4 / 3` para las de pareja (ancho completo, ~292 px de alto a 390 px) y `16 / 9` → `4 / 3` para la de bebidas, que ya está resuelto en el media query. Radio `--r-lg` solo en las esquinas, sin sangrado.
- Título del bloque: inmediatamente debajo de la foto, con `--fs-xl` y `margin-block: var(--sp-4) var(--sp-3)`. El eyebrow va **encima del título**, en `--fs-xs`, sin `float` (ver §6).
- Lista: `gap: var(--sp-4)` entre platos (más aire que el `--sp-5` actual entre filas? no: `--sp-5` entre platos está bien para 390 px; `--sp-4` entre nombre y descripción dentro de un plato).
- **Puntitos:** conservar el patrón nombre · puntos · precio de `.galeria-plato__fila`, pero con tres reglas móviles:
  - el nombre puede ocupar hasta 2 líneas (`-webkit-line-clamp: 2` con `overflow: hidden`), nunca más;
  - `.galeria-plato__puntos` con `min-width: 1.5rem` (eliminar el colapso a 0) y `margin-inline: var(--sp-2)`;
  - el precio con `white-space: nowrap` y `flex-shrink: 0`. Si el nombre llega a 2 líneas, los puntos se siguen viendo como guía.
- Descripción: `--fs-sm`, `--c-texto-suave`, una sola línea visible con `text-overflow: ellipsis` **solo si** el plato tiene más de ~70 caracteres; si no, mostrarla completa. Nunca `--fs-xs` para descripción.
- Alternar el énfasis: en el bloque de parrilla la foto manda; en el de entradas, la lista manda (foto más baja, `aspect-ratio: 1 / 1`). Es lo que evita que cuatro bloques seguidos se lean igual.

**Orden de lectura:** no cambiar el DOM con `order` en móvil para los bloques inversos. Hoy el bloque invertido tiene la foto primero en el HTML y la lista después; el media query ya usa `order: -1` sobre la foto, lo cual es redundante y puede escribir mal el orden del lector de pantalla. Con la foto primero en el Markdown/DOM y arriba en pantalla, se puede quitar ese `order`.

### 3.4 Bloque de cocina (`.galeria-bloque--costuras`)

Hoy: foto, texto, foto; en móvil se apila y se oculta la segunda foto. **Propuesta:** una sola foto de 4/3 arriba, el texto centrado abajo, sin la segunda foto (como ya ocurre). Dar al texto un tratamiento de "cita de cocina": `--font-display`, `--fs-lg`, `line-height: 1.45`, `text-align: left` en móvil (el centrado horizontal se reserva para escritorio), y una regla superior de `--c-marca` de 2 px por encima para marcar el cambio de registro. Es el descanso tipográfico entre la parrilla y las entradas.

### 3.5 Mosaico — de rejilla de 6 columnas a **carrusel horizontal**

Este es el cambio de mayor impacto visual.

- En móvil, `.mosaico` deja de ser `grid` y pasa a una **fila horizontal deslizable** (`display: flex`, `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scroll-padding-inline: var(--contenedor-pad)`).
- Cada `.mosaico__celda`: ancho `min(78vw, 22rem)`, `aspect-ratio` **alternado** entre `4 / 5` y `5 / 4` para conservar la idea de celdas desiguales; `flex: 0 0 auto`, `scroll-snap-align: center`, radio `--r-md`.
- Separación entre celdas: `--sp-3`. Margen lateral negativo con `padding-inline: var(--contenedor-pad)` para que la primera y la última se alineen con el contenido y la fila se deslice de borde a borde.
- Quitar los `span` de las clases `--3x2`, `--2x2`, etc. en el media query (ya no aplican). La suma de 12 columnas queda intacta en escritorio.
- Agregar una **pista discreta de deslizamiento**: la última foto se recorta a medias en el borde derecho. Es la señal más clara de que hay más; no hace falta texto ni puntos indicadores.
- Accesibilidad: el `scroll` horizontal con dedo funciona sin JS; mantener las imágenes con `alt` real y `loading="lazy"`.

**¿Por qué carrusel y no grid 2 columnas?** Con 2 columnas y 8 fotos se vuelve otra tira de 4 filas — el mismo problema que el resto de la galería. El carrusel mantiene las 8 fotos pero ocupa **una sola pantalla** de altura y rompe el ritmo: es el único momento de la sección donde el usuario desliza en vez de bajar.

### 3.6 Ritmo general de la galería en móvil

Secuencia resultante, de arriba abajo:

| # | Bloque | Altura aproximada | Sensación |
|---|---|---|---|
| 1 | Texto "El local y lo que sale del fuego" | 1/4 pantalla | entrada |
| 2 | Foto de cocina (una) | 1 pantalla | impacto |
| 3 | Cita de cocina | 1/4 pantalla | pausa tipográfica |
| 4 | Parrilla: foto + lista | 1.5 pantallas | lectura |
| 5 | Entradas: foto cuadrada + lista | 1.2 pantallas | lectura (ritmo distinto) |
| 6 | Mosaico carrusel | 1 pantalla | deslizar / respiro |
| 7 | Postres: foto + lista | 1.2 pantallas | lectura |
| 8 | Bebidas: foto ancha + lista + nota | 1.5 pantallas | cierre |

Regla para el desarrollador: **nunca dos impactos fotográficos seguidos y nunca dos listas de platos seguidas sin una foto de por medio.** El mosaico es el único bloque que se desliza.

---

## 4. Propuesta (B): carta en móvil

### 4.1 Decisión de Nico: esquema HÍBRIDO (requirement)

La carta en móvil usa **una foto de cabecera por categoría + debajo la lista de platos tipo papel**, con **foto chica opcional por plato**. Ni tarjetas grandes por plato (13 miniaturas = demasiado scroll), ni lista seca sin fotos. Este es el requirement que manda; reemplaza la propuesta de "sin fotos" que había en la versión anterior de este documento.

La estructura resultante por categoría es:

```
[ FOTO DE CABECERA de la categoría  →  título encima, en oro ]
[ nombre · puntitos · precio ]
[ descripción ]
[ nombre · puntitos · precio ]   ← foto chica opcional, alineada a la derecha
[ descripción ]
...
```

**Por qué funciona:** la foto de cabecera hace el trabajo emocional una sola vez por grupo (4 fotos en total en vez de 13 miniaturas), y la lista mantiene la densidad y la jerarquía de una carta impresa. Es el mismo ritmo que ya tiene la galería del index: foto grande → platos escritos.

### 4.2 Agrupar los platos por categoría desde `window.MENU`

Hoy `js/modules/carta.js` aplana `window.MENU` y vierte todo en un solo `.carta__grid`; la agrupación no existe en el DOM. El cambio (en `js/modules/carta.js`, no en este documento) es **dejar de aplanar para el render** y recorrer `Object.entries(window.MENU)`, emitiendo por cada clave un grupo:

```html
<section class="carta__grupo" data-categoria-grupo="entradas">
  <header class="carta__grupo-head">
    <img class="carta__grupo-foto" src="assets/img/…" alt="" aria-hidden="true">
    <h2 class="carta__categoria">Entradas</h2>
  </header>
  <!-- aquí las .dish-card de ese grupo, con su data-categoria existente -->
</section>
```

Puntos concretos:

- El orden de los grupos es el orden de las claves en `js/data/menu.js`: **entradas → parrilla → especiales → bebidas**. No reordenar.
- `label` de cada grupo (`group.label`) es el texto del `<h2>`; no escribir los títulos a mano en el HTML.
- Cada `.dish-card` conserva su `data-categoria` actual. El filtrado pasa a actuar sobre `.carta__grupo` en vez de sobre platos sueltos: al elegir "Parrillada" se ocultan los otros tres grupos completos (foto + título + platos). El listener existente de `aria-pressed` no cambia.
- `observeReveal(grid)` sigue siendo válido: se llama después de inyectar todo el HTML nuevo.
- `.carta__grid` se mantiene como contenedor de los grupos. En móvil pasa a `display: block` (o `grid` de una columna) para que los grupos se apilen.

### 4.3 Qué foto de cabecera usar por categoría

Las imágenes ya están en `assets/img/`. No hace falta subir nada: cada plato trae `imagen` en `js/data/menu.js`, así que la cabecera se elige **tomando la imagen de un plato representativo del grupo**. Se propone agregar un campo opcional `fotoGrupo` a cada grupo en `js/data/menu.js` con el nombre de archivo; si no está, `carta.js` usa `group.items[0].imagen` como fallback. Así el desarrollador puede afinar la elección sin tocar JS.

| Grupo (`window.MENU`) | `fotoGrupo` propuesta | Por qué |
|---|---|---|
| `entradas` | `empanada-de-carne-a-cuchillo.jpg` | Es el plato `destacado` del grupo y la imagen más reconocible de la casa. 900×506, apaisada: ideal para cabecera. |
| `parrilla` | `chorizo-morcilla-queso.jpg` | 1000×563, apaisada y muestra el surtido a la parrilla. Representa mejor al grupo que un corte individual (`caption_11.jpg` es 1000×1333, vertical: se recortaría mucho). |
| `especiales` | `cheese-burger.jpg` | 1200×800, el plato `destacado` del grupo; resuelve bien recortado a banda. Alternativa: `caption_4.jpg` (raviolones) si se prefiere algo menos informal. |
| `bebidas` | `gin-tonic.jpg` | 1100×841, `destacado` del grupo. Alternativa `limonada-casa.jpg` (751×1000, vertical: conviene más para la miniatura del plato que para la cabecera). |

Reglas para la foto de cabecera:

- Proporción `16 / 9` en móvil (a 390 px → ~220 px de alto); `object-fit: cover` con `object-position: center`. Ninguna foto de cabecera pasa de una cuarta parte de la pantalla.
- Anclada al ancho del contenedor con `--contenedor-pad`; radio `--r-lg`. Se descarta el sangrado a borde: con los filtros sticky arriba, una foto de borde a borde se siente como una banda nueva y rompe la lectura de "hoja de carta".
- Encima, un velo oscuro (`linear-gradient` de `--c-vino-900` al 55 % → transparente) y el `<h2>` en `--c-hueso` con `--font-display` `--fs-xl`, apoyado abajo a la izquierda con `--sp-4`. Así el título no necesita otro bloque: la cabecera ya identifica la categoría. Si se prefiere el título fuera de la foto, va justo debajo en `--c-texto` con una regla corta de `--c-acento`; **elegir una de las dos, no las dos juntas**.
- `alt` de la foto: vacío y `aria-hidden="true"`, porque es decorativa; el nombre de la categoría ya lo da el `<h2>`.
- `loading="lazy"` para todas salvo la primera.

### 4.4 Cómo se ve el plato individual dentro del grupo

- Base: **sin tarjeta**. `.dish-card` pierde fondo, borde, radio y `padding` en móvil. Los platos se separan con una línea de 1 px `--c-borde` entre ellos.
- Fila: nombre en `--font-display` `--fs-base` (o `--fs-lg` si el desarrollador quiere más presencia), puntitos `.dish-card__dots` estirados con `min-width: 1.5rem`, precio en `--c-acento` con `font-variant-numeric: tabular-nums` y `flex-shrink: 0`. Nombre y precio en la misma línea base, como en la galería del index.
- Descripción: `--fs-sm`, `--c-texto-suave`, `margin-top: var(--sp-1)`, completa (son textos cortos; cortarlos quita información).
- **Foto chica opcional por plato:** se muestra solo en los platos con `destacado: true` (5 de 13: empanada de carne, lengua a la vinagreta, ojo de bife, cheese-burger y gin tonic, según `js/data/menu.js`). Medidas: **3.25rem × 3.25rem** (52 px), `object-fit: cover`, `border-radius: var(--r-sm)`, alineada a la **derecha** de la fila del nombre, antes del precio. El precio va después, en su columna.
  - Qué foto usar: la del propio plato (`plato.imagen`), que ya está cargada para ese registro. No se carga ninguna imagen nueva.
  - Si se quiere **ninguna** foto por plato, basta con ocultar `.dish-card__media` en el media query: el esquema sigue funcionando con solo las cabeceras de categoría. Es la perilla de densidad del diseño.
  - Si se quiere una foto en **todos** los platos, subir a 2.75rem y mantener el mismo alineado; pero se pierde la sensación de carta y se vuelve al listado de miniaturas. No recomendado.
- Etiqueta "Del chef": pasar de badge flotante a marca discreta en `--fs-xs` `--c-acento` junto al nombre. Si ese plato ya lleva foto chica, la etiqueta va encima de la descripción para no competir.
- Jerarquía de precio: el precio no compite en tamaño con el nombre; `--fs-base` para ambos está bien, pero el nombre va en `--font-display` `600` y el precio en `--c-acento` `normal`. El ojo lee nombre → precio.

### 4.5 Filtros: chips pegajosos, no barra deslizable muda

- `.carta__toolbar` pasa a `position: sticky` con `top` igual a la altura de la nav (~74 px: 42 px de logo + `2 × var(--sp-4)`; conviene declarar `--nav-h` en `tokens.css` y usarlo también en el `scroll-margin-top` de `#carta`).
- Fondo: `--c-bg` con `backdrop-filter: blur(8px)`, más una línea inferior `--c-borde`. Sin esto, las fotos de cabecera se ven pasar detrás de los chips y se leen mal.
- `z-index`: por debajo de `--z-nav` (`calc(var(--z-nav) - 1)`).
- Botones `.filter-btn`: chips con `border-radius: var(--r-full)`, `--fs-xs`, `padding: 0.55rem 1rem`, `letter-spacing: normal` en móvil (el `--tracking-wide` de 0.18em se come el ancho). Activo: `--c-marca` sobre `--c-hueso`; inactivo: `--c-borde` y `--c-texto-suave`.
- Mantener el deslizamiento horizontal con `scroll-snap`, pero **el chip activo se desplaza hasta quedar visible** al tocarlo: `button.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" })`. Si no, "Bebidas" queda fuera de pantalla sin señal.
- `aria-live="polite"` discreto en el toolbar para anunciar la categoría activa (además del `aria-pressed` existente).

### 4.6 Encabezado de la carta y nota final

- `carta-head` ya baja el título a `--fs-2xl` en móvil; está bien. Acortar el `padding-block` superior de `clamp(5.5rem, 22vw, 8rem)` a ~`5.5rem` fijo: acá no hay hero que compense la nav.
- El `lead` con la cita larga + el `svg` de llama se come media pantalla: en móvil `carta-head .lead` con `-webkit-line-clamp: 2` y el `svg` oculto por debajo de 30rem.
- `carta-aviso` ("Precios de referencia 2025") va al final de la carta, no arriba: el aviso se lee cuando se miran los precios.
- `.carta__note` al final de la hoja, centrada, en `--fs-xs` y con borde superior. Conservar.

---

## 5. Plan de aplicación (archivos y cambios)

| Archivo | Qué cambiar (solo reglas/estructura) |
|---|---|
| `css/layout/about.css` | Agregar media query `@media (max-width: 48rem)`: `about__layout` a una columna con la figure **primera** (usar `order` sobre `.about__figure` solo si no se reordena el HTML; preferir reordenar el HTML, ver §6); capitular a ~2.4em; `about__stats` a 3 columnas con el primer valor en `--fs-xl`, o a 2+1; reducir el desplazamiento de `.about__figure::after` para no cortar el viewport. |
| `css/layout/galeria.css` | **Reescribir el bloque `@media (max-width: 48rem)`** (líneas ~827-938): quitar `order: -1` de la foto, quitar `padding/border/background` del `.galeria-lista`, dejar el texto a la anchura del contenedor, ajustar `margin` del título. En el bloque de costuras: una sola foto 4/3, cita alineada a la izquierda con regla superior. En los puntitos: `min-width: 1.5rem`, `margin-inline: var(--sp-2)`, nombre a 2 líneas máximo, precio `flex-shrink: 0`. |
| `css/layout/galeria.css` (mosaico) | Reemplazar el media query del mosaico (línea ~563) por el carrusel horizontal: `display:flex`, `overflow-x:auto`, `scroll-snap-type`, celdas `min(78vw, 22rem)` con `aspect-ratio` alternado, `gap: var(--sp-3)`, sin `grid-column/grid-row` en móvil. |
| `css/layout/carta.css` | Reescribir el media query (línea ~131) para el esquema híbrido: `.carta__grid` a una columna; `.carta__grupo` apilados con `margin-block: var(--sp-7)`; `.carta__grupo-head` con la foto `16 / 9`, `object-fit: cover`, velo oscuro y `<h2>` encima; `.dish-card` sin fondo/borde/radio, fila nombre+puntitos+precio, descripción debajo, separadores entre platos; `.dish-card__media` reducida a 3.25rem cuadrada **solo en destacados** (o `display:none` si se elige la variante sin miniatura). `.carta__toolbar` sticky; `.filter-btn` chip con tracking reducido; `.carta-head .lead` a 2 líneas y `flame-icon` oculto bajo 30rem; `.carta-aviso` y `.carta__note` al final. |
| `css/base/tokens.css` | Agregar `--nav-h: 4.625rem` (42 px logo + 2 × 16 px padding) para el `sticky top` y el `scroll-margin-top`. No tocar paleta ni escalas. |
| `js/data/menu.js` | Agregar campo opcional `fotoGrupo` a los cuatro grupos con los archivos de la tabla §4.3. Si falta, `carta.js` usa `items[0].imagen`. No tocar nombres, precios ni descripciones. |
| `js/modules/carta.js` | Render por grupos en vez de plano: por cada entrada de `window.MENU`, emitir `<section class="carta__grupo" data-categoria-grupo>` con su `.carta__grupo-head` (foto de `fotoGrupo` o fallback + `<h2>` con `group.label`) y las `.dish-card` de ese grupo. El filtrado pasa a ocultar `.carta__grupo` completos; el `aria-pressed` y `observeReveal(grid)` quedan igual. Agregar `scrollIntoView` del chip activo. |
| `index.html` | Solo si se decide reordenar la foto de `about__figure` antes del texto (ver §6). Quitar el `order: -1` del CSS va aparejado. |
| `carta.html` | Mover `<p class="carta-aviso">` al final de la sección `#carta` (opcional, ver §4.6). |

**Orden sugerido de aplicación:** tokens → about → galería (bloques) → mosaico → `menu.js` (`fotoGrupo`) → `carta.js` (grupos) → carta CSS → verificación visual en 390 px, tema oscuro y claro.

---

## 6. Cambios mínimos de HTML justificados

1. **Subir `.about__figure` antes de `.about__text` dentro de `.about__layout`.** Justificación: en escritorio el grid pone texto a la izquierda y foto a la derecha sin importar el orden del DOM (se puede mantener con `grid-column` en la regla de escritorio). En móvil, tener la foto primero en el DOM permite sacar el `order` y que el lector de pantalla encuentre primero la imagen del local, que es lo que el diseño pone primero en pantalla. Si el desarrollador prefiere no tocar el HTML, la alternativa es `order: -1` en el media query, pero se acepta solo con la nota de que el orden de lectura difiere del visual.
2. **Ningún wrapper nuevo en la galería.** Las clases `.galeria-bloque`, `.galeria-lista`, `.galeria-platos` y `.mosaico` bastan. El carrusel se logra con CSS sobre `.mosaico`, sin `<div>` extra.
3. **Un wrapper nuevo por categoría en la carta, justificado.** `.carta__grupo` + `.carta__grupo-head` son necesarios porque el esquema híbrido repite una foto y un título por grupo; CSS no puede insertar contenido ni agrupar hermanos. No se agrega ningún wrapper nuevo **por plato**: `.dish-card`, `.dish-card__row`, `.dish-card__dots` y `.dish-card__price` ya existen y sirven, y la miniatura reutiliza `.dish-card__media` que ya está en el HTML generado.
4. **No cambiar `data-platos` ni `data-categoria`.** Son las claves de `window.MENU`; cambiarlas rompe el render. El nuevo `data-categoria-grupo` se agrega **además**, no en lugar de `data-categoria`.

---

## 7. Criterios de aceptación para la revisión visual

- A 390 px, en la primera pantalla de `index.html` después del hero se ve una foto antes que un párrafo.
- Ningún bloque de la galería muestra más de una foto apilada (excepto el mosaico, que es horizontal).
- El mosaico se desliza con el dedo y la última foto queda medio cortada al llegar al final.
- En los listados de platos, nombre y precio están en la misma línea y los puntitos se ven aunque el nombre ocupe dos líneas.
- En `carta.html` hay exactamente **cuatro fotos de cabecera** (una por categoría, en el orden entradas → parrilla → especiales → bebidas), cada una con su título encima, y ninguna caja por plato.
- Los platos se leen como hoja continua (nombre · puntitos · precio), con foto chica cuadrada solo en los destacados (o en ninguno, según la perilla elegida). El precio se alinea en la misma columna en todos los platos.
- Al filtrar por una categoría se oculta el grupo completo (foto + título + platos) y los otros tres no dejan huecos; el chip activo se desplaza hasta quedar visible.
- Los filtros siguen visibles al scrollear y las fotos no pasan por detrás del toolbar sin velo.
- Todo lo anterior se verifica en tema oscuro **y** claro; el precio en `--c-acento` mantiene contraste en ambos.
