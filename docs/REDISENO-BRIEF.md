# Design Brief — El Otro Portón, rediseño mobile-first (390 px)

**Branch nueva · recrear desde cero · desktop conserva la estructura actual.**
Dirección: «mucha dopamina visual pero estética y formal; transiciones suaves y modernas». Norte: **Qissa** (estructura de carta) + **Délice** (dirección de arte) + **El Fogón** (ritmo parrillero y validación local); recursos puntuales de **Tòpas** (microcopy con voz) y **Vedge** (botones outline, aire). Insume crítico: `PROPUESTA-MOVIL-REDISENO.md` + `REFERENTES-RESPONSIVE-MOVIL.md`. Todo lo que sigue es ejecutable tal cual.

## 1. Sistema visual

**Paleta** — base vino/oro actual (`css/base/tokens.css`), con **brasa ámbar como acento fuerte** (el rojo de Délice, tonado a fuego; formal, no infantil).

| Rol | Hex | Uso |
|---|---|---|
| Fondo oscuro / superficie | `#0A0A0A` / `#1C1A19` | tema por defecto |
| Fondo claro / superficie | `#F4EFE6` / `#FAF7F2` | tema claro |
| Vino (marca) | `#4A1226` → `#8C2039` | bloques, footer |
| **Brasa (acento)** | **`#D9601A`** | reglas, eyebrow, precio, foco — 1 acento, nunca 3 |
| Oro (segundo acento) | `#D9B64A` | reglas doradas y llama existente; no competir con brasa en la misma pantalla |
| Texto / texto suave oscuro | `#F4EFE6` / `#9A9086` | contraste AA |
| Texto / texto suave claro | `#2B0F18` / `#6B5F55` | el oro sobre crema oscurece a `#8A6A12` (4,7:1) |

**Tipografías** — `Playfair Display, Georgia, serif` para display (títulos, precios); `Inter, system-ui, sans-serif` para cuerpo. Cargar desde Google Fonts con `display=swap`. Display 34–40 px en 390 px, cuerpo 15–16 px / `line-height: 1.7`, eyebrow 11 px / tracking `0.18em`. `text-wrap: balance` en todos los h2.

**Espaciado** — escala actual `--sp-1..10` (8 px), `--seccion-pad-y: clamp(4rem,8vw,9rem)`, contenedor `pad: clamp(1.25rem,5vw,4rem)`. Ritmo de sección: foto → 24 px → título → 16 px → texto → 56 px → pausa.

**Radios / sombras** — `4 / 10 / 20px`, círculo `999px`. Sombras suaves `0 12px 40px rgb(0 0 0 / 45%)`; **sin sombras en la hoja de platos** (Vedge). Bordes `1px` translúcidos.

**Jerarquía (una decisión por pantalla)** — ① foto protagonista ② título display ③ precio tabular al final. Nunca dos acentos del mismo tamaño compitiendo. Nunca tarjetas de e-commerce en la carta; nunca `--fs-xs` en cuerpo de plato.

## 2. Estructura móvil sección por sección

| Sección | Conservar | Descartar / corregir |
|---|---|---|
| **Hero** | Eslogan «Somos fuego desde 1984», llama SVG, animaciones/efectos (a Nico le encantan), microcopy de voz. | Nada. Intacto. |
| **Sobre nosotros / historia** | Eyebrow «Nuestra historia», h2, foto del local **antes** de los párrafos, capitular reducida (2,4em), regla corta flanqueando el título (El Fogón/Délice). Textos del corpus: «Mantenemos la llama de la historia y la familia, pero con una mirada innovadora»; «Somos tradicionales con un toque de innovación». | Muro de texto con foto coronada; stats «1984 / Live Art / Infiernillo» como 3 cifras sueltas (dejar solo `1984` en display + etiqueta «Fuego desde entonces», los otros dos como texto). |
| **Galería** | Ritmo alternado foto→lista→pausa; **una sola foto por bloque**; recortes circulares/orgánicos en 2–3 fotos clave (Délice); mosaico horizontal deslizable con la última foto medio cortada; carrusel circular con ✦ (Qissa). Voz: «Donde el ambiente también se disfruta». | Tira de tarjetas idénticas, panel de vidrio sin foto debajo, doble foto por bloque, outline del círculo, puntitos que colapsan en nombres largos. |
| **Carta / resumen** | 4 fotos de cabecera (entradas→parrilla→especiales→bebidas), chips deslizables, **hoja continua nombre · puntitos · precio tabular**, precios 2025 y datos reales de `menu.js`, microcopy («del fuego, directo al plato», «El ritual empieza antes del primer brindis»). | Miniaturas por plato + tag «DEL CHEF» duplicado; precio desalineado; dos avisos de precios apilados; cabeceras de 191 px (bajar a ~150 px); **filtros que desaparecen al scrollear** — arreglar `body { overflow-x: hidden }` → `clip` (`reset.css:38`, rompe el sticky). |
| **Reservas / contacto** | Datos reales de `restaurante.js` (WhatsApp `+598 99 514 133`, dirección «Intendente Suárez esquina 18 de Julio», horario Jue–Lun 12–15:30 y 20–23:30), botón **outline** estilo Vedge, CTA «Vení a cenar con nosotros. Siempre tenemos algo para sorprenderte». | Múltiples CTAs rellenos compitiendo; teléfono repetido en tres lugares del HTML. |
| **Footer** | Intacto: logo, navegación, horarios, créditos de fotos, `#somosfuego · #elotroporton`. | Nada. |

Temas claro y oscuro se mantienen con la misma paleta semántica; el precio en acento conserva AA en ambos.

## 3. Patrones visuales y animación

**Copiar:** regla corta a cada lado de los títulos de sección (El Fogón/Délice); foto de cabecera por grupo con el nombre en display sobre velo (Qissa); hoja continua de platos con precio alineado en columna y `font-variant-numeric: tabular-nums` (Qissa/Black Swan); carrusel circular con ✦ y recortes circulares en 2–3 fotos (Qissa/Délice); microcopy con voz en los respiros (Tòpas); botones outline y separadores de 1 px (Vedge). Carta en la página, nunca PDF.

**Movimiento (suave, nunca frenético):** entrada `fade + translateY(12px)` de 600 ms con `cubic-bezier(0.16,1,0.3,1)`; reglas que se expanden desde el centro 500 ms; reveal de fotos con `clip-path` 700 ms; parallax **solo** ≥1025 px. Chips con `scroll-snap-type: x proximity`. stagger máx. 80 ms entre platos (13 platos = <1 s total). Transición de tema 250 ms. Todo bajo `@media (prefers-reduced-motion: reduce)` → sin transform, sin stagger, opacidad instantánea.

## 4. Inventario de imágenes y sourcing

**Sirven (reutilizables, en `assets/img/`):** `cabecera.jpg` (900×506, hero), `chorizo-morcilla-queso.jpg` (1000×563) y `empanada-de-carne-a-cuchillo.jpg` (900×506) como cabeceras de grupo, `caption_11.jpg` (1000×1333, vertical — ideal recorte circular), `mollejas-con-cremoso.jpg`, `tortilla-con-alioli.jpg`, `ensalada-de-estacion.jpg`, `calabaza-asada-con-queso.jpg`, `el-negro-inspirado-en.jpg`, `ensalada-de-estacion.jpg` (historia), `log.svg` / `PORTON_logo.png` (marca). Las 5 stock acreditadas (`faina.jpg`, `lengua-vinagreta.jpg`, `cheese-burger.jpg`, `limonada-casa.jpg`, `gin-tonic.jpg`) se conservan **solo con su crédito actual** en el footer.

**No sirven / duplicados:** `images/` es copia de `assets/img/` con nombres con paréntesis — **no usar**; `2/6/7/8.jpg`, `asad.jpg`, `caption*.jpg` son genéricos y se usan hoy como miniaturas que se descartan; `images.jpg` (225×225), `images_1.jpg` (201×251), `log.jpg` y `el_otro_porton_sin_fondo.png` son de baja resolución / logos alternativos.

**Faltan (otro agente hará el sourcing; no descargar acá):** 6–8 fotos **reales del local** en horizontal 3:2 y una vertical 4:5: sala/ambiente con gente, parrilla con fuego visible (infiernillo), corte de carne en acción, copas en barra, postre «El Negro». Estilo cinematográfico, luz cálida de brasa, grano fino, **sin stock brillante ni saturación alta**; encuadres que dejen margen para título sobre velo; mismos 5 platos que la carta para que foto y precio concuerden. Créditos de autoría para el footer.

## 5. Criterios de aceptación (390×844)

1. `window.innerWidth === 390`; cero scroll horizontal (`documentElement.scrollWidth === clientWidth`).
2. El hero conserva eslogan + llama + animaciones; el footer y los precios 2025 están idénticos.
3. Sobre nosotros: la foto aparece antes que el primer párrafo; el título lleva regla corta; como máximo una cifra en display.
4. Galería: ningún bloque con más de una foto apilada; 2–3 recortes circulares; mosaico deslizable con la última foto cortada.
5. Carta: exactamente 4 cabeceras de grupo; **13 platos en hoja continua, sin miniaturas ni tags repetidos**; precio en la misma columna en los 13; filtros visibles al scrollear (`top: 74px` medido).
6. Contraste AA del acento sobre ambos fondos; `prefers-reduced-motion` desactiva todo movimiento.
7. Sin consola con errores; build de la branch nueva sirve en GitHub Pages; desktop mantiene la estructura actual.
