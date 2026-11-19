# Referentes reales de diseño responsive móvil (390 px) — El Otro Portón

**Fecha de consulta:** 19/11/2026.
**Objetivo:** contrastar y validar el rediseño móvil de `docs/PROPUESTA-MOVIL-REDISENO.md` contra sitios reales de restaurantes profesionales vistos en un Chrome a **390 × 844 px** (viewport verificado con `window.innerWidth = 390`), con foco en (1) contenido principal —historia, platos y fotos— y (2) carta/menú —agrupación por categoría, nombre · puntitos · precio, y fotos de cabecera por grupo—. El hero y el footer quedan fuera de foco, igual que en la propuesta.

**Método:** los sitios se eligieron con `web_search`/`web_read` y se recorrieron en el navegador Chrome del proyecto (`kaia_chrome_web`) en pestaña aislada, de a una página por vez. Las capturas se guardaron en `~/.cache/kaia-mcp-work-Pagina-Web/` y se copiaron a `docs/capturas-referentes-movil/`; se enumeran al final. **15 referentes en total**: 6 modernos (pasada adicional) + El Fogón (referente principal del dueño) + 8 del listado base.

> Nota de proceso: el Chrome del proyecto resultó compartido en la práctica (otro agente navegó la misma pestaña y cerró pestañas durante la sesión). Se aisló cada visita en un contexto propio y se re-navegó donde hizo falta. Las observaciones de abajo se basan en las capturas y el DOM efectivamente leídos; el apartado de El Fogón se verificó además a 768 y 1440 px.

---

## ✨ Referentes modernos y de alto potencial visual (prioridad para Nico)

Pasada adicional pedida por Nico: subir el listón visual más allá de los sitios «profesionales» del listado base. Se buscaron restaurantes con **dirección de arte contemporánea, tipografía editorial, fotografía cinematográfica y paletas sobrias con un acento fuerte**, y se verificaron en Chrome a **390 × 844 px**. Los seis sitios de abajo son nuevos: no se repiten con los 9 del documento base. Fuentes: Awwwards (categoría Restaurant, 2026), UpMenu «Best Restaurant Websites 2025» y búsqueda directa.

| Sitio / URL | Por qué es moderno y estético | Paleta / tipografía | Técnica para copiar al móvil |
|---|---|---|---|
| **Qissa — A Tale of Food** — https://www.qissa.co.uk/ (y `/menu/`) | **Site of the Day de Awwwards (sep 2026)**. Narra la carta como «un relato»: secciones *Origin · Spice · Aroma · Texture · Taste · Craft · Gathering · Celebration* en un **carrusel circular de platos con ✦ entre palabras**. Fotografía de especias a sangre con velo; en carta, **foto de cabecera por grupo + hoja continua con nombre, descripción y £ alineado**. | Navy profundo `rgb(≈14,22,45)` + marfil `rgb(246,241,231)` + oro; **Cormorant Garamond** serif para todos los titulares. | El carrusel circular con íconos ✦ para la galería; y sobre todo la **estructura de carta**: cabecera fotográfica por categoría + platos sin caja, precio al final. Es la copia textual de nuestra propuesta. |
| **Délice** — https://delice.ca/ (Awwwards HM, sep 2026) | El más *expresivo*: **recortes orgánicos de fotografía** (formas amoebadas) sobre rojo intenso, fotos circulares flotantes, titulares con **reglas cortas a cada lado** y espacio expansivo entre bloques. Micro-interacción de scroll con forma que se recorta. | Rojo `≈#E4262C` + crema; serif **Ivy Mode** (titulares 32–40 px) + **Filson Soft** (cuerpo). | Recortes orgánicos/círculos para las fotos de la galería (sin cajas rectas); reglas cortas flanqueando los títulos de sección — el mismo recurso de El Fogón pero con más personalidad. |
| **Tòpas by Topaze** — https://bar-topas.ch/ (Awwwards, 2026) | Identidad **tipográfica brutalista**: frases sueltas en español/francés («On allume la plancha…», «Paciencia, amigo»), letras gigantes `Archivo/Arial Black` a 54 px en 390 px, bandas verticales de color, **loader con barra de progreso**, menú como lista numerada 01–05. | Franjas saturadas (magenta, naranja, amarillo, turquesa) + Negro; **Archivo** para impacto, **Source Sans 3** para cuerpo. | Usar **microcopy con voz** en los espacios de pausa («El fuego está listo…»); lista numerada 01/02/03 para el paso a paso de la historia; tipografía display grande sin miedo en 390 px. |
| **Vedge** — https://www.vedgerestaurant.com/ | Minimalismo editorial: crema cálido, **Aktiv Grotesk Condensed** en mayúsculas, botones-outline cuadrados, separadores de 1 px, mucho espacio en blanco. Cero ruido visual. | Crema `≈#F7F3EA` + texto gris + negro; **aktiv-grotesk-condensed** (60 px el wordmark, 28 px secciones). | Botones-outline en vez de rellenos, separadores finos entre secciones y **interlineado holgado**: plantilla limpia para la hoja continua de platos si se quiere un registro más sobrio. |
| **Gramercy Tavern** — https://www.gramercytavern.com/ | Minimalismo refinado enfocado en dos experiencias (bar / dining) con navegación toggled y fotografía oscura de autor; es相对稳定 y atemporal. | Tonos tierra/crema + serif clásico + sans discreta. | Separar claramente «carta» de «experiencia» con dos tarjetas grandes en móvil; menos útil para nuestra carta por grupo. |
| **The Dead Rabbit** — https://thedeadrabbit.com/ | Colores contrastados pero tonados e identidad de pub irlandés contemporáneo; layout liviano con navegación innovadora y contenido editorial de cultura/historia. | Tonos apagados con acento contrastante; tipografía display con personalidad. | Integrar historia + cultura como **bloques editoriales cortos** alternados con foto, en vez de un párrafo largo. *Verificado en carga a 390 px; sin captura propia (ver nota de proceso).* |

### Análisis a 390 px de los tres mejores

**1) Qissa — el que más copiaríamos (Awwwards SOTD).** A 390 px el menú muestra: `MENU · HOME / THE MENU`, un **hero fotográfico de especias a todo ancho con el título «The Menu» en Cormorant Garamond sobre velo**, y debajo una **píldora deslizable de categorías** (`APPETISERS | VEG STARTERS | GRILL ›`) con scroll horizontal. Cada grupo sigue con una **foto de cabecera** («Appetisers — to begin the tale») y luego la hoja continua: `Chicken Tikka Medley £6.00` / descripción en gris; las variantes llevan badges `V` / `VG`. Es, literalmente, la propuesta de El Otro Portón ya resuelta en un sitio premiado: chips deslizables + foto por grupo + nombre · precio · descripción sin tarjetas. *«Qué copiarías textual»* para nuestra carta: **«Parrilla — del fuego, directo al plato»** como subtítulo de cabecera, con el nombre del grupo en display sobre la foto y los platos en hoja continua con `·` y precio tabular, badges «V» cuando aplique.

Capturas: [`mod-qissa-2.png`](docs/capturas-referentes-movil/mod-qissa-2.png) (carrusel circular «Origin ✦ Spice ✦ Aroma…») · [`mod-qissa-menu-0.png`](docs/capturas-referentes-movil/mod-qissa-menu-0.png) (cabecera + chips) · [`mod-qissa-menu-1.png`](docs/capturas-referentes-movil/mod-qissa-menu-1.png) (platos con precio y badges).

**2) Délice — el que más eleva el listón visual.** A 390 px: wordmark «Délice» centrado sobre una **foto recortada en forma orgánica**, banda roja extendiéndose por el ancho, **dos fotos circulares de distinto tamaño flotando** en el vacío, y el título «Un choix pour tous les goûts» con **reglas cortas simétricas** arriba («LES MENUS»). Es prueba de que en 390 px se puede ser expresivo sin perder jerarquía: el acento rojo hace de hilo conductor y las fotos circulares rompen la monotonía del rectángulo. *«Qué copiarías textual»* para galería/about: **recortes circulares u orgánicos en 2-3 fotos clave** (no en todas) y la **regla corta a cada lado** de «Sobre nosotros» / «Galería» — el adorno de El Fogón, pero con identidad propia.

Captura: [`mod-delice-390.png`](docs/capturas-referentes-movil/mod-delice-390.png).

**3) Vedge — el registro sobrio.** A 390 px: `ABOUT VEDGE` en Aktiv Grotesk Condensed 28 px, párrafo con `line-height` amplio, **botón outline** «MORE ABOUT VEDGE», separador de 1 px, `OUR MENUS`, otro botón outline, separador, `HOURS`. Ninguna tarjeta, ninguna sombra: solo tipografía y aire. *«Qué copiarías textual»* para la hoja de platos: **botones outline (borde 1 px, sin fondo) y separadores finos** en lugar de píldoras rellenas, si queremos bajar un cambio de intensidad respecto de Qissa.

Captura: [`mod-vedge-390.png`](docs/capturas-referentes-movil/mod-vedge-390.png).

**Descartados de esta pasada:** Noma (403 «Checking your browser»), Casa Momo (es apartamentos, no restaurante), Tòpas (carga, pero el loader/las animaciones bloquearon la captura de contenido a 390 px; se conserva su análisis tipográfico del DOM), The Dead Rabbit y Gramercy (cargaron bien a 390 px pero el servidor Chrome se desconectó antes de capturarlos). Ninguno se cuenta como verificado con captura.

### Recomendación final: tres norte para el rediseño

1. **Qissa** — el norte principal. Es moderno, premiado y **resuelve exactamente nuestra estructura de carta** (chips + foto de cabecera por grupo + hoja continua con precio). Nos da permiso para ser editoriales con paleta navy/oro, muy compatible con nuestro vino/oro actual.
2. **Délice** — el norte *visual*. Aporta el salto estético que pide Nico: recortes orgánicos, fotos circulares, acento rojo/ámbar fuerte y reglas sobre títulos. Es la fuente para que la galería y el about dejen de verse «correctos» y empiecen a verse memorables.
3. **El Fogón** — el norte *de categoría y de Nico*. Aporta el ritmo foto→banda→foto y la validación local (mismo rubro, mismo mercado). Mantenerlo como tercero, no como primero: es más clásico y su carta en PDF es peor que la nuestra.

**Cómo se combinan:** estructura y carta de Qissa; dramatismo visual y adornos de Délice; ritmo y validación parrillera de El Fogón. Vedge y Tòpas quedan como recursos puntuales (botones outline/microcopy con voz), no como norte. Esto **inclina la balanza hacia lo moderno sin descartar lo que ya sirve de El Fogón**, y confirma que el trabajo ya implementado por Zeno no necesita rehacerse: necesita **una capa de dirección de arte** (reglas, recorte de fotos, acento más decidido y microcopy), no cambios de estructura.

---

## ⭐ Referente principal del dueño: El Fogón (Colonia/Montevideo, Uruguay)

**URL:** https://elfogon.com.uy/ · **Tipo:** parrillada uruguaya, competidor directo · **Palabras de Nico:** «un sitio bello en responsive para revisar e inspirarse».

Es el referente más aplicable a El Otro Portón: misma categoría (parrilla uruguaya), mismo mercado, y una apuesta clara por el responsive. Se analizó en profundidad.

### Cómo resuelve la jerarquía móvil (390 px)

- **Cabecera fija y mínima:** logotipo «EL FOGÓN» centrado arriba y un único ícono de hamburger a la derecha. Toda la navegación (Inicio / Nosotros / Menú / Salones / Reservas + ENG/ESP) se esconde detrás del hamburger. Es la misma economía que buscamos con nuestra nav fija de 42 px.
- **Títulos de sección editoriales:** «NOSOTROS», «MENÚ», «SALONES» van en **serif centrado**, con una **regla corta horizontal encima** y mucho aire. Es el recurso que da jerarquía sin depender de tamaños gigantes. Nuestro diseño usa `Playfair Display` con `text-wrap: balance`; El Fogón confirma que la centradora + regla funciona muy bien en 390 px.
- **Cuerpo centrado en serif, con interlineado generoso:** los párrafos de «NOSOTROS» van centrados, en serif de tamaño cómodo y con `line-height` alto. Es un tono editorial, distinto a nuestro cuerpo izquierdo en Inter. Es una diferencia de identidad, no un error: conviene **no** copiar la centradora para textos largos (dificulta el escaneo), sí copiar el interlineado holgado.
- **Ritmo foto/texto:** en «NOSOTROS» el texto va primero y la foto de local después; en «MENÚ» el ritmo se invierte y manda la foto. No es una regla fija: eligen qué protagoniza según la sección. En cambio, **nuestra propuesta explicitly pide foto antes que texto en Sobre nosotros** — ahí El Fogón es el contraejemplo, no el modelo.

### Cómo resuelve fotos y carta/menú (el hallazgo clave)

El bloque «MENÚ» de El Fogón es, en esencia, **la misma idea del esquema híbrido de nuestra propuesta**, resuelta con otro lenguaje visual:

- Cuatro categorías —**PARRILLA, PASTAS, MARISCOS, VINO**—, cada una con **una foto grande de plato a todo el ancho** y, **justo debajo, una franja/banda de color dorado-beige con el título de la categoría en serif claro**, un subtítulo en mayúsculas («LA MEJOR CARNE DEL URUGUAY CALIDAD FEEDLOT», «PASTAS ARTESANALES ELABORADAS EN NUESTRO RESTAURANTE», …) y un botón «+».
- Un **pequeño triángulo/notch** en la banda apunta hacia la foto de arriba, uniendo foto y título como una sola unidad. Es el equivalente visual de nuestros `.carta__grupo-head` con título sobre la foto.
- El patrón se repite 4 veces con el mismo ritmo: foto → banda de categoría → foto → banda. Es exactamente el **«ritmo alternado: foto de impacto → bloque de texto → pausa»** que la propuesta pide para la galería, aplicado a la carta.
- El CTA final «VER CARTA» abre un **PDF** (`wp-content/uploads/2022/11/Menu.pdf`). Ese PDF es una carta impresa en dos columnas con encabezados de categoría (ENTRADAS, POLLOS, RECOMENDADO, …) y nombres de plato con descripción debajo, sin precios en el texto extraíble. **Para móvil es un punto débil**: saca al usuario del sitio y le entrega un documento pensado para imprimir. Nuestra carta agrupada **dentro de la página** (con foto de cabecera por grupo + hoja continua de platos con precio) es una solución superior en el teléfono; es el lugar donde **no** debemos copiar a El Fogón.

### Estrategia responsive (390 → 768 → 1440 px)

| Ancho | Comportamiento observado |
|---|---|
| 390 px | Todo en una columna: hamburger, títulos centrados, foto → banda de categoría → foto → banda. El header fijo se superpone levemente al título «NOSOTROS» al scrollear (detalle a evitar). |
| 768 px | Sigue en una columna y con hamburger: no hay cambios de maquetación, solo más aire. El breakpoint real está por encima. |
| 1440 px | El MENÚ pasa a un **tablero 2 × 4 a modo de ajedrez**: foto y banda dorada se alternan como casillas (4 fotos + 4 bandas en dos filas), con el mismo notch uniéndolas. La idea (alternancia foto/categoría) se conserva al apilarse en móvil. |

**Patrones exportables:** (a) título de categoría siempre asociado a una foto, nunca una lista huérfana; (b) banda de color con el nombre del grupo como alternativa al título superpuesto con velo; (c) notch/regla que une foto y etiqueta; (d) alternancia estricta foto → texto; (e) header fijo mínimo con un solo control.

**Capturas:** `elfogon-390-nosotros.png`, `elfogon-390-nosotros-full.png`, `elfogon-390-menu-detail.png`, `elfogon-768-menu.png`, `elfogon-1440-menu.png` (ver inventario al final).

### Contraste directo con `PROPUESTA-MOVIL-REDISENO.md` y lo ya implementado

Zeno ya aplicó la propuesta en el working tree (`git diff`: `tokens.css`, `about.css`, `galeria.css`, `carta.css`, `carta.js`, `menu.js`). Estado del contraste:

| Aspecto | Propuesta / implementado | El Fogón | Veredicto |
|---|---|---|---|
| Foto antes que texto en Sobre nosotros | Sí (foto sube en el DOM + `order`), capitular 2.4em, stats con 1984 jerárquico | No: texto primero, foto después | **Mantener lo nuestro.** Es una mejora deliberada: el local se ve antes de leerse. |
| Foto de cabecera por categoría | Sí: 4 fotos 16/9, velo oscuro + título `--c-hueso` encima, abajo a la izquierda | Sí: foto + banda dorada con el título **debajo** | **Ambos válidos.** Ya cumplimos el requirement. La banda dorada de El Fogón es una alternativa a evaluar si se quiere más contraste/identidad; no hace falta cambiar. |
| Ritmo alternado foto → platos | Sí, en galería y en carta | Sí, foto → banda de categoría, 4 veces | **Alineado.** Nuestro `--sp-7` entre grupos da la pausa equivalente. |
| Carta como hoja continua (sin tarjetas) | Sí: `.dish-card` sin caja, línea 1 px, puntitos `min-width: 1.5rem`, precio tabular | No aplica: la carta es un PDF fuera de página | **Aplicar lo nuestro.** Es donde más ganamos frente al referente. |
| Filtros/sticky | Sí: chips deslizables con `scroll-snap`, toolbar sticky bajo la nav | No tiene filtros (sección única) | **Mantener.** Nuestra solución resuelve un problema que El Fogón no tiene (13 platos en 4 grupos). |
| Header fijo | Nav 42 px + toolbar sticky | Header fijo que se superpone al título de sección | **Evitar el bug de El Fogón:** ya tenemos `--nav-h` y `scroll-margin-top` en `#carta` para que nada quede tapado. |

**Ajustes que sugiero inspirados en El Fogón (no son bloqueantes):**
1. **Evaluar una variante de «banda de categoría»** para el título del grupo: hoy está superpuesto con velo oscuro; El Fogón demuestra que una franja sólida con el título en serif claro da más contraste y personalidad. Si se prueba, que sea **una de las dos** (velo o banda), nunca las dos juntas — la propuesta ya lo advierte.
2. **Regla corta sobre los títulos de sección** («Sobre nosotros», «Galería»): es el recurso de El Fogón que más barato resulta copiar y más jerarquía aporta en 390 px, y no rompe la identidad wine/oro.
3. **Cuidar el interlineado del cuerpo**: El Fogón usa un `line-height` generoso; verificar que nuestros párrafos de `--fs-sm` no bajen de ~1.6 en móvil (la propuesta ya pide «line-height holgado»).

---

## Tabla de referentes (9 sitios)

| # | Sitio / URL | Qué cargó y a qué ancho | Patrones observados (2–4 por sitio) | Aplicación a El Otro Portón |
|---|---|---|---|---|
| ⭐ | **El Fogón** — https://elfogon.com.uy/ | Home + MENÚ, PDF de carta. 390/768/1440 px | 1) Títulos serif centrados con regla corta; 2) foto de plato + banda dorada de categoría con título, subtítulo y «+»; 3) alternancia estricta foto→categoría ×4, con notch; 4) header fijo mínimo + hamburger | Ver sección destacada arriba |
| 2 | **Noma (London)** — https://www.nomarestaurant.com/ | Home, 390 px, full page | 1) «POPULAR DISHES»: carrusel horizontal de tarjetas de plato con foto y **nombre superpuesto abajo**; 2) «OUR STORY» con texto sobre foto de fondo; 3) títulos de sección centrados con adornos de puntos/raya; 4) botón flotante de llamada que tapa texto (detalle a evitar) | Copiar el carrusel horizontal de platos con nombre sobre foto para el mosaico; **no** el botón flotante |
| 3 | **Eataly** — https://www.eataly.com/ | Home, 390 px | 1) Header con hamburger + wordmark centrado + buscador tipo píldora; 2) hero a todo ancho con título blanco superpuesto; 3) grilla 2 columnas de imágenes con etiqueta encima («Restaurants», «Classes», «Events»); 4) carrusel horizontal «More to Explore» | Referencia para grilla de teselas y etiquetas sobre foto; el buscador no aplica |
| 4 | **COTE Korean Steakhouse** — https://www.cotekoreansteakhouse.com/ | Home, 390 px | 1) Tema oscuro con acento dorado, logo mínimo centrado y fijo; 2) sección de parrilla a sangre con video/foto full-bleed y CTA «BOOK A TABLE»; 3) tipografía serif fina en mayúsculas para CTAs | Valida que nuestra paleta vino/oro en Dark funciona en móvil; foto de impacto a sangre |
| 5 | **Shake Shack** — https://shakeshack.com/ | Home, 390 px | 1) Hamburger + wordmark + «Select a location» + píldora verde «Order Now»; 2) tarjeta promocional a todo ancho con texto blanco sobre foto; 3) indicadores de carrusel (rayas/puntos) | Referencia de header compacto y CTA fijo; promo-heavy, no copiar el énfasis en ofertas |
| 6 | **The Cheesecake Factory** — https://www.thecheesecakefactory.com/menu/ | Menú, 390 px | 1) Listado desplegable de categorías arriba (APPETIZERS, PASTAS, STEAKS…); 2) cada plato como **tarjeta: nombre en negrita + descripción chica gris + miniatura a la derecha**; 3) buscador de menú y píldora sticky «START AN ORDER» | **Contraejemplo útil:** es justo la pila de tarjetas que la propuesta evita; confirma que nuestra hoja continua + 4 cabeceras es más ligera |
| 7 | **Sweetgreen** — https://www.sweetgreen.com/ | Home + fichas de producto, vía `web_read` | 1) Cada plato = nombre en grande + descripción de ingredientes en párrafo corto; 2) badges de alérgenos/dieta («Contains milk, meat…», V/G) bajo la descripción; 3) CTA «Order now →» por producto | Copiar la **descripción corta de ingredientes** bajo el nombre y los badges discretos para alérgenes/dieta |
| 8 | **Friedman's NYC** — https://www.friedmansrestaurant.com/menu/ | Menú, 390 px | 1) Título del plato en mayúsculas + nota «GLUTEN-FREE OPTIONS AVAILABLE!»; 2) descripción de ingredientes en una línea; 3) **precio en su propia línea con «$» y número separados** (ADULTS $ 54.96) | Referencia de jerarquía plato→descripción→precio y de avisos dieta; **no** separar $ del número (usamos `tabular-nums`) |
| 9 | **Black Swan Oldstead** — https://blackswanoldstead.co.uk/food/ | Menús, vía `web_read` | 1) Menú degustación con **nombre/tipo a la izquierda y precio a la derecha en tabla** (Dinner £195, Lunch £135); 2) links a PDFs de menús de muestra; 3) secciones «The Menus», «In the Glass», «Our Roots» con texto editorial y CTA de reserva | Valida alinear nombre y precio en la misma línea base con el precio como remate; su Price column es equivalente a nuestro `--c-acento` |

> Sitios descartados por no cumplir (nobu.com es una consultora de salud laboral, no el restaurante; lahuella.com.uy, olivegarden.com y otros no cargaron —timeout/403/DNS—). No se cuentan entre los 9.

---

## Patrones clave transversales (lo que se repite en los 9)

1. **Una sola decisión por pantalla:** foto grande **o** texto, casi nunca compitiendo. Coincide con el principio 1 de la propuesta.
2. **Categoría siempre unida a una imagen:** El Fogón (banda dorada), Noma (foto con nombre), Cheesecake Factory (miniatura por plato), Sweetgreen (ficha). Ningún referente muestra una lista de platos totalmente sin foto; **nuestro esquema (foto de cabecera por grupo + hoja continua) es el punto medio correcto**.
3. **Carruseles horizontales para platos:** Noma y Eataly los usan para evitar la pila vertical; coincide con el mosaico deslizable de la propuesta.
4. **Precio como remate, alineado:** Black Swan (columna derecha), Friedman's (precio propio), nuestra propuesta (puntitos + `--c-acento` tabular). El Cheesecake Factory y Shake Shack lo esconden detrás de un CTA de pedido — peor para leer la carta.
5. **Header fijo mínimo + un control:** El Fogón, Noma, Eataly, Shake Shack, COTE; todos con hamburger o logo centrado. Nuestro `--nav-h` encaja.
6. **Títulos serif centrados con adorno (regla/puntos):** El Fogón, Noma, COTE. Es el lenguaje común de la categoría «restaurante con identidad» en móvil.

## Ajustes sugeridos (consolidado)

- **Copiar de El Fogón:** título de categoría ligado a foto, ritmo alternado foto→texto, regla corta sobre títulos de sección, header fijo mínimo.
- **Copiar del resto:** carrusel horizontal de platos con nombre sobre foto (Noma), descripción corta de ingredientes + badges de dieta (Sweetgreen), alineación nombre↔precio (Black Swan), grilla de teselas con etiqueta sobre foto (Eataly).
- **No copiar / mantener lo nuestro:** carta dentro de la página en vez de PDF (El Fogón), hoja continua en vez de tarjetas de producto (Cheesecake Factory), foto antes que texto en Sobre nosotros (El Fogón), `scroll-margin-top` para que el header no tape títulos (fallo de El Fogón), precio unido al nombre con puntitos ( Friedman's separa $ del número).
- **Conclusión:** la propuesta y su implementación actual (Zeno) **ya están alineadas o por encima** de los referentes en los puntos que importan. Los ajustes son de refinamiento (regla en títulos, interlineado, opcional banda de categoría), no de estructura.

---

## Inventario de capturas (en `~/.cache/kaia-mcp-work-Pagina-Web/`)

- `elfogon-390-nosotros.png` — El Fogón, texto de NOSOTROS a 390 px
- `elfogon-390-nosotros-full.png` — El Fogón, página completa a 390 px (incluye MENÚ con las 4 bandas)
- `elfogon-390-menu-detail.png` — El Fogón, detalle NOSOTROS→MENÚ a 390 px
- `elfogon-768-menu.png` — El Fogón a 768 px
- `elfogon-1440-menu.png` — El Fogón, tablero ajedrez del MENÚ a 1440 px
- `ref-02-noma-390.png` — Noma, página completa a 390 px
- `ref-03-eataly-390.png` — Eataly a 390 px
- `ref-04b-cote-390.png` — COTE a 390 px (tras aceptar cookies)
- `ref-05-shakeshack-390.png` — Shake Shack a 390 px
- `ref-06-cheesecake-390.png` — Cheesecake Factory, menú a 390 px

**Capturas de la pasada visual adicional (copiadas también a `docs/capturas-referentes-movil/`):**

- `mod-qissa-2.png` — Qissa, carrusel circular de atributos a 390 px
- `mod-qissa-menu-0.png` — Qissa, cabecera de carta + chips deslizables a 390 px
- `mod-qissa-menu-1.png` — Qissa, hoja de platos con precio y badges a 390 px
- `mod-delice-390.png` — Délice, recortes orgánicos y fotos circulares a 390 px
- `mod-vedge-390.png` — Vedge, secciones con botones outline y separadores a 390 px
- `mod-topas-390.png` — Tòpas, loader de bandas verticales a 390 px (contenido no capturado)

**Fuentes adicionales:** PDF de carta de El Fogón descargado y extraído con `pdftotext` (ENTRADAS / POLLOS / RECOMENDADO, sin precios en el texto analizable); `web_read` de Sweetgreen, Friedman's y Black Swan; Awwwards (categoría Restaurant) y UpMenu (best restaurant websites 2025) para la pasada moderna; `web_search`/`web_read` de Qissa, Délice, Tòpas, Vedge, Gramercy y The Dead Rabbit; `git diff` del working tree para el contraste con la implementación de Zeno. No se modificó código del sitio, no se hizo commit ni push.
