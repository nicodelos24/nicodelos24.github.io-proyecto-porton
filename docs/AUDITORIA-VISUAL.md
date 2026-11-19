# Auditoría visual y UX — El Otro Portón

Revisión de `index.html` y `carta.html` (escritorio 1440×900 y móvil 390×844) hecha el 19 de noviembre de 2026. Incluye recorrido completo con capturas, lectura de tokens (`css/base/tokens.css`), capas de estilos y datos (`js/data/*.js`). Las capturas quedaron en `~/.cache/kaia-mcp-work-Pagina-Web/` (`01-hero-desktop.png` … `24-carta-nav-desktop-solida.png`).

> Alcance: auditoría. **No se modificó ningún archivo del sitio.** Los números de línea son aproximados, para ubicar el arreglo.

---

## 1. Resumen ejecutivo

El sitio tiene una base visual **sólida y vendible**: paleta vino/oro bien pensada, tipografía Playfair + Inter consistente, tokens centralizados, sistema de temas claro/oscuro y una carta que se lee bien. La dirección de diseño es buena; lo que lo baja hoy son **cuatro cosas concretas**:

1. **La navegación de `carta.html` es invisible** al cargar (bug ya documentado, acá confirmado y empeorado: en modo claro es casi blanco sobre crema). Es lo primero que ve quien abre la carta. → CRÍTICO.
2. **Las cifras de "Sobre nosotros" salen rotas** (+15 → `+` gigante y `15` chico; 300+ → `3` gigante y `00+` chico). Se ve en escritorio y móvil, en ambos temas. → CRÍTICO.
3. **El "PARA EMPEZAR" se monta sobre el título en el celular** en el bloque invertido de la galería. → CRÍTICO.
4. **La identidad visual no vende parrillada**: la galería está llena de foto de alta cocina genérica (fondant, pan de oro, microgreens, platos con salsas artísticas, un costillar que parece teriyaki). Todo eso pelea contra el pitch "cocina de casa / parrillada en Colonia". Los datos (teléfono, dirección, horarios, precios, fotos de bebidas `images.jpg`/`images_1.jpg`) siguen siendo de ejemplo. → MEJORA fuerte.

Bien resuelto y a conservar: hero con buen contraste, tarjetas de la carta (fotos consistentes, jerarquía nombre/precio clara), filtros, diseño responsive de la carta como lista, menú móvil, foco visible con `focus-visible`, y el formulario de reservas por WhatsApp.

---

## 2. Diagnóstico por sección

### Portada / hero (`index.html`, `css/layout/hero.css`)
- **Funciona:** imagen de cabecera con velo oscuro, título con "Otro" en oro itálico, dos CTAs con jerarquía clara (relleno vino / contorno) y la tira de datos (ubicación, cocina, reservas). El texto es legible en los dos temas porque el hero redefine sus propios colores claros: decisión correcta.
- **Flojo:** el subtítulo y los datos usan `--c-hueso-osc` / `--c-texto-suave`, que en la foto quedan grises medios; en las capturas se leen, pero sin empuje. El indicador "Scroll" queda muy abajo y compite con los datos. Las fotos de fondo del hero son 900×506 → se ven blandas en pantallas grandes.
- **Dato que baja la confianza:** el hero dice "Parrillada & casas" (sic, `index.html:154`); parece typo de "casera".

### Marquee y "Sobre nosotros"
- **Funciona:** ritmo visual agradable, composición editorial texto/foto, marco desplazado y stats con borde superior.
- **Falla:** las cifras (`+15`, `4`, `300+`) están rotas por la letra capitular (ver CRÍTICO 2). Además los números son de ejemplo y la foto de la derecha es un interior genérico; no se ve"el local", se ve un salón cualquiera.
- **Contraste:** el texto secundario `--c-texto-suave` es `#9a9086` sobre `#0a0a0a` → ~6,5:1 (acepta AA). En claro, `#6b6058` sobre `#faf7f2` → ~6,1:1 (acepta). El `--c-acento` claro `#8a6a12` sobre crema da ~4,7:1 (justo AA para texto normal). Ojo: **el oro del hero (`#d9b64a`) sobre marfil da ~2,1:1**, pero está sobre foto oscura, ahí sí funciona. No cambiar el oro del hero.

### Galería (`css/layout/galeria.css`, bloques de `index.html`)
- **Funciona conceptualmente:** la secuencia alterna foto grande / panel de vidrio, el mosaico rompe el ritmo y los títulos ("Parrillada", "Para compartir", "Postres", "Bebidas") dan contexto. La implementación del panel con `color-mix` para la franja es elegante.
- **Falla de layout:** en móvil, el eyebrow del bloque invertido se monta sobre el título (CRÍTICO 3).
- **Falla de contenido:** la foto de "Para compartir" (`caption_14.jpg`) es un plato tipo teriyaki con sésamo, no empanadas; el mosaico muestra fondant y platos gourmet con microgreens; "El Negro" lleva pan de oro. Es **foto de banco de imágenes de restaurante fino**, no de una parrillada uruguaya. El efecto "clavado" (`background-attachment: fixed`) no funciona en iOS y carga ~700 KB de golpe (ya anotado en PENDIENTES).
- **Fallo de contraste local:** el texto de los paneles de vidrio sobre foto (`.galeria-plato__desc`, eyebrow) queda gris sobre gris en las capturas; en las zonas donde el panel se desvanece sobre la foto, la lectura se complica. Conviene dar fondo opaco al panel o subir el peso del texto.

### Contacto y reservas (`css/layout/contacto.css`, `js/modules/contacto.js`)
- **Funciona:** el formulario es claro, los campos tienen label visible, el envío arma un mensaje legible para WhatsApp y valida nombre + fecha. El status de confirmación es aconsejador, no culposo.
- **Falla de datos:** teléfono `+598 00 000 000`, dirección genérica, horarios que contradicen los reales ( acá dice jue–sá 20–00 y dom 12–17; lo real es lun–vie 12–15:30 y 20–23:30, sáb/dom cerrado). El envío va a `59800000000` → **las reservas se pierden**.
- **Detalle:** el `<input type="date">` se muestra en formato EE.UU. (mm/dd/aaaa) en el navegador de prueba; en Uruguay se espera dd/mm/aaaa. Es dependiente del locale del equipo, pero vale revisarlo.
- **Detalle:** en el celular el campo de fecha cae muy abajo; el CTA "Reservar" del nav salta al `#reservas` correcto, pero no enfoca el primer campo → el usuario debe volver a ubicarse.

### Pie de página (`css/layout/footer.css`)
- **Funciona:** tres columnas, horarios, redes (que se ocultan solas si no hay URL) y barra legal.
- **Falla:** el logo del pie se ve como un borrón rojo oscuro por `mix-blend-mode: screen` con un logo ya teñido de vino (confirmado en captura `11-footer-desktop.png`). Actualizar con `--mezcla-logo: normal` en el pie o cambiar el filtro a uno que produzca hueso.
- **Dato**: el año está hardcodeado `2025` en el HTML, lo corrige JS al cargar; sin JS queda viejo.

### Carta (`carta.html`, `css/layout/carta.css`, `js/modules/carta.js`)
- **Funciona:** grilla de tarjetas cómoda en escritorio; en móvil pasa a una lista con miniatura, nombre, precio y descripción que se lee de un tirón; filtros en una fila deslizable; la animación de entrada escalonada es sutil. Las fotos de platos (empanada, chorizo, mollejas, costillar) tienen estilo consistente.
- **Falla CRÍTICA de nav** (ver más abajo).
- **Falla de contenido:** "Limonada de la casa" usa `images.jpg` (225×225, 6 KB) y "Vino tinto" usa `images_1.jpg` (201×251) → miniaturas borrosas y sin relación. Ojo de bife y bife de chorizo usan `6.jpg` y `7.jpg` genéricos.
- **Detalle:** la nota al pie dice "Todos nuestros platos tienen gluten; consultanos por los allergy." → redacción mezcla español e inglés; mejor "Consultanos por opciones sin gluten" (y solo si es cierto).

---

## 3. Problemas priorizados

### 🔴 CRÍTICO

| # | Problema | Dónde se arregla |
|---|---|---|
| C1 | **Nav invisible en `carta.html`**. `.nav:not(.nav--solid)...` pinta texto, toggle y theme-toggle en `#f4efe6`; `nav.js` no pone `.nav--solid` hasta 80 px de scroll. En la carta no hay hero: hasta scrollear, claro sobre claro. Confirmado en escritorio y móvil; **en modo claro es casi blanco sobre crema**. | `css/components/nav.css:49-65` y/o `js/modules/nav.js:8,29-31`. |
| C2 | **Cifras de "Sobre nosotros" partidas**. `.about__text p:first-of-type::first-letter` aplica capitular a todos los `<p class="about__stat-value">` porque cada uno es el primero de su `<div>`. | `css/layout/about.css:27-35` (apuntar solo al párrafo de introducción, p. ej. `.about__text > p:first-of-type::first-letter` con una clase dedicada en el primer `<p>`, `index.html:~208`). |
| C3 | **Eyebrow "PARA EMPEZAR" montado sobre el título en móvil**. La regla `.galeria-bloque--pareja-inversa .galeria-lista > .eyebrow { float: inline-end }` (`galeria.css:371`) gana a la regla móvil `float: none` (`galeria.css:~896`) por especificidad: el selector de escritorio es más específico. | `css/layout/galeria.css:371` y `~890-900`: subir especificidad del reset móvil (ej. `.galeria-bloque--pareja .galeria-lista > .eyebrow, .galeria-bloque--pareja-inversa .galeria-lista > .eyebrow { float: none; width: auto; }`) o limitar el `float` con `@media (width >= 48rem)`. |
| C4 | **Datos de contacto de ejemplo**: reservas van a un WhatsApp que no es del local (+ formato de fecha y horarios erróneos en la web).Publicar así es peor que no publicar. | `js/data/restaurante.js:33-38`; horarios repetidos en `index.html` (contacto ~547 y pie ~636) y `carta.html` (~172); numeración real en `docs/PENDIENTES.md`. |

### 🟡 MEJORA

| # | Problema | Dónde se arregla |
|---|---|---|
| M1 | **Fotos genéricas / desalineadas con la promesa**: platos de alta cocina (fondant, pan de oro, microgreens) y un "costillar" que parece teriyaki. Reemplazar por fotos reales del local y de la parrilla. | `index.html:~350-490` (mosaico y bloques), `css/layout/galeria.css:35-70` (URLs de fondo), `js/data/menu.js` (`imagen:` de cada plato). Prioridad: la foto de "Para compartir" (`caption_14.jpg`) y las del mosaico. |
| M2 | **Fotos de bebidas rotas/borrosas** (`images.jpg` 225×225, `images_1.jpg` 201×251) en "Limonada" y "Vino tinto". | `js/data/menu.js:119,125`; bajar fotos reales y renombrar a `limonada.jpg`, `vino-tinto.jpg`. |
| M3 | **Borrón del logo en el pie** por `mix-blend-mode: screen`. | `css/layout/footer.css:20` (sobrescribir `--mezcla-logo: normal` y ajustar `--filtro-logo` a hueso `#f4efe6`) o `css/base/tokens.css:~227`. |
| M4 | **Contraste flojo en los paneles de vidrio de la galería**: descripción gris sobre fondo semitransparente, encima de foto. | `css/layout/galeria.css` (`.galeria-plato__desc` ~560-620): subir a `--c-texto` y/o aumentar `--c-franja-panel` en `css/base/tokens.css:~146`. |
| M5 | **Hero y foto de "Sobre nosotros" son 900×506**, se pixelan en pantallas grandes y no muestran el local real. | `assets/img/cabecera.jpg` y la foto del about en `index.html:~215`; pedir originales ≥1600 px. |
| M6 | **Orden de secciones**: la galería es larguísima (5 bandas + mosaico) y empuja "Contacto" a ~7000 px de scroll. Considerar un CTA flotante "Reservar" o acortar a 3 bandas. | `index.html` (galería), `js/modules/nav.js` / `css/components/buttons.css`. |
| M7 | **Datos inventados visibles** además del contacto: "+15 años", "4 tipos de corte", "300+ mesas", todos los precios y nombres de platos. | `index.html:215-226`, `js/data/menu.js`. Si no hay datos reales, bajar las cifras o reemplazarlas por una frase (ej. "Fuego, paciencia y buena carne"). |

### 🔵 DETALLE

| # | Problema | Dónde se arregla |
|---|---|---|
| D1 | Typo "Parrillada & casas" en el hero. | `index.html:154` → "Parrillada & cocina casera". |
| D2 | Nota de la carta: "consultanos por los allergy". | `carta.html:~125` → "Consultanos por opciones sin gluten". |
| D3 | Fecha en formato EE.UU. en el input. | `index.html:~530` (`<input type="date">`); fijar `lang="es-UY"` (ya es `es`) y probar en dispositivo real. |
| D4 | Botón "Reservar" del nav no enfoca el primer campo del formulario. | `js/modules/smooth-scroll.js` / `js/modules/nav.js`: tras el scroll, `document.getElementById("nombre")?.focus({preventScroll:true})`. |
| D5 | `__filtro-logo` y `__mezcla-logo` se definen en tres bloques (`:root`, claro, `@media`, pie). Centralizar. | `css/base/tokens.css` + `css/layout/footer.css`. |
| D6 | Duplicado `css/base/tokens.css` con comentario de apertura roto (`/* =============================================================` repetido arriba). | `css/base/tokens.css:1-2`. |
| D7 | La carpeta vieja `images/` (2,9 MB) y `Unsaved Image 1.jpg` siguen en el repo. | Borrar del repo (fuera de esta auditoría; ya en PENDIENTES). |

---

## 4. Propuestas concretas (qué cambiar)

### 4.1 Arreglos inmediatos (código)

**Nav de la carta — dos opciones, elegir una:**
- **Opción A (recomendada, 3 líneas):** dar fondo propio a la carta desde el inicio. En `carta.html`, cambiar `<header class="nav" id="nav">` por `<header class="nav nav--solid" id="nav">`. Así el nav arranca legible en los dos temas. `nav.js` solo quita/pone la clase en el scroll, y al superar 80 px la vuelve a poner (idempotente).
- **Opción B (más robusta):** en `nav.js`, reemplazar el umbral fijo por una detección de hero:

```js
const tieneHero = Boolean(document.querySelector(".hero"));
nav.classList.toggle("nav--solid", y > SOLID_THRESHOLD || !tieneHero);
```

  Y además, si no hay hero, no aplicar nunca la regla de texto claro: en `css/components/nav.css` agregar `.nav--sin-hero :is(.nav__link, .nav__tagline, .theme-toggle) { color: var(--c-texto); }` y setear esa clase desde JS. La opción B aguanta futuras páginas sin hero.

**Cifras roto:** en `index.html:~209` poner `class="about__intro"` al primer `<p>` de la introducción y cambiar el selector por `.about__text > p.about__intro::first-letter`. Las cifras quedan con su tamaño normal (`--fs-xl`) y sin letra capitular.

**Eyebrow móvil:** limitar el `float` a escritorio envolviendo `galeria.css:371-374` en `@media (width >= 48rem) { ... }`, y en el bloque `@media (max-width: 48rem)` agregar `float: none; width: auto;` con el mismo nivel de especificidad.

**Logo del pie:** en `.footer` sobrescribir `--mezcla-logo: normal;` y cambiar `--filtro-logo` por uno que deje el logo en hueso (`brightness(0) invert(1)` con `opacity: .85` es suficiente y más simple que la cadena actual).

**Datos reales:** completar `js/data/restaurante.js` con `whatsapp: "59899514133"`, `telefonoLegible: "+598 99 514 133"`, Instagram real; y reemplazar los horarios de `index.html` y `carta.html` por "Lunes a viernes 12:00–15:30 y 20:00–23:30 · Sábado y domingo cerrado".

### 4.2 Identidad visual para una parrillada en Colonia (propuesta)

Hoy el sitio se parece más a un **restaurante de autor** que a una **parrillada de barrio querida**. La base (vino + oro + serif elegante) está bien, pero hace falta calibrarla hacia lo local y lo casero sin perder profesionalismo:

**Paleta.** Mantener el vino `#6b1830` y el hueso `#f4efe6`. Cambiar el oro actual (`#d9b64a`, muy "premio/lujo") por un **ámbar de brasa** más cálido y terroso: `#c87a2e` en oscuro y `#92581c` en claro (contraste ~5:1 sobre crema). Reservar el dorado claro solo para detalles finos (subrayados, eyebrow). Agregar un **carbón cálido** `#231a17` como superficie en vez del negro puro `#0a0a0a`: se lee más "madera y humo", menos "tech startup".

**Tipografía.** Playfair Display funciona para títulos, pero esa itálica dorada en "la parrilla" se siente de carta de restaurante de lujo. Proponer: títulos en Playfair regular/semibold (sin itálica en el CTA principal), y un **monoespaciado o sans condensada** (p. ej. `Barlow Condensed`) para las etiquetas de sección, números y precios: evoca cartel de parrilla y pizarrón. Mantener Inter para cuerpo. Si no se quiere cargar otra fuente, usar `font-stretch`/`letter-spacing` más apretado en los números ya alcanza.

**Fotografía — el cambio que más vende.**
- **Una foto de portada real:** parrillero girando la parrilla, con humo y luz cálida, horizontal y ≥1600 px. Nada de stock de cocina elegante.
- **Una foto del local:** mesas de madera, pared con ladrillo o madera, gente comiendo. Reemplaza la foto de salón genérico del "Sobre nosotros".
- **Fotos de platos con luz cálida y fondo simple:** carne con marcas de parrilla, chorizo, morcilla, empanadas, pan casero, papas. Huir de fondos negros con salsas artísticas y microgreens. Si no hay fotos profesionales, una sesión de 2 horas con un fotógrafo local rinde más que cualquier cambio de CSS.
- **Bebidas:** vaso de vino tinto y limonada en cristalería simple, sobre mesa de madera. Nunca miniaturas de 200 px.
- **Criterio único para aceptar una foto:** "¿Esta foto podría estar en el Instagram del local?" Si no, no va.

**Microcopia.** Cambiar "Carnes asadas a la parrilla, servidas con dedicación en un ambiente cálido para disfrutar con familia y amigos" por algo con más carnadura y anclaje local: *"Fuego, carne y mesa larga. Parte de la familia desde hace 15 años en Colonia."* (solo si lo de los 15 años es cierto). El eslogan de la cinta puede ser "Corte a punto • Pan casero • Mesa compartida".

**Componentes con personalidad (sin recargar):**
- Un **sello circular** con el logo + "Colonia del Sacramento · DESDE 20XX" en el hero, en vez de la tira de tres datos.
- Los números de la carta con `font-variant-numeric: tabular-nums` ya están bien; sumar el símbolo `$` precedido de "URU $" la primera vez para el visitante extranjero.
- Un botón de WhatsApp flotante con el número real, además del formulario: en Uruguay mucha gente prefiere escribir directo.
- Un **mapa embebido o enlace a Google Maps** con la dirección exacta (18 de Julio 351 esq. Intendente Suárez) en la sección de contacto.

**Orden de ejecución recomendado:**
1. C1–C4 (nav, cifras, eyebrow, datos) — media hora, desbloquea publicación.
2. M1–M3 (fotos principales, bebidas, logo del pie) — el salto de calidad más grande.
3. M4–M7 (contraste del vidrio, fotos de about, cifras/copy, largo de la galería).
4. Detalles D1–D7.

---

## 5. Qué se verificó y qué no

**Verificado en navegador real (kaia_chrome_web, Chrome):**
- Capturas de hero, sobre-nosotros (con y sin bug de cifras), galería (4 posiciones), mosaico, postres, contacto, footer, carta (header, grilla ×2), menú móvil abierto, galería móvil, formulario móvil, modo claro y el bug del nav oscuro/claro. 24 capturas listadas arriba.
- Confirmados visualmente: C1, C2, C3, M3, M4, M1 (fotos genéricas), M2 (por dimensión de archivo), D1–D3 por inspección de HTML.
- Temas: el cambio de tema funciona y se guarda en `localStorage`; el hero y el pie se mantienen oscuros a propósito y se leen bien.

**No verificado:**
- Envío real del formulario (el número es de ejemplo; probarlo con el real).
- iOS (el `background-attachment: fixed` de la galería no funciona ahí) y lector de pantalla.
- Navegación completa por teclado en el menú móvil (Existe `focus-visible` y cierre con Escape en el código, pero no se corrió la prueba).
- Carga con JavaScript desactivado (hay fallback previsto, no probado).

---

## 6. Capturas de referencia rápida

| Captura | Muestra |
|---|---|
| `01-hero-desktop.png` | Hero en escritorio, buen contraste |
| `03-about-stats-desktop.png` | Cifras rotas (CRÍTICO C2) |
| `04-gallery-desktop.png` … `09-postres-desktop.png` | Paneles de vidrio y fotos genéricas |
| `08-mosaico-desktop.png` | Fondant / alta cocina, desconecta de la parrilla |
| `10-contacto-desktop.png` | Formulario y datos de ejemplo |
| `11-footer-desktop.png` | Logo borroso del pie (M3) |
| `12-carta-nav-bug.png` | Nav invisible, tema oscuro (C1) |
| `13-carta-grid-desktop.png` | Grilla de platos, lo mejor del sitio |
| `16-nav-mobile-open.png` | Menú móvil abierto, funciona bien |
| `18-para-empezar-mobile.png` | Eyebrow montado sobre el título (C3) |
| `20-form2-mobile.png` | Formulario móvil y fecha en formato EE.UU. |
| `21-about-light-mobile.png` | Tema claro, cifras rotas también |
| `23-carta-nav-light-mobile.png` | Nav casi invisible en claro (C1, peor caso) |
