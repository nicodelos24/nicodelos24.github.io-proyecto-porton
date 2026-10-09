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
   └── js/main.js ──► inicia los 8 módulos, cada uno protegido
```

No hay `package.json`, ni bundler, ni `node_modules`. Es una decisión
deliberada: el sitio tiene que seguir siendo mantenible dentro de un año, por
la misma persona y sin recordar por qué se usó cierta herramienta.

---

## Las secciones, en orden de la página

El orden está pensado para el camino de alguien que todavía no conoce el local:
primero lo ve, después lee quién es, después **ve la comida y los precios**, y
recién al final reserva.

| # | Sección | `#id` | Qué es |
|---|---|---|---|
| 1 | Portada | `inicio` | Foto a pantalla completa, parallax y zoom lento |
| 2 | Marquee | — | Cinta de texto en movimiento |
| 3 | Sobre nosotros | `sobre-nosotros` | Texto a la izquierda, foto del salón a la derecha |
| 4 | Banda | — | Franja de imagen: mollejas |
| 5 | Carta | `carta` | Platos con foto, descripción y precio, con filtros |
| 6 | Galería | `galeria` | Una foto grande y una rejilla de piezas |
| 7 | Contacto | `contacto` | Datos y formulario de reserva |

**Por qué la carta va antes que la galería.** La carta es la sección que invita
a reservar: muestra la comida, su descripción y su precio, todo junto. La
galería es contexto: dónde se está, cómo es el ambiente. Mostrar los precios
después de haber hecho scrollear por una galería larga hacía que el visitante
tuviera que volver arriba a buscarlos.

Y dentro de la galería:

```
foto principal a todo el ancho (salón)
rejilla de doce columnas:
  ancha (asado)      + alta (empanada)
  alta (port)        + ancha (mesa servida)
  ancha (costillar)  + alta (El Negro)
texto de cierre, centrado
```

Las fotos anchas ocupan 8 columnas y las altas 4, así cada fila suma 12 y los
bordes quedan siempre parejos.

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
| `carta.js` | Grilla de platos y filtros de la sección de carta |
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

## La carta vive en los datos

`js/data/menu.js` es la fuente única de verdad. **Ningún plato está escrito en
el HTML**, en ningún lugar de la página.

```
js/data/menu.js
   └── js/modules/carta.js → la grilla con filtros de la sección #carta
```

Los platos se muestran todos juntos en la sección de carta, con foto,
descripción y precio, y se pueden filtrar por categoría. La galería ya no
lleva listas de platos: si el mismo plato apareciera en dos lugares, cada
uno sería un Markup distinto que habría que mantener sincronizado a mano, y es
justamente el tipo de cosa que después se desincroniza.

| Clave | Etiqueta | Platos | Destacados |
|---|---|---|---|
| `entradas` | Entradas | 4 | 1 |
| `parrilla` | Parrillada | 3 | 1 |
| `especiales` | Especiales (postres) | 2 | — |
| `bebidas` | Bebidas | 2 | — |

**Ojo:** la clave y la etiqueta no son lo mismo. La de la parrilla es
`parrilla` y su etiqueta es `"Parrillada"`. `carta.js` busca por la clave.

### La grilla se arma sola

En el `index.html` solo están los dos contenedores donde el módulo escribe:

```html
<div class="carta__filters"></div>   ← los botones de categoría
<div class="carta__grid"></div>      ← las tarjetas de plato
```

Los filtros y los platos salen de `menu.js`. Agregar un plato es agregar un
objeto a ese archivo; nada más.

---

## Las fotos: dos técnicas distintas

El sitio usa dos maneras de mostrar imágenes, y no al azar. Cada una tiene su
lugar:

### 1. Foto de fondo con imagen clavada — la banda

Se usa en la banda de transición, que es una franja a todo el ancho.

```css
@media (min-width: 1025px) {
  .transicion { background-attachment: fixed; }
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
  no al llegar a la sección.

Por eso son pocas y en un solo lugar. Con ocho fotos de fondo en la galería eran
unos 700 KB pedidos de golpe al abrir, y en el celular, donde el efecto no
funciona, el resultado era una columna larguísima de fotos sin jerarquía.

### 2. `<img loading="lazy">` — todo lo demás

La portada, la sección "Sobre nosotros", las tarjetas de plato de la carta, las
fotos del formulario de reservas y **todas las de la galería** van como `<img>`.

Ventajas frente al fondo con efecto clavado:

- Se cargan diferidas: el navegador pide cada una al acercarse a la pantalla.
- Funcionan en iOS y en celular, con el mismo resultado que en escritorio.
- Llevan `alt`, que el fondo de CSS no puede tener.
- Se les puede aplicar la animación de entrada normal (`data-reveal`): con
  `background-attachment: fixed` había que usar la variante `fade`, porque
  cualquier `transform` en el elemento deshace el efecto de foto clavada.

Por eso la galería ya no usa el efecto clavado: no rendía nada en el celular y
era lo que hacía que la página se sintiera recargada de imágenes.

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

### Rutas de imágenes en CSS: relativas, y por qué

Las fotos de fondo usan ruta **relativa**, con los dos niveles de subida que
hacen falta desde `css/layout/`:

```css
background-image: url("../../assets/img/mollejas-con-cremoso.jpg");
```

Dos trampas acá, y conviene conocer las dos:

1. **Una ruta relativa se resuelve contra la hoja de estilos**, no contra el
   documento. Por eso hacen falta los `../../`: sin ellos el navegador busca
   en `css/layout/assets/...`, que no existe.
2. **Una ruta con barra inicial (`/assets/img/...`) está mal en GitHub Pages**,
   porque este repositorio se publica en un subdirectorio,
   `nicodelos24.github.io/nicodelos24.github.io-proyecto-porton/`, y no en la raíz
   del dominio. La barra inicial se salta el prefijo y la imagen da 404.

Las rutas del HTML (`<img src="assets/img/...">`) son relativas al documento,
que está en la raíz del proyecto, y por eso andan en los dos casos.

En local el problema **no aparece**: el servidor arranca justo en la carpeta del
proyecto, así que `/assets/...` sí existe. Solo se ve en el sitio publicado.

Ojo: la barra inicial funcionaría si el sitio estuviera en la raíz de un
dominio. Cuando se migre a Cloudflare Pages pasa a estarlo, así que **no
conviene volver a usarla**.

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
