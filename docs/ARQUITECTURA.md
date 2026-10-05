# Arquitectura

Este documento explica cómo está construido el sitio y, sobre todo, **por
qué está así**. Cuando algo no quede obvio al leer el código, la respuesta
suele estar acá.

---

## Panorama general

El sitio es una sola página con seis secciones, sin Framework y sin paso de
build. Todo lo que hay son archivos que el navegador carga directamente.

```
index.html
   │
   ├── css/main.css ──► importa las 4 capas de estilos
   │
   ├── js/data/menu.js ──► carga el menú ANTES que main.js
   │
   └── js/main.js ──► inicia los 7 módulos, cada uno protegido
```

No hay `package.json`, ni bundler, ni `node_modules`. Es una decisión
deliberada: el sitio tiene que seguir siendo mantenible dentro de un año,
por la misma persona y sin recordar por qué carajos se usó cierta
herramienta.

---

## Capa 1 · Estilos en cuatro capas

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
                Piezas que se repiten: un botón, una tarjeta de plato,
                la barra de navegación, el sistema de animaciones.
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

## Capa 2 · JavaScript modular

Cada funcionalidad es un archivo en `js/modules/` que exporta una función
de inicio. `js/main.js` las importa y las arranca.

| Módulo | Responsabilidad |
|---|---|
| `preloader.js` | Pantalla de carga; se oculta sola |
| `nav.js` | Menú de móvil, fondo al scrollear, enlace activo |
| `reveal.js` | Animación de entrada de los elementos `[data-reveal]` |
| `parallax.js` | Efecto de profundidad en el hero y botón "volver arriba" |
| `smooth-scroll.js` | Desplazamiento suave entre secciones |
| `carta.js` | Genera las tarjetas de platos y los filtros |
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

Agregar un plato es agregar un objeto en `js/data/menu.js`.

---

## Capa 3 · Accesibilidad y degradación

### El sitio funciona sin JavaScript

En el `<head>` hay un script en línea que agrega la clase `js` al elemento
`<html>`:

```html
<script>document.documentElement.classList.add("js");</script>
```

Los estilos de las animaciones iniciales están.scopeados con esa clase:

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

## Capa 4 · Imágenes

- `assets/img/` es la carpeta que usa el sitio.
- Las imágenes se cargan **bajo demanda** (`loading="lazy"`), salvo la
  del hero, que se saltea la espera (`fetchpriority="high"`) porque es lo
  primero que ve el visitante.
- `decoding="async"` para que las imágenes no bloqueen el render.

`prototipo-boceto/` conserva la primera versión completa, con sus fotos y
sus nombres con espacios y números. No se carga en el sitio; está ahí
para comparar.