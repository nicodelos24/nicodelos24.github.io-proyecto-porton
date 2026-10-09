# Arquitectura

Cómo está construido el sitio hoy y, sobre todo, **por qué está así**. Cuando
algo no quede obvio al leer el código, la respuesta suele estar acá.

> Este documento se reescribió por completo cuando la carta pasó a repartirse
> dentro de la galería. Antes describía una carta en grilla con filtros que ya
> no existe.

---

## Panorama general

El sitio es una sola página, sin framework y sin paso de compilación. Todo lo
que hay son archivos que el navegador carga directamente.

```
index.html
   │
   ├── css/main.css ──► importa las 17 hojas, en capas y en orden
   │
   ├── js/data/menu.js ──► carga los platos ANTES que main.js
   │
   └── js/main.js ──► inicia los 9 módulos, cada uno protegido
```

No hay `package.json`, ni bundler, ni `node_modules`. Es una decisión
deliberada: el sitio tiene que seguir siendo mantenible dentro de un año, por
la misma persona y sin recordar por qué se usó cierta herramienta.

---

## Las secciones, en orden de la página

| # | Sección | `#id` | Qué es |
|---|---|---|---|
| 1 | Portada | `inicio` | Foto a pantalla completa, parallax y zoom lento |
| 2 | Sobre nosotros | `sobre-nosotros` | Texto a la izquierda, foto del salón a la derecha |
| 3 | Banda | — | Franja de imagen: mollejas |
| 4 | Banda | — | Franja de imagen: tortelinis |
| 5 | Galería | `galeria` | Fotos y, repartidas entre ellas, las listas de platos |

Y dentro de la galería, en este orden:

```
foto angosta (salón)
lista de la parrilla  +  foto con efecto (asado)
foto (empanada)  +  texto "La cocina"  +  foto (tortilla)
lista de las entradas
rejilla de dos fotos quietas (costillar + mesa)
foto angosta (port)
lista de postres  +  foto con efecto (El Negro)
foto a todo el ancho (calabaza)
foto angosta (chorizo)
lista de bebidas
```

**El orden importa.** Las dos bandas van juntas porque en las dos fotos hay un
plato sostenido con las manos, en la misma pose y con la misma luz: pegadas se
leen como un solo movimiento, de un plato al otro.

---

## Los estilos, en cuatro capas

`css/main.css` no escribe ni una regla: solo importa las hojas en orden. El
orden importa, porque cada capa puede depender de las anteriores.

```
1. BASE       tokens · reset · typography
                Variables de diseño, reinicio de estilos del
                navegador, tipografía global.
                No contiene ninguna clase del proyecto.

2. UTILS      helpers
                Clases sin significado propio: .container,
                .sangria, .eyebrow, .section, .section-head.
                Reusables desde cualquier sección.

3. COMPONENTS preloader · nav · buttons · cards · animations
                · theme-toggle
                Piezas que se repiten o que funcionan por sí mismas.

4. LAYOUT     hero · about · transicion · carta · galeria
                · contacto · footer
                El diseño de cada sección concreta.
```

### La regla que decide dónde va cada cosa

> Si algo se repite en más de dos secciones, pertenece a `components/`.
> Si pertenece a una sola sección, pertenece a `layout/`.

Está escrita en el encabezado de `css/main.css`.

### Una excepción a la regla de `layout/`

`layout/carta.css` **no lo usa `index.html`**. Está ahí, junto con
`js/modules/carta.js`, esperando la página `carta.html`, que todavía no existe
(ver `PENDIENTES.md`). Los dos se dejaron intactos a propósito: la carta
completa con fotos y precios va a necesitar exactamente lo que ya está
escrito.

---

## El JavaScript, modular

Cada funcionalidad es un archivo en `js/modules/` que exporta una función de
inicio. `js/main.js` las importa y las arranca.

| Módulo | Responsabilidad |
|---|---|
| `preloader.js` | Pantalla de carga; se oculta sola, con mínimo y máximo |
| `nav.js` | Menú de móvil, fondo al scrollear, enlace activo |
| `tema.js` | Modo claro y oscuro, con memoria de la elección |
| `reveal.js` | Animación de entrada de los `[data-reveal]` |
| `parallax.js` | Parallax de la portada y botón "volver arriba" |
| `smooth-scroll.js` | Desplazamiento suave entre secciones |
| `carta.js` | Grilla de platos y filtros. **Hoy no renderiza nada en `index.html`** |
| `galeria-menu.js` | Pinta las listas de platos dentro de la galería |
| `contacto.js` | Validación del formulario de reservas |

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
visitante vea una página en blanco. El error queda anotado en la consola del
navegador, así que tampoco es silencioso.

### Cómo agregar un módulo

1. Crear `js/modules/nuevaCosa.js` exportando `initNuevaCosa()`.
2. Importarlo en `js/main.js`.
3. Llamarlo dentro de `safe("nueva-cosa", initNuevaCosa)`.

---

## La carta vive en los datos, en dos lugares

`js/data/menu.js` es la fuente única de verdad. **Ningún plato está escrito en
el HTML**, en ningún lugar de la página.

```
js/data/menu.js
   ├── js/modules/carta.js        → la grilla con filtros (para carta.html)
   └── js/modules/galeria-menu.js → las listas dentro de la galería
```

Las dos categorías del archivo:

| Clave | Etiqueta | Platos | Destacados |
|---|---|---|---|
| `entradas` | Entradas | 4 | 1 |
| `parrilla` | Parrillada | 3 | 1 |
| `especiales` | Especiales (postres) | 2 | — |
| `bebidas` | Bebidas | 2 | — |

**Ojo:** la clave y la etiqueta no son lo mismo. La de la parrilla es
`parrilla` y su etiqueta es `"Parrillada"`. `galeria-menu.js` busca por la
clave.

### Cómo se agrega un bloque de platos a la galería

Una sola línea de HTML:

```html
<ul class="galeria-platos" data-platos="entradas"></ul>
```

Y el módulo busca esa categoría en los datos y la pinta. Agregar una categoría
nueva es agregar esa línea, sin tocar JavaScript.

### Un bloque vacío se oculta solo

```css
.galeria-bloque:has([data-platos]:empty) { display: none; }
```

Si la categoría no trae platos, el bloque entero desaparece. Sin esto
quedaría un título "Postres" con nada debajo, que parece un error.

---

## Las fotos: tres técnicas distintas

El sitio usa tres maneras de mostrar imágenes, y no al azar. Cada una tiene su
lugar:

### 1. Foto de fondo con imagen clavada — la más usada

Se usa en las dos bandas y en las fotos de la galería.

```css
@media (min-width: 1025px) {
  .gallery__item { background-attachment: fixed; }
}
```

La foto queda clavada en la pantalla y se va viendo franjas distintas de ella al
scrollear. Lo hace el navegador, sin una línea de JavaScript.

**Consecuencias que hay que conocer:**

- **No funciona en iOS.** Safari en iPhone y iPad ignora la propiedad
  completamente, sin importar el tamaño de la pantalla. No hay forma de
  arreglarlo con esta técnica.
- **No se aplica por debajo de 1025 px.** En un celular la franja es más angosta
  que la pantalla, así que la foto casi nunca llega a estar más alta que la
  franja y el efecto no se notaría. Además, la propiedad obliga al navegador a
  recomponer en cada scroll, que en un teléfono se nota como tirones.
- **Las imágenes de fondo no se cargan diferidas.** Se piden al abrir la página,
  no al llegar a la sección. Con siete fotos de fondo son unos 700 KB de golpe.

Por eso las fotos de la galería son fondos y no `<img>`: es la única forma de
dejarlas clavadas.

### 2. Fotos de fondo con efecto clavado · fotos de galería

Mismo mecanismo, con dos diferencias:

- `.gallery__item--costura` **no tiene esquinas redondeadas** y lleva un margen
  lateral que las centra dentro de su mitad de la pantalla.
- El bloque de las "costuras" entero se sangra a pantalla completa.

### 3. La rejilla · fotos quietas

`rejilla__foto` son dos fotos **sin ningún efecto de scroll**. El contraste no
viene del movimiento sino del tamaño: son chicas y de proporciones distintas,
mientras las de efecto ocupan todo el ancho.

Va como `<img>` y no de fondo a propósito: una imagen de fondo solo se puede
dejar clavada, que es justo lo que ahí no se quiere.

Se probó darles también un efecto de revelado (la foto siendo tres pantallas de
alto, que es lo que hace el sitio de Triciclo, armado con Wix) y **no sumaba**:
con la página ya llena de fotos animadas, un efecto más es ruido en lugar de
descanso.

---

## La sangría: fotos que tocan el borde

```css
.sangria {
  width: 100vw;
  margin-inline: calc(50% - 50vw);
}
```

Rompe el ancho del contenedor para que el elemento toque los dos bordes de la
pantalla. El margen negativo descuenta la mitad del contenedor y suma la mitad
de la ventana, así que el elemento queda centrado **en la pantalla**, no en el
contenedor.

### El detalle que hace falta

`100vw` incluye la barra de desplazamiento vertical. Sin esto aparecería una
barra horizontal:

```css
html { overflow-x: clip; }
```

`clip` y no `hidden`, porque `hidden` crea un contenedor de scroll y rompería
el nav, que es `position: fixed`.

---

## Accesibilidad y degradación

### El sitio funciona sin JavaScript

En el `<head>` hay un script en línea que agrega la clase `js` al `<html>`:

```html
<script>document.documentElement.classList.add("js");</script>
```

Los estilos de las animaciones iniciales se limitan a esa clase. Si el
JavaScript falla o está deshabilitado, la clase nunca se agrega y **el contenido
se ve normal**.

La excepción, ya asumida: **la carta no aparece sin JavaScript**, porque se arma
desde los datos. Es el único contenido del sitio que depende de JS para
existir.

### La trampa de `data-reveal`

```css
.js [data-reveal] {
  transform: translateY(2.5rem);
  will-change: opacity, transform;
}
```

**Cualquier elemento con `transform` o con `will-change: transform` deja de
anclar su imagen de fondo a la pantalla**, y el efecto de foto clavada desaparece
sin dar ningún error.

Por eso existe la variante `fade`:

```css
.js [data-reveal="fade"] {
  transform: none;
  will-change: opacity;
}
```

`will-change: opacity` no crea el problema, porque solo lo crean `transform`,
`filter`, `perspective` y `contain`.

**Regla: un bloque con foto de fondo clavada usa `data-reveal="fade"`, nunca
`left`, `right` ni `scale`.**

### Preferencias de movimiento

`css/base/reset.css` tiene una regla `@media (prefers-reduced-motion: reduce)`
que anula transiciones y animaciones. Si la persona pidió menos movimiento en
el sistema, el sitio entero se muestra estático.

`reveal.js` además no depende de esa preferencia para funcionar: si el
navegador no soporta `IntersectionObserver`, muestra todo el contenido sin
animación en vez de dejar elementos invisibles.

### Otras medidas

- `skip-link` al inicio del `<body>`.
- El botón de menú declara `aria-expanded`; `Escape` cierra el menú.
- Las imágenes decorativas llevan `alt=""` y `aria-hidden="true"`.
- Las imágenes de fondo llevan `role="img"` y `aria-label` en el marco: una
  imagen de fondo no admite `alt`, así que la descripción va en el contenedor.
- El formulario se valida en el cliente, con `novalidate`.
- El `theme-color` y las etiquetas de Open Graph están definidos.

---

## Imágenes

- `assets/img/` es la carpeta que usa el sitio.
- `images/` es la copia vieja, que **ya no carga nada**. Está en el repositorio
  por herencia y tiene sentido borrarla (ver `PENDIENTES.md`).
- Las fotos con efecto van como fondos y **no se cargan diferidas**. Las de la
  rejilla y la de la portada sí.
- La foto del hero saltea la espera (`fetchpriority="high"`) porque es lo
  primero que ve el visitante.

### Una trampa con rutas relativas en CSS

Las fotos de fondo usan ruta **con barra inicial** (`/assets/img/...`), no
relativa. Con una ruta relativa, el navegador la resuelve contra la hoja de
estilos y no contra el documento: acabaría buscando en `css/layout/assets/...`.

---

## Verificación

Después de tocar estilos o markup, hay dos comprobaciones que valen:

```sh
# ¿Cada clase del HTML tiene una regla en el CSS, y al revés?
# (una clase mal escrita no da ningún error: el estilo simplemente no se aplica)
node -e "…"

# ¿Siguen funcionando los imports y la sintaxis?
node --check js/main.js
```

La primera es la importante. Un error de una letra en un nombre de clase es
invisible en el navegador salvo por el síntoma: el estilo no se aplica.
