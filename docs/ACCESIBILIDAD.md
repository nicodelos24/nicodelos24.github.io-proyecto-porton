# Auditoría de accesibilidad — El Otro Portón

Revisión de `index.html` y `carta.html`, servidos en `http://localhost:8000`.
Fecha: 2026-11-19. Revisada con Chrome real (contexto aislado `wren-a11y`), capturas en temas claro y oscuro, accessibility snapshot, cálculo de ratios WCAG 2.1 y navegación por teclado.

## Cómo se midió

- Ratios calculados con la fórmula WCAG 2.1 sobre los colores **computados** por el navegador (`getComputedStyle`), no sobre los valores teóricos del CSS.
- Umbrales: **4.5:1** texto normal, **3:1** texto grande (≥24 px o ≥18.66 px en negrita) y componentes de interfaz.
- Foco y orden de tabulación probados con `Tab`, `Escape` y `page.keyboard` reales.
- Se revisaron ambos temas: oscuro (`:root`, por defecto) y claro (`[data-tema="claro"]`).

---

## Resumen ejecutivo

El sitio tiene una base de accesibilidad **sólida**: `lang="es"`, títulos y viewport correctos, landmarks completos, skip-link, foco visible con `:focus-visible`, alt en todas las imágenes, `aria-expanded`/`aria-current`, labels en todos los campos y preferencia `prefers-reduced-motion`. El contraste es bueno en general (la mayoría de los pares supera 7:1).

**Los 3 problemas más graves:**

1. **Foco invisible en el formulario** (MEDIA-ALTA). `.field__input:focus` aplica `outline: none` y deja solo un borde al ~43% de opacidad como único indicador. Quien navega con teclado pierde la referencia de dónde está al completar la reserva. `css/layout/contacto.css:140-143`.
2. **Foco del teclado entra a enlaces invisibles en el menú móvil** (MEDIA). Con el menú cerrado (`.nav__links` con `clip-path: circle(0%)` y `z-index:-1`), sus 6 enlaces siguen con `visibility: visible` y son enfocables. En un celular, tabular salta a enlaces que no se ven. `css/components/nav.css:168-179` + `js/modules/nav.js`.
3. **Filtros de la carta sin estado para lector de pantalla** (MEDIA). Los 5 botones de filtro solo cambian de clase (`is-active`); no exponen `aria-pressed`. Un lector no puede saber qué categoría está seleccionada. `js/modules/carta.js:70-77`.

Acompañan (menores): salto de jerarquía `h1 → h3` en carta.html, `aria-label` del hamburguesa que no cambia a "Cerrar menú", `aria-current="page"` sin resalte visual en carta, y un par de contrastes justos en el tema claro.

---

## Tabla de hallazgos

Leyenda: **OK** = cumple. **PROBLEMA (severidad)** = falla; la severidad indica prioridad.

| # | Ítem | Resultado | Sugerencia concreta |
|---|------|-----------|---------------------|
| 1 | `lang`, charset, viewport, título de página | **OK** | — `index.html:2-6`, `carta.html:2-6`: `lang="es"`, `UTF-8`, `width=device-width, initial-scale=1.0`, títulos descriptivos y únicos. |
| 2 | `meta theme-color` sigue al tema | **OK** | Lo actualiza `js/modules/tema.js:118-126`. |
| 3 | Input `type="date"` | **OK** | `index.html:570`: `type="date"` con `lang` heredado `es`, así que el formato de fecha se anuncia en español. Sin `placeholder` (correcto en date). |
| 4 | Contraste — texto base (ambos temas) | **OK** | Oscuro `#f4efe6` sobre `#0a0a0a` = **17.3:1**. Claro `#1f1a17` sobre `#faf7f2` = **16.1:1**. Muy por encima de 4.5:1. |
| 5 | Contraste — eyebrow dorado | **OK** / **atención** | Oscuro `#d9b64a` sobre `#0a0a0a` = **10.1:1**. Claro `#8a6a12` sobre `#faf7f2` = **4.73:1** (pasa por poco). Sobre el fondo alterno `#f2ede4` baja a **4.34:1** → por debajo de 4.5 en texto pequeño. `css/base/tokens.css`: oscurecer `--c-acento` del tema claro a ~`#82610f` o subir el tamaño del `.eyebrow` por encima de 18.66 px en negrita. Aplica a `.section--alt` y a `carta.html` (#carta). |
| 6 | Contraste — texto suave / lead | **OK** | Oscuro `#b3a89c` sobre `#0a0a0a` = **8.5:1**; token `#9a9086` = **6.3:1**. Claro `#6b6058` sobre marfil = **5.7:1**. Todos pasan. |
| 7 | Contraste — botón primario | **OK** | Texto hueso sobre vino `#8c2039` (oscuro) = **7.7:1**; sobre `#6b1830` (claro) = **10.2:1**. Ambos pasan, incluso en hover. |
| 8 | Contraste — hero sobre foto | **OK** | Velo `rgb(10 10 10 / 78-92%)` bajo el texto. Eyebrow `#d9b64a` = 6.4–10:1 sobre cualquier zona clara de la foto. Título y subtítulo >13:1. Verificado con capturas en ambos temas. |
| 9 | Contraste — paneles de vidrio de la galería | **OK** | Panel oscuro `rgb(26 24 22 / 92%)` + texto hueso/dorado, y panel claro `rgb(255 255 255 / 92%)` + texto `#1f1a17`/`#8a6a12`. Con el velo de la franja el texto se lee en ambos temas (capturas revisadas). |
| 10 | Contraste — nav de carta | **OK** | Fondo `rgba(250,247,242,0.82)`, enlaces `#1f1a17` = 16:1, tagline `#6b6058` = 5.7:1, eyebrow `#8a6a12` = 4.7:1. En oscuro, enlaces claros sobre fondo nav translúcido >10:1. |
| 11 | Foco visible global (`:focus-visible`) | **OK** | `css/utils/helpers.css:109-113`: `outline: 2px solid var(--c-acento)` + `outline-offset: 3px`. Confirmado en navegador: enlaces muestran outline dorado 2 px / offset 3 px. Contraste del outline: 10:1 (oscuro), 4.7:1 (claro). |
| 12 | **Foco visible en campos de formulario** | **PROBLEMA (MEDIA-ALTA)** | `css/layout/contacto.css:140-143` pone `outline: none` en `.field__input:focus` y solo cambia el borde a `var(--c-marca)`, que se computa como `rgba(97,28,47,0.435)` (~43% de opacidad). Medido en navegador: `outlineStyle: none` aunque `:focus-visible` coincide. El indicador es débil. Sugerencia: no anular el outline global; si se quiere borde propio, usar `outline: 2px solid var(--c-acento); outline-offset: 2px` en `:focus-visible` y dejar `:focus` solo para el borde. |
| 13 | Estructura de headings — index.html | **OK** | `h1` (hero) → `h2` (Nosotros, La carta, Galería, cocina, Reservá) → `h3` (bloques de platos de la galería). Sin saltos. Verificado en accessibility tree. |
| 14 | **Estructura de headings — carta.html** | **PROBLEMA (BAJA-MEDIA)** | Salto `h1 → h3`: las 11 tarjetas de platos son `h3` sin ningún `h2` intermedio (`js/modules/carta.js:44`). Sugerencia: cambiar `.dish-card__name` a `h2`, o agregar un `h2` "Nuestros platos" antes de `.carta__grid` en `carta.html:112`. |
| 15 | Landmarks | **OK** | Ambas: 1 `header`, 1 `nav`, 1 `main#main`, 1 `footer`, `section`s. Orden correcto, `nav` con `aria-label="Navegación principal"`. |
| 16 | Skip-link | **OK** | `href="#main"` en ambas; es el primer elemento enfocable y aparece al enfocarse (`.skip-link:focus-visible`). Verificado con Tab. |
| 17 | Imágenes y textos alternativos | **OK** | 14 imágenes en index y 13 en carta, **ninguna sin `alt`**. Decorativas con `alt=""` + `aria-hidden` (hero, fondo contacto). Las 6 fotos de fondo de galería usan `figure role="img"` + `aria-label` descriptivo, correcto. |
| 18 | `figure role="img"` con `figcaption` | **OK / detalle menor** | En 3 figuras, el árbol de accesibilidad anuncia el `aria-label` y luego el texto del `figcaption` por separado (`img "Empanadas…"` → `generic "Empanadas"`). Duplicación leve; se puede eliminar el `figcaption` visual y dejar solo el `aria-label`, o viceversa. `index.html:290-320` aprox. |
| 19 | Labels de campos | **OK** | Los 7 campos del formulario tienen `<label for>` correspondiente. El accessibility tree los anuncia por nombre (Nombre, Personas, Fecha, Hora, Teléfono, Motivo, Notas). `index.html:550-600`. |
| 20 | `aria-expanded` del menú hamburguesa | **OK (parcial)** | Pasa `false→true→false` correctamente (`js/modules/nav.js:44-52`); Escape cierra y devuelve el foco al botón. Pero el `aria-label` queda "Abrir menú" incluso abierto. Sugerencia: en el toggle, actualizar `aria-label` a `Cerrar menú` cuando `isOpen` es true. `js/modules/nav.js:48`. |
| 21 | **Foco en menú móvil cerrado** | **PROBLEMA (MEDIA)** | El panel `.nav__links` cerrado tiene `clip-path: circle(0%)`, `z-index:-1` pero `visibility: visible`; sus 6 enlaces siguen enfocables. Medido: `Tab` en 390 px llega a Inicio/Nosotros/Carta/Galería/Contacto/Reservar aunque no se vean. Sugerencia: cuando esté cerrado, `visibility: hidden` (y `visible` en `.nav--open`), o `inert`/`display:none`, para sacarlos del orden de tabulación. `css/components/nav.css:168-179`. |
| 22 | Focus trap en menú móvil | **OK / detalle menor** | Al abrir, el foco se queda en el toggle y el siguiente Tab va al primer enlace del panel (están justo después en el DOM). No hay trampa de foco, pero el panel no oculta el fondo: con `clip-path` un lector puede seguir recorriendo el contenido detrás. Sugerencia: `inert` en el resto de la página mientras el menú esté abierto. |
| 23 | **`aria-pressed` de filtros de carta** | **PROBLEMA (MEDIA)** | Los 5 `.filter-btn` no exponen estado (`ariaPressed: null`), solo clase `is-active`. El `role="group"` contenedor está bien (`carta.html:107`). Sugerencia: en `carta.js`, setear `aria-pressed="true/false"` en cada botón al renderizar y al hacer clic (`js/modules/carta.js:70-77`). |
| 24 | Tarjetas filtradas | **OK** | `.is-hidden` aplica `display:none`: las tarjetas ocultas salen del árbol de accesibilidad. Verificado: 7 ocultas / 4 visibles al filtrar "Entradas". |
| 25 | `aria-current` del enlace activo | **OK / detalle menor** | `carta.html:55` tiene `aria-current="page"` en "Carta" y se conserva tras la inicialización. Pero `nav.js` le quita la clase `is-active` al recalcular por scroll (el enlace tiene `hash=""`), así que **no hay resalte visual** aunque ARIA diga "página actual". Sugerencia: excluir el enlace con `aria-current="page"` del bucle `updateActiveLink`, o no quitarle `is-active`. `js/modules/nav.js:74-85`. |
| 26 | Botón de cambio de tema | **OK** | `aria-label` dinámico ("Cambiar a modo claro/oscuro"), `aria-pressed` y `title`. Confirmado en el accessibility tree (`[pressed]`). |
| 27 | `role=status` / `aria-live` | **OK** | Preloader y mensaje del formulario usan `role="status" aria-live="polite"`. El formulario tiene `novalidate` y el status se anuncia al enviar. |
| 28 | Navegación por teclado — orden general | **OK** | Secuencia medida en desktop: skip-link → marca → 5 enlaces del nav → Reservar → tema → Ver la carta → Reservar mesa → Ver los platos → … → campos del formulario → Enviar → Volver arriba. Sin pérdidas de foco. |
| 29 | Navegación por teclado — formulario | **OK (con salvedad #12)** | Se llega a los 7 campos y al botón Enviar. El foco no se pierde; el problema es solo la debilidad del indicador visual. |
| 30 | `prefers-reduced-motion` | **OK** | `css/base/reset.css:100-111` desactiva animaciones/transiciones y scroll suave. También cubierto vía `emulate_media`. |

---

## Qué anuncia un lector de pantalla (accessibility tree real)

- **Hero**: "Parrillada · Desde el corazón de la ciudad", encabezado nivel 1 "El Otro Portón" (con "Otro" como énfasis), el párrafo de presentación, enlaces "Ver la carta" y "Reservar mesa", y las tres parejas Ubicación/Cocina/Reservas con sus valores. Las flechas `→` están marcadas `aria-hidden`, así que no se leen.
- **Stats**: "+15 / Años asando", "4 / Tipos de corte", "300+ / Mesas por semana" como párrafos sueltos, correctos pero sin agrupación semántica (podrían ser una `dl` para mayor claridad; detalle menor).
- **Galería**: cada foto con `role="img"` anuncia su descripción ("Costillar de carnes asándose sobre la parrilla"), seguida de los títulos `h2/h3` y las listas de platos con nombre y precio. El precio usa el acento dorado pero se lee como texto normal.
- **Carta**: encabezado "Todo lo que sale de la parrilla", grupo "Filtrar por categoría" con 5 botones (sin estado, ver #23), y cada plato como `h3` + descripción + precio. Aunque las fotos de platos tienen `alt` con el nombre, el mismo nombre ya está en el `h3`, por lo que se anuncia dos veces por tarjeta (detalle menor).
- **Reservas**: encabezado "Reservá tu mesa", datos de contacto (dirección, teléfono enlazable con `tel:`, horarios) y el formulario con sus 7 campos etiquetados y el botón "Enviar reserva".

---

## Notas de alcance

- Los colores de los paneles de vidrio se verificaron con capturas y con los tokens computados; el resultado depende en parte de la foto de fondo, así que el veredicto es "legible en el estado actual", no una garantía matemática para cualquier imagen futura.
- No se evaluó lector de pantalla real (NVDA/VoiceOver), solo el accessibility tree de Chrome, que es la base que esos lectores consumen.
- No se modificó ningún archivo del sitio: este documento es el único entregable.
