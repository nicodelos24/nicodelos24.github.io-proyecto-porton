# QA Funcional — El Otro Portón

**Fecha:** 2026-11-19
**Alcance:** sitio estático (`index.html`, `carta.html`, CSS y JS en `js/`), sin build. Verificado por lectura de código y pruebas automatizadas headless con Node 26 + jsdom 24.
**Servidor de referencia:** `http://localhost:8000` (según el prompt; no se inició ni se usó el Chrome real — estaba ocupado por otro agente).

> **Re-verificación al cierre:** mientras se escribía este documento otros agentes modificaron `js/modules/nav.js`, `js/modules/carta.js` y varios CSS (mejoras de `aria-pressed`, `aria-label` del menú y `aria-current`). Se volvió a correr el harness sobre el código final: **35 CHECK / 0 FALLA** y ningún error de consola. Los Hallazgos 3 y 4 (smooth scroll y verificación visual) siguen vigentes: `smooth-scroll.js` no fue modificado.

## Metodología

- Harness jsdom que carga el HTML real, ejecuta `js/data/*.js` y los módulos ES de `js/modules/*` (imports/exports reescritos, misma lógica), y dispara eventos de click, scroll, submit, Escape y storage.
- 35 aserciones: **35 CHECK / 0 FALLA** (`qa.cjs`).
- Probes enfocados:
  - `probe2.cjs` / `probe3.cjs`: `smooth-scroll.js` con `requestAnimationFrame` simulado.
  - `probe4.cjs`: URL de WhatsApp interceptando `location.href` con un `Proxy` de `window`.
  - `probe5.cjs`: orden de `section[id]` y cálculo de `is-active`.
- Revisión estática de todas las referencias `src`/`href` locales de ambos HTML y de las imágenes de `js/data/menu.js`.
- Archivos temporales del harness: `/tmp/apx-scratch-4f023747/th_c0a599c6323c4aee/qa-harness/` (fuera del repo).

## Resultados por ítem

Leyenda: **CHECK** = verificado funcionando · **FALLA** = no funciona como se espera · **NO VERIFICADO** = fuera del alcance de esta pasada (requiere Chrome real).

### 1) Navegación

| Estado Ítem | Archivo y línea | Evidencia / detalle |
|---|---|---|
| CHECK | Enlaces internos `index ↔ carta` | `index.html:76`, `index.html:139` (hero), `carta.html:44`, `carta.html:52`, `carta.html:149`. Todos los `href` locales existen en disco. |
| CHECK | Anclas `#inicio/#sobre-nosotros/#galeria/#contacto/#reservas` | Destinos en `index.html:123`, `:195`, `:263`, `:506`, `:550`. Desde `carta.html` se apunta a `index.html#...` (`carta.html:50-54`); los 5 ids existen en `index.html`. Ningún ancla interna rota. |
| CHECK | `is-active` en index | `js/modules/nav.js:75-86`. `updateActiveLink()` resalta la última sección del DOM cuyo `top ≤ innerHeight/2`. Simulando posiciones: con solo `#inicio` sobre la línea → `is-active=#inicio`; con galería en la mitad → `is-active=#galeria`. |
| CHECK | `is-active` en carta (estado inicial) | `carta.html:52` trae `class="nav__link is-active" aria-current="page"` en Carta. |
| CHECK | Menú hamburguesa: apertura/cierre, `aria-expanded`, bloqueo de scroll, Escape | `js/modules/nav.js:42-65`. Probado: click → `nav--open`, `aria-expanded="true"`, `body.style.overflow="hidden"`; Escape → cierra, `aria-expanded="false"`, `overflow=""`; click en enlace → cierra. |
| NO VERIFICADO | Comportamiento visual del menú a tamaño móvil real (media query, overlay, animación) | Requiere Chrome real; `css/components/nav.css:217` define el panel abierto. No se abrió el navegador (Wren lo estaba usando). |

### 2) Filtros de la carta

| Estado Ítem | Archivo y línea | Evidencia / detalle |
|---|---|---|
| CHECK | Tarjetas renderizadas desde `js/data/menu.js` | `js/modules/carta.js:15-19, 52`. 11 platos en 4 grupos → 11 `.dish-card` en `.carta__grid`. Las imágenes de los 11 platos existen en `assets/img/`. |
| CHECK | Botones de filtro generados desde los grupos del menú | `js/modules/carta.js:61-70`. Genera `all, entradas, parrilla, especiales, bebidas` (Todo + 4 categorías), con `is-active` en Todo. |
| CHECK | Cada categoría filtra bien | `js/modules/carta.js:72-98`. Entradas=4, Parrillada=3, Especiales=2, Bebidas=2; en todos los casos las tarjetas visibles coinciden con su `data-categoria`. Cada botón queda `is-active`. |
| CHECK | "Todo" restaura | `js/modules/carta.js:75` (`filtro === "all"`). Tras filtrar, clic en Todo → 11 visibles. |
| CHECK | Bloques de platos en la home (galería) | `js/modules/galeria-menu.js:60-74`. Misma fuente de datos; los `data-platos`/`data-destacados` del HTML se llenan desde `window.MENU`. |

### 3) Formulario de reservas

| Estado Ítem | Archivo y línea | Evidencia / detalle |
|---|---|---|
| CHECK | Validación de nombre y fecha | `js/modules/contacto.js:44-52`. Sin ambos → status `Necesitamos el nombre y la fecha para confirmar la reserva.` y no navega. El form tiene `novalidate` (`index.html:550`), así que la validación es 100% JS. |
| CHECK | Arme del mensaje de WhatsApp | `js/modules/contacto.js:84-115`. Con datos de prueba se generó: `Hola, quiero reservar mesa. / Nombre: Ana / Fecha: 9 de octubre de 2026 / Hora: 21:00 / Personas: 4 / Motivo: Cumpleaños / Teléfono: 099123456 / Notas: Sin cebolla`. La fecha ISO se convierte a texto legible (`formatearFecha`, líneas 117-129). |
| CHECK | Número desde `js/data/restaurante.js` | `js/modules/contacto.js:55, 71`. URL capturada: `https://wa.me/59800000000?text=<mensaje codificado>` — coincide con `whatsapp: "59800000000"` (`js/data/restaurante.js:31`). |
| CHECK | Feedback de confirmación / error | `js/modules/contacto.js:73-77, 131-137`. Confirmación: `¡Gracias Ana! Te abrimos WhatsApp con tu reserva...`. Sin número: `No pudimos abrir WhatsApp. Escribinos o llamanos directo al restaurante.` (verificado forzando `whatsapp=""`). El status se oculta a los 12 s. |
| CHECK | Reset del formulario tras envío válido | `js/modules/contacto.js:79`. `#nombre` vuelve a `""`. |
| **PENDIENTE (dato)** | Número de WhatsApp de ejemplo | `js/data/restaurante.js:30-31` (`whatsapp: "59800000000"`, `telefonoLegible: "+598 00 000 000"`). **No se cambió**, según lo indicado. Publicar con este valor abre un WhatsApp que no es del restaurante. También `index.html:534` muestra el teléfono example, pero `js/modules/datos-negocio.js:31-38` lo reescribe desde el JSON en runtime. |
| NO VERIFICADO | Apertura real de la app/web de WhatsApp en el dispositivo | jsdom no navega (`Not implemented: navigation`); la URL y el mensaje se verificaron por intercepción. Requiere dispositivo con WhatsApp. |

### 4) Tema claro/oscuro y footer

| Estado Ítem | Archivo y línea | Evidencia / detalle |
|---|---|---|
| CHECK | Persistencia en `localStorage` | `js/modules/tema.js:27-34, 100-110`. Guarda `tema=claro/oscuro`; toggle claro→oscuro persistió (`ls=oscuro`, `data-tema=oscuro`). |
| CHECK | Aplicación anticipada del tema guardado (sin flash) | Script inline en `index.html:26-38` y `carta.html:25-37` lee `localStorage` antes del pintado. Verificado: con `tema=claro` guardado, `documentElement.dataset.tema="claro"` antes de inicializar módulos. |
| CHECK | Botón toggle | `js/modules/tema.js:76-120` + HTML `index.html:84-96` / `carta.html:82-94`. Presente, con `aria-label`, `aria-pressed`, `data-estado`. Actualiza también `<meta name="theme-color">` (`tema.js:127-133`). |
| CHECK | Sin preferencia = sigue al sistema | `js/modules/tema.js:42-48, 122-125`; el `matchMedia(...).addEventListener("change", ...)` reacciona si el sistema cambia y no hay elección guardada. |
| CHECK | Año del footer por JS | `index.html:669-672` y `carta.html:207-210`: `document.getElementById("year").textContent = new Date().getFullYear()`. Verificado: cambia de `2025` (hardcode) a `2026`. |

### 5) Smooth scroll y CTA "Reservar"

| Estado Ítem | Archivo y línea | Evidencia / detalle |
|---|---|---|
| CHECK | CTA Reservar apunta a `#reservas` | `index.html:81` (nav), `index.html:145` (hero), `carta.html:55`. Todos resuelven al `<form id="reservas">` (`index.html:550`) o a `index.html#reservas`. |
| CHECK | Interceptación del clic en anclas | `js/modules/smooth-scroll.js:20-37`: `preventDefault()` en `a[href^="#"]` con destino existente. Verificado en CTA (`defaultPrevented=true`). |
| CHECK | Cálculo del destino con offset del nav | `js/modules/smooth-scroll.js:33-35`: `top + scrollY - navHeight` (70 px simulados → destino 3100). |
| CHECK | Animación con easing y actualización del hash | `js/modules/smooth-scroll.js:40-71`. Con rAF simulado, el primer frame salta directo al destino (ver **FALLA 1**); el `replaceState(targetId)` al final sí está implementado (línea 67). |
| CHECK | Cancelación al scrollear a mano | `js/modules/smooth-scroll.js:73-78`: listeners `wheel` y `touchstart` → `cancelAnimation()`. |
| CHECK | Botón "volver arriba" | `js/modules/parallax.js:44-48`: `scrollTo({top: 0, behavior: "smooth"})`, se muestra después de 320 px (`TO_TOP_OFFSET`). |

### 6) Errores de consola / links rotos

| Estado Ítem | Archivo y línea | Evidencia / detalle |
|---|---|---|
| CHECK | Sin errores de consola propios | Harness: `console.error`/`console.warn` = ninguno. El único `jsdomError` es `Not implemented: navigation`, esperado porque jsdom no navega a `wa.me` (no es un error del sitio). |
| CHECK | Sin imágenes ni assets rotos | Todas las referencias `src`/`href` locales de `index.html` y `carta.html` existen; las 11 imágenes de `js/data/menu.js` existen en `assets/img/`. |
| CHECK | Redes sin URL no quedan como link falso | `js/modules/datos-negocio.js:43-64` elimina IG/FB cuando `instagram`/`facebook` están vacíos (`js/data/restaurante.js:43-44`); solo queda WhatsApp. Verificado en el DOM. |
| CHECK | Inicialización a prueba de errores | `js/main.js:22-42`: `safe()` envuelve cada `init*`; un módulo roto no deja la página en blanco. |

## Hallazgos / cosas que bloquean la publicación

1. **Número de WhatsApp de ejemplo (dato pendiente, no bug de código).** `js/data/restaurante.js:30-31`. Publicar así hace que las reservas lleguen a un número inexistente. **Bloquea publicación** hasta que se cargue el número real (y el legible). No se tocó, por instrucción.
2. **Precios y platos son de ejemplo.** `js/data/menu.js:20` y `carta.html:113-116` lo dicen explícitamente. Aunque funciona, la carta publicada no es la real. **Bloquea publicación** desde el punto de vista de contenido.
3. **FALLA 1 — `smooth-scroll.js`: el easing no se aplica; el salto es instantáneo.** `js/modules/smooth-scroll.js:47-51`. En `animateScroll()`, `rafId` ya tiene el id devuelto por `requestAnimationFrame(step)` cuando se ejecuta el callback, así que `if (!rafId) tiempo = now;` nunca entra. `tiempo` queda `0`, `progreso = min((now - 0)/1100, 1) = 1` en el primer frame y `scrollTo` recibe el destino final de una vez. Verificado con `performance.now()` simulado en 4000 ms: `scrollTo calls: [3100]` (un solo salto). **Mitigación actual:** `css/base/reset.css:18` tiene `scroll-behavior: smooth`, por lo que el navegador suaviza el `window.scrollTo()` y el usuario probablemente no note el bug; aun así el easing exponencial de 1100 ms y la cancelación con rAF quedan sin efecto. No se corrigió (QA no modifica código). No bloquea la publicación por sí solo.
4. **NO VERIFICADO — feedback visual real.** El Chrome de proyecto estaba en uso por otro agente (Wren), así que no se hicieron capturas ni clicks en el navegador real. Los 35 CHECK son de lógica/DOM; el render (animaciones, overlay del menú móvil, parallax) queda para una pasada visual cuando se libere el Chrome.

Las empresas, horarios y redes sociales también son datos de ejemplo, pero no son fallas funcionales.

## Veredicto

**Falla funcional blocking: ninguna sobre la lógica verificada.** Lo que bloquea la publicación son **datos de ejemplo** (número de WhatsApp, carta) y, en menor medida, el bug de easing del smooth scroll (item 3). Todo lo pedido en la tarea —navegación, filtros, reservas, tema, año del footer, CTA, consola/links— pasó: **35 CHECK / 0 FALLA** en el harness, más los probes de WhatsApp, smooth scroll e is-active.
