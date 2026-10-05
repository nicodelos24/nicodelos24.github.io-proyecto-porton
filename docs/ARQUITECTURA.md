# Arquitectura

Este documento explica cómo está construido el sitio y, sobre todo, **por
qué está así**. Cuando algo no quede obvio al leer el código, la respuesta
suele estar acá.

---

## Panorama general

El sitio es una sola página con cinco secciones (portada, sobre nosotros,
galería, carta y contacto), sin framework y sin paso de compilación. Todo
lo que hay son archivos que el navegador carga directamente.

```
index.html
   │
   ├── css/main.css ──► importa las 4 capas de estilos
   │
   ├── js/data/menu.js ──► carga el menú ANTES que main.js
   │
   └── js/main.js ──► inicia los 9 módulos, cada uno protegido
```

No hay `package.json`, ni bundler, ni `node_modules`. Es una decisión
deliberada: el sitio tiene que seguir siendo mantenible dentro de un año,
por la misma persona y sin recordar por qué se usó cierta herramienta.

---

## Los estilos, en cuatro capas

`css/main.css` no escribe ni una regla: solo importa las capas en orden.
El orden importa, porque cada capa puede depender de las anteriores.

```
1. BASE       tokens.css · reset.css · typography.css
                Variables de diseño, reinicio de estilos del
                navegador, tipografía global.
                No contiene ninguna clase del proyecto.

2. UTILS      helpers.css
                Clases sin significado propio (.container, .eyebrow).
                Reusables desde cualquier sección.

3. COMPONENTS preloader · nav · buttons · cards · animations
                · theme-toggle · lightbox
                Piezas que se repiten o que funcionan por sí mismas:
                un botón, una tarjeta de plato, la barra de
                navegación, el sistema de animaciones, el botón de
                tema y el visor de fotos.
                No saben en qué sección están.

4. LAYOUT     hero · about · carta · galeria · contacto · footer
                El diseño de cada sección concreta, componiendo los
                componentes de la capa anterior.
```

### La regla que decide dónde va cada cosa

> Si algo se repite en más de dos secciones, pertenece a `components/`.
> Si pertenece a una sola sección, pertenece a `layout/`.

Está escrita en el encabezado de `css/main.css` para que se lea al abrir el
archivo.

### Por qué importa

Con estilos en un solo archivo, dos reglas que compiten se resuelven por el
orden en que quedaron escritas, y nadie recuerda cuál fue. Con capas, la
precedencia es explícita y agregar un componente nuevo es agregar un
`@import` en el lugar correcto.

### Tokens: la identidad visual en un solo archivo

`css/base/tokens.css` contiene **todos** los valores de color, tipografía,
espaciado, radios, sombras, curvas de animación y escalas de z-index.

Los colores están definidos en dos niveles:

- **Paleta** (`--c-vino-600`, `--c-oro-400`, `--c-ceniza`): los colores
  concretos, inspirados en el logo.
- **Semánticos** (`--c-bg`, `--c-texto`, `--c-marca`, `--c-acento`): para
  qué se usa cada color.

Los estilos de las secciones usan **siempre** los semánticos. Si mañana la
marca pasa del vino al naranja, se cambian los alias y el sitio entero
recolorea sin tocar una sola regla de una sección.

La tipografía es fluida con `clamp()`, así responde al tamaño de pantalla
sin necesidad de consultas de medios.

---

## El JavaScript, modular

Cada funcionalidad es un archivo en `js/modules/` que exporta una función
de inicio. `js/main.js` las importa y las arranca.

| Módulo | Responsabilidad |
|---|---|
| `preloader.js` | Pantalla de carga; se oculta sola |
| `nav.js` | Menú de móvil, fondo al scrollear, enlace activo |
| `tema.js` | Modo claro y oscuro, con memoria de la elección |
| `reveal.js` | Animación de entrada de los elementos `[data-reveal]` |
| `parallax.js` | Efecto de profundidad en el hero y botón "volver arriba" |
| `smooth-scroll.js` | Desplazamiento suave entre secciones |
| `galeria.js` | Visor de fotos grandes al tocarlas |
| `carta.js` | Genera las tarjetas, los filtros y el desplegable del menú |
| `contacto.js` | Validación y envío del formulario de reservas |

### Un módulo roto no rompe el sitio

En `js/main.js`, cada módulo se ejecuta dentro de un bloque que atrapa los
errores:

```js
function safe(name, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[${name}] No se pudo inicializar:`, error);
  }
}
```

Es una decisión deliberada: es preferible que falte una animación a que el
visitante vea una página en blanco. El error queda anotado en la consola
del navegador, así que tampoco es silencioso.

### Cómo agregar un módulo

1. Crear `js/modules/nuevaCosa.js` exportando `initNuevaCosa()`.
2. Importarlo en `js/main.js`.
3. Llamarlo dentro de `safe("nueva-cosa", initNuevaCosa)`.

### La carta se genera desde los datos

No hay ni un `<article class="dish-card">` escrito a mano en el HTML. El
contenedor `.carta__grid` está vacío y `carta.js` lo completa a partir de
`window.MENU`.

Por eso el HTML tiene que cargar `js/data/menu.js` **antes** que
`js/main.js` (está escrito como un `<script>` normal, sin `defer`, porque
los módulos son diferidos por defecto y un script clásico sin `defer` se
ejecuta antes).

La carta entra **resumida**: al abrir la página solo se ven los platos
marcados con `destacado: true`, y abajo hay un botón que despliega el resto.
La cantidad que muestra el botón se arma sola con los datos, así que
agregar un plato no obliga a actualizar ningún texto.

Los filtros por categoría también quedan ocultos hasta que se despliega
el menú completo.

Agregar un plato es agregar un objeto en `js/data/menu.js`.

### Contenido que se inserta después necesita volver a registrarse

Un `IntersectionObserver` solo observa los elementos que existían cuando se
creó. Si un módulo inserta HTML nuevo después, esos elementos quedan sin
observar y, como su estado inicial es invisible, **no aparecen nunca**.

Por eso `reveal.js` exporta `observeReveal(raíz)`, y `carta.js` la llama
después de renderizar las tarjetas:

```js
grid.innerHTML = platos.map(dishCardHTML).join("");
observeReveal(grid);   // sin esto, las tarjetas quedan invisibles
```

La función marca cada elemento con `data-reveal-observed`, así que llamarla
dos veces sobre el mismo contenido no lo rompe.

Regla general: **si insertás elementos con `data-reveal` desde JavaScript,
llamá a `observeReveal` sobre el contenedor.**

---

## Accesibilidad y degradación

### El sitio funciona sin JavaScript

En el `<head>` hay un script en línea que agrega la clase `js` al elemento
`<html>`:

```html
<script>document.documentElement.classList.add("js");</script>
```

Los estilos de las animaciones iniciales se limitan a esa clase:

```css
.js [data-reveal] { opacity: 0; transform: translateY(2.5rem); }
```

Si el JavaScript falla o está deshabilitado, la clase nunca se agrega, la
regla no se aplica y **el contenido se ve normal**. Al revés de lo habitual,
donde un sitio con JS roto muestra una página vacía.

### Otras medidas

- `skip-link` al inicio del `<body>` para saltar al contenido.
- El botón de menú declara `aria-expanded`; `Escape` cierra el menú.
- Todas las imágenes decorativas llevan `alt=""` y `aria-hidden="true"`.
- Las imágenes de contenido llevan textos alternativos descriptivos.
- El formulario se valida en el cliente, pero no con `required` de HTML:
  el sitio da sus propios mensajes, y el formulario ya declara
  `novalidate`.
- El `theme-color` y las etiquetas de Open Graph están definidos, así que
  el enlace se ve bien al compartirlo en redes o en el celular.

### Preferencias de movimiento

`css/base/reset.css` incluye una regla `@media (prefers-reduced-motion:
reduce)` que anula las transiciones y animaciones. Si la persona pidió menos
movimiento en el sistema, el sitio entero se muestra estático.

Además, `reveal.js` no depende de esa preferencia para funcionar: si el
navegador no soporta `IntersectionObserver`, muestra todo el contenido de
entrada sin animación en vez de dejar elementos invisibles.

---

## Modo claro y oscuro

El sitio tiene dos paletas. Cuál se usa depende de tres cosas, en este orden:

1. Si el visitante nunca eligió a mano, manda la preferencia del sistema
   (`prefers-color-scheme`).
2. Si eligió con el botón, manda su elección, que queda guardada en
   `localStorage` bajo la clave `tema`.
3. La elección se aplica con un script en línea dentro del `<head>`, no
   desde `main.js`. Si se hiciera más tarde, el visitante vería un destello
   del tema equivocado antes de que se corrija.

El atributo `data-tema` va en `<html>`:

| Estado | Atributo | Quién decide el color |
|---|---|---|
| Sin elección (lo normal) | ninguno | La consulta `prefers-color-scheme` del CSS |
| Elección a mano | `claro` u `oscuro` | El atributo, que gana sobre la consulta |

La paleta está escrita **dos veces** en `tokens.css`, una por tema. Se
repite a propósito: es lo que permite que el sitio funcione bien sin
JavaScript.

`.hero` y `.footer` redefinen sus propios colores y se mantienen oscuros en
los dos temas, porque van sobre una foto oscura con un velo encima.

---

## Galería con fotos grandes

Cada foto de la galería es un `<button data-galeria>` en `index.html`. No hay
ninguna lista de fotos en el JavaScript: `galeria.js` lee los botones del
propio DOM y saca de cada uno la imagen y el pie de foto.

Por eso **agregar una foto es agregar un botón más en `index.html`**, sin
tocar `js/modules/galeria.js`.

El visor es un `dialog` modal. Mientras está abierto:

- El fondo no se desplaza.
- El foco no puede salirse (si se saliera, el teclado podría mover cosas
  que hay detrás).
- `Escape` cierra.
- Las flechas ← y → cambian de foto.

Al cerrar, el foco vuelve a la foto desde la que se abrió.

---

## Imágenes

- `assets/img/` es la carpeta que usa el sitio.
- Las imágenes se cargan **bajo demanda** (`loading="lazy"`), salvo la
  del hero, que se saltea la espera (`fetchpriority="high"`) porque es lo
  primero que ve el visitante.
- `decoding="async"` para que las imágenes no bloqueen el render.

`prototipo-boceto/` conserva la primera versión completa, con sus fotos y
sus nombres con espacios y números. No se carga en el sitio; está ahí
para comparar.