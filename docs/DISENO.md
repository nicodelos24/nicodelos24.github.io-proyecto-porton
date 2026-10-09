# Sistema de diseño

Qué se usó para construir la página: los colores, las tipografías, las medidas
y las técnicas. Todo sale de **un solo archivo**, `css/base/tokens.css`.

Cambiar la identidad visual del sitio entero es editar ese archivo. Ninguna
sección escribe un color, una tipografía ni una medida a mano.

---

## 1. Los colores

Están en dos niveles, y la diferencia es lo que hace que el sitio se pueda
recolorear entero.

### La paleta: los colores concretos

Inspirados en el logo. Nunca se usan directamente en una sección.

| Token | Valor | |
|---|---|---|
| `--c-vino-900` | `#1a0a10` | Vino casi negro, el fondo del pie |
| `--c-vino-800` | `#2b0f18` | |
| `--c-vino-700` | `#4a1226` | |
| `--c-vino-600` | `#6b1830` | Vino de marca |
| `--c-vino-500` | `#8c2039` | **El vino que se ve** |
| `--c-vino-400` | `#a8324a` | Vino claro, para texto sobre oscuro |
| `--c-oro-500` | `#c9a227` | |
| `--c-oro-400` | `#d9b64a` | **El dorado que se ve** |
| `--c-oro-300` | `#e8cd7d` | |
| `--c-oro-100` | `#f3e6c4` | Crema |
| `--c-negro` | `#0a0a0a` | Fondo del tema oscuro |
| `--c-hueso` | `#f4efe6` | **El texto claro** |
| `--c-hueso-osc` | `#ddd4c6` | |
| `--c-ceniza` | `#9a9086` | Texto secundario |

### Los alias: para qué se usa cada color

Esto es lo que las secciones usan, siempre.

| Token | Apunta a | Uso |
|---|---|---|
| `--c-bg` | `--c-negro` | Fondo de página |
| `--c-bg-alt` | `--c-carbón` | Fondo alterno de sección |
| `--c-superficie` | `--c-carbón-2` | Tarjetas, campos |
| `--c-texto` | `--c-hueso` | Texto principal |
| `--c-texto-suave` | `--c-ceniza` | Texto secundario |
| `--c-marca` | `--c-vino-500` | Bordes y detalles |
| `--c-acento` | `--c-oro-400` | Links, precios, remates |
| `--c-borde` | translúcido | Separadores |

> Si mañana la marca pasa del vino al naranja, se cambian dos alias y el sitio
> entero cambia de color, sin tocar una sola sección.

### Las partes que no cambian con el tema

La portada, las dos bandas, el bloque de contacto y el pie van sobre fotos
oscuras. **Se mantienen oscuros en los dos temas**, porque con texto claro es lo
único que se lee bien.

Por eso declaran sus propios colores dentro del bloque:

```css
.hero {
  --c-texto: var(--c-hueso);
  --c-acento: var(--c-oro-400);
  color: var(--c-texto);   /* el color, además del token: sin esto los
                              hijos heredan el del body y salen oscuros */
}
```

Declarar también `color` es lo que arregla el modo claro. Si solo se declara el
token, el texto de adentro sigue heredando el color resuelto desde el `body` y
no cambia.

### El modo claro

Está escrito **dos veces** en `tokens.css`:

| Bloque | Cuándo se aplica |
|---|---|
| `:root[data-tema="claro"]` | Cuando el visitante elige el tema a mano |
| `:root:not([data-tema])` dentro de `prefers-color-scheme: light` | Cuando nadie eligió nada: manda el sistema |

Se repiten a propósito para que el sitio funcione **sin JavaScript**. Si tocás
uno y no el otro, el tema se ve bien en la mitad de las situaciones y mal en la
otra, sin ningún error que lo indique.

---

## 2. Las tipografías

Dos, y cada una con un trabajo:

| Token | Familia | Para qué |
|---|---|---|
| `--font-display` | Playfair Display, Georgia, serif | Títulos, nombres de plato, cifras |
| `--font-body` | Inter, system-ui, Segoe UI, sans-serif | Todo lo demás |

### Las medidas, con `clamp()`

Fluidas: responden al tamaño de pantalla sin consultas de medios.

| Token | Valor | |
|---|---|---|
| `--fs-xs` | 0.75rem | Etiquetas |
| `--fs-sm` | 0.875rem | Descripciones de plato |
| `--fs-base` | `clamp(0.95rem, …, 1.05rem)` | Texto normal |
| `--fs-lg` | `clamp(1.125rem, …, 1.375rem)` | |
| `--fs-xl` | `clamp(1.5rem, …, 2.25rem)` | Títulos de bloque |
| `--fs-2xl` | `clamp(2rem, …, 3.5rem)` | Títulos de sección |
| `--fs-3xl` | `clamp(2.75rem, …, 6rem)` | Título de la portada |

Interlineados: `--lh-tight 1.05` para títulos, `--lh-base 1.7` para texto.

Espaciado entre letras: `--tracking-wide 0.18em` y `--tracking-mega 0.32em`,
para las etiquetas en mayúsculas.

---

## 3. Las medidas

| Token | Valor | |
|---|---|---|
| `--sp-1` a `--sp-10` | 0.25rem a 8rem | Escala de espaciado |
| `--contenedor-max` | 1280px | Ancho máximo del contenido |
| `--contenedor-pad` | `clamp(1.25rem, 5vw, 4rem)` | Margen a los costados |
| `--seccion-pad-y` | `clamp(4rem, 8vw, 9rem)` | Aire vertical entre secciones |
| `--r-sm` / `--r-md` / `--r-lg` | 4 / 10 / 20px | Esquinas |
| `--sombra-sm/md/lg` | tres niveles | |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | La curva de casi todo el sitio |
| `--dur-fast/base/slow` | 250 / 600 / 1100 ms | |
| `--z-nav/z-menu/z-preloader` | 100 / 200 / 999 | |

---

## 4. Las imágenes

### Dónde está cada una

| Sección | Imagen | Técnica |
|---|---|---|
| Portada | `cabecera.jpg` | `<img>` + parallax + zoom lento |
| Sobre nosotros | `caption.jpg` (el salón) | `<img>` con zoom al pasar el mouse |
| Banda 3 | `mollejas-con-cremoso.jpg` | Fondo, clavada |
| Banda 4 | `tortellinis-de-espinaca.jpg` | Fondo, clavada |
| Galería · angosta izquierda | `caption.jpg` (salón) | Fondo, clavada |
| Galería · parrilla | `asad.jpg` | Fondo, clavada |
| Galería · costuras izq. | `empanada-de-carne-a-cuchillo.jpg` | Fondo, clavada |
| Galería · costuras der. | `tortilla-con-alioli.jpg` | Fondo, clavada |
| Rejilla | `2.jpg` (costillar) | `<img>`, quieta |
| Rejilla | `8.jpg` (la mesa) | `<img>`, quieta |
| Galería · angosta derecha | `port.jpg` | Fondo, clavada |
| Galería · postres | `el-negro-inspirado-en.jpg` | Fondo, clavada |
| Galería · ancha | `calabaza-asada-con-queso.jpg` | Fondo, clavada, **a sangre** |
| Galería · angosta izquierda | `chorizo-morcilla-queso.jpg` | Fondo, clavada |
| Contacto | `caption.jpg` (salón) | `<img>` de fondo |

### Las tres técnicas

| | Cómo | Dónde | En el celular |
|---|---|---|---|
| **Foto clavada** | `background-attachment: fixed` | Bandas y fotos de galería | **No** |
| **Foto quieta** | `<img>` normal | Rejilla | Sí, normal |
| **Foto a sangre** | `.sangria`, quita el margen del contenedor | Calabaza, bloque central | Sí |

### Por qué hay dos fotos con efecto y dos sin

El contraste entre una técnica y otra es lo que evita que la galería se sienta
monótona. Una congela el tiempo, la otra lo deja correr. Y una foto quieta
chica al lado de una grande a todo el ancho hace que la vista se frene un
momento.

---

## 5. Las animaciones

### La entrada al hacer scroll

`data-reveal` en el HTML, `IntersectionObserver` en JavaScript, el movimiento en
CSS. JavaScript solo avisa cuándo un elemento entra en pantalla y le agrega
`.is-visible`.

| Variante | Qué hace | Dónde se usa |
|---|---|---|
| *(sin valor)* | Sube desde abajo | Textos y títulos |
| `right` / `left` | Entra desde un costado | La foto del salón |
| `fade` | Solo aparece, **no se mueve** | **Todo lo que lleva foto de fondo** |

`fade` no es un capricho: es la única variante que no rompe el efecto de foto
clavada. Ver la trampa en `ARQUITECTURA.md`.

### El parallax

| | Qué | Velocidad |
|---|---|---|
| Portada | La foto se mueve al scrollear y además hace un zoom lento en bucle | 0.35 |
| Galería y bloques | Ya no usan parallax: usan la foto clavada del navegador | — |

La foto de la portada tiene un zoom lento de 22 segundos en bucle, en dos
sentidos, alternando entre 1.08 y 1.2. El parallax y el zoom viven en la misma
propiedad `transform`, así que no se pisan.

---

## 6. Lo que faltaba y se resolvió

Anotado porque son las cosas que más costan encontrar después.

### El marco de las fotos

Las fotos de platos del proyecto son horizontales (1000×562, 16:9). Con un
marco vertical, `cover` tiene que recortar más de la mitad del ancho y queda
una franja angosta con un pedazo de comida.

Por eso el marco de "Sobre nosotros" sigue vertical (4/5) pero las fotos de la
galería usan proporciones distintas según su función.

### El dorado en modo claro

El dorado claro sobre fondo marfil quedaba en **2,1:1** de contraste, muy por
debajo del 4,5:1 que hace falta para leer. En la paleta clara el acento pasa a
`#8a6a12`, que queda en **4,7:1**.

### El logo sobre fondo oscuro

El logo viene en negro. Sobre la portada y el pie, que son oscuros, se aplicó
un filtro para invertirlo y darle el tono vino:

```css
--filtro-logo: invert(11%) sepia(38%) saturate(3400%) hue-rotate(340deg) brightness(85%);
--mezcla-logo: screen;
```

---

## 7. Para cambiar la identidad visual

| Quiero cambiar… | Dónde |
|---|---|
| Los colores | `css/base/tokens.css`, alias semánticos |
| Las tipografías | `css/base/tokens.css`, `--font-display` y `--font-body` |
| Los tamaños de texto | `css/base/tokens.css`, `--fs-*` |
| El ancho máximo del contenido | `css/base/tokens.css`, `--contenedor-max` |
| El aire entre secciones | `css/base/tokens.css`, `--seccion-pad-y` |
| Las esquinas redondeadas | `css/base/tokens.css`, `--r-*` |
| La paleta del modo claro | `css/base/tokens.css`, **los dos bloques** |

**Nunca** en los archivos de sección. Si un color literal aparece en
`layout/`, es un error: va al archivo de tokens.
