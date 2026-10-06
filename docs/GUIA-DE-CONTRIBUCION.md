# Guía de contribución

Instrucciones para las tareas que más probablemente haya que hacer. Cada una
dice exactamente qué archivo tocar.

---

## Agregar, quitar o cambiar un plato

**Único archivo a tocar: `js/data/menu.js`.**

Las tarjetas de la carta no están escritas en el HTML: se generan en el
navegador a partir de ese archivo.

```js
{
  nombre: "Nombre del plato",        // obligatorio
  descripcion: "Texto corto",         // opcional
  precio: 890,                        // número, pesos uruguayos
  imagen: "asad.jpg",                 // archivo dentro de assets/img/
  destacado: true,                    // opcional. VEA ABAJO, hace DOS cosas
}
```

### Ojo: `destacado` hace dos cosas

Marcar un plato como destacado tiene **dos efectos**, y conviene tener los dos
presentes:

1. Le pone la etiqueta "Del chef".
2. Lo incluye en la **carta resumida** que se ve al abrir la página.

La carta arranca mostrando solo los destacados, con un botón que despliega
el resto. Así que `destacado: true` decide qué platos ve el visitante sin
tener que tocar nada.

Hoy hay 5 destacados sobre 12 platos. Si convendieran 6, o menos, se
cambia acá y nada más: el botón que despliega el menú arma su texto con los
datos, así que no hay ningún número escrito a mano para actualizar.

### Agregar un plato a una categoría existente

Dentro del `items` del grupo correspondiente:

```js
bebidas: {
  label: "Bebidas",
  items: [
    { nombre: "Agua mineral", descripcion: "Sin gas, 500 ml.", precio: 90, imagen: "images.jpg" },
    // el plato nuevo va acá
  ],
},
```

El botón de filtro con su etiqueta aparece solo, sin tocar nada más.

### Agregar una categoría nueva

Un grupo más arriba del objeto `window.MENU`. La categoría se toma
automáticamente de la clave del grupo, así que no se escribe dentro de cada
plato:

```js
postres: {
  label: "Postres",          // esto es lo que ve el visitante en el filtro
  items: [
    { nombre: "Flan casero", precio: 350, imagen: "port.jpg" },
  ],
},
```

### La imagen del plato

Va dentro de `assets/img/`, y en `menu.js` solo se escribe el nombre del
archivo. Conviene descriptive: `calabaza-asada-con-queso.jpg` y no
`IMG_4021.jpg`.

### Ojo

Los precios son **de ejemplo**. Reemplazarlos por los reales antes de
publicar.

---

## Agregar una foto a la galería

**Único archivo a tocar: `index.html`.**

`js/modules/galeria.js` no tiene ninguna lista de fotos: lee del propio HTML
todos los botones que tengan `data-galeria`, y saca de cada uno la imagen y
el pie de foto.

```html
<button class="gallery__item" type="button" data-galeria
        data-pie="A la parrilla" data-alt="Carnes asadas con guarniciones"
        data-reveal="scale" data-reveal-delay="2">
  <img src="assets/img/asad.jpg" alt="Carnes asadas con guarniciones"
       loading="lazy" decoding="async">
  <span class="gallery__caption">A la parrilla</span>
  <span class="gallery__lupa" aria-hidden="true"><svg …></svg></span>
</button>
```

- `data-galeria` es lo que marca el botón como parte de la galería.
- `data-pie` es el texto que aparece abajo cuando la foto se abre grande.
- `data-alt` es el texto alternativo de la foto ya abierta.
- `type="button"` es necesario: sin él, el botón toma el tipo `submit` y
  puede mandar un formulario si queda dentro de uno.
- El ícono de lupa (`gallery__lupa`) es decorativo: lleva `aria-hidden`.

El mejor camino es **copiar un botón de foto que ya funcione** y cambiar la
imagen y los textos. El orden en el HTML es el orden en el que se recorren
las fotos con las flechas del teclado.

No hay que tocar `galeria.js` para nada.

---

## Cambiar el tema (claro u oscuro)

El sitio arranca siguiendo la preferencia del sistema. El botón de arriba a
la derecha lo cambia a mano, y la elección se recuerda entre visitas.

### Cambiar los colores de un tema

Los dos temas están en `css/base/tokens.css`, en dos bloques separados:

- El primero es el tema oscuro (el que se usa cuando no se eligió nada y el
  sistema está en oscuro).
- El segundo, debajo, es el tema claro.

Cada uno repite los mismos nombres de variable con valores distintos. Para
cambiar el color de un tema hay que buscar en el bloque correspondiente.

**Importante:** `.hero` (la portada) y `.footer` se mantienen oscuros en los
dos temas a propósito, porque van sobre fotos oscuras. Esos dos bloques
tienen sus propios colores y no se tocan al cambiar la paleta.

### Cambiar cómo arranca el sitio

- Si arranca oscuro siempre, hay que quitar la regla
  `prefers-color-scheme` del CSS y dejar solo el bloque oscuro.
- Para que el botón tenga un modo "automático" explícito (para volver a
  seguir al sistema después de haber elegido a mano), habría que tocar
  `js/modules/tema.js`. Está anotado en `PENDIENTES.md`.

---

## Cambiar los colores, las fuentes o el espaciado

**Único archivo a tocar: `css/base/tokens.css`.**

Ahí están todos los valores de la identidad visual. Para un cambio puntual:

| Quiero cambiar | Variable |
|---|---|
| Color principal de la marca | `--c-marca` |
| Color de acento (dorado) | `--c-acento` |
| Fondo del sitio | `--c-bg` |
| Fondo de las secciones alternas | `--c-bg-alt` |
| Color del texto | `--c-texto` |
| Texto secundario | `--c-texto-suave` |
| Tipografía de títulos | `--font-display` |
| Tipografía de textos | `--font-body` |
| Ancho máximo del contenido | `--contenedor-max` |
| Separación vertical de las secciones | `--seccion-pad-y` |
| Velocidad de las animaciones | `--dur-fast` / `--dur-base` / `--dur-slow` |

### Cambiar la paleta entera

Arriba del archivo están los colores base (`--c-vino-*`, `--c-oro-*`,
neutros). Abajo, los **alias semánticos**. Cambiar la marca de vino a otro
color se hace en los alias, no en los estilos:

```css
--c-marca: var(--c-oro-400);   /* en vez de --c-vino-500 */
```

Los estilos de las secciones **siempre** usan los alias. Si aparece un
`--c-vino-600` dentro de un archivo de sección, eso es una señal de que algo
se puede simplificar.

### Tipografía

Se carga desde Google Fonts en `css/base/typography.css`. Para cambiar las
fuentes hay que actualizar dos lugares:

1. El `@import` de Google Fonts, con la familia nueva.
2. Las variables `--font-display` y `--font-body` en `tokens.css`.

Conviene elegir siempre una alternativa de sistema (`Georgia`,
`system-ui`) como respaldo, para que se vea bien aunque Google Fonts no
llegue a cargar.

---

## Cambiar los textos del sitio

Todo el texto visible está en `index.html`, salvo el de los platos, que
está en `js/data/menu.js`.

Para cambiar el teléfono o la dirección: buscar en `index.html` dentro de
la sección de contacto.

Ojo con los datos que están **repetidos**:

| Dato | Dónde aparece | Cómo cambiarlo |
|---|---|---|
| Teléfono | Enlace `tel:` **y** el texto al lado, en la misma línea | Cambiar los dos de una vez |
| Horarios | Sección de contacto **y** pie de página | Cambiar las dos listas |
| Año del copyright | Lo inyecta JavaScript | No hay que tocarlo |

---

## Agregar una sección nueva

1. **El HTML**: escribir la sección dentro de `<main>` en `index.html`,
   con un `id` (el `id` es el ancla del menú).

   ```html
   <section class="section" id="mi-seccion">
     <div class="container">
       <span class="eyebrow" data-reveal>Mi eyebrow</span>
       <h2 class="section-title" data-reveal>Título</h2>
     </div>
   </section>
   ```

   Agregar `data-reveal` es opcional: hace que el elemento entre con una
   animación al aparecer.

2. **Los estilos**: crear `css/layout/mi-seccion.css` y sumar el
   `@import` en `css/main.css`, dentro de la capa LAYOUT.

3. **El enlace**: agregar una línea en `.nav__links` (menú de arriba) y en
   la lista del pie de página.

Si el estilo se va a repetir en otra sección, conviene subirlo a
`css/components/` en lugar de duplicarlo.

---

## Agregar una funcionalidad nueva (JavaScript)

1. Crear `js/modules/nueva-cosa.js`:

   ```js
   export function initNuevaCosa() {
     // ...
   }
   ```

2. Importarlo en `js/main.js`.
3. Llamarlo dentro de `safe(...)`:

   ```js
   safe("nueva-cosa", initNuevaCosa);
   ```

El `safe` no es opcional: es lo que garantiza que un error en el módulo nuevo
no deje la página en blanco.

---

## Agregar una animación de entrada

En el HTML, agregar `data-reveal` al elemento. Opcionalmente:

```html
<div data-reveal="right" data-reveal-delay="2">
```

- `data-reveal` sin valor: entra desde abajo (lo normal).
- `data-reveal="right"` / `"left"` / `"scale"`: otras direcciones.
- `data-reveal-delay="1..6"`: escalona la entrada respecto de las demás.

**Importante:** si se agrega HTML nuevo desde JavaScript, hay que llamar a
`observeReveal(raíz)` después de insertarlo. Si no, esos elementos nunca se
observan y quedan invisibles. Es lo que hace `carta.js` después de generar
las tarjetas.

---

## Antes de subir un cambio

- [ ] ¿Quedó algún teléfono, precio, horario o dirección de ejemplo?
      (ver `PENDIENTES.md`)
- [ ] ¿Las imágenes nuevas están en `assets/img/`?
- [ ] ¿Los textos alternativos de las imágenes dicen qué se ve?
- [ ] ¿El sitio se ve bien en el celular? La navegación cambia bastante.
- [ ] ¿Sigue funcionando si se desactiva JavaScript? El contenido tiene que
      quedar visible.

---

## Trabajar desde dos computadoras (Linux y Windows)

Este proyecto se trabaja indistintamente desde dos máquinas. Para no tener que
cambiar la configuración cada vez que se cambia de computadora, hay dos cosas
que quedan resueltas **en el repositorio**, no en cada máquina.

### 1. El remoto es siempre por SSH

Las dos computadoras usan la misma dirección:

```
git@github.com:nicodelos24/nicodelos24.github.io-proyecto-porton.git
```

SSH y no HTTPS, porque no pide usuario ni token en cada push.

Si alguna vez aparece una dirección `https://github.com/...`, se corrige en esa
máquina con:

```sh
git remote set-url origin git@github.com:nicodelos24/nicodelos24.github.io-proyecto-porton.git
```

Se comprueba con `git remote -v`: tiene que decir `git@github.com:` en las dos.

### 2. Cada computadora tiene su propia clave, y las dos están en la cuenta

GitHub permite varias claves SSH en una misma cuenta, así que **cada máquina
genera la suya** y las dos sirven para el mismo repositorio. No hay que copiar
la clave de la otra computadora: la clave privada nunca se comparte.

En una máquina Linux nueva:

```sh
ssh-keygen -t ed25519 -C "nicodelos24@gmail.com"
cat ~/.ssh/id_ed25519.pub
```

En una máquina Windows nueva (en Git Bash, o PowerShell):

```sh
ssh-keygen -t ed25519 -C "nicodelos24@gmail.com"
type %USERPROFILE%\.ssh\id_ed25519.pub
```

La línea que imprime se copia en GitHub: **Settings → SSH and GPG keys → New
SSH key**. Se le puede poner de nombre "PC Linux" o "PC Windows", para saber de
cuál es.

Queda listo cuando GitHub reconoce la máquina:

```sh
ssh -T git@github.com
# Hi nicodelos24! You've successfully authenticated...
```

### 3. Los finales de línea ya están resueltos

En la raíz del repositorio está `.gitattributes`, que fija los finales de línea
a LF para todos los archivos de texto, sin importar en qué sistema se edite.

Por qué importa: si no estuviera, al abrir un archivo en Windows se guarda con
CRLF y al abrirlo en Linux se ve como si **todo el archivo hubiera cambiado**,
con un diff de cientos de líneas que en realidad no son cambios de contenido.
Con `.gitattributes` eso no puede pasar, porque Git normaliza al commitear.

No hay que configurar nada en Windows para que funcione: no usar el editor
"Guardar con finales de línea CRLF" manualmente.

---

## Cambiar los colores de un tema

**Único archivo a tocar: `css/base/tokens.css`.**

La paleta del tema claro está escrita **dos veces** en ese archivo, y hay que
tocarla las dos:

| Bloque | Cuándo se aplica |
|---|---|
| `:root[data-tema="claro"]` | Cuando el visitante elige el tema a mano |
| `:root:not([data-tema])` dentro de `prefers-color-scheme: light` | Cuando nadie eligió nada: manda el sistema |

Se repiten a propósito para que el sitio funcione también sin JavaScript.
Si tocás uno y no el otro, el tema va a verse bien en la mitad de las
situaciones y mal en la otra, sin ningún error que lo indique.

### Partes del sitio que no cambian con el tema

La portada y el pie se quedan oscuros siempre, porque van sobre fotos
oscuras. Definen sus propios colores dentro del bloque:

```css
.hero {
  --c-texto: #f4efe6;
  --c-acento: #d9b64a;
  /* ... */
}
```

Si agregás un elemento nuevo dentro de esas secciones y necesitás ajustar un
color, definilo en ese mismo bloque, no en la paleta global.

### Comprobar un cambio

Con el botón de tema de la barra de navegación se ven los dos temas sin
tocar código. Para probar cómo lo ve alguien que nunca eligió nada, en las
herramientas de desarrollo se puede cambiar la preferencia del sistema:

```js
// En la consola del navegador
window.__forzarTema = (t) => {
  localStorage.setItem("tema", t);
  location.reload();
};
__forzarTema("claro");
```

Recordá borrar la preferencia después de probar, con
`localStorage.removeItem("tema")` y recargando.
